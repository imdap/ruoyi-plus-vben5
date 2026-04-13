import { SemanticClassNames, SemanticStyles } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { Ref } from "vue";

//#region src/breadcrumb/BreadcrumbContext.d.ts
type SemanticName = 'root' | 'item' | 'separator';
interface BreadcrumbContextProps {
  classes?: SemanticClassNames<SemanticName>;
  styles?: SemanticStyles<SemanticName>;
}
declare function useBreadcrumbProvider(value: Ref<BreadcrumbContextProps>): void;
declare function useBreadcrumbContext(): Ref<BreadcrumbContextProps>;
//#endregion
export { BreadcrumbContextProps, SemanticName, useBreadcrumbContext, useBreadcrumbProvider };