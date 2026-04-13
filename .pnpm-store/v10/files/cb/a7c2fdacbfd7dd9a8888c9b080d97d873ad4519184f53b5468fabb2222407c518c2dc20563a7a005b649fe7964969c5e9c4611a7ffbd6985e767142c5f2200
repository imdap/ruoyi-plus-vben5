"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tsconfigParser;
const requirePackageName = require('require-package-name');
const {
  readFileSync
} = require('fs');
const JSON5 = require('json5');
function tsconfigParser(filePath, deps) {
  var _tsconfigJson$compile;
  const content = readFileSync(filePath, {
    encoding: 'utf8'
  });
  const foundDeps = [];
  // Typescript uses 'jsonc-parser' to parse tsconfig.json, but json5 is a superset of jsonc syntax (JSON + js comments)
  const tsconfigJson = JSON5.parse(content);
  const types = (_tsconfigJson$compile = tsconfigJson.compilerOptions) === null || _tsconfigJson$compile === void 0 ? void 0 : _tsconfigJson$compile.types;
  if (types) {
    types.forEach(pkg => {
      const typesPkg = `@types/${pkg}`;
      if (!deps.includes(typesPkg) && (deps.includes(pkg) || /[@/]/.test(pkg))) {
        foundDeps.push(pkg);
      } else {
        foundDeps.push(typesPkg);
      }
    });
  }
  if (tsconfigJson.extends) {
    foundDeps.push(tsconfigJson.extends);
  }
  return foundDeps.map(p => requirePackageName(p)).filter(Boolean);
}
module.exports = exports.default;