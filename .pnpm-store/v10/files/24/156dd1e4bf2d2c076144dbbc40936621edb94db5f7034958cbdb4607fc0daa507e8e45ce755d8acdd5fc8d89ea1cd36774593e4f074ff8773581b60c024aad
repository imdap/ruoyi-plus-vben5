import { MenuClickEventHandler, MenuDividerType, MenuInfo, MenuItemGroupType, MenuItemType, MenuRef, RenderIconInfo, SelectEventHandler, SelectInfo, SubMenuType } from './interface';
import { MenuProps, default as Menu } from './Menu';
import { MenuItemProps, default as MenuItem } from './MenuItem';
import { MenuItemGroupProps, default as MenuItemGroup } from './MenuItemGroup';
import { SubMenuProps, default as SubMenu } from './SubMenu';
import { useFullPath } from './context/PathContext';
import { default as Divider } from './Divider';
export { Divider, MenuItem as Item, MenuItemGroup as ItemGroup, MenuItem, MenuItemGroup, SubMenu, 
/** @private Only used for antd internal. Do not use in your production. */
useFullPath, };
export type { MenuClickEventHandler, MenuDividerType, MenuInfo, MenuItemGroupProps, MenuItemGroupType, MenuItemProps, MenuItemType, MenuProps, MenuRef, RenderIconInfo, SelectEventHandler, SelectInfo, SubMenuProps, SubMenuType, };
type MenuType = typeof Menu & {
    Item: typeof MenuItem;
    SubMenu: typeof SubMenu;
    ItemGroup: typeof MenuItemGroup;
    Divider: typeof Divider;
};
declare const ExportMenu: MenuType;
export default ExportMenu;
