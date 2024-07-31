const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.port || 3000;

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mykola',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Mykola',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Helping',
    title: 'Helppp',
    name: 'Mykola',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'No/wrong address provided' });
  }

  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Mykola',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Mykola',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
