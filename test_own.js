const request = require('request');

const keys = require('./keys.json');

const params = {
    q: 'singapore',
    units: 'metric',
    appid: keys.weather
}

request.get('https://api.openweathermap.org/data/2.5/weather', 
    { qs: params },
    (err, reqResp, body) => {
        const result = JSON.parse(body);
        console.info('result: ', result);
    }
)