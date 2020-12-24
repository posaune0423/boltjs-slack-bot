import { decorateMention, decorateCode } from "../utils/decorate.js";
// import { timeout, currentHMS } from "../utils/timer.js";

const showModal = (app) => {
	// Listen for a shoertcut invocation
	app.shortcut("delivery_cat", async ({ shortcut, ack, client }) => {
		// Acknowledge the shortcut request
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
								type: "multi_users_select",
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
						{
							type: "input",
							block_id: "timer_block",
							optional: true,
							hint: {
								type: "plain_text",
								text: "通常の配達では猫が気まぐれな時間に手紙を配達します。",
							},
							label: {
								type: "plain_text",
								text: "急ぎのメッセージかにゃ？",
								emoji: true,
							},
							element: {
								type: "checkboxes",
								action_id: "timer_input",
								options: [
									{
										text: {
											type: "plain_text",
											text: "お急ぎ便",
											emoji: true,
										},
										value: "1",
									},
								],
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

		const sender = body["user"]["id"];
		const fromWho = decorateMention(sender);

		const recipients =
			view["state"]["values"]["recipient_block"]["recipient_input"][
				"selected_users"
			];
		let toWho = "";
		recipients.forEach((v) => {
			toWho += decorateMention(v) + ", ";
		});
		toWho = toWho.slice(0, -2);

		const content =
			view["state"]["values"]["body_block"]["body_input"]["value"];
		const letter =
			fromWho + "からお手紙が届いてるにゃ\n" + decorateCode(content);
		const msg = toWho + "にお手紙を届けたにゃ";
		const importance =
			view["state"]["values"]["timer_block"]["timer_input"]["selected_options"];

		let ms = Math.floor(Math.random() * 1000000); // 100s - 1000s
		if (importance) {
			ms = 0;
		}


		// Message to both the sender and the recepient
		try {
			const sendMessage = () => {
				recipients.forEach((v) => {
					client.chat.postMessage({
						channel: v,
						text: letter,
					});
				});

				client.chat.postMessage({
					channel: sender,
					text: msg,
				});
			};

			setTimeout(sendMessage, ms);
		} catch (error) {
			console.error(error);
		}
	});
};

export { showModal, submitFormData };
