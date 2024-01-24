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

const addComment = async (req, res) => {
    const user = req.user;
    const { comment, _id: post_id} = req.body;
    try{
        if(!comment){
            return res.status(400).json({error: "Comment can't be empty."})
        }

        const post = await Post.findById(post_id)

        if(!post){
            console.log("Post not found. Could've been deleted.")
            return res.status(400).json({error: "Post not found. Could've been deleted."})
        }

        await Post.updateOne(
            { _id: post_id },
            { $push: { comments: {user, comment} } }
        );
            console.log("comment added")
        return res.status(200).json({message: "Comment added successfully"})



    } catch(e) {
        console.log(e)
        return res.status(500).json({error: "Internal Server Error"})   
    }
}

const addLike = async (req, res) => {

}

const removeLike = async (req, res) => {

}

const saveRecipe = async (req, res) => {

}

const unsaveRecipe = async (req, res) => {

}

module.exports = {
    addPost,
    getUserPosts,
    addComment
};
