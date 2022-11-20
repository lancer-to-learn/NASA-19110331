const { 
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById, 
} = require('../../models/launches.models')

const {getPagination} = require('../../service/query')

async function httpGetAllLaunches(req, res) {
    const {skip, limit} = getPagination(req.query)
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches)
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.launchDate || !launch.target || !launch.rocket) {
        return res.status(404).json({
            error: "Missing launch's property!"
        })
    }
    if (isNaN(new Date(launch.launchDate))) {
        return res.status(404).json({
            error: "Launch Date is invalid!"
        })
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

async function httpAbortLaunchById(req, res) {
    const launchId = Number(req.params.id)
    const exist = await existsLaunchWithId(launchId)
    if (!exist) {
        return res.status(404).json({
            error: "Launch is not exist!"
        })
    }
    const aborted = await abortLaunchById(launchId)
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted!"
        })
    }

    return res.status(200).json({
        ok: true,
    })
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunchById
}