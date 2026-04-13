//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let valibot = require("valibot");
valibot = __toESM(valibot);

//#region src/utils/addError.ts
/**
* Adds an error message to the errors array.
*
* @param errors The array of error messages.
* @param message The error message to add.
*
* @returns The new errors.
*/
function addError(errors, message) {
	if (errors) {
		errors.push(message);
		return errors;
	}
	return [message];
}

//#endregion
//#region src/utils/escapeRegExp.ts
const ESCAPE_REGEX = /[.*+?^${}()|[\]\\]/g;
/**
* Escapes special regex characters in a string.
*
* @param string The string to escape.
*
* @returns The escaped string.
*/
function escapeRegExp(string) {
	return string.replace(ESCAPE_REGEX, "\\$&");
}

//#endregion
//#region src/utils/handleError.ts
/**
* Throws an error or logs a warning based on the configuration.
*
* @param message The message to throw or log.
* @param config The conversion configuration.
*/
function handleError(message, config) {
	switch (config?.errorMode) {
		case "ignore": break;
		case "warn":
			console.warn(message);
			break;
		default: throw new Error(message);
	}
}

//#endregion
//#region src/utils/isJsonConstValue.ts
/**
* Whether a value is JSON compatible for a const keyword.
*
* @param value The value to check.
*
* @returns Whether the value is JSON compatible.
*/
function isJsonConstValue(value) {
	return typeof value === "boolean" || typeof value === "number" && Number.isFinite(value) || typeof value === "string";
}

//#endregion
//#region src/utils/isJsonEnumValues.ts
/**
* Whether values are JSON compatible for an enum keyword.
*
* @param values The values to check.
*
* @returns Whether the values are JSON compatible.
*/
function isJsonEnumValues(values) {
	return values.every(isJsonConstValue);
}

