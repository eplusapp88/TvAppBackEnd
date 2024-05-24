const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const { authenticateToken } = require("./middleware/authMiddleware");
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const winston = require("winston");
// Access environment variables
const dbName = process.env.DB_NAME;
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3008;
app.use(bodyParser.json());

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
    },
  })
);
// CORS middleware
app.use(cors());

// Security features middleware
app.use(helmet());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Routes import
const channelRoutes = require("./routes/channelRoutes");
const programRoutes = require("./routes/programRoutes");
const usersRoutes = require("./routes/userRoute");

// Route definition
app.use("/api", channelRoutes);
app.use("/api", programRoutes);
app.use("/api", usersRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ error: `Internal Server Error : the Error is -> ${err}` });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("Closing server...");
  // Handle closing server gracefully here (add proper shutdown logic)
  process.exit(0);
});
