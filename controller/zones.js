const zonesRouter = require('express').Router()
const zone = require('../models/zones')

zonesRouter.get('/', async (request, response, next) => {
    const zones = await zone
    .find({Active:true})

  response.json(zones)
  })

  zonesRouter.get('/edit-place/:id', async(req, res, next) => {
     try{
         
     const zoneResult = await zone.findById(req.params.id).exec();
     res.json(zoneResult);

     }catch(err){
         next(err);
     }
})

zonesRouter.post('/create-place', async(req, res , next) => {
  zone.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })
})

// Update Place
zonesRouter.put('/update-place/:id', async(req, res, next) => {
  zone.findByIdAndUpdate(req.params.id, {
      $set: req.body
  }, (error, data) => {
      if (error) {
          return next(error);
          console.log(error);
      } else {
          res.json(data);
          console.log('Student updated successfully');
      }
  })
})

zonesRouter.delete('/delete-place/:id', async(req,res,next)=> {
  zone.findByIdAndRemove(req.params.id, (error,data) => {
      if(error) {
          return next(error);
      }else {
              res.status(200).json({
                  msg:data
              })
      }
  })
})

module.exports = zonesRouter