import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Message, SortOption } from "@/app/admin-dashboard/admin/contact/types/message"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return "Yesterday"
  return formatDate(dateString)
}

export function filterMessages(messages: Message[], searchQuery: string, statusFilter: string): Message[] {
  return messages.filter((message) => {
    const matchesSearch =
      message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || message.status === statusFilter

    return matchesSearch && matchesStatus
  })
}

export function sortMessages(messages: Message[], sortBy: SortOption): Message[] {
  return [...messages].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime()
      case "oldest":
        return new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime()
      default:
        return 0
    }
  })
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
