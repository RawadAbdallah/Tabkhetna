const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
    }
});

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
