const express = require('express')

const router = express.Router()

// Controllers
const Client = require('./controllers/ClientController')
const Schedule = require('./controllers/ScheduleController')

router.get('/client', Client.getAll)
router.post('/client', Client.create)
router.get('/client/:id', Client.getSingle)
router.post('/schedule', Schedule.create)

router.get('/schedule', Schedule.getAll)
router.delete('/schedule/:id', Schedule.delete)
router.put('/schedule/:id', Schedule.update)
// router.post('/client/auth', Client.login)

module.exports = router
