"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import logo from "@/assets/logo8.png"
import { BookOpen, GraduationCap, Lightbulb, Atom } from "lucide-react"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const starsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const constellationsRef = useRef<HTMLDivElement>(null)

  // Educational quotes
  const educationalQuotes = [
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Education is not the filling of a pail, but the lighting of a fire.",
    "Knowledge is power. Information is liberating. Education is the premise of progress.",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  ]

  // Generate stars and educational constellations
  useEffect(() => {
    // Create stars
    if (starsRef.current) {
      const container = starsRef.current
      container.innerHTML = ""

      // Create star clusters
      for (let i = 0; i < 5; i++) {
        const clusterX = Math.random() * 100
        const clusterY = Math.random() * 60
        const starCount = Math.floor(Math.random() * 10) + 5

        // Create stars in this cluster
        for (let j = 0; j < starCount; j++) {
          const star = document.createElement("div")
          const size = Math.random() * 2.5 + 0.5
          const distance = Math.random() * 15

          const angle = Math.random() * Math.PI * 2
          const x = clusterX + Math.cos(angle) * distance
          const y = clusterY + Math.sin(angle) * distance

          star.className = "absolute rounded-full"
          star.style.width = `${size}px`
          star.style.height = `${size}px`
          star.style.left = `${x}%`
          star.style.top = `${y}%`

          // Create star glow
          const glow = Math.random() * 2 + 1
          star.style.boxShadow = `0 0 ${glow}px ${glow}px rgba(255, 255, 255, 0.7)`

          // Random star color (mostly white with hints of blue/yellow)
          const colorType = Math.floor(Math.random() * 10)
          if (colorType < 7) {
            star.style.background = "rgba(255, 255, 255, 0.9)"
          } else if (colorType < 9) {
            star.style.background = "rgba(220, 240, 255, 0.9)" // Bluish
          } else {
            star.style.background = "rgba(255, 250, 220, 0.9)" // Yellowish
          }

          star.style.opacity = `${Math.random() * 0.5 + 0.5}`
          star.style.animation = `twinkle ${Math.random() * 8 + 4}s ease-in-out infinite`
          star.style.animationDelay = `${Math.random() * 5}s`

          container.appendChild(star)
        }
      }

      // Add some individual stars
      for (let i = 0; i < 30; i++) {
        const star = document.createElement("div")
        const size = Math.random() * 2 + 0.5

        star.className = "absolute rounded-full bg-white"
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 70}%`
        star.style.opacity = `${Math.random() * 0.7 + 0.3}`
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`
        star.style.animationDelay = `${Math.random() * 5}s`

        container.appendChild(star)
      }
    }

    // Create educational constellations
    if (constellationsRef.current) {
      const container = constellationsRef.current
      container.innerHTML = ""

      // Create constellation patterns (simplified shapes of educational symbols)
      const constellationPatterns = [
        // Book shape
        [
          { x: 20, y: 20 },
          { x: 30, y: 15 },
          { x: 40, y: 20 },
          { x: 40, y: 30 },
          { x: 30, y: 35 },
          { x: 20, y: 30 },
          { x: 20, y: 20 },
          { x: 30, y: 25 },
          { x: 40, y: 20 },
        ],
        // Graduation cap
        [
          { x: 70, y: 25 },
          { x: 80, y: 20 },
          { x: 90, y: 25 },
          { x: 80, y: 30 },
          { x: 70, y: 25 },
          { x: 80, y: 35 },
        ],
        // Atom
        [
          { x: 50, y: 60 },
          { x: 60, y: 55 },
          { x: 65, y: 65 },
          { x: 60, y: 75 },
          { x: 50, y: 70 },
          { x: 45, y: 60 },
          { x: 50, y: 60 },
        ],
      ]

      // Draw each constellation
      constellationPatterns.forEach((pattern, patternIndex) => {
        // Create stars at each point
        pattern.forEach((point, i) => {
          const star = document.createElement("div")
          star.className = "absolute rounded-full bg-[#4affda]"
          star.style.width = "3px"
          star.style.height = "3px"
          star.style.left = `${point.x}%`
          star.style.top = `${point.y}%`
          star.style.opacity = "0.8"
          star.style.boxShadow = "0 0 3px 1px rgba(74, 255, 218, 0.7)"
          star.style.animation = `constellationTwinkle 4s ease-in-out infinite`
          star.style.animationDelay = `${i * 0.2}s`
          container.appendChild(star)

          // Draw lines between points
          if (i < pattern.length - 1) {
            const nextPoint = pattern[i + 1]
            const line = document.createElement("div")

            // Calculate line position and angle
            const x1 = point.x
            const y1 = point.y
            const x2 = nextPoint.x
            const y2 = nextPoint.y

            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI

            line.className = "absolute bg-[#4affda]/20"
            line.style.width = `${length}%`
            line.style.height = "1px"
            line.style.left = `${x1}%`
            line.style.top = `${y1}%`
            line.style.transformOrigin = "0 0"
            line.style.transform = `rotate(${angle}deg)`
            line.style.animation = `constellationLine 8s ease-in-out infinite`
            line.style.animationDelay = `${patternIndex * 0.5}s`

            container.appendChild(line)
          }
        })
      })
    }

    // Create floating knowledge particles
    if (particlesRef.current) {
      const container = particlesRef.current
      container.innerHTML = ""

      // Symbols for knowledge particles
      const symbols = ["α", "β", "π", "Σ", "Ω", "∞", "√", "∫", "≈", "≠", "±", "÷"]

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div")
        const size = Math.random() * 14 + 10
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]

        particle.className = "absolute text-[#a3d8ff]/30 font-light"
        particle.style.fontSize = `${size}px`
        particle.textContent = symbol

        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Animation
        particle.style.animation = `floatParticle ${Math.random() * 20 + 20}s ease-in-out infinite`
        particle.style.animationDelay = `${Math.random() * 10}s`

        container.appendChild(particle)
      }
    }

    // Rotate through educational quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % educationalQuotes.length)
    }, 5000)

    return () => {
      clearInterval(quoteInterval)
    }
  }, [educationalQuotes.length])

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Fade out when complete
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [progress])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] transition-opacity duration-1000 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Educational space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d2b7d] to-[#0c1445] overflow-hidden">
        {/* Stars */}
        <div ref={starsRef} className="absolute inset-0 overflow-hidden" />

        {/* Educational constellations */}
        <div ref={constellationsRef} className="absolute inset-0 overflow-hidden" />

        {/* Knowledge particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

        {/* Glowing orb (representing knowledge) */}
        <div className="absolute top-[15%] right-[15%] w-28 h-28 rounded-full bg-gradient-to-br from-[#e1e8ff] to-[#a3b5ff] opacity-70 blur-[1px]">
          <div className="absolute inset-2 rounded-full bg-white opacity-80" />

          {/* Knowledge rays */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={`ray-${i}`}
                className={`rayStyle ray-animation ray-${i} ray-class`}
              />
            ))}
          </div>
        </div>

        {/* Library/campus silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] overflow-hidden">
          {/* Main building */}
          <div className="absolute bottom-0 left-[50%] transform -translate-x-1/2 w-[60%] h-[80%]">
            <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-[#0c1445]" />

            {/* Roof/dome */}
            <div className="absolute bottom-[70%] left-[50%] transform -translate-x-1/2 w-[40%] h-[30%] bg-[#0c1445] rounded-t-[100%]" />

            {/* Columns */}
            {[...Array(7)].map((_, i) => (
              <div
                key={`column-${i}`}
                className="absolute bottom-0 bg-[#152163] w-[4%] h-[60%]"
                style={{ left: `${10 + i * 14}%` }}
              />
            ))}

            {/* Steps */}
            <div className="absolute bottom-0 left-[5%] right-[5%] h-[10%] bg-[#152163]" />
            <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[5%] bg-[#152163]" />
          </div>

          {/* Side buildings */}
          <div className="absolute bottom-0 left-[10%] w-[20%] h-[50%] bg-[#0c1445]">
            {/* Windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`left-window-${i}`}
                className="absolute bg-[#4affda]/10 w-[15%] h-[10%]"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  bottom: `${20 + Math.floor(i / 3) * 30}%`,
                }}
              />
            ))}
          </div>

          <div className="absolute bottom-0 right-[10%] w-[20%] h-[60%] bg-[#0c1445]">
            {/* Windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`right-window-${i}`}
                className="absolute bg-[#4affda]/10 w-[15%] h-[10%]"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  bottom: `${20 + Math.floor(i / 3) * 30}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle glow at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#4affda]/5 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Logo with educational elements */}
        <div className="relative mb-16">
          <div className="w-48 h-48 relative mb-4 mx-auto">
            {/* Orbiting educational icons */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1d2b7d] rounded-full p-2 shadow-[0_0_10px_rgba(74,255,218,0.3)]">
                <BookOpen className="w-6 h-6 text-[#4affda]" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin-slow-reverse">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#1d2b7d] rounded-full p-2 shadow-[0_0_10px_rgba(74,255,218,0.3)]">
                <GraduationCap className="w-6 h-6 text-[#4affda]" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin-medium">
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#1d2b7d] rounded-full p-2 shadow-[0_0_10px_rgba(74,255,218,0.3)]">
                <Lightbulb className="w-6 h-6 text-[#4affda]" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin-medium-reverse">
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#1d2b7d] rounded-full p-2 shadow-[0_0_10px_rgba(74,255,218,0.3)]">
                <Atom className="w-6 h-6 text-[#4affda]" />
              </div>
            </div>

            {/* Circular progress indicator */}
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#152163] stroke-current"
                strokeWidth="2"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
              <circle
                className="text-[#4affda] stroke-current transition-all duration-300 ease-in-out"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
                strokeDasharray="289.02652413026095"
                strokeDashoffset={289.02652413026095 * (1 - progress / 100)}
              />
            </svg>

            {/* Logo container */}
            <div className="absolute inset-8 flex items-center justify-center rounded-full bg-[#1d2b7d]/80 backdrop-blur-sm overflow-hidden shadow-[0_0_30px_rgba(74,255,218,0.3)]">
              {/* Knowledge glow effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#72a0ff]/20 via-[#a3d8ff]/20 to-[#72a0ff]/20 animate-knowledge-flow" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4affda]/10 via-[#a372ff]/10 to-[#4affda]/10 animate-knowledge-flow-alt" />
              </div>

              {/* Logo */}
              <div className="relative z-10 p-2 rounded-full">
                <div className="absolute inset-0 rounded-full bg-[#ffff] animate-pulse-slow" />
                <Image
                  src={logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain brightness-125"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Educational progress bar */}
        <div className="w-full px-4">
          <div className="flex justify-between mb-3">
            <span className="text-xs font-medium text-[#a3d8ff] tracking-wider uppercase flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4affda] mr-2 animate-pulse"></span>
              Loading Knowledge Base
            </span>
            <span className="text-xs font-medium text-[#4affda]">{progress}%</span>
          </div>

          {/* Progress bar resembling a book page filling */}
          <div className="w-full h-4 bg-[#152163] rounded-full overflow-hidden relative shadow-inner border border-[#72a0ff]/20">
            {/* Page turning effect */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-[#72a0ff] opacity-20 animate-page-turn" />
              <div className="absolute inset-0 bg-[#72a0ff] opacity-20 animate-page-turn-reverse" />
            </div>

            {/* Main progress */}
            <div
              className="h-full bg-gradient-to-r from-[#ffff] via-[#ffff]/70 to-[#1d2b7d] transition-all duration-300 ease-out relative brightness-125"
              style={{ width: `${progress}%` }}
            >
              {/* Text lines effect */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute h-[1px] bg-white/30"
                  style={{
                    left: "10%",
                    right: "10%",
                    top: `${30 + i * 20}%`,
                    animation: `lineFade 3s ease-in-out infinite ${i * 0.5}s`,
                  }}
                />
              ))}

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer" />
            </div>
          </div>

          {/* Educational quotes */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-[#152163]/50 px-5 py-3 rounded-lg backdrop-blur-sm border border-[#72a0ff]/20 shadow-[0_0_20px_rgba(29,43,125,0.5)]">
              <div className="text-[#ffff] font-serif brightness-125 overflow-hidden">
                <p className="text-sm font-light italic min-h-[3rem] transition-opacity duration-500">
                  &quot;{educationalQuotes[currentQuote]}&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Educational status message */}
          <div className="mt-6 text-center">
            <div className="text-xs text-[#4affda]/70 font-bold uppercase tracking-wider">
              {progress < 20 && "Initializing Learning Environment..."}
              {progress >= 20 && progress < 40 && "Accessing Knowledge Repository..."}
              {progress >= 40 && progress < 60 && "Preparing Educational Resources..."}
              {progress >= 60 && progress < 80 && "Optimizing Learning Pathways..."}
              {progress >= 80 && progress < 95 && "Finalizing Educational Experience..."}
              {progress >= 95 && "Ready To Begin Learning Journey..."}
            </div>
          </div>
        </div>
      </div>

      {/* Educational animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes constellationTwinkle {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes constellationLine {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translate(20px, -15px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(0, -30px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translate(-20px, -15px) rotate(270deg);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.2;
          }
        }
        
        @keyframes rayPulse {
          0%, 100% {
            opacity: 0.1;
            width: 40px;
          }
          50% {
            opacity: 0.3;
            width: 60px;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-medium-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes knowledge-flow {
          0% {
            transform: translateX(-100%) rotate(45deg) scale(2.5);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%) rotate(45deg) scale(2.5);
            opacity: 0.3;
          }
        }
        
        @keyframes knowledge-flow-alt {
          0% {
            transform: translateX(100%) rotate(-45deg) scale(2.5);
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(-100%) rotate(-45deg) scale(2.5);
            opacity: 0.2;
          }
        }
        
        @keyframes page-turn {
          0% {
            transform: translateX(-100%) skewX(20deg);
          }
          100% {
            transform: translateX(100%) skewX(20deg);
          }
        }
        
        @keyframes page-turn-reverse {
          0% {
            transform: translateX(100%) skewX(-20deg);
          }
          100% {
            transform: translateX(-100%) skewX(-20deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(150%) skewX(-20deg);
          }
        }
        
        @keyframes lineFade {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 20s linear infinite;
        }
        
        .animate-spin-medium {
          animation: spin-medium 15s linear infinite;
        }
        
        .animate-spin-medium-reverse {
          animation: spin-medium-reverse 15s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
