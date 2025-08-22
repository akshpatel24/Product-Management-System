"use client";
import "./globals.css";
import Link from "next/link";
import { createContext, useState, useEffect, ReactNode } from "react";

import { useRouter } from "next/navigation";
export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    // Check if token exists in localStorage or sessionStorage
    // If it does, user is logged in → redirect to ProductManagement
    // If not, redirect to Login page
    if (token) {
      // setAuthToken(token);
      router.push("/ProductManagement"); // ✅ Redirect if token exists
    }
    else{
      router.push("/ProductManagement/Login");
    }

  }, [router]);


  //  On page load or refresh, the component mounts → useEffect runs.

  //  It reads authToken from localStorage or sessionStorage.
   
  //  If token exists → user is considered logged in → router redirects to /ProductManagement.
   
  //  If no token → user is redirected to /ProductManagement/Login.
   
  //  [router] dependency ensures useEffect has access to the router object, which is stable, so it only runs once on mount.






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
