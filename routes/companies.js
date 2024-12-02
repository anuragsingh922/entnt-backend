const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const auth = require("../middleware/auth");

// Get all companies
router.get("/", auth, async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add company
router.post("/", auth, async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update company
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatecopy = { ...req.body };
    delete updatecopy._id;
    const company = await Company.findByIdAndUpdate(id.toString(), updatecopy, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete company
router.delete("/:email", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
