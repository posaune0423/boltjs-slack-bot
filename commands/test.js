exports.autoReply = function (app) {
	app.message("", async ({ say }) => {
		let text = "";
		const rand = Math.random() * 100;
		if (rand < 5) {
			text =
				"(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)(ΦωΦ)";
		}
		if (rand >= 5 && rand < 20) {
			text = "にゃんにゃん";
		}
		if (rand >= 20 && rand < 40) {
			text = "そういう日もあるにゃ";
		}
		if (rand >= 40 && rand < 60) {
			text = "確かににゃあ...";
		}
		if (rand >= 60 && rand < 80) {
			text = "なるほどにゃ";
		}
		if (rand >= 80 && rand < 100) {
			text = "わんわん";
		}

		await say(text);
	});
};