"use client"

import { Card } from "@/components/ui/card"
import { Users, UserPlus, Wifi, Activity } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ProgressCircleProps {
  value: number
  color: string
  size?: number
}

function ProgressCircle({ value, color, size = 40 }: ProgressCircleProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - 4) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="3" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xs font-semibold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AnimatedNumber value={animatedValue} delay={500} suffix="%" />
        </motion.span>
      </div>
    </div>
  )
}

interface AnimatedNumberProps {
  value: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
}

function AnimatedNumber({ value, duration = 1000, delay = 0, suffix = "", prefix = "" }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const increment = value / (duration / 16)
      const counter = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplayValue(value)
          clearInterval(counter)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(counter)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, duration, delay])

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

interface StatsCardsProps {
  stats: {
    totalUsers: number
    activeUsers: number
    onlineUsers: number
    newRegistrations: number
    avgActivityScore: number
    activePercentage: number
    onlinePercentage: number
    newUsersPercentage: number
    avgActivityPercentage: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100/80 rounded-xl">
              <Users size={24} className="text-[#6366f1]" />
            </div>
            <ProgressCircle value={100} color="#6366f1" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Users</p>
            <div className="flex items-baseline">
              <motion.span
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber value={stats.totalUsers} delay={300} />
              </motion.span>
              <motion.span
                className="text-emerald-500 ml-2 text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                +<AnimatedNumber value={stats.newRegistrations} delay={800} />
              </motion.span>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Active users: <AnimatedNumber value={stats.activeUsers} delay={1000} /> (
              <AnimatedNumber value={stats.activePercentage} delay={1200} suffix="%" />)
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100/80 rounded-xl">
              <UserPlus size={24} className="text-[#38bdf8]" />
            </div>
            <ProgressCircle value={stats.newUsersPercentage} color="#38bdf8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">New Users</p>
            <div className="flex items-baseline">
              <motion.span
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber value={stats.newRegistrations} delay={300} />
              </motion.span>
              <motion.span
                className="text-gray-400 ml-2 text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimatedNumber value={stats.newUsersPercentage} delay={800} suffix="%" />
              </motion.span>
            </div>
            <p className="text-xs text-gray-400 mt-3">This week registrations</p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100/80 rounded-xl">
              <Wifi size={24} className="text-[#10b981]" />
            </div>
            <ProgressCircle value={stats.onlinePercentage} color="#10b981" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Online Now</p>
            <div className="flex items-baseline">
              <motion.span
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber value={stats.onlineUsers} delay={300} />
              </motion.span>
              <motion.span
                className="text-gray-400 ml-2 text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimatedNumber value={stats.onlinePercentage} delay={800} suffix="%" />
              </motion.span>
            </div>
            <p className="text-xs text-gray-400 mt-3">Currently active users</p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100/80 rounded-xl">
              <Activity size={24} className="text-[#f59e0b]" />
            </div>
            <ProgressCircle value={stats.avgActivityPercentage} color="#f59e0b" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Avg Activity</p>
            <div className="flex items-baseline">
              <motion.span
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber value={stats.avgActivityScore} delay={300} />
              </motion.span>
              <motion.span
                className="text-gray-400 ml-2 text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimatedNumber value={stats.avgActivityPercentage} delay={800} suffix="%" />
              </motion.span>
            </div>
            <p className="text-xs text-gray-400 mt-3">Average login activity</p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
