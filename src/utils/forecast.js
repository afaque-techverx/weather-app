const request = require("request");

const forecast = (city, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5cac1360b77322b4a79ed774f4fc65f5&query=${city}`;
  
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather: response.body.current.weather_descriptions,
        temperature:response.body.current.temperature,
        observation_time:response.body.current.observation_time


      });
    }
  });
};

module.exports = forecast;

