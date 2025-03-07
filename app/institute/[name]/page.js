"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const InstitutePage = () => {
  const { name } = useParams()

  // Dictionary for institutes and their labs
  const institutesData = {
    "iit-guwahati": {
      name: "IIT Guwahati",
      description: "Indian Institute of Technology Guwahati, a premier institute in engineering and research.",
      labs: [
        "Virtual Mass Transfer Lab",
        "Virtual English and Communication Lab",
        "Digital Electronics Lab-II",
        "Digital Anthropology Lab",
        "Creative Design, Prototyping & Experiential Lab",
      ],
    },
    "iit-bombay": {
      name: "IIT Bombay",
      description:
        "Indian Institute of Technology Bombay, renowned for its technical education and research contributions.",
      labs: [
        "Chemical Engineering Lab",
        "Single Board Heater System Lab",
        "Digital Applications Lab",
        "Digital Logic Design Lab (Logic Gates & Mux-Demux)",
        "Heat Transfer Lab (New)",
        "Engineering Physics Lab I (New)",
      ],
    },
    "iit-delhi": {
      name: "IIT Delhi",
      description: "Indian Institute of Technology Delhi, a globally recognized center for innovation and excellence.",
      labs: [
        "Bioreactor Modeling and Simulation Lab",
        "Smart Structures and Dynamics Lab",
        "Concrete Structures Lab",
        "Waves and Vibration Transmission in Periodic Structures Lab",
        "Structural Analysis II Virtual Lab (New)",
        "Queuing Theory and Modelling Lab (New)",
        "Probability and Statistics Lab (New)",
        "Power Electronics I Virtual Lab (New)",
        "Power Electronics II Virtual Lab (New)",
      ],
    },
    "iit-kharagpur": {
      name: "IIT Kharagpur",
      description:
        "Indian Institute of Technology Kharagpur, one of India's first IITs, known for cutting-edge research.",
      labs: [
        "Mine Automation & Virtual Reality",
        "Virtual Laboratory For Simulation and Gaming",
        "Mechanisms and Robotics Lab",
        "Virtual High Voltage Lab",
        "Model Based Fault Detection Lab",
        "Analog Signals, Network and Measurement Lab",
        "Digital Electronic Circuits Lab",
        "Computer Organisation and Architecture Lab",
        "Real Time Embedded Systems Lab",
        "Basic Electronics Lab",
        "Kinematics and Dynamics of Mechanisms Lab",
        "Soft Computing Tools in Engineering Lab",
        "Chemical Process Dynamics Laboratory",
        "Digital Signal Processing Virtual Laboratory",
        "Microelectronics and VLSI Engineering Laboratory",
        "Software Engineering Lab",
        "Analog Electronics Circuits Virtual Lab",
      ],
    },
    "iiit-hyderabad": {
      name: "IIIT Hyderabad",
      description:
        "International Institute of Information Technology Hyderabad, a leader in computing and AI research.",
      labs: [
        "Problem Solving Lab",
        "Structural Dynamics Lab",
        "Hydraulics and Fluid Mechanics Lab",
        "Basic Engineering Mechanics and Strength of Materials Lab",
        "Quantum Chemistry Lab",
        "Data Structures - I",
        "Data Structures - II",
        "Soil Mechanics Lab",
        "Artificial Neural Networks Lab",
        "Molecular Fluorescence Spectroscopy Lab",
        "Colloid and Surface Chemistry Lab",
        "Molecular Absorption Spectroscopy Lab",
        "Circular Dichroism Spectroscopy Lab",
        "Physical Chemistry (IIITH) Lab",
        "Data Structures Lab",
        "Computer Programming Lab",
        "Computer Organization Lab",
        "Speech Signal Processing Lab",
        "Image Processing Lab",
        "Computational Linguistics Lab",
        "Natural Language Processing Lab",
        "Cryptography Lab",
        "Python Programming Lab - Advanced Topics (New)",
        "Artificial Intelligence II Lab (New)",
        "Artificial Intelligence I Lab (New)",
      ],
    },
    "amrita-vishwa-vidyapeetham": {
      name: "Amrita Vishwa Vidyapeetham",
      description: "A private university excelling in biotechnology, engineering, and health sciences education.",
      labs: [
        "Bioinformatics Virtual Lab I",
        "Bioinformatics Virtual Lab II",
        "Bioinformatics Virtual Lab III",
        "Systems Biology Virtual Lab",
        "Computer-Aided Drug Design Virtual Lab",
        "Biological Image Processing Lab",
        "Neurophysiology Lab",
        "Neuron Simulation Lab",
        "Biochemistry Virtual Lab I",
        "Population Ecology I",
        "Population Ecology II",
        "Immunology Virtual Lab II",
        "Microbiology Virtual Lab I",
        "Microbiology Virtual Lab II",
        "Molecular biology Virtual Lab I",
        "Molecular Biology Virtual Lab II",
        "Cell Biology Virtual Lab I",
        "Cell Biology Virtual Lab II",
        "Advanced Mechanics Virtual Lab",
        "Laser Optics Virtual Lab",
        "Heat & Thermodynamics Lab",
        "Physical Chemistry (Amrita) Lab",
        "Inorganic Chemistry Virtual Lab",
        "Electricity and Magnetism Virtual Lab",
        "Optics Virtual Lab",
        "Mechanics Virtual Lab (Pilot)",
        "Biosignal Processing and Analysis Lab",
        "Bioinformatics and Data Science in Biotechnology Lab",
        "Immunology Virtual Lab I",
        "Biosensor Virtual Lab (New)",
        "Bioinformatics and Computational Biology Virtual Lab (New)",
      ],
    },
    "nitk-surathkal": {
      name: "NITK Surathkal",
      description: "National Institute of Technology Karnataka, known for quality technical education and research.",
      labs: [
        "Fluid Mechanics Lab",
        "Transportation Engineering Lab",
        "Environmental Engineering Lab I",
        "Environmental Engineering Lab II",
        "Fluid Machinery Lab",
        "Marine Structure Lab",
        "Mining Geology Lab",
        "Industrial Electric Drives Lab",
        "Mechanics of Machine Lab I",
        "Machine Dynamics & Mechanical Vibration Lab",
        "Process Control, Reaction Engineering and Unit Operations Lab",
        "Strength of Materials Lab",
        "Dynamics of Machine Lab",
        "Substation Automation Lab",
        "Mechanics of Machines Lab 2",
        "Geotechnical Engineering Lab (New)",
        "Engineering Graphics Lab (New)",
        "Advanced Remote Sensing and GIS Lab (New)",
      ],
    },
    "coep-technological-university-pune": {
      name: "COEP Technological University Pune",
      description:
        "College of Engineering Pune, one of India's oldest engineering institutes with a strong academic legacy.",
      labs: [
        "Sensors Modeling & Simulation Lab",
        "Industrial Automation Lab",
        "Electrical Machines (COEP) Lab",
        "PLC Lab",
        "Vibration and Acoustics Lab",
        "Micromachining Lab",
        "FAB Lab",
        "Biomedical and Signal Processing Lab",
        "Hybrid Electronics Lab",
        "Process Loop Component for Current and Pneumatic Converters Lab",
        "Process Loop Component for High Low Selector and Alarm Annunciators Lab",
        "Process Loop Component for Transmitter and Tank Applications Lab",
        "Process Loop Component and Control Valve for Various Applications Lab",
        "Basics of Pneumatic Components Lab",
        "Engineering Geology Lab (New)",
        "Instrumentation and Control Lab (New)",
        "Sensors and Instrumentation Lab (New)",
      ],
    },
    "iit-roorkee": {
      name: "IIT Roorkee",
      description: "Indian Institute of Technology Roorkee, a leader in engineering education and research.",
      labs: [
        "Electrical Machines Lab",
        "Surveying Lab",
        "Biomedical Instrumentation Lab",
        "Bio-Medical Signal & Image Processing Lab",
        "Digital Electronics Lab-I",
        "Analog Electronics Lab",
        "Analog and Digital Electronics Lab - I (New)",
        "Analog and Digital Electronics Lab - II (New)",
        "Electrical Measurements Lab (New)",
        "Optical Communication Lab (New)",
        "Power Electronics Lab (New)",
        "Microwave Engineering Lab (New)",
      ],
    },
  }

  const institute = institutesData[name]

  if (!institute) {
    return <p className="text-center text-2xl mt-10">Institute Not Found</p>
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="relative">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <div className="p-4 sm:p-6 md:p-8">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 pb-1 break-words"
                variants={itemVariants}
              >
                {institute.name}
              </motion.h1>

              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"
                variants={itemVariants}
                initial={{ width: 0 }}
                animate={{ width: 80, transition: { delay: 0.4, duration: 0.6 } }}
              ></motion.div>

              <motion.p
                className="text-sm sm:text-base text-gray-600 mb-6 border-b border-gray-100 pb-6"
                variants={itemVariants}
              >
                {institute.description}
              </motion.p>

              <motion.h2
                className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 pl-3 border-l-4 border-blue-500"
                variants={itemVariants}
              >
                Available Labs
              </motion.h2>

              <motion.ul
                className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin"
                variants={itemVariants}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#3b82f6 #f3f4f6",
                }}
              >
                {institute.labs.map((lab, index) => (
                  <motion.li
                    key={index}
                    className="bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                    variants={listItemVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Link
                      href="/labs"
                      className="flex justify-between items-center p-3 sm:p-4 text-sm sm:text-base text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      <span className="flex-1 break-words pr-2">
                        {lab.includes("(New)") ? (
                          <span className="flex flex-wrap items-center gap-2">
                            <span>{lab.replace(" (New)", "")}</span>
                            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full whitespace-nowrap">
                              New
                            </span>
                          </span>
                        ) : (
                          lab
                        )}
                      </span>
                      <span className="text-gray-400 text-sm">→</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={itemVariants} className="flex justify-center sm:justify-start">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-[-3px]" />
                  <span>Back to Institutes</span>
                  <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default InstitutePage

