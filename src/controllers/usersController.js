// controllers/UserController.js
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
// CRUD operations

// Create User
exports.createUser = async (req, res, next) => {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating User:", error.message);
    next(error);
  }
};

// Get all user
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error.message);
    next(error);
  }
};

// Get User by ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error("Error getting User by ID:", error.message);
    next(error);
  }
};

// Update User by ID
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedUser] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "User not found." });
    } else {
      res.json(updatedUser[0]);
    }
  } catch (error) {
    console.error("Error updating User:", error.message);
    next(error);
  }
};

// Delete User by ID
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await User.destroy({
      where: { id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: "User not found." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  } catch (error) {
    console.error("Error deleting User:", error.message);
    next(error);
  }
};
