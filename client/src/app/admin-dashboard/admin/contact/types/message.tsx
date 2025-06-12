export interface Message {
    id: number
    senderName: string
    senderEmail: string
    subject: string
    message: string
    status: MessageStatus
    receivedDate: string
  }
  
  export type MessageStatus = "unread" | "read" | "resolved"
  export type ViewMode = "table" | "cards"
  export type SortOption = "newest" | "oldest"
  