import * as jsoncParser from "jsonc-eslint-parser";
import * as yamlParser from "yaml-eslint-parser";
import fs, { existsSync, readFileSync } from "node:fs";
import { up } from "empathic/find";
import { basename, dirname, join, normalize, resolve } from "pathe";
import { parsePnpmWorkspaceYaml } from "pnpm-workspace-yaml";
import yaml from "yaml";
import { globSync } from "tinyglobby";

//#region package.json
var name = "eslint-plugin-pnpm";
var version = "1.6.0";

//#endregion
//#region src/utils/create.ts
const blobUrl = "https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/";
/**
* Creates reusable function to create rules with default options and docs URLs.
*
* @param urlCreator Creates a documentation URL for a given rule name.
* @returns Function to create a rule with the docs URL format.
*/
function RuleCreator(urlCreator) {
	return function createNamedRule({ name: name$1, meta, ...rule }) {
		return createRule({
			name: name$1,
			meta: {
				...meta,
				docs: {
					...meta.docs,
					url: urlCreator(name$1)
				}
			},
			...rule
		});
	};
}
/**
* Creates a well-typed TSESLint custom ESLint rule without a docs URL.
*
* @returns Well-typed TSESLint custom ESLint rule.
* @remarks It is generally better to provide a docs URL function to RuleCreator.
*/
function createRule({ name: name$1, create, defaultOptions, meta }) {
	return {
		name: name$1,
		create: ((context) => {
			return create(context, context.options.map((options, index) => {
				return {
					...defaultOptions?.[index] || {},
					...options || {}
				};
			}));
		}),
		defaultOptions,
		meta
	};
}
const createEslintRule = RuleCreator((ruleName) => `${blobUrl}${ruleName.startsWith("json-") ? `json/${ruleName}` : `yaml/${ruleName}`}.test.ts`);

//#endregion
//#region src/utils/iterate.ts
function getPackageJsonRootNode(context) {
	if (!context.filename.endsWith("package.json")) return;
	const root = context.sourceCode.ast.body[0];
	if (root.expression.type === "JSONObjectExpression") return root.expression;
}
function* iterateDependencies(context, fields) {
	const root = getPackageJsonRootNode(context);
	if (!root) return;
	for (const fieldName of fields) {
		const path = fieldName.split(".");
		let node = root;
		for (let i = 0; i < path.length; i++) {
			const item = node.properties.find((property) => property.key.type === "JSONLiteral" && property.key.value === path[i]);
			if (!item?.value || item.value.type !== "JSONObjectExpression") {
				node = void 0;
				break;
			}
			node = item.value;
		}
		if (!node || node === root) continue;
		for (const property of node.properties) {
			if (property.value.type !== "JSONLiteral" || property.key.type !== "JSONLiteral") continue;
			if (typeof property.value.value !== "string") continue;
			yield {
				packageName: String(property.key.value),
				specifier: String(property.value.value),
				property
			};
		}
	}
}

//#endregion
//#region src/utils/_read.ts
function findPnpmWorkspace(sourceFile) {
	return up("pnpm-workspace.yaml", { cwd: dirname(sourceFile) });
}
function createPnpmWorkspace(sourceFile) {
	const file = up("package.json", { cwd: dirname(sourceFile) });
	if (!file) throw new Error("Could not find package.json to create pnpm-workspace.yaml");
	const workspacePath = resolve(dirname(file), "pnpm-workspace.yaml");
	fs.writeFileSync(workspacePath, "");
	return workspacePath;
}
function readPnpmWorkspace(filepath) {
	const workspace = parsePnpmWorkspaceYaml(fs.readFileSync(filepath, "utf-8"));
	let queueTimer;
	const queue = [];
	const write = () => {
		fs.writeFileSync(filepath, workspace.toString());
	};
	const hasQueue = () => queueTimer != null;
	const queueChange = (fn, order) => {
		if (order === "pre") queue.unshift(fn);
		else queue.push(fn);
		if (queueTimer != null) clearTimeout(queueTimer);
		queueTimer = setTimeout(() => {
			queueTimer = void 0;
			const clone = [...queue];
			queue.length = 0;
			for (const fn$1 of clone) fn$1(workspace);
			if (workspace.hasChanged()) write();
		}, 1e3);
	};
	return {
		filepath,
		lastRead: Date.now(),
		...workspace,
		hasQueue,
		queueChange
	};
}

