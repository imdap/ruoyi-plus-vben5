import { defu } from 'defu';
import { defineNuxtModule, createResolver, addPlugin, addImportsDir, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "@vueuse/motion",
    configKey: "motion"
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.public.motion = defu(nuxt.options.runtimeConfig.public.motion || {}, options);
    addPlugin(resolve("./runtime/templates/motion"));
    addImportsDir(resolve("./runtime/composables"));
    addComponent({
      name: "Motion",
      export: "MotionComponent",
      filePath: "@vueuse/motion"
    });
    addComponent({
      name: "MotionGroup",
      export: "MotionGroupComponent",
      filePath: "@vueuse/motion"
    });
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = [];
    const transpileList = ["defu", "@vueuse/motion", "@vueuse/shared", "@vueuse/core"];
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName);
    });
  }
});

export { module as default };
