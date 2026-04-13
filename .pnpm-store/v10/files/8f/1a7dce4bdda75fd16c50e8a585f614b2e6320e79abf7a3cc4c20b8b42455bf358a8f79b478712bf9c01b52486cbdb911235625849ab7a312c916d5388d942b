import { createVitePlugin } from 'unplugin';
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

const vite = createVitePlugin(unpluginFactory);

export { vite as default };
