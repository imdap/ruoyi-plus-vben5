import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, getIcon, createEvent, renderEmptyElement } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
export default defineVxeComponent({
    name: 'VxeAlert',
    props: {
        title: {
            type: [String, Number],
            default: () => getConfig().alert.title
        },
        content: [String, Number],
        status: String,
        showIcon: Boolean,
        showClose: Boolean,
        icon: {
            type: String,
            default: () => getConfig().alert.icon
        }
    },
    emits: [
        'close'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeAlert = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const alertMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $alert: $xeAlert }, params));
            }
        };
        const closeEvent = (evnt) => {
            alertMethods.dispatchEvent('close', {}, evnt);
        };
        const alertPrivateMethods = {};
        Object.assign($xeAlert, alertMethods, alertPrivateMethods);
        const renderVN = () => {
            const { status, content, icon, title, showIcon, showClose } = props;
            const defaultSlot = slots.default;
            const titleSlot = slots.title;
            const iconSlot = slots.icon;
            return h('div', {
                ref: refElem,
                class: ['vxe-alert', {
                        [`theme--${status}`]: status
                    }]
            }, [
                iconSlot || (showIcon && status) || icon
                    ? h('div', {
                        class: 'vxe-alert--icon'
                    }, iconSlot
                        ? getSlotVNs(iconSlot({}))
                        : [
                            h('i', {
                                class: icon || getIcon()[`ALERT_${status === null || status === void 0 ? void 0 : status.toUpperCase()}`]
                            })
                        ])
                    : renderEmptyElement($xeAlert),
                h('div', {
                    class: 'vxe-alert--body'
                }, [
                    titleSlot || title
                        ? h('div', {
                            class: 'vxe-alert--title'
                        }, titleSlot ? getSlotVNs(titleSlot({})) : XEUtils.toValueString(title))
                        : renderEmptyElement($xeAlert),
                    h('div', {
                        class: 'vxe-alert--content'
                    }, defaultSlot ? getSlotVNs(defaultSlot({})) : XEUtils.toValueString(content))
                ]),
                showClose
                    ? h('div', {
                        class: 'vxe-alert--close-btn',
                        onClick: closeEvent
                    }, [
                        h('i', {
                            class: getIcon().ALERT_CLOSE
                        })
                    ])
                    : renderEmptyElement($xeAlert)
            ]);
        };
        $xeAlert.renderVN = renderVN;
        return $xeAlert;
    },
    render() {
        return this.renderVN();
    }
});
