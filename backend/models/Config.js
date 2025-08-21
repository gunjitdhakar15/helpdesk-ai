import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    autoClose: { type: Boolean, default: false },
    confidenceThreshold: { type: Number, default: 0.8 }
  },
  { timestamps: true }
);

export default mongoose.model("Config", configSchema);
