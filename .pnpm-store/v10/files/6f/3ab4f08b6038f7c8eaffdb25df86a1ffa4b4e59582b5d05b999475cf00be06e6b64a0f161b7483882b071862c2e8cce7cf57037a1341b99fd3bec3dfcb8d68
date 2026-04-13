import { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../components/table'
import { VxeGridConstructor, VxeGridPrivateMethods } from '../components/grid'
import { VxeGanttConstructor, VxeGanttPrivateMethods } from '../components/gantt'

declare module '@vxe-ui/core' {
  export namespace VxeGlobalHooksHandles {
    export interface HookOptions {
      setupTable?($table: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods<any>): void | Record<string, any>
      setupGrid?($grid: VxeGridConstructor & VxeGridPrivateMethods): void | Record<string, any>
      setupGantt?($grid: VxeGanttConstructor & VxeGanttPrivateMethods): void | Record<string, any>
    }
  }
}
