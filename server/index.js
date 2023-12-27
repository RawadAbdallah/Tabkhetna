const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { connectToMongoDB } = require("./configs/mongodb.config");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authMiddleware, authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server listening on port: ", process.env.PORT);
    connectToMongoDB();
});
