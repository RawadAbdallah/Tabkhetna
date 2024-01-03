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

const acceptCookmate = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    try {
        userToAccept = await User.findOne({ _id: id });

        if (!userToAccept) {
            return res.status(404).json({ error: "User not found." });
        }

        if (
            !user.pending_cookmates.find((cookmate) =>
                cookmate._id.equals(userToAccept._id)
            )
        ) {
            return res
                .status(400)
                .json({ error: "User not found in pending cookmates" });
        }

        //moving user from pending cookmates to accepted cookmates        
        await User.updateOne(
            { _id: user._id },
            { $pull: { pending_cookmates: userToAccept._id } }
        );

        await User.updateOne(
            {_id: user._id},
            {$push: { cookmates: userToAccept._id }}
        )

        await User.updateOne(
            {_id: userToAccept._id},
            {$push: {cookmates: user._id}}
        )



        return res
            .status(200)
            .json({ message: "Cookmate accepted successfully" });
    } catch (e) {
        return res.status(500).json({error: "Something went wrong! " + e})
    }
};

module.exports = {
    addCookmate,
    acceptCookmate
};
