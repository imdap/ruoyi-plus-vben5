/* eslint-disable no-use-before-define */

export interface TableKeyboardMethods<D = any> {}

export interface TableKeyboardPrivateMethods<D = any> {
  moveTabSelected(args: any, isLeft: any, evnt: any): void
  moveCurrentRow(isUpArrow: boolean, isDwArrow: boolean, evnt: any): void
  moveCurrentColumn(isLeftArrow: boolean, isRightArrow: boolean, evnt: any): void
  moveArrowSelected(args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any): void
  moveEnterSelected(args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any): void
  handleCellMousedownEvent(evnt: any, params: any): void

  /**
   * @deprecated
   */
  moveSelected(args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any): void
 }

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends TableKeyboardMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = any> extends TableKeyboardMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends TableKeyboardPrivateMethods<D> { }
}
