const express = require('express');
const path = require('path');

// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//Express static file module
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/ricerca', function (req, res) {
   	res.sendFile(path.join(__dirname, '/views/ricerca.html'));
});

app.get('/credits', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/credits.html'));
});

app.get('/credits.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/credits.html'));
});

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, '/favicon.ico'));
});

app.post('/key', function (req,res) {
  res.json({
      api_key_google: process.env.API_KEY_GOOGLE,
      api_weather: process.env.API_KEY_OPENWEATHER
  });
  res.end();
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
