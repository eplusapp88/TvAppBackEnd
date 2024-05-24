// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

// CRUD routes
// Create Programs
router.post("/programs", programController.createProgram);

// Get all Programs
router.get("/programs", programController.getAllProgram);

// Get Programs by ID
router.get("/programs/:id", programController.getProgramById);

// Update Programs by ID
router.put("/programs/:id", programController.updateProgram);

// Delete Programs by ID
router.delete("/programs/:id", programController.deleteProgram);

module.exports = router;
