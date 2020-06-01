'use strict';

const request = require('supertest');
const path = require('path');
const { Pact } = require("@pact-foundation/pact");
const config = require('../config');
const app = require('../storefront').app;

describe("Storefront", () => {
  let inventoryProvider;

  beforeAll(async (done) => {
    inventoryProvider = new Pact({
      consumer: 'Storefront',
      provider: 'Inventory',
      port: 4000,
      log: path.resolve(__dirname, '../logs', 'inventory-integration.log'),
      logLevel: 'ERROR',
      dir: path.resolve(__dirname, '../contracts'),
      spec: 2
    });

    config.setConfig({ INVENTORY_BASE_URL: 'http://127.0.0.1:4000', WALLET_BASE_URL: 'http://127.0.0.1:5000' });

    await inventoryProvider
      .setup()
      .then(() =>
        inventoryProvider.addInteraction({
          state: "Different items",
          uponReceiving: "A request for an item that does not exist",
          withRequest: {
            method: "GET",
            path: "/v1/inventory/1"
          },
          willRespondWith: {
            status: 404,
            headers: { "Content-Type": "application/json" },
            body: { message: "Item not found" }
          },
        })
      );

    done();
  });

  afterAll(async (done) => {
    await inventoryProvider.finalize();
    done();
  });

  it("Purchase items that is not in the inventory", async (done) => {
      request(app)
        .post('/v1/storefront/item/1')
        .auth('user', '1234')
        .expect(404)
        .then(response => {
          const result = JSON.parse(response.body);
          expect(result.message).toEqual("Item not found");
          done();
        });
    });
});
