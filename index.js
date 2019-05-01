const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('engine view', 'njk')

app.get('/', (req, res) => {
  return res.send('Configuração Ok!')
})

app.listen(3000)
