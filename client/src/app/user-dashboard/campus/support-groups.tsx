"use client"

import { useState, useEffect } from "react"
import { Users, Calendar, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function SupportGroups() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("support-groups")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const groups = [
    {
      title: "Stress Management Group",
      day: "Wednesdays",
      time: "4:00 PM - 5:30 PM",
      location: "Room 305",
      delay: 0,
    },
    {
      title: "International Student Support Circle",
      day: "Thursdays",
      time: "5:00 PM - 6:30 PM",
      location: "Student Lounge",
      delay: 0.1,
    },
  ]

  return (
    <div id="support-groups" className="space-y-4">
      {groups.map((group, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: group.delay }}
          whileHover={{
            scale: 1.02,
            borderColor: "rgba(29, 43, 125, 0.3)",
          }}
          className="border border-slate-100 rounded-lg p-4 hover:border-[#1d2b7d]/20 transition-all cursor-pointer"
        >
          <h3 className="font-medium text-slate-900 mb-2">{group.title}</h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-slate-600">
              <Calendar className="h-4 w-4 mr-2 text-[#1d2b7d]" />
              <span>{group.day}</span>
            </div>

            <div className="flex items-center text-slate-600">
              <Clock className="h-4 w-4 mr-2 text-[#1d2b7d]" />
              <span>{group.time}</span>
            </div>

            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-[#1d2b7d]" />
              <span>{group.location}</span>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.03, backgroundColor: "rgba(29, 43, 125, 0.08)" }}
        className="w-full mt-4 text-[#1d2b7d] font-medium flex items-center justify-center py-2 border border-[#1d2b7d]/20 rounded-lg hover:bg-[#1d2b7d]/5 transition-all"
      >
        View All Groups
        <Users className="ml-2 h-4 w-4" />
      </motion.button>
    </div>
  )
}
