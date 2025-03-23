const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

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
    body("gender").notEmpty(),
    body("age").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["isAdmin", "isCustomer", "isSeller"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, gender, age, email, password, role } = req.body;
      let user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, gender, age, email, password: hashedPassword, role });

      const token = generateToken(user);

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

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

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      const token = generateToken(user);

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
