import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadFile, getAllImages, getImageById } from "../controllers/upload.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../client/public/assets"));
    },
    filename: function (req, file, cb) {
        const originalName = path.parse(file.originalname).name;
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const newFilename = `${sanitizedName}-${timestamp}-${randomString}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Upload routes
router.post("/single", upload.single("file"), uploadFile);
router.post("/multiple", upload.array("files", 10), uploadFile);

// Image retrieval routes
router.get("/images", getAllImages);
router.get("/images/:id", getImageById);

export default router;
