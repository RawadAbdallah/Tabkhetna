const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(401).json({ error: "Email is required" });
    }

    if (!password) {
        return res.status(401).json({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: "Invalid email/password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid password" });
    }

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
            profile_pic,
        });

        await user.save();
        return res
            .status(200)
            .json({ message: "User created successfully", user });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

module.exports = {
    login,
    register,
    changePassword,
};
