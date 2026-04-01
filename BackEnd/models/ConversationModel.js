const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lastMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Ensure we don't create duplicate conversations between the same pair
conversationSchema.index({ participants: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
