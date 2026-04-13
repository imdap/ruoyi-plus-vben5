'use strict';

const node_path = require('node:path');
const ts = require('typescript');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const ts__default = /*#__PURE__*/_interopDefaultCompat(ts);

function createParsedCommandLine(_ts, host, configPath) {
  const config = ts__default.readJsonConfigFile(configPath, host.readFile);
  return ts__default.parseJsonSourceFileConfigFileContent(config, host, node_path.dirname(configPath), {}, configPath);
}
const createProgram = ts__default.createProgram;

exports.createParsedCommandLine = createParsedCommandLine;
exports.createProgram = createProgram;
