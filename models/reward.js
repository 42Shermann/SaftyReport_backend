const moongoose = require('mongoose');
const Schema = moongoose.Schema;

let RewardSchema = new Schema({
    
    firstName:String,
    firstStock:String,
    firstUrl:String,

    secondName:String,
    secondStock:String,
    secondUrl:String,

    thirdName:String,
    thirdStock:String,
    thirdUrl:String,  
	}
);

RewardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = moongoose.model('reward', RewardSchema);