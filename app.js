import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

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

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});