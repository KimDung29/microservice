const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { serviceName } = req.body;
        const modulesDir = path.join(process.cwd(), "../services");

        const uploadsDir = path.join(modulesDir, serviceName, "uploads");

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

module.exports = {
    upload,
};
