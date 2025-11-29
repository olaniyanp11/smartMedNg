import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  matricNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
