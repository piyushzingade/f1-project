export const uploadFile = async (req, res) => {
    try {
        // Single file
        if (req.file) {
            const filePath = `/assets/${req.file.filename}`;
            return res.status(200).json({ filePath });
        }

        // Multiple files
        if (req.files) {
            const filePaths = req.files.map(file => `/assets/${file.filename}`);
            return res.status(200).json({ filePaths });
        }

        return res.status(400).json({ message: "No file uploaded" });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Failed to upload file" });
    }
};
