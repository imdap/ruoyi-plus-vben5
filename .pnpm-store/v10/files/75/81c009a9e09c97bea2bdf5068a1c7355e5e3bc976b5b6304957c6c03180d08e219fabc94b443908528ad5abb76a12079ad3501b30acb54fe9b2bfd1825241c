import process from 'node:process';
import { y as yargsParser, t as trimNewlines, r as redent, c as camelcaseKeys } from './dependencies.js';
import { buildOptions } from './options.js';
import { buildParserOptions } from './parser.js';
import { checkUnknownFlags, validate, checkMissingRequiredFlags, checkMissingRequiredInput } from './validate.js';

const getUnscopedPackageName = packageName => {
	if (!packageName.startsWith('@')) {
		return packageName;
	}

	const slashIndex = packageName.indexOf('/');
	return slashIndex === -1 ? packageName : packageName.slice(slashIndex + 1);
};

const getProcessTitle = packageJson => {
	if (!packageJson || typeof packageJson !== 'object') {
		return '';
	}

	const packageName = typeof packageJson.name === 'string' ? packageJson.name : '';
	const unscopedPackageName = getUnscopedPackageName(packageName);
	const {bin} = packageJson;

	if (typeof bin === 'string') {
		return unscopedPackageName;
	}

	if (bin && typeof bin === 'object') {
		return Object.keys(bin).at(0) ?? packageName;
	}

	return packageName;
};

const reportCommandError = (message, commands) => {
	console.error(message);
	console.error(`Available commands: ${commands.join(', ')}`);
};

const parseCommand = (input, options, parserOptions, showHelp) => {
	if (!options.commands) {
		return {command: undefined, input};
	}

	if (input.length === 0) {
		return {command: undefined, input: []};
	}

	const command = String(input[0]);

	if (!options.commands.includes(command)) {
		if (!options.allowUnknownFlags && command.startsWith('-')) {
			// The "command" looks like a flag. Determine whether it genuinely came from
			// before '--' (an unknown parent flag) or after '--' (a post-separator positional
			// being used as the command name). Re-parsing the pre-separator slice is the
			// only reliable way — a simple indexOf would misfire when the same string
			// appears as a flag value earlier in argv.
			const separatorIndex = options.argv.indexOf('--');
			let commandIsAfterSeparator = false;

			if (separatorIndex !== -1) {
				const preArgv = yargsParser(options.argv.slice(0, separatorIndex), parserOptions);
				commandIsAfterSeparator = !preArgv._.map(String).includes(command);
			}

			if (!commandIsAfterSeparator) {
				// Only check flags before the first non-flag argument (the actual command),
				// so child flags meant for subcommands are not reported as unknown.
				const firstNonFlagIndex = input.findIndex(item => typeof item !== 'string' || !item.startsWith('-'));
				const parentFlags = firstNonFlagIndex === -1 ? input : input.slice(0, firstNonFlagIndex);
				checkUnknownFlags(parentFlags);
			}
		}

		reportCommandError(`Unknown command: ${command}`, options.commands);
		showHelp();
		return {command: undefined, input: []};
	}

	return {command, input: input.slice(1)};
};

const buildResult = ({pkg: packageJson, getPackage, ...options}, parserOptions) => {
	const argv = yargsParser(options.argv, parserOptions);
	let help = '';

	if (options.help) {
		help = trimNewlines((options.help || '').replace(/\t+\n*$/, ''));

		if (help.includes('\n')) {
			help = redent(help, options.helpIndent);
		}

		help = `\n${help}`;
	}

	if (options.description !== false) {
		let {description} = options;

		if (description) {
			description = help ? redent(`\n${description}\n`, options.helpIndent) : `\n${description}`;
			help = `${description}${help}`;
		}
	}

	help += '\n';

	const showHelp = code => {
		console.log(help);
		process.exit(typeof code === 'number' ? code : 2); // Default to code 2 for incorrect usage (#47)
	};

	const showVersion = () => {
		console.log(options.version);
		process.exit(0);
	};

	if (argv._.length === 0 && options.argv.length === 1) {
		if (argv.version === true && options.autoVersion) {
			showVersion();
		} else if (argv.help === true && options.autoHelp) {
			showHelp(0);
		}
	}

	const {command, input} = parseCommand(argv._, options, parserOptions, showHelp);

	delete argv._;

	if (!options.allowUnknownFlags && !options.commands) {
		let inputForUnknownFlags = input;
		const separatorIndex = options.argv.indexOf('--');

		if (separatorIndex !== -1 && !Object.hasOwn(options.flags, '--')) {
			const argvBeforeSeparator = yargsParser(options.argv.slice(0, separatorIndex), parserOptions);
			inputForUnknownFlags = argvBeforeSeparator._;
		}

		checkUnknownFlags(inputForUnknownFlags);
	}

	const flags = camelcaseKeys(argv, {exclude: ['--', /^\w$/]});
	const unnormalizedFlags = {...flags};

	validate(flags, options);

	for (const flagValue of Object.values(options.flags)) {
		if (Array.isArray(flagValue.aliases)) {
			for (const alias of flagValue.aliases) {
				delete flags[alias];
			}
		}

		delete flags[flagValue.shortFlag];
	}

	checkMissingRequiredFlags(options.flags, flags, input);
	checkMissingRequiredInput(options, input);

	return {
		input,
		command,
		flags,
		unnormalizedFlags,
		get pkg() {
			return getPackage ? getPackage() : packageJson;
		},
		help,
		showHelp,
		showVersion,
	};
};

const meow = (helpText, options = {}) => {
	const parsedOptions = buildOptions(helpText, options);
	const parserOptions = buildParserOptions(parsedOptions);
	const result = buildResult(parsedOptions, parserOptions);

	process.title = getProcessTitle(parsedOptions.pkg);

	return result;
};

export { meow as default };