//#endregion
//#region src/utils/workspace.ts
const WORKSPACE_CACHE_TIME = 1e4;
const workspaces = {};
function getPnpmWorkspace(context) {
	const sourcePath = context.filename;
	const ensureWorkspaceFile = context.settings.pnpm?.ensureWorkspaceFile;
	let workspacePath = findPnpmWorkspace(sourcePath);
	if (!workspacePath) if (ensureWorkspaceFile) workspacePath = createPnpmWorkspace(sourcePath);
	else throw new Error("pnpm-workspace.yaml not found");
	let workspace = workspaces[workspacePath];
	if (workspace && !workspace.hasQueue() && Date.now() - workspace.lastRead > WORKSPACE_CACHE_TIME) {
		workspaces[workspacePath] = void 0;
		workspace = void 0;
	}
	if (!workspace) {
		workspace = readPnpmWorkspace(workspacePath);
		workspaces[workspacePath] = workspace;
	}
	return workspace;
}

//#endregion
//#region src/rules/json/json-enforce-catalog.ts
const RULE_NAME$6 = "json-enforce-catalog";
const DEFAULT_FIELDS$1 = ["dependencies", "devDependencies"];
var json_enforce_catalog_default = createEslintRule({
	name: RULE_NAME$6,
	meta: {
		type: "layout",
		docs: { description: "Enforce using \"catalog:\" in `package.json`" },
		fixable: "code",
		schema: [{
			type: "object",
			properties: {
				allowedProtocols: {
					type: "array",
					description: "Allowed protocols in specifier to not be converted to catalog",
					items: { type: "string" }
				},
				autofix: {
					type: "boolean",
					description: "Whether to autofix the linting error",
					default: true
				},
				defaultCatalog: {
					type: "string",
					description: "Default catalog to use when moving version to catalog with autofix"
				},
				reuseExistingCatalog: {
					type: "boolean",
					description: "Whether to reuse existing catalog when moving version to catalog with autofix",
					default: true
				},
				conflicts: {
					type: "string",
					description: "Strategy to handle conflicts when adding packages to catalogs",
					enum: [
						"new-catalog",
						"overrides",
						"error"
					],
					default: "new-catalog"
				},
				fields: {
					type: "array",
					description: "Fields to check for catalog",
					items: { type: "string" },
					default: DEFAULT_FIELDS$1
				},
				ignores: {
					type: "array",
					description: "Ignore certain packages that require version specification",
					items: { type: "string" },
					default: []
				}
			},
			additionalProperties: false
		}],
		messages: { expectCatalog: "Expect to use catalog instead of plain specifier, got \"{{specifier}}\" for package \"{{packageName}}\"." }
	},
	defaultOptions: [{}],
	create(context, [options]) {
		const { allowedProtocols = [
			"workspace",
			"link",
			"file"
		], defaultCatalog = "default", autofix = true, reuseExistingCatalog = true, conflicts = "new-catalog", fields = DEFAULT_FIELDS$1, ignores = [] } = options || {};
		for (const { packageName, specifier, property } of iterateDependencies(context, fields)) {
			if (specifier.startsWith("catalog:") || ignores.includes(packageName)) continue;
			if (allowedProtocols?.some((p) => specifier.startsWith(p))) continue;
			const workspace = getPnpmWorkspace(context);
			if (!workspace) return {};
			let targetCatalog = reuseExistingCatalog ? workspace.getPackageCatalogs(packageName)[0] || defaultCatalog : defaultCatalog;
			const resolvedConflicts = workspace.hasSpecifierConflicts(targetCatalog, packageName, specifier);
			let shouldFix = autofix;
			if (conflicts === "error") {
				if (resolvedConflicts.conflicts) shouldFix = false;
			}
			if (conflicts === "new-catalog" && resolvedConflicts.conflicts) targetCatalog = resolvedConflicts.newCatalogName;
			context.report({
				node: property.value,
				messageId: "expectCatalog",
				data: {
					specifier,
					packageName
				},
				fix: shouldFix ? (fixer) => {
					workspace.queueChange(() => {
						workspace.setPackage(targetCatalog, packageName, specifier);
					});
					return fixer.replaceText(property.value, targetCatalog === "default" ? JSON.stringify("catalog:") : JSON.stringify(`catalog:${targetCatalog}`));
				} : void 0
			});
		}
		return {};
	}
});

