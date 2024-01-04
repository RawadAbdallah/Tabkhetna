const mongoose = require("mongoose");
const User = require("./user.model");

const achievementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    achievedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
