import type { Message } from "@/app/admin-dashboard/admin/contact/types/message"

export const mockMessages: Message[] = [
  {
    id: 1,
    senderName: "John Doe",
    senderEmail: "john.doe@example.com",
    subject: "Website Bug Report",
    message:
      "I found a bug on your website where the contact form doesn't submit properly on mobile devices. When I try to submit the form, it just shows a loading spinner indefinitely.",
    status: "unread",
    receivedDate: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    senderName: "Sarah Johnson",
    senderEmail: "sarah.j@company.com",
    subject: "Partnership Inquiry",
    message:
      "Hello! I represent a digital marketing agency and we're interested in exploring potential partnership opportunities with your company. Could we schedule a call to discuss this further?",
    status: "read",
    receivedDate: "2024-01-14T14:22:00Z",
  },
  {
    id: 3,
    senderName: "Mike Chen",
    senderEmail: "mike.chen@email.com",
    subject: "Feature Request",
    message:
      "I absolutely love using your platform! I was wondering if you could add a dark mode feature to the application. It would be really helpful for users who work late hours.",
    status: "resolved",
    receivedDate: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    senderName: "Emily Davis",
    senderEmail: "emily.davis@startup.io",
    subject: "Billing Question",
    message:
      "I have a question about my recent invoice. There seems to be a discrepancy in the amount charged compared to our agreed pricing plan. Could someone please review this?",
    status: "unread",
    receivedDate: "2024-01-12T16:45:00Z",
  },
  {
    id: 5,
    senderName: "Alex Rodriguez",
    senderEmail: "alex.r@design.com",
    subject: "Positive Feedback",
    message:
      "I wanted to compliment your team on the new website design! The visual improvements are outstanding and the user experience is much better. Great work!",
    status: "read",
    receivedDate: "2024-01-11T11:20:00Z",
  },
  {
    id: 6,
    senderName: "David Kim",
    senderEmail: "david.kim@techcorp.com",
    subject: "API Integration Support",
    message:
      "Our development team is working on integrating your API into our system, but we're encountering some authentication issues. Could you provide more detailed examples?",
    status: "unread",
    receivedDate: "2024-01-10T13:20:00Z",
  },
]

