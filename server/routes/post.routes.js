const express = require("express");
const {
    addPost,
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
// router.get("/", getPosts);
// router.delete("/delete/:postId", deletePost);
// router.put("/edit/:postId", editPost);

module.exports = router;
