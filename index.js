const { App } = require('@slack/bolt');

const app = new App({
  token: //,
  signingSecret: 
  socketMode: true,
  appToken: //
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

