"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import io from "socket.io-client";

export default function IntegerRepresentation() {
  const socket = useRef(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("binary");
  const [decimalValue, setDecimalValue] = useState(42);
  const [binaryBits, setBinaryBits] = useState([]);
  const [operation, setOperation] = useState("add");
  const [operand, setOperand] = useState(5);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);

  // Connect to socket on component mount
  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);

    // Listen for updates from other users
    socket.current.on("integerUpdate", (data) => {
      setDecimalValue(data.decimalValue);
      setActiveTab(data.activeTab);
      setOperation(data.operation);
      setOperand(data.operand);
      setShowResult(data.showResult);
      setResult(data.result);
    });

    // Clean up on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Update binary bits when decimal value changes
  useEffect(() => {
    const bits = decimalToBinary(decimalValue);
    setBinaryBits(bits);
  }, [decimalValue]);

  // Convert decimal to binary array
  const decimalToBinary = (decimal) => {
    const binary = decimal.toString(2).padStart(8, "0");
    return binary.split("").map((bit) => Number.parseInt(bit));
  };

  // Convert binary array to decimal
  const binaryToDecimal = (bits) => {
    return Number.parseInt(bits.join(""), 2);
  };

  // Toggle a specific bit
  const toggleBit = (index) => {
    const newBits = [...binaryBits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    const newDecimal = binaryToDecimal(newBits);
    setDecimalValue(newDecimal);

    // Emit change to other users
    emitChange({
      decimalValue: newDecimal,
      activeTab,
      operation,
      operand,
      showResult,
      result,
    });
  };

  // Perform arithmetic operation
  const performOperation = () => {
    let resultValue;

    switch (operation) {
      case "add":
        resultValue = decimalValue + operand;
        break;
      case "subtract":
        resultValue = decimalValue - operand;
        break;
      case "multiply":
        resultValue = decimalValue * operand;
        break;
      case "divide":
        resultValue = Math.floor(decimalValue / operand);
        break;
      default:
        resultValue = decimalValue;
    }

    setResult(resultValue);
    setShowResult(true);

    // Emit change to other users
    emitChange({
      decimalValue,
      activeTab,
      operation,
      operand,
      showResult: true,
      result: resultValue,
    });
  };

  // Reset the result
  const resetResult = () => {
    setShowResult(false);

    // Emit change to other users
    emitChange({
      decimalValue,
      activeTab,
      operation,
      operand,
      showResult: false,
      result,
    });
  };

  // Change tab
  const changeTab = (tab) => {
    setActiveTab(tab);

    // Emit change to other users
    emitChange({
      decimalValue,
      activeTab: tab,
      operation,
      operand,
      showResult,
      result,
    });
  };

  // Update decimal value
  const updateDecimalValue = (value) => {
    const newValue = Number.parseInt(value) || 0;
    setDecimalValue(newValue);

    // Emit change to other users
    emitChange({
      decimalValue: newValue,
      activeTab,
      operation,
      operand,
      showResult,
      result,
    });
  };

  // Update operand value
  const updateOperand = (value) => {
    const newValue = Number.parseInt(value) || 0;
    setOperand(newValue);

    // Emit change to other users
    emitChange({
      decimalValue,
      activeTab,
      operation,
      operand: newValue,
      showResult,
      result,
    });
  };

  // Update operation
  const updateOperation = (op) => {
    setOperation(op);

    // Emit change to other users
    emitChange({
      decimalValue,
      activeTab,
      operation: op,
      operand,
      showResult,
      result,
    });
  };

  // Emit changes to socket
  const emitChange = (data) => {
    socket.current.emit("updateInteger", data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-white p-4 md:p-8">
      {/* Header with back button */}
      <div className="flex justify-between items-center mt-32 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Representation of Integers and their Arithmetic
        </h1>
        <Link
          href="/labs/cse"
          className="flex items-center gap-2 bg-gray-800 
                     text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-700 
                     transition-all duration-300 ease-in-out"
        >
          <FaArrowLeft className="text-lg" /> Go Back
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => changeTab("binary")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "binary" ? "bg-blue-600" : "bg-gray-700"
          } transition-colors`}
        >
          Binary Representation
        </button>
        <button
          onClick={() => changeTab("arithmetic")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "arithmetic" ? "bg-blue-600" : "bg-gray-700"
          } transition-colors`}
        >
          Arithmetic Operations
        </button>
        <button
          onClick={() => changeTab("twos-complement")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "twos-complement" ? "bg-blue-600" : "bg-gray-700"
          } transition-colors`}
        >
          Two's Complement
        </button>
      </div>

      {/* Main content area */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6 flex-1">
        {/* Binary Representation Tab */}
        {activeTab === "binary" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Decimal to Binary Conversion
              </h2>
              <p className="text-gray-300">
                Adjust the decimal value or toggle individual bits to see the
                conversion.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Decimal input */}
              <div className="bg-gray-700 p-4 rounded-lg w-full md:w-1/3">
                <label className="block mb-2 text-sm font-medium">
                  Decimal Value
                </label>
                <input
                  type="number"
                  value={decimalValue}
                  onChange={(e) => updateDecimalValue(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 rounded-md text-white"
                />
              </div>

              {/* Binary representation */}
              <div className="bg-gray-700 p-4 rounded-lg w-full md:w-2/3">
                <label className="block mb-2 text-sm font-medium">
                  Binary Representation (8-bit)
                </label>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    {binaryBits.map((_, index) => (
                      <div
                        key={`position-${index}`}
                        className="w-8 text-center text-xs text-gray-400"
                      >
                        2<sup>{7 - index}</sup>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {binaryBits.map((bit, index) => (
                      <button
                        key={`bit-${index}`}
                        onClick={() => toggleBit(index)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          bit === 1 ? "bg-blue-500" : "bg-gray-600"
                        } hover:bg-blue-400 transition-colors`}
                      >
                        {bit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">How Binary Works</h3>
              <p className="text-gray-300">
                Binary is a base-2 number system where each digit represents a
                power of 2. The rightmost digit represents 2<sup>0</sup> (1),
                the next digit to the left represents 2<sup>1</sup> (2), then 2
                <sup>2</sup> (4), and so on.
              </p>
            </div>
          </div>
        )}

        {/* Arithmetic Operations Tab */}
        {activeTab === "arithmetic" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Binary Arithmetic</h2>
              <p className="text-gray-300">
                Perform arithmetic operations and see the binary representation
                of the result.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First operand */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium">
                  First Number
                </label>
                <input
                  type="number"
                  value={decimalValue}
                  onChange={(e) => updateDecimalValue(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 rounded-md text-white"
                />
                <div className="mt-2 text-sm text-gray-400">
                  Binary: {binaryBits.join("")}
                </div>
              </div>

              {/* Operation and second operand */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <select
                    value={operation}
                    onChange={(e) => updateOperation(e.target.value)}
                    className="px-3 py-2 bg-gray-600 rounded-md text-white"
                  >
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">×</option>
                    <option value="divide">÷</option>
                  </select>

                  <input
                    type="number"
                    value={operand}
                    onChange={(e) => updateOperand(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  Binary: {decimalToBinary(operand).join("")}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={performOperation}
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Calculate
              </button>
            </div>

            {showResult && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Result</h3>
                  <button
                    onClick={resetResult}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Reset
                  </button>
                </div>
                <div className="mt-2">
                  <div className="text-xl">{result}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Binary: {decimalToBinary(result).join("")}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Two's Complement Tab */}
        {activeTab === "twos-complement" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Two's Complement Representation
              </h2>
              <p className="text-gray-300">
                Two's complement is a method for representing signed integers in
                binary, allowing for both positive and negative numbers.
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Original Number</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <label className="block mb-1 text-sm">Decimal</label>
                  <input
                    type="number"
                    value={decimalValue}
                    onChange={(e) => updateDecimalValue(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm">Binary</label>
                  <div className="flex justify-between bg-gray-600 rounded-md p-2">
                    {binaryBits.map((bit, index) => (
                      <div
                        key={`original-${index}`}
                        className="w-8 text-center"
                      >
                        {bit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">One's Complement</h3>
              <div className="flex justify-between bg-gray-600 rounded-md p-2">
                {binaryBits.map((bit, index) => (
                  <div key={`ones-${index}`} className="w-8 text-center">
                    {bit === 0 ? 1 : 0}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                One's complement is obtained by flipping all bits (0→1, 1→0).
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Two's Complement</h3>
              <div className="flex justify-between bg-gray-600 rounded-md p-2">
                {(() => {
                  // Calculate two's complement
                  const onesComplement = binaryBits.map((bit) =>
                    bit === 0 ? 1 : 0
                  );
                  let carry = 1;
                  const twosComplement = [...onesComplement];

                  for (let i = twosComplement.length - 1; i >= 0; i--) {
                    if (twosComplement[i] === 1 && carry === 1) {
                      twosComplement[i] = 0;
                    } else if (carry === 1) {
                      twosComplement[i] = 1;
                      carry = 0;
                    }
                  }

                  return twosComplement.map((bit, index) => (
                    <div key={`twos-${index}`} className="w-8 text-center">
                      {bit}
                    </div>
                  ));
                })()}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Two's complement is obtained by adding 1 to the one's
                complement.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Decimal value: {-decimalValue}
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                Why Two's Complement?
              </h3>
              <p className="text-gray-300">
                Two's complement allows for simple addition and subtraction
                operations without special handling for negative numbers. The
                leftmost bit serves as the sign bit (0 for positive, 1 for
                negative).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}