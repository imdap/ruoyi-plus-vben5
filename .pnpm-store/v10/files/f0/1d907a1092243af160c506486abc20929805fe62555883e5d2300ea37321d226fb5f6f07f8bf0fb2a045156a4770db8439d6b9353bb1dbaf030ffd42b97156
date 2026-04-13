import XEUtils from 'xe-utils'
import { toCssUnit } from '../../ui/src/dom'
import { warnLog } from '../../ui/src/log'

import type { VxePrintProps, VxePrintPropTypes, VxePrintDefines, VxePrintConstructor, VxePrintPrivateMethods } from '../../../types'

const browseObj = XEUtils.browse()

// 打印
let printFrame: any

// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{padding:0;font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border-collapse:collapse;text-align:left;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table,.vxe-table th,.vxe-table td,.vxe-table td{border-color:#D0D0D0;border-style:solid;border-width:0}.vxe-table.is--print{width:100%}.border--default,.border--full,.border--outer{border-top-width:1px}.border--default,.border--full,.border--outer{border-left-width:1px}.border--outer,.border--default th,.border--default td,.border--full th,.border--full td,.border--outer th,.border--inner th,.border--inner td{border-bottom-width:1px}.border--default,.border--outer,.border--full th,.border--full td{border-right-width:1px}.border--default th,.border--full th,.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-unfold-icon,.vxe-table--tree-fold-icon{position:absolute;width:0;height:0;border-style:solid;border-width:.5em;border-right-color:transparent;border-bottom-color:transparent}.vxe-table--tree-unfold-icon{left:.3em;top:0;border-left-color:#939599;border-top-color:transparent}.vxe-table--tree-fold-icon{left:0;top:.3em;border-left-color:transparent;border-top-color:#939599}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left:0.4em}'

export function trimHtml (html: string) {
  return `${html}`.replace(/(<!---->)/, '')
}

export function createPrintFrame () {
  const frame = document.createElement('iframe')
  frame.className = 'vxe-table--print-frame'
  return frame
}

function appendPrintFrame () {
  if (!printFrame.parentNode) {
    document.body.appendChild(printFrame)
  }
}

function afterPrintEvent () {
  requestAnimationFrame(removeFrame)
}

function removeFrame () {
  if (printFrame) {
    if (printFrame.parentNode) {
      try {
        printFrame.contentDocument.write('')
      } catch (e) {}
      printFrame.parentNode.removeChild(printFrame)
    }
    printFrame = null
  }
}

function getExportBlobByString (str: string, type: string) {
  return new Blob([str], { type: `text/${type};charset=utf-8;` })
}

const defaultPrintMargin = 50
const defaultFontColor = '#000000'

function parsePageStyle (val?: VxePrintPropTypes.PageStyle) {
  const styOpts = Object.assign({}, val)
  const headStyOpts = Object.assign({}, styOpts.header)
  const titStyOpts = Object.assign({}, styOpts.title)
  const footStyOpts = Object.assign({}, styOpts.footer)
  const pnStyOpts = Object.assign({}, styOpts.pageNumber)
  let mVal: string | number = defaultPrintMargin
  let marginTop: string | number = mVal
  let marginBottom: string | number = mVal
  let marginLeft: string | number = mVal
  let marginRight: string | number = mVal
  if (XEUtils.isNumber(styOpts.margin) || XEUtils.isString(styOpts.margin)) {
    mVal = styOpts.margin
    marginTop = mVal
    marginBottom = mVal
    marginLeft = mVal
    marginRight = mVal
  }
  return {
    marginTop: toCssUnit(styOpts.marginTop || marginTop),
    marginBottom: toCssUnit(styOpts.marginBottom || marginBottom),
    marginLeft: toCssUnit(styOpts.marginLeft || marginLeft),
    marginRight: toCssUnit(styOpts.marginRight || marginRight),
    fontSize: toCssUnit(styOpts.fontSize),
    color: styOpts.color,
    textAlign: styOpts.textAlign,
    header: {
      height: toCssUnit(headStyOpts.height),
      textAlign: headStyOpts.textAlign
    },
    title: {
      color: titStyOpts.color,
      fontSize: toCssUnit(titStyOpts.fontSize),
      textAlign: titStyOpts.textAlign
    },
    footer: {
      height: toCssUnit(footStyOpts.height),
      textAlign: footStyOpts.textAlign
    },
    pageNumber: {
      color: pnStyOpts.color,
      fontSize: toCssUnit(pnStyOpts.fontSize),
      textAlign: pnStyOpts.textAlign
    }
  }
}

