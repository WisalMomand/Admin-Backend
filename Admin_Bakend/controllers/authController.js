const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, semester, section } = req.body;

   if (!name || !email || !password) {
  return res.status(400).json({ message: "Name, email, and password are required" });
}


    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      semester,
      section
    });

    const token = generateToken(user._id);
    res.status(201).json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
