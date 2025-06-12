"use client"

import { useState, useEffect } from "react"
import { Book, CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function ResourceStats() {
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

    const element = document.getElementById("resource-stats")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const stats = [
    {
      icon: Book,
      color: "bg-amber-100",
      iconColor: "text-amber-500",
      value: "10+",
      label: "Support Services",
      delay: 0,
    },
    {
      icon: CheckCircle,
      color: "bg-green-300",
      iconColor: "text-green-700",
      value: "5+",
      label: "Peer Support Groups",
      delay: 0.1,
    },
    {
      icon: Clock,
      color: "bg-indigo-100",
      iconColor: "text-indigo-500",
      value: "45 hrs",
      label: "Weekly Availability",
      delay: 0.2,
    },
  ]

  return (
    <div id="resource-stats" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: stat.delay }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer"
        >
          <div className="flex items-start">
            <div className={`${stat.color} p-3 rounded-lg mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-slate-500">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
