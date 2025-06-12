"use client"

import { useState, useEffect } from "react"
import type React from "react"
//import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Navbar } from "@/components/admin-navbar"

interface AdminLayoutClientProps {
  children: React.ReactNode
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return (
 //   <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Fixed Navbar */}
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
        />

        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main
          className={`
            pt-16 transition-all duration-300 ease-in-out
            ${isMobile ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-[280px]"}
          `}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
 //   </ThemeProvider>
  )
}
