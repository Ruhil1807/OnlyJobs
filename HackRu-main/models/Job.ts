import { Schema, model, models } from "mongoose";
import { connectJobsDB } from "../lib/mongodb";

const JobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  postedAt: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Active", "Expired"], default: "Active" },
});

const db = await connectJobsDB();
const Job = db.models.Job || db.model("Job", JobSchema);

export default Job;
