'use strict';

const request = require('supertest');
const path = require('path');
const { Pact } = require("@pact-foundation/pact");
const config = require('../config');
const inventoryInteractions = require('./interactions/intentory');
const walletInteractions = require('./interactions/wallet');
const app = require('../storefront').app;

describe("Storefront", () => {
  let inventoryProvider, walletProvider;

  beforeAll(async (done) => {
    inventoryProvider = new Pact({
      consumer: 'Storefront',
      provider: 'Inventory',
      port: 4000,
      log: path.resolve(__dirname, '../logs', 'inventory-integration.log'),
      logLevel: 'ERROR',
      dir: path.resolve(__dirname, '../../contracts'),
      spec: 2
    });

    walletProvider = new Pact({
      consumer: 'Storefront',
      provider: 'Wallet',
      port: 5000,
      log: path.resolve(__dirname, '../logs', 'wallet-integration.log'),
      logLevel: 'ERROR',
      dir: path.resolve(__dirname, '../../contracts'),
      spec: 2
    });

    config.setConfig({ INVENTORY_BASE_URL: 'http://127.0.0.1:4000', WALLET_BASE_URL: 'http://127.0.0.1:5000' });

    await inventoryProvider
      .setup()
      .then(() => Promise.all(inventoryInteractions.map(i => inventoryProvider.addInteraction(i))));

    await walletProvider
      .setup()
      .then(() => Promise.all(walletInteractions.map(i => walletProvider.addInteraction(i))));

    done();
  });

  afterAll(async (done) => {
    await Promise.all([inventoryProvider.finalize(), walletProvider.finalize()])
      .then(() => done());
  });

  it("Purchase an item that is not in the inventory", (done) => {
    request(app)
      .post('/v1/storefront/item/non-existent')
      .auth('user_1', '1234')
      .expect(404)
      .then(response => {
        const result = JSON.parse(response.body);
        expect(result.message).toEqual("Item not found");
      })
      .then(() => done(), done);;
  });

  it("Purchase an item", (done) => {
    request(app)
      .post('/v1/storefront/item/item_1')
      .auth('user_1', '1234')
      .expect(201, done);
  });
});
