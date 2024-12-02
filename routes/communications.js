const express = require("express");
const router = express.Router();
const Communication = require("../models/Communication");
const Company = require("../models/Company");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// Get all Communication
router.get("/", auth, async (req, res) => {
  try {
    const { companyID } = req.query;
    const communication = await Communication.find({
      company: companyID.toString(),
    });
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
    res.status(200).json(communication);
  } catch (err) {
    console.error("Error in geting communications : ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add Communication
router.post("/", auth, async (req, res) => {
  try {
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (err) {
    console.error("Error in makeing new communication : ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Communication
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updatecopy = { ...req.body };
  delete updatecopy._id;
  delete updatecopy.performedBy;
  delete updatecopy.createdAt;
  delete updatecopy.company;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid communication ID" });
    }

    const communication = await Communication.findByIdAndUpdate(
      id.toString(),
      { $set: updatecopy },
      { new: true, runValidators: true }
    );

    if (!communication) {
      return res.status(404).json({ message: "Communication not found" });
    }

    return res.status(201).json(communication);
  } catch (err) {
    console.error("Error updating communication:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Communication
router.delete("/", auth, async (req, res) => {
  try {
    const { email } = req.params;
    const communication = await Communication.findOneAndDelete({
      emails: email,
    });
    if (!communication) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
