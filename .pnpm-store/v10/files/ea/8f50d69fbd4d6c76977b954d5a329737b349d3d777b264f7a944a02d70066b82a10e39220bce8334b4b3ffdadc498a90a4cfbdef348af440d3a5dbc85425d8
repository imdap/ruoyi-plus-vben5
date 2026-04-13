import * as vue0 from "vue";
import { InjectionKey } from "vue";
import { GlobalToken } from "antdv-next";

//#region src/composables/useHappyMode.d.ts
declare const HAPPY_MODE_KEY: InjectionKey<() => boolean>;
/**
 * Use happy mode state from HappyProvider
 * @returns A function that returns the current happy mode state
 */
declare function useHappyMode(): () => boolean;
//#endregion
//#region src/DotEffect/index.vue.d.ts
interface DotInfo {
  key: number;
  startSize: string;
  endSize: string;
  type: "fill" | "outlined";
  color: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}
interface DotEffectProps {
  target: HTMLElement;
  token: GlobalToken;
  hashId: string;
  onFinish: () => void;
}
declare const __VLS_export$1: vue0.DefineComponent<DotEffectProps, {}, {}, {}, {}, vue0.ComponentOptionsMixin, vue0.ComponentOptionsMixin, {}, string, vue0.PublicProps, Readonly<DotEffectProps> & Readonly<{}>, {}, {}, {}, {}, string, vue0.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export$1;
//#endregion
//#region src/DotEffect/useStyle.d.ts
declare const TARGET_ATTR = "data-happy-wave-target";
declare function injectStyles(hashId: string): void;
//#endregion
//#region src/HappyProvider/index.vue.d.ts
interface HappyProviderProps {
  /**
   * Enable happy mode
   * @default false
   */
  enabled?: boolean;
}
declare function showEffect(target: HTMLElement, info: {
  className: string;
  token: GlobalToken;
  component?: string;
  event: MouseEvent;
  hashId: string;
}): void;
declare var __VLS_1: {
  wave: {
    showEffect: typeof showEffect;
  } | undefined;
};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue0.DefineComponent<HappyProviderProps, {
  showEffect: typeof showEffect;
  wave: vue0.ComputedRef<{
    showEffect: typeof showEffect;
  } | undefined>;
}, {}, {}, {}, vue0.ComponentOptionsMixin, vue0.ComponentOptionsMixin, {}, string, vue0.PublicProps, Readonly<HappyProviderProps> & Readonly<{}>, {
  enabled: boolean;
}, {}, {}, {}, string, vue0.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default$1: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as DotEffect, type DotEffectProps, type DotInfo, HAPPY_MODE_KEY, _default$1 as HappyProvider, type HappyProviderProps, TARGET_ATTR, injectStyles, useHappyMode };