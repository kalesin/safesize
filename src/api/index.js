'use strict';

const repository = require('./repository');
const formatter = require('./formatter');
const { writeJson } = require('./util');
require('colors');

const OUTPUT_FILE = 'shoes.json';

(async () => {
  console.log("Fetching shoes...".yellow)
  console.time("Fetched shoes".green)
  const shoes = await repository.getShoes()
  console.log('shoes', shoes)
  console.timeLog("Fetched shoes".green, [
    shoes.length
  ])

  console.log("Formatting shoes...".yellow)
  console.time("Formatted shoes".green)
  const formattedShoes = formatter.formatShoes(shoes)
  console.log('formattedShoes', formattedShoes)
  console.timeLog("Formatted shoes".green, [
    formattedShoes.length
  ])

  console.log(`Writing to file ${OUTPUT_FILE}...`.yellow)
  console.time("Written to file".green)
  writeJson(OUTPUT_FILE, formattedShoes)
  console.timeEnd("Written to file".green)
})()
