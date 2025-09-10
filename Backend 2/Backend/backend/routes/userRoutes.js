// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../model/user");

// ✅ CREATE user (register)
router.post("/users", async (req, res) => {
  try {
    const {  name, email, role, semester, section, photoURL } = req.body;
    console.log("Creating user:", { name, email, role, semester, section });
    // Prevent duplicate registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      role,
      semester: role === "student" ? semester : null,
      section: role === "student" ? section : null,
      photoURL: photoURL || "/default.jpg",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET user by email
router.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
