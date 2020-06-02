'use strict';

module.exports = [
  {
    state: "An user with a wallet amount of 200 and ID user_1",
    uponReceiving: "A request to decrease the wallet amount by 100",
    withRequest: {
      method: "POST",
      path: "/v1/wallet/user_1",
      body: { amount: 100 }
    },
    willRespondWith: {
      status: 201
    }
  }
];
