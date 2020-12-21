const decorateMention = (text) => {
	return "<@" + text + ">";
};

const decorateQuote = (text) => {
	return "```" + text + "```";
};

export {
	decorateMention,
	decorateQuote
}