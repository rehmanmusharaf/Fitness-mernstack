const express = require("express");
const path = require("path");
const axios = require("axios");
const usermodel = require("../models/usermodel");
const router = express.Router();
const Comment = require("../models/commentmodel.js");
const { isAdminAuthenticated, isAuthenticated } = require("../middleware/auth");

// Get all comments
// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.find();
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Get all comments with pagination
router.get("/getcomments", async (req, res) => {
  console.log("Get Comment Api End POint Hit");
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 5; // Default to 5 comments per page if not specified
  try {
    const comments = await Comment.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    res.json({
      success: true,
      comments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
});

// Create a new comment
router.post("/postcomment", isAuthenticated, async (req, res) => {
  try {
    console.log("APi End POINT hit");
    const comment = new Comment({
      text: req.body.comment,
      author: req.user.full_name,
    });
    const newComment = await comment.save();
    res.status(201).json({
      success: true,
      message: "Comment Saved Successfully",
      newComment,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update a comment
router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (req.body.text != null) {
      comment.text = req.body.text;
    }
    if (req.body.author != null) {
      comment.author = req.body.author;
    }

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete("/:id", isAdminAuthenticated, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
