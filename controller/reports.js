const reportsRouter = require('express').Router()
const Report = require('../models/reports')
const User = require('../models/user2')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

reportsRouter.get('/', async (request, response) => {
  const reports = await Report
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(reports)
})

reportsRouter.get('/user', async (request, response, next) => {
try{
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

    Report.find({user: user})
    .then(report => {
      if (report) {
        response.json(report)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
}catch(error) {
  next(error)
}})

reportsRouter.get('/test', (request, response, next) => {
  const user = request.params.user
  const query = Report.find({user: user});
  query.getFilter()
  .then(report => {
    if (report) {
      response.json(report.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

reportsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

  const report = new Report({
    title: body.title,
    content: body.content,
    date: new Date(),
    isFinished: 'Not Finished',
    desc: body.desc,
    user: user._id,
    imgUrl:body.url
  })

  const savedReport = await report.save()
  user.reports = user.reports.concat(savedReport._id)
  await user.save()
  
  response
  .status(200)
  .json(savedReport)

} catch(error) {
  next(error)
}
})

reportsRouter.post('/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

reportsRouter.delete('/:id', (request, response, next) => {
    Report.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

reportsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const report = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = reportsRouter