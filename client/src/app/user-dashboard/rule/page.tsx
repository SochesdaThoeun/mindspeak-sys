"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Info,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react"
import logo8 from "@/assets/logo8.png"


export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const tabs = [
    { id: "general", label: "Overview", icon: <Info className="w-5 h-5" /> },
    { id: "conduct", label: "General Conduct", icon: <Users className="w-5 h-5" /> },
    { id: "posting", label: "Posting Guidelines", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "violations", label: "Violations", icon: <AlertCircle className="w-5 h-5" /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" /> },
  ]

  const tabContent = {
    general: (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#1d2b7d] mb-4">Why These Rules Matter</h3>
            <p className="text-gray-700 leading-relaxed">
              To create a positive experience, we expect every user to follow a few simple but important rules. These
              help prevent misuse, protect privacy, and ensure everyone feels comfortable using the platform.
            </p>
          </div>
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={logo8}
              alt="Community guidelines illustration"
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1d2b7d]/10 to-transparent p-6 rounded-xl border-l-4 border-[#1d2b7d]">
          <h4 className="text-lg font-semibold text-[#1d2b7d] mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Our Community Principles
          </h4>
          <p className="text-gray-700">
            This page outlines the rules that all users must follow to help keep our community respectful, safe, and
            enjoyable for everyone.
          </p>
        </div>
      </div>
    ),
    conduct: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#1d2b7d] mb-4">General Conduct</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Be Respectful",
              description: "Be kind and respectful toward others.",
              icon: <Users className="w-10 h-10 text-[#1d2b7d]" />,
            },
            {
              title: "Appropriate Language",
              description: "Avoid using offensive, hateful, or inappropriate language.",
              icon: <MessageSquare className="w-10 h-10 text-[#1d2b7d]" />,
            },
            {
              title: "No Harassment",
              description: "No bullying, harassment, or targeting individuals.",
              icon: <Shield className="w-10 h-10 text-[#1d2b7d]" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="bg-[#1d2b7d]/10 p-4 rounded-full mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold text-[#1d2b7d] mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    posting: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#1d2b7d] mb-4">Posting Guidelines</h3>

        <div className="space-y-4">
          {[
            {
              title: "Quality Content",
              description: "Keep posts meaningful, honest, and constructive.",
            },
            {
              title: "Privacy Protection",
              description: "Don't share sensitive personal information—even in anonymous posts.",
            },
            {
              title: "No Spam",
              description: "No spam, self-promotion, or irrelevant links.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#1d2b7d] flex items-start gap-4"
            >
              <div className="bg-[#1d2b7d]/10 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-[#1d2b7d]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1d2b7d] mb-1">{item.title}</h4>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mt-6">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Important Note
          </h4>
          <p className="text-yellow-800">
            Remember that all content you post is subject to review by moderators and may be removed if it violates our
            guidelines.
          </p>
        </div>
      </div>
    ),
    violations: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#1d2b7d] mb-4">What Happens if You Break the Rules?</h3>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
              <div className="bg-yellow-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">First Offense</h4>
                <p className="text-gray-600">May lead to a warning.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Repeated Violations</h4>
                <p className="text-gray-600">Can result in a temporary or permanent ban.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Serious Violations</h4>
                <p className="text-gray-600">May be reported to your university/organization if needed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Image
            src={logo8}
            alt="Warning illustration"
            width={350}
            height={180}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    help: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#1d2b7d] mb-4">Need Help or Have Questions?</h3>

        <p className="text-gray-700 leading-relaxed">
          If you are unsure about a rule or want to report a problem, feel free to contact the admin or support team
          through the contact page or the feedback form.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-[#1d2b7d]/10 p-4 rounded-full mb-4">
              <MessageSquare className="w-10 h-10 text-[#1d2b7d]" />
            </div>
            <h4 className="text-lg font-semibold text-[#1d2b7d] mb-2">Contact Support</h4>
            <p className="text-gray-700 mb-4">Reach out to our support team for assistance with any issues.</p>
            <button className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
              Contact Us
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-[#1d2b7d]/10 p-4 rounded-full mb-4">
              <BookOpen className="w-10 h-10 text-[#1d2b7d]" />
            </div>
            <h4 className="text-lg font-semibold text-[#1d2b7d] mb-2">FAQ</h4>
            <p className="text-gray-700 mb-4">Browse our frequently asked questions for quick answers.</p>
            <button className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1d2b7d] to-[#2a3d99] text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-white/20 px-4 py-1 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Community Guidelines</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Rules & Guidelines</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              This page outlines the rules that all users must follow to help keep our community respectful, safe, and
              enjoyable for everyone.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="h-16 bg-gray-50 relative overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#1d2b7d"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-2">
              {tabs.find((tab) => tab.id === activeTab)?.icon}
              <span className="font-medium">{tabs.find((tab) => tab.id === activeTab)?.label}</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${showMobileMenu ? "rotate-90" : ""}`} />
          </button>

          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white mt-2 rounded-xl shadow-md overflow-hidden"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setShowMobileMenu(false)
                    }}
                    className={`w-full flex items-center gap-2 p-4 text-left ${
                      activeTab === tab.id ? "bg-[#1d2b7d]/10 text-[#1d2b7d]" : "text-gray-700"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation (Desktop) */}
          {!isMobile && (
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left border-l-4 transition-all ${
                      activeTab === tab.id
                        ? "border-[#1d2b7d] bg-[#1d2b7d]/5 text-[#1d2b7d]"
                        : "border-transparent hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="md:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              {tabContent[activeTab as keyof typeof tabContent]}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 rounded-3xl mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="bg-[#1d2b7d] text-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                {tab.icon}
              </button>
            ))}
          </div>
          <p className="text-[#1d2b7d] text-sm">© {new Date().getFullYear()} Educational Community Guidelines</p>
        </div>
      </footer>
    </div>
  )
}
