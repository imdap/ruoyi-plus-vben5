import { resolveComponent } from 'vue'
import { globalConfig, componentMaps } from '../store'

export function getCurrComponent (name: string) {
  const comp = componentMaps[name] || (globalConfig.Antd ? globalConfig.Antd[name] : null)
  if (comp) {
    return comp
  }
  return resolveComponent(name)
}
