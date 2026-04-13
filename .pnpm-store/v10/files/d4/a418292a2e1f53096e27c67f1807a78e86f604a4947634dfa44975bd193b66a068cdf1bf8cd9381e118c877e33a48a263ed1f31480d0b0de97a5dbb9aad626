import { h, Teleport, PropType, ref, inject, watch, computed, provide, onUnmounted, reactive, nextTick, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, getI18n, globalEvents, createEvent, renderer, useSize, GLOBAL_EVENT_KEYS, renderEmptyElement } from '../../ui'
import { getEventTargetNode, updatePanelPlacement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, getFuncText } from '../../ui/src/utils'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeIconPickerPropTypes, VxeIconPickerConstructor, IconPickerInternalData, ValueOf, IconPickerReactData, VxeIconPickerEmits, IconPickerMethods, IconPickerPrivateRef, VxeIconPickerMethods, VxeIconPickerDefines, VxeDrawerConstructor, VxeDrawerMethods, VxeFormDefines, VxeFormConstructor, VxeFormPrivateMethods, VxeModalConstructor, VxeModalMethods } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

export default defineVxeComponent({
  name: 'VxeIconPicker',
  props: {
    modelValue: String as PropType<VxeIconPickerPropTypes.ModelValue>,
    placeholder: String as PropType<VxeIconPickerPropTypes.Placeholder>,
    clearable: Boolean as PropType<VxeIconPickerPropTypes.Clearable>,
    size: {
      type: String as PropType<VxeIconPickerPropTypes.Size>,
      default: () => getConfig().iconPicker.size || getConfig().size
    },
    className: [String, Function] as PropType<VxeIconPickerPropTypes.ClassName>,
    /**
     * 已废弃，请使用 popupConfig.className
     * @deprecated
     */
    popupClassName: [String, Function] as PropType<VxeIconPickerPropTypes.PopupClassName>,
    showIconTitle: {
      type: Boolean as PropType<VxeIconPickerPropTypes.ShowIconTitle>,
      default: () => getConfig().iconPicker.showIconTitle
    },
    readonly: {
      type: Boolean as PropType<VxeIconPickerPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeIconPickerPropTypes.Disabled>,
      default: null
    },
    icons: Array as PropType<VxeIconPickerPropTypes.Icons>,
    placement: String as PropType<VxeIconPickerPropTypes.Placement>,
    popupConfig: Object as PropType<VxeIconPickerPropTypes.PopupConfig>,
    transfer: {
      type: Boolean as PropType<VxeIconPickerPropTypes.Transfer>,
      default: null
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'clear',
    'click'
  ] as VxeIconPickerEmits,
  setup (props, context) {
    const { emit } = context

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods) | null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods) | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<IconPickerReactData>({
      initialized: false,
      selectIcon: `${props.modelValue || ''}`,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    })

    const internalData: IconPickerInternalData = {
      // hpTimeout: undefined
    }

    const refElem = ref<HTMLDivElement>()
    const refInput = ref<HTMLInputElement>()
    const refOptionPanel = ref<HTMLDivElement>()

    const refMaps: IconPickerPrivateRef = {
      refElem
    }

    const $xeIconPicker = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as unknown as VxeIconPickerConstructor & VxeIconPickerMethods

    let iconPickerMethods = {} as IconPickerMethods

    const computeFormReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly
        }
        return false
      }
      return readonly
    })

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeBtnTransfer = computed(() => {
      const { transfer } = props
      const popupOpts = computePopupOpts.value
      if (XEUtils.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer
      }
      if (transfer === null) {
        const globalTransfer = getConfig().iconPicker.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

    const computeInpPlaceholder = computed(() => {
      const { placeholder } = props
      if (placeholder) {
        return getFuncText(placeholder)
      }
      const globalPlaceholder = getConfig().select.placeholder
      if (globalPlaceholder) {
        return getFuncText(globalPlaceholder)
      }
      return getI18n('vxe.base.pleaseSelect')
    })

    const computeIconList = computed<VxeIconPickerDefines.IconItemObj[]>(() => {
      let { icons } = props
      if (!icons || !icons.length) {
        icons = getConfig().iconPicker.icons || []
      }
      return icons.map(item => {
        if (XEUtils.isString(item)) {
          return {
            title: item,
            icon: `vxe-icon-${`${item || ''}`.replace(/^vxe-icon-/, '')}`
          }
        }
        return {
          title: `${item.title || ''}`,
          icon: item.icon || '',
          iconRender: item.iconRender
        }
      })
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().iconPicker.popupConfig, props.popupConfig)
    })

    const computeIconGroupList = computed(() => {
      const iconList = computeIconList.value
      return XEUtils.chunk(iconList, 4)
    })

    const computeSelectIconItem = computed(() => {
      const { selectIcon } = reactData
      const iconList = computeIconList.value
      return selectIcon ? iconList.find(item => item.icon === selectIcon) : null
    })

    const updateZindex = () => {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      const { placement } = props
      const { panelIndex } = reactData
      const targetElem = refElem.value
      const panelElem = refOptionPanel.value
      const btnTransfer = computeBtnTransfer.value
      const popupOpts = computePopupOpts.value
      const handleStyle = () => {
        const ppObj = updatePanelPlacement(targetElem, panelElem, {
          placement: popupOpts.placement || placement,
          defaultPlacement: popupOpts.defaultPlacement,
          teleportTo: btnTransfer
        })
        const panelStyle: { [key: string]: string | number } = Object.assign(ppObj.style, {
          zIndex: panelIndex
        })
        reactData.panelStyle = panelStyle
        reactData.panelPlacement = ppObj.placement
      }
      handleStyle()
      return nextTick().then(handleStyle)
    }

    const showOptionPanel = () => {
      const { hpTimeout } = internalData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (hpTimeout) {
          clearTimeout(hpTimeout)
          internalData.hpTimeout = undefined
        }
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        setTimeout(() => {
          reactData.visiblePanel = true
          updatePlacement()
        }, 10)
        updateZindex()
        updatePlacement()
      }
    }

    const hideOptionPanel = () => {
      reactData.visiblePanel = false
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false
      }, 350)
    }

    const changeEvent = (evnt: Event, selectValue: any) => {
      reactData.selectIcon = selectValue
      if (selectValue !== props.modelValue) {
        emit('update:modelValue', selectValue)
        dispatchEvent('change', { value: selectValue }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, selectValue)
        }
      }
    }

    const focusEvent = () => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (!reactData.visiblePanel) {
          showOptionPanel()
        }
      }
    }

    const blurEvent = () => {
      reactData.isActivated = false
    }

    const clearValueEvent = (evnt: Event, selectValue: any) => {
      changeEvent(evnt, selectValue)
      dispatchEvent('clear', { value: selectValue }, evnt)
    }

    const clearEvent = (params: any, evnt: Event) => {
      clearValueEvent(evnt, null)
      hideOptionPanel()
    }

    const togglePanelEvent = (evnt: MouseEvent) => {
      evnt.preventDefault()
      if (reactData.visiblePanel) {
        hideOptionPanel()
      } else {
        showOptionPanel()
      }
    }

    const clickEvent = (evnt: MouseEvent) => {
      togglePanelEvent(evnt)
      dispatchEvent('click', {}, evnt)
    }

    const handleGlobalMousewheelEvent = (evnt: MouseEvent) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (visiblePanel) {
          const panelElem = refOptionPanel.value
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement()
          } else {
            hideOptionPanel()
          }
        }
      }
    }

    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const el = refElem.value
        const panelElem = refOptionPanel.value
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag
        if (visiblePanel && !reactData.isActivated) {
          hideOptionPanel()
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { clearable } = props
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
        const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
        const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
        const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
        const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
        const isDel = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
        const isSpacebar = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.SPACEBAR)
        if (isTab) {
          reactData.isActivated = false
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            hideOptionPanel()
          } else if (isEnter) {
            evnt.preventDefault()
            evnt.stopPropagation()
            // changeOptionEvent(evnt, currentValue, currentOption)
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault()
            // let { firstOption, offsetOption } = findOffsetOption(currentValue, isUpArrow)
            // if (!offsetOption && !findVisibleOption(currentValue)) {
            //   offsetOption = firstOption
            // }
            // setCurrentOption(offsetOption)
            // scrollToOption(offsetOption, isDwArrow)
          } else if (isSpacebar) {
            evnt.preventDefault()
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && reactData.isActivated) {
          evnt.preventDefault()
          showOptionPanel()
        }
        if (reactData.isActivated) {
          if (isDel && clearable) {
            clearValueEvent(evnt, null)
          }
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { visiblePanel, isActivated } = reactData
      if (visiblePanel) {
        hideOptionPanel()
      }
      if (isActivated) {
        reactData.isActivated = false
      }
      if (visiblePanel || isActivated) {
        const $input = refInput.value
        if ($input) {
          $input.blur()
        }
      }
    }

    const dispatchEvent = (type: ValueOf<VxeIconPickerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $iconPicker: $xeIconPicker }, params))
    }

    iconPickerMethods = {
      dispatchEvent,
      isPanelVisible () {
        return reactData.visiblePanel
      },
      togglePanel () {
        if (reactData.visiblePanel) {
          hideOptionPanel()
        } else {
          showOptionPanel()
        }
        return nextTick()
      },
      hidePanel () {
        if (reactData.visiblePanel) {
          hideOptionPanel()
        }
        return nextTick()
      },
      showPanel () {
        if (!reactData.visiblePanel) {
          showOptionPanel()
        }
        return nextTick()
      },
      focus () {
        const $input = refInput.value
        reactData.isActivated = true
        if ($input) {
          $input.blur()
        }
        return nextTick()
      },
      blur () {
        const $input = refInput.value
        if ($input) {
          $input.blur()
        }
        reactData.isActivated = false
        return nextTick()
      }
    }

    const handleClickIconEvent = (evnt: MouseEvent, item: VxeIconPickerDefines.IconItemObj) => {
      const value = item.icon
      changeEvent(evnt, value)
      hideOptionPanel()
    }

    Object.assign($xeIconPicker, iconPickerMethods)

    const renderIconWrapper = () => {
      const { showIconTitle } = props
      const { selectIcon } = reactData
      const iconGroupList = computeIconGroupList.value
      const isDisabled = computeIsDisabled.value

      return h('div', {
        class: 'vxe-ico-picker--list-wrapper'
      }, iconGroupList.map(list => {
        return h('div', {
          class: 'vxe-ico-picker--list'
        }, list.map(item => {
          const { iconRender } = item
          const compConf = iconRender ? renderer.get(iconRender.name) : null
          const oIconMethod = compConf ? compConf.renderIconPickerOptionIcon : null
          return h('div', {
            class: ['vxe-ico-picker--item', {
              'is--selected': selectIcon === item.icon
            }],
            onClick (evnt) {
              if (!isDisabled) {
                handleClickIconEvent(evnt, item)
              }
            }
          }, [
            h('div', {
              class: 'vxe-ico-picker--item-icon'
            }, oIconMethod && iconRender
              ? getSlotVNs(oIconMethod(iconRender, { $iconPicker: $xeIconPicker, option: item }))
              : [
                  h('i', {
                    class: item.icon || ''
                  })
                ]),
            showIconTitle
              ? h('div', {
                class: 'vxe-ico-picker--item-title'
              }, `${item.title || ''}`)
              : renderEmptyElement($xeIconPicker)
          ])
        }))
      }))
    }

    const renderIconView = () => {
      const { selectIcon } = reactData
      const selectIconItem = computeSelectIconItem.value
      if (selectIconItem) {
        const { iconRender } = selectIconItem
        const compConf = iconRender ? renderer.get(iconRender.name) : null
        const oIconMethod = compConf ? compConf.renderIconPickerOptionIcon : null
        if (oIconMethod && iconRender) {
          return h('div', {
            key: 'inc',
            class: 'vxe-ico-picker--icon'
          }, getSlotVNs(oIconMethod(iconRender, { $iconPicker: $xeIconPicker, option: selectIconItem })))
        }
      }
      return h('div', {
        key: 'ind',
        class: 'vxe-ico-picker--icon'
      }, [
        h('i', {
          class: selectIcon
        })
      ])
    }

    const renderVN = () => {
      const { className, clearable } = props
      const { initialized, isActivated, isAniVisible, visiblePanel, selectIcon } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const btnTransfer = computeBtnTransfer.value
      const formReadonly = computeFormReadonly.value
      const inpPlaceholder = computeInpPlaceholder.value
      const popupOpts = computePopupOpts.value
      const ppClassName = popupOpts.className || props.popupClassName

      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-ico-picker--readonly', className]
        }, [
          h('i', {
            class: selectIcon
          })
        ])
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-ico-picker', className ? (XEUtils.isFunction(className) ? className({ $iconPicker: $xeIconPicker }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'show--clear': clearable && !isDisabled && !!selectIcon,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--active': isActivated
        }]
      }, [
        h('div', {
          class: 'vxe-ico-picker--inner',
          onClick: clickEvent
        }, [
          h('input', {
            ref: refInput,
            class: 'vxe-ico-picker--input',
            onFocus: focusEvent,
            onBlur: blurEvent
          }),
          selectIcon
            ? renderIconView()
            : h('div', {
              class: 'vxe-ico-picker--placeholder'
            }, inpPlaceholder),
          h('div', {
            class: 'vxe-ico-picker--suffix'
          }, [
            h('div', {
              class: 'vxe-ico-picker--clear-icon',
              onClick: clearEvent
            }, [
              h('i', {
                class: getIcon().INPUT_CLEAR
              })
            ]),
            h('div', {
              class: 'vxe-ico-picker--suffix-icon'
            }, [
              h('i', {
                class: visiblePanel ? getIcon().ICON_PICKER_OPEN : getIcon().ICON_PICKER_CLOSE
              })
            ])
          ])
        ]),
        h(Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [
          h('div', {
            ref: refOptionPanel,
            class: ['vxe-table--ignore-clear vxe-ico-picker--panel', ppClassName ? (XEUtils.isFunction(ppClassName) ? ppClassName({ $iconPicker: $xeIconPicker }) : ppClassName) : '', {
              [`size--${vSize}`]: vSize,
              'is--transfer': btnTransfer,
              'ani--leave': isAniVisible,
              'ani--enter': visiblePanel
            }],
            placement: reactData.panelPlacement,
            style: reactData.panelStyle
          }, [
            initialized && (visiblePanel || isAniVisible)
              ? h('div', {
                class: 'vxe-ico-picker--panel-wrapper'
              }, [
                renderIconWrapper()
              ])
              : renderEmptyElement($xeIconPicker)
          ])
        ])
      ])
    }

    watch(() => props.modelValue, (val) => {
      reactData.selectIcon = `${val || ''}`
    })

    onMounted(() => {
      globalEvents.on($xeIconPicker, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeIconPicker, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeIconPicker, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeIconPicker, 'blur', handleGlobalBlurEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeIconPicker, 'mousewheel')
      globalEvents.off($xeIconPicker, 'mousedown')
      globalEvents.off($xeIconPicker, 'keydown')
      globalEvents.off($xeIconPicker, 'blur')
    })

    provide('$xeIconPicker', $xeIconPicker)

    $xeIconPicker.renderVN = renderVN

    return $xeIconPicker
  },
  render () {
    return this.renderVN()
  }
})
