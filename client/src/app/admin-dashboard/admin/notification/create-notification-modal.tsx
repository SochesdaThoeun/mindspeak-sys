"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Upload,
  LinkIcon,
  Hash,
  Send,
  Calendar,
  Megaphone,
  Info,
  AlertTriangle,
  Users,
  Plus,
  Trash2,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import user from "@/assets/user.jpg"

interface CreateNotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onNotificationSent: (notification: {
    id: number
    title: string
    message: string
    type: string
    date: string
    sentTo: number
    viewCount: number
    clickCount: number
    hashtags: string[]
    image: string | null
    link?: string
  }) => void
}

export default function CreateNotificationModal({ isOpen, onClose, onNotificationSent }: CreateNotificationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    link: "",
    hashtags: [] as string[],
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentHashtag, setCurrentHashtag] = useState("")

  const notificationTypes = [
    { value: "announcement", label: "Announcement", icon: Megaphone, color: "purple" },
    { value: "event", label: "Event", icon: Calendar, color: "blue" },
    { value: "alert", label: "Alert", icon: AlertTriangle, color: "amber" },
    { value: "update", label: "Update", icon: Info, color: "emerald" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, image: null })
    setImagePreview(null)
  }

  const addHashtag = () => {
    if (currentHashtag.trim() && !formData.hashtags.includes(currentHashtag.trim())) {
      const hashtag = currentHashtag.startsWith("#") ? currentHashtag : `#${currentHashtag}`
      setFormData({ ...formData, hashtags: [...formData.hashtags, hashtag] })
      setCurrentHashtag("")
    }
  }

  const removeHashtag = (index: number) => {
    setFormData({
      ...formData,
      hashtags: formData.hashtags.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newNotification = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      date: new Date().toISOString(),
      sentTo: 1250,
      viewCount: 0,
      clickCount: 0,
      hashtags: formData.hashtags,
      image: imagePreview,
      link: formData.link || undefined,
    }

    onNotificationSent(newNotification)

    // Reset form
    setFormData({
      title: "",
      message: "",
      type: "",
      link: "",
      hashtags: [],
      image: null,
    })
    setImagePreview(null)
    setIsSubmitting(false)
  }

  const selectedType = notificationTypes.find((type) => type.value === formData.type)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Logo */}
            <div className="bg-white border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Create Notification</h2>
                      <p className="text-sm text-gray-500">Send a push notification to all users</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)]">
              {/* Left Side - Form */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Type Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="type" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Notification Type *
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="w-full h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-gray-100">
                        {notificationTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value} className="rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-${type.color}-100`}>
                                  <Icon className={`h-4 w-4 text-${type.color}-600`} />
                                </div>
                                {type.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter notification title"
                      className="w-full h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors text-base"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Description *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter notification description"
                      rows={4}
                      className="w-full border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors text-base resize-none"
                      required
                    />
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-3">
                    <Label className="text-xs sm:text-sm font-semibold text-gray-700">Hashtags</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={currentHashtag}
                          onChange={(e) => setCurrentHashtag(e.target.value)}
                          placeholder="Add hashtag"
                          className="pl-12 h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addHashtag()
                            }
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addHashtag}
                        variant="outline"
                        className="h-10 sm:h-12 px-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.hashtags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                          >
                            {tag}
                            <Button
                              type="button"
                              onClick={() => removeHashtag(index)}
                              className="hover:text-red-500 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  <div className="space-y-3">
                    <Label htmlFor="link" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Link (Optional)
                    </Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://example.com"
                        className="pl-12 h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="px-4 py-2 sm:px-6 sm:py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!formData.title || !formData.message || !formData.type || isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Notification"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right Side - Image Upload & Preview */}
              <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50">
                <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                  <div>
                    <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-4 block">Image Upload</Label>

                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                              <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                Upload an image
                              </p>
                              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <Image
                          src={user || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-2xl border border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                          className="absolute top-3 right-3 rounded-full shadow-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Preview */}
                  <div>
                    <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-4 block">Preview</Label>
                    <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                      <CardContent className="p-5">
                        {imagePreview && (
                          <Image
                            src={user || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-20 sm:h-24 object-cover rounded-xl mb-4 border border-gray-100"
                          />
                        )}

                        <div className="flex items-center gap-2 mb-3">
                          {selectedType && (
                            <div className={`p-2 rounded-xl bg-${selectedType.color}-100`}>
                              <selectedType.icon className={`h-3 w-3 text-${selectedType.color}-600`} />
                            </div>
                          )}
                        </div>

                        <h4 className="font-semibold text-gray-900 text-sm mb-2">
                          {formData.title || "Notification Title"}
                        </h4>

                        <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                          {formData.message || "Notification description will appear here..."}
                        </p>

                        {formData.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {formData.hashtags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs rounded-full px-2 py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            1,250 recipients
                          </span>
                          <span>Just now</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
