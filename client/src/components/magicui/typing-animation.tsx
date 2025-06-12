"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  children: string
  className?: string
  speed?: number
  delay?: number
}

export function TypingAnimation({ children, className, speed = 50, delay = 0 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartAnimation(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!startAnimation) return

    if (currentIndex < children.length) {
      const timer = setTimeout(() => {
        setDisplayedText(children.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [children, currentIndex, speed, startAnimation])

  return (
    <span className={cn("", className)}>
      {displayedText}
      {currentIndex < children.length && <span className="animate-pulse">|</span>}
    </span>
  )
}
