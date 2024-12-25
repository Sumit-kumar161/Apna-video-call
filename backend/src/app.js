import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors({
    origin: ['http://localhost:3000', 'https://apnavideofrontend-vjvk.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    return res.json({ "hello": "world" });
});

// Ensure MONGO_URL is set in .env
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("MongoDB connection URL is not defined in the .env file.");
    process.exit(1);  // Stop the application if MongoDB URL is missing
}

const start = async () => {
    try {
        // Connect to MongoDB
        const connectionDb = await mongoose.connect(mongoUrl);
        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        
        // Start the server
        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  // Stop the application if MongoDB connection fails
    }
};

start();


