import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectUsersDB } from "../../../lib/mongodb"; // ✅ Connect to Users DB
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("📩 Received Signup Request");

    const db = await connectUsersDB(); // ✅ Connect to Users Database
    console.log("✅ Connected to Users Database (test)");

    const { name, email, password } = req.body;
    console.log("📌 Incoming Data:", { name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("✅ User Created in MongoDB:", newUser);
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
