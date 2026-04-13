(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VxeResolver = VxeResolver;
  function VxeResolver(options) {
    var opts = Object.assign({
      esm: true,
      importStyle: true
    }, options);
    return {
      esm: opts.esm,
      libraryName: opts.libraryName,
      importStyle: opts.importStyle,
      resolve: function resolve(_ref) {
        var name = _ref.name,
          dirName = _ref.dirName;
        var libPath = "".concat(opts.libraryName, "/").concat(opts.esm ? 'es' : 'lib');
        // 兼容老版本
        if (name === 'VXETable') {
          dirName = 'v-x-e-table';
        }
        if (opts.importStyle) {
          return {
            from: {
              jsPath: "".concat(libPath, "/").concat(dirName, "/index.js"),
              stylePath: "".concat(libPath, "/").concat(dirName, "/style.css")
            }
          };
        }
        return {
          from: "".concat(libPath, "/").concat(dirName, "/index.js")
        };
      }
    };
  }
});