const User = require("../models/user.model");

const getCookmates = async (req, res) => {
    const user = req.user;

    //get all cookmates from user.cookmates
    try {
        const { cookmates } = await User.findById(user._id).select("cookmates");
        res.status(200).json({ _id: user._id, cookmates });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error fetching cookmates" });
    }
    
};

const addCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        // Checking for self addition
        if (user._id.toString() === id) {
            return res
                .status(400)
                .json({ error: "Cannot add yourself as a cookmate" });
        }

        const userToAdd = await User.findOne({ _id: id });

        if (!userToAdd) {
            return res.status(404).json({ error: "User not found" });
        }

        // Checking if the user is already in pending_cookmates
        if (
            userToAdd.pending_cookmates.find((cookmate) =>
                cookmate._id.equals(user._id)
            )
        ) {
            return res.status(409).json({
                error: "Cookmate request is already sent, waiting for the other user to accept.",
            });
        }

        // Checking if the both users already cookmates
        if (
            userToAdd.cookmates.find((cookmate) =>
                cookmate._id.equals(user._id)
            )
        ) {
            return res.status(409).json({
                error: "You are already cookmates",
            });
        }

        await User.updateOne(
            { _id: id },
            { $push: { pending_cookmates: user } }
        );

        return res
            .status(200)
            .json({ message: "Cookmate request sent, waiting for response" });
    } catch (error) {
        console.error("Error in addCookmate:", error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
};

const acceptCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        userToAccept = await User.findOne({ _id: id });

        if (!userToAccept) {
            return res.status(404).json({ error: "User not found." });
        }

        // Checkinging if user is in pending_cookamtes
        if (
            !user.pending_cookmates.find((cookmate) =>
                cookmate._id.equals(userToAccept._id)
            )
        ) {
            return res
                .status(400)
                .json({ error: "User not found in pending cookmates" });
        }

        // Check if the both users already cookmates
        if (
            userToAccept.cookmates.find((cookmate) =>
                cookmate._id.equals(user._id)
            )
        ) {
            return res.status(409).json({
                error: "You are already cookmates",
            });
        }

        // Moving user from pending cookmates to accepted cookmates
        await User.updateOne(
            { _id: user._id },
            { $pull: { pending_cookmates: userToAccept._id } }
        );

        await User.updateOne(
            { _id: user._id },
            { $push: { cookmates: userToAccept._id } }
        );

        await User.updateOne(
            { _id: userToAccept._id },
            { $push: { cookmates: user._id } }
        );

        return res
            .status(200)
            .json({ message: "Cookmate accepted successfully" });
    } catch (e) {
        return res.status(500).json({ error: "Something went wrong! " + e });
    }
};

const rejectCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const userToReject = await User.findOne({ _id: id });

        // Checking if the user is not in pending_cookmates
        if (
            !userToReject.pending_cookmates.find((cookmate) =>
                cookmate._id.equals(user._id)
            )
        ) {
            return res.status(409).json({
                error: "User not found in your pending cookmates requests",
            });
        }

        await User.updateOne(
            { _id: user._id },
            { $pull: { pending_cookmates: usertoReject._id } }
        );

        return res.status(200).json({
            message: "Cookmate request has been rejected successfully.",
        });
    } catch (e) {
        res.status(500).json({ error: `Something went wrong! ${e}` });
    }
};

module.exports = {
    addCookmate,
    acceptCookmate,
    rejectCookmate,
    getCookmates,
};
