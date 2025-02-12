import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../lib/mongodb";
import User from "..//models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB(); // Connect to MongoDB
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ MongoDB Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
