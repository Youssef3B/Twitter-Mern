const express = require("express");
const { Follower } = require("../models/Follower");
const userArr = require("../helper/userArr");
const router = express.Router();

/**
 * @desc     Get All Followers
 * @route    /api/followers
 * @method   GET
 * @access   public
 */

router.get("/", async (req, res) => {
  try {
    const followers = await Follower.find().populate([
      { path: "user", select: userArr },
      { path: "user", select: userArr },
    ]);

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @desc     Add a Follower
 * @route    /api/followers
 * @method   POST
 * @access   public
 */

router.post("/", async (req, res) => {
  try {
    const follower = new Follower({
      userWhoFollow: req.body.userWhoFollow,
      userWhoFollowed: req.body.userWhoFollowed,
    });

    const result = await follower.save();
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
/**
 * @desc     Delete a Follower from His Id
 * @route    /api/follower/:id
 * @method   DELETE
 * @access   public
 */

router.delete("/:id", async (req, res) => {
  try {
    const follower = await Follower.findById(req.params.id);
    if (follower) {
      await Follower.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Follower deleted successfully" });
    } else {
      res.status(404).json({ message: "Follower not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
module.exports = router;
