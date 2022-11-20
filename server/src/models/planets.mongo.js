const mongoose = require('mongoose')

const mongoPlanet = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Planet', mongoPlanet)