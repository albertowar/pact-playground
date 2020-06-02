'use strict';

const { Verifier } = require('@pact-foundation/pact');
const app = require('../inventory').app;
const db = require('../db');

describe("Inventory Contract Test", () => {
  it('Validate Expectations', () => {
    const opts = {
      provider: "Inventory",
      logLevel: "DEBUG",
      providerBaseUrl: "http://localhost:8081",

      stateHandlers: {
        "Has no animals": () => {
          animalRepository.clear()
          token = "1234"
          return Promise.resolve(`Animals removed to the db`)
        },
        "Has some animals": () => {
          token = "1234"
          importData()
          return Promise.resolve(`Animals added to the db`)
        },
        "Has an animal with ID 1": () => {
          token = "1234"
          importData()
          return Promise.resolve(`Animals added to the db`)
        },
        "is not authenticated": () => {
          token = ""
          Promise.resolve(`Invalid bearer token generated`)
        },
      },

      // Fetch from broker with given tags
      consumerVersionTag: ["prod"],

      // Tag provider with given tags
      providerVersionTag: ["prod"],

      // Specific Remote pacts (doesn't need to be a broker)
      // pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactUrls: [
      //   path.resolve(
      //     process.cwd(),
      //     "./pacts/matching_service-animal_profile_service.json"
      //   ),
      // ],

      providerVersion: "1.0.0",
    };

    const verifier = new Verifier(opts)
      .verifyProvider()
      .then(output => {
        console.log("Pact Verification Complete!");
        console.log(output);
      });
  });
});
