import { Router } from "express";
import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";
import Article from "../models/Article.js";
import AuditLog from "../models/AuditLog.js";
import Config from "../models/Config.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

function classify(text = "") {
  const t = text.toLowerCase();

  const rules = [
    { cat: "billing", regex: /(refund|invoice|payment|charge|billing)/ },
    { cat: "tech",    regex: /(error|bug|issue|crash|not working|fail)/ },
    { cat: "shipping",regex: /(delivery|shipping|delay|package|courier)/ }
  ];

  for (const r of rules) {
    if (r.regex.test(t)) return { category: r.cat, confidence: 0.9 };
  }
  return { category: "other", confidence: 0.6 };
}

async function searchKB(query) {
  if (!query) return [];
  const q = query.split(/\s+/).filter(Boolean).slice(0, 3).join("|");
  if (!q) return [];
  const regex = new RegExp(q, "i");
  const items = await Article.find({
    $or: [
      { title: regex },
      { content: regex },
      { tags: { $in: [regex] } }
    ]
  }).limit(3);
  return items;
}

router.post("/triage/:ticketId", auth, requireRole("agent", "admin"), async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId).populate("createdBy assignedTo", "name email role");
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  const { category, confidence } = classify(`${ticket.title}\n${ticket.description}`);

  const kb = await searchKB(`${ticket.title} ${ticket.description}`);
  const kbRefs = kb.map(a => ({ id: a._id, title: a.title }));

  const draftReply =
    `Hi ${ticket?.createdBy?.name || "there"},\n\n` +
    `We identified this as a **${category}** query. ` +
    (kb.length ? `These may help:\n- ${kb.map(a => a.title).join("\n- ")}\n\n` : "") +
    `If you still face issues, reply here and our team will assist.\n\n— Support Bot`;

  // Save suggestion on ticket
  ticket.aiSuggestion = { category, confidence };
  await ticket.save();

  // Auto-close?
  let autoClosed = false;
  const cfg = (await Config.findOne()) || { autoClose: false, confidenceThreshold: 0.8 };
  if (cfg.autoClose && confidence >= (cfg.confidenceThreshold || 0.8)) {
    ticket.status = "closed";
    await ticket.save();
    autoClosed = true;
  }

  // Audit
  const traceId = new mongoose.Types.ObjectId().toString();
  await AuditLog.create({
    ticket: ticket._id,
    traceId,
    action: "TRIAGE_SUGGESTION",
    meta: { category, confidence, kbRefs, draftReply, autoClosed },
    actor: req.user.id
  });

  return res.json({
    traceId,
    suggestion: { category, confidence, draftReply, kbRefs },
    autoClosed,
    ticket: { id: ticket._id, status: ticket.status }
  });
});

router.get("/audit/:ticketId", auth, async (req, res) => {
  const logs = await AuditLog.find({ ticket: req.params.ticketId }).sort({ createdAt: -1 });
  res.json(logs);
});

export default router;
