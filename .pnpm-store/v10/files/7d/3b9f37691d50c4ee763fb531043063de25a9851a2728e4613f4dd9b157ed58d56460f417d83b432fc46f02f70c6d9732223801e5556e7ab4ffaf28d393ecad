type SFCLangFormat = 'json' | 'json5' | 'yml' | 'yaml';
type VueI18nModule = 'vue-i18n' | 'petite-vue-i18n';
interface PluginOptions {
    include?: string | string[];
    exclude?: string | string[];
    onlyLocales?: string | string[];
    allowDynamic?: boolean;
    module?: VueI18nModule;
    dropMessageCompiler?: boolean;
    runtimeOnly?: boolean;
    compositionOnly?: boolean;
    ssr?: boolean;
    fullInstall?: boolean;
    forceStringify?: boolean;
    defaultSFCLang?: SFCLangFormat;
    globalSFCScope?: boolean;
    strictMessage?: boolean;
    escapeHtml?: boolean;
    optimizeTranslationDirective?: boolean | string | string[];
    transformI18nBlock?: (src: string | Buffer) => string;
}

export type { PluginOptions, SFCLangFormat, VueI18nModule };
