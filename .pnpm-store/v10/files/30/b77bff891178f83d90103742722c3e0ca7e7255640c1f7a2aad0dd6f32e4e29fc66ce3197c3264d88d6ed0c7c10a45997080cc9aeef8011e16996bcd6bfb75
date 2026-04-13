"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _log = require("../../ui/src/log");
var _select = _interopRequireDefault(require("../../select/src/select"));
var _numberInput = _interopRequireDefault(require("../../number-input/src/number-input"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxePager',
  props: {
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().pager.size || (0, _ui.getConfig)().size
    },
    // 自定义布局
    layouts: {
      type: Array,
      default: () => (0, _ui.getConfig)().pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: () => (0, _ui.getConfig)().pager.pageSize || 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: () => (0, _ui.getConfig)().pager.pagerCount || 7
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: () => (0, _ui.getConfig)().pager.pageSizes || [10, 15, 20, 50, 100]
    },
    // 列对齐方式
    align: {
      type: String,
      default: () => (0, _ui.getConfig)().pager.align
    },
    // 带边框
    border: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().pager.border
    },
    // 带背景颜色
    background: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().pager.background
    },
    // 配套的样式
    perfect: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().pager.perfect
    },
    // 当只有一页时隐藏
    autoHidden: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().pager.autoHidden
    },
    transfer: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().pager.transfer
    },
    className: [String, Function],
    pageSizePlacement: {
      type: String,
      default: () => (0, _ui.getConfig)().pager.pageSizePlacement
    },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String,
    iconHomePage: String,
    iconEndPage: String
  },
  emits: ['update:pageSize', 'update:currentPage', 'page-change'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const $xeGrid = (0, _vue.inject)('$xeGrid', null);
    const reactData = (0, _vue.reactive)({
      inpCurrPage: props.currentPage
    });
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const computePageCount = (0, _vue.computed)(() => {
      return getPageCount(props.total, props.pageSize);
    });
    const computeNumList = (0, _vue.computed)(() => {
      const {
        pagerCount
      } = props;
      const pageCount = computePageCount.value;
      const len = pageCount > pagerCount ? pagerCount - 2 : pagerCount;
      const rest = [];
      for (let index = 0; index < len; index++) {
        rest.push(index);
      }
      return rest;
    });
    const computeOffsetNumber = (0, _vue.computed)(() => {
      return Math.floor((props.pagerCount - 2) / 2);
    });
    const computeSizeList = (0, _vue.computed)(() => {
      return props.pageSizes.map(item => {
        if (_xeUtils.default.isNumber(item)) {
          return {
            value: item,
            label: `${(0, _ui.getI18n)('vxe.pager.pagesize', [item])}`
          };
        }
        return Object.assign({
          value: '',
          label: ''
        }, item);
      });
    });
    const $xePager = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $pager: $xePager
      }, params));
    };
    const getPageCount = (total, size) => {
      return Math.max(Math.ceil(total / size), 1);
    };
    const handleJumpPageEvent = (evnt, currentPage) => {
      emit('update:currentPage', currentPage);
      if (evnt && currentPage !== props.currentPage) {
        dispatchEvent('page-change', {
          type: 'current',
          pageSize: props.pageSize,
          currentPage
        }, evnt);
      }
    };
    const handleChangeCurrentPage = (currentPage, evnt) => {
      emit('update:currentPage', currentPage);
      if (evnt && currentPage !== props.currentPage) {
        dispatchEvent('page-change', {
          type: 'current',
          pageSize: props.pageSize,
          currentPage
        }, evnt);
      }
    };
    const triggerJumpEvent = params => {
      const {
        $event
      } = params;
      const inputElem = $event.target;
      const inpValue = _xeUtils.default.toInteger(inputElem.value);
      const pageCount = computePageCount.value;
      const current = inpValue <= 0 ? 1 : inpValue >= pageCount ? pageCount : inpValue;
      const currPage = _xeUtils.default.toValueString(current);
      inputElem.value = currPage;
      reactData.inpCurrPage = currPage;
      handleChangeCurrentPage(current, $event);
    };
    const handleHomePage = evnt => {
      const {
        currentPage
      } = props;
      if (currentPage > 1) {
        handleChangeCurrentPage(1, evnt);
      }
    };
    const handleEndPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage < pageCount) {
        handleChangeCurrentPage(pageCount, evnt);
      }
    };
    const handlePrevPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage > 1) {
        handleChangeCurrentPage(Math.min(pageCount, Math.max(currentPage - 1, 1)), evnt);
      }
    };
    const handleNextPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage < pageCount) {
        handleChangeCurrentPage(Math.min(pageCount, currentPage + 1), evnt);
      }
    };
    const handlePrevJump = evnt => {
      const numList = computeNumList.value;
      handleChangeCurrentPage(Math.max(props.currentPage - numList.length, 1), evnt);
    };
    const handleNextJump = evnt => {
      const pageCount = computePageCount.value;
      const numList = computeNumList.value;
      handleChangeCurrentPage(Math.min(props.currentPage + numList.length, pageCount), evnt);
    };
    const pageSizeEvent = params => {
      const {
        value,
        $event
      } = params;
      const pageSize = _xeUtils.default.toNumber(value);
      const pageCount = getPageCount(props.total, pageSize);
      let currentPage = props.currentPage;
      if (currentPage > pageCount) {
        currentPage = pageCount;
        emit('update:currentPage', pageCount);
      }
      emit('update:pageSize', pageSize);
      if ($event) {
        dispatchEvent('page-change', {
          type: 'size',
          pageSize,
          currentPage
        }, $event);
      }
    };
    const jumpKeydownEvent = params => {
      const {
        $event
      } = params;
      if (_ui.globalEvents.hasKey($event, _ui.GLOBAL_EVENT_KEYS.ENTER)) {
        triggerJumpEvent(params);
      } else if (_ui.globalEvents.hasKey($event, _ui.GLOBAL_EVENT_KEYS.ARROW_UP)) {
        $event.preventDefault();
        handleNextPage($event);
      } else if (_ui.globalEvents.hasKey($event, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN)) {
        $event.preventDefault();
        handlePrevPage($event);
      }
    };
    // 第一页
    const renderHomePage = () => {
      const {
        currentPage,
        total
      } = props;
      const homeSlot = slots.home;
      const pageCount = computePageCount.value;
      if (homeSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-home-btn'
        }, homeSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('button', {
        class: ['vxe-pager--home-btn', {
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.homePageTitle'),
        onClick: handleHomePage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconHomePage || (0, _ui.getIcon)().PAGER_HOME]
      })]);
    };
    // 上一页
    const renderPrevPage = () => {
      const {
        currentPage,
        total
      } = props;
      const prevPageSlot = slots.prevPage || slots['prev-page'];
      const pageCount = computePageCount.value;
      if (prevPageSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-prev-btn'
        }, prevPageSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.prevPageTitle'),
        onClick: handlePrevPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconPrevPage || (0, _ui.getIcon)().PAGER_PREV_PAGE]
      })]);
    };
    // 向上翻页
    const renderPrevJump = tagName => {
      const {
        currentPage,
        total
      } = props;
      const prevJumpSlot = slots.prevJump || slots['prev-jump'];
      const pageCount = computePageCount.value;
      if (prevJumpSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-jump-prev'
        }, prevJumpSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)(tagName || 'button', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.prevJumpTitle'),
        onClick: handlePrevJump
      }, [tagName ? (0, _vue.h)('i', {
        class: ['vxe-pager--jump-more-icon', props.iconJumpMore || (0, _ui.getIcon)().PAGER_JUMP_MORE]
      }) : null, (0, _vue.h)('i', {
        class: ['vxe-pager--jump-icon', props.iconJumpPrev || (0, _ui.getIcon)().PAGER_JUMP_PREV]
      })]);
    };
    // 向下翻页
    const renderNextJump = tagName => {
      const {
        currentPage,
        total
      } = props;
      const nextJumpSlot = slots.nextJump || slots['next-jump'];
      const pageCount = computePageCount.value;
      if (nextJumpSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-jump-next'
        }, nextJumpSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)(tagName || 'button', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.nextJumpTitle'),
        onClick: handleNextJump
      }, [tagName ? (0, _vue.h)('i', {
        class: ['vxe-pager--jump-more-icon', props.iconJumpMore || (0, _ui.getIcon)().PAGER_JUMP_MORE]
      }) : null, (0, _vue.h)('i', {
        class: ['vxe-pager--jump-icon', props.iconJumpNext || (0, _ui.getIcon)().PAGER_JUMP_NEXT]
      })]);
    };
    // 下一页
    const renderNextPage = () => {
      const {
        currentPage,
        total
      } = props;
      const nextPageSlot = slots.nextPage || slots['next-page'];
      const pageCount = computePageCount.value;
      if (nextPageSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-next-btn'
        }, nextPageSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('button', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.nextPageTitle'),
        onClick: handleNextPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconNextPage || (0, _ui.getIcon)().PAGER_NEXT_PAGE]
      })]);
    };
    // 最后一页
    const renderEndPage = () => {
      const {
        currentPage,
        total
      } = props;
      const endSlot = slots.end;
      const pageCount = computePageCount.value;
      if (endSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-end-btn'
        }, endSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('button', {
        class: ['vxe-pager--end-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        type: 'button',
        title: (0, _ui.getI18n)('vxe.pager.endPageTitle'),
        onClick: handleEndPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconEndPage || (0, _ui.getIcon)().PAGER_END]
      })]);
    };
    // 页数
    const renderNumber = showJump => {
      const {
        currentPage,
        total,
        pagerCount
      } = props;
      const numberSlot = showJump ? slots.numberJump || slots['number-jump'] : slots.number;
      const nums = [];
      const pageCount = computePageCount.value;
      const numList = computeNumList.value;
      const offsetNumber = computeOffsetNumber.value;
      const isOv = pageCount > pagerCount;
      const isLt = isOv && currentPage > offsetNumber + 1;
      const isGt = isOv && currentPage < pageCount - offsetNumber;
      const restList = [];
      let startNumber = 1;
      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }
      if (showJump && isLt) {
        restList.push(1);
        nums.push((0, _vue.h)('button', {
          class: 'vxe-pager--num-btn',
          type: 'button',
          onClick: evnt => handleJumpPageEvent(evnt, 1)
        }, '1'), renderPrevJump('span'));
      }
      numList.forEach((item, index) => {
        const number = startNumber + index;
        if (number <= pageCount) {
          restList.push(number);
          nums.push((0, _vue.h)('button', {
            key: number,
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            type: 'button',
            onClick: evnt => handleJumpPageEvent(evnt, number)
          }, `${number}`));
        }
      });
      if (showJump && isGt) {
        restList.push(pageCount);
        nums.push(renderNextJump('button'), (0, _vue.h)('button', {
          class: 'vxe-pager--num-btn',
          type: 'button',
          onClick: evnt => handleJumpPageEvent(evnt, pageCount)
        }, pageCount));
      }
      if (numberSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-btn-wrapper'
        }, numberSlot({
          $pager: $xePager,
          total,
          numList: restList,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('span', {
        class: 'vxe-pager--btn-wrapper'
      }, nums);
    };
    // jumpNumber
    const renderJumpNumber = () => {
      return renderNumber(true);
    };
    // sizes
    const renderSizes = () => {
      const {
        total,
        currentPage,
        pageSize,
        pageSizePlacement,
        transfer
      } = props;
      const sizesSlot = slots.sizes;
      const sizeList = computeSizeList.value;
      const pageCount = computePageCount.value;
      if (sizesSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-sizes'
        }, sizesSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount,
          pageSize,
          options: sizeList
        }));
      }
      return (0, _vue.h)(_select.default, {
        class: 'vxe-pager--sizes',
        modelValue: pageSize,
        placement: pageSizePlacement,
        transfer: transfer,
        options: sizeList,
        onChange: pageSizeEvent
      });
    };
    // Jump
    const renderJump = isFull => {
      const {
        total
      } = props;
      const {
        inpCurrPage
      } = reactData;
      const jumpSlot = isFull ? slots.fullJump || slots['full-jump'] : slots.jump;
      const pageCount = computePageCount.value;
      if (jumpSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-jump'
        }, jumpSlot({
          $pager: $xePager,
          total,
          currentPage: inpCurrPage,
          pageCount
        }));
      }
      return (0, _vue.h)('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? (0, _vue.h)('span', {
        class: 'vxe-pager--goto-text'
      }, (0, _ui.getI18n)('vxe.pager.goto')) : null, (0, _vue.h)(_numberInput.default, {
        class: 'vxe-pager--goto',
        modelValue: reactData.inpCurrPage,
        placeholder: (0, _ui.getI18n)('vxe.pager.gotoTitle'),
        align: 'center',
        type: 'integer',
        max: pageCount,
        min: 1,
        controls: false,
        onKeydown: jumpKeydownEvent,
        onBlur: triggerJumpEvent,
        'onUpdate:modelValue'(val) {
          reactData.inpCurrPage = val;
        }
      }), isFull ? (0, _vue.h)('span', {
        class: 'vxe-pager--classifier-text'
      }, (0, _ui.getI18n)('vxe.pager.pageClassifier')) : null]);
    };
    // FullJump
    const renderFullJump = () => {
      return renderJump(true);
    };
    // PageCount
    const renderPageCount = () => {
      const {
        currentPage,
        total
      } = props;
      const pageCountSlot = slots.pageCount || slots['page-count'];
      const pageCount = computePageCount.value;
      if (pageCountSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-count'
        }, pageCountSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('span', {
        class: 'vxe-pager--count'
      }, [(0, _vue.h)('span', {
        class: 'vxe-pager--separator'
      }), (0, _vue.h)('span', pageCount)]);
    };
    // total
    const renderTotal = () => {
      const {
        currentPage,
        total
      } = props;
      const totalSlot = slots.total;
      const pageCount = computePageCount.value;
      if (totalSlot) {
        return (0, _vue.h)('span', {
          class: 'vxe-pager--custom-total'
        }, totalSlot({
          $pager: $xePager,
          total,
          currentPage,
          pageCount
        }));
      }
      return (0, _vue.h)('span', {
        class: 'vxe-pager--total'
      }, (0, _ui.getI18n)('vxe.pager.total', [total]));
    };
    const pagerMethods = {
      dispatchEvent,
      setPageSize(num) {
        pageSizeEvent({
          value: num
        });
        return (0, _vue.nextTick)();
      },
      setPageSizeByEvent(evnt, num) {
        pageSizeEvent({
          value: num,
          $event: evnt
        });
      },
      homePage() {
        handleHomePage();
        return (0, _vue.nextTick)();
      },
      homePageByEvent(evnt) {
        handleHomePage(evnt);
      },
      endPage() {
        handleEndPage();
        return (0, _vue.nextTick)();
      },
      endPageByEvent(evnt) {
        handleEndPage(evnt);
      },
      prevPage() {
        handlePrevPage();
        return (0, _vue.nextTick)();
      },
      prevPageByEvent(evnt) {
        handlePrevPage(evnt);
      },
      nextPage() {
        handleNextPage();
        return (0, _vue.nextTick)();
      },
      nextPageByEvent(evnt) {
        handleNextPage(evnt);
      },
      prevJump() {
        handlePrevJump();
        return (0, _vue.nextTick)();
      },
      prevJumpByEvent(evnt) {
        handlePrevJump(evnt);
      },
      nextJump() {
        handleNextJump();
        return (0, _vue.nextTick)();
      },
      nextJumpByEvent(evnt) {
        handleNextJump(evnt);
      },
      setCurrentPage(currentPage) {
        const current = _xeUtils.default.toNumber(currentPage) || 1;
        reactData.inpCurrPage = current;
        handleChangeCurrentPage(current);
        return (0, _vue.nextTick)();
      },
      setCurrentPageByEvent(evnt, currentPage) {
        const current = _xeUtils.default.toNumber(currentPage) || 1;
        reactData.inpCurrPage = current;
        handleChangeCurrentPage(current, evnt);
      },
      /**
       * 已废弃，被 setCurrentPage 替换
       * @deprecated
       */
      jumpPage(currentPage) {
        (0, _log.warnLog)('vxe.error.delFunc', ['[pager] jumpPage', 'setCurrentPage']);
        return $xePager.setCurrentPage(currentPage);
      }
    };
    const pagerPrivateMethods = {
      handlePrevPage,
      handleNextPage,
      handlePrevJump,
      handleNextJump
    };
    Object.assign($xePager, pagerMethods, pagerPrivateMethods);
    (0, _vue.watch)(() => props.currentPage, value => {
      reactData.inpCurrPage = value;
    });
    const renderVN = () => {
      const {
        align,
        layouts,
        className
      } = props;
      const childNodes = [];
      const vSize = computeSize.value;
      const pageCount = computePageCount.value;
      if (slots.left) {
        childNodes.push((0, _vue.h)('span', {
          class: 'vxe-pager--left-wrapper'
        }, slots.left({
          $grid: $xeGrid
        })));
      }
      layouts.forEach(name => {
        let renderFn;
        switch (name) {
          case 'Home':
            renderFn = renderHomePage;
            break;
          case 'PrevJump':
            renderFn = renderPrevJump;
            break;
          case 'PrevPage':
            renderFn = renderPrevPage;
            break;
          case 'Number':
            renderFn = renderNumber;
            break;
          case 'JumpNumber':
            renderFn = renderJumpNumber;
            break;
          case 'NextPage':
            renderFn = renderNextPage;
            break;
          case 'NextJump':
            renderFn = renderNextJump;
            break;
          case 'End':
            renderFn = renderEndPage;
            break;
          case 'Sizes':
            renderFn = renderSizes;
            break;
          case 'FullJump':
            renderFn = renderFullJump;
            break;
          case 'Jump':
            renderFn = renderJump;
            break;
          case 'PageCount':
            renderFn = renderPageCount;
            break;
          case 'Total':
            renderFn = renderTotal;
            break;
        }
        if (renderFn) {
          childNodes.push(renderFn());
        } else {
          (0, _log.errLog)('vxe.error.notProp', [`[pager] layouts -> ${name}`]);
        }
      });
      if (slots.right) {
        childNodes.push((0, _vue.h)('span', {
          class: 'vxe-pager--right-wrapper'
        }, slots.right({
          $grid: $xeGrid
        })));
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-pager', className ? _xeUtils.default.isFunction(className) ? className({
          $pager: $xePager
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          [`align--${align}`]: align,
          'is--border': props.border,
          'is--background': props.background,
          'is--perfect': props.perfect,
          'is--hidden': props.autoHidden && pageCount === 1,
          'is--loading': props.loading
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-pager--wrapper'
      }, childNodes)]);
    };
    $xePager.renderVN = renderVN;
    return $xePager;
  },
  render() {
    return this.renderVN();
  }
});