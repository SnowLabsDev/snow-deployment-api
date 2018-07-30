const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

// set promise type
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
routes(app);

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
