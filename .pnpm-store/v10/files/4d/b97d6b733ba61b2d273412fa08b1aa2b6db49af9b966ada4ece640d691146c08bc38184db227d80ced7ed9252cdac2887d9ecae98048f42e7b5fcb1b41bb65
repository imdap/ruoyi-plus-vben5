import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, useSize, usePermission, createEvent, renderEmptyElement } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
export default defineVxeComponent({
    name: 'VxeTip',
    props: {
        title: {
            type: [String, Number],
            default: () => getConfig().tip.title
        },
        content: [String, Number],
        status: String,
        icon: {
            type: String,
            default: () => getConfig().tip.icon
        },
        /**
         * 权限码
         */
        permissionCode: [String, Number],
        size: {
            type: String,
            default: () => getConfig().tip.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const { computePermissionInfo } = usePermission(props);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeTip = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $tip: $xeTip }, params));
        };
        const tipMethods = {
            dispatchEvent
        };
        const tipPrivateMethods = {};
        Object.assign($xeTip, tipMethods, tipPrivateMethods);
        const renderVN = () => {
            const { status, content, icon, title } = props;
            const defaultSlot = slots.default;
            const titleSlot = slots.title;
            const iconSlot = slots.icon;
            const permissionInfo = computePermissionInfo.value;
            const vSize = computeSize.value;
            if (!permissionInfo.visible) {
                return renderEmptyElement($xeTip);
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-tip', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        'has--title': !!(titleSlot || title)
                    }]
            }, [
                iconSlot || icon
                    ? h('div', {
                        class: 'vxe-tip--icon'
                    }, iconSlot
                        ? getSlotVNs(iconSlot({}))
                        : [
                            h('i', {
                                class: icon
                            })
                        ])
                    : renderEmptyElement($xeTip),
                h('div', {
                    class: 'vxe-tip--body'
                }, [
                    titleSlot || title
                        ? h('div', {
                            class: 'vxe-tip--title'
                        }, titleSlot ? getSlotVNs(titleSlot({})) : XEUtils.toValueString(title))
                        : renderEmptyElement($xeTip),
                    h('div', {
                        class: 'vxe-tip--content'
                    }, defaultSlot ? getSlotVNs(defaultSlot({})) : XEUtils.toValueString(content))
                ])
            ]);
        };
        $xeTip.renderVN = renderVN;
        return $xeTip;
    },
    render() {
        return this.renderVN();
    }
});
