const decorateMention = (text) => {
	return "<@" + text + ">";
};

const decorateCode = (text) => {
	return "```" + text + "```";
};

export { decorateMention, decorateCode };
