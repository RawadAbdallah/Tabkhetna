const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({error: "Unauthorized"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({error: "Token has expired"});
    }

    if (error.name === "NotBeforeError") {
      return res.status(401).json({error: "Token not yet valid"});
    }

    return res.status(401).json({error: "Invalid token"});
  }
};

module.exports = { authMiddleware };
