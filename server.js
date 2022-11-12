require("dotenv").config();
const express = require("express");
const app = express();
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Custom middleware logger
app.use(logger);

// built-in middlewares to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// routes
app.use("/todos", require("./routes/todos"));

// Error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});