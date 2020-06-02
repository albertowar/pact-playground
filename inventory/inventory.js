'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.get('/v1/inventory/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  const item = db.getItem(itemId);

  if (!item) {
    res.status(404).send({ message: "Item not found" });
  }

  res.json({ itemId: itemId, price: item.price });
});

/*
  Request: { "itemId": "item_1" }
*/
app.post('/v1/collection/:userId', (req, res) => {
  const userId = req.params.userId;

  const item = db.getItem(req.body.itemId);

  if (!item) {
    res.status(404).send({ message: "Item not found" });
  }

  db.addItemToUser(userId, item.itemId);

  res.status(201);
});

module.exports.app = app;
