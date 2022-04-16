import mongoose from "mongoose"
const tokenSchema = new mongoose.Schema({
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Patient",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Token = mongoose.model("Token", tokenSchema)

export default Token