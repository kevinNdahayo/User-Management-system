const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 9000

// configure the middlewares
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// parsing data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// static files
app.use(express.static('public'))

//imports
const indexRoute = require('./routes/index.routes')
// Routing
app.use('/', indexRoute)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
