const User = require("../models/user.model");

const updateAchievements = async (userId) => {
    const user = await User.findById(userId);
    console.log(
        `if(!${user.achievements.includes("Recipe Legend")} and ${
            user.posts.legnth
        } ${user.posts.length > 1})`
    );
    try {
        const hasRecipeLegend = user.achievements.includes("Recipe Legend");

        if (!hasRecipeLegend && user.posts.length > 1) {
            await User.updateOne(
                { _id: user._id },
                { $push: { achievements: {title: "Recipe Legend", description: "Posted more the 10 recipes."} } }
            );

            console.log("Achievement updated");
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    updateAchievements,
};
