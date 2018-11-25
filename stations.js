require('dotenv').config()
const fs = require('fs');
const axios = require('axios');
const geolib =  require('geolib');

// location.getGeoLocation(argv.address).then((res) => {
//     console.log("got: ", res);
// }).catch((error) => {
//     console.log("error: ", error)
// })
let _station_file = 'stations.json';
async function saveStations() {
    response = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
    fs.writeFile(_station_file,
                 JSON.stringify(response.data, undefined, 2), 
                 'utf8', 
                 (err) => {
                     if (err) {
                         console.log("error saving file: ", err)
                     }
                 });
}

function getStations() {
    dat = fs.readFileSync(_station_file);
    dat = JSON.parse(dat);
    stations = dat.data.stationBeanList;

    return stations;
}

function findClosestStations(location, stations, count=3) {
    stations.map((station) => {
        station.distance = geolib.getDistance({
            latitude: station.lat,
            longitude: station.lon
        }, location)
        return station;
    })
    
    stations = stations.sort((a,b) => a.distance - b.distance)
        .slice(0, count);

    return stations;

}

module.exports = {
    saveStations,
    getStations,
    findClosestStations,
}
