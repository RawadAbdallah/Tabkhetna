const socketIo = require("socket.io");
const { sendMessage } = require("../controllers/message.controller");

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*", // Adjust the origin to match your React app
            methods: ["GET", "POST"],
        },
        transports: [
          "websockets", "polling"
        ]
    });

    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("newMessage", async (data) => {
            try {
                const { sender, receiver, message } = data;
                console.log(
                    "Received newMessage event:",
                    sender,
                    receiver,
                    message
                );
                await sendMessage(io, sender, receiver, message);
            } catch (error) {
                console.error("Error handling new message:", error);
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    return io;
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }

    return io;
}

module.exports = { initializeSocket, getIo };
