

const launches = new Map()
let latestFlightNumber = 10

const launch = {
    flightNumber: 10,
    mission: "Mercury Exploration",
    launchDate: new Date("July 27, 2030"),
    target: 'Mercury',
    rocket: 'API 4869',
    customers: ['ZTM', 'Nasa'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch)

function isExistLaunch(id) {
    return launches.has(id)
}

function getAllLaunch() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['ZTM', 'Nasa'],
        upcoming: true,
        success: true
    }))
    return launches.get(latestFlightNumber)
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}


module.exports = {
    isExistLaunch,
    getAllLaunch,
    addNewLaunch,
    abortLaunchById,
}






