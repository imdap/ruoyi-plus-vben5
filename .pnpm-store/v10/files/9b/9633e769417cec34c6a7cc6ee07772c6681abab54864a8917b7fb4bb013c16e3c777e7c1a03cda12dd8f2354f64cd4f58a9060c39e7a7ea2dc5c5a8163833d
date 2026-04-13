import { MenuDividerType as MenuDividerType$1, MenuItemGroupType as MenuItemGroupType$1, MenuItemType as MenuItemType$1, SubMenuType as SubMenuType$1 } from "@v-c/menu";
import { Key } from "@v-c/util/dist/type";

//#region src/menu/interface.d.ts
type DataAttributes = { [Key in `data-${string}`]: unknown };
interface MenuItemType extends MenuItemType$1, DataAttributes {
  danger?: boolean;
  icon?: any;
  title?: string;
  [key: string]: any;
}
interface SubMenuType<T extends MenuItemType = MenuItemType> extends Omit<SubMenuType$1, 'children'> {
  icon?: any;
  theme?: 'dark' | 'light';
  children: ItemType<T>[];
  [key: string]: any;
}
interface MenuItemGroupType<T extends MenuItemType = MenuItemType> extends Omit<MenuItemGroupType$1, 'children'> {
  children?: ItemType<T>[];
  key?: Key;
  [key: string]: any;
}
interface MenuDividerType extends MenuDividerType$1 {
  dashed?: boolean;
  key?: Key;
}
type ItemType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuItemGroupType<T> | MenuDividerType | null;
//#endregion
export { DataAttributes, ItemType, MenuDividerType, MenuItemGroupType, MenuItemType, SubMenuType };