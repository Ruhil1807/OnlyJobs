"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Jobs() {
  const [jobs] = useState([
    { 
      title: "Software Engineer", 
      location: "Remote", 
      type: "Full-time", 
      status: "Open", 
      dueDate: "March 15, 2025" 
    },
    { 
      title: "Product Manager", 
      location: "New York, USA", 
      type: "Full-time", 
      status: "Closed", 
      dueDate: "January 31, 2025" 
    }
  ]);

  return (
    <>
      {/* ✅ Properly Placed <title> for SEO */}
      <Head>
        <title>Jobs | OnlyJobs</title>
        <meta name="description" content="Explore the latest job openings on OnlyJobs. Find your dream job and apply today!" />
      </Head>

      <div className="relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden">
        {/* Full-Screen Background Image with Blur Effect */}
        <div 
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/jobs-bg.jpeg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(5px)",
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
        <div className="relative z-10 max-w-5xl p-12 bg-white bg-opacity-90 shadow-2xl rounded-xl border border-gray-200 backdrop-blur-lg mt-20">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Job Openings</h1>
          <p className="text-lg text-gray-700 mb-8">
            Browse the latest job openings and apply today!
          </p>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.location} | {job.type}</p>
                <p className={`text-sm font-semibold mt-2 ${job.status === "Open" ? "text-green-600" : "text-red-600"}`}>
                  Status: {job.status}
                </p>
                <p className="text-sm text-gray-500">Due Date: {job.dueDate}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Redirect to Sign In Instead of Job Posting Form */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-blue-600">Post a Job</h2>
            <p className="text-lg text-gray-700 mb-4">
              Want to post a job? Please sign in first.
            </p>
            <Link href="/signin">
              <button 
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition"
              >
                Sign In to Post a Job
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
