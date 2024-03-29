const express = require("express");
const {
    addPost,
    getUserPosts,
    addComment,
    addOrRemoveLike,
    saveUnsaveBookmark,
    getLikes,
    getSaves,
    getAllSavedPosts,
    getPosts,
    searchPosts
} = require("../controllers/post.controller");
const { mediaUpload } = require("../configs/multer.config");

const router = express.Router();

// Define routes for the post controller
router.post("/add", mediaUpload, addPost);
router.post("/add-comment", addComment);
router.post("/like/:id", addOrRemoveLike);
router.post("/save/:id", saveUnsaveBookmark);
router.get('/search', searchPosts)
router.get("/:id", getUserPosts);
router.get("/like/get/:id", getLikes);
router.get("/save/get/:id", getSaves);
router.get("/save/all", getAllSavedPosts);
router.get("/", getPosts);

module.exports = router;
