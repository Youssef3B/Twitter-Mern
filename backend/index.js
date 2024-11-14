// api/index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize express
const app = express();

// Middleware
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Database connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = db;
  return db;
}

// Import routes
const userPath = require("../routes/user");
const authPath = require("../routes/auth");
const commentsPath = require("../routes/comments");
const followersPath = require("../routes/follower");
const likesPath = require("../routes/like");
const postsPath = require("../routes/post");
const savedPath = require("../routes/saved");

// Routes
app.use("/api/user", userPath);
app.use("/api/auth", authPath);
app.use("/api/comments", commentsPath);
app.use("/api/followers", followersPath);
app.use("/api/likes", likesPath);
app.use("/api/poste", postsPath);
app.use("/api/saves", savedPath);

// Health check route
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to database before handling requests
module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
};
