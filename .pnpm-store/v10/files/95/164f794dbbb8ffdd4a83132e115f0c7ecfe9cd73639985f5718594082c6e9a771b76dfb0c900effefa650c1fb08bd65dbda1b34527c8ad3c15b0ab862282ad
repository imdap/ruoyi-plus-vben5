import { h, reactive, provide } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, createEvent, useSize, usePermission, renderEmptyElement } from '../../ui';
import XEUtils from 'xe-utils';
import VxeButtonComponent from './button';
export default defineVxeComponent({
    name: 'VxeButtonGroup',
    props: {
        options: Array,
        mode: String,
        status: String,
        round: Boolean,
        vertical: Boolean,
        circle: Boolean,
        align: String,
        className: [String, Function],
        disabled: Boolean,
        permissionCode: [String, Number],
        size: {
            type: String,
            default: () => getConfig().buttonGroup.size || getConfig().size
        }
    },
    emits: [
        'click',
        'contextmenu'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const reactData = reactive({});
        const computeMaps = {};
        const $xeButtonGroup = {
            xID,
            props,
            context,
            reactData,
            getComputeMaps: () => computeMaps
        };
        useSize(props);
        const { computePermissionInfo } = usePermission(props);
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $buttonGroup: $xeButtonGroup }, params));
        };
        const buttonGroupMethods = {
            dispatchEvent
        };
        const buttonGroupPrivateMethods = {
            handleClick(params, evnt) {
                const { options } = props;
                const { name } = params;
                const option = options ? options.find(item => item.name === name) : null;
                buttonGroupMethods.dispatchEvent('click', Object.assign(Object.assign({}, params), { option }), evnt);
            }
        };
        const contextmenuEvent = (evnt) => {
            dispatchEvent('contextmenu', {}, evnt);
        };
        Object.assign($xeButtonGroup, buttonGroupMethods, buttonGroupPrivateMethods);
        const renderVN = () => {
            const { className, options, vertical } = props;
            const permissionInfo = computePermissionInfo.value;
            const defaultSlot = slots.default;
            if (!permissionInfo.visible) {
                return renderEmptyElement($xeButtonGroup);
            }
            return h('div', {
                class: ['vxe-button-group', className ? (XEUtils.isFunction(className) ? className({ $buttonGroup: $xeButtonGroup }) : className) : '', {
                        'is--vertical': vertical
                    }],
                onContextmenu: contextmenuEvent
            }, defaultSlot
                ? defaultSlot({})
                : (options
                    ? options.map((item, index) => {
                        return h(VxeButtonComponent, Object.assign({ key: index }, item));
                    })
                    : []));
        };
        $xeButtonGroup.renderVN = renderVN;
        provide('$xeButtonGroup', $xeButtonGroup);
        return $xeButtonGroup;
    },
    render() {
        return this.renderVN();
    }
});
