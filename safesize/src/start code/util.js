const fs = new require('fs');

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min + 1;

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const writeJson = (filePath, jsonContent) => {
  fs.writeFileSync(filePath, 
    JSON.stringify(jsonContent, null, 2)
  )
};

module.exports = {
  generateRandomNumber,
  onlyUnique,
  writeJson,
}
