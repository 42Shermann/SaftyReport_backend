const User = require('../models/user2');
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');

const sendToken = (user, statusCode, res)=> {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true,    token,data:{
                                                    username:user.username,
                                                    name:user.name,
                                                    position:user.position,
                                                    email:user.email,
                                                    phone:user.phone}})
};

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

exports.register = async (req,res,next) => {

    const {name,username,position, email,phone,password} = req.body;
    try {
        const valUser = await User.findOne({email});

        if (valUser) {
            return res.status(401).json({
                success: false,
                errCode:1,
                error: 'Duplicated Email'
              })
           }

        else{
        const user = await User.create({
           name,
            username,
            position, 
           email, 
           phone,
           password
        });
        sendToken(user, 201, res);
        }
    } catch (error){
        next(error);
    }
};

exports.login = async (req,res,next) => {
    const { email , password} = req.body;

    if(!email || !password){
        return res.status(401).json({
            success: false,
            errCode:1,
            error: 'Invalid Credentials.'
          })
    }
    try{
       const user = await User.findOne({email}).select("+password");

       if(!user){
        return res.status(401).json({
            success: false,
            errCode:2,
            error: 'Unknown Username'
          })
       }

       const isMatch = await user.matchPasswords(password);
       if(!isMatch){
        return res.status(401).json({
            success: false,
            errCode:3,
            error: 'Incorrected Password'
          })
       }

       sendToken(user, 200, res);

    }catch(error){
        res.status(500).json({ success:false,error: error.message});
    }
};

exports.retID = async (req, res, next) => {
try{
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id);

    res.status(200).json({ 
        success: true,    
        token,data:{
        username:user.username,
        name:user.name,
        position:user.position,
        email:user.email,
        phone:user.phone}})

}catch(err){
    next(err);
}
};

exports.forgotpassword = (req,res,next) => {
    res.send("forgot password  Route");
};

exports.resetpassword = (req,res,next) => {
    res.send("Reset password  Route");
};

