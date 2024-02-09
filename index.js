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
    var name;
    var avatar;
    var repos;
    var link;
    var email;
    await ack();
  
    const username = command.text;
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        userData = await response.json();
        uname = userData.login;
        name = userData.name;
        avatar = userData.avatar_url;
        repos = userData.repos_url;
        link = userData.html_url;
        email = userData.email;
  
        // Move the say() inside the try block
        await say(`username:-"${uname}" name:-${name}, profile-link:-${link} email:- ${email}`);
      } else {
        console.error('Failed to fetch user data. Status:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  });

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log(`⚡️ Bot app is running on port ${process.env.PORT || 3000}!`);
})();