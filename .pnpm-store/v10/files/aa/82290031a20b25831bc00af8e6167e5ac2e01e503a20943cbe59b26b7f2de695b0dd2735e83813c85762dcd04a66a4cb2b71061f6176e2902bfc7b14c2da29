import { parseComment } from "@es-joy/jsdoccomment";

//#region src/commands/hoist-regexp.ts
const hoistRegExp = {
	name: "hoist-regexp",
	match: /^\s*[/:@]\s*(?:hoist-|h)reg(?:exp?)?(?:\s+(\S+)\s*)?$/,
	action(ctx) {
		const regexNode = ctx.findNodeBelow((node) => node.type === "Literal" && "regex" in node);
		if (!regexNode) return ctx.reportError("No regular expression literal found");
		const topNodes = ctx.source.ast.body;
		const scope = ctx.source.getScope(regexNode);
		let parent = regexNode.parent;
		while (parent && !topNodes.includes(parent)) parent = parent.parent;
		if (!parent) return ctx.reportError("Failed to find top-level node");
		let name = ctx.matches[1];
		if (name) {
			if (scope.references.find((ref) => ref.identifier.name === name)) return ctx.reportError(`Variable '${name}' is already in scope`);
		} else {
			let baseName = regexNode.regex.pattern.replace(/\W/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/, "").toLowerCase();
			if (baseName.length > 0) baseName = baseName[0].toUpperCase() + baseName.slice(1);
			let i = 0;
			name = `re${baseName}`;
			while (scope.references.find((ref) => ref.identifier.name === name)) {
				i++;
				name = `${baseName}${i}`;
			}
		}
		ctx.report({
			node: regexNode,
			message: `Hoist regular expression to ${name}`,
			*fix(fixer) {
				yield fixer.insertTextBefore(parent, `const ${name} = ${ctx.source.getText(regexNode)}\n`);
				yield fixer.replaceText(regexNode, name);
			}
		});
	}
};

//#endregion
//#region src/commands/_utils.ts
function getNodesByIndexes(nodes, indexes) {
	return indexes.length ? indexes.map((n) => nodes[n]).filter(Boolean) : nodes;
}
/**
*
* @param value Accepts a string of numbers separated by spaces
* @param integer If true, only positive integers are returned
*/
function parseToNumberArray(value, integer = false) {
	return value?.split(" ").map(Number).filter((n) => !Number.isNaN(n) && integer ? Number.isInteger(n) && n > 0 : true) ?? [];
}
function unwrapType(node) {
	if (node.type === "TSAsExpression" || node.type === "TSSatisfiesExpression" || node.type === "TSNonNullExpression" || node.type === "TSInstantiationExpression" || node.type === "TSTypeAssertion") return node.expression;
	return node;
}

//#endregion
//#region src/commands/inline-arrow.ts
const inlineArrow = {
	name: "inline-arrow",
	match: /^\s*[/:@]\s*(inline-arrow|ia)$/,
	action(ctx) {
		const arrowFn = ctx.findNodeBelow("ArrowFunctionExpression");
		if (!arrowFn) return ctx.reportError("Unable to find arrow function to convert");
		const body = arrowFn.body;
		if (body.type !== "BlockStatement") return ctx.reportError("Arrow function body must have a block statement");
		const statements = body.body;
		if ((statements.length !== 1 || statements[0].type !== "ReturnStatement") && statements.length !== 0) return ctx.reportError("Arrow function body must have a single statement");
		const statement = statements[0];
		const isObject = (statement?.argument ? unwrapType(statement.argument) : null)?.type === "ObjectExpression";
		ctx.report({
			node: arrowFn,
			loc: body.loc,
			message: "Inline arrow function",
			fix(fixer) {
				let raw = statement && statement.argument ? ctx.getTextOf(statement.argument) : "undefined";
				if (isObject) raw = `(${raw})`;
				return fixer.replaceTextRange(body.range, raw);
			}
		});
	}
};

//#endregion
//#region src/commands/keep-aligned.ts
const reLine$2 = /^[/@:]\s*keep-aligned(?<repeat>\*?)(?<symbols>(\s+\S+)+)$/;
const keepAligned = {
	name: "keep-aligned",
	commentType: "line",
	match: (comment) => comment.value.trim().match(reLine$2),
	action(ctx) {
		const node = ctx.findNodeBelow(() => true);
		if (!node) return;
		const alignmentSymbols = ctx.matches.groups?.symbols?.trim().split(/\s+/);
		if (!alignmentSymbols) return ctx.reportError("No alignment symbols provided");
		const repeat = ctx.matches.groups?.repeat;
		const nLeadingSpaces = node.range[0] - ctx.comment.range[1] - 1;
		const text = ctx.context.sourceCode.getText(node, nLeadingSpaces);
		const lines = text.split("\n");
		const symbolIndices = [];
		const nSymbols = alignmentSymbols.length;
		if (nSymbols === 0) return ctx.reportError("No alignment symbols provided");
		const n = repeat ? Number.MAX_SAFE_INTEGER : nSymbols;
		let lastPos = 0;
		for (let i = 0; i < n && i < 20; i++) {
			const symbol = alignmentSymbols[i % nSymbols];
			const maxIndex = lines.reduce((maxIndex, line) => Math.max(line.indexOf(symbol, lastPos), maxIndex), -1);
			symbolIndices.push(maxIndex);
			if (maxIndex < 0) if (!repeat) return ctx.reportError(`Alignment symbol "${symbol}" not found`);
			else break;
			for (let j = 0; j < lines.length; j++) {
				const line = lines[j];
				const index = line.indexOf(symbol, lastPos);
				if (index < 0) continue;
				if (index !== maxIndex) {
					const padding = maxIndex - index;
					lines[j] = line.slice(0, index) + " ".repeat(padding) + line.slice(index);
				}
			}
			lastPos = maxIndex + symbol.length;
		}
		const modifiedText = lines.join("\n");
		if (text === modifiedText) return;
		ctx.report({
			node,
			message: "Keep aligned",
			removeComment: false,
			fix: (fixer) => fixer.replaceText(node, modifiedText.slice(nLeadingSpaces))
		});
	}
};

