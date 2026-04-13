import {
  yellow
} from "./chunk-LKBIOQSP.js";

// src/constants.ts
var FILE_SW_REGISTER = "registerSW.js";
var VIRTUAL_MODULES_MAP = {
  "virtual:pwa-register": "register",
  "virtual:pwa-register/vue": "vue",
  "virtual:pwa-register/svelte": "svelte",
  "virtual:pwa-register/react": "react",
  "virtual:pwa-register/preact": "preact",
  "virtual:pwa-register/solid": "solid"
};
var VIRTUAL_MODULES_RESOLVE_PREFIX = "/@vite-plugin-pwa/";
var VIRTUAL_MODULES = Object.keys(VIRTUAL_MODULES_MAP);
var defaultInjectManifestVitePlugins = [
  "alias",
  "commonjs",
  "vite:resolve",
  "vite:esbuild",
  "replace",
  "vite:define",
  "rollup-plugin-dynamic-import-variables",
  "vite:esbuild-transpile",
  "vite:json",
  "vite:terser"
];
var PWA_INFO_VIRTUAL = "virtual:pwa-info";
var RESOLVED_PWA_INFO_VIRTUAL = `\0${PWA_INFO_VIRTUAL}`;
var PWA_ASSETS_HEAD_VIRTUAL = "virtual:pwa-assets/head";
var RESOLVED_PWA_ASSETS_HEAD_VIRTUAL = `\0${PWA_ASSETS_HEAD_VIRTUAL}`;
var PWA_ASSETS_ICONS_VIRTUAL = "virtual:pwa-assets/icons";
var RESOLVED_PWA_ASSETS_ICONS_VIRTUAL = `\0${PWA_ASSETS_ICONS_VIRTUAL}`;
var DEV_SW_NAME = "dev-sw.js?dev-sw";
var DEV_SW_VIRTUAL = `${VIRTUAL_MODULES_RESOLVE_PREFIX}pwa-entry-point-loaded`;
var RESOLVED_DEV_SW_VIRTUAL = `\0${DEV_SW_VIRTUAL}`;
var DEV_READY_NAME = "vite-pwa-plugin:dev-ready";
var DEV_REGISTER_SW_NAME = "vite-plugin-pwa:register-sw";
var DEV_PWA_ASSETS_NAME = "vite-plugin-pwa:pwa-assets";

// src/pwa-assets/utils.ts
function mapLink(includeId, link) {
  const linkObject = {
    href: link.href,
    rel: link.rel
  };
  if (includeId && link.id)
    linkObject.id = link.id;
  if ("media" in link && link.media)
    linkObject.media = link.media;
  linkObject.href = link.href;
  if ("sizes" in link && link.sizes)
    linkObject.sizes = link.sizes;
  if ("type" in link && link.type)
    linkObject.type = link.type;
  return linkObject;
}
function extractIcons(instructions) {
  const icons = {
    favicon: {},
    transparent: {},
    maskable: {},
    apple: {},
    appleSplashScreen: {}
  };
  if (instructions) {
    Array.from(Object.values(instructions.favicon)).forEach(({ buffer: _buffer, ...rest }) => {
      if (rest.url)
        icons.favicon[rest.url] = { ...rest };
    });
    Array.from(Object.values(instructions.transparent)).forEach(({ buffer: _buffer, ...rest }) => {
      if (rest.url)
        icons.transparent[rest.url] = { ...rest };
    });
    Array.from(Object.values(instructions.maskable)).forEach(({ buffer: _buffer, ...rest }) => {
      if (rest.url)
        icons.maskable[rest.url] = { ...rest };
    });
    Array.from(Object.values(instructions.apple)).forEach(({ buffer: _buffer, ...rest }) => {
      if (rest.url)
        icons.apple[rest.url] = { ...rest };
    });
    Array.from(Object.values(instructions.appleSplashScreen)).forEach(({ buffer: _buffer, ...rest }) => {
      if (rest.url)
        icons.appleSplashScreen[rest.url] = { ...rest };
    });
  }
  return icons;
}

