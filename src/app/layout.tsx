"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    // ✅ In Next.js, "/Home/page.tsx" is actually "/Home"
    if (window.location.pathname !== "/ProductManagement/Home") {
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
          <Link href="/Home" style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link href="/ProductManagement/Login">Login</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
