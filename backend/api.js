require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");

const sequelize = require("./config/database");
const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/auth", authRoutes);

// CRUD routes for products
app.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  product ? res.json(product) : res.status(404).send("Product not found");
});

app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  await product.update(req.body);
  res.json({ message: "Product updated successfully", product });
});

app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  await product.destroy();
  res.json({ message: "Product deleted successfully" });
});

// CRUD routes for users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user ? res.json(user) : res.status(404).send("User not found");
});

app.post("/users", async (req, res) => {
  const { name, gender, age, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, gender, age, email, password: hashedPassword, role });
  res.status(201).json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("User not found");
  await user.update(req.body);
  res.json({ message: "User updated successfully", user });
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("User not found");
  await user.destroy();
  res.json({ message: "User deleted successfully" });
});


app.listen(port, async () => {
  
  await sequelize.sync({ alter: true }); 
  console.log(`Server running on http://localhost:${port}`);
});
