"use client"

import { motion } from "framer-motion"

interface FaqCategoryProps {
  category: {
    id: string
    name: string
  }
  isActive: boolean
  onClick: () => void
  delay: number
}

export default function FaqCategory({ category, isActive, onClick, delay }: FaqCategoryProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? "bg-[#1d2b7d] text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1d2b7d] border border-slate-200"
      }`}
    >
      {category.name}
    </motion.button>
  )
}
