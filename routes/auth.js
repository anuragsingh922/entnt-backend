const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwt_secret } = require("../config.js");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user?.name, email: user?.email , role : user?.role },
      jwt_secret,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({  name : user?.name , email : user?.email , role : user?.role,  token: token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Verify
router.get("/verify", async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    const token = auth.split("Bearer ")[1];
    jwt.verify(token, jwt_secret, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: "failed", err: err });
      } else {
        const user = {
          id : data?.userId,
          emailId: data?.email,
          name: data?.name,
          role : data?.role
        };
        if (user) {
          return res.status(200).json(user);
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