//#endregion
//#region src/commands/keep-sorted.ts
const reLine$1 = /^[/@:]\s*(?:keep-sorted|sorted)\s*(\{.*\})?$/;
const reBlock$1 = /(?:\b|\s)@keep-sorted\s*(\{.*\})?(?:\b|\s|$)/;
const keepSorted = {
	name: "keep-sorted",
	commentType: "both",
	match: (comment) => comment.value.trim().match(comment.type === "Line" ? reLine$1 : reBlock$1),
	action(ctx) {
		const optionsRaw = ctx.matches[1] || "{}";
		let options = null;
		try {
			options = JSON.parse(optionsRaw);
		} catch {
			return ctx.reportError(`Failed to parse options: ${optionsRaw}`);
		}
		let node = ctx.findNodeBelow("ObjectExpression", "ObjectPattern", "ArrayExpression", "TSInterfaceBody", "TSTypeLiteral", "TSSatisfiesExpression") || ctx.findNodeBelow("ExportNamedDeclaration", "TSInterfaceDeclaration", "VariableDeclaration");
		if (node?.type === "TSInterfaceDeclaration") node = node.body;
		if (node?.type === "VariableDeclaration") {
			const dec = node.declarations[0];
			if (!dec) node = void 0;
			else if (dec.id.type === "ObjectPattern") node = dec.id;
			else {
				node = Array.isArray(dec.init) ? dec.init[0] : dec.init;
				if (node && node.type !== "ObjectExpression" && node.type !== "ArrayExpression" && node.type !== "TSSatisfiesExpression") node = void 0;
			}
		}
		if (node?.type === "TSSatisfiesExpression") if (node.expression.type !== "ArrayExpression" && node.expression.type !== "ObjectExpression") node = void 0;
		else node = node.expression;
		if (!node) return ctx.reportError("Unable to find object/array/interface to sort");
		const objectKeys = [options?.key, ...options?.keys || []].filter((x) => x != null);
		if (objectKeys.length > 0 && node.type !== "ArrayExpression" && node.type !== "ObjectExpression") return ctx.reportError(`Only arrays and objects can be sorted by keys, but got ${node.type}`);
		if (node.type === "ObjectExpression") return sort(ctx, node, node.properties.filter(Boolean), (prop) => {
			if (objectKeys.length) {
				if (prop.type === "Property" && prop.value.type === "ObjectExpression") {
					const objectProp = prop.value;
					return objectKeys.map((key) => {
						for (const innerProp of objectProp.properties) if (innerProp.type === "Property" && getString(innerProp.key) === key) return getString(innerProp.value);
						return null;
					});
				}
			} else if (prop.type === "Property") return getString(prop.key);
			return null;
		});
		else if (node.type === "ObjectPattern") sort(ctx, node, node.properties, (prop) => {
			if (prop.type === "Property") return getString(prop.key);
			return null;
		});
		else if (node.type === "ArrayExpression") return sort(ctx, node, node.elements.filter(Boolean), (element) => {
			if (objectKeys.length) if (element.type === "ObjectExpression") return objectKeys.map((key) => {
				for (const prop of element.properties) if (prop.type === "Property" && getString(prop.key) === key) return getString(prop.value);
				return null;
			});
			else return null;
			return getString(element);
		});
		else if (node.type === "TSInterfaceBody") return sort(ctx, node, node.body, (prop) => {
			if (prop.type === "TSPropertySignature") return getString(prop.key);
			return null;
		}, false);
		else if (node.type === "TSTypeLiteral") return sort(ctx, node, node.members, (prop) => {
			if (prop.type === "TSPropertySignature") return getString(prop.key);
			return null;
		}, false);
		else if (node.type === "ExportNamedDeclaration") return sort(ctx, node, node.specifiers, (prop) => {
			if (prop.type === "ExportSpecifier") return getString(prop.exported);
			return null;
		});
		else return false;
	}
};
function sort(ctx, node, list, getName, insertComma = true) {
	const firstToken = ctx.context.sourceCode.getFirstToken(node);
	const lastToken = ctx.context.sourceCode.getLastToken(node);
	if (!firstToken || !lastToken) return ctx.reportError("Unable to find object/array/interface to sort");
	if (list.length < 2) return false;
	const reordered = list.slice();
	const ranges = /* @__PURE__ */ new Map();
	const names = /* @__PURE__ */ new Map();
	const rangeStart = Math.max(firstToken.range[1], ctx.context.sourceCode.getIndexFromLoc({
		line: list[0].loc.start.line,
		column: 0
	}));
	let rangeEnd = rangeStart;
	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		let name = getName(item);
		if (typeof name === "string") name = [name];
		names.set(item, name);
		let lastRange = item.range[1];
		const nextToken = ctx.context.sourceCode.getTokenAfter(item);
		if (nextToken?.type === "Punctuator" && nextToken.value === ",") lastRange = nextToken.range[1];
		const nextChar = ctx.context.sourceCode.getText()[lastRange];
		let text = ctx.getTextOf([rangeEnd, lastRange]);
		if (nextToken === lastToken && insertComma) text += ",";
		if (nextChar === "\n") {
			lastRange++;
			text += "\n";
		}
		ranges.set(item, [
			rangeEnd,
			lastRange,
			text
		]);
		rangeEnd = lastRange;
	}
	const segments = [];
	let segmentStart = -1;
	for (let i = 0; i < list.length; i++) if (names.get(list[i]) == null) {
		if (segmentStart > -1) segments.push([segmentStart, i]);
		segmentStart = -1;
	} else if (segmentStart === -1) segmentStart = i;
	if (segmentStart > -1 && segmentStart !== list.length - 1) segments.push([segmentStart, list.length]);
	for (const [start, end] of segments) reordered.splice(start, end - start, ...reordered.slice(start, end).sort((a, b) => {
		const nameA = names.get(a);
		const nameB = names.get(b);
		const length = Math.max(nameA.length, nameB.length);
		for (let i = 0; i < length; i++) {
			const a = nameA[i];
			const b = nameB[i];
			if (a == null || b == null || a === b) continue;
			return a.localeCompare(b, "en", { numeric: true });
		}
		return 0;
	}));
	if (!reordered.some((prop, i) => prop !== list[i])) return false;
	const newContent = reordered.map((i) => ranges.get(i)[2]).join("");
	ctx.report({
		node,
		message: "Keep sorted",
		removeComment: false,
		fix(fixer) {
			return fixer.replaceTextRange([rangeStart, rangeEnd], newContent);
		}
	});
}
function getString(node) {
	if (node.type === "Identifier") return node.name;
	if (node.type === "Literal") return String(node.raw);
	return null;
}

