//load requred libaries
const express = require('express');
const hbs = require('express-handlebars');
const request = require('request');
const keys = require('./keys.json');
//tunables
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

//Create an instance of the applicaiton
const app = express();

;
//Configure handle bars
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(PORT, () => {
    console.info('FX application started on %s at port %d', new Date(), PORT);
});

//Route
/*app.get('/weather', (req, resp) => {
   const cityName = req.query['cityName'];
   //const favFruit = req.query['fav-fruit'];
   
    resp.status(200);
    resp.type('text/html');
    //resp.send(`<h1>Your are searching for weather in ${cityName}.</h1>`);
    resp.render('weather', {
        layout: false,
        city: cityName.toUpperCase()
    }); 
}); */

app.get('/weather', (req, resp) => {
    const cityName = req.query.cityName;

    const params = {
        q: cityName,
        units: 'metric',
        appid: keys.weather
    };


    request.get('https://api.openweathermap.org/data/2.5/weather', 
        { qs: params },
        (err, _, body) => {
            if (err) {
                resp.status(400); resp.type('text/plain'); resp.send(err); return;
            }
            const result = JSON.parse(body);
            resp.status(200);
            resp.type('text/html');
            resp.render('weather', {
                layout: false,
                city: cityName.toUpperCase(),
                weather: result.weather,
                temperature: result.main
            });
        }
    );
});



app.get(/.*/, express.static(__dirname + '/public'));
