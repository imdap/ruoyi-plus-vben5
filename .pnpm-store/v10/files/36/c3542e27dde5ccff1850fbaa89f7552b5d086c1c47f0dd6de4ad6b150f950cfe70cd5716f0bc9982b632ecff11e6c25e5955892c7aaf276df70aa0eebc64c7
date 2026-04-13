"use strict";

const path = require("path");

/**
 * Gets the module version from package name
 */
module.exports = function getModuleVersion(...moduleNames) {
  const packageName = moduleNames.pop();

  let ownerModuleRootPath = process.cwd();
  for (const ownerNames of moduleNames) {
    ownerModuleRootPath =
      getModuleRootPath(ownerNames, ownerModuleRootPath) || ownerModuleRootPath;
  }
  try {
    const m = require("module");
    const relativeTo = path.join(ownerModuleRootPath, "__placeholder__.js");
    // eslint-disable-next-line n/no-unsupported-features/node-builtins -- ignore
    return m.createRequire(relativeTo)(`${packageName}/package.json`).version;
  } catch {
    // ignore
  }
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    // ignore
  }

  return null;
};

/**
 * Get module root path
 */
function getModuleRootPath(packageName, ownerModuleRootPath) {
  try {
    const m = require("module");
    const relativeTo = path.join(ownerModuleRootPath, "__placeholder__.js");

    return path.dirname(
      // eslint-disable-next-line n/no-unsupported-features/node-builtins -- ignore
      m.createRequire(relativeTo).resolve(`${packageName}/package.json`),
    );
  } catch {
    // ignore
  }
  try {
    return path.dirname(require.resolve(`${packageName}/package.json`));
  } catch {
    // ignore
  }

  return null;
}
