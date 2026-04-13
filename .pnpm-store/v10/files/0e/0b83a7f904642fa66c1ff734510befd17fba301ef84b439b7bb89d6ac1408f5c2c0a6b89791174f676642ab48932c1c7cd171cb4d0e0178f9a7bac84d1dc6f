import { ref, h, reactive, watch } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, getIcon, createEvent, useSize, renderEmptyElement } from '../../ui';
export default defineVxeComponent({
    name: 'VxeTag',
    props: {
        border: {
            type: Boolean,
            default: () => getConfig().tag.border
        },
        visible: {
            type: Boolean,
            default: null
        },
        status: String,
        title: [String, Number],
        icon: String,
        closeIcon: {
            type: String,
            default: () => getConfig().tag.closeIcon
        },
        content: [String, Number],
        round: Boolean,
        closable: {
            type: Boolean,
            default: () => getConfig().tag.closable
        },
        color: String,
        loading: Boolean,
        size: {
            type: String,
            default: () => getConfig().tag.size || getConfig().size
        }
    },
    emits: [
        'click',
        'dblclick',
        'close',
        'update:visible'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const reactData = reactive({
            showTag: props.visible !== false
        });
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeTag = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $tag: $xeTag }, params));
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        const updateVisible = () => {
            reactData.showTag = props.visible !== false;
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
        const closeEvent = (evnt) => {
            const { loading } = props;
            if (!loading) {
                const visible = !reactData.showTag;
                reactData.showTag = visible;
                emit('update:visible', visible);
                dispatchEvent('close', { visible }, evnt);
            }
        };
        Object.assign($xeTag, tagMethods, tagPrivateMethods);
        const renderContent = () => {
            const { icon, content, closable, closeIcon, loading } = props;
            const defaultSlot = slots.default;
            const iconSlot = slots.icon;
            const closeIconSlot = slots.closeIcon || slots['close-icon'];
            return [
                iconSlot || icon
                    ? h('span', {
                        class: 'vxe-tag--icon'
                    }, iconSlot
                        ? iconSlot({})
                        : [
                            h('i', {
                                class: icon
                            })
                        ])
                    : renderEmptyElement($xeTag),
                h('span', {
                    class: 'vxe-tag--content'
                }, defaultSlot ? defaultSlot({}) : XEUtils.toValueString(content)),
                loading || closable
                    ? h('span', {
                        class: loading ? 'vxe-tag--loading' : 'vxe-tag--close',
                        onClick: closeEvent
                    }, !loading && closeIconSlot
                        ? closeIconSlot({})
                        : [
                            h('i', {
                                class: loading ? getIcon().TAG_LOADING : (closeIcon || getIcon().TAG_CLOSE)
                            })
                        ])
                    : renderEmptyElement($xeTag)
            ];
        };
        const renderVN = () => {
            const { status, color, title, round, border, loading } = props;
            const { showTag } = reactData;
            const vSize = computeSize.value;
            if (!showTag) {
                return renderEmptyElement($xeTag);
            }
            return h('span', {
                ref: refElem,
                class: ['vxe-tag', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status && !color,
                        [`color--${color}`]: color && !status,
                        'is--round': round,
                        'is--border': border,
                        'is--loading': loading
                    }],
                title,
                onClick: clickEvent,
                onDblclick: dblclickEvent
            }, renderContent());
        };
        watch(() => props.visible, () => {
            updateVisible();
        });
        updateVisible();
        $xeTag.renderVN = renderVN;
        return $xeTag;
    },
    render() {
        return this.renderVN();
    }
});
