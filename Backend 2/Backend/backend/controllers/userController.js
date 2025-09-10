// controllers/userController.js
const User = require("../model/User");

// POST /api/users/register
exports.registerUser = async (req, res) => {
  const {  name, email, role, semester, section } = req.body;
   console.log("Registering user:", { name, email, role, semester, section });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({  name, email, role, status : "pending", semester, section });
    await user.save();
    console.log("User registered:", user);

    res.status(201).json({user, message: "✅ User saved successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// GET /api/users/:email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Get User Error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

