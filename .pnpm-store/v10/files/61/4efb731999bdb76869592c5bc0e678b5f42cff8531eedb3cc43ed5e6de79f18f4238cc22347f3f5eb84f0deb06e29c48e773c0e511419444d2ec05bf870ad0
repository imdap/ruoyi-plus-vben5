//#region src/transformers/legacyLogicalProperties.ts
function splitValues(value) {
	if (typeof value === "number") return [[value], false];
	const rawStyle = String(value).trim();
	const importantCells = rawStyle.match(/(.*)(!important)/);
	const splitStyle = (importantCells ? importantCells[1] : rawStyle).trim().split(/\s+/);
	let temp = [];
	let brackets = 0;
	return [splitStyle.reduce((list, item) => {
		if (item.includes("(") || item.includes(")")) {
			const left = item.split("(").length - 1;
			const right = item.split(")").length - 1;
			brackets += left - right;
		}
		if (brackets >= 0) temp.push(item);
		if (brackets === 0) {
			list.push(temp.join(" "));
			temp = [];
		}
		return list;
	}, []), !!importantCells];
}
function noSplit(list) {
	list.notSplit = true;
	return list;
}
const keyMap = {
	inset: [
		"top",
		"right",
		"bottom",
		"left"
	],
	insetBlock: ["top", "bottom"],
	insetBlockStart: ["top"],
	insetBlockEnd: ["bottom"],
	insetInline: ["left", "right"],
	insetInlineStart: ["left"],
	insetInlineEnd: ["right"],
	marginBlock: ["marginTop", "marginBottom"],
	marginBlockStart: ["marginTop"],
	marginBlockEnd: ["marginBottom"],
	marginInline: ["marginLeft", "marginRight"],
	marginInlineStart: ["marginLeft"],
	marginInlineEnd: ["marginRight"],
	paddingBlock: ["paddingTop", "paddingBottom"],
	paddingBlockStart: ["paddingTop"],
	paddingBlockEnd: ["paddingBottom"],
	paddingInline: ["paddingLeft", "paddingRight"],
	paddingInlineStart: ["paddingLeft"],
	paddingInlineEnd: ["paddingRight"],
	borderBlock: noSplit(["borderTop", "borderBottom"]),
	borderBlockStart: noSplit(["borderTop"]),
	borderBlockEnd: noSplit(["borderBottom"]),
	borderInline: noSplit(["borderLeft", "borderRight"]),
	borderInlineStart: noSplit(["borderLeft"]),
	borderInlineEnd: noSplit(["borderRight"]),
	borderBlockWidth: ["borderTopWidth", "borderBottomWidth"],
	borderBlockStartWidth: ["borderTopWidth"],
	borderBlockEndWidth: ["borderBottomWidth"],
	borderInlineWidth: ["borderLeftWidth", "borderRightWidth"],
	borderInlineStartWidth: ["borderLeftWidth"],
	borderInlineEndWidth: ["borderRightWidth"],
	borderBlockStyle: ["borderTopStyle", "borderBottomStyle"],
	borderBlockStartStyle: ["borderTopStyle"],
	borderBlockEndStyle: ["borderBottomStyle"],
	borderInlineStyle: ["borderLeftStyle", "borderRightStyle"],
	borderInlineStartStyle: ["borderLeftStyle"],
	borderInlineEndStyle: ["borderRightStyle"],
	borderBlockColor: ["borderTopColor", "borderBottomColor"],
	borderBlockStartColor: ["borderTopColor"],
	borderBlockEndColor: ["borderBottomColor"],
	borderInlineColor: ["borderLeftColor", "borderRightColor"],
	borderInlineStartColor: ["borderLeftColor"],
	borderInlineEndColor: ["borderRightColor"],
	borderStartStartRadius: ["borderTopLeftRadius"],
	borderStartEndRadius: ["borderTopRightRadius"],
	borderEndStartRadius: ["borderBottomLeftRadius"],
	borderEndEndRadius: ["borderBottomRightRadius"]
};
function wrapImportantAndSkipCheck(value, important) {
	let parsedValue = value;
	if (important) parsedValue = `${parsedValue} !important`;
	return {
		_skip_check_: true,
		value: parsedValue
	};
}
/**
* Convert css logical properties to legacy properties.
* Such as: `margin-block-start` to `margin-top`.
* Transform list:
* - inset
* - margin
* - padding
* - border
*/
const transform = { visit: (cssObj) => {
	const clone = {};
	Object.keys(cssObj).forEach((key) => {
		const value = cssObj[key];
		const matchValue = keyMap[key];
		if (matchValue && (typeof value === "number" || typeof value === "string")) {
			const [values, important] = splitValues(value);
			if (matchValue.length && matchValue.notSplit) matchValue.forEach((matchKey) => {
				clone[matchKey] = wrapImportantAndSkipCheck(value, important);
			});
			else if (matchValue.length === 1) clone[matchValue[0]] = wrapImportantAndSkipCheck(values[0], important);
			else if (matchValue.length === 2) matchValue.forEach((matchKey, index) => {
				clone[matchKey] = wrapImportantAndSkipCheck(values[index] ?? values[0], important);
			});
			else if (matchValue.length === 4) matchValue.forEach((matchKey, index) => {
				clone[matchKey] = wrapImportantAndSkipCheck(values[index] ?? values[index - 2] ?? values[0], important);
			});
			else clone[key] = value;
		} else clone[key] = value;
	});
	return clone;
} };
var legacyLogicalProperties_default = transform;

//#endregion
export { legacyLogicalProperties_default as default };