//#endregion
//#region src/converters/convertAction/convertAction.ts
/**
* Converts any supported Valibot action to the JSON Schema format.
*
* @param jsonSchema The JSON Schema object.
* @param valibotAction The Valibot action object.
* @param config The conversion configuration.
*
* @returns The converted JSON Schema.
*/
function convertAction(jsonSchema, valibotAction, config) {
	if (config?.ignoreActions?.includes(valibotAction.type)) return jsonSchema;
	let errors;
	switch (valibotAction.type) {
		case "base64":
			jsonSchema.contentEncoding = "base64";
			break;
		case "bic":
		case "cuid2":
		case "decimal":
		case "digits":
		case "domain":
		case "emoji":
		case "hash":
		case "hexadecimal":
		case "hex_color":
		case "isrc":
		case "iso_time_second":
		case "iso_week":
		case "mac":
		case "mac48":
		case "mac64":
		case "nanoid":
		case "octal":
		case "slug":
		case "ulid":
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = valibotAction.requirement.source;
			break;
		case "description":
			jsonSchema.description = valibotAction.description;
			break;
		case "email":
		case "rfc_email":
			jsonSchema.format = "email";
			break;
		case "ends_with":
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = `${escapeRegExp(valibotAction.requirement)}$`;
			break;
		case "empty":
			if (jsonSchema.type === "array") jsonSchema.maxItems = 0;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.maxLength = 0;
			}
			break;
		case "entries":
			jsonSchema.minProperties = valibotAction.requirement;
			jsonSchema.maxProperties = valibotAction.requirement;
			break;
		case "examples":
			if (Array.isArray(jsonSchema.examples)) jsonSchema.examples = [...jsonSchema.examples, ...valibotAction.examples];
			else jsonSchema.examples = valibotAction.examples;
			break;
		case "gt_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "gt_value" action is not supported on type "${jsonSchema.type}".`);
			if (config?.target === "openapi-3.0") {
				errors = addError(errors, "The \"gt_value\" action is not supported for OpenAPI 3.0.");
				break;
			}
			jsonSchema.exclusiveMinimum = valibotAction.requirement;
			break;
		case "includes":
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = escapeRegExp(valibotAction.requirement);
			break;
		case "integer":
			jsonSchema.type = "integer";
			break;
		case "ipv4":
			jsonSchema.format = "ipv4";
			break;
		case "ipv6":
			jsonSchema.format = "ipv6";
			break;
		case "iso_date":
			jsonSchema.format = "date";
			break;
		case "iso_date_time":
		case "iso_timestamp":
			jsonSchema.format = "date-time";
			break;
		case "iso_time":
			jsonSchema.format = "time";
			break;
		case "jws_compact":
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = valibotAction.requirement.source;
			break;
		case "length":
			if (jsonSchema.type === "array") {
				jsonSchema.minItems = valibotAction.requirement;
				jsonSchema.maxItems = valibotAction.requirement;
			} else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = valibotAction.requirement;
				jsonSchema.maxLength = valibotAction.requirement;
			}
			break;
		case "lt_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "lt_value" action is not supported on type "${jsonSchema.type}".`);
			if (config?.target === "openapi-3.0") {
				errors = addError(errors, "The \"lt_value\" action is not supported for OpenAPI 3.0.");
				break;
			}
			jsonSchema.exclusiveMaximum = valibotAction.requirement;
			break;
		case "max_entries":
			jsonSchema.maxProperties = valibotAction.requirement;
			break;
		case "max_length":
			if (jsonSchema.type === "array") jsonSchema.maxItems = valibotAction.requirement;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.maxLength = valibotAction.requirement;
			}
			break;
		case "max_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "max_value" action is not supported on type "${jsonSchema.type}".`);
			jsonSchema.maximum = valibotAction.requirement;
			break;
		case "metadata":
			if (typeof valibotAction.metadata.title === "string") jsonSchema.title = valibotAction.metadata.title;
			if (typeof valibotAction.metadata.description === "string") jsonSchema.description = valibotAction.metadata.description;
			if (Array.isArray(valibotAction.metadata.examples)) if (Array.isArray(jsonSchema.examples)) jsonSchema.examples = [...jsonSchema.examples, ...valibotAction.metadata.examples];
			else jsonSchema.examples = valibotAction.metadata.examples;
			break;
		case "min_entries":
			jsonSchema.minProperties = valibotAction.requirement;
			break;
		case "min_length":
			if (jsonSchema.type === "array") jsonSchema.minItems = valibotAction.requirement;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = valibotAction.requirement;
			}
			break;
		case "min_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "min_value" action is not supported on type "${jsonSchema.type}".`);
			jsonSchema.minimum = valibotAction.requirement;
			break;
		case "multiple_of":
			jsonSchema.multipleOf = valibotAction.requirement;
			break;
		case "non_empty":
			if (jsonSchema.type === "array") jsonSchema.minItems = 1;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = 1;
			}
			break;
		case "not_value":
			if (!isJsonConstValue(valibotAction.requirement)) {
				errors = addError(errors, "The requirement of the \"not_value\" action is not JSON compatible.");
				break;
			}
			if (config?.target === "openapi-3.0") jsonSchema.not = { enum: [valibotAction.requirement] };
			else jsonSchema.not = { const: valibotAction.requirement };
			break;
		case "not_values":
			if (!isJsonEnumValues(valibotAction.requirement)) {
				errors = addError(errors, "A requirement of the \"not_values\" action is not JSON compatible.");
				break;
			}
			jsonSchema.not = { enum: valibotAction.requirement };
			break;
		case "regex":
			if (valibotAction.requirement.flags) errors = addError(errors, "RegExp flags are not supported by JSON Schema.");
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = valibotAction.requirement.source;
			break;
		case "safe_integer":
			jsonSchema.type = "integer";
			if (typeof jsonSchema.minimum !== "number" || jsonSchema.minimum < Number.MIN_SAFE_INTEGER) jsonSchema.minimum = Number.MIN_SAFE_INTEGER;
			if (typeof jsonSchema.maximum !== "number" || jsonSchema.maximum > Number.MAX_SAFE_INTEGER) jsonSchema.maximum = Number.MAX_SAFE_INTEGER;
			break;
		case "starts_with":
			if (jsonSchema.pattern) errors = addError(errors, `The "${valibotAction.type}" action is not supported in combination with another regex action.`);
			else jsonSchema.pattern = `^${escapeRegExp(valibotAction.requirement)}`;
			break;
		case "title":
			jsonSchema.title = valibotAction.title;
			break;
		case "url":
			jsonSchema.format = "uri";
			break;
		case "uuid":
			jsonSchema.format = "uuid";
			break;
		case "value":
			if (!isJsonConstValue(valibotAction.requirement)) {
				errors = addError(errors, "The requirement of the \"value\" action is not JSON compatible.");
				break;
			}
			if (config?.target === "openapi-3.0") jsonSchema.enum = [valibotAction.requirement];
			else jsonSchema.const = valibotAction.requirement;
			break;
		case "values":
			if (!isJsonEnumValues(valibotAction.requirement)) {
				errors = addError(errors, "A requirement of the \"values\" action is not JSON compatible.");
				break;
			}
			jsonSchema.enum = valibotAction.requirement;
			break;
		default: errors = addError(errors, `The "${valibotAction.type}" action cannot be converted to JSON Schema.`);
	}
	if (config?.overrideAction) {
		const actionOverride = config.overrideAction({
			valibotAction,
			jsonSchema,
			errors
		});
		if (actionOverride) return { ...actionOverride };
	}
	if (errors) for (const message of errors) handleError(message, config);
	return jsonSchema;
}

