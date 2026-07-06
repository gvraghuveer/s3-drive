import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import s3 from "./config/s3.js";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import upload from "./middleware/upload.js";

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

app.post("/upload", upload.single("file"), async (req, res) => {
    // console.log(req.file);
    // res.json({
    //     message: "File received!"
    // })
    try{
        const cmd = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });

        const response = await s3.send(cmd);
        res.status(201).json({
            message: "File uploaded successfully",
            fileName: req.file.originalname
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Error uploading file to S3",
            error: error.message
        })
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})