import { h, onUnmounted, provide, inject, ref, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createOption, watchOption, destroyOption, assembleOption } from './util';
export default defineVxeComponent({
    name: 'VxeOptgroup',
    props: {
        label: {
            type: [String, Number, Boolean],
            default: ''
        },
        visible: {
            type: Boolean,
            default: null
        },
        className: [String, Function],
        disabled: Boolean
    },
    emits: [],
    setup(props, { slots }) {
        const elem = ref();
        const $xeSelect = inject('$xeSelect', {});
        const optionConfig = createOption($xeSelect, props);
        const $xeOptgroup = { optionConfig };
        optionConfig.options = [];
        provide('$xeOptgroup', $xeOptgroup);
        watchOption(props, optionConfig);
        onMounted(() => {
            const el = elem.value;
            assembleOption($xeSelect, el, optionConfig);
        });
        onUnmounted(() => {
            destroyOption($xeSelect, optionConfig);
        });
        return () => {
            const defaultSlot = slots.default;
            return h('div', {
                ref: elem
            }, defaultSlot ? defaultSlot({}) : []);
        };
    }
});
