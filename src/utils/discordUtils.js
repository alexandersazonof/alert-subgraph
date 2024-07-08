const dotenv = require('dotenv');

dotenv.config();

const USER_IDS = process.env.USER_IDS.split(',');

function createDeployMessage(data) {
  return {
    content: `<${USER_IDS.map(i => `@` + i)}>`,
    embeds: [
      {
        title: 'Deploy new version',
        description: data.commit,
        color: 0x00ff00,
        fields: [
          {
            name: 'Subgraph name',
            value: data.name,
            inline: true
          },
          {
            name: 'Version',
            value: data.version,
            inline: true
          }
        ],
        footer: {
          text: 'Last updated',
        },
        timestamp: new Date().toISOString()
      }
    ],
    username: 'Subgraph Notification Bot',
    avatar_url: 'https://styles.redditmedia.com/t5_k1apb/styles/communityIcon_iqzx4nm63czb1.png'
  };
}

function createVersionStatusMessage(array) {
  const fields = array.map(data => ({
    name: `Blockchain: ${data.blockchain}`,
    value: `Subgraph name: ${data.name}\nVersion: ${data.version}\nPercentage: ${data.percentage}%`,
    inline: false
  }));

  return {
    content: `<${USER_IDS.map(i => `@` + i)}>`,
    embeds: [
      {
        title: 'Subgraph version status',
        color: 0x00ff00,
        fields: fields,
        footer: {
          text: 'Last updated',
        },
        timestamp: new Date().toISOString()
      }
    ],
    username: 'Subgraph Notification Bot',
    avatar_url: 'https://styles.redditmedia.com/t5_k1apb/styles/communityIcon_iqzx4nm63czb1.png'
  };
}

module.exports = { createDeployMessage, createVersionStatusMessage };