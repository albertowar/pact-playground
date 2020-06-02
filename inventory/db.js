'use strict';

let items = new Map();
let collection = new Map();

function getItem(itemId) {
  if (items.has(itemId)) {
    return items[itemId];
  }

  return undefined;
}

function addItem({ itemId, price }) {
  items[itemId] = { itemId: itemId, price: price };
}

function clearItems() {
  items = new Map();
}

function addItemToUser(userId, itemId) {
  if (!itemId.has(itemId)) {
    throw new Error("Item does not exist in the database");
  }

  if (collection.has(userId)) {
    collection.get(userId).push(itemId);
  } else {
    collection.set(itemId, [itemId]);
  }
}

function getUserItems(userId) {
  if (collection.has(userId)) {
    return collection.get(userId);
  }

  return undefined;
}

function clearUserItems() {
  collection = new Map();
}

module.exports = {
  getItem: getItem,
  addItem: addItem,
  clearItems: clearItems,
  addItemToUser: addItemToUser,
  getUserItems: getUserItems,
  clearUserItems: clearUserItems
};
