"use strict";

const extensions = [
  // https://github.com/sveltejs/language-tools/blob/master/packages/svelte-vscode/package.json
  ".svelte",
];
module.exports = {
  overrides: [
    {
      files: extensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: "postcss-html",
    },
  ],
};
