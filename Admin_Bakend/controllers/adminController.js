const User = require("../models/user");

// Get all users with filters
exports.listUsers = async (req, res) => {
  try {
    const { status, role, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (search) {
      filter.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }];
    }

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("listUsers error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "approved", "declined"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error("updateUserStatus error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
