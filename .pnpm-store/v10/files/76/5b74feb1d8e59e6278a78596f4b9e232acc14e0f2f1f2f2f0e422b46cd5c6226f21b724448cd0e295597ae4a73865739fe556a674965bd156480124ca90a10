import { Ref } from "vue";

//#region src/steps/context.d.ts
interface InternalContextProps {
  rootComponent: string;
  itemComponent: string;
}
declare function provideInternalContext(value: Ref<InternalContextProps>): void;
/**
 * When use this context. Will trade as sub component instead of root Steps component.
 */
declare function useInternalContext(): Ref<InternalContextProps | null>;
//#endregion
export { InternalContextProps, provideInternalContext, useInternalContext };