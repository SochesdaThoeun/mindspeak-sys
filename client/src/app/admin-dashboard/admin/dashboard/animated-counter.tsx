"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  className?: string
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  className = "",
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [mounted, setMounted] = useState(false)
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

  useEffect(() => {
    setMounted(true)
    spring.set(value)
  }, [spring, value])

  if (!mounted) {
    return (
      <span className={className}>
        {prefix}0{suffix}
      </span>
    )
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  )
}
