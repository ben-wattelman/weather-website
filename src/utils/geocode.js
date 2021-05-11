const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmVud2F0dGVsbWFuIiwiYSI6ImNrb2g5am40djEzaGsybnRyenAwYmQzdnMifQ.y0X-WFzxbj1UbLJOk6G2Jw&limit=1';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to cennect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latidute: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;