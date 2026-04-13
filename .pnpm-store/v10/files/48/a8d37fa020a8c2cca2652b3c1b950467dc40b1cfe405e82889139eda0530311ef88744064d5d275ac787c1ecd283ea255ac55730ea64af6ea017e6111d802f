import Entity, { KeyType } from "./Cache.js";
import { Linter } from "./linters/interface.js";
import "./linters/index.js";
import * as vue7 from "vue";
import { App, PropType, Ref } from "vue";

//#region src/StyleContext.d.ts
declare const ATTR_TOKEN = "data-token-hash";
declare const ATTR_MARK = "data-css-hash";
declare const ATTR_CACHE_PATH = "data-cache-path";
declare const CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
declare function createCache(): vue7.Raw<Entity>;
declare function useStyleContextProvide(props: Ref<StyleContextProps>): void;
declare function provideStyleContext(app: App, props: Ref<StyleContextProps>): void;
declare function useStyleContext(): Ref<{
  autoClear?: boolean /** @private Test only. Not work in production. */ | undefined;
  mock?: "server" | "client"
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  | undefined;
  cache: {
    instanceId: string;
    cache: Map<string, [number, any]> & Omit<Map<string, [number, any]>, keyof Map<any, any>>;
    updateTimes: Map<string, number> & Omit<Map<string, number>, keyof Map<any, any>>;
    extracted: Set<string> & Omit<Set<string>, keyof Set<any>>;
    get: (keys: KeyType[]) => [number, any] | null;
    opGet: (keyPathStr: string) => [number, any] | null;
    update: (keys: KeyType[], valueFn: (origin: [number, any] | null) => [number, any] | null) => void;
    opUpdate: (keyPathStr: string, valueFn: (origin: [number, any] | null) => [number, any] | null) => void;
  };
  defaultCache: boolean;
  hashPriority?: HashPriority /** Tell cssinjs where to inject style in */ | undefined;
  container?: (Element | ShadowRoot) | undefined;
  ssrInline?: boolean /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */ | undefined;
  transformers?: {
    flush?: TransformerFlushCallback<any> | undefined;
    readableType?: undefined | undefined;
    start?: TransformerStartCallback<any> | undefined;
    transform?: TransformerTransformCallback<any, any> | undefined;
    writableType?: undefined | undefined;
  }[] | undefined;
  linters?: Linter[] /** Wrap css in a layer to avoid global style conflict */ | undefined;
  layer?: boolean /** Hardcode here since transformer not support take effect on serialize currently */ | undefined;
  autoPrefix?: boolean | undefined;
}, StyleContextProps | {
  autoClear?: boolean /** @private Test only. Not work in production. */ | undefined;
  mock?: "server" | "client"
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  | undefined;
  cache: {
    instanceId: string;
    cache: Map<string, [number, any]> & Omit<Map<string, [number, any]>, keyof Map<any, any>>;
    updateTimes: Map<string, number> & Omit<Map<string, number>, keyof Map<any, any>>;
    extracted: Set<string> & Omit<Set<string>, keyof Set<any>>;
    get: (keys: KeyType[]) => [number, any] | null;
    opGet: (keyPathStr: string) => [number, any] | null;
    update: (keys: KeyType[], valueFn: (origin: [number, any] | null) => [number, any] | null) => void;
    opUpdate: (keyPathStr: string, valueFn: (origin: [number, any] | null) => [number, any] | null) => void;
  };
  defaultCache: boolean;
  hashPriority?: HashPriority /** Tell cssinjs where to inject style in */ | undefined;
  container?: (Element | ShadowRoot) | undefined;
  ssrInline?: boolean /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */ | undefined;
  transformers?: {
    flush?: TransformerFlushCallback<any> | undefined;
    readableType?: undefined | undefined;
    start?: TransformerStartCallback<any> | undefined;
    transform?: TransformerTransformCallback<any, any> | undefined;
    writableType?: undefined | undefined;
  }[] | undefined;
  linters?: Linter[] /** Wrap css in a layer to avoid global style conflict */ | undefined;
  layer?: boolean /** Hardcode here since transformer not support take effect on serialize currently */ | undefined;
  autoPrefix?: boolean | undefined;
}>;
type HashPriority = 'low' | 'high';
interface StyleContextProps {
  autoClear?: boolean;
  /** @private Test only. Not work in production. */
  mock?: 'server' | 'client';
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache: Entity;
  /** Tell children that this context is default generated context */
  defaultCache: boolean;
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority?: HashPriority;
  /** Tell cssinjs where to inject style in */
  container?: Element | ShadowRoot;
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline?: boolean;
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers?: Transformer[];
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters?: Linter[];
  /** Wrap css in a layer to avoid global style conflict */
  layer?: boolean;
  /** Hardcode here since transformer not support take effect on serialize currently */
  autoPrefix?: boolean;
}
declare const styleContextProps: {
  autoClear: {
    type: BooleanConstructor;
    default: undefined;
  };
  mock: {
    type: PropType<"server" | "client">;
    default: undefined;
  };
  cache: {
    type: PropType<Entity>;
  };
  defaultCache: {
    type: BooleanConstructor;
  };
  hashPriority: {
    type: PropType<HashPriority>;
    default: undefined;
  };
  container: {
    type: PropType<Element | ShadowRoot>;
    default: undefined;
  };
  ssrInline: {
    type: BooleanConstructor;
    default: undefined;
  };
  transformers: {
    type: PropType<Transformer[]>;
    default: undefined;
  };
  linters: {
    type: PropType<Linter[]>;
    default: undefined;
  };
  layer: {
    type: BooleanConstructor;
    default: undefined;
  };
  autoPrefix: {
    type: BooleanConstructor;
    default: undefined;
  };
};
type StyleProviderProps = StyleContextProps;
declare const StyleProvider: vue7.DefineSetupFnComponent<Partial<StyleContextProps>, {}, {}, Partial<StyleContextProps> & {}, vue7.PublicProps>;
//#endregion
export { ATTR_CACHE_PATH, ATTR_MARK, ATTR_TOKEN, CSS_IN_JS_INSTANCE, HashPriority, StyleContextProps, StyleProvider, StyleProviderProps, createCache, provideStyleContext, styleContextProps, useStyleContext, useStyleContextProvide };