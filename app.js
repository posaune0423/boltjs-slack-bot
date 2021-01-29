"use strict";

import { App } from "@slack/bolt";
import { autoReply } from "./commands/test";


const expressReceiver = new ExpressReceiver({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	endpoints: "/events",
	processBeforeResponse: true,
});
// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	receiver: expressReceiver,
	processBeforeResponse: true,
});
const expressApp = expressReceiver.app;

// Commands
autoReply(app);


// ------------------------------------------------------

function isOnGoogleCloud() {
	// https://cloud.google.com/functions/docs/env-var#nodejs_10_and_subsequent_runtimes
	return process.env.K_SERVICE && process.env.K_REVISION;
}

if (!isOnGoogleCloud()) {
	// Running on your local machine
	(async () => {
		// Start your app
		console.log("⚡️ Slack app is running!");

		await app.start(process.env.PORT);
	})();
}

exports.slack = function (req, res) {
	console.log(`Got a request: ${JSON.stringify(req.headers)}`);
	if (req.rawBody) {
		console.log(`Got raw request: ${req.rawBody}`);
	}
	expressApp(req, res);
};
