const express = require("express");
const route = express.Router();
const users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "jaiTalwar";

route.use(express.json());

// Route 1: Get all users
route.get("/", async (req, res) => {
  try {
    const data = await users.find();
    res.send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Create a user
route.post(
  "/createuser",
  [
    body("name", "Enter a valid name").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password with at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }

    try {
      // Check if user already exists
      const check = await users.findOne({ email: req.body.email });
      if (check) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Create the user
      const newUser = await users.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      // Generate auth token
      const data = {
        userId: newUser.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success, message: "Internal Server Error" });
    }
  }
);

// Route 3: Login user
route.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      // Find the user by email
      let user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      // Compare passwords
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      // Generate auth token
      const data = {
        userId: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authtoken });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Route 4: Get logged-in user details
route.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;
