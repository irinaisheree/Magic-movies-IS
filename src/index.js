const expressConfigurator = require("./config/expressConfigurator")
const express = require("express")

const mongoose = require('mongoose')

const handlebarsConfigurator = require("./config/handlebarsConfigurator")
const app = express()

const routes = require('./routers')

expressConfigurator(app)
handlebarsConfigurator(app)


const PORT = 5000

app.use(routes)

mongoose.connect(`mongodb://127.0.0.1:27017/magic-movies`).then(()=>{ console.log(`DB connected`)

app.listen(PORT, () => 
    console.log(`Server is listening on port ${PORT}...`))

}).catch(err => console.log(`Cannot connect to DB`))