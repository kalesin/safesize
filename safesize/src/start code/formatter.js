'use strict';

const { generateRandomNumber, onlyUnique } = require("./util");

const generateRandomSizes = () => {
  const limit = generateRandomNumber(5, 20)
  return Array(limit)
    .fill()
    .map(() => generateRandomNumber(25, 50))
    .filter(onlyUnique)
    .sort()
};

const formatShoes = (shoes) => {
  return shoes.map(shoe => {
    return {
      id: shoe._id,
      brand: shoe.brand,
      description: shoe.description,
      model: shoe.shoeName,
      thumbnail: shoe.thumbnail,
      price: shoe.retailPrice,
      price_unit: 'EUR',
      sizes: generateRandomSizes(),
      size_unit: 'EU'
    }
  })
}

module.exports = {
  formatShoes,
}
