const Post = require("../models/post.model");
const User = require("../models/user.model");
// Function to add a new post
const addPost = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, cuisine } =
            req.body;

        if(!title){
            return res.status(400).json({error: "Title is required"})
        }

        if(!ingredients && !instructions){
            return res.status(400).json({error:"Please provide either instructions, ingredients, or both; at least one input is required."});
        }

        if(instructions && instructions.length < 12){
            return res.status(400).json({error:"Instructions should be at least of 12 characters."});
        }

        if(ingredients && ingredients.length < 12){
            return res.status(400).json({error:"Ingredients should be at least of 12 characters."});
        }

        if(!cuisine){
            return res.status(400).json({error: "Cuisine is required"})
        }

        const media = req.files.map((file) => (file.path.replace(/^storage\\/, '')))
        console.log(media)
        const newPost = new Post({
            title,
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

const getUserPosts = async (req, res) => {
    const {id} = req.params

    try{
        const user = await User.findById(id)
        const posts = await Post.find({posted_by: user}).sort({ updatedAt: -1 })
        return res.status(200).json({posts})
    } catch (e) {
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {
    addPost,
    getUserPosts
};
