const Message = require("../models/message.model"); // Assuming you have a Message model

const getMessages = async (req, res) => {
    try {
        const { receiver } = req.params;
        const sender = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort("createdAt");

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendMessage = async (io, sender, receiver, message) => {
    try {
        console.log(sender, receiver, message);

        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        io.emit("newMessage", newMessage);

        console.log("New message saved to the database:", newMessage);
        return newMessage;
    } catch (error) {
        console.error("Error saving new message:", error);
        throw error;
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