//#endregion
//#region src/converters/convertSchema/convertSchema.ts
/**
* Flattens a Valibot pipe by recursively expanding nested pipes.
*
* @param pipe The pipeline to flatten.
*
* @returns A flat pipeline.
*/
function flattenPipe(pipe) {
	return pipe.flatMap((item) => "pipe" in item ? flattenPipe(item.pipe) : item);
}
let refCount = 0;
/**
* Converts any supported Valibot schema to the JSON Schema format.
*
* @param jsonSchema The JSON Schema object.
* @param valibotSchema The Valibot schema object.
* @param config The conversion configuration.
* @param context The conversion context.
* @param skipRef Whether to skip using a reference.
*
* @returns The converted JSON Schema.
*/
function convertSchema(jsonSchema, valibotSchema, config, context, skipRef = false) {
	if (!skipRef) {
		const referenceId = context.referenceMap.get(valibotSchema);
		if (referenceId) {
			jsonSchema.$ref = `#/$defs/${referenceId}`;
			if (config?.overrideRef) {
				const refOverride = config.overrideRef({
					...context,
					referenceId,
					valibotSchema,
					jsonSchema
				});
				if (refOverride) jsonSchema.$ref = refOverride;
			}
			return jsonSchema;
		}
	}
	if ("pipe" in valibotSchema) {
		const flatPipe = flattenPipe(valibotSchema.pipe);
		let startIndex = 0;
		let stopIndex = flatPipe.length - 1;
		if (config?.typeMode === "input") {
			const inputStopIndex = flatPipe.slice(1).findIndex((item) => item.kind === "schema" || item.kind === "transformation" && (item.type === "find_item" || item.type === "parse_json" || item.type === "raw_transform" || item.type === "reduce_items" || item.type === "stringify_json" || item.type === "to_bigint" || item.type === "to_boolean" || item.type === "to_date" || item.type === "to_number" || item.type === "to_string" || item.type === "transform"));
			if (inputStopIndex !== -1) stopIndex = inputStopIndex;
		} else if (config?.typeMode === "output") {
			const outputStartIndex = flatPipe.findLastIndex((item) => item.kind === "schema");
			if (outputStartIndex !== -1) startIndex = outputStartIndex;
		}
		for (let index = startIndex; index <= stopIndex; index++) {
			const valibotPipeItem = flatPipe[index];
			if (valibotPipeItem.kind === "schema") {
				if (index > startIndex) handleError("Set the \"typeMode\" config to \"input\" or \"output\" to convert pipelines with multiple schemas.", config);
				jsonSchema = convertSchema(jsonSchema, valibotPipeItem, config, context, true);
			} else jsonSchema = convertAction(jsonSchema, valibotPipeItem, config);
		}
		return jsonSchema;
	}
	let errors;
	switch (valibotSchema.type) {
		case "boolean":
			jsonSchema.type = "boolean";
			break;
		case "null":
			if (config?.target === "openapi-3.0") jsonSchema.enum = [null];
			else jsonSchema.type = "null";
			break;
		case "number":
			jsonSchema.type = "number";
			break;
		case "string":
			jsonSchema.type = "string";
			break;
		case "array":
			jsonSchema.type = "array";
			jsonSchema.items = convertSchema({}, valibotSchema.item, config, context);
			break;
		case "tuple":
		case "tuple_with_rest":
		case "loose_tuple":
		case "strict_tuple":
			jsonSchema.type = "array";
			if (config?.target === "openapi-3.0") {
				jsonSchema.items = { anyOf: [] };
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.items.anyOf.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.items.anyOf.push(convertSchema({}, valibotSchema.rest, config, context));
				else if (valibotSchema.type === "strict_tuple" || valibotSchema.type === "tuple") jsonSchema.maxItems = valibotSchema.items.length;
			} else if (config?.target === "draft-2020-12") {
				jsonSchema.prefixItems = [];
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.prefixItems.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.items = convertSchema({}, valibotSchema.rest, config, context);
				else if (valibotSchema.type === "strict_tuple") jsonSchema.items = false;
			} else {
				jsonSchema.items = [];
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.items.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.additionalItems = convertSchema({}, valibotSchema.rest, config, context);
				else if (valibotSchema.type === "strict_tuple") jsonSchema.additionalItems = false;
			}
			break;
		case "object":
		case "object_with_rest":
		case "loose_object":
		case "strict_object":
			jsonSchema.type = "object";
			jsonSchema.properties = {};
			jsonSchema.required = [];
			for (const key in valibotSchema.entries) {
				const entry = valibotSchema.entries[key];
				jsonSchema.properties[key] = convertSchema({}, entry, config, context);
				if (entry.type !== "exact_optional" && entry.type !== "nullish" && entry.type !== "optional") jsonSchema.required.push(key);
			}
			if (valibotSchema.type === "object_with_rest") jsonSchema.additionalProperties = convertSchema({}, valibotSchema.rest, config, context);
			else if (valibotSchema.type === "strict_object") jsonSchema.additionalProperties = false;
			break;
		case "record":
			if (config?.target === "openapi-3.0" && "pipe" in valibotSchema.key) errors = addError(errors, "The \"record\" schema with a schema for the key that contains a \"pipe\" cannot be converted to JSON Schema.");
			if (valibotSchema.key.type !== "string") errors = addError(errors, `The "record" schema with the "${valibotSchema.key.type}" schema for the key cannot be converted to JSON Schema.`);
			jsonSchema.type = "object";
			if (config?.target !== "openapi-3.0") jsonSchema.propertyNames = convertSchema({}, valibotSchema.key, config, context);
			jsonSchema.additionalProperties = convertSchema({}, valibotSchema.value, config, context);
			break;
		case "any":
		case "unknown": break;
		case "never":
			jsonSchema.not = {};
			break;
		case "nullable":
		case "nullish":
			if (config?.target === "openapi-3.0") {
				const innerSchema = convertSchema({}, valibotSchema.wrapped, config, context);
				Object.assign(jsonSchema, innerSchema);
				jsonSchema.nullable = true;
			} else jsonSchema.anyOf = [convertSchema({}, valibotSchema.wrapped, config, context), { type: "null" }];
			if (valibotSchema.default !== void 0) jsonSchema.default = valibot.getDefault(valibotSchema);
			break;
		case "exact_optional":
		case "optional":
		case "undefinedable":
			jsonSchema = convertSchema(jsonSchema, valibotSchema.wrapped, config, context);
			if (valibotSchema.default !== void 0) jsonSchema.default = valibot.getDefault(valibotSchema);
			break;
		case "literal":
			if (typeof valibotSchema.literal !== "boolean" && typeof valibotSchema.literal !== "number" && typeof valibotSchema.literal !== "string") errors = addError(errors, "The value of the \"literal\" schema is not JSON compatible.");
			if (config?.target === "openapi-3.0") jsonSchema.enum = [valibotSchema.literal];
			else jsonSchema.const = valibotSchema.literal;
			break;
		case "enum":
			jsonSchema.enum = valibotSchema.options;
			if (valibotSchema.options.every((option) => typeof option === "string")) jsonSchema.type = "string";
			else if (valibotSchema.options.every((option) => typeof option === "number")) jsonSchema.type = "number";
			else if (config?.target !== "openapi-3.0") jsonSchema.type = ["string", "number"];
			break;
		case "picklist": {
			const hasInvalidOption = valibotSchema.options.some((option) => typeof option !== "number" && typeof option !== "string");
			if (hasInvalidOption) errors = addError(errors, "An option of the \"picklist\" schema is not JSON compatible.");
			jsonSchema.enum = valibotSchema.options;
			if (valibotSchema.options.every((option) => typeof option === "string")) jsonSchema.type = "string";
			else if (valibotSchema.options.every((option) => typeof option === "number")) jsonSchema.type = "number";
			else if (!hasInvalidOption && config?.target !== "openapi-3.0") jsonSchema.type = ["string", "number"];
			break;
		}
		case "union":
			jsonSchema.anyOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "variant":
			jsonSchema.oneOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "intersect":
			jsonSchema.allOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "lazy": {
			let wrappedValibotSchema = context.getterMap.get(valibotSchema.getter);
			if (!wrappedValibotSchema) {
				wrappedValibotSchema = valibotSchema.getter(void 0);
				context.getterMap.set(valibotSchema.getter, wrappedValibotSchema);
			}
			let referenceId = context.referenceMap.get(wrappedValibotSchema);
			if (!referenceId) {
				referenceId = `${refCount++}`;
				context.referenceMap.set(wrappedValibotSchema, referenceId);
				context.definitions[referenceId] = convertSchema({}, wrappedValibotSchema, config, context, true);
			}
			jsonSchema.$ref = `#/$defs/${referenceId}`;
			if (config?.overrideRef) {
				const refOverride = config.overrideRef({
					...context,
					referenceId,
					valibotSchema: wrappedValibotSchema,
					jsonSchema
				});
				if (refOverride) jsonSchema.$ref = refOverride;
			}
			break;
		}
		default: errors = addError(errors, `The "${valibotSchema.type}" schema cannot be converted to JSON Schema.`);
	}
	if (config?.overrideSchema) {
		const schemaOverride = config.overrideSchema({
			...context,
			referenceId: context.referenceMap.get(valibotSchema),
			valibotSchema,
			jsonSchema,
			errors
		});
		if (schemaOverride) return { ...schemaOverride };
	}
	if (errors) for (const message of errors) handleError(message, config);
	return jsonSchema;
}

