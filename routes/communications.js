const express = require("express");
const router = express.Router();
const Communication = require("../models/Communication");
const Company = require("../models/Company");
const auth = require("../middleware/auth");

// Get all Communication
router.get("/", auth, async (req, res) => {
  try {
    const { companyID } = req.query;
    const communication = await Communication.find({
      company: companyID.toString(),
    })
    console.log("Communications : ", communication);
    res.status(200).json(communication);
  } catch (err) {
    console.error("Error in geting communications : ", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get all Communication
router.get("/all", auth, async (req, res) => {
  try {
    const communication = await Communication.find().populate("company");
    console.log("Communications : ", communication);
    res.status(200).json(communication);
  } catch (err) {
    console.error("Error in geting communications : ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add Communication
router.post("/", auth, async (req, res) => {
  try {
    console.log(req.body);
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Communication
router.put("/", auth, async (req, res) => {
  try {
    const communication = await Communication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!communication) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(communication);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Communication
router.delete("/", auth, async (req, res) => {
  try {
    const { email } = req.params;
    const communication = await Communication.findOneAndDelete({
      emails: email,
    });
    console.log(communication);
    if (!communication) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
