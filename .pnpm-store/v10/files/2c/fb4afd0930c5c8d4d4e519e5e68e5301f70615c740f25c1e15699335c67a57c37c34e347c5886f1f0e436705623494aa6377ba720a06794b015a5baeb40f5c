import { h, onUnmounted, provide, inject, ref, onMounted, createCommentVNode } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { columnProps } from './column';
import { watchColumn, assembleColumn, destroyColumn } from './util';
import Cell from './cell';
export default defineVxeComponent({
    name: 'VxeColgroup',
    props: columnProps,
    setup(props, { slots }) {
        const refElem = ref();
        const $xeTable = inject('$xeTable', null);
        const $xeParentColgroup = inject('$xeColgroup', null);
        if (!$xeTable) {
            return () => createCommentVNode();
        }
        const columnConfig = Cell.createColumn($xeTable, props);
        const columnSlots = {};
        if (slots.header) {
            columnSlots.header = slots.header;
        }
        columnConfig.slots = columnSlots;
        columnConfig.children = [];
        watchColumn($xeTable, props, columnConfig);
        onMounted(() => {
            const elem = refElem.value;
            if (elem) {
                assembleColumn($xeTable, elem, columnConfig, $xeParentColgroup);
            }
        });
        onUnmounted(() => {
            destroyColumn($xeTable, columnConfig);
        });
        const renderVN = () => {
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem
            }, defaultSlot ? defaultSlot() : []);
        };
        const $xeColgroup = { columnConfig };
        provide('$xeColgroup', $xeColgroup);
        provide('$xeGrid', null);
        provide('$xeGantt', null);
        return renderVN;
    }
});
