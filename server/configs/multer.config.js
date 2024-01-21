const multer = require("multer");
const fs = require('fs')
const path = require("path");

const getDestination = function (req, file, cb) {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const allowedVideoTypes = ["video/mp4", "video/webm"];

    let destinationFolder;

    if (allowedImageTypes.includes(file.mimetype)) {
        destinationFolder = "images";
    } else if (allowedVideoTypes.includes(file.mimetype)) {
        destinationFolder = "videos";
    } else {
        destinationFolder = "others";
    }

    // Ensure that the destination folder exists
    const fullPath = path.join(__dirname, "..", "storage", "uploads", destinationFolder);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, path.join("storage", "uploads", destinationFolder));
};

const storage = multer.diskStorage({
    destination: getDestination,
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + "-" + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

module.exports = upload;
