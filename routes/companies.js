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
    console.log(req.body);
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
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete company
router.delete("/:email", auth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting : ", id);
    const company = await Company.findByIdAndDelete(id);
    console.log(company);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    console.log("Deleted");
    res.json({ message: "Company deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
