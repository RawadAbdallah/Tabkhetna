const Challenge = require("../models/challenge.model");
const User = require("../models/user.model");
const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        if (!challenges) {
            return res
                .status(404)
                .json({ error: "No challenges at the moment" });
        }
        for (const challenge of challenges) {
            const user = await User.findById(challenge.challenger).select(
                "-password"
            );
            challenge.challenger = user
        }
        return res.status(200).json({ challenges });
    } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const createChallenge = async (req, res) => {
    const user = req.user;
    const { title, description } = req.body;

    try {
        if (!title) {
            return res
                .status(400)
                .json({ error: "Challenge title is required" });
        }

        if (!description) {
            return res.status(400).json({ error: "Description is reqiured" });
        }

        const newChallenge = new Challenge({
            title,
            description,
            challenger: user,
        });

        // Handling the profile_pic
        if (req.file) {
            const image = req.file.filename;
            newChallenge.challenge_img = image;
        } else {
            return res
                .status(400)
                .json({ error: "Challenge image is required." });
        }

        await newChallenge.save();
        return res
            .status(200)
            .json({ message: "challenge created successfully", newChallenge });
    } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const participateChallenge = async (req, res) => {
    const user = req.user;
    const { challengeId } = req.params;

    try {
        const challengeToParticipate = await Challenge.findOne({
            _id: challengeId,
        });
        if (!challengeToParticipate) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        await Challenge.updateOne(
            { _id: challengeId },
            { $push: { participants: user } }
        );
        return res.status(200).json({ message: "Participated successfully" });
    } catch (e) {
        console.log("Error in getting the challenge ", e);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    getChallenges,
    createChallenge,
    participateChallenge,
};
