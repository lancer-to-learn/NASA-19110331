const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunchById } = require('./launches.controllers')
const express = require('express')

const router = express.Router()

router.get('/', httpGetAllLaunches)
router.post('/', httpAddNewLaunch)
router.delete('/:id', httpAbortLaunchById)

module.exports = router