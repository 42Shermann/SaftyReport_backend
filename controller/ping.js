const pingRouter = require('express').Router()

pingRouter.get('/', async (request, response) => {
    try{

        response.status(200).send('Acknowledge');  
    
    }
    catch{
        next(error);
    }
  })

module.exports = pingRouter