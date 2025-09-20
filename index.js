const express = require('express')
require('dotenv').config();

const database = require("./config/database")

const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

const systemConfig = require('./config/system.js')

database.connect()

const app = express()
const port = process.env.PORT

// app locals variable

app.locals.prefixAdmin = systemConfig.PATH_ADMIN


app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public')) // file tĩnh

// routesClient
route(app);
// routesAdmin
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
