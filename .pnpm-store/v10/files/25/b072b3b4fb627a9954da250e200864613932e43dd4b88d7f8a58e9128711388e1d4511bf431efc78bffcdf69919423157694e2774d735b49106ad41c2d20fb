import { n as kebabCase, r as snakeCase, t as camelCase } from "./_chunks/libs/scule.mjs";
import { parseArgs as parseArgs$1 } from "node:util";
//#region src/_utils.ts
function toArray(val) {
	if (Array.isArray(val)) return val;
	return val === void 0 ? [] : [val];
}
function formatLineColumns(lines, linePrefix = "") {
	const maxLength = [];
	for (const line of lines) for (const [i, element] of line.entries()) maxLength[i] = Math.max(maxLength[i] || 0, element.length);
	return lines.map((l) => l.map((c, i) => linePrefix + c[i === 0 ? "padStart" : "padEnd"](maxLength[i])).join("  ")).join("\n");
}
function resolveValue(input) {
	return typeof input === "function" ? input() : input;
}
var CLIError = class extends Error {
	code;
	constructor(message, code) {
		super(message);
		this.name = "CLIError";
		this.code = code;
	}
};
//#endregion
//#region src/_parser.ts
function parseRawArgs(args = [], opts = {}) {
	const booleans = new Set(opts.boolean || []);
	const strings = new Set(opts.string || []);
	const aliasMap = opts.alias || {};
	const defaults = opts.default || {};
	const aliasToMain = /* @__PURE__ */ new Map();
	const mainToAliases = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(aliasMap)) {
		const targets = value;
		for (const target of targets) {
			aliasToMain.set(key, target);
			if (!mainToAliases.has(target)) mainToAliases.set(target, []);
			mainToAliases.get(target).push(key);
			aliasToMain.set(target, key);
			if (!mainToAliases.has(key)) mainToAliases.set(key, []);
			mainToAliases.get(key).push(target);
		}
	}
	const options = {};
	function getType(name) {
		if (booleans.has(name)) return "boolean";
		const aliases = mainToAliases.get(name) || [];
		for (const alias of aliases) if (booleans.has(alias)) return "boolean";
		return "string";
	}
	function isStringType(name) {
		if (strings.has(name)) return true;
		const aliases = mainToAliases.get(name) || [];
		for (const alias of aliases) if (strings.has(alias)) return true;
		return false;
	}
	const allOptions = new Set([
		...booleans,
		...strings,
		...Object.keys(aliasMap),
		...Object.values(aliasMap).flat(),
		...Object.keys(defaults)
	]);
	for (const name of allOptions) if (!options[name]) options[name] = {
		type: getType(name),
		default: defaults[name]
	};
	for (const [alias, main] of aliasToMain.entries()) if (alias.length === 1 && options[main] && !options[main].short) options[main].short = alias;
	const processedArgs = [];
	const negatedFlags = {};
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--") {
			processedArgs.push(...args.slice(i));
			break;
		}
		if (arg.startsWith("--no-")) {
			const flagName = arg.slice(5);
			negatedFlags[flagName] = true;
			continue;
		}
		processedArgs.push(arg);
	}
	let parsed;
	try {
		parsed = parseArgs$1({
			args: processedArgs,
			options: Object.keys(options).length > 0 ? options : void 0,
			allowPositionals: true,
			strict: false
		});
	} catch {
		parsed = {
			values: {},
			positionals: processedArgs
		};
	}
	const out = { _: [] };
	out._ = parsed.positionals;
	for (const [key, value] of Object.entries(parsed.values)) {
		let coerced = value;
		if (getType(key) === "boolean" && typeof value === "string") coerced = value !== "false";
		else if (isStringType(key) && typeof value === "boolean") coerced = "";
		out[key] = coerced;
	}
	for (const [name] of Object.entries(negatedFlags)) {
		out[name] = false;
		const mainName = aliasToMain.get(name);
		if (mainName) out[mainName] = false;
		const aliases = mainToAliases.get(name);
		if (aliases) for (const alias of aliases) out[alias] = false;
	}
	for (const [alias, main] of aliasToMain.entries()) {
		if (out[alias] !== void 0 && out[main] === void 0) out[main] = out[alias];
		if (out[main] !== void 0 && out[alias] === void 0) out[alias] = out[main];
		if (out[alias] !== out[main] && defaults[main] === out[main]) out[main] = out[alias];
	}
	return out;
}
//#endregion
//#region src/_color.ts
const noColor = /* @__PURE__ */ (() => {
	const env = globalThis.process?.env ?? {};
	return env.NO_COLOR === "1" || env.TERM === "dumb" || env.TEST || env.CI;
})();
const _c = (c, r = 39) => (t) => noColor ? t : `\u001B[${c}m${t}\u001B[${r}m`;
const bold = /* @__PURE__ */ _c(1, 22);
const cyan = /* @__PURE__ */ _c(36);
const gray = /* @__PURE__ */ _c(90);
const underline = /* @__PURE__ */ _c(4, 24);
//#endregion
//#region src/args.ts
function parseArgs(rawArgs, argsDef) {
	const parseOptions = {
		boolean: [],
		string: [],
		alias: {},
		default: {}
	};
	const args = resolveArgs(argsDef);
	for (const arg of args) {
		if (arg.type === "positional") continue;
		if (arg.type === "string" || arg.type === "enum") parseOptions.string.push(arg.name);
		else if (arg.type === "boolean") parseOptions.boolean.push(arg.name);
		if (arg.default !== void 0) parseOptions.default[arg.name] = arg.default;
		if (arg.alias) parseOptions.alias[arg.name] = arg.alias;
		const camelName = camelCase(arg.name);
		const kebabName = kebabCase(arg.name);
		if (camelName !== arg.name || kebabName !== arg.name) {
			const existingAliases = toArray(parseOptions.alias[arg.name] || []);
			if (camelName !== arg.name && !existingAliases.includes(camelName)) existingAliases.push(camelName);
			if (kebabName !== arg.name && !existingAliases.includes(kebabName)) existingAliases.push(kebabName);
			if (existingAliases.length > 0) parseOptions.alias[arg.name] = existingAliases;
		}
	}
	const parsed = parseRawArgs(rawArgs, parseOptions);
	const [ ...positionalArguments] = parsed._;
	const parsedArgsProxy = new Proxy(parsed, { get(target, prop) {
		return target[prop] ?? target[camelCase(prop)] ?? target[kebabCase(prop)];
	} });
	for (const [, arg] of args.entries()) if (arg.type === "positional") {
		const nextPositionalArgument = positionalArguments.shift();
		if (nextPositionalArgument !== void 0) parsedArgsProxy[arg.name] = nextPositionalArgument;
		else if (arg.default === void 0 && arg.required !== false) throw new CLIError(`Missing required positional argument: ${arg.name.toUpperCase()}`, "EARG");
		else parsedArgsProxy[arg.name] = arg.default;
	} else if (arg.type === "enum") {
		const argument = parsedArgsProxy[arg.name];
		const options = arg.options || [];
		if (argument !== void 0 && options.length > 0 && !options.includes(argument)) throw new CLIError(`Invalid value for argument: ${cyan(`--${arg.name}`)} (${cyan(argument)}). Expected one of: ${options.map((o) => cyan(o)).join(", ")}.`, "EARG");
	} else if (arg.required && parsedArgsProxy[arg.name] === void 0) throw new CLIError(`Missing required argument: --${arg.name}`, "EARG");
	return parsedArgsProxy;
}
function resolveArgs(argsDef) {
	const args = [];
	for (const [name, argDef] of Object.entries(argsDef || {})) args.push({
		...argDef,
		name,
		alias: toArray(argDef.alias)
	});
	return args;
}
//#endregion
//#region src/plugin.ts
function defineCittyPlugin(plugin) {
	return plugin;
}
async function resolvePlugins(plugins) {
	return Promise.all(plugins.map((p) => resolveValue(p)));
}
//#endregion
//#region src/command.ts
function defineCommand(def) {
	return def;
}
async function runCommand(cmd, opts) {
	const cmdArgs = await resolveValue(cmd.args || {});
	const parsedArgs = parseArgs(opts.rawArgs, cmdArgs);
	const context = {
		rawArgs: opts.rawArgs,
		args: parsedArgs,
		data: opts.data,
		cmd
	};
	const plugins = await resolvePlugins(cmd.plugins ?? []);
	let result;
	let runError;
	try {
		for (const plugin of plugins) await plugin.setup?.(context);
		if (typeof cmd.setup === "function") await cmd.setup(context);
		const subCommands = await resolveValue(cmd.subCommands);
		if (subCommands && Object.keys(subCommands).length > 0) {
			const subCommandArgIndex = findSubCommandIndex(opts.rawArgs, cmdArgs);
			const explicitName = opts.rawArgs[subCommandArgIndex];
			if (explicitName) {
				const subCommand = await _findSubCommand(subCommands, explicitName);
				if (!subCommand) throw new CLIError(`Unknown command ${cyan(explicitName)}`, "E_UNKNOWN_COMMAND");
				await runCommand(subCommand, { rawArgs: opts.rawArgs.slice(subCommandArgIndex + 1) });
			} else {
				const defaultSubCommand = await resolveValue(cmd.default);
				if (defaultSubCommand) {
					if (cmd.run) throw new CLIError(`Cannot specify both 'run' and 'default' on the same command.`, "E_DEFAULT_CONFLICT");
					const subCommand = await _findSubCommand(subCommands, defaultSubCommand);
					if (!subCommand) throw new CLIError(`Default sub command ${cyan(defaultSubCommand)} not found in subCommands.`, "E_UNKNOWN_COMMAND");
					await runCommand(subCommand, { rawArgs: opts.rawArgs });
				} else if (!cmd.run) throw new CLIError(`No command specified.`, "E_NO_COMMAND");
			}
		}
		if (typeof cmd.run === "function") result = await cmd.run(context);
	} catch (error) {
		runError = error;
	}
	const cleanupErrors = [];
	if (typeof cmd.cleanup === "function") try {
		await cmd.cleanup(context);
	} catch (error) {
		cleanupErrors.push(error);
	}
	for (const plugin of [...plugins].reverse()) try {
		await plugin.cleanup?.(context);
	} catch (error) {
		cleanupErrors.push(error);
	}
	if (runError) throw runError;
	if (cleanupErrors.length === 1) throw cleanupErrors[0];
	if (cleanupErrors.length > 1) throw new Error("Multiple cleanup errors", { cause: cleanupErrors });
	return { result };
}
async function resolveSubCommand(cmd, rawArgs, parent) {
	const subCommands = await resolveValue(cmd.subCommands);
	if (subCommands && Object.keys(subCommands).length > 0) {
		const subCommandArgIndex = findSubCommandIndex(rawArgs, await resolveValue(cmd.args || {}));
		const subCommandName = rawArgs[subCommandArgIndex];
		const subCommand = await _findSubCommand(subCommands, subCommandName);
		if (subCommand) return resolveSubCommand(subCommand, rawArgs.slice(subCommandArgIndex + 1), cmd);
	}
	return [cmd, parent];
}
async function _findSubCommand(subCommands, name) {
	if (name in subCommands) return resolveValue(subCommands[name]);
	for (const sub of Object.values(subCommands)) {
		const resolved = await resolveValue(sub);
		const meta = await resolveValue(resolved?.meta);
		if (meta?.alias) {
			if (toArray(meta.alias).includes(name)) return resolved;
		}
	}
}
function findSubCommandIndex(rawArgs, argsDef) {
	for (let i = 0; i < rawArgs.length; i++) {
		const arg = rawArgs[i];
		if (arg === "--") return -1;
		if (arg.startsWith("-")) {
			if (!arg.includes("=") && _isValueFlag(arg, argsDef)) i++;
			continue;
		}
		return i;
	}
	return -1;
}
function _isValueFlag(flag, argsDef) {
	const name = flag.replace(/^-{1,2}/, "");
	const normalized = camelCase(name);
	for (const [key, def] of Object.entries(argsDef)) {
		if (def.type !== "string" && def.type !== "enum") continue;
		if (normalized === camelCase(key)) return true;
		if ((Array.isArray(def.alias) ? def.alias : def.alias ? [def.alias] : []).includes(name)) return true;
	}
	return false;
}
//#endregion
//#region src/usage.ts
async function showUsage(cmd, parent) {
	try {
		console.log(await renderUsage(cmd, parent) + "\n");
	} catch (error) {
		console.error(error);
	}
}
const negativePrefixRe = /^no[-A-Z]/;
async function renderUsage(cmd, parent) {
	const cmdMeta = await resolveValue(cmd.meta || {});
	const cmdArgs = resolveArgs(await resolveValue(cmd.args || {}));
	const parentMeta = await resolveValue(parent?.meta || {});
	const commandName = `${parentMeta.name ? `${parentMeta.name} ` : ""}` + (cmdMeta.name || process.argv[1]);
	const argLines = [];
	const posLines = [];
	const commandsLines = [];
	const usageLine = [];
	for (const arg of cmdArgs) if (arg.type === "positional") {
		const name = arg.name.toUpperCase();
		const isRequired = arg.required !== false && arg.default === void 0;
		posLines.push([cyan(name + renderValueHint(arg)), renderDescription(arg, isRequired)]);
		usageLine.push(isRequired ? `<${name}>` : `[${name}]`);
	} else {
		const isRequired = arg.required === true && arg.default === void 0;
		const argStr = [...(arg.alias || []).map((a) => `-${a}`), `--${arg.name}`].join(", ") + renderValueHint(arg);
		argLines.push([cyan(argStr), renderDescription(arg, isRequired)]);
		/**
		* print negative boolean arg variant usage when
		* - enabled by default or has `negativeDescription`
		* - not prefixed with `no-` or `no[A-Z]`
		*/
		if (arg.type === "boolean" && (arg.default === true || arg.negativeDescription) && !negativePrefixRe.test(arg.name)) {
			const negativeArgStr = [...(arg.alias || []).map((a) => `--no-${a}`), `--no-${arg.name}`].join(", ");
			argLines.push([cyan(negativeArgStr), [arg.negativeDescription, isRequired ? gray("(Required)") : ""].filter(Boolean).join(" ")]);
		}
		if (isRequired) usageLine.push(`--${arg.name}` + renderValueHint(arg));
	}
	if (cmd.subCommands) {
		const commandNames = [];
		const subCommands = await resolveValue(cmd.subCommands);
		for (const [name, sub] of Object.entries(subCommands)) {
			const meta = await resolveValue((await resolveValue(sub))?.meta);
			if (meta?.hidden) continue;
			const aliases = toArray(meta?.alias);
			const label = [name, ...aliases].join(", ");
			commandsLines.push([cyan(label), meta?.description || ""]);
			commandNames.push(name, ...aliases);
		}
		usageLine.push(commandNames.join("|"));
	}
	const usageLines = [];
	const version = cmdMeta.version || parentMeta.version;
	usageLines.push(gray(`${cmdMeta.description} (${commandName + (version ? ` v${version}` : "")})`), "");
	const hasOptions = argLines.length > 0 || posLines.length > 0;
	usageLines.push(`${underline(bold("USAGE"))} ${cyan(`${commandName}${hasOptions ? " [OPTIONS]" : ""} ${usageLine.join(" ")}`)}`, "");
	if (posLines.length > 0) {
		usageLines.push(underline(bold("ARGUMENTS")), "");
		usageLines.push(formatLineColumns(posLines, "  "));
		usageLines.push("");
	}
	if (argLines.length > 0) {
		usageLines.push(underline(bold("OPTIONS")), "");
		usageLines.push(formatLineColumns(argLines, "  "));
		usageLines.push("");
	}
	if (commandsLines.length > 0) {
		usageLines.push(underline(bold("COMMANDS")), "");
		usageLines.push(formatLineColumns(commandsLines, "  "));
		usageLines.push("", `Use ${cyan(`${commandName} <command> --help`)} for more information about a command.`);
	}
	return usageLines.filter((l) => typeof l === "string").join("\n");
}
function renderValueHint(arg) {
	const valueHint = arg.valueHint ? `=<${arg.valueHint}>` : "";
	const fallbackValueHint = valueHint || `=<${snakeCase(arg.name)}>`;
	if (!arg.type || arg.type === "positional" || arg.type === "boolean") return valueHint;
	if (arg.type === "enum" && arg.options?.length) return `=<${arg.options.join("|")}>`;
	return fallbackValueHint;
}
function renderDescription(arg, required) {
	const requiredHint = required ? gray("(Required)") : "";
	const defaultHint = arg.default === void 0 ? "" : gray(`(Default: ${arg.default})`);
	return [
		arg.description,
		requiredHint,
		defaultHint
	].filter(Boolean).join(" ");
}
//#endregion
//#region src/main.ts
async function runMain(cmd, opts = {}) {
	const rawArgs = opts.rawArgs || process.argv.slice(2);
	const showUsage$1 = opts.showUsage || showUsage;
	try {
		const builtinFlags = await _resolveBuiltinFlags(cmd);
		if (builtinFlags.help.length > 0 && rawArgs.some((arg) => builtinFlags.help.includes(arg))) {
			await showUsage$1(...await resolveSubCommand(cmd, rawArgs));
			process.exit(0);
		} else if (rawArgs.length === 1 && builtinFlags.version.includes(rawArgs[0])) {
			const meta = typeof cmd.meta === "function" ? await cmd.meta() : await cmd.meta;
			if (!meta?.version) throw new CLIError("No version specified", "E_NO_VERSION");
			console.log(meta.version);
		} else await runCommand(cmd, { rawArgs });
	} catch (error) {
		if (error instanceof CLIError) {
			await showUsage$1(...await resolveSubCommand(cmd, rawArgs));
			console.error(error.message);
		} else console.error(error, "\n");
		process.exit(1);
	}
}
function createMain(cmd) {
	return (opts = {}) => runMain(cmd, opts);
}
async function _resolveBuiltinFlags(cmd) {
	const argsDef = await resolveValue(cmd.args || {});
	const userNames = /* @__PURE__ */ new Set();
	const userAliases = /* @__PURE__ */ new Set();
	for (const [name, def] of Object.entries(argsDef)) {
		userNames.add(name);
		for (const alias of toArray(def.alias)) userAliases.add(alias);
	}
	return {
		help: _getBuiltinFlags("help", "h", userNames, userAliases),
		version: _getBuiltinFlags("version", "v", userNames, userAliases)
	};
}
function _getBuiltinFlags(long, short, userNames, userAliases) {
	if (userNames.has(long) || userAliases.has(long)) return [];
	if (userNames.has(short) || userAliases.has(short)) return [`--${long}`];
	return [`--${long}`, `-${short}`];
}
//#endregion
export { createMain, defineCittyPlugin, defineCommand, parseArgs, renderUsage, runCommand, runMain, showUsage };
