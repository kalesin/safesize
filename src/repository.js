'use strict';

const api = new SneaksAPI();

const getShoes = () => {
  return new Promise((resolve, reject) => {
    api.getProducts("", 100, function(error, products) {
      if (error) {
          reject(error);
      }

      resolve(products);
    });
  });
}