//#endregion
//#region src/commands/keep-unique.ts
const reLine = /^[/@:]\s*(?:keep-)?uni(?:que)?$/;
const reBlock = /(?:\b|\s)@keep-uni(?:que)?(?:\b|\s|$)/;
const keepUnique = {
	name: "keep-unique",
	commentType: "both",
	match: (comment) => comment.value.trim().match(comment.type === "Line" ? reLine : reBlock),
	action(ctx) {
		const node = ctx.findNodeBelow("ArrayExpression");
		if (!node) return ctx.reportError("Unable to find array to keep unique");
		const set = /* @__PURE__ */ new Set();
		const removalIndex = /* @__PURE__ */ new Set();
		node.elements.forEach((item, idx) => {
			if (!item) return;
			if (item.type !== "Literal") return;
			if (set.has(String(item.raw))) removalIndex.add(idx);
			else set.add(String(item.raw));
		});
		if (removalIndex.size === 0) return false;
		ctx.report({
			node,
			message: "Keep unique",
			removeComment: false,
			fix(fixer) {
				const removalRanges = Array.from(removalIndex).map((idx) => {
					const item = node.elements[idx];
					const nextItem = node.elements[idx + 1];
					if (nextItem) return [item.range[0], nextItem.range[0]];
					const nextToken = ctx.source.getTokenAfter(item);
					if (nextToken && nextToken.value === ",") return [item.range[0], nextToken.range[1]];
					return item.range;
				}).sort((a, b) => b[0] - a[0]);
				let text = ctx.getTextOf(node);
				for (const [start, end] of removalRanges) text = text.slice(0, start - node.range[0]) + text.slice(end - node.range[0]);
				return fixer.replaceText(node, text);
			}
		});
	}
};

//#endregion
//#region src/commands/no-shorthand.ts
const noShorthand = {
	name: "no-shorthand",
	match: /^\s*[/:@]\s*(no-shorthand|nsh)$/,
	action(ctx) {
		const nodes = ctx.findNodeBelow({
			filter: (node) => node.type === "Property" && node.shorthand,
			findAll: true
		});
		if (!nodes || nodes.length === 0) return ctx.reportError("Unable to find shorthand object property to convert");
		ctx.report({
			nodes,
			message: "Expand shorthand",
			*fix(fixer) {
				for (const node of nodes) yield fixer.insertTextAfter(node.key, `: ${ctx.getTextOf(node.key)}`);
			}
		});
	}
};

//#endregion
//#region src/commands/no-type.ts
const noType = {
	name: "no-type",
	match: /^\s*[/:@]\s*(no-type|nt)$/,
	action(ctx) {
		const nodes = ctx.findNodeBelow({
			filter: (node) => node.type.startsWith("TS"),
			findAll: true,
			shallow: true
		});
		if (!nodes || nodes.length === 0) return ctx.reportError("Unable to find type to remove");
		ctx.report({
			nodes,
			message: "Remove type",
			*fix(fixer) {
				for (const node of nodes.reverse()) if (node.type === "TSAsExpression" || node.type === "TSSatisfiesExpression" || node.type === "TSNonNullExpression" || node.type === "TSInstantiationExpression") yield fixer.removeRange([node.expression.range[1], node.range[1]]);
				else if (node.type === "TSTypeAssertion") yield fixer.removeRange([node.range[0], node.expression.range[0]]);
				else yield fixer.remove(node);
			}
		});
	}
};

