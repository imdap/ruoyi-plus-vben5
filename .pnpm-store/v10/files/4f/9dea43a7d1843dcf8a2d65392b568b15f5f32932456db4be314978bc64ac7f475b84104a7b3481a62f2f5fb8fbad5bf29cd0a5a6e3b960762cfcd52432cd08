"use strict";

const extensions = [
  // https://github.com/withastro/language-tools/blob/main/packages/vscode/package.json
  ".astro",
];
module.exports = {
  overrides: [
    {
      files: extensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: "postcss-html",
    },
  ],
};
