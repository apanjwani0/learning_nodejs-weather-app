const request = require('request')

const weatherstackKey = "cbb28fab3d106ee2ddb28d9aeb63cfd4"


weatherstack = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=" + weatherstackKey + "&query=" + location
    //console.log(url)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to Connect", undefined)

        } else if (response.body.error) {
            callback("Can't search for location", undefined)
        } else {
            callback(undefined, {
                feelslike: response.body.current.feelslike,
                temperature: response.body.current.temperature,
                place_name: response.body.location.name,
                //console.log('The temperature is ' + temperature + ', and it feels like ' + feelslike)
            })

        }

    })

}

module.exports = weatherstack
