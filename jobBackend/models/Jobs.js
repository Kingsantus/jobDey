const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    url:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    companyName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    employmentType:{
        type:String,
        trim:true,
        lowercase:true,
    },
    country: {
        type:String,
        trim:true,
        lowercase:true,
    },
    category: {
        type:String,
        trim:true,
        lowercase:true,
    },
    jobModel: {
        type:String,
        trim:true,
        lowercase:true,
    },
    imageURL:{
        type:String,
        trim:true,
    },
    postedDate: {
        type:Date,
    },
    visibility:{
        type:Boolean,
        default:false
    },
}, {timestamps:true});


const Job = mongoose.model("Job", jobSchema);

module.exports = Job;