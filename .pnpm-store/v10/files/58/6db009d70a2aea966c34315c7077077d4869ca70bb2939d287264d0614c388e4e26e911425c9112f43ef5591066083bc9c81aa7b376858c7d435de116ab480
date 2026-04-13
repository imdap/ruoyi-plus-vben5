"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _util = require("./util");
var _log = require("../../ui/src/log");
var _store = require("./store");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _vn = require("../../ui/src/vn");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _anime = require("../../ui/src/anime");
var _loading = _interopRequireDefault(require("../../loading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  menus,
  getConfig,
  getI18n,
  getIcon
} = _ui.VxeUI;
/**
 * 生成节点的唯一主键
 */
function getNodeUniqueId() {
  return _xeUtils.default.uniqueId('node_');
}
function createInternalData() {
  return {
    // initialized: false,
    // lastFilterValue: '',
    treeFullData: [],
    afterTreeList: [],
    afterVisibleList: [],
    nodeMaps: {},
    selectCheckboxMaps: {},
    indeterminateRowMaps: {},
    treeExpandedMaps: {},
    treeExpandLazyLoadedMaps: {},
    lastScrollLeft: 0,
    lastScrollTop: 0,
    scrollYStore: {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0,
      offsetSize: 0,
      rowHeight: 0
    },
    // prevDragNode: null,
    // prevDragToChild: false,
    // prevDragPos: ''
    lastScrollTime: 0
    // hpTimeout: undefined
  };
}
function createReactData() {
  return {
    parentHeight: 0,
    customHeight: 0,
    customMinHeight: 0,
    customMaxHeight: 0,
    currentNode: null,
    scrollYLoad: false,
    bodyHeight: 0,
    topSpaceHeight: 0,
    selectRadioKey: null,
    treeList: [],
    updateExpandedFlag: 1,
    updateCheckboxFlag: 1,
    dragNode: null,
    dragTipText: ''
  };
}
// let crossTreeDragNodeObj: {
//   $oldTree: VxeTreeConstructor & VxeTreePrivateMethods
//   $newTree: (VxeTreeConstructor & VxeTreePrivateMethods) | null
// } | null = null
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTree',
  props: {
    data: Array,
    autoResize: {
      type: Boolean,
      default: () => getConfig().tree.autoResize
    },
    height: [String, Number],
    maxHeight: {
      type: [String, Number],
      default: () => getConfig().tree.maxHeight
    },
    minHeight: {
      type: [String, Number],
      default: () => getConfig().tree.minHeight
    },
    loading: Boolean,
    loadingConfig: Object,
    accordion: {
      type: Boolean,
      default: () => getConfig().tree.accordion
    },
    childrenField: {
      type: String,
      default: () => getConfig().tree.childrenField
    },
    valueField: {
      type: String,
      default: () => getConfig().tree.valueField
    },
    keyField: {
      type: String,
      default: () => getConfig().tree.keyField
    },
    parentField: {
      type: String,
      default: () => getConfig().tree.parentField
    },
    titleField: {
      type: String,
      default: () => getConfig().tree.titleField
    },
    hasChildField: {
      type: String,
      default: () => getConfig().tree.hasChildField
    },
    mapChildrenField: {
      type: String,
      default: () => getConfig().tree.mapChildrenField
    },
    transform: Boolean,
    // 已废弃
    isCurrent: Boolean,
    // 已废弃
    isHover: Boolean,
    expandAll: Boolean,
    expandNodeKeys: Array,
    showLine: {
      type: Boolean,
      default: () => getConfig().tree.showLine
    },
    trigger: String,
    indent: {
      type: Number,
      default: () => getConfig().tree.indent
    },
    showRadio: {
      type: Boolean,
      default: () => getConfig().tree.showRadio
    },
    checkNodeKey: {
      type: [String, Number],
      default: () => getConfig().tree.checkNodeKey
    },
    radioConfig: Object,
    showCheckbox: {
      type: Boolean,
      default: () => getConfig().tree.showCheckbox
    },
    checkNodeKeys: {
      type: Array,
      default: () => getConfig().tree.checkNodeKeys
    },
    checkboxConfig: Object,
    nodeConfig: Object,
    lazy: Boolean,
    toggleMethod: Function,
    loadMethod: Function,
    drag: {
      type: Boolean,
      default: () => getConfig().tree.drag
    },
    dragConfig: Object,
    menuConfig: Object,
    showIcon: {
      type: Boolean,
      default: true
    },
    iconOpen: {
      type: String,
      default: () => getConfig().tree.iconOpen
    },
    iconClose: {
      type: String,
      default: () => getConfig().tree.iconClose
    },
    iconLoaded: {
      type: String,
      default: () => getConfig().tree.iconLoaded
    },
    filterValue: [String, Number],
    filterConfig: Object,
    size: {
      type: String,
      default: () => getConfig().tree.size || getConfig().size
    },
    virtualYConfig: Object
  },
  emits: ['update:modelValue', 'update:checkNodeKey', 'update:checkNodeKeys', 'node-click', 'node-dblclick', 'current-change', 'radio-change', 'checkbox-change', 'load-success', 'load-error', 'scroll', 'node-dragstart', 'node-dragover', 'node-dragend', 'node-expand', 'node-menu', 'menu-click'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refHeaderWrapperElem = (0, _vue.ref)();
    const refFooterWrapperElem = (0, _vue.ref)();
    const refVirtualWrapper = (0, _vue.ref)();
    const refVirtualBody = (0, _vue.ref)();
    const refDragNodeLineElem = (0, _vue.ref)();
    const refDragTipElem = (0, _vue.ref)();
    const crossTreeDragNodeInfo = (0, _store.getCrossTreeDragNodeInfo)();
    const internalData = createInternalData();
    const reactData = (0, _vue.reactive)(createReactData());
    const refMaps = {
      refElem
    };
    const computeTitleField = (0, _vue.computed)(() => {
      return props.titleField || 'title';
    });
    const computeKeyField = (0, _vue.computed)(() => {
      return props.keyField || 'id';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const keyField = computeKeyField.value;
      return props.valueField || keyField;
    });
    const computeParentField = (0, _vue.computed)(() => {
      return props.parentField || 'parentId';
    });
    const computeChildrenField = (0, _vue.computed)(() => {
      return props.childrenField || 'children';
    });
    const computeMapChildrenField = (0, _vue.computed)(() => {
      return props.mapChildrenField || 'mapChildren';
    });
    const computeHasChildField = (0, _vue.computed)(() => {
      return props.hasChildField || 'hasChild';
    });
    const computeVirtualYOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.virtualYConfig, props.virtualYConfig);
    });
    const computeIsRowCurrent = (0, _vue.computed)(() => {
      const nodeOpts = computeNodeOpts.value;
      const {
        isCurrent
      } = nodeOpts;
      if (_xeUtils.default.isBoolean(isCurrent)) {
        return isCurrent;
      }
      return props.isCurrent;
    });
    const computeIsRowHover = (0, _vue.computed)(() => {
      const nodeOpts = computeNodeOpts.value;
      const {
        isHover
      } = nodeOpts;
      if (_xeUtils.default.isBoolean(isHover)) {
        return isHover;
      }
      return props.isHover;
    });
    const computeRadioOpts = (0, _vue.computed)(() => {
      return Object.assign({
        showIcon: true
      }, getConfig().tree.radioConfig, props.radioConfig);
    });
    const computeCheckboxOpts = (0, _vue.computed)(() => {
      return Object.assign({
        showIcon: true
      }, getConfig().tree.checkboxConfig, props.checkboxConfig);
    });
    const computeNodeOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.nodeConfig, props.nodeConfig);
    });
    const computeLoadingOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.loadingConfig, props.loadingConfig);
    });
    const computeDragOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.dragConfig, props.dragConfig);
    });
    const computeMenuOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.menuConfig, props.menuConfig);
    });
    const computeTreeStyle = (0, _vue.computed)(() => {
      const {
        indent
      } = props;
      const {
        customHeight,
        customMinHeight,
        customMaxHeight
      } = reactData;
      const stys = {};
      if (customHeight) {
        stys.height = (0, _dom.toCssUnit)(customHeight);
      }
      if (customMinHeight) {
        stys.minHeight = (0, _dom.toCssUnit)(customMinHeight);
      }
      if (customMaxHeight) {
        stys.maxHeight = (0, _dom.toCssUnit)(customMaxHeight);
      }
      if (indent) {
        stys['--vxe-ui-tree-node-indent'] = (0, _dom.toCssUnit)(indent);
      }
      return stys;
    });
    const computeFilterOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().tree.filterConfig, props.filterConfig);
    });
    const computeMaps = {
      computeKeyField,
      computeParentField,
      computeChildrenField,
      computeMapChildrenField,
      computeRadioOpts,
      computeCheckboxOpts,
      computeNodeOpts,
      computeDragOpts
    };
    const $xeTree = {
      xID,
      props,
      context,
      internalData,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const getNodeId = node => {
      const valueField = computeValueField.value;
      const nodeKey = _xeUtils.default.get(node, valueField);
      return (0, _util.enNodeValue)(nodeKey);
    };
    const isExpandByNode = node => {
      const {
        updateExpandedFlag
      } = reactData;
      const {
        treeExpandedMaps
      } = internalData;
      const nodeid = getNodeId(node);
      return !!(updateExpandedFlag && treeExpandedMaps[nodeid]);
    };
    const isCheckedByRadioNodeId = nodeid => {
      const {
        selectRadioKey
      } = reactData;
      return selectRadioKey === nodeid;
    };
    const isCheckedByRadioNode = node => {
      return isCheckedByRadioNodeId(getNodeId(node));
    };
    const isCheckedByCheckboxNodeId = nodeid => {
      const {
        updateCheckboxFlag
      } = reactData;
      const {
        selectCheckboxMaps
      } = internalData;
      return !!(updateCheckboxFlag && selectCheckboxMaps[nodeid]);
    };
    const isCheckedByCheckboxNode = node => {
      return isCheckedByCheckboxNodeId(getNodeId(node));
    };
    const isIndeterminateByCheckboxNodeid = nodeid => {
      const {
        updateCheckboxFlag
      } = reactData;
      const {
        indeterminateRowMaps
      } = internalData;
      return !!(updateCheckboxFlag && indeterminateRowMaps[nodeid]);
    };
    const isIndeterminateByCheckboxNode = node => {
      return isIndeterminateByCheckboxNodeid(getNodeId(node));
    };
    const emitCheckboxMode = value => {
      emit('update:checkNodeKeys', value);
    };
    const emitRadioMode = value => {
      emit('update:checkNodeKey', value);
    };
    const handleSetCheckboxByNodeId = (nodeKeys, checked) => {
      const {
        nodeMaps
      } = internalData;
      if (nodeKeys) {
        if (!_xeUtils.default.isArray(nodeKeys)) {
          nodeKeys = [nodeKeys];
        }
        const nodeList = [];
        nodeKeys.forEach(nodeKey => {
          const nodeid = (0, _util.enNodeValue)(nodeKey);
          const nodeItem = nodeMaps[nodeid];
          if (nodeItem) {
            nodeList.push(nodeItem.item);
          }
        });
        handleCheckedCheckboxNode(nodeList, checked);
      }
      return (0, _vue.nextTick)();
    };
    const handleCheckedCheckboxNode = (nodeList, checked) => {
      const {
        transform
      } = props;
      const {
        selectCheckboxMaps
      } = internalData;
      const mapChildrenField = computeMapChildrenField.value;
      const childrenField = computeChildrenField.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const {
        checkStrictly
      } = checkboxOpts;
      const handleSelect = node => {
        const nodeid = getNodeId(node);
        if (checked) {
          if (!selectCheckboxMaps[nodeid]) {
            selectCheckboxMaps[nodeid] = node;
          }
        } else {
          if (selectCheckboxMaps[nodeid]) {
            delete selectCheckboxMaps[nodeid];
          }
        }
      };
      if (checkStrictly) {
        nodeList.forEach(handleSelect);
      } else {
        _xeUtils.default.eachTree(nodeList, handleSelect, {
          children: transform ? mapChildrenField : childrenField
        });
      }
      reactData.updateCheckboxFlag++;
      updateCheckboxStatus();
    };
    const updateCheckboxChecked = nodeKeys => {
      internalData.selectCheckboxMaps = {};
      handleSetCheckboxByNodeId(nodeKeys, true);
    };
    const handleSetExpand = (nodeid, expanded, expandedMaps) => {
      if (expanded) {
        if (!expandedMaps[nodeid]) {
          expandedMaps[nodeid] = true;
        }
      } else {
        if (expandedMaps[nodeid]) {
          delete expandedMaps[nodeid];
        }
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tree: $xeTree
      }, params));
    };
    const getParentElem = () => {
      const el = refElem.value;
      return el ? el.parentElement : null;
    };
    const calcTreeHeight = key => {
      const {
        parentHeight
      } = reactData;
      const val = props[key];
      let num = 0;
      if (val) {
        if (val === '100%' || val === 'auto') {
          num = parentHeight;
        } else {
          if ((0, _dom.isScale)(val)) {
            num = Math.floor((_xeUtils.default.toInteger(val) || 1) / 100 * parentHeight);
          } else {
            num = _xeUtils.default.toNumber(val);
          }
          num = Math.max(40, num);
        }
      }
      return num;
    };
    const updateHeight = () => {
      reactData.customHeight = calcTreeHeight('height');
      reactData.customMinHeight = calcTreeHeight('minHeight');
      reactData.customMaxHeight = calcTreeHeight('maxHeight');
      // 如果启用虚拟滚动，默认高度
      if (reactData.scrollYLoad && !(reactData.customHeight || reactData.customMinHeight)) {
        reactData.customHeight = 300;
      }
    };
    const createNode = records => {
      const valueField = computeValueField.value;
      return Promise.resolve(records.map(obj => {
        const item = Object.assign({}, obj);
        let nodeid = getNodeId(item);
        if (!nodeid) {
          nodeid = getNodeUniqueId();
          _xeUtils.default.set(item, valueField, nodeid);
        }
        return item;
      }));
    };
    const cacheNodeMap = () => {
      const {
        treeFullData
      } = internalData;
      const valueField = computeValueField.value;
      const childrenField = computeChildrenField.value;
      const keyMaps = {};
      _xeUtils.default.eachTree(treeFullData, (item, index, items, path, parent, nodes) => {
        let nodeid = getNodeId(item);
        if (!nodeid) {
          nodeid = getNodeUniqueId();
          _xeUtils.default.set(item, valueField, nodeid);
        }
        keyMaps[nodeid] = {
          item,
          index,
          $index: -1,
          _index: -1,
          items,
          parent,
          nodes,
          level: nodes.length - 1,
          treeIndex: index,
          lineCount: 0,
          treeLoaded: false
        };
      }, {
        children: childrenField
      });
      internalData.nodeMaps = keyMaps;
    };
    const updateAfterDataIndex = () => {
      const {
        transform
      } = props;
      const {
        afterTreeList,
        nodeMaps
      } = internalData;
      const childrenField = computeChildrenField.value;
      const mapChildrenField = computeMapChildrenField.value;
      let vtIndex = 0;
      _xeUtils.default.eachTree(afterTreeList, (item, index, items) => {
        const nodeid = getNodeId(item);
        const nodeItem = nodeMaps[nodeid];
        if (nodeItem) {
          nodeItem.items = items;
          nodeItem.treeIndex = index;
          nodeItem._index = vtIndex;
        } else {
          const rest = {
            item,
            index,
            $index: -1,
            _index: vtIndex,
            items,
            parent,
            nodes: [],
            level: 0,
            treeIndex: index,
            lineCount: 0,
            treeLoaded: false
          };
          nodeMaps[nodeid] = rest;
        }
        vtIndex++;
      }, {
        children: transform ? mapChildrenField : childrenField
      });
    };
    const updateAfterFullData = () => {
      const {
        transform,
        filterValue
      } = props;
      const {
        treeFullData,
        lastFilterValue
      } = internalData;
      const titleField = computeTitleField.value;
      const childrenField = computeChildrenField.value;
      const mapChildrenField = computeMapChildrenField.value;
      const filterOpts = computeFilterOpts.value;
      const {
        autoExpandAll,
        beforeFilterMethod,
        filterMethod,
        afterFilterMethod
      } = filterOpts;
      let fullList = treeFullData;
      let treeList = fullList;
      let filterStr = '';
      if (filterValue || filterValue === 0) {
        filterStr = `${filterValue}`;
        const handleSearch = filterMethod ? item => {
          return filterMethod({
            $tree: $xeTree,
            node: item,
            filterValue: filterStr
          });
        } : item => {
          return String(item[titleField]).toLowerCase().indexOf(filterStr.toLowerCase()) > -1;
        };
        const bafParams = {
          $tree: $xeTree,
          filterValue: filterStr
        };
        if (beforeFilterMethod) {
          beforeFilterMethod(bafParams);
        }
        if (transform) {
          treeList = _xeUtils.default.searchTree(treeFullData, handleSearch, {
            original: true,
            isEvery: true,
            children: childrenField,
            mapChildren: mapChildrenField
          });
          fullList = treeList;
        } else {
          fullList = treeFullData.filter(handleSearch);
        }
        internalData.lastFilterValue = filterStr;
        (0, _vue.nextTick)(() => {
          // 筛选时自动展开
          if (autoExpandAll) {
            $xeTree.setAllExpandNode(true).then(() => {
              if (afterFilterMethod) {
                afterFilterMethod(bafParams);
              }
            });
          } else {
            if (afterFilterMethod) {
              afterFilterMethod(bafParams);
            }
          }
        });
      } else {
        if (transform) {
          treeList = _xeUtils.default.searchTree(treeFullData, () => true, {
            original: true,
            isEvery: true,
            children: childrenField,
            mapChildren: mapChildrenField
          });
          fullList = treeList;
          if (lastFilterValue) {
            const bafParams = {
              $tree: $xeTree,
              filterValue: filterStr
            };
            if (beforeFilterMethod) {
              beforeFilterMethod(bafParams);
            }
            // 取消筛选时自动收起
            (0, _vue.nextTick)(() => {
              if (autoExpandAll) {
                $xeTree.clearAllExpandNode().then(() => {
                  if (afterFilterMethod) {
                    afterFilterMethod(bafParams);
                  }
                });
              } else {
                if (afterFilterMethod) {
                  afterFilterMethod(bafParams);
                }
              }
            });
          }
        }
        internalData.lastFilterValue = '';
      }
      internalData.afterVisibleList = fullList;
      internalData.afterTreeList = treeList;
      updateAfterDataIndex();
    };
    /**
     * 如果为虚拟树、则将树结构拍平
     */
    const handleTreeToList = () => {
      const {
        transform
      } = props;
      const {
        afterTreeList,
        treeExpandedMaps
      } = internalData;
      const mapChildrenField = computeMapChildrenField.value;
      const expandMaps = {};
      if (transform) {
        const fullData = [];
        _xeUtils.default.eachTree(afterTreeList, (item, index, items, path, parentRow) => {
          const nodeid = getNodeId(item);
          const parentNodeid = getNodeId(parentRow);
          if (!parentRow || expandMaps[parentNodeid] && treeExpandedMaps[parentNodeid]) {
            expandMaps[nodeid] = 1;
            fullData.push(item);
          }
        }, {
          children: mapChildrenField
        });
        updateScrollYStatus(fullData);
        internalData.afterVisibleList = fullData;
        return fullData;
      }
      return internalData.afterVisibleList;
    };
    const handleData = force => {
      const {
        scrollYLoad
      } = reactData;
      const {
        scrollYStore,
        nodeMaps
      } = internalData;
      let fullList = internalData.afterVisibleList;
      if (force) {
        // 更新数据，处理筛选和排序
        updateAfterFullData();
        // 如果为虚拟树，将树结构拍平
        fullList = handleTreeToList();
      }
      const treeList = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0);
      treeList.forEach((item, $index) => {
        const nodeid = getNodeId(item);
        const itemRest = nodeMaps[nodeid];
        if (itemRest) {
          itemRest.$index = $index;
        }
      });
      reactData.treeList = treeList;
    };
    const triggerSearchEvent = _xeUtils.default.debounce(() => handleData(true), 350, {
      trailing: true
    });
    const loadData = list => {
      const {
        expandAll,
        expandNodeKeys,
        transform
      } = props;
      const {
        initialized,
        scrollYStore
      } = internalData;
      const keyField = computeKeyField.value;
      const parentField = computeParentField.value;
      const childrenField = computeChildrenField.value;
      const fullData = transform ? _xeUtils.default.toArrayTree(list, {
        key: keyField,
        parentKey: parentField,
        mapChildren: childrenField
      }) : list ? list.slice(0) : [];
      internalData.treeFullData = fullData;
      Object.assign(scrollYStore, {
        startIndex: 0,
        endIndex: 1,
        visibleSize: 0
      });
      const sYLoad = updateScrollYStatus(fullData);
      cacheNodeMap();
      handleData(true);
      if (sYLoad) {
        if (!(props.height || props.maxHeight)) {
          (0, _log.errLog)('vxe.error.reqProp', ['[tree] height | max-height | virtual-y-config.enabled=false']);
        }
      }
      return computeScrollLoad().then(() => {
        if (!initialized) {
          if (list && list.length) {
            internalData.initialized = true;
            if (expandAll) {
              $xeTree.setAllExpandNode(true);
            } else if (expandNodeKeys && expandNodeKeys.length) {
              $xeTree.setExpandByNodeId(expandNodeKeys, true);
            }
            handleSetCheckboxByNodeId(props.checkNodeKeys || [], true);
          }
        }
        updateHeight();
        refreshScroll();
      });
    };
    const updateScrollYStatus = fullData => {
      const {
        transform
      } = props;
      const virtualYOpts = computeVirtualYOpts.value;
      const allList = fullData || internalData.treeFullData;
      // 如果gt为0，则总是启用
      const scrollYLoad = !!transform && !!virtualYOpts.enabled && virtualYOpts.gt > -1 && (virtualYOpts.gt === 0 || virtualYOpts.gt < allList.length);
      reactData.scrollYLoad = scrollYLoad;
      return scrollYLoad;
    };
    const updateYSpace = () => {
      const {
        scrollYLoad
      } = reactData;
      const {
        scrollYStore,
        afterVisibleList
      } = internalData;
      reactData.bodyHeight = scrollYLoad ? afterVisibleList.length * scrollYStore.rowHeight : 0;
      reactData.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    };
    const updateYData = () => {
      handleData();
      updateYSpace();
    };
    const computeScrollLoad = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          scrollYLoad
        } = reactData;
        const {
          scrollYStore
        } = internalData;
        const virtualBodyElem = refVirtualBody.value;
        const virtualYOpts = computeVirtualYOpts.value;
        let rowHeight = 0;
        let firstItemElem;
        if (virtualBodyElem) {
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0];
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }
        rowHeight = Math.max(20, rowHeight);
        scrollYStore.rowHeight = rowHeight;
        // 计算 Y 逻辑
        if (scrollYLoad) {
          const scrollBodyElem = refVirtualWrapper.value;
          const visibleYSize = Math.max(8, scrollBodyElem ? Math.ceil(scrollBodyElem.clientHeight / rowHeight) : 0);
          const offsetYSize = Math.max(0, Math.min(2, _xeUtils.default.toNumber(virtualYOpts.oSize)));
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex);
          updateYData();
        } else {
          updateYSpace();
        }
      });
    };
    /**
     * 如果有滚动条，则滚动到对应的位置
     */
    const handleScrollTo = (scrollLeft, scrollTop) => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (scrollLeft) {
        if (!_xeUtils.default.isNumber(scrollLeft)) {
          scrollTop = scrollLeft.top;
          scrollLeft = scrollLeft.left;
        }
      }
      if (scrollBodyElem) {
        if (_xeUtils.default.isNumber(scrollLeft)) {
          scrollBodyElem.scrollLeft = scrollLeft;
        }
        if (_xeUtils.default.isNumber(scrollTop)) {
          scrollBodyElem.scrollTop = scrollTop;
        }
      }
      if (reactData.scrollYLoad) {
        return new Promise(resolve => {
          setTimeout(() => {
            (0, _vue.nextTick)(() => {
              resolve();
            });
          }, 50);
        });
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 刷新滚动条
     */
    const refreshScroll = () => {
      const {
        lastScrollLeft,
        lastScrollTop
      } = internalData;
      return clearScroll().then(() => {
        if (lastScrollLeft || lastScrollTop) {
          internalData.lastScrollLeft = 0;
          internalData.lastScrollTop = 0;
          return scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    };
    /**
     * 重新计算列表
     */
    const recalculate = () => {
      const {
        scrollYStore
      } = internalData;
      const {
        rowHeight
      } = scrollYStore;
      const el = refElem.value;
      if (el && el.clientWidth && el.clientHeight) {
        const parentEl = getParentElem();
        const headerWrapperEl = refHeaderWrapperElem.value;
        const footerWrapperEl = refFooterWrapperElem.value;
        const headHeight = headerWrapperEl ? headerWrapperEl.clientHeight : 0;
        const footHeight = footerWrapperEl ? footerWrapperEl.clientHeight : 0;
        if (parentEl) {
          const parentPaddingSize = (0, _dom.getPaddingTopBottomSize)(parentEl);
          reactData.parentHeight = Math.max(headHeight + footHeight + rowHeight, parentEl.clientHeight - parentPaddingSize - headHeight - footHeight);
        }
        updateHeight();
        return computeScrollLoad().then(() => {
          updateHeight();
          updateYSpace();
        });
      }
      return (0, _vue.nextTick)();
    };
    const loadYData = () => {
      const {
        scrollYStore
      } = internalData;
      const {
        startIndex,
        endIndex,
        visibleSize,
        offsetSize,
        rowHeight
      } = scrollYStore;
      const scrollBodyElem = refVirtualWrapper.value;
      if (!scrollBodyElem) {
        return;
      }
      const scrollTop = scrollBodyElem.scrollTop;
      const toVisibleIndex = Math.floor(scrollTop / rowHeight);
      const offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      const offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          updateYData();
        }
      }
    };
    const scrollEvent = evnt => {
      const scrollBodyElem = evnt.target;
      const scrollTop = scrollBodyElem.scrollTop;
      const scrollLeft = scrollBodyElem.scrollLeft;
      const isX = scrollLeft !== internalData.lastScrollLeft;
      const isY = scrollTop !== internalData.lastScrollTop;
      internalData.lastScrollTop = scrollTop;
      internalData.lastScrollLeft = scrollLeft;
      if (reactData.scrollYLoad) {
        loadYData();
      }
      internalData.lastScrollTime = Date.now();
      dispatchEvent('scroll', {
        scrollLeft,
        scrollTop,
        isX,
        isY
      }, evnt);
    };
    const clearScroll = () => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
        scrollBodyElem.scrollLeft = 0;
      }
      internalData.lastScrollTop = 0;
      internalData.lastScrollLeft = 0;
      return (0, _vue.nextTick)();
    };
    const handleNodeMousedownEvent = (evnt, node) => {
      const {
        drag
      } = props;
      const {
        nodeMaps
      } = internalData;
      const targetEl = evnt.currentTarget;
      const dragConfig = computeDragOpts.value;
      const {
        trigger,
        isCrossDrag,
        isPeerDrag,
        disabledMethod
      } = dragConfig;
      const nodeid = getNodeId(node);
      const triggerTreeNode = (0, _dom.getEventTargetNode)(evnt, targetEl, 'vxe-tree--node-item-switcher').flag;
      let isNodeDrag = false;
      if (drag) {
        isNodeDrag = trigger === 'node';
      }
      if (!triggerTreeNode) {
        const params = {
          node,
          $tree: $xeTree
        };
        const itemRest = nodeMaps[nodeid];
        if (isNodeDrag && (isCrossDrag || isPeerDrag || itemRest && !itemRest.level) && !(disabledMethod && disabledMethod(params))) {
          handleNodeDragMousedownEvent(evnt, {
            node
          });
        }
      }
    };
    const handleNodeClickEvent = (evnt, node) => {
      const {
        showRadio,
        showCheckbox,
        trigger
      } = props;
      const radioOpts = computeRadioOpts.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const isRowCurrent = computeIsRowCurrent.value;
      let triggerCurrent = false;
      let triggerRadio = false;
      let triggerCheckbox = false;
      let triggerExpand = false;
      if (isRowCurrent) {
        triggerCurrent = true;
        changeCurrentEvent(evnt, node);
      } else if (reactData.currentNode) {
        reactData.currentNode = null;
      }
      if (trigger === 'node') {
        triggerExpand = true;
        toggleExpandEvent(evnt, node);
      }
      if (showRadio && radioOpts.trigger === 'node') {
        triggerRadio = true;
        changeRadioEvent(evnt, node);
      }
      if (showCheckbox && checkboxOpts.trigger === 'node') {
        triggerCheckbox = true;
        changeCheckboxEvent(evnt, node);
      }
      dispatchEvent('node-click', {
        node,
        triggerCurrent,
        triggerRadio,
        triggerCheckbox,
        triggerExpand
      }, evnt);
    };
    const handleNodeDblclickEvent = (evnt, node) => {
      dispatchEvent('node-dblclick', {
        node
      }, evnt);
    };
    const handleContextmenuEvent = (evnt, node) => {
      const {
        menuConfig
      } = props;
      const isRowCurrent = computeIsRowCurrent.value;
      const menuOpts = computeMenuOpts.value;
      if (menuConfig ? (0, _utils.isEnableConf)(menuOpts) : menuOpts.enabled) {
        const {
          options,
          visibleMethod
        } = menuOpts;
        if (!visibleMethod || visibleMethod({
          $tree: $xeTree,
          options,
          node
        })) {
          if (isRowCurrent) {
            changeCurrentEvent(evnt, node);
          } else if (reactData.currentNode) {
            reactData.currentNode = null;
          }
          if (_ui.VxeUI.contextMenu) {
            _ui.VxeUI.contextMenu.openByEvent(evnt, {
              options,
              events: {
                optionClick(eventParams) {
                  const {
                    option
                  } = eventParams;
                  const gMenuOpts = menus.get(option.code);
                  const tmMethod = gMenuOpts ? gMenuOpts.treeMenuMethod : null;
                  const params = {
                    menu: option,
                    node,
                    $event: evnt,
                    $tree: $xeTree,
                    /**
                     * @@deprecated
                     */
                    option
                  };
                  if (tmMethod) {
                    tmMethod(params, evnt);
                  }
                  dispatchEvent('menu-click', params, eventParams.$event);
                }
              }
            });
          }
        }
      }
      dispatchEvent('node-menu', {
        node
      }, evnt);
    };
    const handleAsyncTreeExpandChilds = node => {
      const checkboxOpts = computeCheckboxOpts.value;
      const {
        loadMethod
      } = props;
      const {
        checkStrictly
      } = checkboxOpts;
      return new Promise(resolve => {
        if (loadMethod) {
          const {
            nodeMaps
          } = internalData;
          const nodeid = getNodeId(node);
          const nodeItem = nodeMaps[nodeid];
          internalData.treeExpandLazyLoadedMaps[nodeid] = true;
          Promise.resolve(loadMethod({
            $tree: $xeTree,
            node
          })).then(childRecords => {
            const {
              treeExpandLazyLoadedMaps
            } = internalData;
            nodeItem.treeLoaded = true;
            if (treeExpandLazyLoadedMaps[nodeid]) {
              treeExpandLazyLoadedMaps[nodeid] = false;
            }
            if (!_xeUtils.default.isArray(childRecords)) {
              childRecords = [];
            }
            if (childRecords) {
              return $xeTree.loadChildrenNode(node, childRecords).then(childRows => {
                const {
                  treeExpandedMaps
                } = internalData;
                if (childRows.length && !treeExpandedMaps[nodeid]) {
                  treeExpandedMaps[nodeid] = true;
                }
                reactData.updateExpandedFlag++;
                // 如果当前节点已选中，则展开后子节点也被选中
                if (!checkStrictly && $xeTree.isCheckedByCheckboxNodeId(nodeid)) {
                  handleCheckedCheckboxNode(childRows, true);
                }
                dispatchEvent('load-success', {
                  node,
                  data: childRecords
                }, new Event('load-success'));
                return (0, _vue.nextTick)();
              });
            } else {
              dispatchEvent('load-success', {
                node,
                data: childRecords
              }, new Event('load-success'));
            }
          }).catch(e => {
            const {
              treeExpandLazyLoadedMaps
            } = internalData;
            nodeItem.treeLoaded = false;
            if (treeExpandLazyLoadedMaps[nodeid]) {
              treeExpandLazyLoadedMaps[nodeid] = false;
            }
            dispatchEvent('load-error', {
              node,
              data: e
            }, new Event('load-error'));
          }).finally(() => {
            handleTreeToList();
            handleData();
            return recalculate();
          });
        } else {
          resolve();
        }
      });
    };
    /**
     * 展开与收起树节点
     * @param nodeList
     * @param expanded
     * @returns
     */
    const handleBaseTreeExpand = (nodeList, expanded) => {
      const {
        lazy,
        accordion,
        toggleMethod
      } = props;
      const {
        treeExpandLazyLoadedMaps,
        treeExpandedMaps
      } = internalData;
      const {
        nodeMaps
      } = internalData;
      const childrenField = computeChildrenField.value;
      const hasChildField = computeHasChildField.value;
      const result = [];
      let validNodes = toggleMethod ? nodeList.filter(node => toggleMethod({
        $tree: $xeTree,
        expanded,
        node
      })) : nodeList;
      if (accordion) {
        validNodes = validNodes.length ? [validNodes[validNodes.length - 1]] : [];
        // 同一级只能展开一个
        const nodeid = getNodeId(validNodes[0]);
        const nodeItem = nodeMaps[nodeid];
        if (nodeItem) {
          nodeItem.items.forEach(item => {
            const itemNodeId = getNodeId(item);
            if (treeExpandedMaps[itemNodeId]) {
              delete treeExpandedMaps[itemNodeId];
            }
          });
        }
      }
      const expandNodes = [];
      if (expanded) {
        validNodes.forEach(item => {
          const itemNodeId = getNodeId(item);
          if (!treeExpandedMaps[itemNodeId]) {
            const nodeItem = nodeMaps[itemNodeId];
            const isLoad = lazy && item[hasChildField] && !nodeItem.treeLoaded && !treeExpandLazyLoadedMaps[itemNodeId];
            // 是否使用懒加载
            if (isLoad) {
              result.push(handleAsyncTreeExpandChilds(item));
            } else {
              if (item[childrenField] && item[childrenField].length) {
                treeExpandedMaps[itemNodeId] = true;
                expandNodes.push(item);
              }
            }
          }
        });
      } else {
        validNodes.forEach(item => {
          const itemNodeId = getNodeId(item);
          if (treeExpandedMaps[itemNodeId]) {
            delete treeExpandedMaps[itemNodeId];
            expandNodes.push(item);
          }
        });
      }
      reactData.updateExpandedFlag++;
      handleTreeToList();
      handleData();
      return Promise.all(result).then(() => recalculate());
    };
    const toggleExpandEvent = (evnt, node) => {
      const {
        lazy
      } = props;
      const {
        treeExpandedMaps,
        treeExpandLazyLoadedMaps
      } = internalData;
      const nodeid = getNodeId(node);
      const expanded = !treeExpandedMaps[nodeid];
      evnt.stopPropagation();
      if (!lazy || !treeExpandLazyLoadedMaps[nodeid]) {
        handleBaseTreeExpand([node], expanded);
      }
      dispatchEvent('node-expand', {
        node,
        expanded
      }, evnt);
    };
    const updateCheckboxStatus = () => {
      const {
        transform
      } = props;
      const {
        selectCheckboxMaps,
        indeterminateRowMaps,
        afterTreeList
      } = internalData;
      const childrenField = computeChildrenField.value;
      const mapChildrenField = computeMapChildrenField.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const {
        checkStrictly,
        checkMethod
      } = checkboxOpts;
      if (!checkStrictly) {
        const childRowMaps = {};
        const childRowList = [];
        _xeUtils.default.eachTree(afterTreeList, node => {
          const nodeid = getNodeId(node);
          const childList = node[childrenField];
          if (childList && childList.length && !childRowMaps[nodeid]) {
            childRowMaps[nodeid] = 1;
            childRowList.unshift([node, nodeid, childList]);
          }
        }, {
          children: transform ? mapChildrenField : childrenField
        });
        childRowList.forEach(vals => {
          const node = vals[0];
          const nodeid = vals[1];
          const childList = vals[2];
          let sLen = 0; // 已选
          let hLen = 0; // 半选
          let vLen = 0; // 有效子行
          const cLen = childList.length; // 子行
          childList.forEach(checkMethod ? item => {
            const childNodeid = getNodeId(item);
            const isSelect = selectCheckboxMaps[childNodeid];
            if (checkMethod({
              $tree: $xeTree,
              node: item
            })) {
              if (isSelect) {
                sLen++;
              } else if (indeterminateRowMaps[childNodeid]) {
                hLen++;
              }
              vLen++;
            } else {
              if (isSelect) {
                sLen++;
              } else if (indeterminateRowMaps[childNodeid]) {
                hLen++;
              }
            }
          } : item => {
            const childNodeid = getNodeId(item);
            const isSelect = selectCheckboxMaps[childNodeid];
            if (isSelect) {
              sLen++;
            } else if (indeterminateRowMaps[childNodeid]) {
              hLen++;
            }
            vLen++;
          });
          let isSelected = false;
          if (cLen > 0) {
            if (vLen > 0) {
              isSelected = (sLen > 0 || hLen > 0) && sLen >= vLen;
            } else {
              // 如果存在子项禁用
              if (sLen > 0 && sLen >= vLen) {
                isSelected = true;
              } else if (selectCheckboxMaps[nodeid]) {
                isSelected = true;
              } else {
                isSelected = false;
              }
            }
          } else {
            // 如果无子项
            isSelected = selectCheckboxMaps[nodeid];
          }
          const halfSelect = !isSelected && (sLen > 0 || hLen > 0);
          if (isSelected) {
            selectCheckboxMaps[nodeid] = node;
            if (indeterminateRowMaps[nodeid]) {
              delete indeterminateRowMaps[nodeid];
            }
          } else {
            if (selectCheckboxMaps[nodeid]) {
              delete selectCheckboxMaps[nodeid];
            }
            if (halfSelect) {
              indeterminateRowMaps[nodeid] = node;
            } else {
              if (indeterminateRowMaps[nodeid]) {
                delete indeterminateRowMaps[nodeid];
              }
            }
          }
        });
        reactData.updateCheckboxFlag++;
      }
    };
    const changeCheckboxEvent = (evnt, node) => {
      evnt.preventDefault();
      evnt.stopPropagation();
      const {
        transform
      } = props;
      const {
        selectCheckboxMaps
      } = internalData;
      const childrenField = computeChildrenField.value;
      const mapChildrenField = computeMapChildrenField.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const {
        checkStrictly,
        checkMethod
      } = checkboxOpts;
      let isDisabled = !!checkMethod;
      if (checkMethod) {
        isDisabled = !checkMethod({
          $tree: $xeTree,
          node
        });
      }
      if (isDisabled) {
        return;
      }
      const nodeid = getNodeId(node);
      let isChecked = false;
      if (selectCheckboxMaps[nodeid]) {
        delete selectCheckboxMaps[nodeid];
      } else {
        isChecked = true;
        selectCheckboxMaps[nodeid] = node;
      }
      if (!checkStrictly) {
        _xeUtils.default.eachTree(_xeUtils.default.get(node, transform ? mapChildrenField : childrenField), childNode => {
          const childNodeid = getNodeId(childNode);
          if (isChecked) {
            if (!selectCheckboxMaps[childNodeid]) {
              selectCheckboxMaps[childNodeid] = true;
            }
          } else {
            if (selectCheckboxMaps[childNodeid]) {
              delete selectCheckboxMaps[childNodeid];
            }
          }
        }, {
          children: transform ? mapChildrenField : childrenField
        });
      }
      reactData.updateCheckboxFlag++;
      updateCheckboxStatus();
      const nodeids = _xeUtils.default.keys(selectCheckboxMaps);
      const value = nodeids.map(_util.deNodeValue);
      emitCheckboxMode(value);
      dispatchEvent('checkbox-change', {
        node,
        value,
        checked: isChecked
      }, evnt);
    };
    const changeCurrentEvent = (evnt, node) => {
      evnt.preventDefault();
      const nodeOpts = computeNodeOpts.value;
      const {
        currentMethod,
        trigger
      } = nodeOpts;
      const childrenField = computeChildrenField.value;
      const childList = _xeUtils.default.get(node, childrenField);
      const hasChild = childList && childList.length;
      let isDisabled = !!currentMethod;
      if (trigger === 'child') {
        if (hasChild) {
          return;
        }
      } else if (trigger === 'parent') {
        if (!hasChild) {
          return;
        }
      }
      if (currentMethod) {
        isDisabled = !currentMethod({
          node
        });
      }
      if (isDisabled) {
        return;
      }
      const isChecked = true;
      reactData.currentNode = node;
      dispatchEvent('current-change', {
        node,
        checked: isChecked
      }, evnt);
    };
    const changeRadioEvent = (evnt, node) => {
      evnt.preventDefault();
      evnt.stopPropagation();
      const radioOpts = computeRadioOpts.value;
      const {
        checkMethod
      } = radioOpts;
      let isDisabled = !!checkMethod;
      if (checkMethod) {
        isDisabled = !checkMethod({
          $tree: $xeTree,
          node
        });
      }
      if (isDisabled) {
        return;
      }
      const isChecked = true;
      const nodeid = getNodeId(node);
      const value = (0, _util.deNodeValue)(nodeid);
      reactData.selectRadioKey = nodeid;
      emitRadioMode(value);
      dispatchEvent('radio-change', {
        node,
        value,
        checked: isChecked
      }, evnt);
    };
    const handleGlobalResizeEvent = () => {
      const el = refElem.value;
      if (!el || !el.clientWidth) {
        return;
      }
      recalculate();
    };
    const treeMethods = {
      dispatchEvent,
      getNodeId,
      getNodeById(nodeid) {
        const {
          nodeMaps
        } = internalData;
        if (nodeid) {
          const nodeItem = nodeMaps[nodeid];
          if (nodeItem) {
            return nodeItem.item;
          }
        }
        return null;
      },
      loadData(data) {
        return loadData(data || []);
      },
      reloadData(data) {
        return loadData(data || []);
      },
      clearCurrentNode() {
        reactData.currentNode = null;
        return (0, _vue.nextTick)();
      },
      getCurrentNodeId() {
        const {
          currentNode
        } = reactData;
        if (currentNode) {
          return (0, _util.deNodeValue)(getNodeId(currentNode));
        }
        return null;
      },
      getCurrentNode() {
        const {
          currentNode
        } = reactData;
        const {
          nodeMaps
        } = internalData;
        if (currentNode) {
          const nodeItem = nodeMaps[getNodeId(currentNode)];
          if (nodeItem) {
            return nodeItem.item;
          }
        }
        return null;
      },
      setCurrentNodeId(nodeKey) {
        const {
          nodeMaps
        } = internalData;
        const nodeItem = nodeMaps[(0, _util.enNodeValue)(nodeKey)];
        reactData.currentNode = nodeItem ? nodeItem.item : null;
        return (0, _vue.nextTick)();
      },
      setCurrentNode(node) {
        reactData.currentNode = node;
        return (0, _vue.nextTick)();
      },
      clearRadioNode() {
        reactData.selectRadioKey = null;
        emitRadioMode(null);
        return (0, _vue.nextTick)();
      },
      getRadioNodeId() {
        return reactData.selectRadioKey || null;
      },
      getRadioNode() {
        const {
          selectRadioKey
        } = reactData;
        const {
          nodeMaps
        } = internalData;
        if (selectRadioKey) {
          const nodeItem = nodeMaps[selectRadioKey];
          if (nodeItem) {
            return nodeItem.item;
          }
        }
        return null;
      },
      setRadioNodeId(nodeKey) {
        reactData.selectRadioKey = (0, _util.enNodeValue)(nodeKey);
        emitRadioMode(nodeKey);
        return (0, _vue.nextTick)();
      },
      setRadioNode(node) {
        if (node) {
          const nodeid = getNodeId(node);
          reactData.selectRadioKey = nodeid;
          emitRadioMode((0, _util.deNodeValue)(nodeid));
        } else {
          emitRadioMode(null);
        }
        return (0, _vue.nextTick)();
      },
      setCheckboxNode(nodeList, checked) {
        if (nodeList) {
          if (!_xeUtils.default.isArray(nodeList)) {
            nodeList = [nodeList];
          }
          handleCheckedCheckboxNode(nodeList, checked);
        }
        emitCheckboxMode($xeTree.getCheckboxNodeIds());
        return (0, _vue.nextTick)();
      },
      setCheckboxByNodeId(nodeKeys, selected) {
        handleSetCheckboxByNodeId(nodeKeys, selected);
        emitCheckboxMode($xeTree.getCheckboxNodeIds());
        return (0, _vue.nextTick)();
      },
      getCheckboxNodeIds() {
        const {
          selectCheckboxMaps
        } = internalData;
        const nodeKeys = [];
        _xeUtils.default.each(selectCheckboxMaps, (item, nodeId) => {
          nodeKeys.push((0, _util.deNodeValue)(nodeId));
        });
        return nodeKeys;
      },
      getCheckboxNodes() {
        const {
          nodeMaps,
          selectCheckboxMaps
        } = internalData;
        const list = [];
        _xeUtils.default.each(selectCheckboxMaps, (item, nodeid) => {
          const nodeItem = nodeMaps[nodeid];
          if (nodeItem) {
            list.push(nodeItem.item);
          }
        });
        return list;
      },
      clearCheckboxNode() {
        internalData.indeterminateRowMaps = {};
        internalData.selectCheckboxMaps = {};
        reactData.updateCheckboxFlag++;
        emitCheckboxMode([]);
        updateCheckboxStatus();
        return (0, _vue.nextTick)().then(() => {
          return {
            checkNodeKeys: [],
            checkNodes: []
          };
        });
      },
      setAllCheckboxNode(checked) {
        const {
          transform
        } = props;
        const selectMaps = {};
        const childrenField = computeChildrenField.value;
        const mapChildrenField = computeMapChildrenField.value;
        const checkKeys = [];
        const checkNodes = [];
        if (checked) {
          _xeUtils.default.eachTree(internalData.afterTreeList, node => {
            const nodeid = getNodeId(node);
            checkKeys.push(nodeid);
            checkNodes.push(node);
            selectMaps[nodeid] = true;
          }, {
            children: transform ? mapChildrenField : childrenField
          });
        }
        internalData.indeterminateRowMaps = {};
        internalData.selectCheckboxMaps = selectMaps;
        reactData.updateCheckboxFlag++;
        updateCheckboxStatus();
        return (0, _vue.nextTick)().then(() => {
          return {
            checkNodeKeys: checkKeys,
            checkNodes
          };
        });
      },
      clearExpandNode() {
        return treeMethods.clearAllExpandNode();
      },
      clearAllExpandNode() {
        const {
          scrollYLoad
        } = reactData;
        const {
          nodeMaps,
          scrollYStore
        } = internalData;
        _xeUtils.default.each(nodeMaps, nodeItem => {
          nodeItem.treeLoaded = false;
        });
        internalData.treeExpandedMaps = {};
        reactData.updateExpandedFlag++;
        reactData.topSpaceHeight = 0;
        scrollYStore.startIndex = 0;
        scrollYStore.endIndex = 1;
        handleTreeToList();
        handleData();
        return recalculate().then(() => {
          if (scrollYLoad) {
            loadYData();
          }
          return recalculate();
        });
      },
      setExpandByNodeId(nodeKeys, expanded) {
        const {
          treeExpandedMaps
        } = internalData;
        if (nodeKeys) {
          if (!_xeUtils.default.isArray(nodeKeys)) {
            nodeKeys = [nodeKeys];
          }
          nodeKeys.forEach(nodeKey => {
            const nodeid = (0, _util.enNodeValue)(nodeKey);
            handleSetExpand(nodeid, expanded, treeExpandedMaps);
          });
          reactData.updateExpandedFlag++;
        }
        handleTreeToList();
        handleData();
        return recalculate();
      },
      getExpandNodeIds() {
        const {
          treeExpandedMaps
        } = internalData;
        const nodeKeys = [];
        _xeUtils.default.each(treeExpandedMaps, (item, nodeId) => {
          nodeKeys.push((0, _util.deNodeValue)(nodeId));
        });
        return nodeKeys;
      },
      getExpandNodes() {
        const {
          nodeMaps,
          treeExpandedMaps
        } = internalData;
        const list = [];
        _xeUtils.default.each(treeExpandedMaps, (item, nodeid) => {
          const nodeItem = nodeMaps[nodeid];
          if (nodeItem) {
            list.push(nodeItem.item);
          }
        });
        return list;
      },
      setExpandNode(nodes, expanded) {
        const {
          treeExpandedMaps
        } = internalData;
        if (nodes) {
          if (!_xeUtils.default.isArray(nodes)) {
            nodes = [nodes];
          }
          nodes.forEach(node => {
            const nodeid = getNodeId(node);
            handleSetExpand(nodeid, expanded, treeExpandedMaps);
          });
          reactData.updateExpandedFlag++;
        }
        handleTreeToList();
        handleData();
        return recalculate();
      },
      toggleExpandByNodeId(nodeKeys) {
        const {
          treeExpandedMaps
        } = internalData;
        if (nodeKeys) {
          if (!_xeUtils.default.isArray(nodeKeys)) {
            nodeKeys = [nodeKeys];
          }
          nodeKeys.forEach(nodeKey => {
            const nodeid = (0, _util.enNodeValue)(nodeKey);
            handleSetExpand(nodeid, !treeExpandedMaps[`${nodeid}`], treeExpandedMaps);
          });
          reactData.updateExpandedFlag++;
        }
        handleTreeToList();
        handleData();
        return recalculate();
      },
      toggleExpandNode(nodes) {
        const {
          treeExpandedMaps
        } = internalData;
        if (nodes) {
          if (!_xeUtils.default.isArray(nodes)) {
            nodes = [nodes];
          }
          nodes.forEach(node => {
            const nodeid = getNodeId(node);
            handleSetExpand(nodeid, !treeExpandedMaps[nodeid], treeExpandedMaps);
          });
          reactData.updateExpandedFlag++;
        }
        handleTreeToList();
        handleData();
        return recalculate();
      },
      setAllExpandNode(expanded) {
        const {
          transform
        } = props;
        const {
          scrollYLoad
        } = reactData;
        const {
          scrollYStore,
          treeExpandedMaps
        } = internalData;
        const childrenField = computeChildrenField.value;
        const mapChildrenField = computeMapChildrenField.value;
        if (expanded) {
          _xeUtils.default.eachTree(internalData.afterTreeList, node => {
            const childList = _xeUtils.default.get(node, childrenField);
            const hasChild = childList && childList.length;
            if (hasChild) {
              const nodeid = getNodeId(node);
              treeExpandedMaps[nodeid] = true;
            }
          }, {
            children: transform ? mapChildrenField : childrenField
          });
        } else {
          internalData.treeExpandedMaps = {};
        }
        reactData.updateExpandedFlag++;
        reactData.topSpaceHeight = 0;
        scrollYStore.startIndex = 0;
        scrollYStore.endIndex = 1;
        handleTreeToList();
        handleData();
        return recalculate().then(() => {
          if (scrollYLoad) {
            loadYData();
          }
          return recalculate();
        });
      },
      reloadExpandNode(node) {
        const {
          lazy
        } = props;
        if (lazy) {
          treeMethods.clearExpandLoaded(node);
          return handleAsyncTreeExpandChilds(node);
        }
        return recalculate();
      },
      clearExpandLoaded(node) {
        const {
          lazy
        } = props;
        const {
          nodeMaps
        } = internalData;
        if (lazy) {
          const nodeItem = nodeMaps[getNodeId(node)];
          if (nodeItem) {
            nodeItem.treeLoaded = false;
          }
        }
        return recalculate();
      },
      /**
       * 用于树结构，给行数据加载子节点
       */
      loadChildrenNode(node, childRecords) {
        const {
          lazy,
          transform
        } = props;
        const {
          nodeMaps
        } = internalData;
        if (!lazy) {
          return Promise.resolve([]);
        }
        const childrenField = computeChildrenField.value;
        const mapChildrenField = computeMapChildrenField.value;
        const parentNodeItem = nodeMaps[getNodeId(node)];
        const parentLevel = parentNodeItem ? parentNodeItem.level : 0;
        const parentNodes = parentNodeItem ? parentNodeItem.nodes : [];
        return createNode(childRecords).then(nodeList => {
          _xeUtils.default.eachTree(nodeList, (childRow, index, items, path, parent, nodes) => {
            const itemNodeId = getNodeId(childRow);
            nodeMaps[itemNodeId] = {
              item: childRow,
              index: -1,
              $index: -1,
              _index: -1,
              items,
              parent: parent || parentNodeItem.item,
              nodes: parentNodes.concat(nodes),
              level: parentLevel + nodes.length,
              treeIndex: -1,
              lineCount: 0,
              treeLoaded: false
            };
          }, {
            children: childrenField
          });
          node[childrenField] = nodeList;
          if (transform) {
            node[mapChildrenField] = nodeList;
          }
          updateAfterDataIndex();
          return nodeList;
        });
      },
      isExpandByNode,
      isCheckedByRadioNodeId,
      isCheckedByRadioNode,
      isCheckedByCheckboxNodeId,
      isIndeterminateByCheckboxNode,
      isCheckedByCheckboxNode,
      getCheckboxIndeterminateNodes() {
        const {
          nodeMaps,
          indeterminateRowMaps
        } = internalData;
        const list = [];
        _xeUtils.default.each(indeterminateRowMaps, (item, nodeid) => {
          const nodeItem = nodeMaps[nodeid];
          if (nodeItem) {
            list.push(nodeItem.item);
          }
        });
        return list;
      },
      recalculate,
      getFullData() {
        const {
          treeFullData
        } = internalData;
        return treeFullData.slice(0);
      },
      scrollTo: handleScrollTo,
      scrollToNode(node) {
        return $xeTree.scrollToNodeId(getNodeId(node));
      },
      scrollToNodeId(nodeid) {
        const {
          transform
        } = props;
        const {
          scrollYStore,
          afterTreeList
        } = internalData;
        const childrenField = computeChildrenField.value;
        const mapChildrenField = computeMapChildrenField.value;
        const scrollBodyElem = refVirtualWrapper.value;
        if (nodeid && scrollBodyElem) {
          if (transform) {
            const matchObj = _xeUtils.default.findTree(afterTreeList, item => getNodeId(item) === nodeid, {
              children: transform ? mapChildrenField : childrenField
            });
            if (matchObj) {
              return $xeTree.setExpandNode(matchObj.nodes, true).then(() => {
                const itemIndex = _xeUtils.default.findIndexOf(internalData.afterVisibleList, item => getNodeId(item) === nodeid);
                if (itemIndex > -1) {
                  const targetTop = Math.max(0, (itemIndex - 1) * scrollYStore.rowHeight);
                  return handleScrollTo(scrollBodyElem.scrollLeft, targetTop);
                }
              });
            }
          } else {
            const itemEl = scrollBodyElem.querySelector(`.vxe-tree--node-wrapper[nodeid="${nodeid}"]`);
            if (itemEl) {
              return handleScrollTo(scrollBodyElem.scrollLeft, itemEl.offsetTop);
            }
          }
        }
        return recalculate();
      },
      clearScroll
    };
    const clearNodeDropOrigin = () => {
      const el = refElem.value;
      if (el) {
        const clss = 'node--drag-origin';
        _xeUtils.default.arrayEach(el.querySelectorAll(`.${clss}`), elem => {
          elem.draggable = false;
          (0, _dom.removeClass)(elem, clss);
        });
      }
    };
    const updateNodeDropOrigin = node => {
      const el = refElem.value;
      if (el) {
        const clss = 'node--drag-origin';
        const nodeid = getNodeId(node);
        _xeUtils.default.arrayEach(el.querySelectorAll(`.vxe-tree--node-wrapper[nodeid="${nodeid}"]`), elem => {
          (0, _dom.addClass)(elem, clss);
        });
      }
    };
    const updateRowDropTipContent = itemEl => {
      const {
        dragNode
      } = reactData;
      const dragOpts = computeDragOpts.value;
      const {
        tooltipMethod
      } = dragOpts;
      const rTooltipMethod = tooltipMethod;
      let tipContent = '';
      if (rTooltipMethod) {
        const rtParams = {
          $tree: $xeTree,
          node: dragNode
        };
        tipContent = `${rTooltipMethod(rtParams) || ''}`;
      } else {
        tipContent = getI18n('vxe.tree.dragTip', [itemEl.textContent || '']);
      }
      reactData.dragTipText = tipContent;
    };
    const hideDropTip = () => {
      const rdTipEl = refDragTipElem.value;
      const rdLineEl = refDragNodeLineElem.value;
      if (rdTipEl) {
        rdTipEl.style.display = '';
      }
      if (rdLineEl) {
        rdLineEl.style.display = '';
      }
    };
    const clearCrossTreeDragStatus = () => {
      // crossTreeDragNodeObj = null
      crossTreeDragNodeInfo.node = null;
    };
    const clearDragStatus = () => {
      const {
        dragNode
      } = reactData;
      if (dragNode) {
        hideDropTip();
        clearNodeDropOrigin();
        clearCrossTreeDragStatus();
        reactData.dragNode = null;
      }
    };
    const handleNodeDragMousedownEvent = (evnt, params) => {
      evnt.stopPropagation();
      const {
        node
      } = params;
      const dragConfig = computeDragOpts.value;
      const {
        trigger,
        dragStartMethod
      } = dragConfig;
      const dragEl = evnt.currentTarget;
      const itemEl = trigger === 'node' ? dragEl : dragEl.parentElement.parentElement;
      clearNodeDropOrigin();
      if (dragStartMethod && !dragStartMethod(params)) {
        itemEl.draggable = false;
        reactData.dragNode = null;
        hideDropTip();
        return;
      }
      reactData.dragNode = node;
      itemEl.draggable = true;
      updateNodeDropOrigin(node);
      updateRowDropTipContent(itemEl);
      dispatchEvent('node-dragstart', params, evnt);
    };
    const handleNodeDragMouseupEvent = () => {
      clearDragStatus();
    };
    const showDropTip = (evnt, itemEl, showLine, dragPos) => {
      const wrapperEl = refElem.value;
      if (!wrapperEl) {
        return;
      }
      const {
        prevDragToChild
      } = internalData;
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const wrapperHeight = wrapperEl.clientHeight;
      if (itemEl) {
        const rdLineEl = refDragNodeLineElem.value;
        if (rdLineEl) {
          if (showLine) {
            const trRect = itemEl.getBoundingClientRect();
            let itemHeight = itemEl.clientHeight;
            const offsetTop = Math.max(1, trRect.y - wrapperRect.y);
            if (offsetTop + itemHeight > wrapperHeight) {
              itemHeight = wrapperHeight - offsetTop;
            }
            rdLineEl.style.display = 'block';
            rdLineEl.style.top = `${offsetTop}px`;
            rdLineEl.style.height = `${itemHeight}px`;
            rdLineEl.setAttribute('drag-pos', dragPos);
            rdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n');
          } else {
            rdLineEl.style.display = '';
          }
        }
      }
      const rdTipEl = refDragTipElem.value;
      if (rdTipEl) {
        rdTipEl.style.display = 'block';
        rdTipEl.style.top = `${Math.min(wrapperEl.clientHeight - wrapperEl.scrollTop - rdTipEl.clientHeight, evnt.clientY - wrapperRect.y)}px`;
        rdTipEl.style.left = `${Math.min(wrapperEl.clientWidth - wrapperEl.scrollLeft - rdTipEl.clientWidth - 1, evnt.clientX - wrapperRect.x)}px`;
        rdTipEl.setAttribute('drag-status', showLine ? prevDragToChild ? 'sub' : 'normal' : 'disabled');
      }
    };
    const clearNodeDragData = () => {
      const wrapperEl = refElem.value;
      const dtClss = ['.vxe-tree--node-wrapper'];
      hideDropTip();
      clearNodeDropOrigin();
      (0, _anime.clearRowAnimate)(wrapperEl, dtClss);
      internalData.prevDragToChild = false;
      reactData.dragNode = null;
    };
    const handleNodeDragSwapEvent = (evnt, dragNode, prevDragNode, prevDragPos, prevDragToChild) => {
      const {
        transform
      } = props;
      const {
        nodeMaps,
        treeFullData,
        afterVisibleList
      } = internalData;
      const dragConfig = computeDragOpts.value;
      const {
        animation,
        isCrossDrag,
        isPeerDrag,
        isSelfToChildDrag,
        dragEndMethod,
        dragToChildMethod
      } = dragConfig;
      const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null);
      const keyField = computeKeyField.value;
      const parentField = computeParentField.value;
      const childrenField = computeChildrenField.value;
      const mapChildrenField = computeMapChildrenField.value;
      const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0;
      const el = refElem.value;
      const errRest = {
        status: false
      };
      if (!(el && prevDragNode && dragNode)) {
        return Promise.resolve(errRest);
      }
      // 判断是否有拖动
      if (prevDragNode !== dragNode) {
        const dragParams = {
          oldNode: dragNode,
          newNode: prevDragNode,
          dragNode,
          dragPos: prevDragPos,
          dragToChild: !!prevDragToChild,
          offsetIndex: dragOffsetIndex
        };
        const dragNodeid = getNodeId(dragNode);
        const dragNodeRest = nodeMaps[dragNodeid] || {};
        const _dragNodeIndex = dragNodeRest._index;
        let dragNodeHeight = 0;
        let dragOffsetTop = -1;
        if (animation) {
          const prevItemEl = el.querySelector(`.vxe-tree--node-wrapper[nodeid="${prevDragNode}"]`);
          const oldItemEl = el.querySelector(`.vxe-tree--node-wrapper[nodeid="${dragNodeid}"]`);
          const targetItemEl = prevItemEl || oldItemEl;
          if (targetItemEl) {
            dragNodeHeight = targetItemEl.offsetHeight;
          }
          if (oldItemEl) {
            dragOffsetTop = oldItemEl.offsetTop;
          }
        }
        let oafIndex = -1;
        let nafIndex = -1;
        const oldAllMaps = {};
        let isSelfToChildStatus = false;
        const oldRest = dragNodeRest;
        const newNodeid = getNodeId(prevDragNode);
        const newRest = nodeMaps[newNodeid];
        if (transform) {
          if (oldRest && newRest) {
            const {
              level: oldLevel
            } = oldRest;
            const {
              level: newLevel
            } = newRest;
            _xeUtils.default.eachTree([dragNode], item => {
              oldAllMaps[getNodeId(item)] = item;
            }, {
              children: mapChildrenField
            });
            if (oldLevel && newLevel) {
              // 子到子
              if (isPeerDrag && !isCrossDrag) {
                if (oldRest.item[parentField] !== newRest.item[parentField]) {
                  // 非同级
                  clearNodeDragData();
                  clearCrossTreeDragStatus();
                  return errRest;
                }
              } else {
                if (!isCrossDrag) {
                  clearNodeDragData();
                  clearCrossTreeDragStatus();
                  return errRest;
                }
                if (oldAllMaps[newNodeid]) {
                  isSelfToChildStatus = true;
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (_ui.VxeUI.modal) {
                      _ui.VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      });
                    }
                    clearNodeDragData();
                    clearCrossTreeDragStatus();
                    return errRest;
                  }
                }
              }
            } else if (oldLevel) {
              // 子到根
              if (!isCrossDrag) {
                clearNodeDragData();
                clearCrossTreeDragStatus();
                return errRest;
              }
            } else if (newLevel) {
              // 根到子
              if (!isCrossDrag) {
                clearNodeDragData();
                clearCrossTreeDragStatus();
                return errRest;
              }
              if (oldAllMaps[newNodeid]) {
                isSelfToChildStatus = true;
                if (!(isCrossDrag && isSelfToChildDrag)) {
                  if (_ui.VxeUI.modal) {
                    _ui.VxeUI.modal.message({
                      status: 'error',
                      content: getI18n('vxe.error.treeDragChild')
                    });
                  }
                  clearNodeDragData();
                  clearCrossTreeDragStatus();
                  return errRest;
                }
              }
            } else {
              // 根到根
            }
          }
        }
        const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild;
        return Promise.resolve(dEndMethod ? dEndMethod(dragParams) : true).then(status => {
          if (!status) {
            return errRest;
          }
          if (transform) {
            // 移出源位置
            if (oldRest && newRest) {
              const fullList = _xeUtils.default.toTreeArray(internalData.afterTreeList, {
                updated: false,
                key: keyField,
                parentKey: parentField,
                children: mapChildrenField
              });
              // 移出
              const otfIndex = $xeTree.findNodeIndexOf(fullList, dragNode);
              fullList.splice(otfIndex, 1);
              // 插入
              const ptfIndex = $xeTree.findNodeIndexOf(fullList, prevDragNode);
              const ntfIndex = ptfIndex + dragOffsetIndex;
              fullList.splice(ntfIndex, 0, dragNode);
              // 改变层级
              if (isSelfToChildStatus && isCrossDrag && isSelfToChildDrag) {
                _xeUtils.default.each(dragNode[childrenField], childNode => {
                  childNode[parentField] = dragNode[parentField];
                });
              }
              dragNode[parentField] = isDragToChildFlag ? prevDragNode[keyField] : prevDragNode[parentField];
              internalData.treeFullData = _xeUtils.default.toArrayTree(fullList, {
                key: keyField,
                parentKey: parentField,
                children: childrenField,
                mapChildren: mapChildrenField
              });
            }
          } else {
            // 移出
            oafIndex = $xeTree.findNodeIndexOf(afterVisibleList, dragNode);
            const otfIndex = $xeTree.findNodeIndexOf(treeFullData, dragNode);
            afterVisibleList.splice(oafIndex, 1);
            treeFullData.splice(otfIndex, 1);
            // 插入
            const pafIndex = $xeTree.findNodeIndexOf(afterVisibleList, prevDragNode);
            const ptfIndex = $xeTree.findNodeIndexOf(treeFullData, prevDragNode);
            nafIndex = pafIndex + dragOffsetIndex;
            const ntfIndex = ptfIndex + dragOffsetIndex;
            afterVisibleList.splice(nafIndex, 0, dragNode);
            treeFullData.splice(ntfIndex, 0, dragNode);
          }
          cacheNodeMap();
          handleData(transform);
          if (!transform) {
            updateAfterDataIndex();
          }
          updateCheckboxStatus();
          if (reactData.scrollYLoad) {
            updateYSpace();
          }
          if (evnt) {
            dispatchEvent('node-dragend', {
              oldNode: dragNode,
              newNode: prevDragNode,
              dragNode,
              dragPos: prevDragPos,
              dragToChild: isDragToChildFlag,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            }, evnt);
          }
          return (0, _vue.nextTick)().then(() => {
            if (animation) {
              const {
                treeList
              } = reactData;
              const {
                nodeMaps
              } = internalData;
              const dragNodeRest = nodeMaps[dragNodeid];
              const _newNodeIndex = dragNodeRest._index;
              const firstNode = treeList[0];
              const firstNodeRest = nodeMaps[getNodeId(firstNode)];
              const wrapperEl = el;
              if (firstNodeRest) {
                const _firstNodeIndex = firstNodeRest._index;
                const _lastNodeIndex = _firstNodeIndex + treeList.length;
                let rsIndex = -1;
                let reIndex = -1;
                let offsetRate = 1;
                if (_dragNodeIndex < _firstNodeIndex) {
                  // 从上往下虚拟拖拽
                  rsIndex = 0;
                  reIndex = _newNodeIndex - _firstNodeIndex;
                } else if (_dragNodeIndex > _lastNodeIndex) {
                  // 从下往上虚拟拖拽
                  const $newNodeIndex = dragNodeRest.$index;
                  rsIndex = $newNodeIndex + 1;
                  reIndex = treeList.length;
                  offsetRate = -1;
                } else {
                  if (_newNodeIndex > _dragNodeIndex) {
                    // 从上往下拖拽
                    rsIndex = _dragNodeIndex - _firstNodeIndex;
                    reIndex = rsIndex + _newNodeIndex - _dragNodeIndex;
                  } else {
                    // 从下往上拖拽
                    rsIndex = _newNodeIndex - _firstNodeIndex;
                    reIndex = rsIndex + _dragNodeIndex - _newNodeIndex + 1;
                    offsetRate = -1;
                  }
                }
                const dragRangeList = treeList.slice(rsIndex, reIndex);
                if (dragRangeList.length) {
                  const dtClss = [];
                  dragRangeList.forEach(item => {
                    const nodeid = getNodeId(item);
                    dtClss.push(`.vxe-tree--node-wrapper[nodeid="${nodeid}"]`);
                  });
                  const dtTrList = wrapperEl.querySelectorAll(dtClss.join(','));
                  (0, _anime.moveRowAnimateToTb)(dtTrList, offsetRate * dragNodeHeight);
                }
              }
              const drClss = [`.vxe-tree--node-wrapper[nodeid="${dragNodeid}"]`];
              const newDtTrList = wrapperEl.querySelectorAll(drClss.join(','));
              const newTrEl = newDtTrList[0];
              if (dragOffsetTop > -1 && newTrEl) {
                (0, _anime.moveRowAnimateToTb)(newDtTrList, dragOffsetTop - newTrEl.offsetTop);
              }
            }
            recalculate();
          }).then(() => {
            return {
              status: true
            };
          });
        }).catch(() => {
          return errRest;
        }).then(rest => {
          clearNodeDragData();
          clearCrossTreeDragStatus();
          return rest;
        });
      }
      clearNodeDragData();
      clearCrossTreeDragStatus();
      return Promise.resolve(errRest);
    };
    const handleNodeDragDragstartEvent = evnt => {
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage((0, _dom.getTpImg)(), 0, 0);
      }
    };
    const handleNodeDragDragendEvent = evnt => {
      const {
        lazy
      } = props;
      const {
        dragNode
      } = reactData;
      const {
        nodeMaps,
        prevDragNode,
        prevDragPos,
        prevDragToChild
      } = internalData;
      const hasChildField = computeHasChildField.value;
      if (lazy && prevDragToChild) {
        // 懒加载
        const newNodeid = getNodeId(prevDragNode);
        const nodeRest = nodeMaps[newNodeid];
        if (prevDragNode[hasChildField]) {
          if (nodeRest && nodeRest.treeLoaded) {
            handleNodeDragSwapEvent(evnt, dragNode, prevDragNode, prevDragPos, prevDragToChild);
          }
        } else {
          handleNodeDragSwapEvent(evnt, dragNode, prevDragNode, prevDragPos, prevDragToChild);
        }
      } else {
        handleNodeDragSwapEvent(evnt, dragNode, prevDragNode, prevDragPos, prevDragToChild);
      }
    };
    const handleNodeDragDragoverEvent = evnt => {
      const {
        lazy,
        transform
      } = props;
      const {
        dragNode
      } = reactData;
      const {
        nodeMaps
      } = internalData;
      const dragConfig = computeDragOpts.value;
      const parentField = computeParentField.value;
      const hasChildField = computeHasChildField.value;
      const {
        isCrossDrag,
        isPeerDrag,
        isToChildDrag
      } = dragConfig;
      if (!dragNode && !isCrossDrag) {
        evnt.preventDefault();
      }
      const isControlKey = (0, _dom.hasControlKey)(evnt);
      const itemEl = evnt.currentTarget;
      const nodeid = itemEl.getAttribute('nodeid') || '';
      const nodeItem = nodeMaps[nodeid];
      if (nodeItem) {
        evnt.preventDefault();
        const node = nodeItem.item;
        const offsetY = evnt.clientY - itemEl.getBoundingClientRect().y;
        const dragPos = offsetY < itemEl.clientHeight / 2 ? 'top' : 'bottom';
        internalData.prevDragToChild = !!(transform && isCrossDrag && isToChildDrag && isControlKey);
        internalData.prevDragNode = node;
        internalData.prevDragPos = dragPos;
        if (dragNode && getNodeId(dragNode) === nodeid || isControlKey && lazy && node[hasChildField] && nodeItem && !nodeItem.treeLoaded || !isCrossDrag && transform && (isPeerDrag ? dragNode[parentField] !== node[parentField] : nodeItem.level)) {
          showDropTip(evnt, itemEl, false, dragPos);
          return;
        }
        showDropTip(evnt, itemEl, true, dragPos);
        dispatchEvent('node-dragover', {
          oldRNode: dragNode,
          targetNode: node,
          dragPos
        }, evnt);
      }
    };
    const treePrivateMethods = {
      handleData,
      cacheNodeMap,
      updateAfterDataIndex,
      updateCheckboxStatus,
      updateYSpace,
      findNodeIndexOf(list, node) {
        return node ? _xeUtils.default.findIndexOf(list, item => $xeTree.eqNode(item, node)) : -1;
      },
      eqNode(node1, node2) {
        if (node1 && node2) {
          if (node1 === node2) {
            return true;
          }
          return getNodeId(node1) === getNodeId(node2);
        }
        return false;
      },
      handleCrossTreeNodeDragCancelEvent() {
        clearNodeDragData();
        clearCrossTreeDragStatus();
      },
      /**
       * 处理跨树拖拽完成
       */
      handleCrossTreeNodeDragFinishEvent() {},
      /**
       * 处理跨树拖至新的空树
       */
      handleCrossTreeNodeDragInsertEvent() {},
      /**
       * 处理跨树拖插入
       */
      handleCrossTreeNodeDragoverEmptyEvent() {},
      hideCrossTreeNodeDropClearStatus() {
        hideDropTip();
      }
    };
    Object.assign($xeTree, treeMethods, treePrivateMethods);
    const renderDragIcon = (node, nodeid) => {
      const {
        drag,
        transform
      } = props;
      const {
        nodeMaps
      } = internalData;
      const dragOpts = computeDragOpts.value;
      const {
        showIcon,
        isPeerDrag,
        isCrossDrag,
        visibleMethod
      } = dragOpts;
      const params = {
        node,
        $tree: $xeTree
      };
      if (drag && showIcon && transform && (!visibleMethod || visibleMethod(params))) {
        const nodeItem = nodeMaps[nodeid];
        if (nodeItem && (isPeerDrag || isCrossDrag || !nodeItem.level)) {
          const dragConfig = computeDragOpts.value;
          const {
            icon,
            trigger,
            disabledMethod
          } = dragConfig;
          const isDisabled = disabledMethod && disabledMethod(params);
          const ons = {};
          if (trigger !== 'node') {
            ons.onMousedown = evnt => {
              if (!isDisabled) {
                handleNodeDragMousedownEvent(evnt, params);
              }
            };
            ons.onMouseup = handleNodeDragMouseupEvent;
          }
          return (0, _vue.h)('div', Object.assign({
            class: ['vxe-tree--drag-handle', {
              'is--disabled': isDisabled
            }]
          }, ons), [(0, _vue.h)('i', {
            class: icon || getIcon().TREE_DRAG
          })]);
        }
      }
      return (0, _ui.renderEmptyElement)($xeTree);
    };
    const renderRadio = (node, nodeid, isChecked) => {
      const {
        showRadio
      } = props;
      const radioOpts = computeRadioOpts.value;
      const {
        showIcon,
        checkMethod,
        visibleMethod
      } = radioOpts;
      const isVisible = !visibleMethod || visibleMethod({
        $tree: $xeTree,
        node
      });
      let isDisabled = !!checkMethod;
      if (showRadio && showIcon && isVisible) {
        if (checkMethod) {
          isDisabled = !checkMethod({
            $tree: $xeTree,
            node
          });
        }
        return (0, _vue.h)('div', {
          class: ['vxe-tree--radio-option', {
            'is--checked': isChecked,
            'is--disabled': isDisabled
          }],
          onClick: evnt => {
            if (!isDisabled) {
              changeRadioEvent(evnt, node);
            }
          }
        }, [(0, _vue.h)('span', {
          class: ['vxe-radio--icon', isChecked ? getIcon().RADIO_CHECKED : getIcon().RADIO_UNCHECKED]
        })]);
      }
      return (0, _ui.renderEmptyElement)($xeTree);
    };
    const renderCheckbox = (node, nodeid, isChecked) => {
      const {
        showCheckbox
      } = props;
      const checkboxOpts = computeCheckboxOpts.value;
      const {
        showIcon,
        checkMethod,
        visibleMethod
      } = checkboxOpts;
      const isIndeterminate = isIndeterminateByCheckboxNodeid(nodeid);
      const isVisible = !visibleMethod || visibleMethod({
        $tree: $xeTree,
        node
      });
      let isDisabled = !!checkMethod;
      if (showCheckbox && showIcon && isVisible) {
        if (checkMethod) {
          isDisabled = !checkMethod({
            $tree: $xeTree,
            node
          });
        }
        return (0, _vue.h)('div', {
          class: ['vxe-tree--checkbox-option', {
            'is--checked': isChecked,
            'is--indeterminate': isIndeterminate,
            'is--disabled': isDisabled
          }],
          onClick: evnt => {
            if (!isDisabled) {
              changeCheckboxEvent(evnt, node);
            }
          }
        }, [(0, _vue.h)('span', {
          class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().CHECKBOX_INDETERMINATE : isChecked ? getIcon().CHECKBOX_CHECKED : getIcon().CHECKBOX_UNCHECKED]
        })]);
      }
      return (0, _ui.renderEmptyElement)($xeTree);
    };
    const renderNode = (node, nodeid) => {
      const {
        lazy,
        drag,
        transform,
        showRadio,
        showCheckbox,
        showLine,
        iconOpen,
        iconClose,
        iconLoaded,
        showIcon
      } = props;
      const {
        currentNode,
        selectRadioKey,
        updateExpandedFlag
      } = reactData;
      const {
        afterTreeList,
        nodeMaps,
        treeExpandedMaps,
        treeExpandLazyLoadedMaps
      } = internalData;
      const childrenField = computeChildrenField.value;
      const titleField = computeTitleField.value;
      const hasChildField = computeHasChildField.value;
      const childList = _xeUtils.default.get(node, childrenField);
      const hasChild = childList && childList.length;
      const iconSlot = slots.icon;
      const titleSlot = slots.title;
      const extraSlot = slots.extra;
      const isExpand = updateExpandedFlag && treeExpandedMaps[nodeid];
      const nodeItem = nodeMaps[nodeid];
      const nodeValue = _xeUtils.default.get(node, titleField);
      const nLevel = nodeItem.level;
      let isRadioChecked = false;
      if (showRadio) {
        isRadioChecked = nodeid === String(selectRadioKey);
      }
      let isCheckboxChecked = false;
      if (showCheckbox) {
        isCheckboxChecked = isCheckedByCheckboxNodeId(nodeid);
      }
      let hasLazyChilds = false;
      let isLazyLoading = false;
      let isLazyLoaded = false;
      if (lazy) {
        isLazyLoading = !!treeExpandLazyLoadedMaps[nodeid];
        hasLazyChilds = node[hasChildField];
        isLazyLoaded = !!nodeItem.treeLoaded;
      }
      const prevNode = nodeItem.items[nodeItem.treeIndex - 1];
      const nParams = {
        node,
        isExpand
      };
      const itemOn = {
        onMousedown(evnt) {
          handleNodeMousedownEvent(evnt, node);
        },
        onMouseup: handleNodeDragMouseupEvent,
        onClick(evnt) {
          handleNodeClickEvent(evnt, node);
        },
        onDblclick(evnt) {
          handleNodeDblclickEvent(evnt, node);
        },
        onContextmenu(evnt) {
          handleContextmenuEvent(evnt, node);
        }
      };
      // 拖拽行事件
      if (drag && transform) {
        itemOn.onDragstart = handleNodeDragDragstartEvent;
        itemOn.onDragend = handleNodeDragDragendEvent;
        itemOn.onDragover = handleNodeDragDragoverEvent;
      }
      return (0, _vue.h)('div', Object.assign({
        key: nodeid,
        class: ['vxe-tree--node-wrapper', `node--level-${nLevel}`],
        nodeid
      }, itemOn), [(0, _vue.h)('div', {
        class: ['vxe-tree--node-item', {
          'is--current': currentNode && nodeid === getNodeId(currentNode),
          'is-radio--checked': isRadioChecked,
          'is-checkbox--checked': isCheckboxChecked
        }]
      }, [showLine ? (0, _vue.h)('div', {
        class: 'vxe-tree--node-line-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-tree--node-line',
        style: {
          height: `${getNodeId(afterTreeList[0]) === nodeid ? 1 : (0, _util.calcTreeLine)($xeTree, node, prevNode)}px`
        }
      })]) : (0, _ui.renderEmptyElement)($xeTree), (0, _vue.h)('div', {
        class: 'vxe-tree--node-item-switcher'
      }, showIcon && (lazy ? isLazyLoaded ? hasChild : hasLazyChilds : hasChild) ? [(0, _vue.h)('div', {
        class: 'vxe-tree--node-item-icon',
        onClick(evnt) {
          toggleExpandEvent(evnt, node);
        }
      }, iconSlot ? (0, _vn.getSlotVNs)(iconSlot(nParams)) : [(0, _vue.h)('i', {
        class: isLazyLoading ? iconLoaded || getIcon().TREE_NODE_LOADED : isExpand ? iconOpen || getIcon().TREE_NODE_OPEN : iconClose || getIcon().TREE_NODE_CLOSE
      })])] : []), renderDragIcon(node, nodeid), renderRadio(node, nodeid, isRadioChecked), renderCheckbox(node, nodeid, isCheckboxChecked), (0, _vue.h)('div', {
        class: 'vxe-tree--node-item-inner'
      }, [(0, _vue.h)('div', {
        class: 'vxe-tree--node-item-title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot(nParams)) : `${nodeValue}`), extraSlot ? (0, _vue.h)('div', {
        class: 'vxe-tree--node-item-extra'
      }, (0, _vn.getSlotVNs)(extraSlot(nParams))) : (0, _ui.renderEmptyElement)($xeTree)])])]);
    };
    const renderList = treeList => {
      const {
        transform
      } = props;
      const {
        treeExpandedMaps
      } = internalData;
      const childrenField = computeChildrenField.value;
      if (!treeList.length) {
        return [(0, _vue.h)('div', {
          class: 'vxe-tree--empty-placeholder'
        }, getI18n('vxe.tree.searchEmpty'))];
      }
      const nodeVNs = [];
      treeList.forEach(transform ? node => {
        const nodeid = getNodeId(node);
        nodeVNs.push(renderNode(node, nodeid));
      } : node => {
        const nodeid = getNodeId(node);
        nodeVNs.push(renderNode(node, nodeid));
        const childList = _xeUtils.default.get(node, childrenField);
        const hasChild = childList && childList.length;
        if (hasChild && treeExpandedMaps[nodeid]) {
          nodeVNs.push(...renderList(childList));
        }
      });
      return nodeVNs;
    };
    const renderDragTip = () => {
      const {
        drag
      } = props;
      const {
        dragNode,
        dragTipText
      } = reactData;
      const dragOpts = computeDragOpts.value;
      const dNode = dragNode;
      if (drag) {
        return (0, _vue.h)('div', {
          class: 'vxe-tree--drag-wrapper'
        }, [(0, _vue.h)('div', {
          ref: refDragNodeLineElem,
          class: ['vxe-tree--drag-node-line', {
            'is--guides': dragOpts.showGuidesStatus
          }]
        }), dNode && dragOpts.showDragTip ? (0, _vue.h)('div', {
          ref: refDragTipElem,
          class: 'vxe-tree--drag-sort-tip'
        }, [(0, _vue.h)('div', {
          class: 'vxe-tree--drag-sort-tip-wrapper'
        }, [(0, _vue.h)('div', {
          class: 'vxe-tree--drag-sort-tip-status'
        }, [(0, _vue.h)('span', {
          class: ['vxe-tree--drag-sort-tip-normal-status', getIcon().TREE_DRAG_STATUS_NODE]
        }), (0, _vue.h)('span', {
          class: ['vxe-tree--drag-sort-tip-sub-status', getIcon().TREE_DRAG_STATUS_SUB_NODE]
        }), (0, _vue.h)('span', {
          class: ['vxe-tree--drag-sort-tip-disabled-status', getIcon().TREE_DRAG_DISABLED]
        })]), (0, _vue.h)('div', {
          class: 'vxe-tree--drag-sort-tip-content'
        }, dragTipText)])]) : (0, _ui.renderEmptyElement)($xeTree)]);
      }
      return (0, _ui.renderEmptyElement)($xeTree);
    };
    const renderVN = () => {
      const {
        loading,
        trigger,
        showLine
      } = props;
      const {
        bodyHeight,
        topSpaceHeight,
        treeList
      } = reactData;
      const vSize = computeSize.value;
      const radioOpts = computeRadioOpts.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const loadingOpts = computeLoadingOpts.value;
      const isRowHover = computeIsRowHover.value;
      const treeStyle = computeTreeStyle.value;
      const loadingSlot = slots.loading;
      const headerSlot = slots.header;
      const footerSlot = slots.footer;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-tree', {
          [`size--${vSize}`]: vSize,
          'show--line': showLine,
          'checkbox--highlight': checkboxOpts.highlight,
          'radio--highlight': radioOpts.highlight,
          'node--hover': isRowHover,
          'node--trigger': trigger === 'node',
          'is--loading': loading
        }]
      }, [headerSlot ? (0, _vue.h)('div', {
        ref: refHeaderWrapperElem,
        class: 'vxe-tree--header-wrapper'
      }, headerSlot({
        $tree: $xeTree
      })) : (0, _ui.renderEmptyElement)($xeTree), (0, _vue.h)('div', {
        ref: refVirtualWrapper,
        class: 'vxe-tree--node-list-wrapper',
        style: treeStyle,
        onScroll: scrollEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-tree--y-space',
        style: {
          height: bodyHeight ? `${bodyHeight}px` : ''
        }
      }), (0, _vue.h)('div', {
        ref: refVirtualBody,
        class: 'vxe-tree--node-list-body',
        style: {
          transform: `translateY(${topSpaceHeight}px)`
        }
      }, renderList(treeList))]), footerSlot ? (0, _vue.h)('div', {
        ref: refFooterWrapperElem,
        class: 'vxe-tree--footer-wrapper'
      }, footerSlot({
        $tree: $xeTree
      })) : (0, _ui.renderEmptyElement)($xeTree),
      /**
       * 拖拽提示
       */
      renderDragTip(),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-tree--loading',
        modelValue: loading,
        icon: loadingOpts.icon,
        text: loadingOpts.text
      }, loadingSlot ? {
        default: () => loadingSlot({
          $tree: $xeTree
        })
      } : {})]);
    };
    const dataFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.data ? props.data.length : 0, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(() => props.data, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(dataFlag, () => {
      loadData(props.data || []);
    });
    (0, _vue.watch)(() => props.checkNodeKey, nodeKey => {
      reactData.selectRadioKey = (0, _util.enNodeValue)(nodeKey);
    });
    const checkboxFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.checkNodeKeys ? props.checkNodeKeys.length : 0, () => {
      checkboxFlag.value++;
    });
    (0, _vue.watch)(() => props.checkNodeKeys, () => {
      checkboxFlag.value++;
    });
    (0, _vue.watch)(checkboxFlag, () => {
      updateCheckboxChecked(props.checkNodeKeys || []);
    });
    (0, _vue.watch)(() => props.filterValue, () => {
      triggerSearchEvent(new Event('filter'));
    });
    const hFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.height, () => {
      hFlag.value++;
    });
    (0, _vue.watch)(() => props.minHeight, () => {
      hFlag.value++;
    });
    (0, _vue.watch)(() => props.maxHeight, () => {
      hFlag.value++;
    });
    (0, _vue.watch)(hFlag, () => {
      recalculate();
    });
    (0, _vue.onMounted)(() => {
      const {
        transform,
        drag,
        menuConfig
      } = props;
      const dragOpts = computeDragOpts.value;
      if (drag && !transform) {
        (0, _log.errLog)('vxe.error.notSupportProp', ['drag', 'transform=false', 'transform=true']);
      }
      if (dragOpts.isCrossTreeDrag) {
        (0, _log.errLog)('vxe.error.notProp', ['drag-config.isCrossTreeDrag']);
      }
      const VxeUIContextMenu = _ui.VxeUI.getComponent('VxeContextMenu');
      if (menuConfig && !VxeUIContextMenu) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-context-menu']);
      }
      if (props.autoResize) {
        const el = refElem.value;
        const parentEl = getParentElem();
        const resizeObserver = _ui.globalResize.create(() => {
          if (props.autoResize) {
            recalculate();
          }
        });
        if (el) {
          resizeObserver.observe(el);
        }
        if (parentEl) {
          resizeObserver.observe(parentEl);
        }
        internalData.resizeObserver = resizeObserver;
      }
      _ui.globalEvents.on($xeTree, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      const {
        resizeObserver
      } = internalData;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      _ui.globalEvents.off($xeTree, 'resize');
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    reactData.selectRadioKey = (0, _util.enNodeValue)(props.checkNodeKey);
    loadData(props.data || []);
    $xeTree.renderVN = renderVN;
    (0, _vue.provide)('$xeTree', $xeTree);
    return $xeTree;
  },
  render() {
    return this.renderVN();
  }
});