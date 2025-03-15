"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import io from "socket.io-client"

export default function InteractiveBox() {
  const socket = useRef(null)
  const router = useRouter()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const getCenterPosition = () => {
    return {
      x: window.innerWidth / 2 - 40,
      y: window.innerHeight / 2 - 40,
    }
  }

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}`)

    socket.current.on("boxPosition", (newPosition) => {
      setPosition(newPosition)
    })

    setPosition(getCenterPosition())

    const handleResize = () => {
      setPosition(getCenterPosition())
    }
    window.addEventListener("resize", handleResize)

    return () => {
      socket.current.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const startDragging = (event) => {
    event.preventDefault() // Prevent text selection
    isDragging.current = true
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }
  }

  const startTouchDragging = (event) => {
    event.preventDefault() // Prevent scrolling
    isDragging.current = true
    const touch = event.touches[0]
    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    }
  }

  const stopDragging = () => {
    isDragging.current = false
  }

  const dragBox = (event) => {
    if (!isDragging.current) return

    const newPosition = {
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    }

    setPosition(newPosition)
    socket.current.emit("moveBox", newPosition)
  }

  const touchDragBox = (event) => {
    if (!isDragging.current) return

    const touch = event.touches[0]
    const newPosition = {
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    }

    setPosition(newPosition)
    socket.current.emit("moveBox", newPosition)
  }

  return (
    <div
      onMouseMove={dragBox}
      onMouseUp={stopDragging}
      onTouchMove={touchDragBox}
      onTouchEnd={stopDragging}
      className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white transition-all select-none relative"
    >
      {/* Floating Go Back Button - Made responsive */}
      <Link
        href="/labs/cse"
        className="absolute bottom-6 right-6 sm:bottom-50 sm:right-6 flex items-center gap-2 bg-gray-800 
                   text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-gray-700 
                   transition-all duration-300 ease-in-out text-sm sm:text-base z-10"
      >
        <FaArrowLeft className="text-lg" /> Go Back
      </Link>

      <h1 className="text-3xl font-bold mb-2">Move the Box</h1>
      <p className="text-gray-400 mb-6">
        Click and drag the box to move it around. If it works, congratulations—you're interacting with your virtual lab
        in real time!
      </p>

      <div
        onMouseDown={startDragging}
        onTouchStart={startTouchDragging}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-700 
                   rounded-xl shadow-lg transform transition-all 
                   active:scale-90 cursor-grabbing border-2 border-blue-300"
      ></div>
    </div>
  )
}



// "use client"

// import { useEffect, useRef, useState } from "react"
// import { useRouter } from "next/navigation"
// import { FaArrowLeft } from "react-icons/fa"
// import Link from "next/link"
// import io from "socket.io-client"

// export default function InteractiveBox() {
//   const socket = useRef(null)
//   const router = useRouter()
//   const [position, setPosition] = useState({ x: 0, y: 0 })
//   const isDragging = useRef(false)
//   const offset = useRef({ x: 0, y: 0 })

//   // Calculate center position
//   const getCenterPosition = () => ({
//     x: window.innerWidth / 2 - 40,
//     y: window.innerHeight / 2 - 40,
//   })

//   useEffect(() => {
//     socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}`)

//     // 📥 Listen for position updates from Google Cloud Pub/Sub
//     socket.current.on("boxPosition", (newPosition) => {
//       setPosition(newPosition)
//     })

//     // Set initial box position at center
//     setPosition(getCenterPosition())

//     const handleResize = () => {
//       setPosition(getCenterPosition())
//     }
//     window.addEventListener("resize", handleResize)

//     return () => {
//       socket.current.disconnect()
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [])

//   // 🖱️ Start Dragging (Mouse)
//   const startDragging = (event) => {
//     event.preventDefault()
//     isDragging.current = true
//     offset.current = {
//       x: event.clientX - position.x,
//       y: event.clientY - position.y,
//     }
//   }

//   // 📱 Start Dragging (Touch)
//   const startTouchDragging = (event) => {
//     event.preventDefault()
//     isDragging.current = true
//     const touch = event.touches[0]
//     offset.current = {
//       x: touch.clientX - position.x,
//       y: touch.clientY - position.y,
//     }
//   }

//   // ✋ Stop Dragging
//   const stopDragging = () => {
//     isDragging.current = false
//   }

//   // 🖱️ Drag Box (Mouse)
//   const dragBox = (event) => {
//     if (!isDragging.current) return

//     const newPosition = {
//       x: event.clientX - offset.current.x,
//       y: event.clientY - offset.current.y,
//     }

//     setPosition(newPosition)
//     socket.current.emit("moveBox", newPosition) // 📤 Send update
//   }

//   // 📱 Drag Box (Touch)
//   const touchDragBox = (event) => {
//     if (!isDragging.current) return

//     const touch = event.touches[0]
//     const newPosition = {
//       x: touch.clientX - offset.current.x,
//       y: touch.clientY - offset.current.y,
//     }

//     setPosition(newPosition)
//     socket.current.emit("moveBox", newPosition) // 📤 Send update
//   }

//   return (
//     <div
//       onMouseMove={dragBox}
//       onMouseUp={stopDragging}
//       onTouchMove={touchDragBox}
//       onTouchEnd={stopDragging}
//       className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white transition-all select-none relative"
//     >
//       {/* Floating Go Back Button */}
//       <Link
//         href="/labs/cse"
//         className="absolute bottom-6 right-6 sm:bottom-50 sm:right-6 flex items-center gap-2 bg-gray-800 
//                    text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-gray-700 
//                    transition-all duration-300 ease-in-out text-sm sm:text-base z-10"
//       >
//         <FaArrowLeft className="text-lg" /> Go Back
//       </Link>

//       <h1 className="text-3xl font-bold mb-2">Move the Box</h1>
//       <p className="text-gray-400 mb-6">
//         Click and drag the box to move it around. If it works, congratulations—you're interacting with your virtual lab
//         in real time!
//       </p>

//       <div
//         onMouseDown={startDragging}
//         onTouchStart={startTouchDragging}
//         style={{
//           top: `${position.y}px`,
//           left: `${position.x}px`,
//         }}
//         className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-700 
//                    rounded-xl shadow-lg transform transition-all 
//                    active:scale-90 cursor-grabbing border-2 border-blue-300"
//       ></div>
//     </div>
//   )
// }
