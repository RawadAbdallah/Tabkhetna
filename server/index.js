const express = require("express");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { connectToMongoDB } = require("./configs/mongodb.config");
const upload = require("./configs/multer.config");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "storage/uploads")));

app.options("*", cors);

//Auth routes login & register
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// User routes
const userRoutes = require("./routes/user.routes");
app.use("/api/", authMiddleware, userRoutes);

// Challenge routes
const challengeRoutes = require("./routes/challenge.routes");
app.use("/api/challenges", authMiddleware, challengeRoutes);

//Post routes
const postRoutes = require("./routes/post.routes");
app.use("/api/post", authMiddleware, postRoutes);

//Gemeni route
const gemeniRoute = require("./routes/gemeni.routes");
app.use("/api/ai", gemeniRoute);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(
        "Server listening on ip" + process.env.IP + "on port: ",
        process.env.PORT
    );
    connectToMongoDB();
});
