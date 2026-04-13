import { ref, h, inject, watch, reactive, onMounted, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { createEvent } from '../../ui';
import { assembleCollapseItem, destroyCollapseItem } from './util';
export default defineVxeComponent({
    name: 'VxeCollapsePane',
    props: {
        title: [String, Number],
        name: [String, Number],
        icon: String,
        preload: Boolean,
        permissionCode: [String, Number]
    },
    emits: [],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const $xeCollapse = inject('$xeCollapse', null);
        const refElem = ref();
        const reactData = reactive({});
        const collapseConfig = reactive({
            id: xID,
            title: props.title,
            name: props.name,
            icon: props.icon,
            preload: props.preload,
            permissionCode: props.permissionCode,
            slots: slots
        });
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeCollapsePane = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $collapsePane: $xeCollapsePane }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeCollapsePane, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem
            }, []);
        };
        watch(() => props.title, (val) => {
            collapseConfig.title = val;
        });
        watch(() => props.name, (val) => {
            collapseConfig.name = val;
        });
        watch(() => props.icon, (val) => {
            collapseConfig.icon = val;
        });
        watch(() => props.permissionCode, (val) => {
            collapseConfig.permissionCode = val;
        });
        onMounted(() => {
            const elem = refElem.value;
            if ($xeCollapse && elem) {
                assembleCollapseItem($xeCollapse, elem, collapseConfig);
            }
        });
        onUnmounted(() => {
            if ($xeCollapse) {
                destroyCollapseItem($xeCollapse, collapseConfig);
            }
        });
        $xeCollapsePane.renderVN = renderVN;
        return $xeCollapsePane;
    },
    render() {
        return this.renderVN();
    }
});
