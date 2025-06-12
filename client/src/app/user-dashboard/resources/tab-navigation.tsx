"use client"

import { useState } from "react"
import { Phone, FileText, MapPin, Info, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState("hotlines")

  const tabs = [
    { id: "hotlines", label: "Hotlines", icon: Phone },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "centers", label: "Centers", icon: MapPin },
    { id: "resources", label: "Resources", icon: Info },
    { id: "videos", label: "Videos", icon: Video },
  ]

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center px-4 py-2 mx-1 rounded-md whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-blue-600 bg-blue-50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
            )}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 h-0.5 bg-blue-600 w-full left-0"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="h-0.5 w-full bg-slate-100 mt-1" />
    </div>
  )
}
