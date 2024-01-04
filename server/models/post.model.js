const { mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        recipe: {
            type: String,
        },
        instructions: {
            type: String,
        },

        media: {
            type: [{ type: String }],
        },

        posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        saved_by: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        cuisine: {
            type: String,
            enum: [
                "Italian",
                "Mexican",
                "Indian",
                "Chinese",
                "Japanese",
                "Middle Eastern",
                "American",
                "Other",
            ],

            required: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: {
            type: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    comment_image: {
                        type: String,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
