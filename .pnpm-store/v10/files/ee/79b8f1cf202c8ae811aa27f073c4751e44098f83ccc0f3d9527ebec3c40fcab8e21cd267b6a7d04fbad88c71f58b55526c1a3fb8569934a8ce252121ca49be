/**
* SVG property types
*/
const propTypes = [
	"path",
	"px",
	"raw"
];
/**
* Props shared between multiple shapes
*/
const commonShapes = { px: [
	"width",
	"height",
	"x",
	"y",
	"cx",
	"cy",
	"r",
	"rx",
	"ry"
] };
/**
* Shape specific properties that can be converted to CSS
*/
const props = {
	"*": {
		px: ["stroke-width"],
		raw: [
			"fill",
			"stroke",
			"color",
			"opacity"
		]
	},
	"path": { path: ["d"] },
	"ellipse": commonShapes,
	"circle": commonShapes,
	"rect": commonShapes,
	"stop": { raw: ["stop-color", "stop-opacity"] }
};
const skipTags = [
	"animate",
	"animateMotion",
	"animateTransform",
	"set",
	"discard"
];
const legacyProps = ["d"];
/**
* Get property type
*/
function getSVGPropertyType(tag, prop, supportLegacyBrowsers = false) {
	if (skipTags.includes(tag)) return;
	if (supportLegacyBrowsers && legacyProps.includes(prop)) return;
	for (const type of propTypes) if (props[tag]?.[type]?.includes(prop) || props["*"]?.[type]?.includes(prop)) return type;
	if (prop.startsWith("stroke") || prop.startsWith("fill")) return "raw";
}
/**
* Convert property to CSS
*/
function convertSVGPropertyToCSS(tag, prop, value, supportLegacyBrowsers = false) {
	switch (getSVGPropertyType(tag, prop, supportLegacyBrowsers)) {
		case "path":
			if (typeof value !== "string") return;
			return [prop, `path("${value.replace(/\s+/g, " ")}")`];
		case "px":
			if (typeof value === "string" && !value.match(/^[0-9.-]+$/)) return [prop, value];
			return [prop, `${value}px`];
		case "raw":
			if (typeof value === "string" && value.startsWith("url(")) return;
			return [prop, `${value}`];
	}
}
export { convertSVGPropertyToCSS, getSVGPropertyType };
