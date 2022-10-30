const { 
    isExistLaunch,
    getAllLaunch, 
    addNewLaunch, 
    abortLaunchById 
} = require('../../models/launches.models')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunch())
}

function httpAddNewLaunch(req, res) {
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
    return res.status(201).json(addNewLaunch(launch))
}

function httpAbortLaunchById(req, res) {
    const launchId = Number(req.params.id)
    if (!isExistLaunch(launchId)) {
        return res.status(404).json({
            error: "Launch is not exist!"
        })
    }
    return res.status(200).json(abortLaunchById(launchId))
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunchById
}