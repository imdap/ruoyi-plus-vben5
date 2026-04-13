import { getComponentSizeValues } from "./helpers/content/size.js";
import { stringifyFactoryIconContent } from "./helpers/content/stringify.js";
import { stringifyIconViewBox } from "../svg/viewbox/value.js";
import { createFactoryImports } from "./helpers/imports/create.js";
import { generateCSSFilesForComponent } from "./helpers/css/generate.js";
import { addSizeFunctionAsset } from "./helpers/functions/size.js";
import { stringifyFactoryPropsAsJSON } from "./helpers/props/object.js";
import { stringifyFactoryImports } from "./helpers/imports/stringify.js";
import { makeSquareViewBox } from "../svg/viewbox/square.js";
import { getUsedFactoryProps, stringifyFactoryPropTypes } from "./helpers/props/ts.js";
import { minifyViewBox } from "../svg/viewbox/minify.js";
import { getViewBoxRatio } from "./helpers/content/ratio.js";
import { addJSXComponentTypes } from "./helpers/ts/jsx.js";
import { addCustomFunctionAsset } from "./helpers/functions/custom.js";
import { addFallbackFunctionAsset } from "./helpers/functions/fallback.js";
import { addInnerHTMLFunctionAsset } from "./helpers/functions/innerhtml.js";
/**
* Create React component code
*/
function createJSXComponent(data, options) {
	const icon = data.icon;
	const viewBox = icon.viewBox;
	const defaultFallback = icon.defaultFallback;
	const statefulData = icon.statefulData;
	const useTS = options.ts ?? false;
	const assets = [];
	const imports = createFactoryImports();
	const dependencies = /* @__PURE__ */ new Set();
	let importPackage = "react";
	let createElement = "createElement";
	switch (options.jsx) {
		case "preact":
			importPackage = "preact";
			createElement = "h";
			break;
	}
	const fallbackPackage = options.fallbackPackage || null;
	const hasFallback = !!(fallbackPackage && defaultFallback);
	if (hasFallback) {
		imports.named[fallbackPackage] = new Set(["Icon"]);
		dependencies.add(fallbackPackage);
	}
	const reactNamedImports = new Set([createElement]);
	imports.named[importPackage] = reactNamedImports;
	const style = generateCSSFilesForComponent(icon, imports, assets, options);
	const isEmbeddedCSS = options.cssMode === "embed";
	let hasFixedSize = !!options.width && !!options.height;
	const hasComputedViewbox = options.square && !hasFixedSize && viewBox.width !== viewBox.height;
	const isStringViewBox = !hasFallback;
	const hasComputedRatio = hasComputedViewbox && isStringViewBox;
	if (!hasComputedViewbox && (options.width || options.height)) hasFixedSize = true;
	const componentExternalCode = [];
	const componentInternalCode = [];
	const props = {};
	if (!hasFallback) props.xmlns = "http://www.w3.org/2000/svg";
	props.props = {
		value: "props",
		template: "...props,"
	};
	let computedFallback = false;
	if (statefulData) {
		const { supportedStates, allStates, staticClassname } = statefulData;
		if (supportedStates.size || staticClassname) {
			const computedStates = [];
			const computedStateNames = [];
			let addedStateFunc = false;
			for (const state of allStates) if (typeof state === "string") {
				if (supportedStates.has(state)) {
					props[state] = {
						type: "boolean",
						value: state,
						template: ""
					};
					computedStates.push(`'${state}': ${state}`);
					computedStateNames.push(state);
				}
			} else {
				const stateName = state[0];
				if (supportedStates.has(stateName)) {
					const stateValues = state[1];
					const defaultStateValue = state[2] ?? stateValues[0];
					props[stateName] = {
						type: stateValues.map((value) => `'${value}'`).join(" | "),
						value: stateName,
						template: ""
					};
					computedStates.push(`'${stateName}': namedStateValue(${stateName}, '${defaultStateValue}')`);
					computedStateNames.push(stateName);
					if (!addedStateFunc) {
						addedStateFunc = true;
						addCustomFunctionAsset(imports, assets, options, {
							functionName: "namedStateValue",
							content: `export function namedStateValue(value, defaultValue) {
	return value && value !== defaultValue ? value : undefined;
}`
						});
					}
				}
			}
			if (staticClassname) {
				const state = "static";
				props[state] = {
					type: "boolean",
					value: state,
					template: ""
				};
				computedStates.push(`'${state}': ${state}`);
				computedStateNames.push(state);
			}
			if (computedStates.length) {
				componentInternalCode.push(`const states = useMemo(() => ({ ${computedStates.join(", ")} }), [${computedStateNames.join(", ")}]);`);
				if (hasFallback && statefulData.fallback) {
					computedFallback = true;
					const func = addFallbackFunctionAsset(imports, assets, options, statefulData.defaultStateValues);
					componentInternalCode.push(`const fallback = useMemo(() => ${func}(${JSON.stringify(statefulData.fallback)}, states), [states]);`);
				}
				componentInternalCode.push(`const className = useMemo(() => Object.entries(states).map(([key, value]) => value ? \`state-\${value === true ? key : value}\` : '').join(' ').trim() || undefined, [states]);`);
				props["className"] = {
					value: "className",
					template: `className,`
				};
			}
		}
	}
	const getViewBox = (viewBox) => isStringViewBox ? `'${stringifyIconViewBox(viewBox)}'` : JSON.stringify(minifyViewBox(viewBox));
	if (hasComputedViewbox) {
		componentExternalCode.push(`const baseViewBox = ${getViewBox(viewBox)};`, `const squareViewBox = ${getViewBox(makeSquareViewBox(viewBox))};`);
		componentInternalCode.push(`const viewBox = useMemo(() => square ? squareViewBox : baseViewBox, [square]);`);
	} else componentExternalCode.push(`const viewBox = ${getViewBox(viewBox)};`);
	const ratioValue = getViewBoxRatio(viewBox);
	if (hasComputedRatio) componentInternalCode.push(`const ratio = useMemo(() => square ? 1 : ${ratioValue}, [square]);`);
	if (hasFixedSize) {
		const sizeProps = getComponentSizeValues(options, viewBox);
		if (!sizeProps) throw new Error("Fixed size expected, but could not be determined");
		props.width = sizeProps.width;
		props.height = sizeProps.height;
	} else if (hasFallback) {
		props.width = {
			type: "string",
			value: "width",
			template: "width,"
		};
		props.height = {
			type: "string",
			value: "height",
			template: "height,"
		};
	} else {
		const getSizeProps = addSizeFunctionAsset(imports, assets, options);
		componentInternalCode.push(`const size = useMemo(() => ${getSizeProps}(width, height, ${hasComputedRatio ? "ratio" : ratioValue}), [width, height${hasComputedRatio ? ", ratio" : ""}]);`);
		props.width = {
			type: "string",
			value: "width",
			template: "...size,"
		};
		props.height = {
			type: "string",
			value: "height",
			template: ""
		};
	}
	if (componentInternalCode.some((line) => line.includes("useMemo"))) reactNamedImports.add("useMemo");
	if (options.square) props.square = { type: "boolean" };
	props.viewBox = {
		value: "viewBox",
		template: "viewBox,"
	};
	let contentTemplate;
	const contentValue = stringifyFactoryIconContent(data.icon, isEmbeddedCSS ? style : void 0);
	if (!hasFallback) {
		const funcName = addInnerHTMLFunctionAsset(imports, assets, options);
		componentExternalCode.push(`const content = {__html: ${funcName}(${contentValue})};`);
		contentTemplate = `dangerouslySetInnerHTML: content,`;
	}
	props.content = {
		value: contentValue,
		template: contentTemplate
	};
	if (hasFallback && defaultFallback) props.fallback = computedFallback ? {
		value: "fallback",
		template: "fallback,"
	} : defaultFallback;
	componentInternalCode.push(`return ${createElement}(${hasFallback ? "Icon" : "'svg'"}, {
\t\t${stringifyFactoryPropsAsJSON(props, "\n		")}
\t});`);
	const beforeFunction = componentExternalCode.length ? componentExternalCode.join("\n") + "\n\n" : "";
	const propTypes = stringifyFactoryPropTypes(props);
	const typesCode = useTS ? `interface Props {\n${propTypes}\n};\n\n` : propTypes ? `/** @type {{${propTypes.replace(/\s*\n\s*/g, " ").trim()}}} */\n` : "";
	const usedProps = getUsedFactoryProps(props);
	const componentFunction = `${typesCode}function Component(${usedProps.length ? `{${[...usedProps, "...props"].join(", ")}}` : "props"}${useTS ? `: Props` : ""}) {
\t${componentInternalCode.join("\n	")}
}
`;
	const content = `${stringifyFactoryImports(imports)}\n${beforeFunction}${componentFunction}\nexport default Component;\n`;
	const types = addJSXComponentTypes(data, options, assets, props);
	return {
		assets,
		content,
		style: isEmbeddedCSS ? void 0 : style,
		types,
		dependencies: dependencies.size ? dependencies : void 0
	};
}
export { createJSXComponent };
