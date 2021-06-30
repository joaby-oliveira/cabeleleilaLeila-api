const express = require('express')
const app = express()
const Router = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(Router)

app.get('/', (req, res) => {
  res.json({
    msg: 'Test'
  })
})

app.listen(8080)
