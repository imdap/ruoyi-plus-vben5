import { stringifyStylesheet } from "../css/stylesheet.js";
import { getComponentSizeValues } from "./helpers/content/size.js";
import { stringifyFactoryIconContent } from "./helpers/content/stringify.js";
import { stringifyIconViewBox } from "../svg/viewbox/value.js";
import { createFactoryImports } from "./helpers/imports/create.js";
import { generateCSSFilesForComponent } from "./helpers/css/generate.js";
import { addSizeFunctionAsset } from "./helpers/functions/size.js";
import { stringifyFactoryProps } from "./helpers/props/stringify.js";
import { stringifyFactoryImports } from "./helpers/imports/stringify.js";
import { makeSquareViewBox } from "../svg/viewbox/square.js";
import { getUsedFactoryProps, stringifyFactoryPropTypes } from "./helpers/props/ts.js";
import { minifyViewBox } from "../svg/viewbox/minify.js";
import { getViewBoxRatio } from "./helpers/content/ratio.js";
import { addCustomFunctionAsset } from "./helpers/functions/custom.js";
import { addFallbackFunctionAsset } from "./helpers/functions/fallback.js";
import { addSvelteComponentTypes } from "./helpers/ts/svelte.js";
/**
* Create Svelte component code
*/
function createSvelteComponent(data, options) {
	const icon = data.icon;
	const viewBox = icon.viewBox;
	const fallback = icon.defaultFallback;
	const statefulData = icon.statefulData;
	const useTS = options.ts ?? false;
	const assets = [];
	const imports = createFactoryImports();
	const dependencies = /* @__PURE__ */ new Set();
	if (fallback) {
		imports.default["@iconify/css-svelte"] = "Icon";
		dependencies.add("@iconify/css-svelte");
	}
	const styleContent = generateCSSFilesForComponent(icon, imports, assets, {
		...options,
		componentType: "svelte"
	});
	let hasFixedSize = !!options.width && !!options.height;
	const hasComputedViewbox = options.square && !hasFixedSize && viewBox.width !== viewBox.height;
	const isStringViewBox = !fallback;
	const hasComputedRatio = hasComputedViewbox && isStringViewBox;
	if (!hasComputedViewbox && (options.width || options.height)) hasFixedSize = true;
	const componentCode = [];
	const props = {};
	if (!fallback) props.xmlns = "http://www.w3.org/2000/svg";
	let computedFallback = false;
	if (statefulData) {
		const { supportedStates, allStates, staticClassname } = statefulData;
		if (supportedStates.size || staticClassname) {
			const computedStates = [];
			let addedStateFunc = false;
			for (const state of allStates) if (typeof state === "string") {
				if (supportedStates.has(state)) {
					props[state] = {
						type: "boolean",
						value: state,
						template: ""
					};
					computedStates.push(`'${state}': ${state}`);
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
			}
			if (computedStates.length) {
				componentCode.push(`let states = $derived(({ ${computedStates.join(", ")} }));`);
				if (fallback && statefulData.fallback) {
					computedFallback = true;
					const func = addFallbackFunctionAsset(imports, assets, options, statefulData.defaultStateValues);
					componentCode.push(`let fallback = $derived(${func}(${JSON.stringify(statefulData.fallback)},states));`);
				}
				componentCode.push(`let className = $derived(Object.entries(states).map(([key, value]) => value ? \`state-\${value === true ? key : value}\` : '').join(' ').trim() || undefined);`);
				props.class = {
					value: "className",
					template: "class={className}"
				};
			}
		}
	}
	const viewBoxPropValue = `viewBox${hasComputedViewbox ? "Computed" : ""}`;
	const getViewBox = (viewBox) => isStringViewBox ? `'${stringifyIconViewBox(viewBox)}'` : JSON.stringify(minifyViewBox(viewBox));
	if (hasComputedViewbox) componentCode.push(`const baseViewBox = ${getViewBox(viewBox)};`, `const squareViewBox = ${getViewBox(makeSquareViewBox(viewBox))};`, `let ${viewBoxPropValue} = $derived(square ? squareViewBox : baseViewBox);`);
	else componentCode.push(`const ${viewBoxPropValue} = ${getViewBox(viewBox)};`);
	const ratioValue = getViewBoxRatio(viewBox);
	if (hasComputedRatio) componentCode.push(`let ratio = $derived(square ? 1 : ${ratioValue});`);
	if (hasFixedSize) {
		const sizeProps = getComponentSizeValues(options, viewBox);
		if (!sizeProps) throw new Error("Fixed size expected, but could not be determined");
		props.width = sizeProps.width;
		props.height = sizeProps.height;
	} else if (fallback) {
		props.width = {
			type: "string",
			value: "width",
			template: "width={width}"
		};
		props.height = {
			type: "string",
			value: "height",
			template: "height={height}"
		};
	} else {
		const getSizeProps = addSizeFunctionAsset(imports, assets, options);
		componentCode.push(`let size = $derived(${getSizeProps}(width, height, ${hasComputedRatio ? "ratio" : ratioValue}));`);
		props.width = {
			type: "string",
			value: "width",
			template: "{...size}"
		};
		props.height = {
			type: "string",
			value: "height",
			template: ""
		};
	}
	if (options.square) props.square = { type: "boolean" };
	props.viewBox = {
		value: "viewBox",
		template: `viewBox={${viewBoxPropValue}}`
	};
	componentCode.push(`const content = ${stringifyFactoryIconContent(icon)};`);
	const innerHTML = fallback ? "" : "{@html content}";
	props.content = {
		value: "content",
		template: fallback ? `content={content} fallback=${computedFallback ? "{fallback}" : `"${fallback}"`}` : ""
	};
	const usedProps = getUsedFactoryProps(props);
	const propsDestricturing = usedProps.length ? `{${[...usedProps, "...props"].join(", ")}}` : "props";
	componentCode.unshift(`let ${propsDestricturing}${useTS ? ": Props" : ""} = $props();\n`);
	const propTypes = stringifyFactoryPropTypes(props);
	if (useTS) componentCode.unshift(`interface Props {\n${propTypes}\n};\n`);
	else if (propTypes.trim()) componentCode.unshift(`/** @type {{${propTypes.replace(/\s*\n\s*/g, " ").trim()}}} */`);
	const tag = fallback ? "Icon" : "svg";
	const template = `<${tag} ${stringifyFactoryProps(props, "{prop}={{value}}")} {...props}>${innerHTML}</${tag}>`;
	let content = `<script${useTS ? " lang=\"ts\"" : ""}>
${stringifyFactoryImports(imports)}
${componentCode.join("\n")}
<\/script>
${template}
`;
	const style = options.cssMode === "prop" ? styleContent : void 0;
	if (styleContent && !style) content += `<style>\n${stringifyStylesheet(styleContent)}\n</style>\n`;
	const types = addSvelteComponentTypes(data, options, assets, props);
	return {
		assets,
		content,
		style,
		types,
		dependencies: dependencies.size ? dependencies : void 0
	};
}
export { createSvelteComponent };
