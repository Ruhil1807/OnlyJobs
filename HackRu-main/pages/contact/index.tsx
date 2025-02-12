"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      {/* ✅ Properly Placed <title> for SEO */}
      <Head>
        <title>Contact Us | OnlyJobs</title>
        <meta name="description" content="Get in touch with OnlyJobs for any queries or support. We're here to help!" />
      </Head>

      <div className="relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden">
        {/* Full-Screen Background Image with Blur Effect */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/contact1.jpeg')", // Ensure correct image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(1.5px)", // Apply blur effect
          }}
        ></div>

        {/* ✅ Fixed Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
          <Link href="/" className="text-2xl font-bold text-blue-600">OnlyJobs</Link>
          <div className="flex space-x-6">
            <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Career</Link>
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</Link>
          </div>
        </nav>

        {/* Content Section */}
        <div className="relative z-10 max-w-4xl p-12 bg-white bg-opacity-90 shadow-2xl rounded-xl border border-gray-200 backdrop-blur-lg mt-20">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-8">
            Have questions? Reach out to us for more details.
          </p>

          {/* Contact Form */}
          <div className="flex justify-center">
            <form className="w-full">
              <label className="block mb-2 font-semibold text-gray-800">Name:</label>
              <input type="text" className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Name" required />

              <label className="block mt-4 mb-2 font-semibold text-gray-800">Email:</label>
              <input type="email" className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Email" required />

              <label className="block mt-4 mb-2 font-semibold text-gray-800">Message:</label>
              <textarea className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} placeholder="Your Message" required></textarea>

              <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
