const { sendNotification } = require('./discord');
const express = require('express');
const dotenv = require('dotenv');
const { createDeployMessage } = require('./utils/discordUtils');
const { BLOCKCHAIN, DATA_DEPLOY } = require('./constant');
const { readJson, writeJson } = require('./fileUtils');
const cron = require('node-cron');
const { checkVersion } = require('./task/checkVersion');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.post('/deploy', async (req, res) => {
  const { name, version, commit } = req.body;

  if (!name && !version) {
    return res.status(400).send('Content or embeds are required');
  }


  const data = createDeployMessage({ name, version, commit })

  // update version
  const json = readJson(DATA_DEPLOY);
  json[name] = version;
  writeJson(DATA_DEPLOY, json);

  try {
    await sendNotification(data);
    res.status(200).send('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

cron.schedule('0 */12 * * *', async () => {
  console.log('Running scheduled task...');
  await checkVersion();
});

checkVersion();