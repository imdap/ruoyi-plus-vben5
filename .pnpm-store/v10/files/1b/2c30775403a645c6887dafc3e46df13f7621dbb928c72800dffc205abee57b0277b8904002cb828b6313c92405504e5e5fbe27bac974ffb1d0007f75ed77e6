'use strict';

const unplugin = require('unplugin');
const index = require('./index.cjs');
require('debug');
require('@intlify/shared');
require('pathe');
require('@intlify/bundle-utils');
require('@rollup/pluginutils');
require('fast-glob');
require('node:fs');
require('node:path');
require('vue/compiler-sfc');
require('picocolors');
require('@eslint-community/eslint-utils');
require('@intlify/vue-i18n-extensions');
require('@typescript-eslint/scope-manager');

const webpack = unplugin.createWebpackPlugin(index.unpluginFactory);

module.exports = webpack;
