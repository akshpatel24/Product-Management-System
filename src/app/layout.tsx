"use client";

import "./globals.css";
import Link from "next/link";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Create context for auth
// export const AuthContext = createContext({
//   authToken: null as string | null,
//   setAuthToken: (token: string | null) => {},
// });

export default function RootLayout({ children }: { children: ReactNode }) {
  // const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
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
