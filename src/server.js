
// src/server.js
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config');
const router = require('./routes');

// Connect to MongoDB and create/use database as configured
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/file.model.js');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//app.use(function(req, res, next) {
//  res.end("Hello World!");
//});


//const publicPath = path.resolve(__dirname, './public');
//app.use(express.static(publicPath));
//app.use('/api', router);

app.use(function(req, res, next) {
  console.log("req.body BEFORE parsing", req.body);
  next();
})

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("req.body AFTER parsing", req.body);
  next();
})

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
