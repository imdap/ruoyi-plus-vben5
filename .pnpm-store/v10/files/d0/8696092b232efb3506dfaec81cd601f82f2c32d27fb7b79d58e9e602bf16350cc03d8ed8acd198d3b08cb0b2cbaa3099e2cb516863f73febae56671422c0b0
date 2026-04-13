import { Ref } from "vue";
import { classNames } from "@v-c/util";

//#region src/_util/tools.d.ts
declare function getSlotPropFn(slots: any, props: any, key: string): any;
declare function getSlotPropsFnRun(slots: any, props: any, key: string, isNull?: boolean, params?: any): any;
declare function toPropsRefs<T extends Record<string, any>, K extends keyof T>(obj: T, ...args: K[]): { [key in K]-?: Ref<T[key]> };
declare const clsx: typeof classNames;
//#endregion
export { clsx, getSlotPropFn, getSlotPropsFnRun, toPropsRefs };