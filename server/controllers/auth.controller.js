const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const upload = require("../configs/multer.config");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: "Invalid email/password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid password" });
    }

    await User.updateOne({ email }, { $set: { is_online: true } });
    user = await User.findOne({ email });

    const { password: hashedPassword, ...userDetails } = user.toJSON();

    const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, {
        expiresIn: "2 days",
    });

    return res.status(200).json({
        user: userDetails,
        token,
    });
};

const register = async (req, res) => {
    const { email, password, firstname, lastname, profile_pic, country } =
        req.body;

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

    // Checking if email already registerd
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

        upload.single("profile_pic")(req, res, async (error) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Error uploading profile_pic" });
            }

            if (req.file) {
                user.profile_pic = req.file.path;
            } else {
                const defaultImagePath = path.join(
                    __dirname,
                    "..",
                    "storage",
                    "assets",
                    "default_profile_pic.png"
                );
                user.profile_pic = defaultImagePath;
            }
        });

        await user.save();
        return res
            .status(200)
            .json({ message: "User created successfully", user });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

const logout = async (req, res) => {
    try {
        const user = req.user;

        if (!user.is_online) {
            return res.status(401).json({ error: "User is already offline" });
        }

        // Setting offline status
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
};
