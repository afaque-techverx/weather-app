const request = require("request");


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWZhcXUzIiwiYSI6ImNrd2t1ZnlnaDF2bzQydnBtbXdjYWp6N3IifQ.4LPjZuyn7Uh_1sOMdzvgTQ&limit=1`;
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        console.log("Unable to coneect ot location serves");
      } else if (typeof response.body.features == "undefined") {
        callback("Unable to find location try another search", undefined);
      } else {
          callback(undefined,{
              longitude:response.body.features[0].center[0],
              latitude: response.body.features[0].center[1],
              location:response.body.query
          })
      } 
    })}
  
  

module.exports=geocode
