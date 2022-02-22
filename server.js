const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://project-services-api.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.listen(port);

console.log("Server started...");