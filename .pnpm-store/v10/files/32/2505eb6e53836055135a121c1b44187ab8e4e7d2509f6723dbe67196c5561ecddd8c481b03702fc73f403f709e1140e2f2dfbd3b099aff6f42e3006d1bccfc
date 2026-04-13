import { ref, h, reactive, computed } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { VxeUI, getConfig, getIcon, getI18n, useSize, createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeText',
    props: {
        status: String,
        title: [String, Number],
        icon: String,
        prefixIcon: String,
        suffixIcon: String,
        loading: Boolean,
        content: [String, Number],
        clickToCopy: {
            type: Boolean,
            default: () => getConfig().text.clickToCopy
        },
        copyConfig: Object,
        size: {
            type: String,
            default: () => getConfig().text.size || getConfig().size
        }
    },
    emits: [
        'click',
        'dblclick',
        'prefix-click',
        'suffix-click',
        'copy-success',
        'copy-error'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const refContentElem = ref();
        const reactData = reactive({});
        const computeCopyOpts = computed(() => {
            return Object.assign({}, getConfig().text.copyConfig, props.copyConfig);
        });
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const handleCopy = (evnt) => {
            const { content } = props;
            const copyOpts = computeCopyOpts.value;
            const { showMessage } = copyOpts;
            const contentEl = refContentElem.value;
            const copyVal = (contentEl ? contentEl.textContent : '') || content;
            if (copyVal) {
                if (VxeUI.clipboard.copy(copyVal)) {
                    if (showMessage && VxeUI.modal) {
                        VxeUI.modal.message({
                            content: getI18n('vxe.text.copySuccess'),
                            status: 'success'
                        });
                    }
                    dispatchEvent('copy-success', {}, evnt);
                }
                else {
                    if (showMessage && VxeUI.modal) {
                        VxeUI.modal.message({
                            content: getI18n('vxe.text.copyError'),
                            status: 'error'
                        });
                    }
                    dispatchEvent('copy-error', {}, evnt);
                }
            }
        };
        const clickIconEvent = (evnt) => {
            const { clickToCopy } = props;
            const copyOpts = computeCopyOpts.value;
            if (clickToCopy && copyOpts.trigger !== 'dblclick') {
                handleCopy(evnt);
            }
        };
        const dblclickIconEvent = (evnt) => {
            const { clickToCopy } = props;
            const copyOpts = computeCopyOpts.value;
            if (clickToCopy && copyOpts.trigger === 'dblclick') {
                handleCopy(evnt);
            }
        };
        const $xeText = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $text: $xeText }, params));
        };
        const textMethods = {
            dispatchEvent
        };
        const clickEvent = (evnt) => {
            const { loading } = props;
            if (!loading) {
                dispatchEvent('click', {}, evnt);
            }
        };
        const dblclickEvent = (evnt) => {
            const { loading } = props;
            if (!loading) {
                dispatchEvent('dblclick', {}, evnt);
            }
        };
        const prefixEvent = (evnt) => {
            const { loading } = props;
            if (!loading) {
                dispatchEvent('prefix-click', {}, evnt);
            }
        };
        const suffixEvent = (evnt) => {
            const { loading } = props;
            if (!loading) {
                dispatchEvent('suffix-click', {}, evnt);
            }
        };
        const textPrivateMethods = {};
        Object.assign($xeText, textMethods, textPrivateMethods);
        const renderCopyIcon = () => {
            const copyOpts = computeCopyOpts.value;
            const { icon, status } = copyOpts;
            return h('span', {
                key: 'ci',
                class: ['vxe-text--copy-icon', {
                        [`theme--${status}`]: status
                    }],
                onClick: clickIconEvent,
                onDblclick: dblclickIconEvent
            }, [
                h('i', {
                    class: icon || getIcon().TEXT_COPY
                })
            ]);
        };
        const renderContent = () => {
            const { loading, icon, prefixIcon, suffixIcon, clickToCopy, content } = props;
            const copyOpts = computeCopyOpts.value;
            const defaultSlot = slots.default;
            const prefixIconSlot = slots.prefixIcon || slots['prefix-icon'] || slots.icon;
            const suffixIconSlot = slots.suffixIcon || slots['suffix-icon'];
            const copyToRight = copyOpts.layout === 'right';
            const contVNs = [];
            if (loading) {
                contVNs.push(h('span', {
                    key: 'lg',
                    class: 'vxe-text--loading'
                }, [
                    h('i', {
                        class: getIcon().TEXT_LOADING
                    })
                ]));
            }
            else if (clickToCopy && !copyToRight) {
                contVNs.push(renderCopyIcon());
            }
            if (prefixIcon || icon) {
                contVNs.push(h('span', {
                    key: 'si',
                    class: 'vxe-text--prefix-icon',
                    onClick: prefixEvent
                }, prefixIconSlot
                    ? prefixIconSlot({})
                    : [
                        h('i', {
                            class: prefixIcon || icon
                        })
                    ]));
            }
            contVNs.push(h('span', {
                key: 'ct',
                ref: refContentElem,
                class: 'vxe-text--content',
                onClick: clickEvent,
                onDblclick: dblclickEvent
            }, defaultSlot ? defaultSlot({}) : XEUtils.toValueString(content)));
            if (suffixIcon) {
                contVNs.push(h('span', {
                    key: 'si',
                    class: 'vxe-text--suffix-icon',
                    onClick: suffixEvent
                }, suffixIconSlot
                    ? suffixIconSlot({})
                    : [
                        h('i', {
                            class: suffixIcon
                        })
                    ]));
            }
            if (clickToCopy && copyToRight && !loading) {
                contVNs.push(renderCopyIcon());
            }
            return contVNs;
        };
        const renderVN = () => {
            const { loading, status, title, clickToCopy } = props;
            const vSize = computeSize.value;
            return h('span', {
                ref: refElem,
                title,
                class: ['vxe-text', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        'is--copy': clickToCopy,
                        'is--loading': loading
                    }]
            }, renderContent());
        };
        $xeText.renderVN = renderVN;
        return $xeText;
    },
    render() {
        return this.renderVN();
    }
});
