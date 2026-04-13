import { h, provide, PropType, ref, reactive, computed, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getConfig, createEvent, getIcon, globalEvents, GLOBAL_EVENT_KEYS, getI18n, renderEmptyElement } from '../../ui'
import XEUtils from 'xe-utils'
import { getDomNode, addClass, removeClass, hasControlKey } from '../../ui/src/dom'

import type { VxeImagePreviewConstructor, ImagePreviewReactData, ImagePreviewPrivateRef, VxeGlobalIcon, VxeImagePreviewEmits, VxeImagePreviewPrivateMethods, ImagePreviewPrivateMethods, ImagePreviewPrivateComputed, ImagePreviewMethods, VxeImagePreviewPropTypes, ValueOf, VxeImagePreviewDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeImagePreview',
  props: {
    modelValue: Number as PropType<VxeImagePreviewPropTypes.ModelValue>,
    urlList: Array as PropType<VxeImagePreviewPropTypes.UrlList>,
    urlField: {
      type: String as PropType<VxeImagePreviewPropTypes.UrlField>,
      default: () => getConfig().imagePreview.urlField
    },
    maskClosable: {
      type: Boolean as PropType<VxeImagePreviewPropTypes.MaskClosable>,
      default: () => getConfig().imagePreview.maskClosable
    },
    marginSize: {
      type: String as PropType<VxeImagePreviewPropTypes.MarginSize>,
      default: () => getConfig().imagePreview.marginSize
    },
    showPrintButton: {
      type: Boolean as PropType<VxeImagePreviewPropTypes.ShowPrintButton>,
      default: () => getConfig().imagePreview.showPrintButton
    },
    showDownloadButton: {
      type: Boolean as PropType<VxeImagePreviewPropTypes.ShowDownloadButton>,
      default: () => getConfig().imagePreview.showDownloadButton
    },
    zIndex: Number as PropType<VxeImagePreviewPropTypes.ZIndex>,
    toolbarConfig: Object as PropType<VxeImagePreviewPropTypes.ToolbarConfig>,
    beforeDownloadMethod: Function as PropType<VxeImagePreviewPropTypes.BeforeDownloadMethod>,
    downloadMethod: Function as PropType<VxeImagePreviewPropTypes.DownloadMethod>
  },
  emits: [
    'update:modelValue',
    'change',
    'download',
    'download-fail',
    'rotate',
    'close'
  ] as VxeImagePreviewEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()
    const refElem = ref<HTMLDivElement>()

    const refMaps: ImagePreviewPrivateRef = {
      refElem
    }

    const reactData = reactive<ImagePreviewReactData>({
      activeIndex: props.modelValue || 0,
      offsetPct11: false,
      offsetScale: 0,
      offsetRotate: 0,
      offsetLeft: 0,
      offsetTop: 0
    })

    const computeUrlProp = computed(() => {
      return props.urlField || 'url'
    })

    const computeMarginSize = computed(() => {
      return XEUtils.toNumber(props.marginSize || 0) || 16
    })

    const computeToolbarOpts = computed(() => {
      return Object.assign({}, getConfig().imagePreview.toolbarConfig, props.toolbarConfig)
    })

    const computeRotateText = computed(() => {
      const { offsetRotate } = reactData
      if (offsetRotate) {
        return `${offsetRotate}°`
      }
      return '0°'
    })

    const computeScaleText = computed(() => {
      const { offsetScale } = reactData
      if (offsetScale) {
        return `${XEUtils.ceil((1 + offsetScale) * 100)}%`
      }
      return '100%'
    })

    const computeImgList = computed(() => {
      const { urlList } = props
      const urlProp = computeUrlProp.value
      if (urlList && urlList.length) {
        return urlList.map(item => {
          if (XEUtils.isString(item)) {
            return item
          }
          if (item[urlProp]) {
            return item[urlProp]
          }
          return ''
        })
      }
      return []
    })

    const computeImgTransform = computed(() => {
      let { offsetScale, offsetRotate, offsetLeft, offsetTop } = reactData
      const stys: string[] = []
      let targetScale = 1
      if (offsetScale) {
        targetScale = 1 + offsetScale
        stys.push(`scale(${targetScale})`)
      }
      if (offsetRotate) {
        stys.push(`rotate(${offsetRotate}deg)`)
      }
      if (offsetLeft || offsetTop) {
        // 缩放与位移
        offsetLeft /= targetScale
        offsetTop /= targetScale

        let targetOffsetLeft = offsetLeft
        let targetOffsetTop = offsetTop
        if (offsetRotate) {
          // 转向与位移
          switch (offsetRotate % 360) {
            case 90:
            case -270:
              targetOffsetLeft = offsetTop
              targetOffsetTop = -offsetLeft
              break
            case 180:
            case -180:
              targetOffsetLeft = -offsetLeft
              targetOffsetTop = -offsetTop
              break
            case 270:
            case -90:
              targetOffsetLeft = -offsetTop
              targetOffsetTop = offsetLeft
              break
          }
        }
        stys.push(`translate(${targetOffsetLeft}px, ${targetOffsetTop}px)`)
      }
      return stys.length ? stys.join(' ') : ''
    })

    const computeMaps: ImagePreviewPrivateComputed = {
      computeImgList
    }

    const $xeImagePreview = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeImagePreviewConstructor & VxeImagePreviewPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeImagePreviewEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $imagePreview: $xeImagePreview }, params))
    }

    const imagePreviewMethods: ImagePreviewMethods = {
      dispatchEvent
    }

    const emitModel = (value: VxeImagePreviewPropTypes.ModelValue) => {
      reactData.activeIndex = value
      emit('update:modelValue', value)
    }

    const handleCloseEvent = (evnt: MouseEvent) => {
      dispatchEvent('close', {}, evnt)
    }

    const imagePreviewPrivateMethods: ImagePreviewPrivateMethods = {
    }

    const resetStyle = () => {
      const elem = refElem.value
      removeClass(elem, 'is--move')
      Object.assign(reactData, {
        offsetPct11: false,
        offsetScale: 0,
        offsetRotate: 0,
        offsetLeft: 0,
        offsetTop: 0
      })
    }

    const getOffsetZoomStep = () => {
      const { offsetScale } = reactData
      let stepNum = 0.02
      if (offsetScale >= -0.6) {
        stepNum = 0.04
        if (offsetScale >= -0.4) {
          stepNum = 0.07
          if (offsetScale >= 0) {
            stepNum = 0.1
            if (offsetScale >= 3) {
              stepNum = 0.25
              if (offsetScale >= 8) {
                stepNum = 0.4
                if (offsetScale >= 16) {
                  stepNum = 0.6
                  if (offsetScale >= 24) {
                    stepNum = 0.9
                    if (offsetScale >= 32) {
                      stepNum = 1.3
                      if (offsetScale >= 39) {
                        stepNum = 1.9
                        if (offsetScale >= 45) {
                          stepNum = 2.5
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return stepNum
    }

    const handleZoom = (isAdd: boolean) => {
      const { offsetScale } = reactData
      const stepNum = getOffsetZoomStep()
      if (isAdd) {
        reactData.offsetScale = Number(Math.min(49, offsetScale + stepNum).toFixed(2))
      } else {
        reactData.offsetScale = Number(Math.max(-0.9, offsetScale - stepNum).toFixed(2))
      }
    }

    const handleChangeEvent = (evnt: Event, isNext: boolean) => {
      let activeIndex = reactData.activeIndex || 0
      const imgList = computeImgList.value
      if (isNext) {
        if (activeIndex >= imgList.length - 1) {
          activeIndex = 0
        } else {
          activeIndex++
        }
      } else {
        if (activeIndex <= 0) {
          activeIndex = imgList.length - 1
        } else {
          activeIndex--
        }
      }
      const imgUrl = imgList[activeIndex || 0]
      reactData.activeIndex = activeIndex
      resetStyle()
      emitModel(activeIndex)
      dispatchEvent('change', { url: imgUrl, activeIndex }, evnt)
    }

    const handleRotateImgEvent = (evnt: Event, isRight: boolean) => {
      const imgList = computeImgList.value
      const { activeIndex } = reactData
      const imgUrl = imgList[activeIndex || 0]
      let offsetRotate = reactData.offsetRotate
      if (isRight) {
        offsetRotate += 90
      } else {
        offsetRotate -= 90
      }
      reactData.offsetRotate = offsetRotate
      dispatchEvent('rotate', { url: imgUrl, rotateValue: offsetRotate }, evnt)
    }

    const handlePct11 = () => {
      resetStyle()
      reactData.offsetPct11 = true
    }

    const handlePrintImg = () => {
      const { activeIndex } = reactData
      const imgList = computeImgList.value
      const imgUrl = imgList[activeIndex || 0]
      if (VxeUI.print) {
        VxeUI.print({
          align: 'center',
          pageBreaks: [
            {
              bodyHtml: `<img src="${imgUrl}" style="max-width:100%;max-height:100%;">`
            }
          ]
        })
      }
    }

    const handleDownloadEvent = (evnt: MouseEvent, imgUrl: string) => {
      dispatchEvent('download', { url: imgUrl }, evnt)
    }

    const handleDefaultDownload = (evnt: MouseEvent, imgUrl: string) => {
      if (VxeUI.saveFile) {
        fetch(imgUrl).then(res => {
          return res.blob().then(blob => {
            VxeUI.saveFile({
              filename: imgUrl,
              content: blob
            })
            handleDownloadEvent(evnt, imgUrl)
          })
        }).catch(() => {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.error.downErr'),
              status: 'error'
            })
          }
        })
      }
    }

    const handleDownloadImg = (evnt: MouseEvent) => {
      const { activeIndex } = reactData
      const toolbarOpts = computeToolbarOpts.value
      const btnConf = toolbarOpts.download
      const btnOpts = XEUtils.isBoolean(btnConf) ? {} : (btnConf ? Object.assign({}, btnConf) : {})
      const imgList = computeImgList.value
      const imgUrl = imgList[activeIndex || 0]
      const beforeDownloadFn = props.beforeDownloadMethod || btnOpts.beforeDownloadMethod || getConfig().imagePreview.beforeDownloadMethod
      const downloadFn = props.downloadMethod || btnOpts.downloadMethod || getConfig().imagePreview.downloadMethod
      Promise.resolve(
        beforeDownloadFn
          ? beforeDownloadFn({
            $imagePreview: $xeImagePreview,
            url: imgUrl,
            index: activeIndex || 0
          })
          : true
      ).then(status => {
        if (status) {
          if (downloadFn) {
            Promise.resolve(
              downloadFn({
                $imagePreview: $xeImagePreview,
                url: imgUrl,
                index: activeIndex || 0
              })
            ).then(() => {
              handleDownloadEvent(evnt, imgUrl)
            }).catch(e => e)
          } else {
            handleDefaultDownload(evnt, imgUrl)
          }
        }
      })
    }

    const handleOperationBtn = (evnt: MouseEvent, code: VxeImagePreviewDefines.ToolbarCode) => {
      const { activeIndex } = reactData
      const imgList = computeImgList.value
      const imgUrl = imgList[activeIndex || 0]
      if (imgUrl) {
        switch (code) {
          case 'zoomOut':
            handleZoom(false)
            break
          case 'zoomIn':
            handleZoom(true)
            break
          case 'pctFull':
            resetStyle()
            break
          case 'pct11':
            handlePct11()
            break
          case 'rotateLeft':
            handleRotateImgEvent(evnt, false)
            break
          case 'rotateRight':
            handleRotateImgEvent(evnt, true)
            break
          case 'print':
            handlePrintImg()
            break
          case 'download':
            handleDownloadImg(evnt)
            break
        }
      }
    }

    const wheelEvent = (evnt: WheelEvent) => {
      const delta = evnt.deltaY
      if (delta > 0) {
        evnt.preventDefault()
        handleZoom(false)
      } else if (delta < 0) {
        evnt.preventDefault()
        handleZoom(true)
      }
    }

    const moveEvent = (evnt: MouseEvent) => {
      const { offsetTop, offsetLeft } = reactData
      const elem = refElem.value
      evnt.preventDefault()
      const domMousemove = document.onmousemove
      const domMouseup = document.onmouseup
      const startX = evnt.pageX
      const startY = evnt.pageY
      const marginSize = computeMarginSize.value
      document.onmousemove = et => {
        const { pageX, pageY } = et
        const { visibleHeight, visibleWidth } = getDomNode()
        et.preventDefault()
        addClass(elem, 'is--move')
        // 限制边界值
        if (pageX > marginSize && pageY > marginSize && pageX < (visibleWidth - marginSize) && pageY < (visibleHeight - marginSize)) {
          reactData.offsetLeft = offsetLeft + pageX - startX
          reactData.offsetTop = offsetTop + pageY - startY
        }
      }
      document.onmouseup = () => {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        removeClass(elem, 'is--move')
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const isControlKey = hasControlKey(evnt)
      const hasShiftKey = evnt.shiftKey
      const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
      const isDownArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
      const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
      const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
      const isR = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.R)
      const isP = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.P)
      if (isUpArrow) {
        evnt.preventDefault()
        if (hasShiftKey) {
          reactData.offsetTop -= 1
        } else {
          handleZoom(true)
        }
      } else if (isDownArrow) {
        evnt.preventDefault()
        if (hasShiftKey) {
          reactData.offsetTop += 1
        } else {
          handleZoom(false)
        }
      } else if (isLeftArrow) {
        evnt.preventDefault()
        if (hasShiftKey) {
          reactData.offsetLeft -= 1
        } else {
          handleChangeEvent(evnt, false)
        }
      } else if (isRightArrow) {
        evnt.preventDefault()
        if (hasShiftKey) {
          reactData.offsetLeft += 1
        } else {
          handleChangeEvent(evnt, true)
        }
      } else if (isR && isControlKey) {
        evnt.preventDefault()
        if (hasShiftKey) {
          handleRotateImgEvent(evnt, false)
        } else {
          handleRotateImgEvent(evnt, true)
        }
      } else if (isP && isControlKey) {
        evnt.preventDefault()
        handlePrintImg()
      }
    }

    const handleClickMaskEvent = (evnt: MouseEvent) => {
      if (props.maskClosable) {
        if (evnt.target === evnt.currentTarget) {
          dispatchEvent('close', {}, evnt)
        }
      }
    }

    Object.assign($xeImagePreview, imagePreviewMethods, imagePreviewPrivateMethods)

    const renderImgWrapper = () => {
      const { activeIndex } = reactData
      const imgList = computeImgList.value
      const imgTransform = computeImgTransform.value
      return h('div', {
        class: 'vxe-image-preview--img-list',
        onClick: handleClickMaskEvent
      }, imgList.map((url, index) => {
        const isActive = activeIndex === index
        return h('img', {
          class: ['vxe-image-preview--img-item', {
            'is--active': isActive
          }],
          src: url,
          style: isActive
            ? {
                transform: imgTransform
              }
            : null,
          onMousedown (evnt) {
            moveEvent(evnt)
          }
        })
      }))
    }

    const renderOperationBtn = (code: VxeImagePreviewDefines.ToolbarCode, icon: keyof VxeGlobalIcon) => {
      const toolbarOpts = computeToolbarOpts.value
      const btnConf = toolbarOpts[code]
      const btnOpts = XEUtils.isBoolean(btnConf) ? {} : (btnConf ? Object.assign({}, btnConf) : {})
      const showBtn = btnConf !== false
      return showBtn
        ? h('div', {
          class: 'vxe-image-preview--operation-btn',
          title: getI18n(`vxe.imagePreview.operBtn.${code}`),
          onClick (evnt) {
            handleOperationBtn(evnt, code)
          }
        }, [
          h('i', {
            class: btnOpts.icon || getIcon()[icon]
          })
        ])
        : renderEmptyElement($xeImagePreview)
    }

    const renderBtnWrapper = () => {
      const { showPrintButton, showDownloadButton } = props
      const { activeIndex } = reactData
      const imgList = computeImgList.value
      const rotateText = computeRotateText.value
      const scaleText = computeScaleText.value
      const toolbarOpts = computeToolbarOpts.value

      return h('div', {
        class: 'vxe-image-preview--btn-wrapper'
      }, [
        h('div', {
          class: 'vxe-image-preview--close-wrapper'
        }, [
          h('div', {
            class: 'vxe-image-preview--close-btn',
            onClick: handleCloseEvent
          }, [
            h('i', {
              class: getIcon().IMAGE_PREVIEW_CLOSE
            })
          ]),
          h('div', {
            class: 'vxe-image-preview--close-bg'
          })
        ]),
        imgList.length > 1
          ? h('div', {
            class: 'vxe-image-preview--previous-btn',
            onClick (evnt) {
              handleChangeEvent(evnt, false)
            }
          }, [
            h('i', {
              class: getIcon().IMAGE_PREVIEW_PREVIOUS
            })
          ])
          : renderEmptyElement($xeImagePreview),
        imgList.length > 1
          ? h('div', {
            class: 'vxe-image-preview--next-btn',
            onClick (evnt) {
              handleChangeEvent(evnt, true)
            }
          }, [
            h('i', {
              class: getIcon().IMAGE_PREVIEW_NEXT
            })
          ])
          : renderEmptyElement($xeImagePreview),
        h('div', {
          class: 'vxe-image-preview--operation-info'
        }, [
          h('div', {
            class: 'vxe-image-preview--operation-deg'
          }, rotateText),
          h('div', {
            class: 'vxe-image-preview--operation-pct'
          }, scaleText)
        ]),
        h('div', {
          class: 'vxe-image-preview--operation-wrapper'
        }, [
          h('div', {
            class: 'vxe-image-preview--operation-active-count'
          }, [
            h('span', {
              class: 'vxe-image-preview--operation-active-current'
            }, `${(activeIndex || 0) + 1}`),
            h('span', {
              class: 'vxe-image-preview--operation-active-total'
            }, `/${imgList.length}`)
          ]),
          renderOperationBtn('zoomOut', 'IMAGE_PREVIEW_ZOOM_OUT'),
          renderOperationBtn('zoomIn', 'IMAGE_PREVIEW_ZOOM_IN'),
          renderOperationBtn('pctFull', 'IMAGE_PREVIEW_PCT_FULL'),
          renderOperationBtn('pct11', 'IMAGE_PREVIEW_PCT_1_1'),
          renderOperationBtn('rotateLeft', 'IMAGE_PREVIEW_ROTATE_LEFT'),
          renderOperationBtn('rotateRight', 'IMAGE_PREVIEW_ROTATE_RIGHT'),
          showPrintButton || toolbarOpts.print ? renderOperationBtn('print', 'IMAGE_PREVIEW_PRINT') : renderEmptyElement($xeImagePreview),
          showDownloadButton || toolbarOpts.download ? renderOperationBtn('download', 'IMAGE_PREVIEW_DOWNLOAD') : renderEmptyElement($xeImagePreview)
        ])
      ])
    }

    const renderVN = () => {
      const { offsetPct11 } = reactData
      return h('div', {
        ref: refElem,
        class: ['vxe-image-preview', {
          'is--pct11': offsetPct11
        }]
      }, [
        renderImgWrapper(),
        renderBtnWrapper()
      ])
    }

    watch(() => props.modelValue, val => {
      reactData.activeIndex = val
      resetStyle()
    })

    onMounted(() => {
      const elem = refElem.value
      if (elem) {
        elem.addEventListener('wheel', wheelEvent, { passive: false })
      }
      globalEvents.on($xeImagePreview, 'keydown', handleGlobalKeydownEvent)
    })

    onBeforeUnmount(() => {
      const elem = refElem.value
      if (elem) {
        elem.removeEventListener('wheel', wheelEvent)
        removeClass(elem, 'is--move')
      }
    })

    onUnmounted(() => {
      globalEvents.off($xeImagePreview, 'keydown')
    })

    provide('$xeImagePreview', $xeImagePreview)

    $xeImagePreview.renderVN = renderVN

    return renderVN
  }
})
