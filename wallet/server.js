'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db').wallet;

app.use(bodyParser.json());

app.get('/v1/wallet/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!db.has(userId)) {
    res.status(400).send({ message: "User not found" });
  }

  res.json({ id: userId, amount: db[userId].amount });
});

/*
  Request: { "amount": 30 }
*/
app.post('/v1/wallet/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!req.body.amount || req.body.amount == 0) {
    res.status(400).send({ message: "Amount cannot be zero" });
  }

  if (!db.has(userId)) {
    res.status(400).send({ message: "User not found" });
  }

  if (db[userId].amount - req.body.amount < 0) {
    res.status(400).send({ message: "User does not have enough money" });
  }

  db[userId].amount -= req.body.amount;

  res.status(200);
});

app.listen(3000);
