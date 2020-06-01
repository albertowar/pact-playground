'use strict';

const items = new Map();
items['item_1'] = { id: 'item_1', price: 100 };
items['item_2'] = { id: 'item_2', price: 200 };
items['item_3'] = { id: 'item_3', price: 300 };

const collection = new Map();
collection['user'] = ['item_1'];

module.exports.items = items;
module.exports.collection = collection;
