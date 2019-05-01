const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const verifyAge = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/?emptyAge=true')
  }

  return next()
}

app.get('/', (req, res) => {
  if (req.query.emptyAge) {
    var empAge = true
  } else {
    var empAge = false
  }
  return res.render('home', { emptyAge: empAge })
})

app.get('/major', verifyAge, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', verifyAge, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.listen(3000)