//#endregion
//#region src/commands/no-x-above.ts
const types = ["await"];
const noXAbove = {
	name: "no-x-above",
	match: new RegExp(`^\\s*[/:@]\\s*no-(${types.join("|")})-(above|below)$`),
	action(ctx) {
		const type = ctx.matches[1];
		const direction = ctx.matches[2];
		const parent = ctx.findNodeBelow(() => true)?.parent;
		if (!parent) return ctx.reportError("No parent node found");
		if (parent.type !== "Program" && parent.type !== "BlockStatement") return ctx.reportError("Parent node is not a block");
		const children = parent.body;
		const targetNodes = direction === "above" ? children.filter((c) => c.range[1] <= ctx.comment.range[0]) : children.filter((c) => c.range[0] >= ctx.comment.range[1]);
		if (!targetNodes.length) return;
		switch (type) {
			case "await":
				for (const target of targetNodes) ctx.traverse(target, (path, { SKIP }) => {
					if (path.node.type === "FunctionDeclaration" || path.node.type === "FunctionExpression" || path.node.type === "ArrowFunctionExpression") return SKIP;
					if (path.node.type === "AwaitExpression") ctx.report({
						node: path.node,
						message: "Disallowed await expression"
					});
				});
				return;
			default: return ctx.reportError(`Unknown type: ${type}`);
		}
	}
};

//#endregion
//#region src/commands/regex101.ts
const reCodeBlock = /```(.*)\n([\s\S]*)\n```/;
const regex101 = {
	name: "regex101",
	match: /(\b|\s|^)(@regex101)(\s\S+)?(\b|\s|$)/,
	commentType: "both",
	action(ctx) {
		const literal = ctx.findNodeBelow((n) => {
			return n.type === "Literal" && "regex" in n;
		});
		if (!literal) return ctx.reportError("Unable to find a regexp literal to generate");
		const [_fullStr = "", spaceBefore = "", commandStr = "", existingUrl = "", _spaceAfter = ""] = ctx.matches;
		let example;
		if (ctx.comment.value.includes("```") && ctx.comment.value.includes("@example")) try {
			const code = (parseComment(ctx.comment, "").tags.find((t) => t.tag === "example")?.description)?.match(reCodeBlock)?.[2].trim();
			if (code) example = code;
		} catch {}
		const query = new URLSearchParams();
		query.set("regex", literal.regex.pattern);
		if (literal.regex.flags) query.set("flags", literal.regex.flags);
		query.set("flavor", "javascript");
		if (example) query.set("testString", example);
		const url = `https://regex101.com/?${query}`;
		if (existingUrl.trim() === url.trim()) return;
		const indexStart = ctx.comment.range[0] + ctx.matches.index + spaceBefore.length + 2;
		const indexEnd = indexStart + commandStr.length + existingUrl.length;
		ctx.report({
			loc: {
				start: ctx.source.getLocFromIndex(indexStart),
				end: ctx.source.getLocFromIndex(indexEnd)
			},
			removeComment: false,
			message: `Update the regex101 link`,
			fix(fixer) {
				return fixer.replaceTextRange([indexStart, indexEnd], `@regex101 ${url}`);
			}
		});
	}
};

//#endregion
//#region src/commands/reverse-if-else.ts
const reverseIfElse = {
	name: "reverse-if-else",
	match: /^\s*[/:@]\s*(reverse-if-else|rife|rif)$/,
	action(ctx) {
		const node = ctx.findNodeBelow("IfStatement");
		if (!node) return ctx.reportError("Cannot find if statement");
		const elseNode = node.alternate;
		if (elseNode?.type === "IfStatement") return ctx.reportError("Unable reverse when `else if` statement exist");
		const ifNode = node.consequent;
		ctx.report({
			loc: node.loc,
			message: "Reverse if-else",
			fix(fixer) {
				const lineIndent = ctx.getIndentOfLine(node.loc.start.line);
				const conditionText = ctx.getTextOf(node.test);
				const ifText = ctx.getTextOf(ifNode);
				const str = [`if (!(${conditionText})) ${elseNode ? ctx.getTextOf(elseNode) : "{\n}"}`, `else ${ifText}`].map((line, idx) => idx ? lineIndent + line : line).join("\n");
				return fixer.replaceText(node, str);
			}
		});
	}
};

//#endregion
//#region src/commands/to-arrow.ts
const toArrow = {
	name: "to-arrow",
	match: /^\s*[/:@]\s*(to-arrow|2a|ta)$/,
	action(ctx) {
		const fn = ctx.findNodeBelow("FunctionDeclaration", "FunctionExpression");
		if (!fn) return ctx.reportError("Unable to find function declaration to convert");
		const id = fn.id;
		const body = fn.body;
		let rangeStart = fn.range[0];
		const rangeEnd = fn.range[1];
		const parent = fn.parent;
		if (parent.type === "Property" && parent.kind !== "init") return ctx.reportError(`Cannot convert ${parent.kind}ter property to arrow function`);
		ctx.report({
			node: fn,
			loc: {
				start: fn.loc.start,
				end: body.loc.start
			},
			message: "Convert to arrow function",
			fix(fixer) {
				let textName = ctx.getTextOf(id);
				const textArgs = fn.params.length ? ctx.getTextOf([fn.params[0].range[0], fn.params[fn.params.length - 1].range[1]]) : "";
				const textBody = body.type === "BlockStatement" ? ctx.getTextOf(body) : `{\n  return ${ctx.getTextOf(body)}\n}`;
				const textGeneric = ctx.getTextOf(fn.typeParameters);
				const textTypeReturn = ctx.getTextOf(fn.returnType);
				let final = [
					fn.async ? "async" : "",
					`${textGeneric}(${textArgs})${textTypeReturn} =>`,
					textBody
				].filter(Boolean).join(" ");
				if (fn.type === "FunctionDeclaration" && textName) final = `const ${textName} = ${final}`;
				else if (parent.type === "Property") {
					rangeStart = parent.range[0];
					textName = ctx.getTextOf(parent.key);
					final = `${parent.computed ? `[${textName}]` : textName}: ${final}`;
				} else if (parent.type === "MethodDefinition") {
					rangeStart = parent.range[0];
					textName = ctx.getTextOf(parent.key);
					final = `${[
						parent.accessibility,
						parent.static && "static",
						parent.override && "override",
						parent.computed ? `[${textName}]` : textName,
						parent.optional && "?"
					].filter(Boolean).join(" ")} = ${final}`;
				}
				return fixer.replaceTextRange([rangeStart, rangeEnd], final);
			}
		});
	}
};

