"use strict";

const extensions = [
  // https://github.com/Microsoft/vscode/blob/master/extensions/html/package.json
  ".html",
  ".htm",
  ".shtml",
  ".xhtml",
  ".xht",
  ".mdoc",
  ".jsp",
  ".asp",
  ".aspx",
  ".jshtm",
  ".volt",
  ".ejs",
  ".rhtml",
];

module.exports = {
  overrides: [
    {
      files: extensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: "postcss-html",
    },
  ],
};