//#endregion
//#region src/rules/json/json-prefer-workspace-settings.ts
const RULE_NAME$5 = "json-prefer-workspace-settings";
var json_prefer_workspace_settings_default = createEslintRule({
	name: RULE_NAME$5,
	meta: {
		type: "layout",
		docs: { description: "Prefer having pnpm settings in `pnpm-workspace.yaml` instead of `package.json`. This requires pnpm v10.6+, see https://github.com/orgs/pnpm/discussions/9037." },
		fixable: "code",
		schema: [{
			type: "object",
			properties: { autofix: {
				type: "boolean",
				description: "Whether to autofix the linting error",
				default: true
			} },
			additionalProperties: false
		}],
		messages: { unexpectedPnpmSettings: "Unexpected pnpm settings in package.json, should move to pnpm-workspace.yaml" }
	},
	defaultOptions: [{}],
	create(context, [options = {}]) {
		const { autofix = true } = options || {};
		const root = getPackageJsonRootNode(context);
		if (!root) return {};
		const pnpmNode = root.properties.find((property) => property.key.type === "JSONLiteral" && property.key.value === "pnpm");
		if (!pnpmNode) return {};
		const workspace = getPnpmWorkspace(context);
		if (!workspace) return {};
		context.report({
			node: pnpmNode,
			messageId: "unexpectedPnpmSettings",
			fix: autofix ? (fixer) => {
				const pnpmSettings = JSON.parse(context.sourceCode.text).pnpm;
				const flatValueParis = [];
				function traverse(value, paths) {
					if (typeof value === "object" && value !== null && !Array.isArray(value)) for (const key in value) traverse(value[key], [...paths, key]);
					else flatValueParis.push([paths, value]);
				}
				traverse(pnpmSettings, []);
				workspace.queueChange(() => {
					for (const [paths, value] of flatValueParis) workspace.setPath(paths, value);
				});
				let start = pnpmNode.range[0];
				let end = pnpmNode.range[1];
				const before = context.sourceCode.getTokenBefore(pnpmNode);
				if (before) start = before.range[1];
				const after = context.sourceCode.getTokenAfter(pnpmNode);
				if (after?.type === "Punctuator" && after.value === ",") end = after.range[1];
				return fixer.removeRange([start, end]);
			} : void 0
		});
		return {};
	}
});

//#endregion
//#region src/rules/json/json-valid-catalog.ts
const RULE_NAME$4 = "json-valid-catalog";
const DEFAULT_FIELDS = [
	"dependencies",
	"devDependencies",
	"optionalDependencies",
	"peerDependencies",
	"resolutions",
	"overrides",
	"pnpm.overrides"
];
var json_valid_catalog_default = createEslintRule({
	name: RULE_NAME$4,
	meta: {
		type: "layout",
		docs: { description: "Enforce using valid catalog in `package.json`" },
		fixable: "code",
		schema: [{
			type: "object",
			properties: {
				autoInsert: {
					type: "boolean",
					description: "Whether to auto insert to catalog if missing",
					default: true
				},
				autoInsertDefaultSpecifier: {
					type: "string",
					description: "Default specifier to use when auto inserting to catalog",
					default: "^0.0.0"
				},
				autofix: {
					type: "boolean",
					description: "Whether to autofix the linting error",
					default: true
				},
				enforceNoConflict: {
					type: "boolean",
					description: "Whether to enforce no conflicts when adding packages to catalogs (will create version-specific catalogs)",
					default: true
				},
				fields: {
					type: "array",
					description: "Fields to check for catalog",
					default: DEFAULT_FIELDS
				}
			},
			additionalProperties: false
		}],
		messages: { invalidCatalog: "Catalog \"{{specifier}}\" for package \"{{packageName}}\" is not defined in `pnpm-workspace.yaml`." }
	},
	defaultOptions: [{}],
	create(context, [options = {}]) {
		const { autoInsert = true, autofix = true, autoInsertDefaultSpecifier = "^0.0.0", fields = DEFAULT_FIELDS } = options || {};
		for (const { packageName, specifier, property } of iterateDependencies(context, fields)) {
			if (!specifier.startsWith("catalog:")) continue;
			const workspace = getPnpmWorkspace(context);
			if (!workspace) return {};
			const currentCatalog = specifier.replace(/^catalog:/, "").trim() || "default";
			const existingCatalogs = workspace.getPackageCatalogs(packageName);
			if (!existingCatalogs.includes(currentCatalog)) context.report({
				node: property.value,
				messageId: "invalidCatalog",
				data: {
					specifier,
					packageName
				},
				fix: !autofix || !autoInsert && !existingCatalogs.length ? void 0 : (fixer) => {
					let catalog = existingCatalogs[0];
					if (!catalog && autoInsert) {
						catalog = currentCatalog;
						workspace.queueChange(() => {
							workspace.setPackage(catalog, packageName, autoInsertDefaultSpecifier);
						}, "pre");
					}
					return fixer.replaceText(property.value, catalog === "default" ? JSON.stringify("catalog:") : JSON.stringify(`catalog:${catalog}`));
				}
			});
		}
		return {};
	}
});

