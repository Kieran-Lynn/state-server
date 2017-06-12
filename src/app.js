const express = require('express')
const app = express()
const utils = require('./utils.js')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;

  if(!latitude || !longitude){
    res.status(400).send("Error: Please provide longitude and latitude.\n");
    return;
  }

  var state = utils.determineState(longitude, latitude);
  res.json({"state" : state});
})

app.listen(8080, function () {})

module.exports = app;