"use client"

import { motion } from "framer-motion"

interface AnimatedProgressCircleProps {
  value: number
  color: string
}

export function AnimatedProgressCircle({ value, color }: AnimatedProgressCircleProps) {
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 56 56" className="transform -rotate-90">
        <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="4" />
        <motion.circle
          cx="28"
          cy="28"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          strokeLinecap="round"
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-600"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        {value}%
      </motion.div>
    </div>
  )
}
