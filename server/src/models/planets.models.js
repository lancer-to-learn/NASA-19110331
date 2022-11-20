const { rejects } = require('assert');
const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path')
const planets = require('./planets.mongo')

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadTablePlanets() {
    return new Promise((resolve, rejects) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                rejects(err)
            })
            .on('end', async () => {
                const planetsFound = (await getAllPlanets()).length
                console.log(`${planetsFound} habitable planets found!`)
                resolve()
            });
    })
}

async function getAllPlanets() {
    return await planets.find({}, {
        '_id':0, '__v1':0,
    })
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        })
    } catch(err) {
        console.log("Save planet unsuccessful because ", err)
    }
}
module.exports = {
    loadTablePlanets,
    getAllPlanets,
}
