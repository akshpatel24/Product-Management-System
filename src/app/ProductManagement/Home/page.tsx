"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Product Management System</h1>
      <p>Please click the button below to log in and manage products.</p>
      <Link href="/ProductManagement/Login">        
          Go to Login
      </Link>
    </div>
  );
}
