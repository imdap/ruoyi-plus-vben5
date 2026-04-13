import { AnchorSemanticClassNames, AnchorSemanticStyles, AntAnchor } from "./Anchor.js";
import { Ref } from "vue";

//#region src/anchor/context.d.ts
type AnchorContextType = Pick<AntAnchor, 'onClick' | 'unregisterLink' | 'registerLink' | 'scrollTo'> & {
  activeLink: Ref<string>;
  direction: Ref<AntAnchor['direction'] | undefined>;
  classes: Ref<AnchorSemanticClassNames>;
  styles: Ref<AnchorSemanticStyles>;
};
declare function useAnchorProvider(ctx: AnchorContextType): void;
declare function useAnchorContext(): AnchorContextType | undefined;
//#endregion
export { AnchorContextType, useAnchorContext, useAnchorProvider };