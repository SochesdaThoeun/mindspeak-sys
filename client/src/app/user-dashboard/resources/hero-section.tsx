"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative bg-[#1d2b7d] rounded-3xl text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d2b7d] to-[#1d2b7d]/80" />
        <div className="absolute inset-0 bg-[url('/assets/user.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Emergency Mental Health Support</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Immediate assistance and resources for mental health crises in Cambodia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#emergency-contacts"
              className="bg-white text-[#1d2b7d] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Emergency Contacts
            </a>
            <a
              href="#emergency-contacts"
              className="bg-white text-[#1d2b7d] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Find Help Centers
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </div>
    </div>
  )
}
