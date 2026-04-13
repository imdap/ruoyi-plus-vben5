import { h } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, createEvent, useSize } from '../../ui';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeIcon',
    props: {
        name: String,
        className: String,
        roll: Boolean,
        status: String,
        size: {
            type: String,
            default: () => getConfig().icon.size || getConfig().size
        }
    },
    emits: [
        'click'
    ],
    setup(props, context) {
        const { emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const $xeIcon = {
            xID,
            props,
            context
        };
        const clickEvent = (evnt) => {
            emit('click', createEvent(evnt, {}));
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $icon: $xeIcon }, params));
        };
        const iconMethods = {
            dispatchEvent
        };
        const iconPrivateMethods = {};
        Object.assign($xeIcon, iconMethods, iconPrivateMethods);
        const renderVN = () => {
            const { name, roll, status, className } = props;
            const vSize = computeSize.value;
            return h('i', {
                class: ['vxe-icon', `vxe-icon-${name}`, `${className || ''}`, {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        roll: roll
                    }],
                onClick: clickEvent
            });
        };
        $xeIcon.renderVN = renderVN;
        return $xeIcon;
    },
    render() {
        return this.renderVN();
    }
});
