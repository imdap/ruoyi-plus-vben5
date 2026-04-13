//#region src/statistic/utils.ts
const timeUnits = [
	["Y", 1e3 * 60 * 60 * 24 * 365],
	["M", 1e3 * 60 * 60 * 24 * 30],
	["D", 1e3 * 60 * 60 * 24],
	["H", 1e3 * 60 * 60],
	["m", 1e3 * 60],
	["s", 1e3],
	["S", 1]
];
function formatTimeStr(duration, format) {
	let leftDuration = duration;
	const escapeRegex = /\[[^\]]*\]/g;
	const keepList = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1));
	const templateText = format.replace(escapeRegex, "[]");
	const replacedText = timeUnits.reduce((current, [name, unit]) => {
		if (current.includes(name)) {
			const value = Math.floor(leftDuration / unit);
			leftDuration -= value * unit;
			return current.replace(new RegExp(`${name}+`, "g"), (match) => {
				const len = match.length;
				return value.toString().padStart(len, "0");
			});
		}
		return current;
	}, templateText);
	let index = 0;
	return replacedText.replace(escapeRegex, () => {
		const match = keepList[index];
		index += 1;
		return match;
	});
}
function formatCounter(value, config, down) {
	const { format = "" } = config;
	const target = new Date(value).getTime();
	const current = Date.now();
	return formatTimeStr(down ? Math.max(target - current, 0) : Math.max(current - target, 0), format);
}

//#endregion
export { formatCounter, formatTimeStr };