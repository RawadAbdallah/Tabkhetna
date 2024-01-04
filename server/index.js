const express = require("express");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { connectToMongoDB } = require("./configs/mongodb.config");
const upload = require("./configs/multer.config");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/cookmates', authMiddleware, userRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server listening on port: ", process.env.PORT);
    connectToMongoDB();
});
