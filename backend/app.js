const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Get Routes

const userPath = require("./routes/user");
const authPath = require("./routes/auth");
const commentsPath = require("./routes/comments");

// PORT SERVER

const port = process.env.Port || 5000;

// Connection to Database

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to MongoDb...`))
  .catch((error) => console.log(`Connection Failed to MongoDb`, error));

// Init App
const app = express();
// Apply Middlewares
app.use(express.json());

// Routes

app.use("/api/user", userPath);
app.use("/api/auth", authPath);
app.use("/api/comments", commentsPath);
// Server Running

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
