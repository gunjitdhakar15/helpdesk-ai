import { Router } from "express";
import Article from "../models/Article.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// List (any authenticated user can read KB)
router.get("/", auth, async (req, res) => {
  const { q } = req.query;
  const filter = q
    ? { $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } }
      ] }
    : {};
  const items = await Article.find(filter).sort({ updatedAt: -1 }).limit(100);
  res.json(items);
});

// Create
router.post("/", auth, requireRole("admin"), async (req, res) => {
  const { title, content, tags = [] } = req.body;
  const doc = await Article.create({ title, content, tags, createdBy: req.user.id });
  res.status(201).json(doc);
});

// Update
router.put("/:id", auth, requireRole("admin"), async (req, res) => {
  const { title, content, tags } = req.body;
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    { $set: { title, content, tags } },
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", auth, requireRole("admin"), async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
