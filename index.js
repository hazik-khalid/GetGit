const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command('/gitget', async ({ command, ack, say }) => {
  var userData; // global variable
  var uname;
  var link;

  await ack();

  const username = command.text;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      userData = await response.json();
      uname = userData.login;
      link = userData.html_url;

      // Move the say() inside the try block
      await say(`UserName:- ${uname}  ${link} `);
    } else {
      console.error('Failed to fetch user data. Status:', response.status);
    }
  } catch (error) {
    console.log(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(` Bot is running on port ${process.env.PORT || 3000}!`);
})();