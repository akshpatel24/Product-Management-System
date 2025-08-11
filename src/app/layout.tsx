"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React, { createContext, useState, useEffect } from "react";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const AuthContext = createContext<any>(null);

// Navbar
function Navbar() {
  return (
    <header className="bg-slate-500 py-4">
      <div className="container mx-auto">
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {/* Add more links as needed */}
        </nav>
      </div>
    </header>
  );
}

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) setAuthToken(token);
  }, []);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
