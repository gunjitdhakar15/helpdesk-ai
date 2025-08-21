import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";

import kbRoutes from "./routes/kb.js";
import agentRoutes from "./routes/agent.js";
import configRoutes from "./routes/config.js";
// ticketsRoutes should already exist; if not, import it too
dotenv.config();


app.use("/api/kb", kbRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/config", configRoutes);



const app = express();
app.use(cors());
app.use(express.json());
app.use("api/auth", authRoutes);
app.use("api/tickets", ticketRoutes);
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Mongo Error", err));

// test route
app.get("/", (req, res) => {
    res.send("Helpdesk Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
