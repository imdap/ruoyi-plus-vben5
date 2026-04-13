import { ComponentResolver } from "unplugin-vue-components";

//#region src/index.d.ts
interface AntdvNextResolverOptions {
  /**
   * Set the components or icons that do not require automatic import.
   *
   * @default []
   */
  exclude?: FilterPattern;
  /**
   * Automatically import [@antdv-next/icons](https://www.antdv-next.com/components/icon-cn) icons library.
   *
   * requires package `@antdv-next/icons`
   *
   * @default false
   */
  resolveIcons?: boolean;
}
type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;
/**
 * Resolver for [Antdv Next](https://antdv-next.com)
 */
declare function AntdvNextResolver(options?: AntdvNextResolverOptions): ComponentResolver;
//#endregion
export { AntdvNextResolver, AntdvNextResolverOptions, FilterPattern };