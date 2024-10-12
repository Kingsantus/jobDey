const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    userAgent:{
        type:String
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    expiresAt:{
        type:Date,
        default: Date.now() + 24 * 60 * 60 * 1000
    }
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;