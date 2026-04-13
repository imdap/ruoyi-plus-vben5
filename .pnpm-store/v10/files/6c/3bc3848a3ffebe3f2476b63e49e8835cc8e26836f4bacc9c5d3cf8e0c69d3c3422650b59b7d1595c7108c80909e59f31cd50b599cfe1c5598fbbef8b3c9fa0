import { computed, createVNode, defineComponent, onBeforeUnmount, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";

//#region src/badge/SingleNumber.tsx
function getOffset(start, end, unit) {
	let index = start;
	let offset = 0;
	while ((index + 10) % 10 !== end) {
		index += unit;
		offset += unit;
	}
	return offset;
}
var SingleNumber_default = /* @__PURE__ */ defineComponent((props) => {
	const valueNumber = computed(() => Number(props.value));
	const countNumber = computed(() => Math.abs(props.count));
	const prevValue = shallowRef(valueNumber.value);
	const prevCount = shallowRef(countNumber.value);
	const fallbackTimer = shallowRef(null);
	const onTransitionEnd = () => {
		prevValue.value = valueNumber.value;
		prevCount.value = countNumber.value;
	};
	watch([valueNumber, countNumber], () => {
		if (fallbackTimer.value) {
			clearTimeout(fallbackTimer.value);
			fallbackTimer.value = null;
		}
		fallbackTimer.value = setTimeout(onTransitionEnd, 1e3);
	}, { immediate: true });
	onBeforeUnmount(() => {
		if (fallbackTimer.value) {
			clearTimeout(fallbackTimer.value);
			fallbackTimer.value = null;
		}
	});
	return () => {
		const prefixCls = props.prefixCls;
		const value = valueNumber.value;
		const count = countNumber.value;
		const previousValue = prevValue.value;
		const previousCount = prevCount.value;
		const renderUnit = (unitValue, offset = 0, current = false, key) => {
			const style = offset ? {
				position: "absolute",
				top: `${offset}00%`,
				left: 0
			} : void 0;
			const spanKey = Number.isNaN(key) ? unitValue : key ?? unitValue;
			return createVNode("span", {
				"key": spanKey,
				"class": classNames(`${prefixCls}-only-unit`, { current }),
				"style": style
			}, [unitValue]);
		};
		let unitNodes;
		let offsetStyle;
		if (previousValue === value || Number.isNaN(value) || Number.isNaN(previousValue)) {
			unitNodes = [renderUnit(props.value, 0, true, value)];
			offsetStyle = { transition: "none" };
		} else {
			const unitNumberList = [];
			for (let index = value; index <= value + 10; index += 1) unitNumberList.push(index);
			const unit = previousCount < count ? 1 : -1;
			const prevIndex = unitNumberList.findIndex((n) => n % 10 === previousValue);
			unitNodes = (unit < 0 ? unitNumberList.slice(0, prevIndex + 1) : unitNumberList.slice(prevIndex)).map((n, index) => {
				return renderUnit(n % 10, unit < 0 ? index - prevIndex : index, index === prevIndex, n);
			});
			offsetStyle = { transform: `translateY(${-getOffset(previousValue, value, unit)}00%)` };
		}
		return createVNode("span", {
			"class": `${prefixCls}-only`,
			"style": offsetStyle,
			"onTransitionend": onTransitionEnd
		}, [unitNodes]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		count: {
			type: Number,
			required: true
		}
	},
	name: "ASingleNumber",
	inheritAttrs: false
});

//#endregion
export { SingleNumber_default as default };