const User = require("../models/user.model");

//All functions in this file use the Express request and response objects (req, res).

/**
 * Get the profile of a user specified by userId.
 */
const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const userData = await User.findById(userId).select("-password");
        if (!userData)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(userData);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getProfileBasicInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const userFound = await User.findById(id);
        if (!userFound) {
            return res.status(404).json({ error: "user not found" });
        }
        const { firstname, lastname, profile_pic } = userFound;
        return res.status(200).json({ firstname, lastname, profile_pic });
    } catch (e) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

/**
 * Get the cookmates of the currently authenticated user.
 */
const getCookmates = async (req, res) => {
    const user = req.user;

    //Get all cookmates from user.cookmates
    try {
        const { cookmates: cookmatesById } = await User.findById(
            user._id
        ).select("cookmates");
        const cookmates = await Promise.all(
            cookmatesById.map(async (cookmateId) => {
                const cookmate = await User.findById(cookmateId).select(
                    "_id firstname lastname email is_online profile_pic"
                );
                return cookmate;
            })
        );
        res.status(200).json({ cookmates });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error fetching cookmates" });
    }
};

/**
 * Get only max of 5 cookmates for the currently authenticated user
 */
const getTopCookmates = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    // Get the top 5 cookmates' details directly from the database
    try {
        const userWithTopCookmates = await User.findById(id)
            .select({ cookmates: { $slice: 5 } })
            .populate({
                path: "cookmates",
                select: "_id firstname lastname email is_online profile_pic",
            });
        if (!userWithTopCookmates) {
            console.log("No cookmates");
            return res.status(400).json({ message: "No cookmates" });
        }
        const cookmates = userWithTopCookmates.cookmates;

        res.status(200).json({ cookmates });
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ error: `Error fetching top cookmates: ${e}` });
    }
};

const checkCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        // Check for self addition
        if (user._id.toString() === id) {
            return res
                .status(400)
                .json({ error: "Cannot add yourself as a cookmate" });
        }
    } catch (e) {}
};

/**
 * Add a user as a cookmate for the currently authenticated user.
 */
const addCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        // Check for self addition
        if (user._id.toString() === id) {
            return res
                .status(400)
                .json({ error: "Cannot add yourself as a cookmate" });
        }

        const userToAdd = await User.findOne({ _id: id });

        if (!userToAdd) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is already in pending_cookmates
        if (
            userToAdd.pending_cookmates.find((cookmate) =>
                cookmate._id.equals(user._id)
            )
        ) {
            return res.status(409).json({
                error: "Cookmate request is already sent, waiting for the other user to accept.",
            });
        }

        // Check if the both users already cookmates
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

/**
 * Accept a cookmate request from another user.
 */
const acceptCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        userToAccept = await User.findOne({ _id: id });

        if (!userToAccept) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if user is in pending_cookamtes
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

        // Move user from pending cookmates to accepted cookmates
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

/**
 * Reject a cookmate request from another user.
 */
const rejectCookmate = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const userToReject = await User.findOne({ _id: id });

        // Check if the user is not in pending_cookmates
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

const checkCookmateStatus = async (req, res) => {
    const user = req.user;
    const otherUserId = req.query.userId;
    try {
        const { cookmates, pending_cookmates } = await User.findById(user._id);
        if (cookmates.includes(otherUserId)) {
            return res.status(200).json({ status: "cookmates" });
        } else if (pending_cookmates.includes(otherUserId)) {
            return res.status(200).json({ status: "pending" });
        }
        return res.status(200).json({ status: "not cookmates" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    addCookmate,
    acceptCookmate,
    rejectCookmate,
    getCookmates,
    getUserProfile,
    getProfileBasicInfo,
    getTopCookmates,
    checkCookmateStatus,
};
