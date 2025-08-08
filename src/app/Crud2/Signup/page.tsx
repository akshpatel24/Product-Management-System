"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://182.237.13.165/AkshReactAPI/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const resultText = await response.text();

      if (response.ok) {
        setMessage("Registration successful. Redirecting to login...");
        setForm({ username: "", email: "", password: "" });

        // Wait for 1.5 seconds before redirecting
        setTimeout(() => {
          router.push("/Crud2/Login");
        }, 1500);``
      } else {
        setError(resultText || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Sign Up</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      {message && <p className="mt-3 alert alert-success">{message}</p>}
      {error && <p className="mt-3 alert alert-danger">{error}</p>}
    </div>
  );
};

export default SignUpPage;
