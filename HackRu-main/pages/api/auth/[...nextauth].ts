import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectUsersDB } from "../../../lib/mongodb"; // ✅ Explicit connection to Users DB
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  debug: true, // ✅ Enable debugging in development mode
  providers: [
    // ✅ Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ✅ Email & Password Authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("⚠️ Both email and password are required.");
          }

          await connectUsersDB(); // ✅ Connect to the correct Users Database
          console.log("✅ Connected to Users Database (test)");

          // ✅ Check if user exists
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.warn("⚠️ User not found:", credentials.email);
            throw new Error("User not found. Please sign up.");
          }

          // ✅ Validate password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            console.warn("❌ Invalid password for:", credentials.email);
            throw new Error("Invalid credentials. Please try again.");
          }

          console.log("✅ User authenticated successfully:", user.email);

          return { id: user._id.toString(), email: user.email, name: user.name };
        } catch (error: any) {
          console.error("❌ Authentication Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  // ✅ Callbacks for JWT & Session Handling
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  // ✅ Configuration Settings
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },
});
