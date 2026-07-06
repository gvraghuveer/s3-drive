import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import s3 from "./config/s3.js";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("S3-Drive Backend running successfully");
});

app.get("/files", async(req, res) => {
    try {
        const cmd = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
        });
        const response = await s3.send(cmd);
        // res.json(response.Contents);

        const files = (response.Contents || []).map((item) => {
            return{
            name: item.Key,
            size: item.Size,
            lastModified: item.LastModified
            };
        });
        res.json(files);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch files",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})