const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/pulseConnect")
    .then(() => console.log("💬 Chat DB Connected"))
    .catch(() => console.log("❌ Chat DB Failed"));

const User = require("./models/userModel");
const Conversation = require("./models/ConversationModel");
const Message = require("./models/MessageModel");
const ConnectionRequest = require("./models/ConnectionRequestModel");

const JWT_SECRET = "ciagrette";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : ["http://localhost:5173"],
    credentials: true
}));

function chatAuth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

app.get("/chat/me", chatAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("fullName email role bloodGroup organsDonating isOrganDonor _id");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.json({ success: true, user });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/users", chatAuth, async (req, res) => {
    try {
        const users = await User.find({
            isVerified: true,
            _id: { $ne: req.user.id } 
        }).select("fullName email bloodGroup role city organsDonating isOrganDonor _id");
        return res.json({ success: true, users });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});


app.get("/chat/matching-donors", chatAuth, async (req, res) => {
    try {
        const { bloodGroup, organ } = req.query;
        const filter = {
            isVerified: true,
            _id: { $ne: req.user.id },
            role: "donor"
        };
        if (bloodGroup) filter.bloodGroup = bloodGroup;
        if (organ) {
            filter.isOrganDonor = true;
            filter.organsDonating = organ;
        }
        const donors = await User.find(filter)
            .select("fullName email bloodGroup role city organsDonating isOrganDonor _id");
        return res.json({ success: true, donors });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.post("/chat/request", chatAuth, async (req, res) => {
    try {
        const { receiverId, introMessage } = req.body;
        const senderId = req.user.id;
        if (!receiverId) return res.status(400).json({ success: false, message: "receiverId required" });

        const existing = await ConnectionRequest.findOne({ sender: senderId, receiver: receiverId });
        if (existing) return res.status(400).json({ success: false, message: "Request already sent", request: existing });

        const request = await ConnectionRequest.create({
            sender: senderId,
            receiver: receiverId,
            introMessage: introMessage || ""
        });

        const populated = await ConnectionRequest.findById(request._id)
            .populate("sender", "fullName email bloodGroup role city")
            .populate("receiver", "fullName email bloodGroup role city");

        const receiverSocket = onlineUsers.get(receiverId);
        if (receiverSocket) {
            io.to(receiverSocket).emit("newRequest", populated);
        }

        return res.json({ success: true, request: populated });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/requests/incoming", chatAuth, async (req, res) => {
    try {
        const requests = await ConnectionRequest.find({ receiver: req.user.id })
            .populate("sender", "fullName email bloodGroup role city")
            .populate("receiver", "fullName email bloodGroup role city")
            .sort({ createdAt: -1 });
        return res.json({ success: true, requests });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/requests/outgoing", chatAuth, async (req, res) => {
    try {
        const requests = await ConnectionRequest.find({ sender: req.user.id })
            .populate("sender", "fullName email bloodGroup role city")
            .populate("receiver", "fullName email bloodGroup role city")
            .sort({ createdAt: -1 });
        return res.json({ success: true, requests });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.put("/chat/request/:id/accept", chatAuth, async (req, res) => {
    try {
        const request = await ConnectionRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ success: false, message: "Request not found" });
        if (request.receiver.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Only the receiver can accept" });
        }
        request.status = "accepted";
        await request.save();

        let conversation = await Conversation.findOne({
            participants: { $all: [request.sender, request.receiver], $size: 2 }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [request.sender, request.receiver],
                lastMessage: request.introMessage || "Connection accepted"
            });
        }

        if (request.introMessage) {
            await Message.create({
                conversationId: conversation._id,
                sender: request.sender,
                text: request.introMessage
            });
        }

        const populated = await ConnectionRequest.findById(request._id)
            .populate("sender", "fullName email bloodGroup role city")
            .populate("receiver", "fullName email bloodGroup role city");

        
        const senderSocket = onlineUsers.get(request.sender.toString());
        if (senderSocket) {
            io.to(senderSocket).emit("requestAccepted", populated);
        }

        return res.json({ success: true, request: populated, conversation });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.put("/chat/request/:id/reject", chatAuth, async (req, res) => {
    try {
        const request = await ConnectionRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ success: false, message: "Request not found" });
        if (request.receiver.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Only the receiver can reject" });
        }
        request.status = "rejected";
        await request.save();

        const populated = await ConnectionRequest.findById(request._id)
            .populate("sender", "fullName email bloodGroup role city")
            .populate("receiver", "fullName email bloodGroup role city");

        const senderSocket = onlineUsers.get(request.sender.toString());
        if (senderSocket) {
            io.to(senderSocket).emit("requestRejected", populated);
        }

        return res.json({ success: true, request: populated });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/profile/:userId", chatAuth, async (req, res) => {
    try {
        const myId = req.user.id;
        const targetId = req.params.userId;

        const accepted = await ConnectionRequest.findOne({
            $or: [
                { sender: myId, receiver: targetId, status: "accepted" },
                { sender: targetId, receiver: myId, status: "accepted" }
            ]
        });
        if (!accepted) {
            return res.status(403).json({ success: false, message: "You must have an accepted connection to view this profile" });
        }

        const profile = await User.findById(targetId).select(
            "fullName email phone DOB age weight bloodGroup role " +
            "isAvailableForBloodDonation isOrganDonor organsDonating " +
            "lastDonationDate state city pincode medicalConditions emergencyContact"
        );
        if (!profile) return res.status(404).json({ success: false, message: "User not found" });

        return res.json({ success: true, profile });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.post("/chat/conversation", chatAuth, async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;

        if (!receiverId) {
            return res.status(400).json({ success: false, message: "receiverId required" });
        }

        const acceptedRequest = await ConnectionRequest.findOne({
            $or: [
                { sender: senderId, receiver: receiverId, status: "accepted" },
                { sender: receiverId, receiver: senderId, status: "accepted" }
            ]
        });
        if (!acceptedRequest) {
            return res.status(403).json({ success: false, message: "Connection request must be accepted before chatting" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId], $size: 2 }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        return res.json({ success: true, conversation });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/conversations", chatAuth, async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user.id
        })
            .populate("participants", "fullName email bloodGroup role")
            .sort({ updatedAt: -1 });

        return res.json({ success: true, conversations });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

app.get("/chat/messages/:conversationId", chatAuth, async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation || !conversation.participants.includes(req.user.id)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const messages = await Message.find({ conversationId })
            .populate("sender", "fullName email")
            .sort({ createdAt: 1 });

        return res.json({ success: true, messages });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : ["http://localhost:5173"],
        credentials: true
    }
});

io.use((socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie || "";
        const tokenMatch = cookies.match(/token=([^;]+)/);
        if (!tokenMatch) return next(new Error("Unauthorized"));

        const decoded = jwt.verify(tokenMatch[1], JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch (err) {
        next(new Error("Unauthorized"));
    }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
    const userId = socket.userId;
    onlineUsers.set(userId, socket.id);
    console.log(`✅ User connected: ${userId}`);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    socket.on("sendMessage", async (data) => {
        try {
            const { conversationId, text, receiverId } = data;

            const message = await Message.create({
                conversationId,
                sender: userId,
                text
            });

            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: text
            });

            const populated = await Message.findById(message._id)
                .populate("sender", "fullName email");

            const receiverSocket = onlineUsers.get(receiverId);
            if (receiverSocket) {
                io.to(receiverSocket).emit("receiveMessage", populated);
            }

            socket.emit("receiveMessage", populated);

        } catch (err) {
            socket.emit("messageError", { error: err.message });
        }
    });

        socket.on("typing", ({ conversationId, receiverId }) => {
        const receiverSocket = onlineUsers.get(receiverId);
        if (receiverSocket) {
            io.to(receiverSocket).emit("userTyping", { conversationId, userId });
        }
    });

    socket.on("stopTyping", ({ conversationId, receiverId }) => {
        const receiverSocket = onlineUsers.get(receiverId);
        if (receiverSocket) {
            io.to(receiverSocket).emit("userStopTyping", { conversationId, userId });
        }
    });

        socket.on("disconnect", () => {
        onlineUsers.delete(userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        console.log(`❌ User disconnected: ${userId}`);
    });
});

const PORT = 8801;
httpServer.listen(PORT, () => {
    console.log(`💬 Chat Server running on port ${PORT}`);
    console.log(`🔌 Socket.IO ready`);
});
