import { Router } from "express";
import Config from "../models/Config.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

async function getOrCreateConfig() {
  let cfg = await Config.findOne();
  if (!cfg) cfg = await Config.create({});
  return cfg;
}

router.get("/", auth, requireRole("admin"), async (req, res) => {
  const cfg = await getOrCreateConfig();
  res.json(cfg);
});

router.put("/", auth, requireRole("admin"), async (req, res) => {
  const { autoClose, confidenceThreshold } = req.body;
  const cfg = await getOrCreateConfig();
  if (autoClose !== undefined) cfg.autoClose = !!autoClose;
  if (confidenceThreshold !== undefined) cfg.confidenceThreshold = Number(confidenceThreshold);
  await cfg.save();
  res.json(cfg);
});

export default router;
