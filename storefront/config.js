'use strict';

let config = {
  INVENTORY_BASE_URL: process.env.INVENTORY_BASE_URL,
  WALLET_BASE_URL: process.env.WALLET_BASE_URL,
  PORT: process.env.PORT
};

module.exports.getConfig = function getConfig() {
  return config;
};

module.exports.setConfig = function setConfig({ INVENTORY_BASE_URL, WALLET_BASE_URL, PORT }) {
  config.INVENTORY_BASE_URL = INVENTORY_BASE_URL;
  config.WALLET_BASE_URL = WALLET_BASE_URL;
  config.PORT = PORT;
};
