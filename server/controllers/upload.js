import Image from "../models/Image.js";

export const uploadFile = async (req, res) => {
    try {
        // Single file
        if (req.file) {
            const filePath = `/assets/${req.file.filename}`;
            
            // Save image information to database
            const newImage = new Image({
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: filePath,
                size: req.file.size,
                mimeType: req.file.mimetype,
                uploadedBy: req.user ? req.user._id : null, // If user is authenticated
            });
            
            await newImage.save();
            
            return res.status(200).json({ 
                success: true,
                image: newImage,
                filePath 
            });
        }

        // Multiple files
        if (req.files) {
            const savedImages = [];
            const filePaths = [];
            
            for (const file of req.files) {
                const filePath = `/assets/${file.filename}`;
                filePaths.push(filePath);
                
                // Save image information to database
                const newImage = new Image({
                    filename: file.filename,
                    originalName: file.originalname,
                    path: filePath,
                    size: file.size,
                    mimeType: file.mimetype,
                    uploadedBy: req.user ? req.user._id : null, // If user is authenticated
                });
                
                await newImage.save();
                savedImages.push(newImage);
            }
            
            return res.status(200).json({ 
                success: true,
                images: savedImages,
                filePaths 
            });
        }

        return res.status(400).json({ message: "No file uploaded" });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Failed to upload file", error: error.message });
    }
};

// Get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Failed to fetch images", error: error.message });
    }
};

// Get image by ID
export const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ message: "Failed to fetch image", error: error.message });
    }
};
