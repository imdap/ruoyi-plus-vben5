"use strict";

/**
 * @typedef {Object} Options
 * @property {boolean} [matchInternal=true] a string property of SpecialType
 * @property {boolean} [matchES6=true] a string property of SpecialType
 * @property {boolean} [matchCoffeescript=true] a string property of SpecialType
 * @property {boolean} [matchGruntTask=true] a string property of SpecialType
 */

/**
 * Regular expression for matching require statements.
 *
 * @param {Options} options A string param.
 */
function DepsRegex(options) {
  var regex,
    matchingDeps,
    matchingName = "\\s*(?:[\\w${},\\s*]+)\\s*";

  options = options || {};

  if (options.matchInternal !== false) {
    matchingDeps = "\\s*['\"`]([^'\"`]+)['\"`]\\s*";
  } else {
    matchingDeps = "\\s*['\"`]([^'\"`.]+)['\"`]\\s*";
  }

  regex =
    "(?:(?:var|const|let)" +
    matchingName +
    "=\\s*)?require\\(" +
    matchingDeps +
    "\\);?";

  if (options.matchES6 !== false) {
    regex += "|import(?:" + matchingName + "from\\s*)?" + matchingDeps + ";?";
  }

  if (options.matchCoffeescript !== false) {
    regex += "|(?:" + matchingName + "=\\s*)?require" + matchingDeps + ";?";
  }

  if (options.matchGruntTask !== false) {
    regex += "|grunt(?:.tasks)?.loadNpmTasks\\(" + matchingDeps + "\\);?";
  }

  /** @private */
  this.regex = function () {
    return new RegExp(regex, "g");
  };
}

/**
 * Executes a search on a string using the DepsRegex, and returns an array containing the results of that search.
 *
 * @param {string} string The String object or string literal on which to perform the search.
 */
DepsRegex.prototype.exec = function (string) {
  return this.regex().exec(string);
};

/**
 * Returns a Boolean value that indicates whether or not there is a require statement in a searched string.
 *
 * @param {string} string The String object or string literal on which to perform the search.
 */
DepsRegex.prototype.test = function (string) {
  return this.regex().test(string);
};

/**
 * Returns an array of strings containing the require statements in a searched string.
 *
 * @param {string} string The String object or string literal on which to perform the search.
 */
DepsRegex.prototype.getDependencies = function (string) {
  var matches = [],
    re = this.regex(),
    m = re.exec(string);
  while (m) {
    matches.push(m[1] || m[2] || m[3] || m[4]);
    m = re.exec(string);
  }
  return matches;
};

module.exports = DepsRegex;
