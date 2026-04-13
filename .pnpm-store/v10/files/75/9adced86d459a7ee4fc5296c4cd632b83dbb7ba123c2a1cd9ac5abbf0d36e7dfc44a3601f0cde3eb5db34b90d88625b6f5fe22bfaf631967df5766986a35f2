import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { a as readPackageUpSync, n as normalizePackageData } from './dependencies.js';
import { joinFlagKeys, decamelizeFlagKey } from './utils.js';

const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

const validateOptions = options => {
	if (!isObject(options.flags)) {
		throw new TypeError('The `flags` option must be an object.');
	}

	if (options.input !== undefined && typeof options.input !== 'string' && !isObject(options.input)) {
		throw new TypeError('The `input` option must be a string or an object.');
	}

	if (isObject(options.input) && Object.hasOwn(options.input, 'isRequired') && typeof options.input.isRequired !== 'boolean' && typeof options.input.isRequired !== 'function') {
		throw new TypeError('The `input.isRequired` option must be a boolean or a function.');
	}

	if (options.commands !== undefined) {
		if (!Array.isArray(options.commands)) {
			throw new TypeError('The `commands` option must be an array of strings.');
		}

		if (options.commands.length === 0) {
			throw new TypeError('The `commands` option must contain at least one command.');
		}

		if (options.commands.some(command => typeof command !== 'string' || command === '' || command.startsWith('-') || /\s/.test(command))) {
			throw new TypeError('The `commands` option must be an array of non-empty strings without whitespace that do not start with `-`.');
		}
	}

	const invalidOptionFilters = {
		flags: {
			keyContainsDashes: {
				filter: ([flagKey]) => flagKey.includes('-') && flagKey !== '--',
				message: flagKeys => `Flag keys may not contain '-'. Invalid flags: ${joinFlagKeys(flagKeys, '')}`,
			},
			aliasIsSet: {
				filter: ([, flag]) => Object.hasOwn(flag, 'alias'),
				message: flagKeys => `The option \`alias\` has been renamed to \`shortFlag\`. The following flags need to be updated: ${joinFlagKeys(flagKeys)}`,
			},
			choicesNotAnArray: {
				filter: ([, flag]) => Object.hasOwn(flag, 'choices') && !Array.isArray(flag.choices),
				message: flagKeys => `The option \`choices\` must be an array. Invalid flags: ${joinFlagKeys(flagKeys)}`,
			},
			choicesNotMatchFlagType: {
				filter: ([, flag]) => flag.type && Array.isArray(flag.choices) && flag.choices.some(choice => typeof choice !== flag.type),
				message(flagKeys) {
					const flagKeysAndTypes = flagKeys.map(flagKey => `(\`${decamelizeFlagKey(flagKey)}\`, type: '${options.flags[flagKey].type}')`);
					return `Each value of the option \`choices\` must be of the same type as its flag. Invalid flags: ${flagKeysAndTypes.join(', ')}`;
				},
			},
			defaultNotInChoices: {
				filter: ([, flag]) => Object.hasOwn(flag, 'default') && Array.isArray(flag.choices) && ![flag.default].flat().every(value => flag.choices.includes(value)),
				message: flagKeys => `Each value of the option \`default\` must exist within the option \`choices\`. Invalid flags: ${joinFlagKeys(flagKeys)}`,
			},
		},
	};

	const errorMessages = [];

	for (const [optionKey, filters] of Object.entries(invalidOptionFilters)) {
		const optionEntries = Object.entries(options[optionKey]);

		for (const {filter, message} of Object.values(filters)) {
			const invalidOptions = optionEntries.filter(option => filter(option));
			const invalidOptionKeys = invalidOptions.map(([key]) => key);

			if (invalidOptions.length > 0) {
				errorMessages.push(message(invalidOptionKeys));
			}
		}
	}

	if (errorMessages.length > 0) {
		throw new Error(errorMessages.join('\n'));
	}
};

const buildOptions = (helpText, options) => {
	if (typeof helpText !== 'string') {
		options = helpText;
		helpText = '';
	}

	if (!options.importMeta?.url) {
		throw new TypeError('The `importMeta` option is required. Its value must be `import.meta`.');
	}

	const foundPackage = options.pkg ?? readPackageUpSync({
		cwd: path.dirname(fileURLToPath(options.importMeta.url)),
		normalize: false,
	})?.packageJson;

	const pkg = foundPackage ?? {};
	let isPackageNormalized = false;
	const getPackage = () => {
		if (!isPackageNormalized) {
			normalizePackageData(pkg);
			isPackageNormalized = true;
		}

		return pkg;
	};

	const parsedOptions = {
		argv: process.argv.slice(2),
		inferType: false,
		input: 'string',
		description: pkg.description ?? false,
		help: helpText,
		version: pkg.version || 'No version found',
		autoHelp: true,
		autoVersion: true,
		booleanDefault: false,
		allowUnknownFlags: true,
		helpIndent: 2,
		...options,
		pkg,
		getPackage,
	};

	if (parsedOptions.flags === undefined) {
		parsedOptions.flags = {};
	}

	validateOptions(parsedOptions);

	const inputOptions = parsedOptions.input;

	if (inputOptions && typeof inputOptions === 'object' && !Array.isArray(inputOptions)) {
		const {isRequired, ...inputArgumentOptions} = inputOptions;

		parsedOptions.inputOptions = isRequired === undefined ? {} : {isRequired};
		parsedOptions.input = Object.keys(inputArgumentOptions).length > 0 ? inputArgumentOptions : 'string';
	} else {
		parsedOptions.inputOptions = {};
	}

	return parsedOptions;
};

export { buildOptions };
