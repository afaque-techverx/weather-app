const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

//Defining paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Defining handbars and view engine
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Afaque",
  });
});
app.get("/weather", (req, res) => {
  const cityName = req.query.address;
  if (!cityName) {
    return res.send({ error: "You must enter the address" });
  } else {
    geocode(cityName, (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(location, (error, dataForcast) => {
        if (error) {
          return res.send(error);
        } else {
          res.send(dataForcast);
        }
      });
    });
  }
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Afaque",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help me",
    name: "Afaque",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must enter the product name",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("help-404", {
    title: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
  });
});
app.listen(port, () => {
  console.log("server goes brhhhhh");
});
