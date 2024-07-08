const axios = require('axios');
const { getBlockchainSubgraphUrl } = require('./constant');

const query = {
  query: `
      {
        _meta {
          block {
            number
          }
        }
      }
    `,
};

async function fetchBlockNumber(blockchain, version) {
  try {
    const url = getBlockchainSubgraphUrl(blockchain, version);
    console.log(`Fetching block number for ${blockchain} from ${url}`)
    const response = await axios.post(url, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
    }

    return response.data.data['_meta'].block.number;
  } catch (error) {
    console.error('Error making the request:', error);
  }
}

module.exports = { fetchBlockNumber };