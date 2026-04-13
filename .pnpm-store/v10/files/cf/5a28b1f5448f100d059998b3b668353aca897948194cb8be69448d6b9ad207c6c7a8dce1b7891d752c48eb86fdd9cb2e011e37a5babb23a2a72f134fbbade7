import { h, ref, nextTick, onBeforeUnmount, onMounted, computed, reactive, watch } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize } from '../../ui';
import { getLastZIndex, nextZIndex } from '../../ui/src/utils';
import { toCssUnit } from '../../ui/src/dom';
import { getSlotVNs } from '../../ui/src/vn';
export default defineVxeComponent({
    name: 'VxeTooltip',
    props: {
        modelValue: Boolean,
        size: {
            type: String,
            default: () => getConfig().tooltip.size || getConfig().size
        },
        selector: String,
        trigger: {
            type: String,
            default: () => getConfig().tooltip.trigger || 'hover'
        },
        theme: {
            type: String,
            default: () => getConfig().tooltip.theme || 'dark'
        },
        content: {
            type: [String, Number],
            default: null
        },
        useHTML: Boolean,
        zIndex: [String, Number],
        popupClassName: [String, Function],
        width: {
            type: [String, Number],
            default: () => getConfig().tooltip.Width
        },
        height: {
            type: [String, Number],
            default: () => getConfig().tooltip.height
        },
        minWidth: {
            type: [String, Number],
            default: () => getConfig().tooltip.minWidth
        },
        minHeight: {
            type: [String, Number],
            default: () => getConfig().tooltip.minHeight
        },
        maxWidth: {
            type: [String, Number],
            default: () => getConfig().tooltip.maxWidth
        },
        maxHeight: {
            type: [String, Number],
            default: () => getConfig().tooltip.maxHeight
        },
        placement: {
            type: String,
            default: () => getConfig().tooltip.placement
        },
        defaultPlacement: {
            type: String,
            default: () => getConfig().tooltip.defaultPlacement
        },
        isArrow: {
            type: Boolean,
            default: () => getConfig().tooltip.isArrow
        },
        enterable: {
            type: Boolean,
            default: () => getConfig().tooltip.enterable
        },
        enterDelay: {
            type: Number,
            default: () => getConfig().tooltip.enterDelay
        },
        leaveDelay: {
            type: Number,
            default: () => getConfig().tooltip.leaveDelay
        }
    },
    emits: [
        'update:modelValue'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            target: null,
            isUpdate: false,
            visible: false,
            tipPos: null,
            tipContent: '',
            tipActive: false,
            tipTarget: null,
            tipZindex: 0,
            tipStore: {
                style: {},
                placement: '',
                arrowStyle: {}
            }
        });
        const internalData = {};
        const refElem = ref();
        const contentWrapperfElem = ref();
        const computeWrapperStyle = computed(() => {
            const { width, height, minHeight, minWidth, maxHeight, maxWidth } = props;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
            }
            if (minWidth) {
                stys.minWidth = toCssUnit(minWidth);
            }
            if (minHeight) {
                stys.minHeight = toCssUnit(minHeight);
            }
            if (maxWidth) {
                stys.maxWidth = toCssUnit(maxWidth);
            }
            if (maxHeight) {
                stys.maxHeight = toCssUnit(maxHeight);
            }
            return stys;
        });
        const refMaps = {
            refElem
        };
        const $xeTooltip = {
            xID,
            props,
            context,
            reactData,
            internalData,
            getRefMaps: () => refMaps
        };
        let tooltipMethods = {};
        const updateTipStyle = () => {
            const { isArrow, placement, defaultPlacement } = props;
            const { tipTarget: targetElem, tipStore, tipPos } = reactData;
            let top = '';
            let left = '';
            let panelPlacement = 'bottom';
            let arrowLeft = '';
            const panelElem = refElem.value;
            if (panelElem && targetElem) {
                const documentElement = document.documentElement;
                const bodyElem = document.body;
                const targetWidth = targetElem.offsetWidth;
                const targetHeight = targetElem.offsetHeight;
                const panelHeight = panelElem.offsetHeight;
                const panelWidth = panelElem.offsetWidth;
                const targetRect = targetElem.getBoundingClientRect();
                const visibleHeight = documentElement.clientHeight || bodyElem.clientHeight;
                const visibleWidth = documentElement.clientWidth || bodyElem.clientWidth;
                const marginSize = 6;
                left = targetRect.left;
                top = targetRect.top + targetHeight;
                if (tipPos && (tipPos.oLeft || tipPos.oTop)) {
                    if (isArrow) {
                        left = left + Math.max(8, Math.min(targetWidth - 8, tipPos.oLeft)) - panelWidth / 2;
                    }
                    else {
                        left = tipPos.x + 1;
                        top = tipPos.y + 1;
                    }
                }
                else {
                    left = targetRect.left + (targetWidth - panelWidth) / 2;
                }
                if (placement === 'top') {
                    panelPlacement = 'top';
                    top = targetRect.top - panelHeight;
                }
                else if (!placement) {
                    if (defaultPlacement === 'top') {
                        panelPlacement = 'top';
                        top = targetRect.top - panelHeight;
                        // 如果上面不够放，则向下
                        if (top < marginSize) {
                            panelPlacement = 'bottom';
                            top = targetRect.top + targetHeight;
                        }
                        // 如果下面不够放，则向上（优先）
                        if (top + panelHeight + marginSize > visibleHeight) {
                            panelPlacement = 'top';
                            top = targetRect.top - panelHeight;
                        }
                    }
                    else {
                        // 如果下面不够放，则向上
                        if (top + panelHeight + marginSize > visibleHeight) {
                            panelPlacement = 'top';
                            top = targetRect.top - panelHeight;
                        }
                        // 如果上面不够放，则向下（优先）
                        if (top < marginSize) {
                            panelPlacement = 'bottom';
                            top = targetRect.top + targetHeight;
                        }
                    }
                }
                // 如果溢出右边
                if (left + panelWidth + marginSize > visibleWidth) {
                    left -= left + panelWidth + marginSize - visibleWidth;
                }
                // 如果溢出左边
                if (left < marginSize) {
                    left = marginSize;
                }
                // 箭头
                if (left === targetRect.left) {
                    if (targetWidth <= panelWidth) {
                        arrowLeft = targetWidth / 2;
                    }
                }
                else if (left < targetRect.left) {
                    if (left + panelWidth > targetRect.left + targetWidth) {
                        arrowLeft = (targetRect.left - left) + targetWidth / 2;
                    }
                    else {
                        arrowLeft = (targetRect.left - left) + (panelWidth - (targetRect.left - left)) / 2;
                    }
                }
                tipStore.placement = panelPlacement;
                tipStore.style.top = `${top}px`;
                tipStore.style.left = `${left}px`;
                tipStore.arrowStyle.left = `${arrowLeft}px`;
            }
        };
        const updateValue = (value) => {
            if (value !== reactData.visible) {
                reactData.visible = value;
                reactData.isUpdate = true;
                emit('update:modelValue', value);
            }
        };
        const updateZindex = () => {
            if (reactData.tipZindex < getLastZIndex()) {
                reactData.tipZindex = nextZIndex();
            }
        };
        const clickEvent = () => {
            if (reactData.visible) {
                tooltipMethods.close();
            }
            else {
                handleVisible(reactData.target || getSelectorEl(), props.content);
            }
        };
        const targetMouseenterEvent = () => {
            handleVisible(reactData.target || getSelectorEl(), props.content);
        };
        const targetMouseleaveEvent = () => {
            const { trigger, enterable, leaveDelay } = props;
            reactData.tipActive = false;
            if (enterable && trigger === 'hover') {
                setTimeout(() => {
                    if (!reactData.tipActive) {
                        tooltipMethods.close();
                    }
                }, leaveDelay);
            }
            else {
                tooltipMethods.close();
            }
        };
        const wrapperMouseenterEvent = () => {
            reactData.tipActive = true;
        };
        const wrapperMouseleaveEvent = () => {
            const { trigger, enterable, leaveDelay } = props;
            reactData.tipActive = false;
            if (enterable && trigger === 'hover') {
                setTimeout(() => {
                    if (!reactData.tipActive) {
                        tooltipMethods.close();
                    }
                }, leaveDelay);
            }
        };
        const showTip = () => {
            const { tipStore } = reactData;
            const el = refElem.value;
            if (el) {
                const parentNode = el.parentNode;
                if (!parentNode) {
                    document.body.appendChild(el);
                }
            }
            updateValue(true);
            updateZindex();
            tipStore.placement = 'top';
            tipStore.style = { width: 'auto', left: 0, top: 0, zIndex: props.zIndex || reactData.tipZindex };
            tipStore.arrowStyle = { left: '50%' };
            return tooltipMethods.updatePlacement();
        };
        const handleDelayFn = () => {
            internalData.showDelayTip = XEUtils.debounce(() => {
                if (reactData.tipActive) {
                    showTip();
                }
            }, props.enterDelay, { leading: false, trailing: true });
        };
        const handleVisible = (target, content, evnt) => {
            const contentSlot = slots.content;
            if (!contentSlot && (content === '' || XEUtils.eqNull(content))) {
                return nextTick();
            }
            if (target) {
                const { showDelayTip } = internalData;
                const { trigger, enterDelay } = props;
                if (evnt) {
                    reactData.tipPos = {
                        x: evnt.clientX,
                        y: evnt.clientY,
                        oLeft: evnt.offsetX,
                        oTop: evnt.offsetY
                    };
                }
                else {
                    reactData.tipPos = null;
                }
                reactData.tipActive = true;
                reactData.tipTarget = target;
                reactData.tipContent = content;
                if (reactData.visible) {
                    return $xeTooltip.updatePlacement();
                }
                if (enterDelay && trigger === 'hover') {
                    if (showDelayTip) {
                        showDelayTip();
                    }
                }
                else {
                    return showTip();
                }
            }
            return nextTick();
        };
        const getSelectorEl = () => {
            const { selector } = props;
            if (selector) {
                if (XEUtils.isElement(selector)) {
                    return selector;
                }
                if (XEUtils.isString(selector)) {
                    return document.querySelector(selector);
                }
            }
            return null;
        };
        tooltipMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $tooltip: $xeTooltip }, params));
            },
            openByEvent(evnt, target, content) {
                return handleVisible(target || reactData.target || getSelectorEl(), content, evnt);
            },
            open(target, content) {
                return handleVisible(target || reactData.target || getSelectorEl(), content);
            },
            close() {
                reactData.tipPos = null;
                reactData.tipTarget = null;
                reactData.tipActive = false;
                Object.assign(reactData.tipStore, {
                    style: {},
                    placement: '',
                    arrowStyle: null
                });
                updateValue(false);
                return nextTick();
            },
            toVisible(target, content) {
                return handleVisible(target, content);
            },
            updatePlacement() {
                const { visible, tipTarget } = reactData;
                let el = refElem.value;
                if (visible && tipTarget && el) {
                    updateTipStyle();
                }
                return nextTick().then(() => {
                    el = refElem.value;
                    if (tipTarget && el) {
                        updateTipStyle();
                        return nextTick().then(() => {
                            updateTipStyle();
                        });
                    }
                });
            },
            isActived() {
                return reactData.tipActive;
            },
            setActived(active) {
                reactData.tipActive = !!active;
            }
        };
        const wheelEvent = (evnt) => {
            evnt.stopPropagation();
        };
        Object.assign($xeTooltip, tooltipMethods);
        const renderContent = () => {
            const { useHTML } = props;
            const { tipContent } = reactData;
            const wrapperStyle = computeWrapperStyle.value;
            const contentSlot = slots.content;
            const contVNs = [];
            if (contentSlot) {
                contVNs.push(h('div', {
                    key: 1
                }, getSlotVNs(contentSlot({}))));
            }
            else if (useHTML) {
                contVNs.push(h('div', {
                    key: 2,
                    innerHTML: tipContent
                }));
            }
            else {
                contVNs.push(h('span', {
                    key: 3
                }, `${tipContent}`));
            }
            return h('div', {
                key: 3,
                ref: contentWrapperfElem,
                class: 'vxe-tooltip--content',
                style: wrapperStyle
            }, contVNs);
        };
        const renderVN = () => {
            const { popupClassName, theme, isArrow, enterable } = props;
            const { tipActive, visible, tipStore } = reactData;
            const defaultSlot = slots.default;
            const vSize = computeSize.value;
            let ons;
            if (enterable) {
                ons = {
                    onMouseenter: wrapperMouseenterEvent,
                    onMouseleave: wrapperMouseleaveEvent
                };
            }
            return h('div', Object.assign({ ref: refElem, class: ['vxe-tooltip--wrapper', `theme--${theme}`, popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $tooltip: $xeTooltip }) : popupClassName) : '', {
                        [`size--${vSize}`]: vSize,
                        [`placement--${tipStore.placement}`]: tipStore.placement,
                        'is--enterable': enterable,
                        'is--visible': visible,
                        'is--arrow': isArrow,
                        'is--active': tipActive
                    }], style: tipStore.style }, ons), [
                h('div', {
                    key: 'tby',
                    class: 'vxe-tooltip--body'
                }, [
                    renderContent(),
                    h('div', {
                        class: 'vxe-tooltip--arrow',
                        style: tipStore.arrowStyle
                    })
                ]),
                ...(defaultSlot ? getSlotVNs(defaultSlot({})) : [])
            ]);
        };
        watch(() => props.enterDelay, () => {
            handleDelayFn();
        });
        watch(() => props.content, (val) => {
            reactData.tipContent = val;
        });
        watch(() => props.modelValue, (val) => {
            if (!reactData.isUpdate) {
                if (val) {
                    handleVisible(reactData.target || getSelectorEl(), props.content);
                }
                else {
                    tooltipMethods.close();
                }
            }
            reactData.isUpdate = false;
        });
        onMounted(() => {
            const contentWrapperfEl = contentWrapperfElem.value;
            if (contentWrapperfEl) {
                contentWrapperfEl.addEventListener('wheel', wheelEvent, { passive: false });
            }
            nextTick(() => {
                const { trigger, content } = props;
                const wrapperElem = refElem.value;
                if (wrapperElem) {
                    const parentNode = wrapperElem.parentNode;
                    if (parentNode) {
                        reactData.tipContent = content;
                        reactData.tipZindex = nextZIndex();
                        XEUtils.arrayEach(wrapperElem.children, (elem, index) => {
                            if (index) {
                                parentNode.insertBefore(elem, wrapperElem);
                                if (!reactData.target) {
                                    reactData.target = elem;
                                }
                            }
                        });
                        parentNode.removeChild(wrapperElem);
                        const { target } = reactData;
                        if (target) {
                            if (trigger === 'hover') {
                                target.onmouseenter = targetMouseenterEvent;
                                target.onmouseleave = targetMouseleaveEvent;
                            }
                            else if (trigger === 'click') {
                                target.onclick = clickEvent;
                            }
                        }
                        if (props.modelValue) {
                            handleVisible(target || getSelectorEl(), content);
                        }
                    }
                }
            });
        });
        onBeforeUnmount(() => {
            const { target } = reactData;
            const wrapperElem = refElem.value;
            if (target) {
                target.onmouseenter = null;
                target.onmouseleave = null;
                target.onclick = null;
            }
            const contentWrapperfEl = contentWrapperfElem.value;
            if (contentWrapperfEl) {
                contentWrapperfEl.removeEventListener('wheel', wheelEvent);
            }
            if (wrapperElem) {
                const parentNode = wrapperElem.parentNode;
                if (parentNode) {
                    parentNode.removeChild(wrapperElem);
                }
            }
        });
        handleDelayFn();
        $xeTooltip.renderVN = renderVN;
        return $xeTooltip;
    },
    render() {
        return this.renderVN();
    }
});
