const Sequelize = require('sequelize')
const db = require('../database/database')

const Schedule = require('./Schedule')

const Client = db.define('clients', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cellphoneNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Client.hasMany(Schedule)
Schedule.belongsTo(Client)

db.sync({ force: false })
  .then(result => {
  })
  .catch(err => {
    console.log(err)
  })

module.exports = Client
