// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

// CRUD routes
// Create Channels
router.post("/channels", channelController.createChannel);

// Get all Channels
router.get("/channels", channelController.getAllChannel);

// Get Channels by ID
router.get("/channels/:id", channelController.getChannelById);

// Update Channels by ID
router.put("/channels/:id", channelController.updateChannel);

// Delete Channels by ID
router.delete("/channels/:id", channelController.deleteChannel);

module.exports = router;
