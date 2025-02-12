import { Schema, model, models } from "mongoose";
import { connectUsersDB } from "../lib/mongodb";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const db = await connectUsersDB();
const User = db.models.User || db.model("User", UserSchema);

export default User;
