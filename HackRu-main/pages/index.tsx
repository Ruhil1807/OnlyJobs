"use client";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      {/* ✅ Properly Placed <title> for SEO */}
      <Head>
        <title>OnlyJobs - Find Your Dream Job</title>
        <meta name="description" content="OnlyJobs helps you streamline the hiring process and find the best job opportunities. Start your career journey with us today!" />
      </Head>

      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Full-Screen Background Image with Opacity */}
        <div 
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/image/1.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for Opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        </div>

        {/* Navbar */}
        <nav className="bg-white w-full fixed top-0 left-0 z-50 shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">OnlyJobs</Link>
          <div className="flex space-x-6">
            <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Career</Link>
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</Link>
          </div>
        </nav>

        {/* Content Box */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6">
          <div className="max-w-4xl p-12 bg-white bg-opacity-65 shadow-2xl rounded-xl border border-gray-200 backdrop-blur-lg">
            <h1 className="text-5xl font-bold text-gray-800">Welcome to OnlyJobs</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              Your one-stop solution for streamlining the hiring process and finding the best talent.
              Whether you're an employer looking for top candidates or a job seeker searching for opportunities, OnlyJobs has you covered.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link href="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition">Browse Jobs</Link>
              <Link href="/features" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-300 transition">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
