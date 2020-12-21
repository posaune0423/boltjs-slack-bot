const timeout = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const currentHMS = (dt) => {
	var h = dt.getHours();
	var m = dt.getMinutes();
	var s = dt.getSeconds();
	return (h + ":" + m + ":" + s);
  }

export {
	currentHMS,
	timeout
};