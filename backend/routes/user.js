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

/**
 * @path /api/user/getUserById
 * @method GET
 * @description Get User From His Id
 */

router.get("/getUserById/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something wen wrong", error });
  }
});
module.exports = router;
