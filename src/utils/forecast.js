const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca6109a1049f204806a65177812c5846&query=+' + latitude + ',' + longitude;

    request({url, json: true}, (error, { body }) => {
    if (error) {
        callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
        callback("Unable to find location! Please try a different one.", undefined);
    } else {
        const data = body.current;
        callback (undefined, data.weather_descriptions[0] + ". It is currently " + data.temperature + " degrees out. It feels like " + data.feelslike + " degrees out. " +
            "The humidity is " + data.humidity + "%.");
    }
});
};

module.exports = forecast;