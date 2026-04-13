import XEUtils from 'xe-utils'
import { VxeCore } from './core'
import { i18nConfigStore } from './i18nStore'
import { globalConfigStore } from './configStore'

import { VxeGlobalI18nLocale } from '../../types'

let checkInstall = false
let cacheMaps: Record<string, string> = {}

export function getI18n (key: string, args?: any) {
  const { langMaps, language } = i18nConfigStore
  const { i18n } = globalConfigStore
  if (i18n) {
    return `${i18n(key, args) || ''}`
  }
  if (!checkInstall) {
    if (!langMaps[language]) {
      console.error(`[vxe core] 语言包未安装。Language not installed. https://${VxeCore.uiVersion ? 'vxeui.com' : 'vxetable.cn'}/#/start/i18n`)
    }
    checkInstall = true
  }
  if (!args && cacheMaps[key]) {
    return cacheMaps[key]
  }
  const i18nLabel = XEUtils.toFormatString(XEUtils.get(langMaps[language], key, key), args)
  if (!args) {
    cacheMaps[key] = i18nLabel
  }
  return i18nLabel
}

export function setLanguage (locale: VxeGlobalI18nLocale) {
  const { language } = i18nConfigStore
  const targetlang = locale || 'zh-CN'
  if (language !== targetlang) {
    i18nConfigStore.language = targetlang
    cacheMaps = {}
  }
  return VxeCore
}

export function setI18n (locale: VxeGlobalI18nLocale, data: Record<string, any>) {
  i18nConfigStore.langMaps[locale] = Object.assign({}, data)
  return VxeCore
}

export function hasLanguage (language: VxeGlobalI18nLocale) {
  const { langMaps } = i18nConfigStore
  return !!langMaps[language]
}

export function getLanguage () {
  const { language } = i18nConfigStore
  return language
}
