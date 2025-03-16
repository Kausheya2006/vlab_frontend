"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import io from "socket.io-client";

export default function MIPSCPUExperiment() {
  const socket = useRef(null);
  const router = useRouter();
  const [registers, setRegisters] = useState({
    $zero: 0,
    $at: 0,
    $v0: 0,
    $v1: 0,
    $a0: 0,
    $a1: 0,
    $a2: 0,
    $a3: 0,
    $t0: 0,
    $t1: 0,
    $t2: 0,
    $t3: 0,
    $t4: 0,
    $t5: 0,
    $t6: 0,
    $t7: 0,
    $s0: 0,
    $s1: 0,
    $s2: 0,
    $s3: 0,
    $s4: 0,
    $s5: 0,
    $s6: 0,
    $s7: 0,
    $t8: 0,
    $t9: 0,
    $k0: 0,
    $k1: 0,
    $gp: 0,
    $sp: 0,
    $fp: 0,
    $ra: 0,
    pc: 0,
  });
  const [memory, setMemory] = useState(Array(16).fill(0));
  const [code, setCode] = useState(
    "# Enter your MIPS assembly code here\n# Example:\n# add $t0, $t1, $t2\n# lw $t0, 0($t1)\n# sw $t0, 4($t1)"
  );
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("code");
  const [isRunning, setIsRunning] = useState(false);
  const [cpuDiagram, setCpuDiagram] = useState({
    pc: { x: 50, y: 50 },
    alu: { x: 200, y: 150 },
    registers: { x: 100, y: 200 },
    memory: { x: 300, y: 200 },
    controlUnit: { x: 150, y: 50 },
  });
  const isDragging = useRef(false);
  const dragTarget = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);

    socket.current.on("mipsRegisters", (newRegisters) => {
      setRegisters(newRegisters);
    });

    socket.current.on("mipsMemory", (newMemory) => {
      setMemory(newMemory);
    });

    socket.current.on("mipsCode", (newCode) => {
      setCode(newCode);
    });

    socket.current.on("mipsOutput", (newOutput) => {
      setOutput(newOutput);
    });

    socket.current.on("mipsCpuDiagram", (newDiagram) => {
      setCpuDiagram(newDiagram);
    });

    socket.current.on("mipsRunning", (status) => {
      setIsRunning(status);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const updateCode = (newCode) => {
    setCode(newCode);
    socket.current.emit("updateMipsCode", newCode);
  };

  const runCode = () => {
    setIsRunning(true);
    socket.current.emit("runMipsCode", code);

    // Simulate execution with some visual feedback
    let pc = 0;
    const lines = code
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"));

    if (lines.length === 0) {
      setOutput("No executable code found.");
      setIsRunning(false);
      socket.current.emit("mipsRunning", false);
      return;
    }

    const interval = setInterval(() => {
      if (pc < lines.length) {
        const newRegisters = { ...registers };
        // Simulate register changes
        newRegisters.pc = pc * 4;

        // Simple simulation of register changes based on instruction type
        const line = lines[pc].trim();
        if (line.startsWith("add")) {
          const parts = line.split(/[ ,]+/);
          if (parts.length >= 4) {
            const dest = parts[1];
            newRegisters[dest] =
              (newRegisters[parts[2]] || 0) + (newRegisters[parts[3]] || 0);
          }
        } else if (line.startsWith("addi")) {
          const parts = line.split(/[ ,]+/);
          if (parts.length >= 4) {
            const dest = parts[1];
            newRegisters[dest] =
              (newRegisters[parts[2]] || 0) + parseInt(parts[3] || 0);
          }
        }

        setRegisters(newRegisters);
        socket.current.emit("updateMipsRegisters", newRegisters);

        setOutput((prev) => prev + `Executing: ${line}\n`);
        socket.current.emit(
          "updateMipsOutput",
          output + `Executing: ${line}\n`
        );

        pc++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        socket.current.emit("mipsRunning", false);
        setOutput((prev) => prev + "Execution completed.\n");
        socket.current.emit(
          "updateMipsOutput",
          output + "Execution completed.\n"
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const resetSimulation = () => {
    const newRegisters = Object.keys(registers).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    setRegisters(newRegisters);
    setMemory(Array(16).fill(0));
    setOutput("");

    socket.current.emit("updateMipsRegisters", newRegisters);
    socket.current.emit("updateMipsMemory", Array(16).fill(0));
    socket.current.emit("updateMipsOutput", "");
  };

  const startDragging = (event, component) => {
    event.preventDefault();
    isDragging.current = true;
    dragTarget.current = component;

    const rect = event.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const stopDragging = () => {
    isDragging.current = false;
    dragTarget.current = null;
  };

  const onDrag = (event) => {
    if (!isDragging.current || !dragTarget.current) return;

    const newDiagram = { ...cpuDiagram };
    newDiagram[dragTarget.current] = {
      x: event.clientX - dragOffset.current.x,
      y: event.clientY - dragOffset.current.y,
    };

    setCpuDiagram(newDiagram);
    socket.current.emit("updateMipsCpuDiagram", newDiagram);
  };

  return (
    <div
      className="h-screen w-full flex flex-col bg-gray-900 text-white overflow-hidden"
      onMouseMove={onDrag}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className="flex items-center justify-between mt-32 p-4 border-b border-gray-700">
        <div className="flex items-center">
          <Link
            href="/labs/cse"
            className="flex items-center gap-2 bg-gray-800 
                     text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-700 
                     transition-all duration-300 ease-in-out mr-4"
          >
            <FaArrowLeft className="text-sm" /> Back
          </Link>
          <h1 className="text-xl font-bold">Single Cycle MIPS CPU Simulator</h1>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              isRunning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
            onClick={isRunning ? () => {} : runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
            onClick={resetSimulation}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left panel - Code editor and output */}
        <div className="w-full md:w-1/2 h-full flex flex-col border-r border-gray-700">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 ${
                activeTab === "code"
                  ? "bg-gray-800 border-b-2 border-blue-500"
                  : "bg-gray-900"
              }`}
              onClick={() => setActiveTab("code")}
            >
              Code Editor
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "output"
                  ? "bg-gray-800 border-b-2 border-blue-500"
                  : "bg-gray-900"
              }`}
              onClick={() => setActiveTab("output")}
            >
              Output
            </button>
          </div>

          {activeTab === "code" ? (
            <textarea
              className="flex-grow bg-gray-800 p-4 font-mono text-sm resize-none outline-none"
              value={code}
              onChange={(e) => updateCode(e.target.value)}
              disabled={isRunning}
            />
          ) : (
            <div className="flex-grow bg-gray-800 p-4 font-mono text-sm overflow-auto whitespace-pre">
              {output || "Run your code to see output here..."}
            </div>
          )}
        </div>

        {/* Right panel - CPU visualization and registers */}
        <div className="w-full md:w-1/2 h-full flex flex-col">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 ${
                activeTab === "cpu"
                  ? "bg-gray-800 border-b-2 border-blue-500"
                  : "bg-gray-900"
              }`}
              onClick={() => setActiveTab("cpu")}
            >
              CPU Diagram
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "registers"
                  ? "bg-gray-800 border-b-2 border-blue-500"
                  : "bg-gray-900"
              }`}
              onClick={() => setActiveTab("registers")}
            >
              Registers
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "memory"
                  ? "bg-gray-800 border-b-2 border-blue-500"
                  : "bg-gray-900"
              }`}
              onClick={() => setActiveTab("memory")}
            >
              Memory
            </button>
          </div>

          {activeTab === "cpu" && (
            <div className="flex-grow bg-gray-800 p-4 relative overflow-auto">
              <div className="text-center mb-4 text-gray-400 text-sm">
                Drag components to rearrange the CPU diagram
              </div>

              {/* PC */}
              <div
                className="absolute w-24 h-16 bg-blue-800 rounded-lg flex items-center justify-center cursor-move shadow-lg"
                style={{ left: cpuDiagram.pc.x, top: cpuDiagram.pc.y }}
                onMouseDown={(e) => startDragging(e, "pc")}
              >
                <div className="text-center">
                  <div className="text-xs">Program Counter</div>
                  <div className="font-mono">{registers.pc}</div>
                </div>
              </div>

              {/* ALU */}
              <div
                className="absolute w-32 h-24 bg-red-800 rounded-lg flex items-center justify-center cursor-move shadow-lg"
                style={{ left: cpuDiagram.alu.x, top: cpuDiagram.alu.y }}
                onMouseDown={(e) => startDragging(e, "alu")}
              >
                <div className="text-center">
                  <div className="text-xs">ALU</div>
                  <div className="font-mono text-xs">Arithmetic Logic Unit</div>
                </div>
              </div>

              {/* Registers */}
              <div
                className="absolute w-36 h-28 bg-green-800 rounded-lg flex items-center justify-center cursor-move shadow-lg"
                style={{
                  left: cpuDiagram.registers.x,
                  top: cpuDiagram.registers.y,
                }}
                onMouseDown={(e) => startDragging(e, "registers")}
              >
                <div className="text-center">
                  <div className="text-xs">Register File</div>
                  <div className="font-mono text-xs">32 × 32-bit registers</div>
                </div>
              </div>

              {/* Memory */}
              <div
                className="absolute w-36 h-28 bg-purple-800 rounded-lg flex items-center justify-center cursor-move shadow-lg"
                style={{ left: cpuDiagram.memory.x, top: cpuDiagram.memory.y }}
                onMouseDown={(e) => startDragging(e, "memory")}
              >
                <div className="text-center">
                  <div className="text-xs">Data Memory</div>
                  <div className="font-mono text-xs">Word-addressable</div>
                </div>
              </div>

              {/* Control Unit */}
              <div
                className="absolute w-32 h-20 bg-yellow-700 rounded-lg flex items-center justify-center cursor-move shadow-lg"
                style={{
                  left: cpuDiagram.controlUnit.x,
                  top: cpuDiagram.controlUnit.y,
                }}
                onMouseDown={(e) => startDragging(e, "controlUnit")}
              >
                <div className="text-center">
                  <div className="text-xs">Control Unit</div>
                </div>
              </div>

              {/* Draw connecting lines between components */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* PC to Control Unit */}
                <line
                  x1={cpuDiagram.pc.x + 24}
                  y1={cpuDiagram.pc.y + 8}
                  x2={cpuDiagram.controlUnit.x}
                  y2={cpuDiagram.controlUnit.y + 10}
                  stroke="#666"
                  strokeWidth="2"
                />

                {/* Control Unit to Registers */}
                <line
                  x1={cpuDiagram.controlUnit.x + 16}
                  y1={cpuDiagram.controlUnit.y + 20}
                  x2={cpuDiagram.registers.x + 18}
                  y2={cpuDiagram.registers.y}
                  stroke="#666"
                  strokeWidth="2"
                />

                {/* Registers to ALU */}
                <line
                  x1={cpuDiagram.registers.x + 36}
                  y1={cpuDiagram.registers.y}
                  x2={cpuDiagram.alu.x}
                  y2={cpuDiagram.alu.y + 12}
                  stroke="#666"
                  strokeWidth="2"
                />

                {/* ALU to Memory */}
                <line
                  x1={cpuDiagram.alu.x + 32}
                  y1={cpuDiagram.alu.y + 12}
                  x2={cpuDiagram.memory.x}
                  y2={cpuDiagram.memory.y + 14}
                  stroke="#666"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}

          {activeTab === "registers" && (
            <div className="flex-grow bg-gray-800 p-4 overflow-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {Object.entries(registers).map(([reg, value]) => (
                  <div key={reg} className="bg-gray-700 p-2 rounded">
                    <div className="text-xs text-gray-400">{reg}</div>
                    <div className="font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "memory" && (
            <div className="flex-grow bg-gray-800 p-4 overflow-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {memory.map((value, index) => (
                  <div key={index} className="bg-gray-700 p-2 rounded">
                    <div className="text-xs text-gray-400">
                      Address: {index * 4}
                    </div>
                    <div className="font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}