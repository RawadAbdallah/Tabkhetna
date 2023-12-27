const mongoose = require("mongoose");

const connectToMongoDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;
        connection.on("error", (error) => {
            console.log("Error connecting to MongoDB: ", error);
        });

        connection.once("open", () => {
            console.log("Connected to MongoDB");
        });
    } catch (e) {
        console.log("internal server error: ", e);
    }
};

module.exports = { connectToMongoDB };
