"use strict";

const extensions = [
  // https://v3.vuejs.org/api/sfc-spec.html
  ".vue",
];
module.exports = {
  overrides: [
    {
      files: extensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: "postcss-html",
    },
  ],
};
