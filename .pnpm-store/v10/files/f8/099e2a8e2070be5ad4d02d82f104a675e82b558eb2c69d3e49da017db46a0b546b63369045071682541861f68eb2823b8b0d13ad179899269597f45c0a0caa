import { PanelProps } from "../interface.js";
import { VNode } from "vue";

//#region src/splitter/hooks/useItems.d.ts
type ItemType = Omit<PanelProps, 'collapsible'> & {
  collapsible: {
    start?: boolean;
    end?: boolean;
    showCollapsibleIcon: 'auto' | boolean;
  };
  _$slots?: Record<string, any>;
};
/**
 * Convert `children` into `items`.
 */
declare function convertChildrenToItems(children: VNode[]): ItemType[];
//#endregion
export { ItemType, convertChildrenToItems };