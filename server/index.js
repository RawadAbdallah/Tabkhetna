const express = require("express");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { connectToMongoDB } = require("./configs/mongodb.config");
const upload = require("./configs/multer.config");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.options('*', cors)
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/cookmates', authMiddleware, userRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server listening on port: ", process.env.PORT);
    connectToMongoDB();
});
