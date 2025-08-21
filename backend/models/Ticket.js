import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({   
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["open", "in_review", "closed"],
        default: "open"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    aiSuggestion: {
        category: { type: String },
        confidence: { type: Number }
    }
},{timestamps: true});

export default mongoose.model("Ticket", ticketSchema);
