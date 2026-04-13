import { VxeTableConstructor, VxeTableDefines } from '../components/table'
import { VxeGridConstructor } from '../components/grid'
import { VxeTreeConstructor } from '../components/tree'
import { VxeCalendarConstructor } from '../components/calendar'
import { VxeFormDesignConstructor, VxeFormDesignDefines } from '../components/form-design'
import { VxeMenuConstructor, VxeMenuPropTypes } from '../components/menu'
import { VxeContextMenuDefines } from '../components/context-menu'

/* eslint-disable no-use-before-define */

declare module '@vxe-ui/core' {
  export namespace VxeGlobalMenusHandles {
    export interface MenusOption {
      /**
       * 表格 - 自定义菜单方法
       */
      tableMenuMethod?: (params: TableMenuMethodParams, event: Event) => void
      /**
       * 树 - 自定义菜单方法
       */
      treeMenuMethod?: (params: TreeMenuMethodParams, event: Event) => void
      /**
       * 日历 - 自定义菜单方法
       */
      calendarMenuMethod?: (params: CalendarMenuMethodParams, event: Event) => void
      /**
       * 菜单 - 自定义菜单方法
       */
      menuMenuMethod?: (params: MenuMenuMethodParams, event: Event) => void
      /**
       * 表单设计器 - 自定义菜单方法
       */
      formDesignMenuMethod?: (params: FormDesignMenuMethodParams, event: Event) => void

      /**
       * 已废弃，请使用 tableMenuMethod
       * @deprecated
       */
      menuMethod?: (params: TableMenuMethodParams, event: Event) => void
    }

    export interface TableMenuMethodParams<D = any> extends VxeGlobalRendererHandles.RenderTableCellParams<D> {
      $grid: VxeGridConstructor<D> | null | undefined
      $table: VxeTableConstructor<D>
      $event: MouseEvent
      menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption
    }

    export interface TreeMenuMethodParams<D = any> {
      $tree: VxeTreeConstructor
      $event: MouseEvent
      node: D
      menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
    }

    export interface CalendarMenuMethodParams {
      $calendar: VxeCalendarConstructor
      $event: MouseEvent
      date: Date
      menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
    }

    export interface MenuMenuMethodParams {
      $menu: VxeMenuConstructor
      $event: MouseEvent
      currentMenu: VxeMenuPropTypes.MenuOption
      menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
    }

    export interface FormDesignMenuMethodParams<D = any> {
      $formDesign: VxeFormDesignConstructor
      $event: MouseEvent
      widget: VxeFormDesignDefines.WidgetObjItem<D>
      menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
    }
  }
}
