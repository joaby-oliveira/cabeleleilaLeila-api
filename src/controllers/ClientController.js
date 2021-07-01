const bcrypt = require('bcrypt')
const Client = require('../models/Client')

class ClientController {
  async create (req, res) {
    const { name, cellphoneNumber, email, password } = req.body

    // Validate if email already exists
    const userExists = await Client.findOne({ where: { email } })
    if (userExists) {
      res.statusCode = 400
      res.json({
        status: true,
        msg: 'E-mail pertence a outra conta'
      })
      return
    }

    try {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)
      await Client.create({
        name,
        cellphoneNumber,
        email,
        password: hashedPassword
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

  async getSingle (req, res) {
    const { id } = req.params
    try {
      const client = await Client.findByPk(id)
      if (client) {
        res.statusCode = 200
        res.json({
          status: true,
          client
        })
      } else {
        res.statusCode = 404
        res.json({
          status: false,
          msg: 'Cliente não encontrado'
        })
      }
    } catch (err) {
      res.statusCode = 404
      res.json({
        status: false,
        msg: 'Algo deu errado, cliente não encontrado'
      })
    }
  }

  async login (req, res) {
    const { email, password } = req.body
    const client = await Client.findOne({ where: { email } })

    if (client) {
      const validPassword = await bcrypt.compare(password, client.password)
      if (validPassword) {
        // res.statusCode = 200
        // res.json({
        //   token: 'E-mail ou senha errados'
        // })
      }
    } else {
      res.statusCode = 404
      res.json({
        msg: 'E-mail ou senha errados'
      })
    }
  }
}

module.exports = new ClientController()
