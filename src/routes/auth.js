import express from "express";
import User from "../models/User.js";
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { matricNo, password } = req.body;

  try {
    const user = new User({ matricNo, password });
    await user.save();
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Error creating user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { matricNo, password } = req.body;

  const user = await User.findOne({ matricNo, password });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

export default router;
