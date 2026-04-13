"use strict";
// Copyright 2022 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbeddedCompiler = getEmbeddedCompiler;
const fs_1 = require("fs");
const p = require("path");
const shell = require("shelljs");
const compiler_module_1 = require("../lib/src/compiler-module");
const utils = require("./utils");
/**
 * Downloads and builds the Embedded Dart Sass compiler.
 *
 * Can check out and build the source from a Git `ref` or build from the source
 * at `path`. By default, checks out the latest revision from GitHub.
 *
 * The embedded compiler will be built as dart snapshot by default, or pure node
 * js if the `js` option is `true`.
 */
async function getEmbeddedCompiler(options) {
    const repo = 'dart-sass';
    let source;
    if (options !== undefined && 'path' in options) {
        source = options.path;
    }
    else {
        utils.fetchRepo({
            repo,
            outPath: 'build',
            ref: options?.ref ?? 'main',
        });
        source = p.join('build', repo);
    }
    // Make sure the compiler sees the same version of the language repo that the
    // host is using, but if they're already the same directory (as in the Dart
    // Sass CI environment) we don't need to do anything.
    const languageInHost = p.resolve('build/sass');
    const languageInCompiler = p.resolve(p.join(source, 'build/language'));
    if (!(await utils.sameTarget(languageInHost, languageInCompiler))) {
        await utils.cleanDir(languageInCompiler);
        await utils.link(languageInHost, languageInCompiler);
    }
    const js = options?.js ?? false;
    buildDartSassEmbedded(source, js);
    const jsModulePath = p.resolve('node_modules/sass');
    const dartModulePath = p.resolve(p.join('node_modules', compiler_module_1.compilerModule));
    if (js) {
        await fs_1.promises.rm(dartModulePath, { force: true, recursive: true });
        await utils.link(p.join(source, 'build/npm'), jsModulePath);
    }
    else {
        await fs_1.promises.rm(jsModulePath, { force: true, recursive: true });
        await utils.link(p.join(source, 'build'), p.join(dartModulePath, repo));
    }
}
// Builds the Embedded Dart Sass executable from the source at `repoPath`.
function buildDartSassEmbedded(repoPath, js) {
    console.log("Downloading Dart Sass's dependencies.");
    shell.exec('dart pub upgrade', {
        cwd: repoPath,
        silent: true,
    });
    if (js) {
        shell.exec('npm install', {
            cwd: repoPath,
            silent: true,
        });
        console.log('Building the Dart Sass npm package.');
        shell.exec('dart run grinder protobuf pkg-npm-dev', {
            cwd: repoPath,
            env: { ...process.env, UPDATE_SASS_PROTOCOL: 'false' },
        });
    }
    else {
        console.log('Building the Dart Sass executable.');
        shell.exec('dart run grinder protobuf pkg-standalone-dev', {
            cwd: repoPath,
            env: { ...process.env, UPDATE_SASS_PROTOCOL: 'false' },
        });
    }
}
//# sourceMappingURL=get-embedded-compiler.js.map