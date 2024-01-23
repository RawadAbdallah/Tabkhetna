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
        ingredients: {
            type: String,
        },
        instructions: {
            type: String,
        },

        media: {
            type: [
                {
                    type: String,
                },
            ],
        },

        posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        saved_by: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        cuisine: {
            type: String,
            enum: [
                "italian",
                "mexican",
                "indian",
                "chinese",
                "japanese",
                "lebanese",
                "iraqi",
                "french",
                "saudi arabian",
                "american",
                "other",
            ],

            required: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                text: {
                    type: String,
                    required: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
