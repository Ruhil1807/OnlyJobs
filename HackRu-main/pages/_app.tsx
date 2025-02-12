import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion"; // ✅ Added for smooth transitions

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* ✅ Fixed Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <NavContent />
      </nav>

      {/* ✅ Page Content */}
      <main className="max-w-6xl mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

// ✅ Extracted Nav Component for cleaner code
function NavContent() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between w-full items-center">
      {/* ✅ Logo & User Greeting */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">OnlyJobs</Link>
        
        {session?.user && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-lg font-semibold text-gray-700"
          >
            Welcome, {session.user.name}!
          </motion.span>
        )}
      </div>

      {/* ✅ Navigation Links */}
      <div className="flex space-x-6 items-center">
        <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Career</Link>

        {/* ✅ Logout or Sign In */}
        {session?.user ? (
          <button 
            onClick={() => signOut({ callbackUrl: "/" })} // ✅ Instantly redirects
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
