"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Features() {
  return (
    <>
      {/* ✅ Properly Placed <title> for SEO */}
      <Head>
        <title>Features | OnlyJobs</title>
        <meta name="description" content="Discover the powerful features of OnlyJobs that make hiring easier, faster, and more efficient." />
      </Head>

      <div className="relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden">
        {/* Full-Screen Background Image with Blur Effect */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/feature.jpeg')", // Ensure correct image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(10px)", // Apply blur effect
            transform: "scale(1.1)", // Prevent image edges from cutting off
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
        <div className="relative z-10 max-w-6xl p-12 bg-white bg-opacity-90 shadow-2xl rounded-xl border border-gray-200 backdrop-blur-lg mt-20">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Our Key Features</h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover the powerful tools that make hiring faster, easier, and more efficient.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">🚀 Automated Resume Screening</h3>
              <p className="mt-2 text-gray-600">
                Save time by automatically filtering top candidates based on job requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">📝 Easy Job Posting</h3>
              <p className="mt-2 text-gray-600">
                Post jobs across multiple platforms with just one click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">🤝 Collaborative Hiring</h3>
              <p className="mt-2 text-gray-600">
                Work seamlessly with your hiring team to review candidates and share feedback.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">🔍 AI-Powered Candidate Matching</h3>
              <p className="mt-2 text-gray-600">
                Get the best candidate recommendations using smart AI matching.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">📅 Interview Scheduling</h3>
              <p className="mt-2 text-gray-600">
                Automate interview scheduling with calendar integration.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">🔒 Secure and Fast</h3>
              <p className="mt-2 text-gray-600">
                Your data is safe with top-tier security measures in place.
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center space-x-6">
            <Link href="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition">Browse Jobs</Link>
            <Link href="/contact" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-300 transition">Get in Touch</Link>
          </div>
        </div>
      </div>
    </>
  );
}
