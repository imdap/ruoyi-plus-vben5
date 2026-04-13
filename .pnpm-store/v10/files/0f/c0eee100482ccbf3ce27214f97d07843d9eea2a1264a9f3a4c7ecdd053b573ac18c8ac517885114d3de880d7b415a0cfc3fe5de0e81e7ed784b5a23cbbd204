import { ESLint, Linter } from 'eslint'
interface PluginConfigs extends Record<
  string,
  Linter.LegacyConfig | Linter.Config[] | Linter.Config
> {
  'recommended-alphabetical-legacy': Linter.LegacyConfig
  'recommended-line-length-legacy': Linter.LegacyConfig
  'recommended-natural-legacy': Linter.LegacyConfig
  'recommended-custom-legacy': Linter.LegacyConfig
  'recommended-alphabetical': Linter.Config
  'recommended-line-length': Linter.Config
  'recommended-natural': Linter.Config
  'recommended-custom': Linter.Config
}
export declare let rules: ESLint.Plugin['rules']
export declare let configs: PluginConfigs
declare const _default: {
  configs: PluginConfigs
} & ESLint.Plugin
export default _default
