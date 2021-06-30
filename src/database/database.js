const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'cabeleleila_leila',
  'postgres',
  '123456',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)
module.exports = sequelize
