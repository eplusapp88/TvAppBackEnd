// controllers/ChannelController.js
const Channel = require("../models/channelModel");

// CRUD operations
// Create Channel
exports.createChannel = async (req, res, next) => {
  try {
    // Hash the password before storing it in the database

    const newChannel = await Channel.create(req.body);
    res.status(201).json(newChannel);
  } catch (error) {
    console.error("Error creating Channel:", error.message);
    next(error);
  }
};

// Get all Channel
exports.getAllChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findAll();
    res.json(channel);
  } catch (error) {
    console.error("Error getting Channel:", error.message);
    next(error);
  }
};

// Get Channel by ID
exports.getChannelById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findByPk(id);
    if (!channel) {
      res.status(404).json({ error: "Channel not found." });
    } else {
      res.json(channel);
    }
  } catch (error) {
    console.error("Error getting Channel by ID:", error.message);
    next(error);
  }
};

// Update Channel by ID
exports.updateChannel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedChannel] = await Channel.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "Channel not found." });
    } else {
      res.json(updatedChannel[0]);
    }
  } catch (error) {
    console.error("Error updating Channel:", error.message);
    next(error);
  }
};

// Delete Channel by ID
exports.deleteChannel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await Channel.destroy({
      where: { id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: "Channel not found." });
    } else {
      res.json({ message: "Channel deleted successfully." });
    }
  } catch (error) {
    console.error("Error deleting Channel:", error.message);
    next(error);
  }
};
