const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Controller function for user login.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
  try { // Validation checks
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: "Invalid email/password" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid email/password" });
    }

    // Update user's online status
    await User.updateOne({ email }, { $set: { is_online: true } });
    user = await User.findOne({ email });

    // Create JWT token
    const { password: hashedPassword, ...userDetails } = user.toJSON();
    const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, {
        expiresIn: "2 days",
    });

    return res.status(200).json({
        user: userDetails,
        token,
    });} catch (e) {
        return res.status(500).json({error: "Something went wrong"})
    }
};

/**
 * Controller function for user registration.
 */
const register = async (req, res) => {
    const { email, password, firstname, lastname, country, profile_pic } =
        req.body;

    // Validation checks
    if (!email) {
        return res.status(400).json({ error: "Email field cannot be empty." });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: "Password field cannot be empty." });
    }

    if (!firstname) {
        return res
            .status(400)
            .json({ error: "Firstname field cannot be empty." });
    }

    if (!lastname) {
        return res
            .status(400)
            .json({ error: "Lastname field cannot be empty." });
    }

    // Check if email is already registered
    let user = await User.findOne({ email: email }).catch((e) => {
        console.log(e);
    });

    if (user) {
        return res.status(409).json({ error: "Email is already registered!" });
    }

    try {
        user = new User({
            email,
            firstname,
            lastname,
            password,
            country,
        });

        // Handling the profile_pic
        if (req.file) {
            const profilePicFilename = req.file.filename;
            user.profile_pic = profilePicFilename;
        } else {
            // If no profile_pic is provided, use a default image path
            user.profile_pic = "default_profile_pic.png";
        }

        await user.save();

        return res
            .status(200)
            .json({ message: "User created successfully", user });
    } catch (e) {
        console.log("error", e);
        return res.status(500).json({ error: e });
    }
};

/**
 * Controller function for user logout.
 */
const logout = async (req, res) => {
    try {
        const user = req.user;

        // Check if user is already offline
        if (!user.is_online) {
            return res.status(401).json({ error: "User is already offline" });
        }

        // Set offline status
        await User.updateOne({ _id: user._id }, { $set: { is_online: false } });

        return res
            .status(200)
            .json({ message: "Logout successful", invalidateToken: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    login,
    register,
    logout,
};
