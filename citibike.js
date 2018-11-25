require('dotenv').config()
const yargs = require('yargs');
const location = require('./location');
const fs = require('fs');
const axios = require('axios');
const cb = require('./stations');

const argv = yargs
    .usage("find citibikes near an address")
    .option("address", {
        alias: 'a',
        string: true,
        demand: true
    }).help().argv;

console.log("Looking up:", argv.address)


// location.getGeoLocation(argv.address).then((res) => {
//     console.log("got: ", res);
// }).catch((error) => {
//     console.log("error: ", error)
// })
var loc =  { 
    address: 'New York Times Bldg, 620 8th Ave, New York, NY 10018, USA',
    latitude: 40.756105,
    longitude: -73.9901921
 }


cb.saveStations();
stations = cb.getStations();
closest = cb.findClosestStations(loc, stations)
console.log(closest)