const request = require('request')
const mapboxKey = "pk.eyJ1IjoiYXBhbmp3YW5pMCIsImEiOiJja2RhbWg1em4zNmtmMnhxdmR5bmFmcmJ0In0.gETEn_mC0GfsgRpwjopdGw"



const geocode = (address, callback) => {
    const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + mapboxKey + "&limit=1"
    //console.log(mapboxURL)

    request({ url: mapboxURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (response.body.features.length === 0) {
            callback("Can't find any related location", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name,
                //console.log(lat, long)
            })
        }
    })

}

module.exports = geocode