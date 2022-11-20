const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://minhchi:minhchi@cluster0.ox1klts.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once('open', () => {
    console.log("Mongo already connect!")
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})

function mongoConnect() {
    mongoose.connect(MONGO_URL)
}

function mongoDisconnect() {
    mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}