const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise; // set promise type

//mongoose.connect('mongodb://localhost:27017/snow-api-test');

app.use(bodyParser.json());
routes(app);

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
