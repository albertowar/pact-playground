'use strict';

const got = require('got');
const express = require('express');
const basicAuth = require('express-basic-auth');
const config = require('./config');

const app = express();

app.use(basicAuth({
  users: { user: '1234' }
}));

app.post('/v1/storefront/item/:itemId', async (req, res) => {
  try {
    const localConfig = config.getConfig();
    const url = `${localConfig.INVENTORY_BASE_URL}/v1/inventory/${req.params.itemId}`;
    const item = await got(url);
    await got.post(`${localConfig.WALLET_BASE_URL}/v1/wallet/user`, { amount: item.amount });
  } catch (e) {
    if (e.response) {
      res.status(e.response.statusCode).json(e.response.body);
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

module.exports.app = app;
