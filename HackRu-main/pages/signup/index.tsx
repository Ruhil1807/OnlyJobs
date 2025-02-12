"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // Track error messages
  const [success, setSuccess] = useState(""); // Track success messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("📩 Sending request to /api/auth/signup with:", formData);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      // Parse response safely to prevent runtime errors
      const data = await response.json();

      console.log("📌 Signup API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Please try again.");
      }

      setSuccess("✅ Account created successfully! Redirecting...");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (err: any) {
      console.error("❌ Signup Error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Properly Placed <title> for SEO */}
      <Head>
        <title>Sign Up | OnlyJobs</title>
        <meta name="description" content="Create your OnlyJobs account to start applying for jobs or posting job listings today!" />
      </Head>

      <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Full-Screen Background Image with Blur Effect */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/Signup.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(1.5px)",
          }}
        ></div>

        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
          <Link href="/" className="text-2xl font-bold text-blue-600">OnlyJobs</Link>
          <div className="flex space-x-6">
            <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Career</Link>
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</Link>
          </div>
        </nav>

        {/* Sign Up Box */}
        <div className="relative z-10 max-w-md p-10 bg-white bg-opacity-90 shadow-2xl rounded-xl border border-gray-200 backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold text-center text-blue-600">Sign Up</h1>

          {/* Role Selection */}
          <div className="mt-4 flex justify-center space-x-6 bg-gray-100 p-4 rounded-lg">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} className="form-radio text-blue-600" />
              <span className="text-gray-700">User</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="role" value="employee" checked={role === "employee"} onChange={() => setRole("employee")} className="form-radio text-blue-600" />
              <span className="text-gray-700">Employee</span>
            </label>
          </div>

          {/* Sign Up Form */}
          <form className="mt-6" onSubmit={handleSignup}>
            <label className="block font-semibold text-gray-800">Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your full name" required />

            <label className="block mt-4 font-semibold text-gray-800">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required />

            <label className="block mt-4 font-semibold text-gray-800">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" required />

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg hover:bg-blue-700 transition">
              Create Account
            </button>
          </form>

          {/* Styled Success/Error Message Display */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-700 border border-red-500 p-3 rounded-md">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="mt-4 bg-green-100 text-green-700 border border-green-500 p-3 rounded-md">
              ✅ {success}
            </div>
          )}

          {/* Google Authentication Button */}
          <div className="mt-6">
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition flex items-center justify-center"
            >
              <img src="/image/google_logo.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign Up with Google
            </button>
          </div>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}