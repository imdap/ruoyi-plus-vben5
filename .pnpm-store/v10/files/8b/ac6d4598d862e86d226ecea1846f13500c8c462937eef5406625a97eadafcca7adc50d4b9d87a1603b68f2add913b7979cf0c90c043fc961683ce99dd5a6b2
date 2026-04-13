import { h, onUnmounted, inject, ref, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createOption, watchOption, destroyOption, assembleOption } from './util';
export default defineVxeComponent({
    name: 'VxeOption',
    props: {
        value: [String, Number, Boolean],
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
        const $xeOptgroup = inject('$xeOptgroup', null);
        const optionConfig = createOption($xeSelect, props);
        optionConfig.slots = slots;
        watchOption(props, optionConfig);
        onMounted(() => {
            const el = elem.value;
            assembleOption($xeSelect, el, optionConfig, $xeOptgroup);
        });
        onUnmounted(() => {
            destroyOption($xeSelect, optionConfig);
        });
        return () => {
            return h('div', {
                ref: elem
            });
        };
    }
});
