import { App } from "@slack/bolt";
import { showModal, submitFormData } from "./shortcuts/deliverycat.js";

// Initializes your app with your bot token and signing secret
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Shortcuts
showModal(app);
submitFormData(app);

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log("⚡️ Bolt app is running!");
})();
