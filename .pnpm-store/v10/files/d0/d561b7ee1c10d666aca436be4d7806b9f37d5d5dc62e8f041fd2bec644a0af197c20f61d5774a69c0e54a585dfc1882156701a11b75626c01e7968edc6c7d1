import XEUtils from 'xe-utils'
import { VxeUI, getI18n } from '@vxe-ui/core'

import type { VxeUploadDefines } from '../../../types'

// 导入
let fileForm: HTMLFormElement | null = null
let fileInput: HTMLInputElement | null = null

export function parseFile (file: File) {
  const name = file.name
  const tIndex = XEUtils.lastIndexOf(name, '.')
  const type = name.substring(tIndex + 1, name.length).toLowerCase()
  const filename = name.substring(0, tIndex)
  return { filename, type }
}

/**
 * 读取本地文件
 */
export const readLocalFile: VxeUploadDefines.ReadFileFunction = (options) => {
  const opts = Object.assign({}, options)
  return new Promise((resolve, reject) => {
    if (!fileInput) {
      fileInput = document.createElement('input')
      fileInput.name = 'file'
      fileInput.type = 'file'
    }
    if (!fileForm) {
      fileForm = document.createElement('form')
      fileForm.style.display = 'none'
      fileForm.appendChild(fileInput)
      document.body.appendChild(fileForm)
    }

    const types = opts.types || []
    const isAllType = !types.length || types.some((type) => type === '*')
    fileInput.multiple = !!opts.multiple
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`
    fileInput.onchange = (evnt) => {
      const eventTarget = evnt.target as (EventTarget & { files: FileList })
      const files = Array.from(eventTarget.files || [])
      const file = files[0]
      let errType = ''
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const { type } = parseFile(files[fIndex])
          if (!XEUtils.includes(types, type)) {
            errType = type
            break
          }
        }
      }
      if (!errType) {
        resolve({ status: true, files, file })
      } else {
        if (opts.message !== false) {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.error.notType', [errType]),
              status: 'error'
            })
          }
        }
        const params = { status: false, files, file }
        reject(params)
      }
    }
    fileForm.reset()
    fileInput.click()
  })
}

export function getExportBlobByContent (content: string, options: { type: string }) {
  return new Blob([content], { type: `text/${options.type};charset=utf-8;` })
}

/**
 * 保存文件到本地
 */
export const saveLocalFile: VxeUploadDefines.SaveFileFunction = (options) => {
  const opts = Object.assign({ type: '' }, options)
  const { filename, type, content } = opts
  const name = type ? `${filename}.${type}` : `${filename}`
  if (window.Blob) {
    const blob = content instanceof Blob ? content : getExportBlobByContent(XEUtils.toValueString(content), opts)
    const winNavigator = window.navigator as Navigator & { msSaveBlob(blob: Blob, name: string): any }
    if (winNavigator.msSaveBlob) {
      winNavigator.msSaveBlob(blob, name)
    } else {
      const url = URL.createObjectURL(blob)
      const linkElem = document.createElement('a')
      linkElem.target = '_blank'
      linkElem.download = name
      linkElem.href = url
      document.body.appendChild(linkElem)
      linkElem.click()
      requestAnimationFrame(() => {
        if (linkElem.parentNode) {
          linkElem.parentNode.removeChild(linkElem)
        }
        URL.revokeObjectURL(url)
      })
    }
    return Promise.resolve()
  }
  return Promise.reject(new Error(getI18n('vxe.error.notExp')))
}