//#endregion
//#region src/rules/json/index.ts
const rules$2 = {
	"json-enforce-catalog": json_enforce_catalog_default,
	"json-valid-catalog": json_valid_catalog_default,
	"json-prefer-workspace-settings": json_prefer_workspace_settings_default
};

//#endregion
//#region ../../node_modules/.pnpm/@antfu+utils@9.3.0/node_modules/@antfu/utils/dist/index.mjs
const toString = (v) => Object.prototype.toString.call(v);
function getTypeName(v) {
	if (v === null) return "null";
	const type = toString(v).slice(8, -1).toLowerCase();
	return typeof v === "object" || typeof v === "function" ? type : typeof v;
}
function isDeepEqual(value1, value2) {
	const type1 = getTypeName(value1);
	if (type1 !== getTypeName(value2)) return false;
	if (type1 === "array") {
		if (value1.length !== value2.length) return false;
		return value1.every((item, i) => {
			return isDeepEqual(item, value2[i]);
		});
	}
	if (type1 === "object") {
		const keyArr = Object.keys(value1);
		if (keyArr.length !== Object.keys(value2).length) return false;
		return keyArr.every((key) => {
			return isDeepEqual(value1[key], value2[key]);
		});
	}
	return Object.is(value1, value2);
}

//#endregion
//#region src/rules/yaml/yaml-enforce-settings.ts
const RULE_NAME$3 = "yaml-enforce-settings";
var yaml_enforce_settings_default = createEslintRule({
	name: RULE_NAME$3,
	meta: {
		type: "problem",
		fixable: "code",
		docs: { description: "Enforce settings in `pnpm-workspace.yaml`" },
		schema: [{
			type: "object",
			additionalProperties: false,
			properties: {
				autofix: {
					type: "boolean",
					description: "Whether to autofix the linting error",
					default: true
				},
				settings: {
					description: "Exact settings to enforce, for both keys and values. Auto-fixable.",
					type: "object"
				},
				requiredFields: {
					description: "Required settings fields to enforce, regardless of their values. Not-autofixable.",
					type: "array",
					items: { type: "string" }
				},
				forbiddenFields: {
					description: "Forbidden settings fields to enforce, regardless of their values. Not-autofixable.",
					type: "array",
					items: { type: "string" }
				}
			}
		}],
		messages: {
			requiredFieldsMissing: "Required settings fields {{keys}} are missing in `pnpm-workspace.yaml`.",
			settingMissing: "Setting \"{{key}}\" is missing in `pnpm-workspace.yaml`.",
			settingMismatch: "Setting \"{{key}}\" has mismatch value. Expected: {{expected}}, Actual: {{actual}}.",
			forbiddenFieldFound: "Forbidden setting field \"{{key}}\" is found in `pnpm-workspace.yaml`."
		}
	},
	defaultOptions: [{
		autofix: true,
		settings: {},
		requiredFields: [],
		forbiddenFields: []
	}],
	create(context, [options = {}]) {
		const { autofix = true, settings = {}, requiredFields = [], forbiddenFields = [] } = options || {};
		if (Object.keys(settings).length === 0 && requiredFields.length === 0 && forbiddenFields.length === 0) throw new Error("Either `settings` or `requiredFields` or `forbiddenFields` must be provided, this rule is not functional currently.");
		if (basename(context.filename) !== "pnpm-workspace.yaml") return {};
		const workspace = getPnpmWorkspace(context);
		if (!workspace || normalize(workspace.filepath) !== normalize(context.filename)) return {};
		if (workspace.hasChanged() || workspace.hasQueue()) return {};
		workspace.setContent(context.sourceCode.text);
		const parsed = workspace.toJSON() || {};
		const doc = workspace.getDocument();
		const missingFields = [];
		for (const key of requiredFields) if (!Object.hasOwn(parsed, key)) missingFields.push(key);
		if (missingFields.length > 0) context.report({
			loc: {
				start: context.sourceCode.getLocFromIndex(0),
				end: context.sourceCode.getLocFromIndex(0)
			},
			messageId: "requiredFieldsMissing",
			data: { keys: missingFields.map((i) => JSON.stringify(i)).join(", ") }
		});
		for (const key of forbiddenFields) {
			const node = doc.getIn([key], true);
			if (!node) continue;
			context.report({
				loc: {
					start: context.sourceCode.getLocFromIndex(node?.range?.[0] ?? 0),
					end: context.sourceCode.getLocFromIndex(node?.range?.[1] ?? 0)
				},
				messageId: "forbiddenFieldFound",
				data: { key }
			});
		}
		for (const [key, value] of Object.entries(settings)) {
			if (isDeepEqual(parsed[key], value)) continue;
			const node = doc.getIn([key], true);
			const actualValue = parsed[key];
			const expectedStr = JSON.stringify(value);
			const actualStr = actualValue !== void 0 ? JSON.stringify(actualValue) : "undefined";
			if (!node) {
				if (parsed[key] != null) throw new Error("Node should not be undefined");
				context.report({
					loc: {
						start: context.sourceCode.getLocFromIndex(0),
						end: context.sourceCode.getLocFromIndex(0)
					},
					messageId: "settingMismatch",
					data: {
						key,
						expected: expectedStr,
						actual: actualStr
					},
					fix: autofix ? (fixer) => {
						const replacer = `\n${yaml.stringify({ [key]: value }, { collectionStyle: "block" })}\n`;
						return fixer.insertTextBeforeRange([0, 0], replacer);
					} : void 0
				});
			} else {
				if (!node.range) throw new Error("Node range is not found");
				const mapNode = doc.contents;
				let pairItem;
				if (mapNode?.items) {
					for (const item of mapNode.items) if (item.key && typeof item.key === "object" && "value" in item.key && item.key.value === key) {
						pairItem = item;
						break;
					}
				}
				let startIndex = node.range[0];
				let endIndex = node.range[1];
				if (pairItem?.key?.range && pairItem?.value?.range) {
					startIndex = pairItem.key.range[0];
					endIndex = pairItem.value.range[1];
				}
				context.report({
					loc: {
						start: context.sourceCode.getLocFromIndex(startIndex),
						end: context.sourceCode.getLocFromIndex(endIndex)
					},
					messageId: "settingMismatch",
					data: {
						key,
						expected: expectedStr,
						actual: actualStr
					},
					fix: autofix ? (fixer) => {
						const replacer = `\n${yaml.stringify({ [key]: value }, { collectionStyle: "block" })}\n`;
						return fixer.replaceTextRange([startIndex, endIndex], replacer);
					} : void 0
				});
			}
		}
		return {};
	}
});

