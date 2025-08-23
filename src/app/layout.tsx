"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Only redirect if user is NOT on Home page
    if (window.location.pathname !== "/Home/page.tsx") {
      if (token) {
        router.push("/ProductManagement"); // User already logged in
      } else {
        router.push("/ProductManagement/Login"); // Not logged in
      }
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
          <Link href="/Home/page.tsx" style={{ marginRight: "1rem" }}>Home</Link>
          <Link href="/ProductManagement/Login">Login</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
