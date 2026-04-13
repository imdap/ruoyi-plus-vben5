import { getI18n } from './i18n'

import { VxeGlobalLog } from '../../types'

function createLog (type: 'log' | 'warn' | 'error', name?: string) {
  return function (key: string, args?: any) {
    const msg = `[vxe ${name || ''}] ${getI18n(key, args)}`
    console[type](msg)
    return msg
  }
}

const version = process.env.VUE_APP_VXE_VERSION

export const log: VxeGlobalLog = {
  create: createLog,
  warn: createLog('warn', `v${version}`),
  err: createLog('error', `v${version}`)
}
