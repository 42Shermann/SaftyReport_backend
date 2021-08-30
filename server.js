

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const uri = require('./config')
const usersRouter = require('./controller/users')

const app = express()
app.use(bodyParser.json())
app.use(cors())

/*
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});  

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
  desc:String
})

var Reports = mongoose.model('reports',ReportSchema)

app.get('/',(req,res)=>{
  Reports.find({}).then(data=>{
    res.send(data)
}).catch(err=>{
    console.log(err)
})
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
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