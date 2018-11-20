require('dotenv').config()
const yargs = require('yargs');

const argv = yargs
    .usage("find citibikes near an address")
    .option("address", {
        alias: 'a',
        type: 'string',
        demand: true
    }).help().argv;

console.log("Looking up:", argv.address)

const mapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_KEY
  });


let getGeoLocation = (address) => {
    return new Promise((resolve, reject) => {
        mapsClient.geocode({
            address: address
        }, (err, response) => {
            if (err) {
                reject("could not connect to maps api");
            } else if (response.json.status === 'ZERO_RESULTS') {
                reject("address not found");
            } else if (response.json.status == "OK") {
                let result = response.json.results[0]
                resolve({
                    address: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                });
            } else {
                reject(`unknown response ${response}`);
            }
        })
    })
};

getGeoLocation(argv.address).then((res) => {
    console.log("got: ", res);
}).catch((error) => {
    console.log("error: ", error)
})