//#endregion
//#region src/storages/globalDefs/globalDefs.ts
let store;
/**
* Adds new definitions to the global schema definitions.
*
* @param definitions The schema definitions.
*
* @beta
*/
function addGlobalDefs(definitions) {
	store = {
		...store ?? {},
		...definitions
	};
}
/**
* Returns the current global schema definitions.
*
* @returns The schema definitions.
*
* @beta
*/
function getGlobalDefs() {
	return store;
}

//#endregion
//#region src/functions/toJsonSchema/toJsonSchema.ts
/**
* Converts a Valibot schema to the JSON Schema format.
*
* @param schema The Valibot schema object.
* @param config The JSON Schema configuration.
*
* @returns The converted JSON Schema.
*/
function toJsonSchema(schema, config) {
	const context = {
		definitions: {},
		referenceMap: /* @__PURE__ */ new Map(),
		getterMap: /* @__PURE__ */ new Map()
	};
	const definitions = config?.definitions ?? getGlobalDefs();
	if (definitions) {
		for (const key in definitions) context.referenceMap.set(definitions[key], key);
		for (const key in definitions) context.definitions[key] = convertSchema({}, definitions[key], config, context, true);
	}
	const jsonSchema = convertSchema({}, schema, config, context);
	const target = config?.target ?? "draft-07";
	if (target === "draft-2020-12") jsonSchema.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (target === "draft-07") jsonSchema.$schema = "http://json-schema.org/draft-07/schema#";
	if (context.referenceMap.size) jsonSchema.$defs = context.definitions;
	return jsonSchema;
}

