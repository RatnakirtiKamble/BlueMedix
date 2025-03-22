const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};


router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["isAdmin", "isCustomer", "isSeller"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, role } = req.body;

      // Check if user exists
      let user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      user = await User.create({ name, email, password: hashedPassword, role });

      // Generate JWT
      const token = generateToken(user);

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 🔵 LOGIN
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      // Check user existence
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // Generate JWT
      const token = generateToken(user);

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
