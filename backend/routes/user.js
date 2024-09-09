const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

/**
 * @path /api/user/allusers
 * @method GET
 * @description Get All Users
 */

router.get("/allusers", async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: "Something wen Wrong", error });
  }
});
module.exports = router;
