import XEUtils from 'xe-utils'

const hexAlphaKeyMaps: Record<string, number> = {}
const hexAlphaNumMaps: Record<string, string> = {}
'FF,FC,FA,F7,F5,F2,F0,ED,EB,E8,E6,E3,E0,DE,DB,D9,D6,D4,D1,CF,CC,C9,C7,C4,C2,BF,BD,BA,B8,B5,B3,B0,AD,AB,A8,A6,A3,A1,9E,9C,99,96,94,91,8F,8C,8A,87,85,82,80,7D,7A,78,75,73,70,6E,6B,69,66,63,61,5E,5C,59,57,54,52,4F,4D,4A,47,45,42,40,3D,3B,38,36,33,30,2E,2B,29,26,24,21,1F,1C,1A,17,14,12,0F,0D,0A,08,05,03,00'.split(',').forEach((key, i) => {
  const num = (100 - i) / 100
  hexAlphaKeyMaps[key] = num
  hexAlphaNumMaps[num] = key
})

const rgbRE = /^rgb(a?)\((\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})([,//\s]+([0-9.]{1,4})(%?))?\)$/
export function hasRgb (value: string) {
  return value && rgbRE.test(value)
}

const hexRE = /^(#?)([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/
export function hasHex (value: string) {
  return value && hexRE.test(value)
}

export function parseColor (value: string) {
  const rest = {
    value: '',
    type: '',
    hex: '',
    hexV: '',
    hexA: '',
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
  if (value) {
    const hexRest = value.match(hexRE)
    if (hexRest) {
      rest.value = value
      rest.type = 'hex'
      rest.hex = value
      rest.hexV = hexRest[2]
      rest.hexA = hexRest[3] || ''
      rest.a = (hexRest[3] ? hexAlphaKeyMaps[hexRest[3].toUpperCase()] : 1) || 1
    }
    const rgbRest = value.match(rgbRE)
    if (rgbRest) {
      rest.value = value
      rest.type = rgbRest[6] ? 'rgba' : 'rgb'
      rest.r = parseInt(rgbRest[2])
      rest.g = parseInt(rgbRest[3])
      rest.b = parseInt(rgbRest[4])
      rest.a = rgbRest[7] ? parseInt(rgbRest[6]) / 100 : (rgbRest[6] ? parseFloat(rgbRest[6]) : 1)
    }
  }
  return rest
}

export function updateColorAlpha (value: string, alpha: number = 1) {
  const colorRest = parseColor(value)
  const { type, hexV, r, g, b } = colorRest
  if (type === 'rgb' || type === 'rgba') {
    return toRgb(r, g, b, alpha)
  }
  if (type === 'hex') {
    return `#${hexV}${alpha === 1 ? '' : (hexAlphaNumMaps[alpha] || '')}`
  }
  return ''
}

export function toRgb (r: number, g: number, b: number, a?: number | null) {
  if (XEUtils.eqNull(a)) {
    return `rgb(${r},${g},${b})`
  }
  return `rgba(${r},${g},${b},${a})`
}

export function rgbToHex (rgbRest: {
  r: number
  g: number
  b: number
  a?: number
}) {
  if (!rgbRest) {
    return ''
  }
  const { r, g, b, a = 1 } = rgbRest
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')
  const hexA = a === 1 ? '' : (hexAlphaNumMaps[a] || '')

  // 返回十六进制颜色代码
  return `#${hexR}${hexG}${hexB}${hexA}`.toUpperCase()
}

export function rgbToHsv (rgbRest: {
  r: number
  g: number
  b: number
}) {
  if (!rgbRest) {
    return null
  }
  const { r, g, b } = rgbRest
  const rAbs = r / 255
  const gAbs = g / 255
  const bAbs = b / 255
  let h = 0
  let s = 0
  const val = Math.max(rAbs, gAbs, bAbs)
  const num = val - Math.min(rAbs, gAbs, bAbs)
  const handleDiff = (c: number) => (val - c) / 6 / num + 1 / 2
  if (num === 0) {
    h = s = 0
  } else {
    s = num / val
    const rr = handleDiff(rAbs)
    const gg = handleDiff(gAbs)
    const bb = handleDiff(bAbs)

    if (rAbs === val) {
      h = bb - gg
    } else if (gAbs === val) {
      h = (1 / 3) + rr - bb
    } else if (bAbs === val) {
      h = (2 / 3) + gg - rr
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }
  return {
    h: Math.round(h * 360),
    s: XEUtils.round(s, 2),
    v: XEUtils.round(val, 2)
  }
}

export function hsvToRgb (h: number, s: number, v: number) {
  let r = 0
  let g = 0
  let b = 0
  const i = Math.floor(h / 60)
  const f = h / 60 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i) {
    case 0:
      r = v; g = t; b = p
      break
    case 1:
      r = q; g = v; b = p
      break
    case 2:
      r = p; g = v; b = t
      break
    case 3:
      r = p; g = q; b = v
      break
    case 4:
      r = t; g = p; b = v
      break
    case 5:
      r = v; g = p; b = q
      break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export function hexToHsv (str: string) {
  const rgbRest = hexToRgb(str)
  if (rgbRest) {
    return rgbToHsv(rgbRest)
  }
  return null
}

export function hexToRgb (str: string) {
  if (str) {
    const rests = str.match(/^(#?)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/)
    if (rests) {
      return {
        r: parseInt(rests[2], 16),
        g: parseInt(rests[3], 16),
        b: parseInt(rests[4], 16),
        a: (rests[5] ? hexAlphaKeyMaps[rests[5].toUpperCase()] : 1) || 1
      }
    }
  }
  return null
}
