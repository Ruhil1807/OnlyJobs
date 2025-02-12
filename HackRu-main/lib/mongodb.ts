import mongoose from "mongoose";

// Ensure environment variables are defined
const MONGODB_URI1: string = process.env.MONGODB_URI1 ?? "";
const MONGODB_URI2: string = process.env.MONGODB_URI2 ?? "";

if (!MONGODB_URI1 || !MONGODB_URI2) {
  throw new Error("❌ MongoDB URIs are missing in .env.local");
}

// Global cache to prevent multiple connections
let cachedUsersDB = (global as any).mongooseUsers || { conn: null, promise: null };
let cachedJobsDB = (global as any).mongooseJobs || { conn: null, promise: null };

// Connect to Users Database (test DB)
export async function connectUsersDB() {
  if (cachedUsersDB.conn) return cachedUsersDB.conn;
  if (!cachedUsersDB.promise) {
    console.log("🔄 Connecting to Users Database...");
    cachedUsersDB.promise = mongoose.createConnection(MONGODB_URI1, {
      dbName: "test",
    }).asPromise();
  }
  cachedUsersDB.conn = await cachedUsersDB.promise;
  console.log("✅ Connected to Users Database!");
  return cachedUsersDB.conn;
}

// Connect to Jobs Database (jobsDB)
export async function connectJobsDB() {
  if (cachedJobsDB.conn) return cachedJobsDB.conn;
  if (!cachedJobsDB.promise) {
    console.log("🔄 Connecting to Jobs Database...");
    cachedJobsDB.promise = mongoose.createConnection(MONGODB_URI2, {
      dbName: "jobsDB",
    }).asPromise();
  }
  cachedJobsDB.conn = await cachedJobsDB.promise;
  console.log("✅ Connected to Jobs Database!");
  return cachedJobsDB.conn;
}
