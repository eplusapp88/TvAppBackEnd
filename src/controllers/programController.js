// controllers/ProgramController.js
const Program = require("../models/programModel");

// CRUD operations
// Create Program
exports.createProgram = async (req, res, next) => {
  try {
    // Hash the password before storing it in the database

    const newProgram = await Program.create(req.body);
    res.status(201).json(newProgram);
  } catch (error) {
    console.error("Error creating Program:", error.message);
    next(error);
  }
};

// Get all Program
exports.getAllProgram = async (req, res, next) => {
  try {
    const program = await Program.findAll();
    res.json(program);
  } catch (error) {
    console.error("Error getting Program:", error.message);
    next(error);
  }
};

// Get Program by ID
exports.getProgramById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const program = await Program.findByPk(id);
    if (!program) {
      res.status(404).json({ error: "Program not found." });
    } else {
      res.json(program);
    }
  } catch (error) {
    console.error("Error getting Program by ID:", error.message);
    next(error);
  }
};

// Update Program by ID
exports.updateProgram = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedProgram] = await Program.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "Program not found." });
    } else {
      res.json(updatedProgram[0]);
    }
  } catch (error) {
    console.error("Error updating Program:", error.message);
    next(error);
  }
};

// Delete Program by ID
exports.deleteProgram = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await Program.destroy({
      where: { id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: "Program not found." });
    } else {
      res.json({ message: "Program deleted successfully." });
    }
  } catch (error) {
    console.error("Error deleting Program:", error.message);
    next(error);
  }
};
