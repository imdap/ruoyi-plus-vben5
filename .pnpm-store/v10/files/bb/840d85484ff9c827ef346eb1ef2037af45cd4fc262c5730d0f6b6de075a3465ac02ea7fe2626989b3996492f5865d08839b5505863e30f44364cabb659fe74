"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../../ui");
var _utils = require("../../../ui/src/utils");
var _vn = require("../../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getIcon,
  getI18n,
  renderEmptyElement
} = _ui.VxeUI;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableMenuPanel',
  setup(props, context) {
    const xID = _xeUtils.default.uniqueId();
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      reactData: tableReactData
    } = $xeTable;
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeMenuPanel = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    };
    const renderVN = () => {
      const {
        ctxMenuStore
      } = tableReactData;
      const {
        computeMenuOpts
      } = $xeTable.getComputeMaps();
      const menuOpts = computeMenuOpts.value;
      const {
        transfer,
        destroyOnClose
      } = menuOpts;
      const {
        visible,
        list,
        className
      } = ctxMenuStore;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: !transfer
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--context-menu-wrapper', className, {
          'is--visible': visible
        }],
        style: ctxMenuStore.style
      }, (destroyOnClose ? visible : true) ? list.map((options, gIndex) => {
        return options.every(item => item.visible === false) ? renderEmptyElement($xeTable) : (0, _vue.h)('ul', {
          class: 'vxe-context-menu--option-wrapper',
          key: gIndex
        }, options.map((item, index) => {
          const {
            children,
            loading
          } = item;
          const hasChildMenus = children && children.some(child => child.visible !== false);
          const prefixOpts = Object.assign({}, item.prefixConfig);
          const prefixIcon = prefixOpts.icon || item.prefixIcon;
          const suffixOpts = Object.assign({}, item.suffixConfig);
          const suffixIcon = suffixOpts.icon || item.suffixIcon;
          const menuContent = (0, _utils.getFuncText)(item.name);
          return item.visible === false ? renderEmptyElement($xeTable) : (0, _vue.h)('li', {
            class: [item.className, {
              'link--loading': loading,
              'link--disabled': item.disabled,
              'link--active': item === ctxMenuStore.selected
            }],
            key: `${gIndex}_${index}`
          }, [(0, _vue.h)('a', {
            class: 'vxe-context-menu--link',
            onClick(evnt) {
              $xeTable.ctxMenuLinkEvent(evnt, item);
            },
            onMouseover(evnt) {
              $xeTable.ctxMenuMouseoverEvent(evnt, item);
            },
            onMouseout(evnt) {
              $xeTable.ctxMenuMouseoutEvent(evnt, item);
            }
          }, [(0, _vue.h)('div', {
            class: ['vxe-context-menu--link-prefix', prefixOpts.className || '']
          }, [loading ? (0, _vue.h)('span', {
            class: getIcon('TABLE_MENU_OPTION_LOADING')
          }) : prefixIcon && _xeUtils.default.isFunction(prefixIcon) ? (0, _vue.h)('span', {}, (0, _vn.getSlotVNs)(prefixIcon({}))) : (0, _vue.h)('span', {}, [(0, _vue.h)('i', {
            class: prefixIcon
          })]), prefixOpts.content ? (0, _vue.h)('span', {}, `${prefixOpts.content}`) : renderEmptyElement($xeTable)]), (0, _vue.h)('div', {
            class: 'vxe-context-menu--link-content',
            title: menuContent
          }, loading ? getI18n('vxe.table.menuLoading') : menuContent), (0, _vue.h)('div', {
            class: ['vxe-context-menu--link-suffix', suffixOpts.className || '']
          }, [suffixIcon && _xeUtils.default.isFunction(suffixIcon) ? (0, _vue.h)('span', {}, (0, _vn.getSlotVNs)(suffixIcon({}))) : (0, _vue.h)('i', {
            class: suffixIcon || (hasChildMenus ? getIcon().TABLE_MENU_OPTIONS : '')
          }), suffixOpts.content ? (0, _vue.h)('span', `${suffixOpts.content}`) : renderEmptyElement($xeTable)])]), hasChildMenus && item.children ? (0, _vue.h)('ul', {
            class: ['vxe-table--context-menu-clild-wrapper', {
              'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            const {
              loading: childLoading
            } = child;
            const childPrefixOpts = Object.assign({}, child.prefixConfig);
            const childPrefixIcon = childPrefixOpts.icon || child.prefixIcon;
            const childSuffixOpts = Object.assign({}, child.suffixConfig);
            const childSuffixIcon = childSuffixOpts.icon || child.suffixIcon;
            const childMenuContent = (0, _utils.getFuncText)(child.name);
            return child.visible === false ? null : (0, _vue.h)('li', {
              class: [child.className, {
                'link--loading': childLoading,
                'link--disabled': child.disabled,
                'link--active': child === ctxMenuStore.selectChild
              }],
              key: `${gIndex}_${index}_${cIndex}`
            }, [(0, _vue.h)('a', {
              class: 'vxe-context-menu--link',
              onClick(evnt) {
                $xeTable.ctxMenuLinkEvent(evnt, child);
              },
              onMouseover(evnt) {
                $xeTable.ctxMenuMouseoverEvent(evnt, item, child);
              },
              onMouseout(evnt) {
                $xeTable.ctxMenuMouseoutEvent(evnt, item);
              }
            }, [(0, _vue.h)('div', {
              class: ['vxe-context-menu--link-prefix', childPrefixOpts.className || '']
            }, [child.loading ? (0, _vue.h)('span', {
              class: getIcon('TABLE_MENU_OPTION_LOADING')
            }) : childPrefixIcon && _xeUtils.default.isFunction(childPrefixIcon) ? (0, _vue.h)('span', {}, (0, _vn.getSlotVNs)(childPrefixIcon({}))) : (0, _vue.h)('span', {}, [(0, _vue.h)('i', {
              class: childPrefixIcon
            })]), childPrefixOpts.content ? (0, _vue.h)('span', `${childPrefixOpts.content}`) : renderEmptyElement($xeTable)]), (0, _vue.h)('div', {
              class: 'vxe-context-menu--link-content',
              title: childMenuContent
            }, childLoading ? getI18n('vxe.table.menuLoading') : childMenuContent), (0, _vue.h)('div', {
              class: ['vxe-context-menu--link-suffix', childSuffixOpts.className || '']
            }, [childSuffixIcon && _xeUtils.default.isFunction(childSuffixIcon) ? (0, _vue.h)('span', {}, (0, _vn.getSlotVNs)(childSuffixIcon({}))) : (0, _vue.h)('i', {
              class: childSuffixIcon
            }), childSuffixOpts.content ? (0, _vue.h)('span', `${childSuffixOpts.content}`) : renderEmptyElement($xeTable)])])]);
          })) : null]);
        }));
      }) : [])]);
    };
    $xeMenuPanel.renderVN = renderVN;
    return $xeMenuPanel;
  },
  render() {
    return this.renderVN();
  }
});