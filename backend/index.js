// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Performance optimization for MongoDB
mongoose.set("bufferCommands", false); // Disable mongoose buffering
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000, // Reduced from 45000
  maxPoolSize: 10, // Limit connection pool
  minPoolSize: 5,
  connectTimeoutMS: 5000,
};

// Initialize connection once
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URL,
      mongooseOptions
    );
    cachedConnection = connection;
    console.log("Connected to MongoDB...");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Initialize Express apps
const app = express();

// Enhanced CORS configuration
const corsConfig = {
  origin:
    process.env.NODE_ENV === "production" ? process.env.ALLOWED_ORIGIN : "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  maxAge: 86400, // CORS preflight cache for 24 hours
};

// Middleware optimization
app.use(cors(corsConfig));
app.use(express.json({ limit: "1mb" })); // Limit payload size
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Add response time header middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    res.setHeader("X-Response-Time", `${duration}ms`);
  });
  next();
});

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    if (!mongoose.connection.readyState) {
      await connectToDatabase();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Routes with timeout handling
const wrapRoute = (handler) => {
  return async (req, res, next) => {
    const timeout = setTimeout(() => {
      res.status(504).send("API Timeout");
    }, 4000); // Set timeout to 4s to ensure we respond within Vercel's 5s limit

    try {
      await handler(req, res, next);
      clearTimeout(timeout);
    } catch (error) {
      clearTimeout(timeout);
      next(error);
    }
  };
};

// Apply routes with wrapped handlers
app.use("/api/user", wrapRoute(require("./routes/user")));
app.use("/api/auth", wrapRoute(require("./routes/auth")));
app.use("/api/comments", wrapRoute(require("./routes/comments")));
app.use("/api/followers", wrapRoute(require("./routes/follower")));
app.use("/api/likes", wrapRoute(require("./routes/like")));
app.use("/api/posts", wrapRoute(require("./routes/post")));
app.use("/api/saved", wrapRoute(require("./routes/saved")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
