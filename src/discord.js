const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const webhookURL = process.env.DISCORD_WEBHOOK_URL;


async function sendNotification(data) {
  try {
    const response = await axios.post(webhookURL, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      console.log('Notification sent successfully!');
    } else {
      console.error('Error sending notification:', response.statusText);
    }
  } catch (error) {
    console.error('Error making the request:', error);
  }
}

module.exports = { sendNotification };