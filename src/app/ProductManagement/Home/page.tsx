"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Product Management System</h1>
      <p>Please click the button below to log in and manage products.</p>
      <Link href="/ProductManagement/Login" legacyBehavior>
        <a
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            background: "#0070f3",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Go to Login
        </a>
      </Link>
    </div>
  );
}
