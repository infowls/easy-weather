var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

var app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://project-services-api.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 5000;
// request handlers
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Enable CORS in Node.js - Clue Mediator' });
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});



