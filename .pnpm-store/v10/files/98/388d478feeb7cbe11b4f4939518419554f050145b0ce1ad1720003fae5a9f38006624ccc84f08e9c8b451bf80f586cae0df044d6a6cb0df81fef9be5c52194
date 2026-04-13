import XEUtils from 'xe-utils'
import { toCssUnit } from '../../ui/src/dom'

import type { VxeWatermarkPropTypes, VxeWatermarkDefines } from '../../../types'

interface ContentMarkOptions {
  rotate?: VxeWatermarkPropTypes.Rotate
  font: VxeWatermarkPropTypes.Font
  gap?: VxeWatermarkPropTypes.Gap
  offset?: VxeWatermarkPropTypes.Offset
}

let canvasEl: HTMLCanvasElement | null = null
let fontEl: HTMLSpanElement | null = null

const fontCacheMaps: Record<string, {
  width: number
  height: number
}> = {}

function getMarkCanvas () {
  if (!canvasEl) {
    canvasEl = document.createElement('canvas')
    canvasEl.style.position = 'absolute'
    canvasEl.style.top = '0'
    canvasEl.style.left = '0'
  }
  return canvasEl
}

function removeMarkElement (elem: Element | null) {
  if (elem) {
    const parentEl = elem.parentNode
    if (parentEl) {
      parentEl.removeChild(elem)
    }
  }
}

function calcFontWH (text: string, fontSize: number) {
  const fKey = `${fontSize}_${text}`
  if (!fontCacheMaps[fKey]) {
    if (!fontEl) {
      fontEl = document.createElement('span')
    }
    if (!fontEl.parentNode) {
      document.body.append(fontEl)
    }
    fontEl.textContent = text
    fontEl.style.fontSize = toCssUnit(fontSize)
    const width = fontEl.offsetWidth
    const height = fontEl.offsetHeight
    fontCacheMaps[fKey] = {
      width,
      height
    }
  }
  return fontCacheMaps[fKey]
}

function calcContentWH (contList: VxeWatermarkDefines.ContentObj[]) {
  let contentWidth = 0
  let contentHeight = 0
  contList.forEach(item => {
    contentWidth = Math.max(item.width, contentWidth)
    contentHeight = Math.max(item.height, contentHeight)
  })
  return {
    contentWidth,
    contentHeight
  }
}

function calcCanvasWH (contentWidth: number, opts: ContentMarkOptions) {
  const { gap } = opts
  const [gapX = 0, gapY = 0] = gap ? ((XEUtils.isArray(gap) ? gap : [gap, gap])) : []
  const canvasWidth = contentWidth + XEUtils.toNumber(gapX)
  const canvasHeight = contentWidth + XEUtils.toNumber(gapY)
  return {
    canvasWidth,
    canvasHeight
  }
}

function getFontConf (item: VxeWatermarkDefines.ContentObj | VxeWatermarkDefines.ContentConf, key: keyof VxeWatermarkPropTypes.Font, opts: ContentMarkOptions) {
  return (item.font ? item.font[key] : '') || (opts.font ? opts.font[key] : '')
}

function createMarkFont (contConf: VxeWatermarkDefines.ContentConf, defaultFontSize: number | string, opts: ContentMarkOptions) {
  const { offset } = opts
  const text = XEUtils.toValueString(contConf.textContent)
  const fontSize = XEUtils.toNumber(getFontConf(contConf, 'fontSize', opts) || defaultFontSize) || 14
  const [offsetX = 0, offsetY = 0] = offset ? ((XEUtils.isArray(offset) ? offset : [offset, offset])) : []
  const { width, height } = calcFontWH(text, fontSize)
  return {
    text,
    fontSize,
    font: contConf.font,
    width: width + XEUtils.toNumber(offsetX),
    height: height + XEUtils.toNumber(offsetY)
  }
}

function drayFont (ctx: CanvasRenderingContext2D, item: VxeWatermarkDefines.ContentObj, opts: ContentMarkOptions) {
  const fontWeight = getFontConf(item, 'fontWeight', opts)
  ctx.fillStyle = `${getFontConf(item, 'color', opts) || 'rgba(0, 0, 0, 0.15)'}`
  ctx.font = [
    getFontConf(item, 'fontStyle', opts) || 'normal',
    fontWeight === 'bold' || fontWeight === 'bolder' ? 'bold' : '',
    toCssUnit(item.fontSize),
    getFontConf(item, 'fontFamily', opts) || 'sans-serif'
  ].join(' ')
}

export function getContentUrl (content: VxeWatermarkPropTypes.Content, defaultFontSize: number | string, options: ContentMarkOptions) {
  const opts = Object.assign({}, options)
  const { rotate } = opts
  const deg = XEUtils.toNumber(rotate)

  const contList: VxeWatermarkDefines.ContentObj[] = (XEUtils.isArray(content) ? content : [content]).map(item => {
    if (item) {
      if ((item as any).textContent) {
        return createMarkFont(item as VxeWatermarkDefines.ContentConf, defaultFontSize, opts)
      }
      return createMarkFont({
        textContent: `${item}`
      }, defaultFontSize, opts)
    }
    return createMarkFont({
      textContent: ''
    }, defaultFontSize, opts)
  })
  removeMarkElement(fontEl)

  return new Promise<string>((resolve) => {
    const canvasEl = getMarkCanvas()
    if (!canvasEl.parentNode) {
      document.body.append(canvasEl)
    }
    const ctx = canvasEl.getContext('2d')
    if (ctx && contList.length) {
      const { contentWidth, contentHeight } = calcContentWH(contList)
      const { canvasWidth, canvasHeight } = calcCanvasWH(contentWidth, opts)

      canvasEl.width = canvasWidth
      canvasEl.height = canvasHeight

      const x = (canvasWidth - contentWidth) / 2
      const y = (canvasHeight - contentHeight) / 2

      const drayX = x + (contentWidth / 2)
      const drayY = y + (contentHeight / 2)

      ctx.save()
      ctx.translate(drayX, drayY)
      ctx.rotate(deg * Math.PI / 180)
      ctx.translate(-drayX, -drayY)

      let offsetHeight = 0
      contList.forEach((item) => {
        const align = getFontConf(item, 'align', opts)
        drayFont(ctx, item, opts)
        ctx.fillText(item.text, x + (align === 'center' ? (contentWidth - item.width) / 2 : 0), y + (contentHeight + contentHeight) / 2 + offsetHeight, contentWidth)
        offsetHeight += item.height
      })

      ctx.restore()

      resolve(canvasEl.toDataURL())
      removeMarkElement(canvasEl)
    } else {
      resolve('')
      removeMarkElement(canvasEl)
    }
  })
}
