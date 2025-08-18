"use client";

import "./globals.css";
import Link from "next/link";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";



export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      // setAuthToken(token);
      router.push("/ProductManagement"); // ✅ Redirect if token exists
    }
    else{
      router.push("/ProductManagement/Login");

    }

  }, [router]);

  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
          <Link href="/ProductManagement/Login">Home</Link>
        </nav>
        {/* <AuthContext.Provider value={{ authToken, setAuthToken }}> */}
          {children}
        {/* </AuthContext.Provider> */}
      </body>
    </html>
  );
}
