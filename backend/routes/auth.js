const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { auth, authorize } = require("../middleware/authMiddleware");
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
  ],
  auth, 
  authorize("admin"), 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, gender, age, email, password } = req.body;
      let user = await User.findOne({ email }); 

      if (user) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, gender, age, email, password: hashedPassword, role: "user" });

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
      const user = await User.findOne({ email }); // Fix query for Mongoose

      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user);
      res.json({ token, role: user.role, id: user.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/users", auth, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/users/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
