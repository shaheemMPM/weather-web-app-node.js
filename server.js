const request = require('request');
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
const ejs = require('ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function(rqst, responce) {
  responce.render('index', {weather: null, error: null});
});

app.post('/', function(rqst, responce) {
  let city = rqst.body.city;
  let apiKey = '58aa6d4558546ffb65cf07b22a23dcea';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (error, response, body) {
    if (error) {
      responce.render('index', {weather:null, error:'network error'});
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        responce.render('index', {weather: null, error:'Invalid City'});
      }else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        responce.render('index', {weather: weatherText, error:null});
      }
    }
  });

});
const PORT = process.env.PORT
app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  }else {
    console.log("app listening on port 3000");
  }
});
