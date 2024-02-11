const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: 'xoxb-6612383026307-6613327996995-xF1pahXQQd1vxCnCsfMBsW7b',
  signingSecret: '4792af9566aa1f2024489a9219deaf25',
  socketMode: true,
  appToken: "xapp-1-A06HYCX5AUV-6607062783206-2d858b83952cd38ab8cbc273cd0d01d37ad826f4c5a7de615e0855c959019322",
});

app.command('/gitget', async ({ command, ack, say }) => {
  var userData;
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
  console.log(`The app is running on port ${process.env.PORT || 3000}!`);
})();

