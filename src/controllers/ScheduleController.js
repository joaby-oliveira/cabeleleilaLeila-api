const Schedule = require('../models/Schedule')

class ScheduleController {
  async create (req, res) {
    const { service, date, startingTime, endingTime } = req.body
    const scheduleExists = await Schedule.findOne({ where: { date, startingTime, endingTime } })
    if (scheduleExists) {
      res.statusCode = 400
      res.json({
        status: false,
        msg: 'Horário já agendado, escolha outro horário'
      })
    }

    try {
      await Schedule.create({
        service,
        date,
        startingTime,
        endingTime,
        clientId: req.loggedUser.id
      })
      let dateIsNear
      const nowTime = new Date().getTime()
      const clientAppointments = await Schedule.findAll({ where: { clientId: req.loggedUser.id } })
      if (clientAppointments.length > 0) {
        const nearAppointmentDate = clientAppointments[clientAppointments.length - 1].date
        const nearAppointmentTime = new Date(nearAppointmentDate).getTime()
        const weekToMilisecond = 604800017
        if (nearAppointmentTime - nowTime < weekToMilisecond) {
          dateIsNear = true
        } else {
          dateIsNear = false
        }
      }

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
      console.log(req.loggedUser.adm)
      let data
      if (req.loggedUser.adm) {
        data = await Schedule.findAll()
      } else {
        data = await Schedule.findAll({ where: { clientId: req.loggedUser.id } })
      }
      if (data.length !== 0) {
        res.statusCode = 200
        res.json({
          status: true,
          data
        })
      } else {
        res.statusCode = 404
        res.json({
          status: false,
          msg: 'Nenhum agendamento foi realizado.'
        })
      }
    } catch (err) {
      res.statusCode = 404
      res.json({
        status: false,
        msg: 'Não foi possível buscar agendamentos.'
      })
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const deleted = await Schedule.destroy({ where: { id, clientId: req.loggedUser.id } })
      console.log(deleted)
      if (deleted) {
        res.statusCode = 200
        res.json({
          status: true,
          msg: 'Agendamento deletado com sucesso'
        })
        return
      } else {
        res.statusCode = 400
        res.json({
          status: false,
          msg: 'Não foi possível excluír a tarefa'
        })
        return
      }
    } catch (err) {
      console.log(err)
      res.statusCode = 400
      res.json({
        status: false,
        msg: 'Não foi possível deletar o agendamento'
      })
    }
  }

  async update (req, res) {
    const { service, date, startingTime, endingTime } = req.body
    const { id } = req.params
    const appointmentExists = await Schedule.findByPk(id)
    if (appointmentExists) {
      try {
        const edited = await Schedule.update(
          { service, date, startingTime, endingTime },
          { where: { clientId: req.loggedUser.id, id } }
        )
        if (edited[0] === 1) {
          res.statusCode = 200
          res.json({
            status: true,
            msg: 'Agendamento atualizado'
          })
          return true
        } else {
          res.statusCode = 400
          res.json({
            status: false,
            msg: 'Não foi possível editar o agendamento'
          })
          return false
        }
      } catch (err) {
        console.log(err)
        res.statusCode = 400
        res.json({
          status: false,
          msg: 'Não foi possível editar o agendamento'
        })
        return false
      }
    } else {
      res.statusCode = 400
      res.json({
        status: false,
        msg: 'O agendamento não existe'
      })
    }
  }
}

module.exports = new ScheduleController()
