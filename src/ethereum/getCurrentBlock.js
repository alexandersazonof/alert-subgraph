const { getBlockchainRpcUrl } = require('../constant');
const axios = require('axios');

async function getCurrentBlock(blockchain) {
  const delay = 100;

  function delayRequest(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  try {
    const url = getBlockchainRpcUrl(blockchain);

    await delayRequest(delay);

    const response = await axios.post(url, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Error making the request:', error);
  }
}

module.exports = { getCurrentBlock }