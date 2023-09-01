import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(
    "/bootstrap/css",
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
  )

app.use(
    "/bootstrap/js",
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
    )

app.use(
    "/jquery/js",
    express.static(path.join(__dirname, 'node_modules/jquery/dist'))
 )


app.get('/', (req, res) => {
    let data = {};
    res.render('templates/index.ejs', data);
});

app.post('/get-weather', async (req, res) => {
    
    let latitude = req.body['latitude'];
    let longitude = req.body['longitude'];
    try {
        let api_url = "https://api.openweathermap.org/data/2.5/weather";
        const result = await axios.get(api_url, {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'imperial',
            appid: process.env.OPEN_WEATHER_API_KEY,
          },
        });
        res.json(result.data);
      } catch (error) {
        let error_obj = {
            error: error.message,
        }
        res.json({ content: error_obj });
      }

});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});