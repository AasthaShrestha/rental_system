import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    suggestion: { type: String, required: true },
    enquiryType: { type: String, required: true }, 
    submittedAt: { type: Date, default: Date.now },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;