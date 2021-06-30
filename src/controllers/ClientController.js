const Client = require('../models/Client')

class ClientController {
  async create (req, res) {
    const { name, cellphoneNumber, email, password } = req.body
    try {
      await Client.create({
        name,
        cellphoneNumber,
        email,
        password
      })

      res.statusCode = 201
      res.json({
        status: true,
        msg: 'Conta criada com sucesso!'
      })
    } catch (err) {
      res.statusCode = 400
      console.log(err)
      res.json({
        status: false,
        msg: 'Não foi possível criar a conta'
      })
    }
  }
}

module.exports = new ClientController()
