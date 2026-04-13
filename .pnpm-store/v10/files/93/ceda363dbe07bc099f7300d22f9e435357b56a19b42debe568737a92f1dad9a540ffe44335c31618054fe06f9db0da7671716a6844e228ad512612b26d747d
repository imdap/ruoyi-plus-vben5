export interface VxeGlobalClipboardCopyObj {
  text: string
  html: string
}

/**
 * 全局剪贴板
 */
export interface VxeGlobalClipboard {
  getStore(): VxeGlobalClipboardCopyObj
  setStore(data: VxeGlobalClipboardCopyObj): void
  /**
   * 将字符串内容复制到剪贴板
   * @param content
   */
  copy(content: string | number | VxeGlobalClipboardCopyObj): boolean
  /**
   * 获取已已复制到剪贴板的内容
   * @param content
   */
  getText(): string
}