function createCssLink (urls?: string[]) {
  if (urls) {
    return urls.map(url => `<link rel="stylesheet" href="${url}">`).join('\n')
  }
  return ''
}

function createHtmlPage (opts: VxePrintProps & { _pageBreaks: boolean }, printHtml: string): string {
  const { pageStyle, customStyle, styleUrls } = opts
  const pageStyObj = parsePageStyle(pageStyle)
  const headStyOpts = pageStyObj.header
  const titStyOpts = pageStyObj.title
  const footStyOpts = pageStyObj.header
  const pnStyOpts = pageStyObj.pageNumber
  const isPbMode = opts._pageBreaks || (opts.pageBreaks && opts.pageBreaks.length)
  return [
    '<!DOCTYPE html><html>',
    '<head>',
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">',
    `<title>${opts.title || ''}</title>`,
    createCssLink(styleUrls),
    `<style media="print">@page{size:auto;${isPbMode ? 'margin: 0mm;' : ''}}</style>`,
    `<style>body{font-size:${pageStyObj.fontSize || '14px'};color:${pageStyObj.color || defaultFontColor};text-align:${pageStyObj.textAlign || 'left'};}</style>`,
    '<style>',
    '.vxe-print-slots{display:none;}',
    '.vxe-print-page-break.align--center{text-align:center;}',
    '.vxe-print-page-break.align--left{text-align:left;}',
    '.vxe-print-page-break.align--right{text-align:right;}',
    '.vxe-print-page-break{break-before:always;page-break-before:always;display:flex;flex-direction:column;height:100vh;overflow:hidden;}',
    '.vxe-print-page-break--body{display:flex;flex-direction:row;flex-grow:1;overflow:hidden;}',
    '.vxe-print-page-break--left,.vxe-print-page-break--right{flex-shrink:0;height:100%;}',
    `.vxe-print-page-break--left{width:${pageStyObj.marginLeft};}`,
    `.vxe-print-page-break--right{width:${pageStyObj.marginRight};}`,
    '.vxe-print-page-break--header,.vxe-print-page-break--footer{display:flex;justify-content:center;flex-direction:column;flex-shrink:0;width:100%;}',
    `.vxe-print-page-break--header{height:${headStyOpts.height || pageStyObj.marginTop};padding:0 ${pageStyObj.marginLeft} 0 ${pageStyObj.marginRight};text-align:${headStyOpts.textAlign || 'left'};}`,
    `.vxe-print-page-break--header-title{font-size:${titStyOpts.fontSize || '1.6em'};color:${titStyOpts.color || defaultFontColor};text-align:${opts.headerAlign || pnStyOpts.textAlign || 'center'};}`,
    `.vxe-print-page-break--footer{height:${footStyOpts.height || pageStyObj.marginBottom};padding:0 ${pageStyObj.marginLeft} 0 ${pageStyObj.marginRight};text-align:${footStyOpts.textAlign || 'left'};}`,
    '.vxe-print-page-break--content{flex-grow:1;overflow:hidden;}',
    `.vxe-print-page-break--footer-page-number{font-size:${pnStyOpts.fontSize || '1.2em'};color:${pnStyOpts.color || defaultFontColor};text-align:${opts.footerAlign || pnStyOpts.textAlign || 'center'};}`,
    '</style>',
    '<style>.vxe-table{white-space:pre;}</style>',
    `<style>${defaultHtmlStyle}</style>`,
    isPbMode ? '<style>body{margin:0;}</style>' : '',
    customStyle ? `<style>${customStyle}</style>` : '',
    '</head>',
    '<body>',
    `${printHtml}`,
    '</body>',
    '</html>'
  ].join('')
}

function handlePrint (opts: VxePrintProps & { _pageBreaks: boolean }, printHtml = '') {
  const { beforeMethod, styleUrls } = opts
  if (styleUrls && styleUrls.length) {
    styleUrls.forEach(url => {
      if (!/.css$/.test(url)) {
        warnLog('vxe.error.errProp', [url, `${url}.css`])
      }
    })
  }
  if (beforeMethod) {
    printHtml = beforeMethod({ content: printHtml, html: printHtml, options: opts }) || ''
  }
  printHtml = createHtmlPage(opts, printHtml)
  const blob = getExportBlobByString(printHtml, 'html')
  return new Promise<{
    status: boolean
  }>(resolve => {
    if (browseObj.msie) {
      removeFrame()
      printFrame = createPrintFrame()
      appendPrintFrame()
      const contentDocument = printFrame.contentDocument
      if (contentDocument) {
        contentDocument.write(printHtml)
        contentDocument.execCommand('print')
      }
      setTimeout(() => {
        resolve({
          status: true
        })
      }, 300)
    } else {
      if (!printFrame) {
        printFrame = createPrintFrame()
        printFrame.onload = (evnt: any) => {
          const frameEl = evnt.target
          if (frameEl.src) {
            try {
              const contentWindow = frameEl.contentWindow
              if (contentWindow) {
                contentWindow.onafterprint = afterPrintEvent
                contentWindow.print()
              }
            } catch (e) {}
          }
          resolve({
            status: true
          })
        }
        printFrame.onerror = () => {
          resolve({
            status: false
          })
        }
      }
      appendPrintFrame()
      printFrame.src = URL.createObjectURL(blob)
    }
  })
}

