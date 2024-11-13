const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userPath = require("./routes/user");
const authPath = require("./routes/auth");
const commentsPath = require("./routes/comments");
const followersPath = require("./routes/follower");
const likesPath = require("./routes/like");
const postsPath = require("./routes/post");
const savedPath = require("./routes/saved");

const app = express();
const port = process.env.Port || 5000;

// Apply CORS before any other middleware or route
app.use(
  cors({
    origin: ["https://twitter-mern-frontend-two.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to MongoDB...`))
  .catch((error) => console.log(`Failed to connect to MongoDB`, error));

// Define Routes
app.use("/api/user", userPath);
app.use("/api/auth", authPath);
app.use("/api/comments", commentsPath);
app.use("/api/followers", followersPath);
app.use("/api/likes", likesPath);
app.use("/api/poste", postsPath);
app.use("/api/saves", savedPath);

// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
