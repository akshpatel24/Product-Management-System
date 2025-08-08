"use client";
import Link from 'next/link'; // Make sure this is at the top of your file
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("registeredUser", JSON.stringify(form));
    setMessage("Registration successful. You can now login.");
    setForm({ username: "", email: "", password: "" });
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
    </div>
  );
};

export default SignUpPage;
