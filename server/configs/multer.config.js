const multer = require("multer");
const path = require("path");

// Function to determine the destination folder based on file type
const getDestination = function (req, file, cb) {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const allowedVideoTypes = ["video/mp4", "video/webm"];

    let destinationFolder;

    if (allowedImageTypes.includes(file.mimetype)) {
        destinationFolder = "uploads/images/";
    } else if (allowedVideoTypes.includes(file.mimetype)) {
        destinationFolder = "uploads/videos/";
    } else {
        destinationFolder = "uploads/others/";
    }

    cb(null, destinationFolder);
};

// Set up multer storage with dynamic destination
const storage = multer.diskStorage({
    destination: getDestination,
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + "-" + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
