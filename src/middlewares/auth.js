const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization
  if (authToken) {
    const bearer = authToken.split(' ')
    const token = bearer[1]

    jwt.verify(token, process.env.JWTSECRET, (err, data) => {
      if (err) {
        res.statusCode = 401
        res.json({ msg: err })
      } else {
        req.token = token
        req.loggedUser = { id: data.id, email: data.email, adm: data.adm }
        next()
      }
    })
  } else {
    res.statusCode = 401
    res.json({ msg: 'Token JWT inválido' })
  }
}
