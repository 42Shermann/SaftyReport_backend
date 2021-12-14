const rewardRouter = require('express').Router()
const Reward = require('../models/reward');
const ErrorResponse = require('../utils/errorResponse');

rewardRouter.post('/create-reward', async(req, res , next) => {
    const body = req.body
    const newReward = new Reward({

        firstUrl: body.firstUrl,
        firstName: body.firstName,
        firstStock: body.firstStock,

        secondUrl: body.secondurl,
        secondName: body.secondName,
        secondStock: body.secondStock,

        thirdUrl: body.thirdurl,
        thirdName: body.thirdName,
        thirdStock: body.thirdStock,
      })
    
      const savedReward = await newReward.save()
    
      res
      .status(200)
      .json(savedReward)
})

rewardRouter.get('/listreward', async(req , res, next)=>{
    Reward.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
})

rewardRouter.get('/getOneSet', async(req , res, next)=>{
    try{
    const result = await Reward.find().limit(1);
    res.json(result);
    }catch(e){
        next(e);
    }
})

rewardRouter.delete('/delete-reward/:id', async(req,res,next)=> {
    Reward.findByIdAndRemove(req.params.id, (error,data) => {
        if(error) {
            return next(error);
        }else {
                res.status(200).json({
                    msg:data
                })
        }
    })
})

module.exports = rewardRouter