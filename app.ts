import express, { Request, Response } from "express";
import https from "https";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req: Request, res: Response) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req: Request, res: Response) {
    const query: string = req.body.cityName;
    const apiKey: string = "a6f62d22f306596124a43164abaebcc3";
    const unit: string = "metric";
    const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data.toString());
            const temp: number = weatherData.main.temp;
            const weatherDescription: string = weatherData.weather[0].description;
            const icon: string = weatherData.weather[0].icon;
            const imageURL: string = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius</h1>`);
            res.write(`<h1>The weather is currently ${weatherDescription}</h1>`);
            res.write(`<img src=${imageURL}>`);
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
