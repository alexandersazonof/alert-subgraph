const { readJson }                = require('../fileUtils');
const { DATA_DEPLOY, BLOCKCHAIN, getBlockchainSubgraphName } = require('../constant');
const { fetchBlockNumber }        = require('../subgraph');
const { getCurrentBlock }         = require('../ethereum/getCurrentBlock');
const { createVersionStatusMessage } = require('../utils/discordUtils');
const { sendNotification }        = require('../discord');

async function checkVersion() {
  const json = readJson(DATA_DEPLOY);
  const array = [];
  for (const val in BLOCKCHAIN) {
    const key = getBlockchainSubgraphName(val);
    console.log(key)
    if (!json[key]) {
      console.error(`Version for ${key} not found!`);
      continue;
    }
    const version = json[key];
    const graphBlockVersion = await fetchBlockNumber(val, version);
    console.log(`graphBlockVersion = ${graphBlockVersion}`)
    const onChainBlockVersion = await getCurrentBlock(val);
    const decimalNumber = parseInt(onChainBlockVersion, 16);
    console.log(`onChainBlockVersion = ${decimalNumber}`);

    const diff = graphBlockVersion / (decimalNumber / 100);

    if (diff < 98) {
      console.log(`Version for ${key} is too old!`);
      array.push({
        blockchain: val,
        name: key,
        version: json[key],
        percentage: diff.toFixed(2)
      });
    }
  }

  if (array.length > 0) {
    await sendNotification(createVersionStatusMessage(array));
  }
}

module.exports = { checkVersion }