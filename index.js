const { App } = require('@slack/bolt');

const app = new App({
  token: "xoxb-6612383026307-6613327996995-JWCJ7fDCO1BIqFeYd63F0K0R",
  signingSecret: '4792af9566aa1f2024489a9219deaf25',
  socketMode: true,
  appToken: 'xapp-1-A06HYCX5AUV-6643291681616-3d2e1e70f6e7c4fe922059969781e572d690639d827c8f431afd3b3feae2a747'
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

