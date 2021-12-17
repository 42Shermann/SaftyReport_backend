const pingRouter = require('express').Router()

pingRouter.get('/', async (request, response) => {
    try{

        response.status(200).json({ message: "Acknowledged" });  
    
    }
    catch{
        next(error);
    }
  })

module.exports = pingRouter