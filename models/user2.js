const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema(
	{
        name: {
      type: String,
      required: [true, "Please provide name"],
        } ,   
    username: {
            type: String,
            required: [true, "Please provide username"],
          },
          position: {
            type: String,
            required: [true, "Please provide position"],
          },

        email: {
            type: String,
            required: [true, "Please provide email address"],
            unique: true,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please provide a valid email",
            ],
          },
          phone: {
            type: String,
            required: [true, "Please provide position"],
            minlength: 10
          },

          password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: 8,
            select: false,
          },
          admin:Boolean,
          resetPasswordToken: String,
          resetPasswordExpire: Date,
          reports: [ 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Report'
            }
          ]
	},	
    { collection: 'userdbs' }
	
);

schema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await  bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});
//login 
schema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
};

schema.methods.getSignedToken = function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET);
}

const Userdb = mongoose.model('User', schema);

module.exports = Userdb;