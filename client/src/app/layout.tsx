import "./globals.css";
import { StoreProvider } from "@/store/provider";

export const metadata = {
    title: 'Mindspeak - uniconfess',
    description: 'A safe space for mental health support and community',
    icons: {
      icon: '/logo9.png',
    },
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>  
            <StoreProvider>
              {children}
            </StoreProvider>
        </body>
      </html>
    )
  }
  