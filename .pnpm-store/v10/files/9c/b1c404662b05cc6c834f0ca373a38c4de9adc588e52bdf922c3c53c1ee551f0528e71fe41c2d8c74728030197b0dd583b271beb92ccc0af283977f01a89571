import { h, Teleport, ref, Ref, inject, reactive, nextTick, provide, watch, PropType, onMounted, onUnmounted, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { useSize, getIcon, getConfig, getI18n, globalEvents, GLOBAL_EVENT_KEYS, createEvent, renderEmptyElement } from '../../ui'
import { getLastZIndex, nextZIndex, getFuncText } from '../../ui/src/utils'
import { getDomNode, toCssUnit } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'
import VxeButtonComponent from '../../button/src/button'
import VxeLoadingComponent from '../../loading/index'

import type { VxeDrawerPropTypes, DrawerReactData, VxeDrawerEmits, DrawerPrivateRef, DrawerMethods, DrawerPrivateMethods, VxeDrawerPrivateComputed, VxeDrawerConstructor, VxeDrawerMethods, VxeButtonInstance, DrawerEventTypes, ValueOf, VxeModalConstructor, VxeModalMethods, VxeFormConstructor, VxeFormPrivateMethods } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

export const allActiveDrawers: VxeDrawerConstructor[] = []

export default defineVxeComponent({
  name: 'VxeDrawer',
  props: {
    modelValue: Boolean as PropType<VxeDrawerPropTypes.ModelValue>,
    id: String as PropType<VxeDrawerPropTypes.ID>,
    title: String as PropType<VxeDrawerPropTypes.Title>,
    loading: {
      type: Boolean as PropType<VxeDrawerPropTypes.Loading>,
      default: null
    },
    className: String as PropType<VxeDrawerPropTypes.ClassName>,
    position: {
      type: [String, Object] as PropType<VxeDrawerPropTypes.Position>,
      default: () => getConfig().drawer.position
    },
    lockView: {
      type: Boolean as PropType<VxeDrawerPropTypes.LockView>,
      default: () => getConfig().drawer.lockView
    },
    lockScroll: Boolean as PropType<VxeDrawerPropTypes.LockScroll>,
    mask: {
      type: Boolean as PropType<VxeDrawerPropTypes.Mask>,
      default: () => getConfig().drawer.mask
    },
    maskClosable: {
      type: Boolean as PropType<VxeDrawerPropTypes.MaskClosable>,
      default: () => getConfig().drawer.maskClosable
    },
    escClosable: {
      type: Boolean as PropType<VxeDrawerPropTypes.EscClosable>,
      default: () => getConfig().drawer.escClosable
    },
    cancelClosable: {
      type: Boolean as PropType<VxeDrawerPropTypes.CancelClosable>,
      default: () => getConfig().drawer.cancelClosable
    },
    confirmClosable: {
      type: Boolean as PropType<VxeDrawerPropTypes.ConfirmClosable>,
      default: () => getConfig().drawer.confirmClosable
    },
    showHeader: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowHeader>,
      default: () => getConfig().drawer.showHeader
    },
    showFooter: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowFooter>,
      default: () => getConfig().drawer.showFooter
    },
    showClose: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowClose>,
      default: () => getConfig().drawer.showClose
    },
    content: [Number, String] as PropType<VxeDrawerPropTypes.Content>,
    showCancelButton: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowCancelButton>,
      default: null
    },
    cancelButtonText: {
      type: String as PropType<VxeDrawerPropTypes.CancelButtonText>,
      default: () => getConfig().drawer.cancelButtonText
    },
    showConfirmButton: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowConfirmButton>,
      default: () => getConfig().drawer.showConfirmButton
    },
    confirmButtonText: {
      type: String as PropType<VxeDrawerPropTypes.ConfirmButtonText>,
      default: () => getConfig().drawer.confirmButtonText
    },
    destroyOnClose: {
      type: Boolean as PropType<VxeDrawerPropTypes.DestroyOnClose>,
      default: () => getConfig().drawer.destroyOnClose
    },
    showTitleOverflow: {
      type: Boolean as PropType<VxeDrawerPropTypes.ShowTitleOverflow>,
      default: () => getConfig().drawer.showTitleOverflow
    },
    width: [Number, String] as PropType<VxeDrawerPropTypes.Width>,
    height: [Number, String] as PropType<VxeDrawerPropTypes.Height>,
    resize: {
      type: Boolean as PropType<VxeDrawerPropTypes.Resize>,
      default: () => getConfig().drawer.resize
    },
    zIndex: Number as PropType<VxeDrawerPropTypes.ZIndex>,
    transfer: {
      type: Boolean as PropType<VxeDrawerPropTypes.Transfer>,
      default: () => getConfig().drawer.transfer
    },
    padding: {
      type: Boolean as PropType<VxeDrawerPropTypes.Padding>,
      default: () => getConfig().drawer.padding
    },
    size: {
      type: String as PropType<VxeDrawerPropTypes.Size>,
      default: () => getConfig().drawer.size || getConfig().size
    },
    beforeHideMethod: {
      type: Function as PropType<VxeDrawerPropTypes.BeforeHideMethod>,
      default: () => getConfig().drawer.beforeHideMethod
    },
    slots: Object as PropType<VxeDrawerPropTypes.Slots>
  },
  emits: [
    'update:modelValue',
    'show',
    'hide',
    'before-hide',
    'close',
    'confirm',
    'cancel',
    'resize'
  ] as VxeDrawerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods)| null>('$xeModal', null)
    const $xeParentDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods)| null>('$xeForm', null)

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refDrawerBox = ref() as Ref<HTMLDivElement>
    const refConfirmBtn = ref<VxeButtonInstance>()
    const refCancelBtn = ref<VxeButtonInstance>()

    const reactData = reactive<DrawerReactData>({
      initialized: false,
      visible: false,
      contentVisible: false,
      drawerZIndex: 0,
      resizeFlag: 1
    })

    const refMaps: DrawerPrivateRef = {
      refElem
    }

    const computeBtnTransfer = computed(() => {
      const { transfer } = props
      if (transfer === null) {
        const globalTransfer = getConfig().modal.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeParentDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

    const computeDragType = computed(() => {
      switch (props.position) {
        case 'top':
          return 'sb'
        case 'bottom':
          return 'st'
        case 'left':
          return 'wr'
      }
      return 'wl'
    })

    const computeMaps: VxeDrawerPrivateComputed = {
    }

    const $xeDrawer = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeDrawerConstructor & VxeDrawerMethods

    const getBox = () => {
      const boxElem = refDrawerBox.value
      return boxElem
    }

    const recalculate = () => {
      const { width, height } = props
      const boxElem = getBox()
      if (boxElem) {
        boxElem.style.width = toCssUnit(width)
        boxElem.style.height = toCssUnit(height)
      }
      return nextTick()
    }

    const updateZindex = () => {
      const { zIndex } = props
      const { drawerZIndex } = reactData
      if (zIndex) {
        reactData.drawerZIndex = zIndex
      } else if (drawerZIndex < getLastZIndex()) {
        reactData.drawerZIndex = nextZIndex()
      }
    }

    const removeActiveQueue = () => {
      if (allActiveDrawers.indexOf($xeDrawer) > -1) {
        XEUtils.remove(allActiveDrawers, item => item === $xeDrawer)
      }
    }

    const closeDrawer = (type: DrawerEventTypes) => {
      const { beforeHideMethod } = props
      const { visible } = reactData
      const params = { type }
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then((rest) => {
          if (!XEUtils.isError(rest)) {
            reactData.contentVisible = false
            removeActiveQueue()
            dispatchEvent('before-hide', params, null)
            setTimeout(() => {
              reactData.visible = false
              emit('update:modelValue', false)
              dispatchEvent('hide', params, null)
            }, 200)
          }
        }).catch(e => e)
      }
      return nextTick()
    }

    const closeEvent = (evnt: Event) => {
      const type = 'close'
      dispatchEvent(type, { type }, evnt)
      closeDrawer(type)
    }

    const confirmEvent = (evnt: Event) => {
      const { confirmClosable } = props
      const type = 'confirm'
      dispatchEvent(type, { type }, evnt)
      if (confirmClosable) {
        closeDrawer(type)
      }
    }

    const cancelEvent = (evnt: Event) => {
      const { cancelClosable } = props
      const type = 'cancel'
      dispatchEvent(type, { type }, evnt)
      if (cancelClosable) {
        closeDrawer(type)
      }
    }

    const openDrawer = () => {
      const { showFooter } = props
      const { initialized, visible } = reactData
      if (!initialized) {
        reactData.initialized = true
      }
      if (!visible) {
        reactData.visible = true
        reactData.contentVisible = false
        updateZindex()
        allActiveDrawers.push($xeDrawer)
        setTimeout(() => {
          recalculate()
          reactData.contentVisible = true
          nextTick(() => {
            if (showFooter) {
              const confirmBtn = refConfirmBtn.value
              const cancelBtn = refCancelBtn.value
              const operBtn = confirmBtn || cancelBtn
              if (operBtn) {
                operBtn.focus()
              }
            }
            const type = ''
            const params = { type }
            emit('update:modelValue', true)
            dispatchEvent('show', params, null)
          })
        }, 10)
      }
      return nextTick()
    }

    const dispatchEvent = (type: ValueOf<VxeDrawerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $drawer: $xeDrawer }, params))
    }

    const drawerMethods: DrawerMethods = {
      dispatchEvent,
      open: openDrawer,
      close () {
        return closeDrawer('close')
      },
      getBox
    }

    const selfClickEvent = (evnt: Event) => {
      const el = refElem.value
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask'
        closeDrawer(type)
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      if (isEsc) {
        const lastDrawer = XEUtils.max(allActiveDrawers, (item) => item.reactData.drawerZIndex)
        // 多个时，只关掉最上层的窗口
        if (lastDrawer) {
          setTimeout(() => {
            if (lastDrawer === $xeDrawer && lastDrawer.props.escClosable) {
              const type = 'exit'
              dispatchEvent('close', { type }, evnt)
              closeDrawer(type)
            }
          }, 10)
        }
      }
    }

    const boxMousedownEvent = () => {
      const { drawerZIndex } = reactData
      if (allActiveDrawers.some(comp => comp.reactData.visible && comp.reactData.drawerZIndex > drawerZIndex)) {
        updateZindex()
      }
    }

    const dragEvent = (evnt: MouseEvent) => {
      evnt.preventDefault()
      const { visibleHeight, visibleWidth } = getDomNode()
      const marginSize = 0
      const targetElem = evnt.target as HTMLSpanElement
      const type = targetElem.getAttribute('type')
      const minWidth = 0
      const minHeight = 0
      const maxWidth = visibleWidth
      const maxHeight = visibleHeight
      const boxElem = getBox()
      const clientWidth = boxElem.clientWidth
      const clientHeight = boxElem.clientHeight
      const disX = evnt.clientX
      const disY = evnt.clientY
      const offsetTop = boxElem.offsetTop
      const offsetLeft = boxElem.offsetLeft
      const params = { type: 'resize' }
      document.onmousemove = evnt => {
        evnt.preventDefault()
        let dragLeft
        let dragTop
        let width
        let height
        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX
            width = dragLeft + clientWidth
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            break
          case 'st':
            dragTop = disY - evnt.clientY
            height = clientHeight + dragTop
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
          case 'wr':
            dragLeft = evnt.clientX - disX
            width = dragLeft + clientWidth
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            break
          case 'sb':
            dragTop = evnt.clientY - disY
            height = dragTop + clientHeight
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
        }
        boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag'
        dispatchEvent('resize', params, evnt)
        reactData.resizeFlag++
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        reactData.resizeFlag++
        setTimeout(() => {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '')
        }, 50)
      }
    }

    const formDesignPrivateMethods: DrawerPrivateMethods = {}

    Object.assign($xeDrawer, drawerMethods, formDesignPrivateMethods)

    const renderTitles = () => {
      const { slots: propSlots = {}, showClose, title } = props
      const titleSlot = slots.title || propSlots.title
      const cornerSlot = slots.corner || propSlots.corner
      return [
        h('div', {
          class: 'vxe-drawer--header-title'
        }, titleSlot ? getSlotVNs(titleSlot({ $drawer: $xeDrawer })) : (title ? getFuncText(title) : getI18n('vxe.alert.title'))),
        h('div', {
          class: 'vxe-drawer--header-right'
        }, [
          cornerSlot
            ? h('div', {
              class: 'vxe-drawer--corner-wrapper'
            }, getSlotVNs(cornerSlot({ $drawer: $xeDrawer })))
            : renderEmptyElement($xeDrawer),
          showClose
            ? h('div', {
              class: ['vxe-drawer--close-btn', 'trigger--btn'],
              title: getI18n('vxe.drawer.close'),
              onClick: closeEvent
            }, [
              h('i', {
                class: getIcon().DRAWER_CLOSE
              })
            ])
            : renderEmptyElement($xeDrawer)
        ])
      ]
    }

    const renderHeader = () => {
      const { slots: propSlots = {}, showTitleOverflow } = props
      const headerSlot = slots.header || propSlots.header
      if (props.showHeader) {
        return h('div', {
          class: ['vxe-drawer--header', {
            'is--ellipsis': showTitleOverflow
          }]
        }, headerSlot ? getSlotVNs(headerSlot({ $drawer: $xeDrawer })) : renderTitles())
      }
      return renderEmptyElement($xeDrawer)
    }

    const renderBody = () => {
      const { slots: propSlots = {}, content } = props
      const defaultSlot = slots.default || propSlots.default
      const leftSlot = slots.left || propSlots.left
      const rightSlot = slots.right || propSlots.right
      return h('div', {
        class: 'vxe-drawer--body'
      }, [
        leftSlot
          ? h('div', {
            class: 'vxe-drawer--body-left'
          }, getSlotVNs(leftSlot({ $drawer: $xeDrawer })))
          : renderEmptyElement($xeDrawer),
        h('div', {
          class: 'vxe-drawer--body-default'
        }, [
          h('div', {
            class: 'vxe-drawer--content'
          }, defaultSlot ? getSlotVNs(defaultSlot({ $drawer: $xeDrawer })) : getFuncText(content))
        ]),
        rightSlot
          ? h('div', {
            class: 'vxe-drawer--body-right'
          }, getSlotVNs(rightSlot({ $drawer: $xeDrawer })))
          : renderEmptyElement($xeDrawer),
        h(VxeLoadingComponent, {
          class: 'vxe-drawer--loading',
          modelValue: props.loading
        })
      ])
    }

    const renderDefaultFooter = () => {
      const { slots: propSlots = {}, showCancelButton, showConfirmButton, loading } = props
      const lfSlot = slots.leftfoot || propSlots.leftfoot
      const rfSlot = slots.rightfoot || propSlots.rightfoot
      const btnVNs = []
      if (showCancelButton) {
        btnVNs.push(
          h(VxeButtonComponent, {
            key: 1,
            ref: refCancelBtn,
            content: props.cancelButtonText || getI18n('vxe.button.cancel'),
            onClick: cancelEvent
          })
        )
      }
      if (showConfirmButton) {
        btnVNs.push(
          h(VxeButtonComponent, {
            key: 2,
            ref: refConfirmBtn,
            loading: loading,
            status: 'primary',
            content: props.confirmButtonText || getI18n('vxe.button.confirm'),
            onClick: confirmEvent
          })
        )
      }
      return h('div', {
        class: 'vxe-drawer--footer-wrapper'
      }, [
        h('div', {
          class: 'vxe-drawer--footer-left'
        }, lfSlot ? getSlotVNs(lfSlot({ $drawer: $xeDrawer })) : []),
        h('div', {
          class: 'vxe-drawer--footer-right'
        }, rfSlot ? getSlotVNs(rfSlot({ $drawer: $xeDrawer })) : btnVNs)
      ])
    }

    const renderFooter = () => {
      const { slots: propSlots = {} } = props
      const footerSlot = slots.footer || propSlots.footer
      if (props.showFooter) {
        return h('div', {
          class: 'vxe-drawer--footer'
        }, footerSlot ? getSlotVNs(footerSlot({ $drawer: $xeDrawer })) : [renderDefaultFooter()])
      }
      return renderEmptyElement($xeDrawer)
    }

    const renderVN = () => {
      const { slots: propSlots = {}, className, position, loading, lockScroll, padding, lockView, mask, resize, destroyOnClose } = props
      const { initialized, contentVisible, visible } = reactData
      const asideSlot = slots.aside || propSlots.aside
      const vSize = computeSize.value
      const dragType = computeDragType.value
      const btnTransfer = computeBtnTransfer.value
      return h(Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [
        h('div', {
          ref: refElem,
          class: ['vxe-drawer--wrapper', `pos--${position}`, className || '', {
            [`size--${vSize}`]: vSize,
            'is--padding': padding,
            'lock--scroll': lockScroll,
            'lock--view': lockView,
            'is--resize': resize,
            'is--mask': mask,
            'is--visible': contentVisible,
            'is--active': visible,
            'is--loading': loading
          }],
          style: {
            zIndex: reactData.drawerZIndex
          },
          onClick: selfClickEvent
        }, [
          h('div', {
            ref: refDrawerBox,
            class: 'vxe-drawer--box',
            onMousedown: boxMousedownEvent
          }, [
            asideSlot
              ? h('div', {
                class: 'vxe-drawer--aside'
              }, getSlotVNs(asideSlot({ $drawer: $xeDrawer })))
              : renderEmptyElement($xeDrawer),
            h('div', {
              class: 'vxe-drawer--container'
            }, !reactData.initialized || (destroyOnClose && !reactData.visible)
              ? []
              : [
                  renderHeader(),
                  renderBody(),
                  renderFooter(),
                  resize
                    ? h('span', {
                      class: 'vxe-drawer--resize'
                    }, [
                      h('span', {
                        class: `${dragType}-resize`,
                        type: dragType,
                        onMousedown: dragEvent
                      })
                    ])
                    : renderEmptyElement($xeDrawer)
                ])
          ])
        ])
      ])
    }

    watch(() => props.width, recalculate)
    watch(() => props.height, recalculate)

    watch(() => props.modelValue, (value) => {
      if (value) {
        openDrawer()
      } else {
        closeDrawer('model')
      }
    })

    onMounted(() => {
      nextTick(() => {
        if (props.modelValue) {
          openDrawer()
        }
        recalculate()
      })
      if (props.escClosable) {
        globalEvents.on($xeDrawer, 'keydown', handleGlobalKeydownEvent)
      }
    })

    onUnmounted(() => {
      globalEvents.off($xeDrawer, 'keydown')
      removeActiveQueue()
    })

    provide('$xeDrawer', $xeDrawer)

    $xeDrawer.renderVN = renderVN

    return $xeDrawer
  },
  render () {
    return this.renderVN()
  }
})
