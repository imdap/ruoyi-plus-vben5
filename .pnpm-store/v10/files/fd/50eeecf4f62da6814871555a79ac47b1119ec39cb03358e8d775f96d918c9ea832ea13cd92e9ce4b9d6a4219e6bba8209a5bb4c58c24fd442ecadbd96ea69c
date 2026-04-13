import { VxeTablePropTypes } from '../table'

/* eslint-disable no-use-before-define */

export interface TableExportMethods<D = any> {
  /**
   * 打开高级导出
   * @param options 参数
   */
  openExport(options?: VxeTablePropTypes.ExportConfig): void
  /**
   * 关闭高级导入
   */
  closeExport(): Promise<any>
  /**
   * 将表格数据导出
   * @param options 参数
   */
  exportData(options?: VxeTablePropTypes.ExportConfig): Promise<any>
  /**
   * 打开高级导入
   * @param options 参数
   */
  openImport(options?: VxeTablePropTypes.ImportConfig): void
  /**
   * 关闭高级导入
   */
  closeImport(): Promise<any>
  /**
   * 将数据导入表格
   * @param options 参数
   */
  importData(options?: VxeTablePropTypes.ImportConfig): Promise<any>
  /**
   * 将一个文件的数据导入表格
   * @param file 文件流
   * @param options 参数
   */
  importByFile(file: File, options: VxeTablePropTypes.ImportConfig): Promise<any>
  /**
   * 保存文件到本地
   * @param options
   */
  saveFile: SaveFileFunction
  /**
   * 读取本地文件
   * @param options 参数
   */
  readFile: ReadFileFunction
  /**
   * 打印表格数据
   * @param options 参数
   */
  print: PrintFunction
  getPrintHtml(options?: VxeTablePropTypes.PrintConfig): Promise<{
    html: string
  }>
  /**
   * 打开高级打印
   * @param options 参数
   */
  openPrint(options?: VxeTablePropTypes.PrintConfig): void
  /**
   * 关闭高级打印
   */
  closePrint(): Promise<any>
}

export interface TableExportPrivateMethods<D = any> { }

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends TableExportMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = any> extends TableExportMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends TableExportPrivateMethods<D> { }
}

export type SaveFileFunction = (options: {
  filename: string
  type: string
  content: string | Blob
}) => Promise<any>

export type ReadFileFunction = (options?: {
  multiple?: boolean
  types?: string[]
  message?: boolean
}) => Promise<{
  status: boolean
  files: File[]
  file: File
}>

export type PrintFunction = (options?: VxeTablePropTypes.PrintConfig) => any
