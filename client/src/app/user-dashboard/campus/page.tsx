"use client"

import { MapPin, Clock, Mail, MoreVertical, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo2 from "@/assets/logo8.png"
import ResourceStats from "./resource-stats"
import SupportGroups from "./support-groups"
import CampusMap from "./campus-map"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const iconAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function Home() {
  const heroRef = useRef(null)
  const counselingRef = useRef(null)
  const supportRef = useRef(null)
  const mapRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const counselingInView = useInView(counselingRef, { once: true, amount: 0.3 })
  const supportInView = useInView(supportRef, { once: true, amount: 0.3 })
  const mapInView = useInView(mapRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-auto">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 transform transition-all hover:shadow-md"
        >
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-8 md:w-3/5">
              <motion.h2
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="text-2xl md:text-3xl font-bold text-[#1d2b7d] mb-4"
              >
                Need support with your studies?
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
                }}
                className="text-slate-600 mb-6"
              >
                Paragon International University offers a range of support services to help you succeed in your academic
                journey. From counseling services to peer support groups, we are here to help you thrive.
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
                }}
              >
                <Link
                  href="#book-session"
                  className="inline-flex items-center px-6 py-3 bg-[#1d2b7d] text-white rounded-lg hover:bg-[#1d2b7d]/90 transition-colors hover:scale-105 transform duration-300"
                >
                  Book a Counseling Session
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3 } },
              }}
              className="md:w-2/5 relative min-h-[250px] md:min-h-0"
            >
              <Image src={logo2 || "/placeholder.svg"} alt="mindspeaklogo" fill className="object-contain p-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ResourceStats />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Counseling Services */}
          <motion.div
            ref={counselingRef}
            initial="hidden"
            animate={counselingInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2 transform transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="text-xl font-bold text-[#1d2b7d]"
                >
                  Student Counseling Services
                </motion.h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="More options"
                >
                  <MoreVertical className="h-5 w-5" />
                </motion.button>
              </div>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
                }}
                className="text-slate-600 mb-6"
              >
                Paragon International University offers confidential counseling services to all enrolled students.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-4 mb-6">
                <motion.div variants={fadeIn} className="flex items-start">
                  <motion.div variants={iconAnimation} className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <MapPin className="h-5 w-5 text-[#1d2b7d]" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-slate-900">Location:</p>
                    <p className="text-slate-600">Student Affairs Office, 2nd Floor</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start">
                  <motion.div variants={iconAnimation} className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <Clock className="h-5 w-5 text-[#1d2b7d]" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-slate-900">Hours:</p>
                    <p className="text-slate-600">Monday-Friday, 8:00 AM - 5:00 PM</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start">
                  <motion.div variants={iconAnimation} className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-[#1d2b7d]" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-slate-900">Appointment:</p>
                    <p className="text-slate-600">Email counseling@paragoniu.edu.kh</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                id="book-session"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
                }}
              >
                <Link
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-[#1d2b7d] text-white rounded-lg hover:bg-[#1d2b7d]/90 transition-colors hover:scale-105 transform duration-300"
                >
                  Book a Counseling Session
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Support Groups */}
          <motion.div
            ref={supportRef}
            initial="hidden"
            animate={supportInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.3 },
              },
            }}
            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="text-xl font-bold text-[#1d2b7d]"
                >
                  Peer Support Groups
                </motion.h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-400 hover:text-slate-600"
                  title="More options"
                >
                  <MoreVertical className="h-5 w-5" />
                </motion.button>
              </div>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
                }}
                className="text-slate-600 mb-6"
              >
                Join student-led support groups to connect with peers facing similar challenges.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
                }}
              >
                <SupportGroups />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          ref={mapRef}
          initial="hidden"
          animate={mapInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 transform transition-all hover:shadow-md"
        >
          <div className="p-6">
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="text-xl font-bold text-[#1d2b7d] mb-4"
            >
              Find Us on Campus
            </motion.h2>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
              }}
            >
              <CampusMap />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