//#endregion
//#region src/functions/toJsonSchemaDefs/toJsonSchemaDefs.ts
/**
* Converts Valibot schema definitions to JSON Schema definitions.
*
* @param definitions The Valibot schema definitions.
* @param config The JSON Schema configuration.
*
* @returns The converted JSON Schema definitions.
*/
function toJsonSchemaDefs(definitions, config) {
	const context = {
		definitions: {},
		referenceMap: /* @__PURE__ */ new Map(),
		getterMap: /* @__PURE__ */ new Map()
	};
	for (const key in definitions) context.referenceMap.set(definitions[key], key);
	for (const key in definitions) context.definitions[key] = convertSchema({}, definitions[key], config, context, true);
	return context.definitions;
}

//#endregion
//#region src/functions/toStandardJsonSchema/toStandardJsonSchema.ts
const SUPPORTED_TARGETS = [
	"draft-07",
	"draft-2020-12",
	"openapi-3.0"
];
/**
* Converts a Valibot schema to the Standard JSON Schema format.
*
* @param schema The Valibot schema object.
*
* @returns The Standard JSON Schema.
*/
function toStandardJsonSchema(schema) {
	return { "~standard": {
		...schema["~standard"],
		jsonSchema: {
			input(options) {
				if (SUPPORTED_TARGETS.includes(options.target)) return toJsonSchema(schema, {
					typeMode: "input",
					target: options.target,
					...options.libraryOptions
				});
				throw new Error(`Unsupported target: ${options.target}`);
			},
			output(options) {
				if (SUPPORTED_TARGETS.includes(options.target)) return toJsonSchema(schema, {
					typeMode: "output",
					target: options.target,
					...options.libraryOptions
				});
				throw new Error(`Unsupported target: ${options.target}`);
			}
		}
	} };
}

//#endregion
exports.addGlobalDefs = addGlobalDefs;
exports.getGlobalDefs = getGlobalDefs;
exports.toJsonSchema = toJsonSchema;
exports.toJsonSchemaDefs = toJsonSchemaDefs;
exports.toStandardJsonSchema = toStandardJsonSchema;