const Post = require("../models/post.model");
const User = require("../models/user.model");
const { updateAchievements } = require("./achievement.controller");
// Function to add a new post
const addPost = async (req, res) => {
    try {
        const { title, ingredients, instructions, cuisine } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        if (!ingredients && !instructions) {
            return res.status(400).json({
                error: "Please provide either instructions, ingredients, or both; at least one input is required.",
            });
        }

        if (instructions && instructions.length < 12) {
            return res.status(400).json({
                error: "Instructions should be at least of 12 characters.",
            });
        }

        if (ingredients && ingredients.length < 12) {
            return res.status(400).json({
                error: "Ingredients should be at least of 12 characters.",
            });
        }

        if (!cuisine) {
            return res.status(400).json({ error: "Cuisine is required" });
        }

        const media = req.files.map((file) =>
            file.path.replace(/^storage\\/, "")
        );

        const newPost = new Post({
            title,
            ingredients,
            instructions,
            media,
            cuisine,
            posted_by: req.user._id,
        });

        await newPost.save();

        await User.updateOne(
            { _id: req.user._id },
            { $push: { posts: newPost } }
        );

        await updateAchievements(req.user._id);

        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const searchPosts = async (req, res) => {
    try {
        const query = req.query.q;
        const posts = await Post.find({
            $or: [
                { title: new RegExp(query, "i") },
                { ingredients: new RegExp(query, "i") },
                { instructions: new RegExp(query, "i") },
            ],
        });
        const postsModified = [];
        for (let i = 0; i < posts.length; i++) {
            const postUser = await User.findById(posts[i].posted_by);
            const postObject = posts[i].toObject();
            postObject.uploader = postUser.firstname + " " + postUser.lastname;
            postObject.profile_pic = postUser.profile_pic;
            postsModified.push(postObject);
        }
        res.status(200).json({ posts: postsModified });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
};

const getUserPosts = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const posts = await Post.find({ posted_by: user }).sort({
            createdAt: -1,
        });
        return res.status(200).json({ posts });
    } catch (e) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const addComment = async (req, res) => {
    const user = req.user;
    const { comment, _id: post_id } = req.body;
    try {
        if (!comment) {
            return res.status(400).json({ error: "Comment can't be empty." });
        }

        const post = await Post.findById(post_id);

        if (!post) {
            console.log("Post not found. Could've been deleted.");
            return res
                .status(400)
                .json({ error: "Post not found. Could've been deleted." });
        }

        await Post.updateOne(
            { _id: post_id },
            { $push: { comments: { user, comment } } }
        );
        return res.status(200).json({ comments: post.comments, comment });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getLikes = async (req, res) => {
    const { id: postId } = req.params;
    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res
                .status(404)
                .json({ error: "Post not found. Could've been deleted." });
        }
        return res.status(200).json(post.likes.length);
    } catch (err) {
        console.error(err);
        return res.status(500).json("Server Error");
    }
};

const getSaves = async (req, res) => {
    const { id: postId } = req.params;
    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res
                .status(404)
                .json({ error: "Post not found. Could've been deleted." });
        }
        return res.status(200).json(post.saved_by.length);
    } catch (err) {
        console.error(err);
        return res.status(500).json("Server Error");
    }
};

const getAllSavedPosts = async (req, res) => {
    const user = req.user;
    try {
        const savedPostsIds = await User.findById(user._id).select(
            "saved_recipes"
        );
        const savedPosts = [];
        for (let i = 0; i < savedPostsIds.saved_recipes.length; i++) {
            const savedPost = await Post.findById(
                savedPostsIds.saved_recipes[i]
            );
            if (!savedPost) {
                console.log("saved post not found");
                continue;
            }
            const savedPostUser = await User.findById(savedPost.posted_by);
            const savedPostObject = savedPost.toObject();
            savedPostObject.uploader =
                savedPostUser.firstname + " " + savedPostUser.lastname;
            savedPostObject.profile_pic = savedPostUser.profile_pic;

            console.log(savedPostObject);
            savedPosts.push(savedPostObject);
        }

        return res.status(200).json(savedPosts);
    } catch (e) {
        console.log(e);
        return res.status(500).send("server error");
    }
};

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 3;

    try {
        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 2) * pageSize)
            .limit(pageSize)
            .exec();
        const postsWithUserInfo = await Promise.all(
            posts.map(async (post) => {
                const user = await User.findById(post.posted_by).select(
                    "_id firstname lastname profile_pic"
                );

                return {
                    ...post.toObject(),
                    uploader: user.firstname + " " + user.lastname,
                    profile_pic: user.profile_pic,
                };
            })
        );

        return res.status(200).json({
            posts: postsWithUserInfo,
            totalPages: Math.ceil(totalPosts / pageSize),
            currentPage: page,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("server error");
    }
};

const addOrRemoveLike = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        console.log("POST", post);
        if (!post) {
            console.log("Post not found. Could've been deleted.");
            return res
                .status(400)
                .json({ error: "Post not found. Could've been deleted." });
        }

        //Check if user already liked

        let userIndex = post.likes.indexOf(user._id);
        if (userIndex === -1) {
            //User has not yet liked the post so push to likes array
            await Post.updateOne({ _id: id }, { $push: { likes: user._id } });
            return res.status(200).json({ message: "Liked!" });
        } else {
            //User has already liked the post so remove from likes array
            await Post.updateOne(
                { _id: id },
                { $pull: { likes: user._id, likeCount: 1 } }
            );
            return res.status(200).json({ message: "UnLiked!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.toString() });
    }
};

const saveUnsaveBookmark = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);

        if (!post) {
            console.log("Post not found. Could've been deleted.");
            return res
                .status(400)
                .json({ error: "Post not found. Could've been deleted." });
        }

        //Check if user already saved
        let userIndex = post.saved_by.indexOf(user._id);
        if (userIndex === -1) {
            //User has not yet saved the post so push to saved array
            await Post.updateOne(
                { _id: id },
                { $push: { saved_by: user._id } }
            );
            await User.updateOne(
                { _id: user._id },
                { $push: { saved_recipes: post._id } }
            );

            return res.status(200).json({ message: "saved!" });
        } else {
            //User has already saved the post so remove from saved array
            await Post.updateOne(
                { _id: id },
                { $pull: { saved_by: user._id } }
            );

            await User.updateOne(
                { _id: user._id },
                { $pull: { saved_recipes: post._id } }
            );

            return res.status(200).json({ message: "unsaved!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
module.exports = {
    addPost,
    getUserPosts,
    addComment,
    addOrRemoveLike,
    saveUnsaveBookmark,
    getLikes,
    getSaves,
    getAllSavedPosts,
    getPosts,
    searchPosts,
};
