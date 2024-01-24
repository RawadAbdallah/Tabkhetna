const express = require("express");
const {
    addPost,
    getUserPosts,
    addComment,
    addOrRemoveLike,
    saveUnsaveBookmark,
    getLikes,
} = require("../controllers/post.controller");
const {mediaUpload} = require("../configs/multer.config");

const router = express.Router();



// Define routes for the post controller
router.post("/add", mediaUpload , addPost);
router.post('/add-comment', addComment)
router.post('/like/:id', addOrRemoveLike)
router.post('/save/:id', saveUnsaveBookmark)
router.get("/:id", getUserPosts);
router.get('/like/get/:id', getLikes)

module.exports = router;
