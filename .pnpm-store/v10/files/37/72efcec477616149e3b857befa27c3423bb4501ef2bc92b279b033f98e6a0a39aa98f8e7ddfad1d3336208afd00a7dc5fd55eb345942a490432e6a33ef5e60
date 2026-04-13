import { createWebpackPlugin } from 'unplugin';
import { unpluginFactory } from './index.mjs';
import 'debug';
import '@intlify/shared';
import 'pathe';
import '@intlify/bundle-utils';
import '@rollup/pluginutils';
import 'fast-glob';
import 'node:fs';
import 'node:path';
import 'vue/compiler-sfc';
import 'picocolors';
import '@eslint-community/eslint-utils';
import '@intlify/vue-i18n-extensions';
import '@typescript-eslint/scope-manager';

const webpack = createWebpackPlugin(unpluginFactory);

export { webpack as default };
