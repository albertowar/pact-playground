'use strict';

module.exports = [
  {
    state: "A bunch of items",
    uponReceiving: "A request for an item that it is not in the inventory",
    withRequest: {
      method: "GET",
      path: "/v1/inventory/non-existent"
    },
    willRespondWith: {
      status: 404,
      headers: { "Content-Type": "application/json" },
      body: { message: "Item not found" }
    },
  },
  {
    state: "An item with ID 1 and price 100",
    uponReceiving: "A request for an item from the inventory",
    withRequest: {
      method: "GET",
      path: "/v1/inventory/item_1",
    },
    willRespondWith: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { id: "item_1", price: 100 }
    },
  },
  {
    state: "An item with ID 1 and price 100",
    uponReceiving: "A request to add that item to the inventory",
    withRequest: {
      method: "POST",
      path: "/v1/inventory/user_1",
      body: { itemId: "item_1" }
    },
    willRespondWith: {
      status: 200
    },
  }
];
