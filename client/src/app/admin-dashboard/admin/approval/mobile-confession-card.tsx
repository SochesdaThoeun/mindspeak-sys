"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Clock, Eye, MoreHorizontal, X, ExternalLink, ImageIcon, AlertTriangle, Ban, User } from "lucide-react"
import Image from "next/image"
import type { Confession } from "./types/confession"
import { getStatusColor, getFeelingEmoji, formatDate } from "./utils/helper"

interface MobileConfessionCardProps {
  confession: Confession
  isSelected: boolean
  onSelectionChange: (id: number, checked: boolean) => void
  onStatusChange: (id: number, status: "approved" | "rejected") => void
  onView: (confession: Confession) => void
}

export function MobileConfessionCard({
  confession,
  isSelected,
  onSelectionChange,
  onStatusChange,
  onView,
}: MobileConfessionCardProps) {
  const dateInfo = formatDate(confession.timeConfession)

  return (
    <Card
      className={`border transition-all duration-200 ${
        isSelected ? "border-blue-300 bg-blue-50/30" : "border-gray-200 hover:border-gray-300"
      } ${confession.hasWarning ? "border-yellow-300 bg-yellow-50/30" : ""} ${
        confession.isBanned ? "border-red-300 bg-red-50/30" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelectionChange(confession.id, checked as boolean)}
            className="mt-1 border-gray-300"
          />

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black to-purple-500 flex items-center justify-center text-white font-medium">
                    <User className="h-5 w-5" />
                  </div>
                  {confession.hasWarning && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-2 w-2 text-white" />
                    </div>
                  )}
                  {confession.isBanned && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Ban className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 truncate">{confession.userName}</div>
                  <div className="text-sm text-gray-500">{confession.category}</div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onView(confession)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  {confession.status !== "approved" && (
                    <DropdownMenuItem
                      className="text-green-600"
                      onClick={() => onStatusChange(confession.id, "approved")}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </DropdownMenuItem>
                  )}
                  {confession.status !== "rejected" && (
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onStatusChange(confession.id, "rejected")}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Confession Image Preview */}
            {confession.image && (
              <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-3">
                <Image
                  src={confession.image || "/placeholder.svg"}
                  width="300"
                  height="128"
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                  alt="Confession image"
                  onClick={() => onView(confession)}
                />
              </div>
            )}

            {/* Image Status */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {confession.image ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Has Image</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-400">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                {confession.link ? (
                  <div className="flex items-center gap-1 text-blue-600">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm font-medium">Has Link</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-400">
                    <span className="text-sm">No Link</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">{confession.description}</p>

            {/* Status and Feeling */}
            <div className="flex items-center justify-between mb-3">
              <Badge
                className={`${getStatusColor(confession.status)} text-xs font-medium px-2 py-1 rounded-full border`}
              >
                • {confession.status.charAt(0).toUpperCase() + confession.status.slice(1)}
              </Badge>

              <div className="flex items-center gap-2">
                <span className="text-lg">{getFeelingEmoji(confession.feeling)}</span>
                <span className="text-sm text-gray-600">{confession.feeling}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{dateInfo.relative}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => onView(confession)} className="text-xs px-3 py-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
