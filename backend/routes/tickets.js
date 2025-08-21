import { Router } from "express";
import Ticket from "../models/Ticket.js";
import { auth, requireRole } from "../middleware/auth.js";
import express from "express";
import Ticket from "../models/Ticket.js";
import { authMiddleware } from "../middleware/auth.js";


/**
 * @desc   Create new ticket
 * @route  POST /api/tickets
 * @access Authenticated user
 */


const router = Router();

// Create (you probably already have)
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const doc = await Ticket.create({ title, description, createdBy: req.user.id });
  res.status(201).json(doc);
});

// My tickets
router.get("/mine", auth, async (req, res) => {
  const items = await Ticket.find({ createdBy: req.user.id }).sort({ updatedAt: -1 });
  res.json(items);
});

// Assigned (for agent)
router.get("/assigned", auth, requireRole("agent", "admin"), async (req, res) => {
  const items = await Ticket.find({ assignedTo: req.user.id }).sort({ updatedAt: -1 });
  res.json(items);
});

// All (admin)
router.get("/all", auth, requireRole("admin"), async (req, res) => {
  const items = await Ticket.find().sort({ updatedAt: -1 });
  res.json(items);
});

// Detail
router.get("/:id", auth, async (req, res) => {
  const t = await Ticket.findById(req.params.id);
  if (!t) return res.status(404).json({ error: "Not found" });
  // optional: restrict if user isn't owner/admin/agent assigned
  res.json(t);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = new Ticket({
      title,
      description,
      priority: priority || "Low",
      status: "Open",
      createdBy: req.user.id,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create Ticket Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
