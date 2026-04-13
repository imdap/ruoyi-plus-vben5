"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
var _tooltip = _interopRequireDefault(require("../../tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeButtonComponent = (0, _comp.defineVxeComponent)({
  name: 'VxeButton',
  props: {
    /**
     * 按钮类型
     */
    type: String,
    mode: String,
    className: [String, Function],
    popupClassName: [String, Function],
    /**
     * 按钮尺寸
     */
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().button.size || (0, _ui.getConfig)().size
    },
    zIndex: Number,
    /**
     * 用来标识这一项
     */
    name: [String, Number],
    routerLink: Object,
    /**
     * 权限码
     */
    permissionCode: [String, Number],
    /**
     * 按钮内容
     */
    content: String,
    /**
     * 固定显示下拉面板的方向
     */
    placement: String,
    /**
     * 按钮状态
     */
    status: String,
    /**
     * 标题
     */
    title: String,
    shadow: Boolean,
    /**
     * 按钮的前缀图标，属于 prefix-icon 的简写
     */
    icon: String,
    iconRender: Object,
    /**
     * 按钮的前缀图标
     */
    prefixIcon: String,
    prefixRender: Object,
    /**
     * 按钮的后缀图标
     */
    suffixIcon: String,
    suffixRender: Object,
    /**
     * 圆角边框
     */
    round: Boolean,
    /**
     * 圆角按钮
     */
    circle: Boolean,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 是否加载中
     */
    loading: Boolean,
    trigger: {
      type: String,
      default: () => (0, _ui.getConfig)().button.trigger
    },
    align: String,
    prefixTooltip: Object,
    suffixTooltip: Object,
    options: Array,
    showDropdownIcon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().button.showDropdownIcon
    },
    /**
     * 在下拉面板关闭时销毁内容
     */
    destroyOnClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().button.destroyOnClose
    },
    popupConfig: Object,
    /**
     * 是否将弹框容器插入于 body 内
     */
    transfer: {
      type: Boolean,
      default: null
    }
  },
  emits: ['click', 'mouseenter', 'mouseleave', 'dropdown-click', 'dropdownClick', 'contextmenu'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeModal = (0, _vue.inject)('$xeModal', null);
    const $xeDrawer = (0, _vue.inject)('$xeDrawer', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeTree = (0, _vue.inject)('$xeTree', null);
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const $xeButtonGroup = (0, _vue.inject)('$xeButtonGroup', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const {
      computePermissionInfo
    } = (0, _ui.usePermission)(props);
    const reactData = (0, _vue.reactive)({
      initialized: false,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: ''
    });
    const internalData = {
      showTime: undefined,
      tooltipTimeout: undefined
    };
    const refElem = (0, _vue.ref)();
    const refButton = (0, _vue.ref)();
    const refBtnPanel = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeButton = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    let buttonMethods = {};
    const computeBtnTransfer = (0, _vue.computed)(() => {
      const {
        transfer
      } = props;
      const popupOpts = computePopupOpts.value;
      if (_xeUtils.default.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer;
      }
      if (transfer === null) {
        const globalTransfer = (0, _ui.getConfig)().button.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeTree || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeBtnDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      const permissionInfo = computePermissionInfo.value;
      return disabled || permissionInfo.disabled;
    });
    const computeIsFormBtn = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      if (type) {
        return ['submit', 'reset', 'button'].indexOf(type) > -1;
      }
      return false;
    });
    const computeBtnMode = (0, _vue.computed)(() => {
      const {
        type,
        mode
      } = props;
      if (mode === 'text' || type === 'text' || $xeButtonGroup && $xeButtonGroup.props.mode === 'text') {
        return 'text';
      }
      return 'button';
    });
    const computeBtnStatus = (0, _vue.computed)(() => {
      const {
        status
      } = props;
      if (status) {
        return status;
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.status;
      }
      return '';
    });
    const computeBtnAlign = (0, _vue.computed)(() => {
      const {
        align
      } = props;
      if (align) {
        return align;
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.align;
      }
      return false;
    });
    const computeBtnRound = (0, _vue.computed)(() => {
      const {
        round
      } = props;
      if (round) {
        return round;
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.round;
      }
      return false;
    });
    const computeBtnCircle = (0, _vue.computed)(() => {
      const {
        circle
      } = props;
      if (circle) {
        return circle;
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.circle;
      }
      return false;
    });
    const computeDownBtnList = (0, _vue.computed)(() => {
      const {
        options
      } = props;
      if (options) {
        return options.filter(item => {
          const {
            permissionCode
          } = item;
          return !permissionCode || _ui.permission.checkVisible(permissionCode);
        });
      }
      return [];
    });
    const computePopupOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().button.popupConfig, props.popupConfig);
    });
    const computePrefixTipOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().button.prefixTooltip, props.prefixTooltip);
    });
    const computeSuffixTipOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().button.suffixTooltip, props.suffixTooltip);
    });
    const updateZindex = () => {
      const popupOpts = computePopupOpts.value;
      const customZIndex = popupOpts.zIndex || props.zIndex;
      if (customZIndex) {
        reactData.panelIndex = _xeUtils.default.toNumber(customZIndex);
      } else if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      const {
        placement
      } = props;
      const {
        panelIndex
      } = reactData;
      const targetElem = refButton.value;
      const panelElem = refBtnPanel.value;
      const btnTransfer = computeBtnTransfer.value;
      const popupOpts = computePopupOpts.value;
      const handleStyle = () => {
        const ppObj = (0, _dom.updatePanelPlacement)(targetElem, panelElem, {
          placement: popupOpts.placement || placement,
          defaultPlacement: popupOpts.defaultPlacement,
          teleportTo: btnTransfer
        });
        const panelStyle = Object.assign(ppObj.style, {
          zIndex: panelIndex
        });
        reactData.panelStyle = panelStyle;
        reactData.panelPlacement = ppObj.placement;
      };
      handleStyle();
      return (0, _vue.nextTick)().then(handleStyle);
    };
    const clickEvent = evnt => {
      if ($xeButtonGroup) {
        $xeButtonGroup.handleClick({
          name: props.name
        }, evnt);
      }
      dispatchEvent('click', {
        $event: evnt
      }, evnt);
    };
    const downBtnClickEvent = (params, option) => {
      const {
        $event
      } = params;
      hidePanel();
      dispatchEvent('dropdown-click', {
        name: option.name,
        option
      }, $event);
    };
    const mousedownDropdownEvent = evnt => {
      const isLeftBtn = evnt.button === 0;
      if (isLeftBtn) {
        evnt.stopPropagation();
      }
    };
    const clickDropdownEvent = evnt => {
      const dropdownElem = evnt.currentTarget;
      const panelElem = refBtnPanel.value;
      const {
        flag,
        targetElem
      } = (0, _dom.getEventTargetNode)(evnt, dropdownElem, 'vxe-button');
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = 'N';
        }
        reactData.visiblePanel = false;
        setTimeout(() => {
          if (!panelElem || panelElem.dataset.active !== 'Y') {
            reactData.isAniVisible = false;
          }
        }, 350);
        dispatchEvent('dropdown-click', {
          name: targetElem.getAttribute('name'),
          option: null
        }, evnt);
      }
    };
    const mouseenterDropdownEvent = () => {
      const panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = 'Y';
        reactData.isAniVisible = true;
        setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            reactData.visiblePanel = true;
            updateZindex();
            updatePlacement();
            setTimeout(() => {
              if (reactData.visiblePanel) {
                updatePlacement();
              }
            }, 50);
          }
        }, 20);
      }
    };
    const mouseenterTargetEvent = evnt => {
      const {
        loading
      } = props;
      const btnDisabled = computeBtnDisabled.value;
      if (!(btnDisabled || loading)) {
        openPanel();
        mouseenterEvent(evnt);
      }
    };
    const mouseleaveTargetEvent = evnt => {
      hidePanel();
      mouseleaveEvent(evnt);
    };
    const mouseenterEvent = evnt => {
      dispatchEvent('mouseenter', {}, evnt);
    };
    const mouseleaveEvent = evnt => {
      dispatchEvent('mouseleave', {}, evnt);
    };
    const contextmenuEvent = evnt => {
      dispatchEvent('contextmenu', {}, evnt);
    };
    const clickTargetEvent = evnt => {
      const {
        loading,
        trigger
      } = props;
      const btnDisabled = computeBtnDisabled.value;
      if (!(btnDisabled || loading)) {
        if (trigger === 'click') {
          if (reactData.visiblePanel) {
            hidePanel();
          } else {
            openPanel();
          }
        }
        clickEvent(evnt);
      }
    };
    const openPanel = () => {
      const {
        trigger
      } = props;
      const panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = 'Y';
        if (!reactData.initialized) {
          reactData.initialized = true;
        }
        internalData.showTime = setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            mouseenterDropdownEvent();
          } else {
            reactData.isAniVisible = false;
          }
        }, trigger === 'click' ? 50 : 250);
      }
      return (0, _vue.nextTick)();
    };
    const hidePanel = () => {
      const panelElem = refBtnPanel.value;
      clearTimeout(internalData.showTime);
      if (panelElem) {
        panelElem.dataset.active = 'N';
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            reactData.visiblePanel = false;
            setTimeout(() => {
              if (panelElem.dataset.active !== 'Y') {
                reactData.isAniVisible = false;
              }
            }, 350);
          }
        }, 100);
      } else {
        reactData.isAniVisible = false;
        reactData.visiblePanel = false;
      }
      return (0, _vue.nextTick)();
    };
    const mouseleaveDropdownEvent = () => {
      hidePanel();
    };
    const renderTooltipIcon = (tipOpts, type) => {
      return (0, _vue.h)(_tooltip.default, {
        useHTML: tipOpts.useHTML,
        content: tipOpts.content,
        enterable: tipOpts.enterable,
        theme: tipOpts.theme
      }, {
        default() {
          return (0, _vue.h)('span', {
            class: `vxe-button--item vxe-button--tooltip-${type}-icon`
          }, [(0, _vue.h)('i', {
            class: tipOpts.icon || (0, _ui.getIcon)().BUTTON_TOOLTIP_ICON
          })]);
        }
      });
    };
    const renderContent = () => {
      const {
        content,
        suffixIcon,
        loading,
        prefixTooltip,
        suffixTooltip,
        suffixRender
      } = props;
      const prefixIcon = props.prefixIcon || props.icon;
      const prefixRender = props.prefixRender || props.iconRender;
      const prefixTipOpts = computePrefixTipOpts.value;
      const suffixTipOpts = computeSuffixTipOpts.value;
      const prefixIconSlot = slots.prefix || slots.icon;
      const suffixIconSlot = slots.suffix;
      const defaultSlot = slots.default;
      const contVNs = [];
      if (prefixTooltip) {
        contVNs.push(renderTooltipIcon(prefixTipOpts, 'prefix'));
      }
      if (loading) {
        contVNs.push((0, _vue.h)('i', {
          class: ['vxe-button--item vxe-button--loading-icon', (0, _ui.getIcon)().BUTTON_LOADING]
        }));
      } else if (prefixIconSlot) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--item vxe-button--custom-prefix-icon'
        }, prefixIconSlot({})));
      } else if (prefixRender) {
        const compConf = _ui.renderer.get(prefixRender.name);
        const pIconMethod = compConf ? compConf.renderButtonPrefix : null;
        contVNs.push((0, _vue.h)('span', {
          class: ['vxe-button--item vxe-button--custom-prefix-icon']
        }, pIconMethod ? (0, _vn.getSlotVNs)(pIconMethod(prefixRender, {
          $button: $xeButton
        })) : []));
      } else if (prefixIcon) {
        contVNs.push((0, _vue.h)('i', {
          class: ['vxe-button--item vxe-button--prefix-icon', prefixIcon]
        }));
      }
      if (defaultSlot) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--item vxe-button--content'
        }, defaultSlot({})));
      } else if (content) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--item vxe-button--content'
        }, (0, _utils.getFuncText)(content)));
      }
      if (suffixIconSlot) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--item vxe-button--custom-suffix-icon'
        }, suffixIconSlot({})));
      } else if (suffixRender) {
        const compConf = _ui.renderer.get(suffixRender.name);
        const sIconMethod = compConf ? compConf.renderButtonSuffix : null;
        contVNs.push((0, _vue.h)('span', {
          class: ['vxe-button--item vxe-button--custom-suffix-icon']
        }, sIconMethod ? (0, _vn.getSlotVNs)(sIconMethod(suffixRender, {
          $button: $xeButton
        })) : []));
      } else if (suffixIcon) {
        contVNs.push((0, _vue.h)('i', {
          class: ['vxe-button--item vxe-button--suffix-icon', suffixIcon]
        }));
      }
      if (suffixTooltip) {
        contVNs.push(renderTooltipIcon(suffixTipOpts, 'suffix'));
      }
      return contVNs;
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $button: $xeButton
      }, params));
    };
    buttonMethods = {
      dispatchEvent,
      openPanel,
      closePanel: hidePanel,
      focus() {
        const btnElem = refButton.value;
        if (btnElem) {
          btnElem.focus();
        }
        return (0, _vue.nextTick)();
      },
      blur() {
        const btnElem = refButton.value;
        if (btnElem) {
          btnElem.blur();
        }
        return (0, _vue.nextTick)();
      }
    };
    const handleGlobalMousewheelEvent = evnt => {
      const panelElem = refBtnPanel.value;
      if (reactData.visiblePanel && !(0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
        hidePanel();
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const btnDisabled = computeBtnDisabled.value;
      const {
        visiblePanel
      } = reactData;
      if (!btnDisabled) {
        const el = refElem.value;
        const panelElem = refBtnPanel.value;
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hidePanel();
        }
      }
    };
    const handleGlobalResizeEvent = () => {
      const {
        visiblePanel
      } = reactData;
      if (visiblePanel) {
        updatePlacement();
      }
    };
    Object.assign($xeButton, buttonMethods);
    const renderVN = () => {
      const {
        className,
        trigger,
        title,
        routerLink,
        type,
        destroyOnClose,
        name,
        loading,
        shadow,
        showDropdownIcon
      } = props;
      const {
        initialized,
        isAniVisible,
        visiblePanel
      } = reactData;
      const isFormBtn = computeIsFormBtn.value;
      const btnMode = computeBtnMode.value;
      const btnStatus = computeBtnStatus.value;
      const btnRound = computeBtnRound.value;
      const btnAlign = computeBtnAlign.value;
      const btnCircle = computeBtnCircle.value;
      const btnTransfer = computeBtnTransfer.value;
      const btnDisabled = computeBtnDisabled.value;
      const permissionInfo = computePermissionInfo.value;
      const downBtnList = computeDownBtnList.value;
      const popupOpts = computePopupOpts.value;
      const vSize = computeSize.value;
      const dropdownsSlot = slots.dropdowns;
      const ppClassName = popupOpts.className || props.popupClassName;
      if (!permissionInfo.visible) {
        return (0, _ui.renderEmptyElement)($xeButton);
      }
      if (dropdownsSlot || downBtnList.length) {
        const btnOns = {
          onContextmenu: contextmenuEvent
        };
        const panelOns = {};
        if (trigger === 'hover') {
          // hover 触发
          btnOns.onMouseenter = mouseenterTargetEvent;
          btnOns.onMouseleave = mouseleaveTargetEvent;
          panelOns.onMouseenter = mouseenterDropdownEvent;
          panelOns.onMouseleave = mouseleaveDropdownEvent;
        }
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-button--dropdown', className ? _xeUtils.default.isFunction(className) ? className({
            $button: $xeButton
          }) : className : '', {
            [`size--${vSize}`]: vSize,
            'is--active': visiblePanel
          }]
        }, [routerLink ? (0, _vue.h)((0, _vue.resolveComponent)('router-link'), Object.assign({
          ref: refButton,
          class: ['vxe-button', 'vxe-button--link', `type--${btnMode}`, btnAlign ? `align--${btnAlign}` : '', className ? _xeUtils.default.isFunction(className) ? className({
            $button: $xeButton
          }) : className : '', {
            [`size--${vSize}`]: vSize,
            [`theme--${btnStatus}`]: btnStatus,
            'is--round': btnRound,
            'is--circle': btnCircle,
            'is--shadow': shadow,
            'is--disabled': btnDisabled || loading,
            'is--loading': loading
          }],
          title,
          name,
          type: isFormBtn ? type : 'button',
          disabled: btnDisabled || loading,
          to: routerLink,
          onClick: clickTargetEvent
        }, btnOns), {
          default() {
            return renderContent().concat(showDropdownIcon ? [(0, _vue.h)('i', {
              class: `vxe-button--dropdown-arrow ${(0, _ui.getIcon)().BUTTON_DROPDOWN}`
            })] : []);
          }
        }) : (0, _vue.h)('button', Object.assign({
          ref: refButton,
          class: ['vxe-button', `type--${btnMode}`, btnAlign ? `align--${btnAlign}` : '', className ? _xeUtils.default.isFunction(className) ? className({
            $button: $xeButton
          }) : className : '', {
            [`size--${vSize}`]: vSize,
            [`theme--${btnStatus}`]: btnStatus,
            'is--round': btnRound,
            'is--circle': btnCircle,
            'is--shadow': shadow,
            'is--disabled': btnDisabled || loading,
            'is--loading': loading
          }],
          title,
          name,
          type: isFormBtn ? type : 'button',
          disabled: btnDisabled || loading,
          onClick: clickTargetEvent
        }, btnOns), renderContent().concat(showDropdownIcon ? [(0, _vue.h)('i', {
          class: `vxe-button--dropdown-arrow ${(0, _ui.getIcon)().BUTTON_DROPDOWN}`
        })] : [])), (0, _vue.h)(_vue.Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [(0, _vue.h)('div', Object.assign({
          ref: refBtnPanel,
          class: ['vxe-button--dropdown-panel', ppClassName ? _xeUtils.default.isFunction(ppClassName) ? ppClassName({
            $button: $xeButton
          }) : ppClassName : '', {
            [`size--${vSize}`]: vSize,
            'is--transfer': btnTransfer,
            'ani--leave': isAniVisible,
            'ani--enter': visiblePanel
          }],
          placement: reactData.panelPlacement,
          style: reactData.panelStyle
        }, panelOns), initialized && (visiblePanel || isAniVisible) ? [dropdownsSlot ? (0, _vue.h)('div', {
          class: 'vxe-button--dropdown-wrapper',
          onMousedown: mousedownDropdownEvent,
          onClick: clickDropdownEvent
        }, initialized && (destroyOnClose ? visiblePanel || isAniVisible : true) ? dropdownsSlot({}) : []) : (0, _vue.h)('div', {
          class: 'vxe-button--dropdown-wrapper'
        }, initialized && (destroyOnClose ? visiblePanel || isAniVisible : true) ? downBtnList.map((option, i) => {
          return (0, _vue.h)(VxeButtonComponent, {
            key: i,
            type: option.type,
            mode: option.mode || btnMode,
            className: option.className,
            name: option.name,
            routerLink: option.routerLink,
            permissionCode: option.permissionCode,
            title: option.title,
            content: option.content,
            status: option.status,
            icon: option.icon,
            round: _xeUtils.default.isBoolean(option.round) ? option.round : btnMode === 'text' ? false : btnRound,
            circle: _xeUtils.default.isBoolean(option.circle) ? option.circle : btnMode === 'text' ? false : btnCircle,
            disabled: option.disabled,
            loading: option.loading,
            align: option.align,
            onClick(params) {
              downBtnClickEvent(params, option);
            }
          });
        }) : [])] : [])])]);
      }
      if (routerLink) {
        return (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
          ref: refButton,
          class: ['vxe-button', 'vxe-button--link', `type--${btnMode}`, btnAlign ? `align--${btnAlign}` : '', className ? _xeUtils.default.isFunction(className) ? className({
            $button: $xeButton
          }) : className : '', {
            [`size--${vSize}`]: vSize,
            [`theme--${btnStatus}`]: btnStatus,
            'is--round': btnRound,
            'is--circle': btnCircle,
            'is--shadow': shadow,
            'is--disabled': btnDisabled || loading,
            'is--loading': loading
          }],
          title,
          name,
          type: isFormBtn ? type : 'button',
          disabled: btnDisabled || loading,
          to: routerLink,
          onClick: clickEvent,
          onMouseenter: mouseenterEvent,
          onMouseleave: mouseleaveEvent,
          onContextmenu: contextmenuEvent
        }, {
          default() {
            return renderContent();
          }
        });
      }
      return (0, _vue.h)('button', {
        ref: refButton,
        class: ['vxe-button', `type--${btnMode}`, btnAlign ? `align--${btnAlign}` : '', className ? _xeUtils.default.isFunction(className) ? className({
          $button: $xeButton
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
          'is--round': btnRound,
          'is--circle': btnCircle,
          'is--shadow': shadow,
          'is--disabled': btnDisabled || loading,
          'is--loading': loading
        }],
        title,
        name,
        type: isFormBtn ? type : 'button',
        disabled: btnDisabled || loading,
        onClick: clickEvent,
        onMouseenter: mouseenterEvent,
        onMouseleave: mouseleaveEvent,
        onContextmenu: contextmenuEvent
      }, renderContent());
    };
    $xeButton.renderVN = renderVN;
    (0, _vue.onMounted)(() => {
      if (props.type === 'text') {
        (0, _log.warnLog)('vxe.error.delProp', ['[button] type=text', 'mode=text']);
      }
      _ui.globalEvents.on($xeButton, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeButton, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeButton, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeButton, 'mousewheel');
      _ui.globalEvents.off($xeButton, 'mousedown');
      _ui.globalEvents.off($xeButton, 'resize');
    });
    return $xeButton;
  },
  render() {
    return this.renderVN();
  }
});
var _default = exports.default = VxeButtonComponent;