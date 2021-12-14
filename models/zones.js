const mongoose = require('mongoose')

const ZoneSchema = new mongoose.Schema({
    ZoneID:String,
    ZoneName:String,
    Desc:String,
    Active:Boolean,
})

ZoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Zone', ZoneSchema)