const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "Firstname minimum length is 2 characters"],
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "Lastname minimum length is 2 characters"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!/\S+@\S+\.\S+/.test(value)) {
                throw new Error("Email address is invalid!");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should be at least 6 characters"],
    },
    profile_pic: {
        type: String,
    },
    country: {
        type: String,
    },
    cookmates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    pending_cookmates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    saved_recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    achievements: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    role: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    is_online: {
        type: Boolean,
        default: false,
    },
    completed_challenges: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
        },
    ],
});

userSchema.pre(
    "save",
    async function (next) {
        try {
            if (this.isModified("password")) {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
