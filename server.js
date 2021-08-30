const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const config = require('./utils/config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true});  

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));  

var Schema = mongoose.Schema;

const ReportSchema = new Schema({

  title:String,
  content:String,
  date:Date,
  isFinished:String,
  desc:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

var Reports = mongoose.model('reports',ReportSchema)

app.get('/reports',(req,res)=>{
  Reports.find({}).then(data=>{
    res.send(data)
}).catch(err=>{
    console.log(err)
})
})

app.get('/reports/user',(req,res)=>{
  Reports.find({ user: 'johnson112' }).then(data=>{
    res.send(data)
}).catch(err=>{
    console.log(err)
})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


/*
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("saftyRep_db");
    const reports = database.collection("reports");
    // Query for a movie that has the title 'The Room'
    const report = await reports.findOne();
    // since this method returns the matched document, not a cursor, print it directly
    console.log(report);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
*/