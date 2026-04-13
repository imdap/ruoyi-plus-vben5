import { n as unflatten, t as flatten } from "./_chunks/libs/flat.mjs";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import destr from "destr";
import { defu } from "defu";
//#region src/index.ts
const RE_KEY_VAL = /^\s*([^\s=]+)\s*=\s*(.*)?\s*$/;
const RE_LINES = /\n|\r|\r\n/;
/**
* The default options for the configuration file.
*/
const defaults = {
	name: ".conf",
	dir: process.cwd(),
	flat: false
};
function withDefaults(options) {
	if (typeof options === "string") options = { name: options };
	return {
		...defaults,
		...options
	};
}
function parse(contents, options = {}) {
	const config = {};
	const lines = contents.split(RE_LINES);
	for (const line of lines) {
		const match = line.match(RE_KEY_VAL);
		if (!match) continue;
		const key = match[1];
		if (!key || key === "__proto__" || key === "constructor") continue;
		const value = destr((match[2] || "").trim());
		if (key.endsWith("[]")) {
			const nkey = key.slice(0, Math.max(0, key.length - 2));
			config[nkey] = (config[nkey] || []).concat(value);
			continue;
		}
		config[key] = value;
	}
	return options.flat ? config : unflatten(config, { overwrite: true });
}
/**
* Parses a configuration string into an object.
* @param {string} contents - The configuration data as a raw string.
* @param {RCOptions} [options={}] - Options to control the parsing behaviour. See {@link RCOptions}.
* @returns {RC} - The parsed configuration object. See {@link RC}.
*/
function parseFile(path, options) {
	if (!existsSync(path)) return {};
	return parse(readFileSync(path, "utf8"), options);
}
/**
* Reads a configuration file from a default or specified location and parses its contents.
* @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The parsed configuration object. See {@link RC}.
*/
function read(options) {
	options = withDefaults(options);
	return parseFile(resolve(options.dir, options.name), options);
}
/**
* Reads a custom configuration file from a default or specified location and parses its contents.
* @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The parsed configuration object.
* @deprecated Use {@link readUserConfig} instead, which uses `~/.config` following XDG conventions.
*/
function readUser(options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || homedir();
	return read(options);
}
/**
* Serialises a configuration object to a string format.
* @param {RC} config - The configuration object to serialise. See {@link RC}.
* @returns {string} - The serialised configuration string.
*/
function serialize(config) {
	return Object.entries(flatten(config)).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join("\n");
}
/**
* Writes a configuration object to a file in a default or specified location.
* @param {RC} config - The configuration object to write. See {@link RC}.
* @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
*/
function write(config, options) {
	options = withDefaults(options);
	writeFileSync(resolve(options.dir, options.name), serialize(config), { encoding: "utf8" });
}
/**
* Writes a custom configuration object to a file in a default or specified location.
* @param {RC} config - The configuration object to write. See {@link RC}.
* @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @deprecated Use {@link writeUserConfig} instead, which uses `~/.config` following XDG conventions.
*/
function writeUser(config, options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || homedir();
	write(config, options);
}
/**
* Reads a configuration file from `$XDG_CONFIG_HOME` or `$HOME/.config` and parses its contents.
* @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The parsed configuration object.
*/
function readUserConfig(options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || resolve(homedir(), ".config");
	return read(options);
}
/**
* Writes a configuration object to a file in `$XDG_CONFIG_HOME` or `$HOME/.config`.
* @param {RC} config - The configuration object to write. See {@link RC}.
* @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
*/
function writeUserConfig(config, options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || resolve(homedir(), ".config");
	write(config, options);
}
/**
* Updates a configuration object in `$XDG_CONFIG_HOME` or `$HOME/.config` by merging and writing the result.
* @param {RC} config - The configuration object to update. See {@link RC}.
* @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The updated configuration object.
*/
function updateUserConfig(config, options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || resolve(homedir(), ".config");
	return update(config, options);
}
/**
* Updates an existing configuration object by merging it with the contents of a configuration file and writing the result.
* @param {RC} config - The configuration object to update. See {@link RC}.
* @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The updated configuration object. See {@link RC}.
*/
function update(config, options) {
	options = withDefaults(options);
	if (!options.flat) config = unflatten(config, { overwrite: true });
	const newConfig = defu(config, read(options));
	write(newConfig, options);
	return newConfig;
}
/**
* Updates a custom configuration object by merging it with the contents of a configuration file in a default location and writing the result.
* @param {RC} config - The configuration object to update. See {@link RC}.
* @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
* @returns {RC} - The updated configuration object. See {@link RC}.
* @deprecated Use {@link updateUserConfig} instead, which uses `~/.config` following XDG conventions.
*/
function updateUser(config, options) {
	options = withDefaults(options);
	options.dir = process.env.XDG_CONFIG_HOME || homedir();
	return update(config, options);
}
//#endregion
export { defaults, parse, parseFile, read, readUser, readUserConfig, serialize, update, updateUser, updateUserConfig, write, writeUser, writeUserConfig };
