"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await signIn("credentials", {
        redirect: false, // Prevent automatic NextAuth redirect
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      setSuccess("✅ Sign-in successful! Redirecting...");
      
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | OnlyJobs</title>
        <meta name="description" content="Sign in to your OnlyJobs account and start applying for jobs or managing job postings." />
      </Head>

      <div className="relative w-full min-h-screen flex justify-center items-center text-center overflow-hidden">
        <div 
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/signin.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(1.5px)",
          }}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 backdrop-blur-md"></div>

        <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
          <Link href="/" className="text-2xl font-bold text-blue-600">OnlyJobs</Link>
          <div className="flex space-x-6">
            <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Career</Link>
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</Link>
          </div>
        </nav>

        <div className="relative z-10 bg-white bg-opacity-50 p-10 shadow-2xl rounded-lg max-w-md w-full border border-gray-200 backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold text-center text-blue-600">Sign In</h1>

          <form className="mt-6" onSubmit={handleSignIn}>
            <label className="block font-semibold text-gray-800">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your email" 
              required 
            />

            <label className="block mt-4 font-semibold text-gray-800">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your password" 
              required 
            />

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition flex items-center justify-center"
            >
              <img src="/image/google_logo.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign In with Google
            </button>
          </div>

          {error && <div className="mt-4 bg-red-100 text-red-700 border border-red-500 p-3 rounded-md">❌ {error}</div>}
          {success && <div className="mt-4 bg-green-100 text-green-700 border border-green-500 p-3 rounded-md">✅ {success}</div>}

          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
