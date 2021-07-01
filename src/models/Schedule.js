const Sequelize = require('sequelize')
const db = require('../database/database')

const Schedule = db.define('schedules', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  startingTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  endingTime: {
    type: Sequelize.TIME,
    allowNull: false
  }
})

db.sync({ force: true })
  .then(result => {
  })
  .catch(err => {
    console.log(err)
  })

module.exports = Schedule
