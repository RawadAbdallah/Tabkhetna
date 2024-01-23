const Post = require("../models/post.model");
// Function to add a new post
const addPost = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, cuisine } =
            req.body;

        if(!title){
            return res.status(400).json({message: "Title is required"})
        }

        if(!description){
            return res.status(400).json({message: "Description is required"});
        }

        if(!ingredients && !instructions){
            return res.status(400).json({message:"Please provide either instructions, ingredients, or both; at least one input is required."});
        }

        if(!cuisine){
            return res.status(400).json({message: "Cusine is required"})
        }

        const media = req.files.map((file) => file.path);

        const newPost = new Post({
            title,
            description,
            ingredients,
            instructions,
            media,
            cuisine,
            posted_by: req.user._id,
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    addPost,
};
