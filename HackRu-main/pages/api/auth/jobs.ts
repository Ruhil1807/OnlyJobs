import { NextApiRequest, NextApiResponse } from "next";
import { connectJobsDB } from "../../../lib/mongodb";
import Job from "../../../models/Job";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    await connectJobsDB(); // Ensure this is correct
    console.log("✅ Connected to Jobs Database");

    const jobs = await Job.find().sort({ postedAt: -1 });

    console.log("📌 Jobs Retrieved:", jobs.length, "jobs found");
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
