"use client";

import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import { Navbar } from "@/components/navbar";
import Loading from "@/components/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased 
          bg-white text-black 
          dark:bg-gray-900 dark:text-white
        `}
      >
        <Loading />
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1 pt-20 md:pl-64">
            <div className="p-4">{children}</div>
          </main>
        </div>
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 p-3 bg-[#1d2b7d] text-white rounded-full shadow-lg hover:bg-white hover:text-[#1d2b7d] transition-all duration-300 ease-in-out transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <span className="sr-only">Scroll to top</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}
      </body>
    </html>
  );
}