//#endregion
//#region src/commands/to-destructuring.ts
const toDestructuring = {
	name: "to-destructuring",
	match: /^\s*[/:@]\s*(?:to-|2)(?:destructuring|dest)$/i,
	action(ctx) {
		const node = ctx.findNodeBelow("VariableDeclaration", "AssignmentExpression");
		if (!node) return ctx.reportError("Unable to find object/array to convert");
		const isDeclaration = node.type === "VariableDeclaration";
		const rightExpression = isDeclaration ? node.declarations[0].init : node.right;
		const member = rightExpression?.type === "ChainExpression" ? rightExpression.expression : rightExpression;
		if (member?.type !== "MemberExpression") return ctx.reportError("Unable to convert to destructuring");
		const id = isDeclaration ? ctx.getTextOf(node.declarations[0].id) : ctx.getTextOf(node.left);
		const property = ctx.getTextOf(member.property);
		const isArray = !Number.isNaN(Number(property));
		const left = isArray ? `${",".repeat(Number(property))}${id}` : `${id === property ? id : `${property}: ${id}`}`;
		let right = `${ctx.getTextOf(member.object)}`;
		if (member.optional) right += ` ?? ${isArray ? "[]" : "{}"}`;
		let str = isArray ? `[${left}] = ${right}` : `{ ${left} } = ${right}`;
		str = isDeclaration ? `${node.kind} ${str}` : `;(${str})`;
		ctx.report({
			node,
			message: "Convert to destructuring",
			fix: (fixer) => fixer.replaceTextRange(node.range, str)
		});
	}
};

//#endregion
//#region src/commands/to-dynamic-import.ts
const toDynamicImport = {
	name: "to-dynamic-import",
	match: /^\s*[/:@]\s*(?:to-|2)?(?:dynamic|d)(?:-?import)?$/i,
	action(ctx) {
		const node = ctx.findNodeBelow("ImportDeclaration");
		if (!node) return ctx.reportError("Unable to find import statement to convert");
		let namespace;
		if (node.importKind === "type") return ctx.reportError("Unable to convert type import to dynamic import");
		const typeSpecifiers = [];
		const destructure = node.specifiers.map((specifier) => {
			if (specifier.type === "ImportSpecifier") {
				if (specifier.importKind === "type") {
					typeSpecifiers.push(specifier);
					return null;
				}
				if (specifier.imported.type === "Identifier" && specifier.local.name === specifier.imported.name) return ctx.getTextOf(specifier.imported);
				else return `${ctx.getTextOf(specifier.imported)}: ${ctx.getTextOf(specifier.local)}`;
			} else if (specifier.type === "ImportDefaultSpecifier") return `default: ${ctx.getTextOf(specifier.local)}`;
			else if (specifier.type === "ImportNamespaceSpecifier") {
				namespace = ctx.getTextOf(specifier.local);
				return null;
			}
			return null;
		}).filter(Boolean).join(", ");
		let str = namespace ? `const ${namespace} = await import(${ctx.getTextOf(node.source)})` : `const { ${destructure} } = await import(${ctx.getTextOf(node.source)})`;
		if (typeSpecifiers.length) str = `import { ${typeSpecifiers.map((s) => ctx.getTextOf(s)).join(", ")} } from ${ctx.getTextOf(node.source)}\n${str}`;
		ctx.report({
			node,
			message: "Convert to dynamic import",
			fix: (fixer) => fixer.replaceText(node, str)
		});
	}
};

//#endregion
//#region src/commands/to-for-each.ts
const FOR_TRAVERSE_IGNORE = [
	"FunctionDeclaration",
	"FunctionExpression",
	"ArrowFunctionExpression",
	"WhileStatement",
	"DoWhileStatement",
	"ForInStatement",
	"ForOfStatement",
	"ForStatement",
	"ArrowFunctionExpression"
];
const toForEach = {
	name: "to-for-each",
	match: /^\s*[/:@]\s*(?:to-|2)?for-?each$/i,
	action(ctx) {
		const node = ctx.findNodeBelow("ForInStatement", "ForOfStatement");
		if (!node) return ctx.reportError("Unable to find for statement to convert");
		const continueNodes = [];
		if (!ctx.traverse(node.body, (path, { STOP, SKIP }) => {
			if (FOR_TRAVERSE_IGNORE.includes(path.node.type)) return SKIP;
			if (path.node.type === "ContinueStatement") continueNodes.push(path.node);
			else if (path.node.type === "BreakStatement") {
				ctx.reportError("Unable to convert for statement with break statement", {
					node: path.node,
					message: "Break statement has no equivalent in forEach"
				});
				return STOP;
			} else if (path.node.type === "ReturnStatement") {
				ctx.reportError("Unable to convert for statement with return statement", {
					node: path.node,
					message: "Return statement has no equivalent in forEach"
				});
				return STOP;
			}
		})) return;
		let textBody = ctx.getTextOf(node.body);
		continueNodes.sort((a, b) => b.loc.start.line - a.loc.start.line).forEach((c) => {
			textBody = textBody.slice(0, c.range[0] - node.body.range[0]) + "return" + textBody.slice(c.range[1] - node.body.range[0]);
		});
		if (!textBody.trim().startsWith("{")) textBody = `{\n${textBody}\n}`;
		const localId = node.left.type === "VariableDeclaration" ? node.left.declarations[0].id : node.left;
		const textLocal = ctx.getTextOf(localId);
		let textIterator = ctx.getTextOf(node.right);
		if (![
			"Identifier",
			"MemberExpression",
			"CallExpression"
		].includes(node.right.type)) textIterator = `(${textIterator})`;
		let str = node.type === "ForOfStatement" ? `${textIterator}.forEach((${textLocal}) => ${textBody})` : `Object.keys(${textIterator}).forEach((${textLocal}) => ${textBody})`;
		if (str[0] === "(") str = `;${str}`;
		ctx.report({
			node,
			message: "Convert to forEach",
			fix(fixer) {
				return fixer.replaceText(node, str);
			}
		});
	}
};