//#endregion
//#region src/rules/yaml/yaml-no-duplicate-catalog-item.ts
const RULE_NAME$2 = "yaml-no-duplicate-catalog-item";
var yaml_no_duplicate_catalog_item_default = createEslintRule({
	name: RULE_NAME$2,
	meta: {
		type: "problem",
		docs: { description: "Disallow duplicate catalog items in `pnpm-workspace.yaml`" },
		fixable: "code",
		schema: [{
			type: "object",
			properties: {
				allow: {
					type: "array",
					items: { type: "string" }
				},
				checkDuplicates: {
					type: "string",
					enum: ["name-only", "exact-version"],
					description: "Determines what constitutes a duplicate: \"name-only\" errors on any duplicate package name, \"exact-version\" only errors on identical version strings",
					default: "name-only"
				}
			},
			additionalProperties: false
		}],
		messages: { duplicateCatalogItem: "Catalog item \"{{name}}\" with version \"{{version}}\" is already defined in the \"{{existingCatalog}}\" catalog. You may want to remove one of them." }
	},
	defaultOptions: [{}],
	create(context, [options = {}]) {
		if (basename(context.filename) !== "pnpm-workspace.yaml") return {};
		const workspace = getPnpmWorkspace(context);
		if (!workspace || normalize(workspace.filepath) !== normalize(context.filename)) return {};
		if (workspace.hasChanged() || workspace.hasQueue()) return {};
		const { allow = [], checkDuplicates = "name-only" } = options;
		workspace.setContent(context.sourceCode.text);
		const json = workspace.toJSON() || {};
		const exists = /* @__PURE__ */ new Map();
		const catalogs = {
			...json.catalogs,
			default: json.catalog ?? json.catalogs?.default
		};
		const doc = workspace.getDocument();
		for (const [catalog, object] of Object.entries(catalogs)) {
			if (!object) continue;
			for (const [key, version$1] of Object.entries(object)) {
				if (allow.includes(key)) continue;
				const existing = exists.get(key);
				if (existing) {
					if (checkDuplicates === "name-only" ? true : existing.version === version$1) {
						const node = doc.getIn(catalog === "default" ? json.catalog ? ["catalog", key] : [
							"catalogs",
							catalog,
							key
						] : [
							"catalogs",
							catalog,
							key
						], true);
						const start = context.sourceCode.getLocFromIndex(node.range[0]);
						const end = context.sourceCode.getLocFromIndex(node.range[1]);
						context.report({
							loc: {
								start,
								end
							},
							messageId: "duplicateCatalogItem",
							data: {
								name: key,
								version: String(version$1),
								currentCatalog: catalog,
								existingCatalog: existing.catalog
							}
						});
					}
				} else exists.set(key, {
					catalog,
					version: String(version$1)
				});
			}
		}
		return {};
	}
});

