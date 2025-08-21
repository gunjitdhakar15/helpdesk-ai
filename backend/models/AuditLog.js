import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    traceId: { type: String, required: true },
    action: { type: String, required: true }, // e.g., "TRIAGE_SUGGESTION", "AUTO_CLOSED"
    meta: { type: Object }, // anything: suggestion, scores, category, etc.
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