//#endregion
//#region src/commands/to-for-of.ts
const toForOf = {
	name: "to-for-of",
	match: /^\s*[/:@]\s*(?:to-|2)?for-?of$/i,
	action(ctx) {
		const target = ctx.findNodeBelow((node) => {
			if (node.type === "CallExpression" && node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "forEach") return true;
			return false;
		});
		if (!target) return ctx.reportError("Unable to find .forEach() to convert");
		const iterator = target.callee.object;
		const fn = target.arguments[0];
		if (fn.type !== "ArrowFunctionExpression" && fn.type !== "FunctionExpression") return ctx.reportError("Unable to find .forEach() to convert");
		if (fn.params.length !== 1) return ctx.reportError("Unable to convert forEach", {
			node: fn.params[0],
			message: "Index argument in forEach is not yet supported for conversion"
		});
		const returnNodes = [];
		ctx.traverse(fn.body, (path, { SKIP }) => {
			if (FOR_TRAVERSE_IGNORE.includes(path.node.type)) return SKIP;
			if (path.node.type === "ReturnStatement") returnNodes.push(path.node);
		});
		let textBody = ctx.getTextOf(fn.body);
		returnNodes.sort((a, b) => b.loc.start.line - a.loc.start.line).forEach((c) => {
			textBody = textBody.slice(0, c.range[0] - fn.body.range[0]) + "continue" + textBody.slice(c.range[1] - fn.body.range[0]);
		});
		const local = fn.params[0];
		const str = `for (const ${ctx.getTextOf(local)} of ${ctx.getTextOf(iterator)}) ${textBody}`;
		ctx.report({
			node: target,
			message: "Convert to for-of loop",
			fix(fixer) {
				return fixer.replaceText(target, str);
			}
		});
	}
};

//#endregion
//#region src/commands/to-function.ts
const toFunction = {
	name: "to-function",
	match: /^\s*[/:@]\s*(to-(?:fn|function)|2f|tf)$/,
	action(ctx) {
		const arrowFn = ctx.findNodeBelow("ArrowFunctionExpression");
		if (!arrowFn) return ctx.reportError("Unable to find arrow function to convert");
		let start = arrowFn;
		let id;
		const body = arrowFn.body;
		if (arrowFn.parent.type === "VariableDeclarator" && arrowFn.parent.id.type === "Identifier") {
			id = arrowFn.parent.id;
			if (arrowFn.parent.parent.type === "VariableDeclaration" && arrowFn.parent.parent.kind === "const" && arrowFn.parent.parent.declarations.length === 1) start = arrowFn.parent.parent;
		} else if (arrowFn.parent.type === "Property" && arrowFn.parent.key.type === "Identifier") {
			id = arrowFn.parent.key;
			start = arrowFn.parent.key;
		}
		ctx.report({
			node: arrowFn,
			loc: {
				start: start.loc.start,
				end: body.loc.start
			},
			message: "Convert to function",
			fix(fixer) {
				const textName = ctx.getTextOf(id);
				const textArgs = arrowFn.params.length ? ctx.getTextOf([arrowFn.params[0].range[0], arrowFn.params[arrowFn.params.length - 1].range[1]]) : "";
				const textBody = body.type === "BlockStatement" ? ctx.getTextOf(body) : `{\n  return ${ctx.getTextOf(body)}\n}`;
				const textGeneric = ctx.getTextOf(arrowFn.typeParameters);
				const textTypeReturn = ctx.getTextOf(arrowFn.returnType);
				const textAsync = arrowFn.async ? "async" : "";
				const fnBody = [`${textGeneric}(${textArgs})${textTypeReturn}`, textBody].filter(Boolean).join(" ");
				let final = [
					textAsync,
					`function`,
					textName,
					fnBody
				].filter(Boolean).join(" ");
				if (arrowFn.parent.type === "Property") final = [
					textAsync,
					textName,
					fnBody
				].filter(Boolean).join(" ");
				return fixer.replaceTextRange([start.range[0], arrowFn.range[1]], final);
			}
		});
	}
};

