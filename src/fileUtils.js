const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading deploy file:', error);
    return null;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data, null, 2), 'utf8');
    console.log('Data successfully saved to', filePath);
  } catch (error) {
    console.error('Error writing deploy file:', error);
  }
}

module.exports = { readJson, writeJson };