//#endregion
//#region src/rules/yaml/yaml-no-unused-catalog-item.ts
const RULE_NAME$1 = "yaml-no-unused-catalog-item";
var yaml_no_unused_catalog_item_default = createEslintRule({
	name: RULE_NAME$1,
	meta: {
		type: "problem",
		docs: { description: "Disallow unused catalogs in `pnpm-workspace.yaml`" },
		fixable: "code",
		schema: [],
		messages: { unusedCatalogItem: "Catalog item \"{{catalogItem}}\" is not used in any package.json." }
	},
	defaultOptions: [],
	create(context) {
		if (basename(context.filename) !== "pnpm-workspace.yaml") return {};
		const workspace = getPnpmWorkspace(context);
		if (!workspace || normalize(workspace.filepath) !== normalize(context.filename)) return {};
		if (workspace.hasChanged() || workspace.hasQueue()) return {};
		workspace.setContent(context.sourceCode.text);
		const parsed = workspace.toJSON() || {};
		const root = resolve(dirname(context.filename));
		const entries = /* @__PURE__ */ new Map();
		const doc = workspace.getDocument();
		const catalogs = { default: doc.getIn(["catalog"]) };
		for (const item of doc.getIn(["catalogs"])?.items || []) catalogs[String(item.key)] = item.value;
		for (const [catalog, map] of Object.entries(catalogs)) {
			if (!map) continue;
			for (const item of map.items) entries.set(`${String(item.key)}:${catalog}`, item);
		}
		for (const [packageName, specifier] of Object.entries(parsed.overrides || {})) if (specifier.startsWith("catalog:")) {
			const catalog = specifier.slice(8) || "default";
			entries.delete(`${packageName}:${catalog}`);
		}
		if (entries.size === 0) return {};
		const dirs = parsed.packages ? globSync(parsed.packages, {
			cwd: root,
			dot: false,
			ignore: [
				"**/node_modules/**",
				"**/dist/**",
				"**/build/**",
				"**/dist/**",
				"**/dist/**"
			],
			absolute: true,
			expandDirectories: false,
			onlyDirectories: true
		}) : [];
		dirs.push(root);
		const packages = dirs.map((dir) => resolve(dir, "package.json")).filter((x) => existsSync(x)).sort();
		const FIELDS = [
			"dependencies",
			"devDependencies",
			"peerDependencies",
			"optionalDependencies",
			"overrides",
			"resolutions",
			"pnpm.overrides"
		];
		for (const path of packages) {
			const pkg = JSON.parse(readFileSync(path, "utf-8"));
			for (const field of FIELDS) {
				const map = getObjectPath(pkg, field.split("."));
				if (!map) continue;
				for (const [name$1, value] of Object.entries(map)) {
					if (!value.startsWith("catalog:")) continue;
					const key = `${name$1}:${value.slice(8) || "default"}`;
					entries.delete(key);
				}
			}
		}
		if (entries.size > 0) for (const [key, value] of Array.from(entries.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
			const start = context.sourceCode.getLocFromIndex(value.key.range[0]);
			const end = context.sourceCode.getLocFromIndex(value.value.range.at(-1));
			context.report({
				loc: {
					start,
					end
				},
				messageId: "unusedCatalogItem",
				data: { catalogItem: key }
			});
		}
		return {};
	}
});
function getObjectPath(obj, path) {
	let current = obj;
	for (const key of path) {
		current = current[key];
		if (!current) return void 0;
	}
	return current;
}

//#endregion
//#region src/rules/yaml/yaml-valid-packages.ts
const RULE_NAME = "yaml-valid-packages";
function reportError(context, item, messageId, data) {
	const start = context.sourceCode.getLocFromIndex(item.range[0]);
	const end = context.sourceCode.getLocFromIndex(item.range[1]);
	context.report({
		loc: {
			start,
			end
		},
		messageId,
		data
	});
}
var yaml_valid_packages_default = createEslintRule({
	name: RULE_NAME,
	meta: {
		type: "problem",
		docs: { description: "Ensure all package patterns in `pnpm-workspace.yaml` match at least one directory" },
		schema: [],
		messages: {
			noMatch: "Package pattern \"{{pattern}}\" does not match any directories with a package.json file.",
			invalidType: "Package pattern must be a string, got {{type}}."
		}
	},
	defaultOptions: [],
	create(context) {
		if (basename(context.filename) !== "pnpm-workspace.yaml") return {};
		const workspace = getPnpmWorkspace(context);
		if (!workspace || normalize(workspace.filepath) !== normalize(context.filename)) return {};
		if (workspace.hasChanged() || workspace.hasQueue()) return {};
		workspace.setContent(context.sourceCode.text);
		const parsed = workspace.toJSON() || {};
		if (!parsed.packages || !Array.isArray(parsed.packages)) return {};
		const packagesNode = workspace.getDocument().getIn(["packages"]);
		if (!packagesNode) return {};
		const root = resolve(dirname(context.filename));
		for (let i = 0; i < parsed.packages.length; i++) {
			const item = packagesNode.items[i];
			if (!item?.range) continue;
			const pattern = parsed.packages[i];
			if (typeof pattern !== "string") {
				reportError(context, item, "invalidType", { type: typeof pattern });
				continue;
			}
			if (globSync(join(pattern, "package.json"), {
				cwd: root,
				dot: false,
				ignore: [
					"**/node_modules/**",
					"**/dist/**",
					"**/build/**"
				],
				absolute: false,
				expandDirectories: false,
				onlyFiles: true
			}).length === 0) reportError(context, item, "noMatch", { pattern });
		}
		return {};
	}
});

//#endregion
//#region src/rules/yaml/index.ts
const rules$1 = {
	"yaml-no-unused-catalog-item": yaml_no_unused_catalog_item_default,
	"yaml-no-duplicate-catalog-item": yaml_no_duplicate_catalog_item_default,
	"yaml-valid-packages": yaml_valid_packages_default,
	"yaml-enforce-settings": yaml_enforce_settings_default
};

//#endregion
//#region src/rules/index.ts
const rules = {
	...rules$2,
	...rules$1
};

//#endregion
//#region src/index.ts
const plugin = {
	meta: {
		name,
		version
	},
	rules
};
const configsJson = [{
	name: "pnpm/package.json",
	files: ["package.json", "**/package.json"],
	languageOptions: { parser: jsoncParser },
	plugins: { pnpm: plugin },
	rules: {
		"pnpm/json-enforce-catalog": "error",
		"pnpm/json-valid-catalog": "error",
		"pnpm/json-prefer-workspace-settings": "error"
	}
}];
const configsYaml = [{
	name: "pnpm/pnpm-workspace-yaml",
	files: ["pnpm-workspace.yaml"],
	languageOptions: { parser: yamlParser },
	plugins: { pnpm: plugin },
	rules: {
		"pnpm/yaml-no-unused-catalog-item": "error",
		"pnpm/yaml-no-duplicate-catalog-item": "error",
		"pnpm/yaml-valid-packages": "error"
	}
}];
const configs = {
	recommended: [...configsJson],
	json: configsJson,
	yaml: configsYaml
};
plugin.configs = configs;
var src_default = plugin;

//#endregion
export { configs, src_default as default, plugin };