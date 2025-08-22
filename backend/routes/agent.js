import express from "express";
import Ticket from "../models/Ticket.js"; // ensure correct path
import  authMiddleware from "../middleware/auth.js"; // JWT auth

const router = express.Router();

/**
 * @desc   Triage a ticket (AI suggestion stub)
 * @route  POST /api/agent/triage/:id
 * @access Agent/Admin only
 */
router.post("/triage/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // find ticket
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // ---- FAKE AI LOGIC ----
    // later you can plug in OpenAI or ML model here
    const fakeCategories = ["Billing", "Technical", "General", "Account"];
    const suggestion = {
      category: fakeCategories[Math.floor(Math.random() * fakeCategories.length)],
      confidence: Math.floor(Math.random() * 100),
    };

    // update ticket
    ticket.aiSuggestion = suggestion;
    await ticket.save();

    res.json({
      message: "AI triage complete",
      aiSuggestion: suggestion,
    });
  } catch (err) {
    console.error("Triage error", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
