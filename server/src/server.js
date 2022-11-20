const app = require('./app')
const http = require('http')
const PORT = process.env.PORT || 8000
const {loadTablePlanets} = require('./models/planets.models')
const {mongoConnect} = require('./service/mongo')
const {loadLaunchData} = require('./models/launches.models')
const server = http.createServer(app)


async function startServer() {
    await mongoConnect()
    await loadTablePlanets()
    await loadLaunchData()
    server.listen(PORT, () => {
        console.log(`Listening at port ${PORT}...`)
        
    })
}

startServer()
