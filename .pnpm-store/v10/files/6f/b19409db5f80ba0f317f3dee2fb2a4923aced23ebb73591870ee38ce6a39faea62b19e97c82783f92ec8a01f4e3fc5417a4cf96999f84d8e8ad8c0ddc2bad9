"use strict";

const extensions = [
  // https://github.com/Microsoft/vscode/blob/main/extensions/php/package.json
  ".php",
  ".php4",
  ".php5",
  ".phtml",
  ".ctp",
];

module.exports = {
  overrides: [
    {
      files: extensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: "postcss-html",
    },
  ],
};
