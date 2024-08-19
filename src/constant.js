const DATA_DEPLOY = 'data/deploy.json';

const BLOCKCHAIN = {
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  ARBITRUM: 'ARBITRUM',
  BASE: 'BASE',
  ZK_SYNC: 'ZK_SYNC',
};

const BLOCHAIN_RPC = {
  [BLOCKCHAIN.ETHEREUM]: 'https://eth.drpc.org',
  [BLOCKCHAIN.POLYGON]: 'https://polygon.drpc.org',
  [BLOCKCHAIN.ARBITRUM]: 'https://arbitrum.llamarpc.com',
  [BLOCKCHAIN.BASE]: 'https://base.drpc.org',
  [BLOCKCHAIN.ZK_SYNC]: 'https://mainnet.era.zksync.io',
}

const BLOCKCHAIN_SUBGRAPH = {
  [BLOCKCHAIN.ETHEREUM]: 'harvest-mainnet-test',
  [BLOCKCHAIN.POLYGON]: 'l2-polygon-test',
  [BLOCKCHAIN.ARBITRUM]: 'harvest-arbitrum',
  [BLOCKCHAIN.BASE]: 'harvest-base',
  [BLOCKCHAIN.ZK_SYNC]: 'harvest-zksync',
}

function getBlockchainRpcUrl(blockchain) {
  return BLOCHAIN_RPC[blockchain] || 'URL not found';
}

function getBlockchainSubgraphName(blockchain) {
  return BLOCKCHAIN_SUBGRAPH[blockchain] || 'Value not found';
}

function getBlockchainSubgraphUrl(blockchain, version) {
  return `https://api.studio.thegraph.com/query/48757/${BLOCKCHAIN_SUBGRAPH[blockchain]}/${version}` || 'URL not found';
}

module.exports = { DATA_DEPLOY, BLOCKCHAIN, getBlockchainRpcUrl, getBlockchainSubgraphUrl, getBlockchainSubgraphName };