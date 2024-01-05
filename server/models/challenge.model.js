const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    challenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
        },
    ],
    isActive: {
        type: Boolean,
        default: false,
    },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge