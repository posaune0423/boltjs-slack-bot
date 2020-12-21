import { decorateMention, decorateQuote } from "../utils/decorate.js";
import { timeout, currentHMS } from "../utils/timer.js";

const showModal = (app) => {
	// Listen for a slash command invocation
	app.shortcut("delivery_cat", async ({ shortcut, ack, client }) => {
		// Acknowledge the command request
		await ack();

		try {
			// Call views.open with the built-in client
			await client.views.open({
				// Pass a valid trigger_id within 3 seconds of receiving it
				trigger_id: shortcut.trigger_id,
				// View payload
				view: {
					type: "modal",
					// View identifier
					callback_id: "delivery_modal",
					title: {
						type: "plain_text",
						text: "手紙を送るにゃ",
					},
					blocks: [
						{
							type: "input",
							block_id: "recipient_block",
							element: {
								type: "users_select",
								placeholder: {
									type: "plain_text",
									text: "Select users",
									emoji: true,
								},
								action_id: "recipient_input",
							},
							label: {
								type: "plain_text",
								text: "宛先を選ぶにゃ",
								emoji: true,
							},
						},
						{
							type: "input",
							block_id: "timer_block",
							label: {
								type: "plain_text",
								text: "急ぎのメッセージかにゃ？",
							},
							element: {
								type: "static_select",
								action_id: "timer_input",
								options: [
									{
										text: {
											type: "plain_text",
											text: "そこまで",
											emoji: true,
										},
										value: "0",
									},
									{
										text: {
											type: "plain_text",
											text: "なるはやで",
											emoji: true,
										},
										value: "1",
									},
									{
										text: {
											type: "plain_text",
											text: "今すぐ",
											emoji: true,
										},
										value: "2",
									},
								],
							},
						},
						{
							type: "input",
							block_id: "body_block",
							label: {
								type: "plain_text",
								text: "何を伝えるにゃ？",
							},
							element: {
								type: "plain_text_input",
								action_id: "body_input",
								multiline: true,
							},
						},
					],
					submit: {
						type: "plain_text",
						text: "Submit",
					},
				},
			});
		} catch (error) {
			console.error(error);
		}
	});
};

const submitFormData = (app) => {
	// Handle a view_submission event
	app.view("delivery_modal", async ({ ack, body, view, client }) => {
		// Acknowledge the view_submission event
		await ack();

		// console.log(view["state"]["values"]);

		const sender = body["user"]["id"];
		const recipient =
			view["state"]["values"]["recipient_block"]["recipient_input"][
				"selected_user"
			];
		const fromWho = decorateMention(sender);
		const toWho = decorateMention(recipient);
		const importance =
			view["state"]["values"]["timer_block"]["timer_input"]["selected_option"][
				"value"
			];

		let ms = 0;
		if (importance == "0") {
			ms = 20000; // 20秒
		} else if (importance == "1") {
			ms = 10000; // 10秒
		}

		console.log(ms);
		console.log(currentHMS(new Date()));

		const content =
			view["state"]["values"]["body_block"]["body_input"]["value"];
		const letter =
			fromWho + "からお手紙が届いてるにゃ\n" + decorateQuote(content);
		const msg = toWho + "にお手紙を届けたにゃ";

		// Message to both the sender and the recepient
		try {
			const sendMessage = () => {
				client.chat.postMessage({
					channel: recipient,
					text: letter,
				});
				client.chat.postMessage({
					channel: sender,
					text: msg,
				});

				console.log("here");
				console.log(currentHMS(new Date()));
			};

			setTimeout(sendMessage, ms);
		} catch (error) {
			console.error(error);
		}
	});
};

export { showModal, submitFormData };