//#endregion
//#region src/commands/to-one-line.ts
const toOneLine = {
	name: "to-one-line",
	match: /^[/@:]\s*(?:to-one-line|21l|tol)$/,
	action(ctx) {
		const node = ctx.findNodeBelow("VariableDeclaration", "AssignmentExpression", "CallExpression", "FunctionDeclaration", "FunctionExpression", "ReturnStatement");
		if (!node) return ctx.reportError("Unable to find node to convert");
		let target = null;
		if (node.type === "VariableDeclaration") {
			const decl = node.declarations[0];
			if (decl && decl.init && isAllowedType(decl.init.type)) target = decl.init;
		} else if (node.type === "AssignmentExpression") {
			if (node.right && isAllowedType(node.right.type)) target = node.right;
		} else if (node.type === "CallExpression") target = node.arguments.find((arg) => isAllowedType(arg.type)) || null;
		else if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") target = node.params.find((param) => isAllowedType(param.type)) || null;
		else if (node.type === "ReturnStatement") {
			if (node.argument && isAllowedType(node.argument.type)) target = node.argument;
		}
		if (!target) return ctx.reportError("Unable to find object/array literal or pattern to convert");
		let oneLine = ctx.getTextOf(target).replace(/\n/g, " ").replace(/\s{2,}/g, " ").trim();
		oneLine = oneLine.replace(/,\s*([}\]])/g, "$1");
		if (target.type === "ArrayExpression" || target.type === "ArrayPattern") oneLine = oneLine.replace(/\[\s+/g, "[").replace(/\s+\]/g, "]");
		else {
			oneLine = oneLine.replace(/([^ \t])([}\]])/g, "$1 $2");
			oneLine = oneLine.replace(/\](\})/g, "] $1");
		}
		oneLine = oneLine.replace(/\[\s+/g, "[").replace(/\s+\]/g, "]");
		ctx.report({
			node: target,
			message: "Convert object/array to one line",
			fix: (fixer) => fixer.replaceTextRange(target.range, oneLine)
		});
		function isAllowedType(type) {
			return type === "ObjectExpression" || type === "ArrayExpression" || type === "ObjectPattern" || type === "ArrayPattern";
		}
	}
};

//#endregion
//#region src/commands/to-promise-all.ts
const toPromiseAll = {
	name: "to-promise-all",
	match: /^[/@:]\s*(?:to-|2)(?:promise-all|pa)$/,
	action(ctx) {
		const parent = ctx.getParentBlock();
		const nodeStart = ctx.findNodeBelow(isTarget);
		let nodeEnd = nodeStart;
		if (!nodeStart) return ctx.reportError("Unable to find variable declaration");
		if (!parent.body.includes(nodeStart)) return ctx.reportError("Variable declaration is not in the same block");
		function isTarget(node) {
			if (node.type === "VariableDeclaration") return node.declarations.some((declarator) => declarator.init?.type === "AwaitExpression");
			else if (node.type === "ExpressionStatement") return node.expression.type === "AwaitExpression";
			return false;
		}
		function getDeclarators(node) {
			if (node.type === "VariableDeclaration") return node.declarations;
			if (node.expression.type === "AwaitExpression") return [node.expression];
			return [];
		}
		let declarationType = "const";
		const declarators = [];
		for (let i = parent.body.indexOf(nodeStart); i < parent.body.length; i++) {
			const node = parent.body[i];
			if (isTarget(node)) {
				declarators.push(...getDeclarators(node));
				nodeEnd = node;
				if (node.type === "VariableDeclaration" && node.kind !== "const") declarationType = "let";
			} else break;
		}
		function unwrapAwait(node) {
			if (node?.type === "AwaitExpression") return node.argument;
			return node;
		}
		ctx.report({
			loc: {
				start: nodeStart.loc.start,
				end: nodeEnd.loc.end
			},
			message: "Convert to `await Promise.all`",
			fix(fixer) {
				const lineIndent = ctx.getIndentOfLine(nodeStart.loc.start.line);
				const isTs = ctx.context.filename.match(/\.[mc]?tsx?$/);
				function getId(declarator) {
					if (declarator.type === "AwaitExpression") return "/* discarded */";
					return ctx.getTextOf(declarator.id);
				}
				function getInit(declarator) {
					if (declarator.type === "AwaitExpression") return ctx.getTextOf(declarator.argument);
					return ctx.getTextOf(unwrapAwait(declarator.init));
				}
				const str = [
					`${declarationType} [`,
					...declarators.map((declarator) => `${getId(declarator)},`),
					"] = await Promise.all([",
					...declarators.map((declarator) => `${getInit(declarator)},`),
					isTs ? "] as const)" : "])"
				].map((line, idx) => idx ? lineIndent + line : line).join("\n");
				return fixer.replaceTextRange([nodeStart.range[0], nodeEnd.range[1]], str);
			}
		});
	}
};

//#endregion
//#region src/commands/to-string-literal.ts
const toStringLiteral = {
	name: "to-string-literal",
	match: /^\s*[/:@]\s*(?:to-|2)?(?:string-literal|sl)\s*(\S.*)?$/,
	action(ctx) {
		const numbers = ctx.matches[1];
		const indexes = parseToNumberArray(numbers, true).map((n) => n - 1);
		const nodes = ctx.findNodeBelow({
			types: ["TemplateLiteral"],
			shallow: true,
			findAll: true
		});
		if (!nodes?.length) return ctx.reportError("No template literals found");
		ctx.report({
			nodes,
			message: "Convert to string literal",
			*fix(fixer) {
				for (const node of getNodesByIndexes(nodes, indexes)) {
					const ids = extractIdentifiers(node);
					let raw = JSON.stringify(ctx.source.getText(node).slice(1, -1)).slice(1, -1);
					if (ids.length) raw = toStringWithIds(raw, node, ids);
					else raw = `"${raw}"`;
					yield fixer.replaceTextRange(node.range, raw);
				}
			}
		});
	}
};
function extractIdentifiers(node) {
	const ids = [];
	for (const child of node.expressions) if (child.type === "Identifier") ids.push({
		name: child.name,
		range: child.range
	});
	return ids;
}
function toStringWithIds(raw, node, ids) {
	let hasStart = false;
	let hasEnd = false;
	ids.forEach(({ name, range }, index) => {
		let startStr = `" + `;
		let endStr = ` + "`;
		if (index === 0) {
			hasStart = range[0] - 3 === node.range[0];
			if (hasStart) startStr = "";
		}
		if (index === ids.length - 1) {
			hasEnd = range[1] + 2 === node.range[1];
			if (hasEnd) endStr = "";
		}
		raw = raw.replace(`\${${name}}`, `${startStr}${name}${endStr}`);
	});
	return `${hasStart ? "" : `"`}${raw}${hasEnd ? "" : `"`}`;
}

