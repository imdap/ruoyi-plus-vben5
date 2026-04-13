function getBeforeSelectionText(input) {
	const { selectionStart } = input;
	return input.value.slice(0, selectionStart);
}
function getLastMeasureIndex(text, prefix) {
	return prefix.reduce((lastMatch, prefixStr) => {
		const lastIndex = text.lastIndexOf(prefixStr);
		if (lastIndex > lastMatch.location) return {
			location: lastIndex,
			prefix: prefixStr
		};
		return lastMatch;
	}, {
		location: -1,
		prefix: ""
	});
}
function lower(char) {
	return (char || "").toLowerCase();
}
function reduceText(text, targetText, split) {
	const firstChar = text[0];
	if (!firstChar || firstChar === split) return text;
	let restText = text;
	const targetTextLen = targetText.length;
	for (let i = 0; i < targetTextLen; i += 1) if (lower(restText[i]) !== lower(targetText[i])) {
		restText = restText.slice(i);
		break;
	} else if (i === targetTextLen - 1) restText = restText.slice(targetTextLen);
	return restText;
}
function replaceWithMeasure(text, measureConfig) {
	const { measureLocation, prefix, targetText, selectionStart, split } = measureConfig;
	let beforeMeasureText = text.slice(0, measureLocation);
	if (beforeMeasureText[beforeMeasureText.length - split.length] === split) beforeMeasureText = beforeMeasureText.slice(0, beforeMeasureText.length - split.length);
	if (beforeMeasureText) beforeMeasureText = `${beforeMeasureText}${split}`;
	let restText = reduceText(text.slice(selectionStart), targetText.slice(selectionStart - measureLocation - prefix.length), split);
	if (restText.slice(0, split.length) === split) restText = restText.slice(split.length);
	const connectedStartText = `${beforeMeasureText}${prefix}${targetText}${split}`;
	return {
		text: `${connectedStartText}${restText}`,
		selectionLocation: connectedStartText.length
	};
}
function setInputSelection(input, location) {
	input.setSelectionRange(location, location);
	input.blur();
	input.focus();
}
function validateSearch(text, split) {
	if (text === void 0 && split === void 0) return validateSearch;
	return !split || !(text ?? "").includes(split);
}
function filterOption(input, option) {
	if (input === void 0 && option === void 0) return filterOption;
	const lowerCase = (typeof input === "string" ? input : String(input ?? "")).toLowerCase();
	return (option?.value ?? "").toLowerCase().includes(lowerCase);
}
export { filterOption, getBeforeSelectionText, getLastMeasureIndex, replaceWithMeasure, setInputSelection, validateSearch };
