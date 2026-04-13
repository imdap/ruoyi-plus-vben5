import { h, PropType, computed, inject, ref, Ref, reactive, nextTick, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getIcon, getConfig, getI18n, globalEvents, GLOBAL_EVENT_KEYS, createEvent, useSize } from '../../ui'
import { warnLog, errLog } from '../../ui/src/log'
import VxeSelectComponent from '../../select/src/select'
import VxeNumberInputComponent from '../../number-input/src/number-input'

import type { VxePagerPropTypes, VxePagerConstructor, VxePagerEmits, VxeSelectEvents, ValueOf, PagerPrivateRef, PagerMethods, PagerPrivateMethods, VxePagerPrivateMethods, PagerReactData, VxeInputEvents, VxeSelectDefines } from '../../../types'
import type { VxeGridConstructor, VxeGridPrivateMethods } from '../../../types/components/grid'

export default defineVxeComponent({
  name: 'VxePager',
  props: {
    size: {
      type: String as PropType<VxePagerPropTypes.Size>,
      default: () => getConfig().pager.size || getConfig().size
    },
    // 自定义布局
    layouts: {
      type: Array as PropType<VxePagerPropTypes.Layouts>,
      default: () => getConfig().pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 当前页
    currentPage: {
      type: Number as PropType<VxePagerPropTypes.CurrentPage>,
      default: 1
    },
    // 加载中
    loading: Boolean as PropType<VxePagerPropTypes.Loading>,
    // 每页大小
    pageSize: {
      type: Number as PropType<VxePagerPropTypes.PageSize>,
      default: () => getConfig().pager.pageSize || 10
    },
    // 总条数
    total: { type: Number as PropType<VxePagerPropTypes.Total>, default: 0 },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number as PropType<VxePagerPropTypes.PagerCount>,
      default: () => getConfig().pager.pagerCount || 7
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array as PropType<VxePagerPropTypes.PageSizes>,
      default: () => getConfig().pager.pageSizes || [10, 15, 20, 50, 100]
    },
    // 列对齐方式
    align: {
      type: String as PropType<VxePagerPropTypes.Align>,
      default: () => getConfig().pager.align
    },
    // 带边框
    border: {
      type: Boolean as PropType<VxePagerPropTypes.Border>,
      default: () => getConfig().pager.border
    },
    // 带背景颜色
    background: {
      type: Boolean as PropType<VxePagerPropTypes.Background>,
      default: () => getConfig().pager.background
    },
    // 配套的样式
    perfect: {
      type: Boolean as PropType<VxePagerPropTypes.Perfect>,
      default: () => getConfig().pager.perfect
    },
    // 当只有一页时隐藏
    autoHidden: {
      type: Boolean as PropType<VxePagerPropTypes.AutoHidden>,
      default: () => getConfig().pager.autoHidden
    },
    transfer: {
      type: Boolean as PropType<VxePagerPropTypes.Transfer>,
      default: () => getConfig().pager.transfer
    },
    className: [String, Function] as PropType<VxePagerPropTypes.ClassName>,
    pageSizePlacement: {
      type: String as PropType<VxePagerPropTypes.PageSizePlacement>,
      default: () => getConfig().pager.pageSizePlacement
    },
    // 自定义图标
    iconPrevPage: String as PropType<VxePagerPropTypes.IconPrevPage>,
    iconJumpPrev: String as PropType<VxePagerPropTypes.IconJumpPrev>,
    iconJumpNext: String as PropType<VxePagerPropTypes.IconJumpNext>,
    iconNextPage: String as PropType<VxePagerPropTypes.IconNextPage>,
    iconJumpMore: String as PropType<VxePagerPropTypes.IconJumpMore>,
    iconHomePage: String as PropType<VxePagerPropTypes.IconHomePage>,
    iconEndPage: String as PropType<VxePagerPropTypes.IconEndPage>
  },
  emits: [
    'update:pageSize',
    'update:currentPage',
    'page-change'
  ] as VxePagerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const $xeGrid = inject<(VxeGridConstructor & VxeGridPrivateMethods) | null>('$xeGrid', null)

    const reactData = reactive<PagerReactData>({
      inpCurrPage: props.currentPage
    })

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: PagerPrivateRef = {
      refElem
    }

    const computePageCount = computed(() => {
      return getPageCount(props.total, props.pageSize)
    })

    const computeNumList = computed(() => {
      const { pagerCount } = props
      const pageCount = computePageCount.value
      const len = pageCount > pagerCount ? pagerCount - 2 : pagerCount
      const rest = []
      for (let index = 0; index < len; index++) {
        rest.push(index)
      }
      return rest
    })

    const computeOffsetNumber = computed(() => {
      return Math.floor((props.pagerCount - 2) / 2)
    })

    const computeSizeList = computed(() => {
      return props.pageSizes.map((item) => {
        if (XEUtils.isNumber(item)) {
          return {
            value: item,
            label: `${getI18n('vxe.pager.pagesize', [item])}`
          }
        }
        return { value: '', label: '', ...item }
      })
    })

    const $xePager = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    } as unknown as VxePagerConstructor & VxePagerPrivateMethods

    const dispatchEvent = (type: ValueOf<VxePagerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $pager: $xePager }, params))
    }

    const getPageCount = (total: number, size: number) => {
      return Math.max(Math.ceil(total / size), 1)
    }

    const handleJumpPageEvent = (evnt: Event, currentPage: number) => {
      emit('update:currentPage', currentPage)
      if (evnt && currentPage !== props.currentPage) {
        dispatchEvent('page-change', { type: 'current', pageSize: props.pageSize, currentPage }, evnt)
      }
    }

    const handleChangeCurrentPage = (currentPage: number, evnt?: Event) => {
      emit('update:currentPage', currentPage)
      if (evnt && currentPage !== props.currentPage) {
        dispatchEvent('page-change', { type: 'current', pageSize: props.pageSize, currentPage }, evnt)
      }
    }

    const triggerJumpEvent: VxeInputEvents.Blur = (params) => {
      const { $event } = params
      const inputElem: HTMLInputElement = $event.target as HTMLInputElement
      const inpValue = XEUtils.toInteger(inputElem.value)
      const pageCount = computePageCount.value
      const current = inpValue <= 0 ? 1 : inpValue >= pageCount ? pageCount : inpValue
      const currPage = XEUtils.toValueString(current)
      inputElem.value = currPage
      reactData.inpCurrPage = currPage
      handleChangeCurrentPage(current, $event)
    }

    const handleHomePage = (evnt?: Event) => {
      const { currentPage } = props
      if (currentPage > 1) {
        handleChangeCurrentPage(1, evnt)
      }
    }

    const handleEndPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage < pageCount) {
        handleChangeCurrentPage(pageCount, evnt)
      }
    }

    const handlePrevPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage > 1) {
        handleChangeCurrentPage(Math.min(pageCount, Math.max(currentPage - 1, 1)), evnt)
      }
    }

    const handleNextPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage < pageCount) {
        handleChangeCurrentPage(Math.min(pageCount, currentPage + 1), evnt)
      }
    }

    const handlePrevJump = (evnt?: Event) => {
      const numList = computeNumList.value
      handleChangeCurrentPage(Math.max(props.currentPage - numList.length, 1), evnt)
    }

    const handleNextJump = (evnt?: Event) => {
      const pageCount = computePageCount.value
      const numList = computeNumList.value
      handleChangeCurrentPage(Math.min(props.currentPage + numList.length, pageCount), evnt)
    }

    const pageSizeEvent: VxeSelectEvents.Change = (params) => {
      const { value, $event } = params
      const pageSize = XEUtils.toNumber(value)
      const pageCount = getPageCount(props.total, pageSize)
      let currentPage = props.currentPage
      if (currentPage > pageCount) {
        currentPage = pageCount
        emit('update:currentPage', pageCount)
      }
      emit('update:pageSize', pageSize)
      if ($event) {
        dispatchEvent('page-change', { type: 'size', pageSize, currentPage }, $event)
      }
    }

    const jumpKeydownEvent: VxeInputEvents.Keydown = (params) => {
      const { $event } = params
      if (globalEvents.hasKey($event, GLOBAL_EVENT_KEYS.ENTER)) {
        triggerJumpEvent(params)
      } else if (globalEvents.hasKey($event, GLOBAL_EVENT_KEYS.ARROW_UP)) {
        $event.preventDefault()
        handleNextPage($event)
      } else if (globalEvents.hasKey($event, GLOBAL_EVENT_KEYS.ARROW_DOWN)) {
        $event.preventDefault()
        handlePrevPage($event)
      }
    }

    // 第一页
    const renderHomePage = () => {
      const { currentPage, total } = props
      const homeSlot = slots.home
      const pageCount = computePageCount.value
      if (homeSlot) {
        return h('span', {
          class: 'vxe-pager--custom-home-btn'
        }, homeSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('button', {
        class: ['vxe-pager--home-btn', {
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: getI18n('vxe.pager.homePageTitle'),
        onClick: handleHomePage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconHomePage || getIcon().PAGER_HOME]
        })
      ])
    }

    // 上一页
    const renderPrevPage = () => {
      const { currentPage, total } = props
      const prevPageSlot = slots.prevPage || slots['prev-page']
      const pageCount = computePageCount.value
      if (prevPageSlot) {
        return h('span', {
          class: 'vxe-pager--custom-prev-btn'
        }, prevPageSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: getI18n('vxe.pager.prevPageTitle'),
        onClick: handlePrevPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconPrevPage || getIcon().PAGER_PREV_PAGE]
        })
      ])
    }

    // 向上翻页
    const renderPrevJump = (tagName?: string) => {
      const { currentPage, total } = props
      const prevJumpSlot = slots.prevJump || slots['prev-jump']
      const pageCount = computePageCount.value
      if (prevJumpSlot) {
        return h('span', {
          class: 'vxe-pager--custom-jump-prev'
        }, prevJumpSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: getI18n('vxe.pager.prevJumpTitle'),
        onClick: handlePrevJump
      }, [
        tagName
          ? h('i', {
            class: ['vxe-pager--jump-more-icon', props.iconJumpMore || getIcon().PAGER_JUMP_MORE]
          })
          : null,
        h('i', {
          class: ['vxe-pager--jump-icon', props.iconJumpPrev || getIcon().PAGER_JUMP_PREV]
        })
      ])
    }

    // 向下翻页
    const renderNextJump = (tagName?: string) => {
      const { currentPage, total } = props
      const nextJumpSlot = slots.nextJump || slots['next-jump']
      const pageCount = computePageCount.value
      if (nextJumpSlot) {
        return h('span', {
          class: 'vxe-pager--custom-jump-next'
        }, nextJumpSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: getI18n('vxe.pager.nextJumpTitle'),
        onClick: handleNextJump
      }, [
        tagName
          ? h('i', {
            class: ['vxe-pager--jump-more-icon', props.iconJumpMore || getIcon().PAGER_JUMP_MORE]
          })
          : null,
        h('i', {
          class: ['vxe-pager--jump-icon', props.iconJumpNext || getIcon().PAGER_JUMP_NEXT]
        })
      ])
    }

    // 下一页
    const renderNextPage = () => {
      const { currentPage, total } = props
      const nextPageSlot = slots.nextPage || slots['next-page']
      const pageCount = computePageCount.value
      if (nextPageSlot) {
        return h('span', {
          class: 'vxe-pager--custom-next-btn'
        }, nextPageSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('button', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: getI18n('vxe.pager.nextPageTitle'),
        onClick: handleNextPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconNextPage || getIcon().PAGER_NEXT_PAGE]
        })
      ])
    }

    // 最后一页
    const renderEndPage = () => {
      const { currentPage, total } = props
      const endSlot = slots.end
      const pageCount = computePageCount.value
      if (endSlot) {
        return h('span', {
          class: 'vxe-pager--custom-end-btn'
        }, endSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('button', {
        class: ['vxe-pager--end-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: getI18n('vxe.pager.endPageTitle'),
        onClick: handleEndPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconEndPage || getIcon().PAGER_END]
        })
      ])
    }

    // 页数
    const renderNumber = (showJump?: boolean) => {
      const { currentPage, total, pagerCount } = props
      const numberSlot = showJump ? (slots.numberJump || slots['number-jump']) : slots.number
      const nums = []
      const pageCount = computePageCount.value
      const numList = computeNumList.value
      const offsetNumber = computeOffsetNumber.value
      const isOv = pageCount > pagerCount
      const isLt = isOv && currentPage > offsetNumber + 1
      const isGt = isOv && currentPage < pageCount - offsetNumber
      const restList: number[] = []
      let startNumber = 1

      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1)
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1)
        }
      }

      if (showJump && isLt) {
        restList.push(1)
        nums.push(
          h('button', {
            class: 'vxe-pager--num-btn',
            type: 'button',
            onClick: (evnt: Event) => handleJumpPageEvent(evnt, 1)
          }, '1'),
          renderPrevJump('span')
        )
      }
      numList.forEach((item, index) => {
        const number = startNumber + index
        if (number <= pageCount) {
          restList.push(number)
          nums.push(
            h('button', {
              key: number,
              class: ['vxe-pager--num-btn', {
                'is--active': currentPage === number
              }],
              type: 'button',
              onClick: (evnt: Event) => handleJumpPageEvent(evnt, number)
            }, `${number}`)
          )
        }
      })
      if (showJump && isGt) {
        restList.push(pageCount)
        nums.push(
          renderNextJump('button'),
          h('button', {
            class: 'vxe-pager--num-btn',
            type: 'button',
            onClick: (evnt: Event) => handleJumpPageEvent(evnt, pageCount)
          }, pageCount)
        )
      }
      if (numberSlot) {
        return h('span', {
          class: 'vxe-pager--custom-btn-wrapper'
        }, numberSlot({ $pager: $xePager, total, numList: restList, currentPage, pageCount }))
      }
      return h('span', {
        class: 'vxe-pager--btn-wrapper'
      }, nums)
    }

    // jumpNumber
    const renderJumpNumber = () => {
      return renderNumber(true)
    }

    // sizes
    const renderSizes = () => {
      const { total, currentPage, pageSize, pageSizePlacement, transfer } = props
      const sizesSlot = slots.sizes
      const sizeList = computeSizeList.value
      const pageCount = computePageCount.value
      if (sizesSlot) {
        return h('span', {
          class: 'vxe-pager--custom-sizes'
        }, sizesSlot({ $pager: $xePager, total, currentPage, pageCount, pageSize, options: sizeList }))
      }
      return h(VxeSelectComponent, {
        class: 'vxe-pager--sizes',
        modelValue: pageSize,
        placement: pageSizePlacement,
        transfer: transfer,
        options: sizeList,
        onChange: pageSizeEvent
      })
    }

    // Jump
    const renderJump = (isFull?: boolean) => {
      const { total } = props
      const { inpCurrPage } = reactData
      const jumpSlot = isFull ? (slots.fullJump || slots['full-jump']) : slots.jump
      const pageCount = computePageCount.value
      if (jumpSlot) {
        return h('span', {
          class: 'vxe-pager--custom-jump'
        }, jumpSlot({ $pager: $xePager, total, currentPage: inpCurrPage, pageCount }))
      }
      return h('span', {
        class: 'vxe-pager--jump'
      }, [
        isFull
          ? h('span', {
            class: 'vxe-pager--goto-text'
          }, getI18n('vxe.pager.goto'))
          : null,
        h(VxeNumberInputComponent, {
          class: 'vxe-pager--goto',
          modelValue: reactData.inpCurrPage,
          placeholder: getI18n('vxe.pager.gotoTitle'),
          align: 'center',
          type: 'integer',
          max: pageCount,
          min: 1,
          controls: false,
          onKeydown: jumpKeydownEvent,
          onBlur: triggerJumpEvent,
          'onUpdate:modelValue' (val) {
            reactData.inpCurrPage = val
          }
        }),
        isFull
          ? h('span', {
            class: 'vxe-pager--classifier-text'
          }, getI18n('vxe.pager.pageClassifier'))
          : null
      ])
    }

    // FullJump
    const renderFullJump = () => {
      return renderJump(true)
    }

    // PageCount
    const renderPageCount = () => {
      const { currentPage, total } = props
      const pageCountSlot = slots.pageCount || slots['page-count']
      const pageCount = computePageCount.value
      if (pageCountSlot) {
        return h('span', {
          class: 'vxe-pager--custom-count'
        }, pageCountSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('span', {
        class: 'vxe-pager--count'
      }, [
        h('span', {
          class: 'vxe-pager--separator'
        }),
        h('span', pageCount)
      ])
    }

    // total
    const renderTotal = () => {
      const { currentPage, total } = props
      const totalSlot = slots.total
      const pageCount = computePageCount.value
      if (totalSlot) {
        return h('span', {
          class: 'vxe-pager--custom-total'
        }, totalSlot({ $pager: $xePager, total, currentPage, pageCount }))
      }
      return h('span', {
        class: 'vxe-pager--total'
      }, getI18n('vxe.pager.total', [total]))
    }

    const pagerMethods: PagerMethods & { jumpPage: any } = {
      dispatchEvent,
      setPageSize (num) {
        pageSizeEvent({ value: num } as VxeSelectDefines.ChangeEventParams)
        return nextTick()
      },
      setPageSizeByEvent (evnt, num) {
        pageSizeEvent({ value: num, $event: evnt } as VxeSelectDefines.ChangeEventParams)
      },
      homePage () {
        handleHomePage()
        return nextTick()
      },
      homePageByEvent (evnt) {
        handleHomePage(evnt)
      },
      endPage () {
        handleEndPage()
        return nextTick()
      },
      endPageByEvent (evnt) {
        handleEndPage(evnt)
      },
      prevPage () {
        handlePrevPage()
        return nextTick()
      },
      prevPageByEvent (evnt) {
        handlePrevPage(evnt)
      },
      nextPage () {
        handleNextPage()
        return nextTick()
      },
      nextPageByEvent (evnt) {
        handleNextPage(evnt)
      },
      prevJump () {
        handlePrevJump()
        return nextTick()
      },
      prevJumpByEvent (evnt) {
        handlePrevJump(evnt)
      },
      nextJump () {
        handleNextJump()
        return nextTick()
      },
      nextJumpByEvent (evnt) {
        handleNextJump(evnt)
      },
      setCurrentPage (currentPage) {
        const current = XEUtils.toNumber(currentPage) || 1
        reactData.inpCurrPage = current
        handleChangeCurrentPage(current)
        return nextTick()
      },
      setCurrentPageByEvent (evnt, currentPage) {
        const current = XEUtils.toNumber(currentPage) || 1
        reactData.inpCurrPage = current
        handleChangeCurrentPage(current, evnt)
      },
      /**
       * 已废弃，被 setCurrentPage 替换
       * @deprecated
       */
      jumpPage (currentPage: number) {
        warnLog('vxe.error.delFunc', ['[pager] jumpPage', 'setCurrentPage'])
        return $xePager.setCurrentPage(currentPage)
      }
    }

    const pagerPrivateMethods: PagerPrivateMethods = {
      handlePrevPage,
      handleNextPage,
      handlePrevJump,
      handleNextJump
    }

    Object.assign($xePager, pagerMethods, pagerPrivateMethods)

    watch(() => props.currentPage, (value) => {
      reactData.inpCurrPage = value
    })

    const renderVN = () => {
      const { align, layouts, className } = props
      const childNodes = []
      const vSize = computeSize.value
      const pageCount = computePageCount.value
      if (slots.left) {
        childNodes.push(
          h('span', {
            class: 'vxe-pager--left-wrapper'
          }, slots.left({ $grid: $xeGrid }))
        )
      }
      layouts.forEach((name) => {
        let renderFn
        switch (name) {
          case 'Home':
            renderFn = renderHomePage
            break
          case 'PrevJump':
            renderFn = renderPrevJump
            break
          case 'PrevPage':
            renderFn = renderPrevPage
            break
          case 'Number':
            renderFn = renderNumber
            break
          case 'JumpNumber':
            renderFn = renderJumpNumber
            break
          case 'NextPage':
            renderFn = renderNextPage
            break
          case 'NextJump':
            renderFn = renderNextJump
            break
          case 'End':
            renderFn = renderEndPage
            break
          case 'Sizes':
            renderFn = renderSizes
            break
          case 'FullJump':
            renderFn = renderFullJump
            break
          case 'Jump':
            renderFn = renderJump
            break
          case 'PageCount':
            renderFn = renderPageCount
            break
          case 'Total':
            renderFn = renderTotal
            break
        }
        if (renderFn) {
          childNodes.push(renderFn())
        } else {
          errLog('vxe.error.notProp', [`[pager] layouts -> ${name}`])
        }
      })
      if (slots.right) {
        childNodes.push(
          h('span', {
            class: 'vxe-pager--right-wrapper'
          }, slots.right({ $grid: $xeGrid }))
        )
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-pager', className ? (XEUtils.isFunction(className) ? className({ $pager: $xePager }) : className) : '', {
          [`size--${vSize}`]: vSize,
          [`align--${align}`]: align,
          'is--border': props.border,
          'is--background': props.background,
          'is--perfect': props.perfect,
          'is--hidden': props.autoHidden && pageCount === 1,
          'is--loading': props.loading
        }]
      }, [
        h('div', {
          class: 'vxe-pager--wrapper'
        }, childNodes)
      ])
    }

    $xePager.renderVN = renderVN

    return $xePager
  },
  render () {
    return this.renderVN()
  }
})
