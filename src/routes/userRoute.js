// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { authenticateToken } = require("../middleware/authMiddleware");
// CRUD routes

// Create User
router.post("/users", userController.createUser);

// Get all user
router.get("/users", userController.getAllUser);

// Get User by ID
router.get("/users/:id", userController.getUserById);

// Update User by ID
router.put("/users/:id", userController.updateUser);

// Delete User by ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
