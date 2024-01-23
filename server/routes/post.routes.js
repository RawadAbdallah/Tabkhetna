const express = require("express");
const {
    addPost,
    getUserPosts,
    // getPosts,
    // deletePost,
    // editPost,
} = require("../controllers/post.controller");
const {mediaUpload} = require("../configs/multer.config");

const router = express.Router();

// Add authentication middleware to protect these routes
// router.use(authMiddleware);

// Define routes for the post controller
router.post("/add", mediaUpload , addPost);
router.get("/:id", getUserPosts);
// router.put("/edit/:postId", editPost);

module.exports = router;
