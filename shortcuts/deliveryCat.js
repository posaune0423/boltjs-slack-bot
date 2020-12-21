const createUsersList = (members, shortcut) => {
	let result = [];
	Object.keys(members).forEach(function (key) {
		if (
			members[key]["is_bot"] == false &&
			shortcut["user"]["id"] != members[key]["id"]
		) {
			let user_name = members[key]["profile"]["display_name"]
				? members[key]["profile"]["display_name"]
				: members[key]["profile"]["real_name"];

			result.push({
				text: {
					type: "plain_text",
					text: user_name,
				},
				value: members[key]["id"],
			});
		}
	});

	return result;
};

const decorateMention = (text) => {
	return "<@" + text + ">";
};

const decorateQuote = (text) => {
	return "```" + text + "```";
};

export const showModal = (app) => {
	// Listen for a slash command invocation
	app.shortcut("delivery_cat", async ({ shortcut, ack, client }) => {
		// Acknowledge the command request
		await ack();

		const users = await client.users.list();
		const usersList = createUsersList(users["members"], shortcut);

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
							label: {
								type: "plain_text",
								text: "宛先を選ぶにゃ",
							},
							element: {
								type: "static_select",
								action_id: "recipient_input",
								options: usersList,
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

export const submiFormData = (app) => {
	// Handle a view_submission event
	app.view("delivery_modal", async ({ ack, body, view, client }) => {
		// Acknowledge the view_submission event
		await ack();

		const sender = body["user"]["id"];
		const recipient =
			view["state"]["values"]["recipient_block"]["recipient_input"][
				"selected_option"
			]["value"];

		const fromWho = decorateMention(sender);
		const toWho = decorateMention(recipient);
		let content = view["state"]["values"]["body_block"]["body_input"]["value"];
		let msg = toWho + "に" + "お手紙を届けたにゃ\n";

		content = fromWho + "からお手紙が届いてるにゃ\n" + decorateQuote(content);

		// Message the user
		try {
			await client.chat.postMessage({
				channel: recipient,
				text: content,
			});

			await client.chat.postMessage({
				channel: sender,
				text: msg,
			});
		} catch (error) {
			console.error(error);
		}
	});
};