//#endregion
//#region src/commands/to-template-literal.ts
const toTemplateLiteral = {
	name: "to-template-literal",
	match: /^\s*[/:@]\s*(?:to-|2)?(?:template-literal|tl)\s*(\S.*)?$/,
	action(ctx) {
		const numbers = ctx.matches[1];
		const indexes = parseToNumberArray(numbers, true).map((n) => n - 1);
		let nodes;
		nodes = ctx.findNodeBelow({
			types: ["Literal", "BinaryExpression"],
			shallow: true,
			findAll: true
		})?.filter((node) => node.type === "Literal" ? typeof node.value === "string" : node.type === "BinaryExpression" ? node.operator === "+" : false);
		if (!nodes || !nodes.length) return ctx.reportError("No string literals or binary expressions found");
		nodes = getNodesByIndexes(nodes, indexes);
		ctx.report({
			nodes,
			message: "Convert to template literal",
			*fix(fixer) {
				for (const node of nodes.reverse()) if (node.type === "BinaryExpression") yield fixer.replaceText(node, `\`${traverseBinaryExpression(node)}\``);
				else yield fixer.replaceText(node, `\`${escape(node.value)}\``);
			}
		});
	}
};
function getExpressionValue(node) {
	if (node.type === "Identifier") return `\${${node.name}}`;
	if (node.type === "Literal" && typeof node.value === "string") return escape(node.value);
	return "";
}
function traverseBinaryExpression(node) {
	let deepestExpr = node;
	let str = "";
	while (deepestExpr.left.type === "BinaryExpression") deepestExpr = deepestExpr.left;
	let currentExpr = deepestExpr;
	while (currentExpr) {
		str += getExpressionValue(currentExpr.left) + getExpressionValue(currentExpr.right);
		if (currentExpr === node) break;
		currentExpr = currentExpr.parent;
	}
	return str;
}
function escape(raw) {
	return raw.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

//#endregion
//#region src/commands/to-ternary.ts
const toTernary = {
	name: "to-ternary",
	match: /^\s*[/:@]\s*(?:to-|2)(?:ternary|3)$/,
	action(ctx) {
		const node = ctx.findNodeBelow("IfStatement");
		if (!node) return ctx.reportError("Unable to find an `if` statement to convert");
		let result = "";
		let isAssignment = true;
		const normalizeStatement = (n) => {
			if (!n) return ctx.reportError("Unable to convert `if` statement without an `else` clause");
			if (n.type === "BlockStatement") if (n.body.length !== 1) return ctx.reportError("Unable to convert statement contains more than one expression");
			else return n.body[0];
			else return n;
		};
		const getAssignmentId = (n) => {
			if (n.type === "IfStatement") n = n.consequent;
			if (n.type !== "ExpressionStatement" || n.expression.type !== "AssignmentExpression" || n.expression.left.type !== "Identifier") return;
			return ctx.getTextOf(n.expression.left);
		};
		let ifNode = node;
		while (ifNode) {
			const consequent = normalizeStatement(ifNode.consequent);
			const alternate = normalizeStatement(ifNode.alternate);
			if (!consequent || !alternate) return;
			if (isAssignment) {
				const ifId = getAssignmentId(consequent);
				const elseId = getAssignmentId(alternate);
				if (!ifId || ifId !== elseId) isAssignment = false;
			}
			result += `${ctx.getTextOf(ifNode.test)} ? ${ctx.getTextOf(consequent)} : `;
			if (alternate.type !== "IfStatement") {
				result += ctx.getTextOf(alternate);
				break;
			} else ifNode = alternate;
		}
		if (isAssignment) {
			const id = getAssignmentId(normalizeStatement(node.consequent));
			result = `${id} = ${result.replaceAll(`${id} = `, "")}`;
		}
		ctx.report({
			node,
			message: "Convert to ternary",
			fix: (fix) => fix.replaceTextRange(node.range, result)
		});
	}
};

//#endregion
//#region src/commands/index.ts
const builtinCommands = [
	hoistRegExp,
	inlineArrow,
	keepAligned,
	keepSorted,
	keepUnique,
	noShorthand,
	noType,
	noXAbove,
	regex101,
	reverseIfElse,
	toArrow,
	toDestructuring,
	toDynamicImport,
	toForEach,
	toForOf,
	toFunction,
	toOneLine,
	toPromiseAll,
	toStringLiteral,
	toTemplateLiteral,
	toTernary
];

//#endregion
export { hoistRegExp as S, noShorthand as _, toPromiseAll as a, keepAligned as b, toForOf as c, toDestructuring as d, toArrow as f, noType as g, noXAbove as h, toStringLiteral as i, toForEach as l, regex101 as m, toTernary as n, toOneLine as o, reverseIfElse as p, toTemplateLiteral as r, toFunction as s, builtinCommands as t, toDynamicImport as u, keepUnique as v, inlineArrow as x, keepSorted as y };