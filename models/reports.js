const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({

    title:String,
    content:String,
    date:Date,
    isFinished:String,
    desc:String,
    imgUrl:String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

ReportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Report', ReportSchema)