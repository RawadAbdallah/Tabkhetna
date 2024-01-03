const User = require("../models/user.model");

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

        // Check if the user is already added
        const isAlreadyAdded = userToAdd.pending_cookmates.find((cookmate) =>
            cookmate._id.equals(user._id)
        );

        if (isAlreadyAdded) {
            return res
                .status(400)
                .json({ error: "User is already added as a cookmate" });
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

module.exports = {
    addCookmate,
};
