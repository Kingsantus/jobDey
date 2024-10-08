const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        default: ""
    },
    lastName : {
        type: String,
        trim: true,
        lowercase: true,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    country:{
        type: String,
        trim: true,
        lowercase: true,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    lastLogin:{
        type:Date,
        default: Date.now()
      },
    isVerified:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;