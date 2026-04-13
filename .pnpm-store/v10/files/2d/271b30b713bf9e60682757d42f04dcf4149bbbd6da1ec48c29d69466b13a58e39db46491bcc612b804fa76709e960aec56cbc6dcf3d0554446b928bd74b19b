import type { CSSProperties } from 'vue'
import type { Key, NoticeConfig } from './interface.ts'
import { classNames } from '@v-c/util'
import KeyCode from '@v-c/util/dist/KeyCode'
import pickAttrs from '@v-c/util/dist/pickAttrs'
import { computed, defineComponent, shallowRef, watch } from 'vue'

export interface NoticeProps extends Omit<NoticeConfig, 'onClose'> {
  prefixCls: string
  eventKey: Key
  onClick?: (event: Event) => void
  onNoticeClose?: (key: Key) => void
  hovering?: boolean
  props?: Record<string, any>
}

const defaults = {
  duration: 4.5,
  pauseOnHover: true,
  closeIcon: 'x',
} as const

const Notify = defineComponent<NoticeProps & { times?: number }>((props, { attrs }) => {
  const hovering = shallowRef(false)
  const percent = shallowRef(0)
  const spentTime = shallowRef(0)

  const mergedHovering = computed(() => props.hovering || hovering.value)
  const mergedDuration = computed(() => {
    if (typeof props.duration === 'number') {
      return props.duration
    }
    if (props.duration === undefined) {
      return defaults.duration
    }
    return 0
  })
  const mergedPauseOnHover = computed(() =>
    props.pauseOnHover === undefined ? defaults.pauseOnHover : props.pauseOnHover,
  )
  const mergedShowProgress = computed(() => mergedDuration.value > 0 && props.showProgress)
  const mergedCloseIcon = computed(() => props.closeIcon ?? defaults.closeIcon)

  // ======================== Close =========================
  const onInternalClose = () => {
    props.onNoticeClose?.(props.eventKey)
  }

  const onCloseKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === KeyCode.ENTER) {
      onInternalClose()
    }
  }

  // ======================== Timing ========================
  watch([
    () => props.times,
    mergedDuration,
    mergedHovering,
  ], (_n, _, onCleanup) => {
    const duration = mergedDuration.value
    const hoveringValue = mergedHovering.value
    const pauseOnHover = mergedPauseOnHover.value
    if (!hoveringValue && duration > 0) {
      const start = Date.now() - spentTime.value
      const timeoutId = window.setTimeout(() => {
        onInternalClose()
      }, duration * 1000 - spentTime.value)

      onCleanup(() => {
        if (pauseOnHover) {
          clearTimeout(timeoutId)
        }
        spentTime.value = Date.now() - start
      })
    }
  }, {
    immediate: true,
  })

  // ===================== Progress Bar =====================
  watch([
    () => props.times,
    mergedDuration,
    spentTime,
    mergedHovering,
    mergedShowProgress,
  ], (_n, _, onCleanup) => {
    const hoveringValue = mergedHovering.value
    const showProgress = mergedShowProgress.value
    const pauseOnHover = mergedPauseOnHover.value
    const duration = mergedDuration.value
    const baseSpentTime = spentTime.value

    if (!hoveringValue && showProgress && (pauseOnHover || baseSpentTime === 0)) {
      const start = performance.now()
      let animationFrame = 0

      const calculate = () => {
        cancelAnimationFrame(animationFrame)
        animationFrame = requestAnimationFrame((timestamp) => {
          const runtime = timestamp + baseSpentTime - start
          const progress = Math.min(runtime / (duration * 1000), 1)
          percent.value = progress * 100
          if (progress < 1) {
            calculate()
          }
        })
      }

      calculate()

      onCleanup(() => {
        if (pauseOnHover) {
          cancelAnimationFrame(animationFrame)
        }
      })
    }
  }, {
    immediate: true,
  })

  return () => {
    const {
      closable,
      prefixCls,
      props: divProps,
      onClick,
      content,
      className,
      style,
    } = props

    // ======================== Closable ========================
    const closableConfig
      = typeof closable === 'object' && closable !== null
        ? closable
        : closable
          ? { closeIcon: mergedCloseIcon.value }
          : {}
    const ariaProps = pickAttrs(closableConfig, true)

    // ======================== Progress ========================
    const safePercent = percent.value <= 0 ? 0 : percent.value > 100 ? 100 : percent.value
    const validPercent = 100 - safePercent

    // ======================== Render ========================
    const noticePrefixCls = `${prefixCls}-notice`

    const mergedStyle: CSSProperties = {
      ...(typeof divProps?.style === 'object' && divProps?.style ? divProps.style : {}),
      ...(typeof (attrs as any).style === 'object' && (attrs as any).style ? (attrs as any).style : {}),
      ...(typeof style === 'object' && style ? style : {}),
    }

    return (
      <div
        {...divProps}
        class={
          classNames(
            noticePrefixCls,
            className,
            (attrs as any).class,
            {
              [`${noticePrefixCls}-closable`]: !!closable,
            },
          )
        }
        style={mergedStyle}
        onMouseenter={(e: MouseEvent) => {
          hovering.value = true
          divProps?.onMouseEnter?.(e)
        }}
        onMouseleave={(e: MouseEvent) => {
          hovering.value = false
          divProps?.onMouseLeave?.(e)
        }}
        onClick={onClick}
      >
        {/* Content */}
        <div class={`${noticePrefixCls}-content`}>{content}</div>

        {/* Close Icon */}
        {closable && (
          <button
            type="button"
            class={`${noticePrefixCls}-close`}
            onKeydown={onCloseKeyDown}
            aria-label="Close"
            {...ariaProps}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onInternalClose()
            }}
          >
            {closableConfig.closeIcon ?? mergedCloseIcon.value}
          </button>
        )}

        {/* Progress Bar */}
        {mergedShowProgress.value && (
          <progress class={`${noticePrefixCls}-progress`} max="100" value={validPercent}>
            {`${validPercent}%`}
          </progress>
        )}
      </div>
    )
  }
})

export default Notify
