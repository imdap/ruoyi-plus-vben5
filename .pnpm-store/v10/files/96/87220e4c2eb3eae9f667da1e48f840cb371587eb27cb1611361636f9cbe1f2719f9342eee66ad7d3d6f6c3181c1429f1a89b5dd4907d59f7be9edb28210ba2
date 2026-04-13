'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var yaml = require('js-yaml');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var yaml__default = /*#__PURE__*/_interopDefault(yaml);

const mdRegex = /\s*---([^]*?)\n\s*---(\s*(?:\n|$)[^]*)/;
const EXAMPLE_FORMAT = `---\n"package-name": patch\n---`;
const validVersionTypes = ["major", "minor", "patch", "none"];
function truncate(s, max = 200) {
  return s.length > max ? s.slice(0, max) + "..." : s;
}
function validateReleases(releases, contents) {
  for (const release of releases) {
    if (typeof release.name !== "string" || release.name.trim() === "") {
      throw new Error(`could not parse changeset - invalid package name in frontmatter.\n` + `Expected a non-empty string for package name, but got: ${JSON.stringify(release.name)}\n` + `Changeset contents:\n${truncate(contents)}`);
    }
    if (typeof release.type !== "string") {
      throw new Error(`could not parse changeset - invalid release type for package "${release.name}".\n` + `Expected a string for release type, but got: ${typeof release.type}\n` + `Changeset contents:\n${truncate(contents)}`);
    }
    if (!validVersionTypes.includes(release.type)) {
      throw new Error(`could not parse changeset - invalid version type ${JSON.stringify(release.type)} for package "${release.name}".\n` + `Valid version types are: ${validVersionTypes.join(", ")}\n` + `Changeset contents:\n${truncate(contents)}`);
    }
  }
}
function parseChangesetFile(contents) {
  const trimmedContents = contents.trim();
  if (!trimmedContents) {
    throw new Error(`could not parse changeset - file is empty.\n` + `Changesets must have frontmatter with package names and version types.\n` + `Example:\n${EXAMPLE_FORMAT}\n\nYour changeset summary here.`);
  }
  const execResult = mdRegex.exec(contents);
  if (!execResult) {
    throw new Error(`could not parse changeset - missing or invalid frontmatter.\n` + `Changesets must start with frontmatter delimited by "---".\n` + `Example:\n${EXAMPLE_FORMAT}\n\nYour changeset summary here.\n` + `Received content:\n${truncate(trimmedContents)}`);
  }
  let [, roughReleases, roughSummary] = execResult;
  let summary = roughSummary.trim();
  let releases;
  let yamlStuff;
  try {
    yamlStuff = yaml__default["default"].load(roughReleases);
  } catch (e) {
    throw new Error(`could not parse changeset - invalid YAML in frontmatter.\n` + `The frontmatter between the "---" delimiters must be valid YAML.\n` + `YAML error: ${e instanceof Error ? e.message : String(e)}\n` + `Frontmatter content:\n${roughReleases}`);
  }
  if (yamlStuff) {
    if (typeof yamlStuff !== "object" || Array.isArray(yamlStuff)) {
      throw new Error(`could not parse changeset - frontmatter must be an object mapping package names to version types.\n` + `Expected format:\n${EXAMPLE_FORMAT}\n` + `Received:\n${roughReleases}`);
    }
    releases = Object.entries(yamlStuff).map(([name, type]) => ({
      name,
      type
    }));
  } else {
    releases = [];
  }
  validateReleases(releases, contents);
  return {
    releases,
    summary
  };
}

exports["default"] = parseChangesetFile;
