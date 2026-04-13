import { formatValue, isInRange, isSame } from "../utils/dateUtil.js";
import { usePanelContext, usePickerHackContext } from "./context.js";
import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var PanelBody_default = /* @__PURE__ */ defineComponent((props) => {
	const context = usePanelContext();
	const pickerHackContext = usePickerHackContext();
	return () => {
		const { prefixCls, classNames: panelClassNames, styles, panelType, now, disabledDate: contextDisabledDate, cellRender, onHover, hoverValue, hoverRangeValue, generateConfig = {}, values, locale = {}, onSelect } = context.value;
		const { rowNum, colNum, baseDate, getCellDate, prefixColumn, rowClassName, titleFormat, getCellText, getCellClassName, headerCells, cellSelection = true, disabledDate } = props;
		const { onCellDblClick } = pickerHackContext?.value || {};
		const mergedDisabledDate = disabledDate || contextDisabledDate;
		const cellPrefixCls = `${prefixCls}-cell`;
		const matchValues = (date) => (values || []).some((singleValue) => singleValue && isSame(generateConfig, locale, date, singleValue, panelType));
		const rows = [];
		for (let row = 0; row < rowNum; row += 1) {
			const rowNode = [];
			let rowStartDate;
			for (let col = 0; col < colNum; col += 1) {
				const currentDate = getCellDate(baseDate, row * colNum + col);
				const disabled = mergedDisabledDate?.(currentDate, { type: panelType });
				if (col === 0) {
					rowStartDate = currentDate;
					if (prefixColumn) rowNode.push(prefixColumn(rowStartDate));
				}
				let inRange = false;
				let rangeStart = false;
				let rangeEnd = false;
				if (cellSelection && hoverRangeValue) {
					const [hoverStart, hoverEnd] = hoverRangeValue;
					inRange = isInRange(generateConfig, hoverStart, hoverEnd, currentDate);
					rangeStart = isSame(generateConfig, locale, currentDate, hoverStart, panelType);
					rangeEnd = isSame(generateConfig, locale, currentDate, hoverEnd, panelType);
				}
				const title = titleFormat ? formatValue(currentDate, {
					locale,
					format: titleFormat,
					generateConfig
				}) : void 0;
				const inner = createVNode("div", { "class": `${cellPrefixCls}-inner` }, [getCellText(currentDate)]);
				rowNode.push(createVNode("td", {
					"key": col,
					"title": title,
					"class": clsx(cellPrefixCls, panelClassNames?.item, {
						[`${cellPrefixCls}-disabled`]: disabled,
						[`${cellPrefixCls}-hover`]: (hoverValue || []).some((date) => isSame(generateConfig, locale, currentDate, date, panelType)),
						[`${cellPrefixCls}-in-range`]: inRange && !rangeStart && !rangeEnd,
						[`${cellPrefixCls}-range-start`]: rangeStart,
						[`${cellPrefixCls}-range-end`]: rangeEnd,
						[`${prefixCls}-cell-selected`]: !hoverRangeValue && panelType !== "week" && matchValues(currentDate),
						...getCellClassName(currentDate)
					}),
					"style": styles?.item,
					"onClick": () => {
						if (!disabled) onSelect(currentDate);
					},
					"onDblclick": () => {
						if (!disabled && onCellDblClick) onCellDblClick();
					},
					"onMouseenter": () => {
						if (!disabled) onHover?.(currentDate);
					},
					"onMouseleave": () => {
						if (!disabled) onHover?.(null);
					}
				}, [cellRender ? cellRender(currentDate, {
					prefixCls,
					originNode: inner,
					today: now,
					type: panelType,
					locale
				}) : inner]));
			}
			rows.push(createVNode("tr", {
				"key": row,
				"class": rowClassName?.(rowStartDate)
			}, [rowNode]));
		}
		return createVNode("div", {
			"class": clsx(`${prefixCls}-body`, panelClassNames?.body),
			"style": styles?.body
		}, [createVNode("table", {
			"class": clsx(`${prefixCls}-content`, panelClassNames?.content),
			"style": styles?.content
		}, [headerCells && createVNode("thead", null, [createVNode("tr", null, [headerCells])]), createVNode("tbody", null, [rows])])]);
	};
}, {
	props: {
		rowNum: {
			type: Number,
			required: true,
			default: void 0
		},
		colNum: {
			type: Number,
			required: true,
			default: void 0
		},
		baseDate: {
			required: true,
			default: void 0
		},
		titleFormat: {
			type: String,
			required: false,
			default: void 0
		},
		getCellDate: {
			type: Function,
			required: true,
			default: void 0
		},
		getCellText: {
			type: Function,
			required: true,
			default: void 0
		},
		getCellClassName: {
			type: Function,
			required: true,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: false,
			default: void 0
		},
		headerCells: {
			type: Array,
			required: false,
			default: void 0
		},
		prefixColumn: {
			type: Function,
			required: false,
			default: void 0
		},
		rowClassName: {
			type: Function,
			required: false,
			default: void 0
		},
		cellSelection: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "PanelBody"
});
export { PanelBody_default as default };
