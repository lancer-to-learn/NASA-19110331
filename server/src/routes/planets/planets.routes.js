const { httpGetAllPlanets } = require('./planets.controllers')
const express = require('express')

const router = express.Router()

router.get('/', httpGetAllPlanets)

module.exports = router