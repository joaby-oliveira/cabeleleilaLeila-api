const Schedule = require('../models/Schedule')

class ScheduleController {
  async create (req, res) {
    const { service, date, startingTime, endingTime, clientId } = req.body
    let dateIsNear = ''
    // Validate if email already exists
    const scheduleExists = await Schedule.findOne({ where: { date, startingTime, endingTime } })
    if (scheduleExists) {
      res.statusCode = 400
      res.json({
        status: true,
        msg: 'Horário já agendado, escolha outro horário'
      })

      const nowTime = new Date().getTime()
      const clientAppointments = await Schedule.findAll({ where: { clientId } })
      if (clientAppointments.length > 0) {
        const nearAppointmentDate = clientAppointments[clientAppointments.length - 1].date
        const nearAppointmentTime = new Date(nearAppointmentDate).getTime()

        console.log(nearAppointmentDate)
        console.log(new Date())

        const weekToMilisecond = 604800017
        if (nearAppointmentTime - nowTime > weekToMilisecond) {
          dateIsNear = 'Mais de uma semana'
        } else {
          dateIsNear = 'Menos de uma semana'
        }
      }
    }

    try {
      await Schedule.create({
        service,
        date,
        startingTime,
        endingTime,
        clientId
      })

      res.statusCode = 201
      res.json({
        status: true,
        msg: 'Agendamento feito com sucesso',
        dateIsNear
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

  async getAll (req, res) {
    try {
      const data = await Schedule.findAll()
      if (data.length !== 0) {
        res.statusCode = 200
        res.json({
          status: true,
          data
        })
      } else {
        res.statusCode = 401
        res.json({
          status: false,
          msg: 'Nenhum agendamento foi realizado.'
        })
      }
    } catch (err) {
      res.statusCode = 404
      res.json({
        status: false,
        msg: 'Nenhum cliente registrado.'
      })
    }
  }
}

module.exports = new ScheduleController()
