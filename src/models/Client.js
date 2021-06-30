const Sequelize = require('sequelize')
const db = require('../database/database')

const Client = db.define('users', {
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

db.sync({ force: true })
  .then(result => {
  })
  .catch(err => {
    console.log(err)
  })

module.exports = Client
