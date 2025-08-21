import express from "express";
import Ticket from "../models/Ticket.js";
import authMiddleware from "../middleware/auth.js"; // protects routes

const router = express.Router();

/**
 * CREATE Ticket
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description required" });
        }

        // create ticket
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user.id, // user id from JWT
        });

        // 👉 Call AI Stub here (for now just a placeholder)
        // Later we'll plug real AI classification
        newTicket.aiSuggestion = {
            category: "other",
            confidence: 0.5,
        };
        await newTicket.save();

        return res.status(201).json(newTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * GET all tickets (for logged-in user)
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tickets = await Ticket.find({ createdBy: req.user.id }).populate("createdBy", "name email");
        return res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * GET single ticket by ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate("createdBy", "name email");
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
