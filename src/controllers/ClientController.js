const Client = require('../models/Client')

class ClientController {
  async create (req, res) {
    const { name, cellphoneNumber, email, password } = req.body

    // Validate if email already exists
    const data = await Client.findOne({ email })
    if (data !== null) {
      res.statusCode = 400
      res.json({
        status: false,
        msg: 'O e-mail já pertence a outra conta'
      })
    }

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

  async getAll (req, res) {
    try {
      const data = await Client.findAll()
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
          msg: 'Nenhum cliente cadastrado.'
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

module.exports = new ClientController()
