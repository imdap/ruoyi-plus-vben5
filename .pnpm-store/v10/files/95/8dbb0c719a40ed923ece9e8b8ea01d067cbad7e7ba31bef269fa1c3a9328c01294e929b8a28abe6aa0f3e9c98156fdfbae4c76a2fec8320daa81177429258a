import { watch, computed, provide, ref, inject, Teleport, h, nextTick, PropType, reactive, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getIcon, getConfig, getI18n, globalEvents, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getEventTargetNode, toCssUnit, updatePanelPlacement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex } from '../../ui/src/utils'
import { parseColor, updateColorAlpha, hexToHsv, rgbToHsv, rgbToHex, hexToRgb, hsvToRgb, toRgb } from './util'
import VxeButtonComponent from '../../button/src/button'
import VxeInputComponent from '../../input/src/input'
import VxeNumberInputComponent from '../../number-input/src/number-input'

import type { ColorPickerReactData, VxeColorPickerPropTypes, VxeColorPickerEmits, ColorPickerInternalData, ColorPickerMethods, ColorPickerPrivateMethods, ValueOf, ColorPickerPrivateRef, VxeColorPickerPrivateComputed, VxeColorPickerConstructor, VxeColorPickerPrivateMethods, VxeModalConstructor, VxeModalMethods, VxeDrawerConstructor, VxeDrawerMethods, VxeFormDefines, VxeFormConstructor, VxeFormPrivateMethods } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

