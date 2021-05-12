const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req,res) => {
   res.render('index', {
       title: 'Weather',
       name: 'Ben Wattelman'
   });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben Wattelman'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: "This is helpful text.",
        title: 'Help',
        name: 'Ben Wattelman'
    });
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        });
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(data.latidute, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });


});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        message: "Help article not found.",
        name: 'Ben Wattelman'
    });
});

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        message: "Page not found.",
        name: 'Ben Wattelman'
    });
});


app.listen(port, () => {
    console.log("Server is up on port " + port);
});