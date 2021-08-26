const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    imgURL:String,
    title:String,
    content:String,
    date:Date,
    isFinished:String,
    desc:String
})


mongoose.model("reports",ReportSchema)