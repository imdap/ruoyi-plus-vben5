import { CheckboxOptionType } from "./Group.js";
import { Ref } from "vue";

//#region src/checkbox/GroupContext.d.ts
interface CheckboxGroupContext {
  name?: string;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: any) => void;
  cancelValue: (val: any) => void;
}
declare function useGroupContextProvider(value: Ref<CheckboxGroupContext>): void;
declare function useGroupContext(): Ref<CheckboxGroupContext, CheckboxGroupContext> | undefined;
//#endregion
export { CheckboxGroupContext, useGroupContext, useGroupContextProvider };