'use strict';

const express = require('express');
const db = require('./db');

const app = express();

app.get('/v1/inventory/:itemId', (req, res) => {
   res.send("Hello world!");
});

app.post('/v1/collection/:userId', (req, res) => {
  // Get Item id from body
  res.send("Hello world!");
});

app.listen(3000);
