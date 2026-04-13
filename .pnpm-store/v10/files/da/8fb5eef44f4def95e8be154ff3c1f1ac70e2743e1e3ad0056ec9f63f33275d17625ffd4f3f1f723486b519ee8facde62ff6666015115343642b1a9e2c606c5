"use strict";

const baseRules = require("./vue-specific-rules");

module.exports = {
  ...baseRules,
  ...(baseRules["function-no-unknown"] ? { "function-no-unknown": null } : {}),
  ...(baseRules["declaration-property-value-no-unknown"]
    ? { "declaration-property-value-no-unknown": null }
    : {}),
};
