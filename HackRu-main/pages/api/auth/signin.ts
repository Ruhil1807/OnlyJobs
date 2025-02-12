import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectUsersDB } from "../../../lib/mongodb"; // ✅ Connect to the Users Database
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("📩 Received Sign-In Request");

    const db = await connectUsersDB(); // ✅ Connect to Users Database
    console.log("✅ Connected to Users Database (test)");

    const { email, password } = req.body;
    console.log("📌 Incoming Credentials:", { email });

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("⚠️ No user found with this email:", email);
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // ✅ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("❌ Password does not match for email:", email);
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    console.log("✅ Sign-In Successful:", user.email);

    return res.status(200).json({ 
      message: "Sign-in successful!", 
      user: { name: user.name, email: user.email } // ✅ Send only necessary data
    });

  } catch (error) {
    console.error("❌ Sign-In Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
