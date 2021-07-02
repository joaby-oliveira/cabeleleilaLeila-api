const express = require('express')
const auth = require('./middlewares/auth')

const router = express.Router()

// Controllers
const Client = require('./controllers/ClientController')
const Schedule = require('./controllers/ScheduleController')

router.get('/client', auth, Client.getAll)
router.post('/client', Client.create)
router.get('/client/:id', auth, Client.getSingle)
router.post('/client/auth', Client.login)

router.post('/schedule', auth, Schedule.create)
router.get('/schedule', auth, Schedule.getAll)
router.delete('/schedule/:id', auth, Schedule.delete)
router.put('/schedule/:id', auth, Schedule.update)

module.exports = router