function createPageBreak (opts: VxePrintProps) {
  const { title, showPageNumber, align, headerAlign, footerAlign, showAllPageTitle } = opts
  const pageBreaks = opts.pageBreaks || []
  const pageCount = pageBreaks.length
  return pageBreaks.map((item, index) => {
    const bodyHtml = item.bodyHtml
    const headerHtml = item.headerHtml || opts.headerHtml
    const footerHtml = item.footerHtml || opts.footerHtml
    const leftHtml = item.leftHtml || opts.leftHtml
    const rightHtml = item.rightHtml || opts.rightHtml
    const currentPage = index + 1
    const params = {
      currentPage,
      pageCount
    }
    return [
      `<div class="${['vxe-print-page-break', align ? `align--${align}` : ''].join(' ')}">`,
      `<div class="${['vxe-print-page-break--header', headerAlign ? `align--${headerAlign}` : ''].join(' ')}">`,
      headerHtml
        ? `${XEUtils.isFunction(headerHtml) ? headerHtml(params) : (headerHtml || '')}`
        : (
            title && (showAllPageTitle || !index) ? `<div class="vxe-print-page-break--header-title">${title || ''}</div>` : ''
          ),
      '</div>',
      '<div class="vxe-print-page-break--body">',
      `<div class="vxe-print-page-break--left">${XEUtils.isFunction(leftHtml) ? leftHtml(params) : (leftHtml || '')}</div>`,
      `<div class="vxe-print-page-break--content">${XEUtils.isFunction(bodyHtml) ? bodyHtml(params) : (bodyHtml || '')}</div>`,
      `<div class="vxe-print-page-break--right">${XEUtils.isFunction(rightHtml) ? rightHtml(params) : (rightHtml || '')}</div>`,
      '</div>',
      `<div class="${['vxe-print-page-break--footer', footerAlign ? `align--${footerAlign}` : ''].join(' ')}">`,
      footerHtml
        ? `${XEUtils.isFunction(footerHtml) ? footerHtml(params) : (footerHtml || '')}`
        : (
            showPageNumber ? `<div class="vxe-print-page-break--footer-page-number">${currentPage}/${pageCount}</div>` : ''
          ),
      '</div>',
      '</div>'
    ].join('')
  }).join('')
}

export const printHtml: VxePrintDefines.PrintFunction = (options) => {
  const opts = Object.assign({ _pageBreaks: false, customLayout: true }, options)
  if (opts.sheetName) {
    opts.title = opts.title || opts.sheetName
  }
  if (opts.style) {
    opts.customStyle = opts.customStyle || opts.style
  }
  if (opts.beforePrintMethod) {
    opts.beforeMethod = opts.beforeMethod || opts.beforePrintMethod
  }
  if (opts.pageBreaks && opts.pageBreaks.length) {
    return handlePrint(opts, createPageBreak(opts))
  }
  const printHtml = opts.html || opts.content
  return handlePrint(opts, printHtml)
}

export function assemblePageBreak ($xePageBreak: VxePrintConstructor & VxePrintPrivateMethods, elem: HTMLElement, pageBreakConfig: VxePrintDefines.PageBreakConfig) {
  const staticPageBreaks = $xePageBreak.reactData.staticPageBreaks
  const parentElem = elem.parentNode
  if (parentElem && staticPageBreaks) {
    staticPageBreaks.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, pageBreakConfig)
    $xePageBreak.reactData.staticPageBreaks = staticPageBreaks.slice(0)
  }
}

export function destroyPageBreak ($xePageBreak: VxePrintConstructor & VxePrintPrivateMethods, pageBreakConfig: VxePrintDefines.PageBreakConfig) {
  $xePageBreak.reactData.staticPageBreaks = $xePageBreak.reactData.staticPageBreaks.filter(item => item.id !== pageBreakConfig.id)
}
