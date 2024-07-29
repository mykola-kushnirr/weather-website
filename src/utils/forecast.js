const request = require('request');

const forecast = (lat, lon, cb) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=332efa6ab18847b8be6164354241803&q=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather service.');
    } else if (body.error) {
      cb(body.error.message);
    } else {
      cb(
        undefined,
        `${body.current.condition.text} --> it's currently ${body.current.temp_c} degrees out. There's a ${body.current.precip_in}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
