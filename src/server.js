var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes');
var morgan = require('morgan');
var path = require('path');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use('/api', router);

// Example route. See server-spec.js for the related test.
app.get('/zen', function(req, res) {
  res.json('There are no accidents. - Master Oogway')
})

app.listen(8080, function () {
  console.log('GoalPosts App \nListening on port 8080...')
})

module.exports = app;
