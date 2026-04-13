import type { CSSProperties, TransitionGroupProps } from 'vue'
import type { InnerOpenConfig, Key, NoticeConfig, OpenConfig, Placement, StackConfig } from './interface.ts'
import { classNames as clsx } from '@v-c/util'
import { getTransitionGroupProps } from '@v-c/util/dist/utils/transition'
import { unrefElement } from '@v-c/util/dist/vueuse/unref-element'
import { computed, defineComponent, reactive, ref, shallowRef, toRef, TransitionGroup, watch, watchEffect } from 'vue'
import useStack from './hooks/useStack.ts'
import Notice from './Notice.tsx'
import { useNotificationContext } from './NotificationProvider.tsx'

export interface NoticeListProps {
  configList?: OpenConfig[]
  placement?: Placement
  prefixCls?: string
  motion?: TransitionGroupProps | ((placement: Placement) => TransitionGroupProps)
  stack?: StackConfig

  // Events
  onAllNoticeRemoved?: (placement: Placement) => void
  onNoticeClose?: (key: Key) => void
}

const NoticeList = defineComponent<NoticeListProps>((props, { attrs }) => {
  const ctx = useNotificationContext()
  const dictRef = reactive<Record<string, HTMLDivElement | undefined>>({})
  const keys = computed(() =>
    (props.configList ?? []).map(config => ({
      config,
      key: String(config.key),
    })),
  )
  const latestNotice = shallowRef<HTMLDivElement | null>(null)
  const hoverKeys = ref<string[]>([])

  const stackConfig = toRef(props, 'stack')
  const [stackEnabled, stackOptions] = useStack(stackConfig)
  const stackActive = computed(() => stackEnabled.value || stackConfig.value === false)
  const expanded = computed(() => {
    if (!stackActive.value) {
      return false
    }
    if (!stackEnabled.value) {
      return true
    }
    return hoverKeys.value.length > 0 || keys.value.length <= stackOptions.threshold!.value!
  })
  const placementMotion = computed(() => {
    if (typeof props.motion === 'function') {
      return props.placement ? props.motion(props.placement) : undefined
    }
    return props.motion
  })

  // Clean hover key
  watch([hoverKeys, keys, stackEnabled], () => {
    if (stackEnabled.value && hoverKeys.value.length > 1) {
      hoverKeys.value = hoverKeys.value.filter(key =>
        keys.value.some(({ key: dataKey }) => key === dataKey),
      )
    }
  })
  watch(stackEnabled, (enabled) => {
    if (!enabled && hoverKeys.value.length) {
      hoverKeys.value = []
    }
  })

  // Sync latest notice after DOM updates so collapsed stack uses accurate height
  watchEffect(
    () => {
      if (!stackActive.value) {
        latestNotice.value = null
        return
      }

      const lastKey = keys.value[keys.value.length - 1]?.key
      latestNotice.value = lastKey ? dictRef[lastKey] ?? null : null
    },
    { flush: 'post' },
  )

  const checkAllClosed = () => {
    if (!props.placement) {
      return
    }
    if (keys.value.length === 0) {
      props.onAllNoticeRemoved?.(props.placement)
    }
  }

  return () => {
    const { prefixCls = '', placement = 'topRight', onNoticeClose } = props

    const renderNotify = () =>
      keys.value.map(({ config }, motionIndex) => {
        const { key, times } = config as InnerOpenConfig
        const strKey = String(key)
        const {
          className: configClassName,
          style: configStyle,
          classNames: configClassNames,
          styles: configStyles,
          ...restConfig
        } = config as NoticeConfig
        const dataIndex = keys.value.findIndex(item => item.key === strKey)
        const stackStyle: CSSProperties = {}

        if (stackActive.value) {
          const index = keys.value.length - 1 - (dataIndex > -1 ? dataIndex : motionIndex - 1)
          const transformX = placement === 'top' || placement === 'bottom' ? '-50%' : '0'
          if (index > 0) {
            stackStyle.height = expanded.value
              ? dictRef[strKey]?.offsetHeight
              : latestNotice.value?.offsetHeight
            if (stackStyle.height && typeof stackStyle.height === 'number') {
              stackStyle.height = `${stackStyle.height}px`
            }
            let verticalOffset = 0
            for (let i = 0; i < index; i += 1) {
              const targetKey = keys.value[keys.value.length - 1 - i]?.key
              const node = targetKey ? dictRef[targetKey] : null
              verticalOffset += (node?.offsetHeight ?? 0) + stackOptions.gap!.value!
            }

            const transformY
              = (expanded.value ? verticalOffset : index * stackOptions.offset!.value!)
                * (placement.startsWith('top') ? 1 : -1)
            const currentWidth = dictRef[strKey]?.offsetWidth
            const latestWidth = latestNotice.value?.offsetWidth
            const scaleX
              = !expanded.value && latestWidth && currentWidth
                ? (latestWidth - stackOptions.offset!.value! * 2 * (index < 3 ? index : 3))
                / currentWidth
                : 1
            stackStyle.transform = `translate3d(${transformX}, ${transformY}px, 0) scaleX(${scaleX})`
          }
          else {
            stackStyle.transform = `translate3d(${transformX}, 0, 0)`
          }
        }
        return (
          <div
            key={strKey}
            class={clsx(`${prefixCls}-notice-wrapper`, configClassNames?.wrapper)}
            style={{
              ...stackStyle,
              ...configStyles?.wrapper,
            }}
            onMouseenter={() => {
              if (!stackEnabled.value) {
                return
              }
              hoverKeys.value = hoverKeys.value.includes(strKey)
                ? hoverKeys.value
                : [...hoverKeys.value, strKey]
            }}
            onMouseleave={() => {
              if (!stackEnabled.value) {
                return
              }
              hoverKeys.value = hoverKeys.value.filter(k => k !== strKey)
            }}
          >
            <Notice
              {...restConfig as any}
              ref={(el) => {
                const element = unrefElement<HTMLDivElement>(el as any) ?? undefined
                if (dataIndex > -1) {
                  dictRef[strKey] = element
                }
                else {
                  delete dictRef[strKey]
                }
              }}
              prefixCls={prefixCls}
              classNames={configClassNames}
              styles={configStyles}
              class={clsx(configClassName, (ctx.value as any)?.classNames?.notice)}
              style={configStyle}
              times={times}
              eventKey={key}
              onNoticeClose={onNoticeClose}
              hovering={stackEnabled.value && hoverKeys.value.length > 0}
            />
          </div>
        )
      })
    let motionGroupProps: TransitionGroupProps = {}
    if (placementMotion.value) {
      motionGroupProps = getTransitionGroupProps(placementMotion.value.name!, placementMotion.value)
    }
    return (
      <TransitionGroup
        key={placement}
        tag="div"
        appear
        {...{
          class: clsx(
            prefixCls,
            `${prefixCls}-${placement}`,
            (ctx.value as any)?.classNames?.list,
            (attrs as any).class,
            {
              [`${prefixCls}-stack-expanded`]: expanded.value,
              [`${prefixCls}-stack`]: stackActive.value,
            },
          ),
          style: (attrs as any).style,
        }}
        {...motionGroupProps}
        onAfterLeave={checkAllClosed}
      >
        {renderNotify()}
      </TransitionGroup>
    )
  }
})

export default NoticeList
