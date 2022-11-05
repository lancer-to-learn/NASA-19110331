const express = require('express')
const path = require('path')
const cors = require('cors')
const planetsRouter = require('./routes/planets/planets.routes')
const launchesRouter = require('./routes/launches/launches.routes')
const morgan = require('morgan')


const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(morgan('combined'))
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app