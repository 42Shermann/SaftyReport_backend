const reportsRouter = require('express').Router()
const Report = require('../models/reports')

reportsRouter.get('/', (request, response) => {
    Report.find({}).then(reports => {
        response.json(reports.map(report => report.toJSON()))
      })
})

reportsRouter.get('/:id', (request, response, next) => {
    Report.findById(request.params.id)
    .then(report => {
      if (report) {
        response.json(report.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

reportsRouter.get('/user', (request, response, next) => {
  const user = request.params.user
  Report.find(report => report.user === user)
  .then(report => {
    if (report) {
      response.json(report.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

reportsRouter.post('/', (request, response, next) => {
  const body = request.body

  const report = new Report({
    title: body.content,
    content: body.content,
    date: new Date(),
    isFinished: body.isFinished,
    desc: body.desc
  })

  report.save()
    .then(savedReport => {
      response.json(savedReport.toJSON())
    })
    .catch(error => next(error))
})

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