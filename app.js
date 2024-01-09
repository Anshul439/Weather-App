"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var https_1 = require("https");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    var query = req.body.cityName;
    var apiKey = "a6f62d22f306596124a43164abaebcc3";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(query, "&appid=").concat(apiKey, "&units=").concat(unit);
    https_1.default.get(url, function (response) {
        response.on("data", function (data) {
            var weatherData = JSON.parse(data.toString());
            var temp = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = "https://openweathermap.org/img/wn/".concat(icon, "@2x.png");
            res.write("<h1>The temperature in ".concat(query, " is ").concat(temp, " degrees Celsius</h1>"));
            res.write("<h1>The weather is currently ".concat(weatherDescription, "</h1>"));
            res.write("<img src=".concat(imageURL, ">"));
            res.send();
        });
    });
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
