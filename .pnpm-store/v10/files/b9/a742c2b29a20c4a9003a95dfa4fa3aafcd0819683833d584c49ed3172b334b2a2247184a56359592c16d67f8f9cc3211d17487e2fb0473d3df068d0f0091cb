import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeLoadingComponent from './src/loading'
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics'

import type { VxeLoadingProps } from '../../types'

export const VxeLoading = Object.assign({}, VxeLoadingComponent, {
  install (app: App) {
    app.component(VxeLoadingComponent.name as string, VxeLoadingComponent)
  }
})

export const LoadingController = {
  open (options?: VxeLoadingProps) {
    const opts = Object.assign({}, options)
    dynamicStore.globalLoading = {
      modelValue: true,
      text: opts.text,
      icon: opts.icon
    }
    checkDynamic()
  },
  close () {
    dynamicStore.globalLoading = null
  }
}

dynamicApp.use(VxeLoading)
VxeUI.component(VxeLoadingComponent)
VxeUI.loading = LoadingController

export const Loading = VxeLoading
export default VxeLoading