// src/html.ts
function generateSimpleSWRegister(options, dev) {
  const path = dev ? `${options.base}${DEV_SW_NAME}` : `${options.buildBase}${options.filename}`;
  if (dev) {
    const swType = options.devOptions.type ?? "classic";
    return `if('serviceWorker' in navigator) navigator.serviceWorker.register('${path}', { scope: '${options.scope}', type: '${swType}' })`;
  }
  return `
if('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('${path}', { scope: '${options.scope}' })
})
}`.replace(/\n/g, "");
}
function checkForHtmlHead(html) {
  if (!html.includes("</head>")) {
    if (!html.includes("<body>")) {
      console.warn([
        "",
        yellow("PWA WARNING:"),
        "</head> and <body> tags not found in the html, the service worker and web manifest will not be injected."
      ].join("\n"));
      return html;
    } else {
      console.warn([
        "",
        yellow("PWA WARNING:"),
        "</head> not found in the html, adding it to the html tag: add empty <head></head> to your html to remove this warning."
      ].join("\n"));
    }
    return html.replace("<body>", `<head>
</head>
<body>`);
  }
  return html;
}
function injectServiceWorker(html, options, dev) {
  const manifest = generateWebManifest(options, dev);
  if (!dev) {
    const script = generateRegisterSW(options, dev);
    if (script) {
      return checkForHtmlHead(html).replace(
        "</head>",
        `${manifest}${script}</head>`
      );
    }
  }
  return checkForHtmlHead(html).replace(
    "</head>",
    `${manifest}</head>`
  );
}
function generateWebManifest(options, dev) {
  const crossorigin = options.useCredentials ? ' crossorigin="use-credentials"' : "";
  if (dev) {
    const name = options.devOptions.webManifestUrl ?? `${options.base}${options.manifestFilename}`;
    return options.manifest ? `<link rel="manifest" href="${name}"${crossorigin}>` : "";
  } else {
    return options.manifest ? `<link rel="manifest" href="${options.buildBase}${options.manifestFilename}"${crossorigin}>` : "";
  }
}
function generateRegisterSW(options, dev) {
  if (options.injectRegister === "inline") {
    return `<script id="vite-plugin-pwa:inline-sw">${generateSimpleSWRegister(options, dev)}</script>`;
  } else if (options.injectRegister === "script" || options.injectRegister === "script-defer") {
    const hasDefer = options.injectRegister === "script-defer";
    return `<script id="vite-plugin-pwa:register-sw" src="${dev ? options.base : options.buildBase}${FILE_SW_REGISTER}"${hasDefer ? " defer" : ""}></script>`;
  }
  return void 0;
}
function generateRegisterDevSW(base) {
  const path = `${base.endsWith("/") ? base : `${base}/`}${DEV_SW_VIRTUAL.slice(1)}`;
  return `<script id="vite-plugin-pwa:register-dev-sw" type="module">
import registerDevSW from '${path}';
registerDevSW();
</script>`;
}
function generateSWHMR() {
  return `
import.meta.hot.on('${DEV_REGISTER_SW_NAME}', ({ mode, inlinePath, registerPath, scope, swType = 'classic' }) => {
  if (mode == 'inline') {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register(inlinePath, { scope, type: swType });
    }
  }
  else {
    const registerSW = document.createElement('script');
    registerSW.setAttribute('id', 'vite-plugin-pwa:register-sw');
    if (mode === 'script-defer') registerSW.setAttribute('defer', 'defer');
    registerSW.setAttribute('src', registerPath);
    document.head.appendChild(registerSW);
  }
});
import.meta.hot.on('${DEV_PWA_ASSETS_NAME}', ({ themeColor, links }) => {
  if (themeColor) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = themeColor.content;
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', themeColor.content);
      document.head.appendChild(meta);
    }
  }
  if (links) {
    links.map((l) => {
      const link = document.querySelector(\`link[href="\${l.href}"]\`) ?? document.createElement('link');
      if (l.id) link.setAttribute('id', l.id);
      else link.removeAttribute('id');
      link.setAttribute('rel', l.rel);
      link.setAttribute('href', l.href);
      if (l.media) link.setAttribute('media', l.media);
      else link.removeAttribute('media');
      if (l.sizes) link.setAttribute('sizes', l.sizes);
      else link.removeAttribute('sizes');
      if (l.type) link.setAttribute('type', l.type);
      else link.removeAttribute('type');
      if (!link.parentNode) document.head.appendChild(link);
    });
  }  
});  
function registerDevSW() {
  try {
    import.meta.hot.send('${DEV_READY_NAME}');
  } catch (e) {
    console.error('unable to send ${DEV_READY_NAME} message to register service worker in dev mode!', e);
  }
}
export default registerDevSW;
`;
}

export {
  FILE_SW_REGISTER,
  VIRTUAL_MODULES_MAP,
  VIRTUAL_MODULES_RESOLVE_PREFIX,
  VIRTUAL_MODULES,
  defaultInjectManifestVitePlugins,
  PWA_INFO_VIRTUAL,
  RESOLVED_PWA_INFO_VIRTUAL,
  PWA_ASSETS_HEAD_VIRTUAL,
  RESOLVED_PWA_ASSETS_HEAD_VIRTUAL,
  PWA_ASSETS_ICONS_VIRTUAL,
  RESOLVED_PWA_ASSETS_ICONS_VIRTUAL,
  DEV_SW_NAME,
  DEV_SW_VIRTUAL,
  RESOLVED_DEV_SW_VIRTUAL,
  DEV_READY_NAME,
  DEV_REGISTER_SW_NAME,
  DEV_PWA_ASSETS_NAME,
  generateSimpleSWRegister,
  checkForHtmlHead,
  injectServiceWorker,
  generateWebManifest,
  generateRegisterSW,
  generateRegisterDevSW,
  generateSWHMR,
  mapLink,
  extractIcons
};
