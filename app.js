const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey there <@${message.user}>!`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
});

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});


// Listens to incoming messages that contain "goodbye"
app.message('goodbye', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`See ya later, <@${message.user}> :wave:`);
});


app.event('app_mention', async ({ event, say }) => {
    await say(`Thank you for mentioning about me !!`);
    await console.log(event);
});


app.event('message.im', async ({ event, say }) => {
    try {
        const result = await say(`Thank you for your DM !!`);
        await console.log(event);
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
});



(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
