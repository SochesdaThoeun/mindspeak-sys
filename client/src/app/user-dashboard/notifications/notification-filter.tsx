"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface NotificationFilterProps {
  filter: {
    id: string
    label: string
    icon: LucideIcon
  }
  isActive: boolean
  onClick: () => void
  delay: number
}

export default function NotificationFilter({ filter, isActive, onClick, delay }: NotificationFilterProps) {
  const Icon = filter.icon

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
        isActive
          ? "bg-[#1d2b7d] text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1d2b7d] border border-slate-200"
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {filter.label}
    </motion.button>
  )
}
