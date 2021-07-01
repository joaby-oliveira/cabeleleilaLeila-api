const Schedule = require('../models/Schedule')

class ScheduleController {
  async create (req, res) {
    const { service, date, startingTime, endingTime } = req.body

    // Validate if email already exists
    const scheduleExists = await Schedule.findOne({ where: { date, startingTime } })
    if (scheduleExists) {
      res.statusCode = 400
      res.json({
        status: true,
        msg: 'Horário já agendado, escolha outro horário'
      })
    }

    try {
      await Schedule.create({
        service,
        date,
        startingTime,
        endingTime
      })

      res.statusCode = 201
      res.json({
        status: true,
        msg: 'Agendamento realizado!'
      })
    } catch (err) {
      res.statusCode = 400
      console.log(err)
      res.json({
        status: false,
        msg: 'Não foi possível agendar'
      })
    }
  }
}

module.exports = new ScheduleController()
