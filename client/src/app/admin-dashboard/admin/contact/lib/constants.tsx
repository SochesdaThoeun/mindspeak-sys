import type { MessageStatus } from "@/app/admin-dashboard/admin/contact/types/message"

export const STATUS_COLORS: Record<MessageStatus, string> = {
  unread: "bg-blue-100 text-blue-800 border-blue-200",
  read: "bg-gray-100 text-gray-800 border-gray-200",
  resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
}

export const MESSAGE_CATEGORIES = ["General Inquiry", "Technical Issue", "Complaint", "Suggestion"] as const
