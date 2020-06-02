'use strict';

const inventory = require('./inventory');

inventory.app.listen(5000, () => {
  console.log('Listening on port 5000');
});
