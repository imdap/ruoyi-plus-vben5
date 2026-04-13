import { usePanelContext } from "../../context.js";
import useScrollTo from "./useScrollTo.js";
import { computed, createVNode, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { clsx } from "@v-c/util";
var SCROLL_DELAY = 300;
function flattenUnits(units) {
	return units.map(({ value, label, disabled }) => [
		value,
		label,
		disabled
	].join(",")).join(";");
}
var TimeColumn_default = /* @__PURE__ */ defineComponent((props) => {
	const context = usePanelContext();
	const ulRef = ref();
	const checkDelayRef = ref();
	const clearDelayCheck = () => {
		clearTimeout(checkDelayRef.value);
	};
	const [syncScroll, stopScroll, isScrolling] = useScrollTo(ulRef, computed(() => props.value ?? props.optionalValue));
	watch([
		() => props.value,
		() => props.optionalValue,
		() => flattenUnits(props.units)
	], () => {
		syncScroll();
		clearDelayCheck();
	}, { flush: "post" });
	onMounted(() => {
		syncScroll();
	});
	onBeforeUnmount(() => {
		stopScroll();
		clearDelayCheck();
	});
	const onInternalScroll = (event) => {
		clearDelayCheck();
		const target = event.target;
		if (!isScrolling() && props.changeOnScroll) checkDelayRef.value = setTimeout(() => {
			const ul = ulRef.value;
			const firstLiTop = ul.querySelector(`li`).offsetTop;
			const liDistList = Array.from(ul.querySelectorAll(`li`)).map((li) => li.offsetTop - firstLiTop).map((top, index) => {
				if (props.units[index].disabled) return Number.MAX_SAFE_INTEGER;
				return Math.abs(top - target.scrollTop);
			});
			const minDist = Math.min(...liDistList);
			const minDistIndex = liDistList.findIndex((dist) => dist === minDist);
			const targetUnit = props.units[minDistIndex];
			if (targetUnit && !targetUnit.disabled) props.onChange(targetUnit.value);
		}, SCROLL_DELAY);
	};
	return () => {
		const { units, value, type, onChange, onHover, onDblClick } = props;
		const { prefixCls, cellRender, now, locale, classNames: panelClassNames, styles } = context.value;
		const panelPrefixCls = `${prefixCls}-time-panel`;
		const cellPrefixCls = `${prefixCls}-time-panel-cell`;
		const columnPrefixCls = `${panelPrefixCls}-column`;
		return createVNode("ul", {
			"class": columnPrefixCls,
			"ref": ulRef,
			"data-type": type,
			"onScroll": onInternalScroll
		}, [units.map(({ label, value: unitValue, disabled }) => {
			const inner = createVNode("div", { "class": `${cellPrefixCls}-inner` }, [label]);
			return createVNode("li", {
				"key": unitValue,
				"style": styles?.item,
				"class": clsx(cellPrefixCls, panelClassNames?.item, {
					[`${cellPrefixCls}-selected`]: value === unitValue,
					[`${cellPrefixCls}-disabled`]: disabled
				}),
				"onClick": () => {
					if (!disabled) onChange(unitValue);
				},
				"onDblclick": () => {
					if (!disabled && onDblClick) onDblClick();
				},
				"onMouseenter": () => {
					onHover(unitValue);
				},
				"onMouseleave": () => {
					onHover(null);
				},
				"data-value": unitValue
			}, [cellRender ? cellRender(unitValue, {
				prefixCls,
				originNode: inner,
				today: now,
				type: "time",
				subType: type,
				locale
			}) : inner]);
		})]);
	};
}, {
	props: {
		units: {
			type: Array,
			required: true,
			default: void 0
		},
		value: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		optionalValue: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: true,
			default: void 0
		},
		onChange: {
			type: Function,
			required: true,
			default: void 0
		},
		onHover: {
			type: Function,
			required: true,
			default: void 0
		},
		onDblClick: {
			required: false,
			default: void 0
		},
		changeOnScroll: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "TimeColumn"
});
export { TimeColumn_default as default };