export default defineVxeComponent({
  name: 'VxeColorPicker',
  props: {
    modelValue: String as PropType<VxeColorPickerPropTypes.ModelValue>,
    placeholder: String as PropType<VxeColorPickerPropTypes.Placeholder>,
    clearable: {
      type: Boolean as PropType<VxeColorPickerPropTypes.Clearable>,
      default: () => getConfig().colorPicker.clearable
    },
    type: {
      type: String as PropType<VxeColorPickerPropTypes.Type>,
      default: () => getConfig().colorPicker.type
    },
    size: {
      type: String as PropType<VxeColorPickerPropTypes.Size>,
      default: () => getConfig().colorPicker.size || getConfig().size
    },
    className: [String, Function] as PropType<VxeColorPickerPropTypes.ClassName>,
    popupClassName: [String, Function] as PropType<VxeColorPickerPropTypes.PopupClassName>,
    colors: {
      type: Array as PropType<VxeColorPickerPropTypes.Colors>,
      default: () => XEUtils.clone(getConfig().colorPicker.colors, true) || []
    },
    showAlpha: {
      type: Boolean as PropType<VxeColorPickerPropTypes.ShowAlpha>,
      default: () => getConfig().colorPicker.showAlpha
    },
    showEyeDropper: {
      type: Boolean as PropType<VxeColorPickerPropTypes.ShowEyeDropper>,
      default: () => getConfig().colorPicker.showEyeDropper
    },
    showColorExtractor: {
      type: Boolean as PropType<VxeColorPickerPropTypes.ShowColorExtractor>,
      default: () => getConfig().colorPicker.showColorExtractor
    },
    showQuick: {
      type: Boolean as PropType<VxeColorPickerPropTypes.ShowQuick>,
      default: () => getConfig().colorPicker.showQuick
    },
    readonly: {
      type: Boolean as PropType<VxeColorPickerPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeColorPickerPropTypes.Disabled>,
      default: null
    },
    clickToCopy: {
      type: Boolean as PropType<VxeColorPickerPropTypes.ClickToCopy>,
      default: () => getConfig().colorPicker.clickToCopy
    },
    placement: String as PropType<VxeColorPickerPropTypes.Placement>,
    transfer: {
      type: Boolean as PropType<VxeColorPickerPropTypes.Transfer>,
      default: null
    },
    popupConfig: Object as PropType<VxeColorPickerPropTypes.PopupConfig>
  },
  emits: [
    'update:modelValue',
    'change',
    'clear',
    'click'
  ] as VxeColorPickerEmits,
  setup (props, context) {
    const { emit } = context

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods) | null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods) | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const WinEyeDropper = typeof window !== 'undefined' ? (window as any).EyeDropper : null

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refInputTarget = ref<HTMLInputElement>()
    const refOptionPanel = ref<HTMLDivElement>()
    const refHueSliderElem = ref<HTMLDivElement>()
    const refHueSliderBtnElem = ref<HTMLDivElement>()
    const refAlphaSliderElem = ref<HTMLDivElement>()
    const refAlphaSliderBtnElem = ref<HTMLDivElement>()
    const refColorPanelElem = ref<HTMLDivElement>()
    const refColorActiveElem = ref<HTMLDivElement>()

    const reactData = reactive<ColorPickerReactData>({
      initialized: false,
      selectTyle: 'hex',
      selectColor: `${props.modelValue || ''}`,
      showTypePopup: false,
      panelColor: '',
      hexValue: '',
      rValue: 0,
      gValue: 0,
      bValue: 0,
      aValue: 0,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    })

    const typeList = [
      { label: 'HEX', value: 'hex' },
      { label: 'RGB', value: 'rgb' }
    ]

    const internalData: ColorPickerInternalData = {
      // hpTimeout: undefined
    }

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
      if (transfer === null) {
        const globalTransfer = getConfig().colorPicker.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

    const computeColorList = computed(() => {
      const { colors } = props
      if (colors) {
        return colors.map(item => {
          if (XEUtils.isString(item)) {
            return {
              label: item,
              value: item
            }
          }
          return {
            label: XEUtils.eqNull(item.label) ? item.value : item.label,
            value: item.value
          }
        })
      }
      return []
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().colorPicker.popupConfig, props.popupConfig)
    })

    const computeIsRgb = computed(() => {
      const { selectTyle } = reactData
      return selectTyle === 'rgb'
    })

    const computeSelectTypeItem = computed(() => {
      const { selectTyle } = reactData
      return typeList.find(item => item.value === selectTyle)
    })

    const refMaps: ColorPickerPrivateRef = {
      refElem
    }

    const computeMaps: VxeColorPickerPrivateComputed = {
    }

    const $xeColorPicker = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeColorPickerConstructor & VxeColorPickerPrivateMethods

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const updateMode = () => {
      const { modelValue } = props
      reactData.selectColor = XEUtils.toValueString(modelValue)
      updateModelColor()
    }

    const updateType = () => {
      const { type } = props
      let selectTyle: VxeColorPickerPropTypes.Type = 'hex'
      if (type === 'rgb' || (type as string) === 'rgba') {
        selectTyle = 'rgb'
      }
      reactData.selectTyle = selectTyle
      updateMode()
    }

    const updateModelColor = () => {
      const { selectColor, isAniVisible } = reactData
      const isRgb = computeIsRgb.value
      const hueSliderEl = refHueSliderElem.value
      const alphaSliderEl = refAlphaSliderElem.value
      const colorRest = parseColor(selectColor)
      reactData.hexValue = colorRest.hex
      reactData.rValue = colorRest.r
      reactData.gValue = colorRest.g
      reactData.bValue = colorRest.b
      reactData.aValue = colorRest.a
      if (colorRest.value) {
        if (isRgb) {
          if (colorRest.type === 'hex') {
            const rgbRest = hexToRgb(colorRest.hex)
            if (rgbRest) {
              reactData.rValue = rgbRest.r
              reactData.gValue = rgbRest.g
              reactData.bValue = rgbRest.b
              reactData.aValue = rgbRest.a
            }
          }
        } else {
          if (colorRest.type !== 'hex') {
            reactData.hexValue = rgbToHex(colorRest)
          }
        }
      }
      if (isAniVisible) {
        const hsvRest = colorRest.type === 'hex' ? hexToHsv(colorRest.hex) : rgbToHsv(colorRest)
        const colorPanelEl = refColorPanelElem.value
        if (hsvRest) {
          if (colorPanelEl) {
            const offsetTop = colorPanelEl.clientHeight * (1 - hsvRest.v)
            const offsetLeft = colorPanelEl.clientWidth * hsvRest.s
            handlePanelColor(offsetLeft, offsetTop)
          }
          if (hueSliderEl) {
            handleHueColor(XEUtils.ceil((1 - hsvRest.h / 360) * hueSliderEl.clientWidth))
          }
        }
        if (alphaSliderEl) {
          handleAlphaColor(alphaSliderEl.clientWidth * colorRest.a)
        }
      }
    }

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
          updateModelColor()
          reactData.visiblePanel = true
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

    const changeEvent = (evnt: Event, value: any) => {
      reactData.selectColor = value
      if (value !== props.modelValue) {
        emitModel(value)
        dispatchEvent('change', { value }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    const clearValueEvent = (evnt: Event, selectValue: any) => {
      changeEvent(evnt, selectValue)
      dispatchEvent('clear', { value: selectValue }, evnt)
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

    const clearEvent = (evnt: Event) => {
      clearValueEvent(evnt, null)
      hideOptionPanel()
    }

    const confirmEvent = (evnt: MouseEvent) => {
      const { selectColor } = reactData
      changeEvent(evnt, selectColor)
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

    const handlePanelClickEvent = () => {
      reactData.showTypePopup = false
    }

    const toggleTypeVisibleEvent = (evnt: MouseEvent) => {
      evnt.stopPropagation()
      reactData.showTypePopup = !reactData.showTypePopup
    }

    const handleChangeType = (type: VxeColorPickerPropTypes.Type) => {
      const { selectTyle } = reactData
      if (type !== selectTyle) {
        reactData.selectTyle = type
        updateModelColor()
      }
      reactData.showTypePopup = false
    }

    const handleHueColor = (offsetLeft: number) => {
      const hueSliderEl = refHueSliderElem.value
      const hueSliderBtnEl = refHueSliderBtnElem.value
      if (hueSliderEl && hueSliderBtnEl) {
        if (offsetLeft < 0) {
          offsetLeft = 0
        }
        const barWidth = XEUtils.toInteger(hueSliderEl.clientWidth)
        const itemNum = 255
        const countNum = itemNum * 6
        const offsetX = XEUtils.ceil(countNum / barWidth * offsetLeft)
        const offsetNum = offsetX % itemNum
        let rNum = 0
        let gNum = 0
        let bNum = 0
        switch (Math.ceil(offsetX / itemNum)) {
          case 1:
            rNum = itemNum
            bNum = offsetNum
            break
          case 2:
            rNum = itemNum - offsetNum
            bNum = itemNum
            break
          case 3:
            gNum = offsetNum
            bNum = itemNum
            break
          case 4:
            gNum = itemNum
            bNum = itemNum - offsetNum
            break
          case 5:
            rNum = offsetNum
            gNum = itemNum
            break
          case 6:
            rNum = itemNum
            gNum = itemNum - offsetNum
            break
        }
        reactData.panelColor = toRgb(rNum, gNum, bNum)
        hueSliderBtnEl.style.left = toCssUnit(offsetLeft)
      }
    }

    const handleHueBarEvent = (evnt: MouseEvent) => {
      const hueSliderEl = refHueSliderElem.value
      const hueSliderBtnEl = refHueSliderBtnElem.value
      if (hueSliderEl && hueSliderBtnEl) {
        const hueSliderRect = hueSliderEl.getBoundingClientRect()
        const barWidth = XEUtils.toInteger(hueSliderEl.clientWidth)
        const offsetLeft = XEUtils.ceil(Math.min(barWidth - 1, Math.max(1, evnt.clientX - hueSliderRect.x)))
        handleHueColor(offsetLeft)
      }
    }

    const handleHueSliderMousedownEvent = (evnt: MouseEvent) => {
      evnt.preventDefault()
      document.onmousemove = evnt => {
        evnt.preventDefault()
        handleHueBarEvent(evnt)
      }
      document.onmouseup = (evnt: MouseEvent) => {
        document.onmousemove = null
        document.onmouseup = null
        handleHueBarEvent(evnt)
      }
    }

    const handleAlphaColor = (offsetLeft: number) => {
      const { selectColor } = reactData
      const alphaSliderEl = refAlphaSliderElem.value
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect()
        const barWidth = alphaSliderRect.width
        if (offsetLeft < 0) {
          offsetLeft = 0
        }
        if (offsetLeft > barWidth) {
          offsetLeft = barWidth
        }
        const alpha = XEUtils.ceil(100 / barWidth * offsetLeft / 100, 2)
        reactData.aValue = alpha
        alphaSliderBtnEl.style.left = toCssUnit(offsetLeft)
        reactData.selectColor = updateColorAlpha(selectColor, alpha)
      }
    }

    const handleAlphaBarEvent = (evnt: MouseEvent) => {
      const alphaSliderEl = refAlphaSliderElem.value
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect()
        const barWidth = alphaSliderRect.width
        const offsetLeft = Math.min(barWidth, Math.max(0, evnt.clientX - alphaSliderRect.x))
        handleAlphaColor(offsetLeft)
        updateModelColor()
      }
    }

    const handleAlphaSliderMousedownEvent = (evnt: MouseEvent) => {
      evnt.preventDefault()
      document.onmousemove = evnt => {
        evnt.preventDefault()
        handleAlphaBarEvent(evnt)
      }
      document.onmouseup = (evnt: MouseEvent) => {
        document.onmousemove = null
        document.onmouseup = null
        handleAlphaBarEvent(evnt)
      }
    }

    const handleInputRgbEvent = () => {
      const { rValue, gValue, bValue, aValue } = reactData
      reactData.selectColor = toRgb(rValue, gValue, bValue, aValue)
      updateModelColor()
    }

    const handleInputAlphaEvent = () => {
      const { aValue } = reactData
      const alphaSliderEl = refAlphaSliderElem.value
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect()
        const barWidth = alphaSliderRect.width
        const offsetLeft = barWidth * aValue
        handleAlphaColor(offsetLeft)
      }
    }

    const handleQuickEvent = (evnt: MouseEvent, item: any) => {
      const value = item.value
      reactData.selectColor = value
      updateModelColor()
    }

    const handlePanelColor = (offsetLeft: number, offsetTop: number) => {
      const colorActiveEl = refColorActiveElem.value
      if (colorActiveEl) {
        colorActiveEl.style.top = toCssUnit(offsetTop)
        colorActiveEl.style.left = toCssUnit(offsetLeft)
      }
    }

    const handleEyeDropperEvent = () => {
      if (WinEyeDropper) {
        try {
          const eyeDropper = new WinEyeDropper()
          eyeDropper.open().then((rest: any) => {
            if (rest && rest.sRGBHex) {
              reactData.selectColor = rest.sRGBHex
              updateModelColor()
            }
          }).catch(() => {
          })
        } catch (e) {}
      }
    }

    const handleSelectColorByXY = (clientX: number, clientY: number) => {
      const { showAlpha } = props
      const { panelColor, aValue } = reactData
      const colorPanelEl = refColorPanelElem.value
      const colorActiveEl = refColorActiveElem.value
      if (colorPanelEl && colorActiveEl) {
        const { clientWidth, clientHeight } = colorPanelEl
        const colorPanelRect = colorPanelEl.getBoundingClientRect()
        const offsetTop = Math.min(clientHeight, Math.max(0, clientY - colorPanelRect.y))
        const offsetLeft = Math.min(clientWidth, Math.max(0, clientX - colorPanelRect.x))
        const colorRest = parseColor(panelColor)
        if (colorRest) {
          const hsvRest = colorRest.type === 'hex' ? hexToHsv(colorRest.hex) : rgbToHsv(colorRest)
          if (hsvRest) {
            const ragRest = hsvToRgb(hsvRest.h, offsetLeft / clientWidth, (1 - offsetTop / clientHeight))
            reactData.selectColor = toRgb(ragRest.r, ragRest.g, ragRest.b, showAlpha ? aValue : null)
            updateModelColor()
          }
        }
        handlePanelColor(offsetLeft, offsetTop)
      }
    }

    const handleSelectColorMousedownEvent = (evnt: MouseEvent) => {
      evnt.stopPropagation()
      evnt.preventDefault()
      handleSelectColorByXY(evnt.clientX, evnt.clientY)
      document.onmousemove = evnt => {
        handleSelectColorByXY(evnt.clientX, evnt.clientY)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    const handleCopyColorEvent = () => {
      const { selectColor } = reactData
      if (selectColor) {
        if (VxeUI.clipboard.copy(selectColor)) {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.colorPicker.copySuccess', [selectColor]),
              status: 'success'
            })
          }
        }
      }
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

    const handleGlobalBlurEvent = () => {
      const { visiblePanel, isActivated } = reactData
      if (visiblePanel) {
        hideOptionPanel()
      }
      if (isActivated) {
        reactData.isActivated = false
      }
      if (visiblePanel || isActivated) {
        const targetElem = refInputTarget.value
        if (targetElem) {
          targetElem.blur()
        }
      }
    }

    const handleGlobalResizeEvent = () => {
      const { visiblePanel } = reactData
      if (visiblePanel) {
        updatePlacement()
      }
    }

    const dispatchEvent = (type: ValueOf<VxeColorPickerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $colorPicker: $xeColorPicker }, params))
    }

    const colorPickerMethods: ColorPickerMethods = {
      dispatchEvent
    }

    const colorPickerPrivateMethods: ColorPickerPrivateMethods = {
    }

    Object.assign($xeColorPicker, colorPickerMethods, colorPickerPrivateMethods)

    const renderColorWrapper = () => {
      const { showColorExtractor } = props
      const { panelColor } = reactData
      if (showColorExtractor) {
        return h('div', {
          ref: refColorPanelElem,
          class: 'vxe-color-picker--color-wrapper',
          onMousedown: handleSelectColorMousedownEvent
        }, [
          h('div', {
            class: 'vxe-color-picker--color-bg',
            style: {
              backgroundColor: panelColor
            }
          }),
          h('div', {
            class: 'vxe-color-picker--white-bg'
          }),
          h('div', {
            class: 'vxe-color-picker--black-bg'
          }),
          h('div', {
            ref: refColorActiveElem,
            class: 'vxe-color-picker--color-active'
          })
        ])
      }
      return renderEmptyElement($xeColorPicker)
    }

    const renderColorBar = () => {
      const { showAlpha, clickToCopy, showEyeDropper } = props
      const { selectTyle, showTypePopup, hexValue, rValue, gValue, bValue, aValue, selectColor, panelColor } = reactData
      const isRgb = computeIsRgb.value
      const selectTypeItem = computeSelectTypeItem.value
      return h('div', {
        class: 'vxe-color-picker--bar-wrapper'
      }, [
        h('div', {
          class: 'vxe-color-picker--slider-wrapper'
        }, [
          showEyeDropper && WinEyeDropper
            ? h('div', {
              class: 'vxe-color-picker--color-dropper'
            }, [
              h('span', {
                class: 'vxe-color-picker--color-dropper-btn',
                onClick: handleEyeDropperEvent
              }, [
                h('i', {
                  class: getIcon().COLOR_PICKER_EYE_DROPPER
                })
              ])
            ])
            : renderEmptyElement($xeColorPicker),
          h('div', {
            class: 'vxe-color-picker--slider-preview'
          }, [
            h('div', {
              class: 'vxe-color-picker--preview-btn'
            }, [
              h('div', {
                class: 'vxe-color-picker--preview-color',
                style: {
                  backgroundColor: selectColor
                }
              }, clickToCopy
                ? [
                    h('span', {
                      class: 'vxe-color-picker--preview-copy-btn',
                      onClick: handleCopyColorEvent
                    }, [
                      h('i', {
                        class: getIcon().COLOR_PICKER_COLOR_COPY
                      })
                    ])
                  ]
                : [])
            ])
          ]),
          h('div', {
            class: 'vxe-color-picker--slider-handle'
          }, [
            h('div', {
              ref: refHueSliderElem,
              class: 'vxe-color-picker--bar-hue-slider',
              onClick: handleHueBarEvent
            }, [
              h('div', {
                ref: refHueSliderBtnElem,
                class: 'vxe-color-picker--bar-hue-btn',
                onMousedown: handleHueSliderMousedownEvent
              })
            ]),
            showAlpha
              ? h('div', {
                ref: refAlphaSliderElem,
                class: 'vxe-color-picker--bar-alpha-slider',
                onClick: handleAlphaBarEvent
              }, [
                h('div', {
                  class: 'vxe-color-picker--bar-alpha-bg',
                  style: {
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${panelColor})`
                  }
                }),
                h('div', {
                  ref: refAlphaSliderBtnElem,
                  class: 'vxe-color-picker--bar-alpha-btn',
                  onMousedown: handleAlphaSliderMousedownEvent
                })
              ])
              : renderEmptyElement($xeColorPicker)
          ])
        ]),
        h('div', {
          class: 'vxe-color-picker--custom-wrapper'
        }, [
          h('div', {
            class: 'vxe-color-picker--type-switch'
          }, [
            h('div', {
              class: 'vxe-color-picker--type-label',
              onClick: toggleTypeVisibleEvent
            }, [
              h('span', `${selectTypeItem ? selectTypeItem.label : selectTyle}`),
              h('span', {
                class: 'vxe-color-picker--type-icon'
              }, [
                h('i', {
                  class: showTypePopup ? getIcon().COLOR_PICKER_TPTY_OPEN : getIcon().COLOR_PICKER_TPTY_CLOSE
                })
              ])
            ]),
            h('div', {
              class: ['vxe-color-picker--type-popup', {
                'is--visible': showTypePopup
              }]
            }, typeList.map(item => {
              return h('div', {
                class: 'vxe-color-picker--type-item',
                onClick (evnt) {
                  evnt.stopPropagation()
                  handleChangeType(item.value as VxeColorPickerPropTypes.Type)
                }
              }, item.label)
            }))
          ]),
          h('div', {
            class: `vxe-color-picker--${selectTyle}-wrapper`
          }, isRgb
            ? [
                h('div', {
                  class: 'vxe-color-picker--input-wrapper'
                }, [
                  h(VxeNumberInputComponent, {
                    type: 'integer',
                    size: 'mini',
                    align: 'center',
                    min: 0,
                    max: 255,
                    maxLength: 3,
                    placeholder: '',
                    modelValue: rValue,
                    controlConfig: {
                      showButton: false
                    },
                    'onUpdate:modelValue' (val) {
                      reactData.rValue = val
                    },
                    onChange: handleInputRgbEvent
                  }),
                  h(VxeNumberInputComponent, {
                    type: 'integer',
                    size: 'mini',
                    align: 'center',
                    min: 0,
                    max: 255,
                    maxLength: 3,
                    placeholder: '',
                    modelValue: gValue,
                    controlConfig: {
                      showButton: false
                    },
                    'onUpdate:modelValue' (val) {
                      reactData.gValue = val
                    },
                    onChange: handleInputRgbEvent
                  }),
                  h(VxeNumberInputComponent, {
                    type: 'integer',
                    size: 'mini',
                    align: 'center',
                    min: 0,
                    max: 255,
                    maxLength: 3,
                    placeholder: '',
                    modelValue: bValue,
                    controlConfig: {
                      showButton: false
                    },
                    'onUpdate:modelValue' (val) {
                      reactData.bValue = val
                    },
                    onChange: handleInputRgbEvent
                  }),
                  h(VxeNumberInputComponent, {
                    type: 'number',
                    size: 'mini',
                    align: 'center',
                    min: 0,
                    max: 1,
                    step: 0.01,
                    maxLength: 4,
                    placeholder: '',
                    modelValue: aValue,
                    controlConfig: {
                      showButton: false
                    },
                    'onUpdate:modelValue' (val) {
                      reactData.aValue = val
                    },
                    onChange: handleInputAlphaEvent
                  })
                ]),
                h('div', {
                  class: 'vxe-color-picker--input-title'
                }, [
                  h('span', 'R'),
                  h('span', 'G'),
                  h('span', 'B'),
                  h('span', 'A')
                ])]
            : [
                h('div', {
                  class: 'vxe-color-picker--input-wrapper'
                }, [
                  h(VxeInputComponent, {
                    type: 'text',
                    size: 'mini',
                    align: 'center',
                    maxLength: 9,
                    placeholder: '',
                    modelValue: hexValue,
                    'onUpdate:modelValue' (val) {
                      reactData.hexValue = val
                    },
                    onChange () {
                      const colorRest = parseColor(reactData.hexValue)
                      if (colorRest) {
                        if (colorRest.value) {
                          reactData.selectColor = colorRest.value
                          updateModelColor()
                        }
                      }
                    }
                  })
                ]),
                h('div', {
                  class: 'vxe-color-picker--input-title'
                }, getI18n('vxe.colorPicker.hex'))
              ])
        ])
      ])
    }

    const renderQuickWrapper = () => {
      const { showQuick } = props
      const colorList = computeColorList.value
      if (showQuick && colorList.length) {
        return h('div', {
          class: 'vxe-color-picker--quick-wrapper'
        }, colorList.map((item, i) => {
          return h('div', {
            key: i,
            class: 'vxe-color-picker--quick-item',
            title: item.label || '',
            style: {
              backgroundColor: item.value
            },
            onClick (evnt) {
              handleQuickEvent(evnt, item)
            }
          })
        }))
      }
      return renderEmptyElement($xeColorPicker)
    }

    const renderVN = () => {
      const { className, popupClassName, clearable, modelValue } = props
      const { initialized, isActivated, isAniVisible, visiblePanel } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const btnTransfer = computeBtnTransfer.value
      const formReadonly = computeFormReadonly.value

      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-color-picker--readonly', className]
        }, [
          h('div', {
            class: 'vxe-color-picker--readonly-color',
            style: {
              backgroundColor: modelValue
            }
          })
        ])
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-color-picker', className ? (XEUtils.isFunction(className) ? className({ $colorPicker: $xeColorPicker }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--selected': !!modelValue,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--active': isActivated
        }]
      }, [
        h('input', {
          ref: refInputTarget,
          class: 'vxe-color-picker--input',
          onFocus: focusEvent,
          onBlur: blurEvent
        }),
        h('div', {
          class: 'vxe-color-picker--inner',
          onClick: clickEvent
        }, [
          h('div', {
            class: 'vxe-color-picker--inner-color',
            style: {
              backgroundColor: modelValue
            }
          })
        ]),
        h(Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [
          h('div', {
            ref: refOptionPanel,
            class: ['vxe-table--ignore-clear vxe-color-picker--panel', popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $colorPicker: $xeColorPicker }) : popupClassName) : '', {
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
                class: 'vxe-color-picker--panel-wrapper',
                onClick: handlePanelClickEvent
              }, [
                renderColorWrapper(),
                renderColorBar(),
                renderQuickWrapper(),
                h('div', {
                  class: 'vxe-color-picker--footer-wrapper'
                }, [
                  clearable
                    ? h(VxeButtonComponent, {
                      content: getI18n('vxe.colorPicker.clear'),
                      size: 'mini',
                      onClick: clearEvent
                    })
                    : renderEmptyElement($xeColorPicker),
                  h(VxeButtonComponent, {
                    content: getI18n('vxe.colorPicker.confirm'),
                    size: 'mini',
                    status: 'primary',
                    onClick: confirmEvent
                  })
                ])
              ])
              : renderEmptyElement($xeColorPicker)
          ])
        ])
      ])
    }

    watch(() => props.modelValue, () => {
      updateMode()
    })

    watch(() => props.type, () => {
      updateType()
    })

    onMounted(() => {
      globalEvents.on($xeColorPicker, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeColorPicker, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeColorPicker, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeColorPicker, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeColorPicker, 'mousewheel')
      globalEvents.off($xeColorPicker, 'mousedown')
      globalEvents.off($xeColorPicker, 'blur')
      globalEvents.off($xeColorPicker, 'resize')
    })

    updateType()

    provide('$xeColorPicker', $xeColorPicker)

    $xeColorPicker.renderVN = renderVN

    return $xeColorPicker
  },
  render () {
    return this.renderVN()
  }
})
