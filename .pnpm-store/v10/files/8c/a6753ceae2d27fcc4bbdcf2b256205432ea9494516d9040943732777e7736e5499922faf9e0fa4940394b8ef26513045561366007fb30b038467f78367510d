import Options_default from "./Options.js";
import Pager_default from "./Pager.js";
import zh_CN_default from "./locale/zh_CN.js";
import { computed, createTextVNode, createVNode, defineComponent, h, isVNode, mergeProps, ref, toRef, watchEffect } from "vue";
import KeyCode from "@v-c/util/dist/KeyCode";
import { classNames } from "@v-c/util";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { cloneElement } from "@v-c/util/dist/vnode";
import warning from "@v-c/util/dist/warning";
function isInteger(v) {
	const value = Number(v);
	return typeof value === "number" && !Number.isNaN(value) && isFinite(value) && Math.floor(value) === value;
}
var defaultItemRender = (_page, _type, element) => element;
function calculatePage(p, pageSize, total) {
	const _pageSize = typeof p === "undefined" ? pageSize : p;
	return Math.floor((total - 1) / _pageSize) + 1;
}
var paginationDefaults = {
	prefixCls: "vc-pagination",
	selectPrefixCls: "vc-select",
	defaultCurrent: 1,
	total: 0,
	defaultPageSize: 10,
	showPrevNextJumpers: true,
	showTitle: true,
	locale: zh_CN_default,
	totalBoundaryShowSizeChanger: 50
};
var Pagination_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const paginationRef = ref();
	const mergedPrefixCls = computed(() => props.prefixCls ?? paginationDefaults.prefixCls);
	const mergedSelectPrefixCls = computed(() => props.selectPrefixCls ?? paginationDefaults.selectPrefixCls);
	const mergedLocale = computed(() => props.locale ?? paginationDefaults.locale);
	const mergedTotal = computed(() => props.total ?? paginationDefaults.total);
	const mergedShowPrevNextJumpers = computed(() => props.showPrevNextJumpers ?? paginationDefaults.showPrevNextJumpers);
	const mergedShowTitle = computed(() => props.showTitle ?? paginationDefaults.showTitle);
	const mergedTotalBoundaryShowSizeChanger = computed(() => props.totalBoundaryShowSizeChanger ?? paginationDefaults.totalBoundaryShowSizeChanger);
	const pageSizeProp = toRef(props, "pageSize");
	const [pageSize, setPageSize] = useMergedState(paginationDefaults.defaultPageSize, {
		value: pageSizeProp,
		defaultValue: props.defaultPageSize ?? paginationDefaults.defaultPageSize
	});
	const currentProp = toRef(props, "current");
	const allPages = computed(() => calculatePage(void 0, pageSize.value, mergedTotal.value));
	const [current, setCurrent] = useMergedState(paginationDefaults.defaultCurrent, {
		value: currentProp,
		defaultValue: props.defaultCurrent ?? paginationDefaults.defaultCurrent,
		postState: (c) => Math.max(1, Math.min(c ?? 1, calculatePage(void 0, pageSize.value, mergedTotal.value)))
	});
	const internalInputVal = ref(current.value);
	watchEffect(() => {
		internalInputVal.value = current.value;
	});
	if (process.env.NODE_ENV !== "production") watchEffect(() => {
		warning(props?.current !== void 0 ? !!props.onChange : true, "You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.");
	});
	function getValidValue(e) {
		const inputValue = e.target.value;
		const allPages$1 = calculatePage(void 0, pageSize.value, mergedTotal.value);
		let value;
		if (inputValue === "") value = inputValue;
		else if (Number.isNaN(Number(inputValue))) value = internalInputVal.value;
		else if (inputValue >= allPages$1) value = allPages$1;
		else value = Number(inputValue);
		return value;
	}
	function isValid(page) {
		return isInteger(page) && page !== current.value && isInteger(mergedTotal.value) && mergedTotal.value > 0;
	}
	function getItemIcon(icon, label) {
		const prefixCls = mergedPrefixCls.value;
		let iconNode = icon || createVNode("button", {
			"type": "button",
			"aria-label": label,
			"class": `${prefixCls}-item-link`
		}, null);
		if (typeof icon === "function") iconNode = h(icon, { ...props });
		return iconNode;
	}
	const prevPage = computed(() => current.value - 1 > 0 ? current.value - 1 : 0);
	const nextPage = computed(() => current.value + 1 < allPages.value ? current.value + 1 : allPages.value);
	const jumpPrevPage = computed(() => Math.max(1, current.value - (props.showLessItems ? 3 : 5)));
	const jumpNextPage = computed(() => Math.min(calculatePage(void 0, pageSize.value, mergedTotal.value), current.value + (props.showLessItems ? 3 : 5)));
	const hasPrev = computed(() => current.value > 1);
	const hasNext = computed(() => current.value < calculatePage(void 0, pageSize.value, mergedTotal.value));
	const goButton = computed(() => props.showQuickJumper && props.showQuickJumper.goButton);
	function handleChange(page) {
		if (typeof page !== "undefined" && isValid(page) && !props.disabled) {
			const currentPage = calculatePage(void 0, pageSize.value, mergedTotal.value);
			let newPage = page;
			if (page > currentPage) newPage = currentPage;
			else if (page < 1) newPage = 1;
			if (newPage !== internalInputVal.value) internalInputVal.value = newPage;
			setCurrent(newPage);
			props.onChange?.(newPage, pageSize.value);
			return newPage;
		}
		return current.value;
	}
	function prevHandle() {
		if (hasPrev.value) handleChange(current.value - 1);
	}
	function nextHandle() {
		if (hasNext.value) handleChange(current.value + 1);
	}
	function jumpPrevHandle() {
		handleChange(jumpPrevPage.value);
	}
	function jumpNextHandle() {
		handleChange(jumpNextPage.value);
	}
	function runIfEnter(event, callback, ...restParams) {
		if (event.key === "Enter" || event.charCode === KeyCode.ENTER || event.keyCode === KeyCode.ENTER) callback(...restParams);
	}
	function runIfEnterPrev(event) {
		runIfEnter(event, prevHandle);
	}
	function runIfEnterNext(event) {
		runIfEnter(event, nextHandle);
	}
	function runIfEnterJumpPrev(event) {
		runIfEnter(event, jumpPrevHandle);
	}
	function runIfEnterJumpNext(event) {
		runIfEnter(event, jumpNextHandle);
	}
	function renderPrev(prevPage$1) {
		const prevButton = (props.itemRender || defaultItemRender)?.(prevPage$1, "prev", getItemIcon(props.prevIcon, "prev page"));
		const nextProps = {};
		if (!hasPrev.value) nextProps.disabled = true;
		return isVNode(prevButton) ? cloneElement(prevButton, nextProps) : prevButton;
	}
	function renderNext(nextPage$1) {
		const nextButton = (props.itemRender || defaultItemRender)?.(nextPage$1, "next", getItemIcon(props.nextIcon, "next page"));
		const nextProps = {};
		if (!hasNext.value) nextProps.disabled = true;
		return isVNode(nextButton) ? cloneElement(nextButton, nextProps) : nextButton;
	}
	function handleGoTO(event) {
		if (event.type === "click" || event.keyCode === KeyCode.ENTER) handleChange(internalInputVal.value);
	}
	function handleKeyDown(event) {
		if (event.keyCode === KeyCode.UP || event.keyCode === KeyCode.DOWN) event.preventDefault();
	}
	function handleKeyUp(event) {
		const value = getValidValue(event);
		if (value !== internalInputVal.value) internalInputVal.value = value;
		switch (event.keyCode) {
			case KeyCode.ENTER:
				handleChange(value);
				break;
			case KeyCode.UP:
				handleChange(value - 1);
				break;
			case KeyCode.DOWN:
				handleChange(value + 1);
				break;
			default: break;
		}
	}
	function handleBlur(event) {
		handleChange(getValidValue(event));
	}
	function changePageSize(size) {
		const newCurrent = calculatePage(size, pageSize.value, mergedTotal.value);
		const nextCurrent = current.value > newCurrent && newCurrent !== 0 ? newCurrent : current.value;
		setPageSize(size);
		internalInputVal.value = nextCurrent;
		props.onShowSizeChange?.(current.value, size);
		setCurrent(nextCurrent);
		props.onChange?.(nextCurrent, size);
	}
	const shouldDisplayQuickJumper = computed(() => mergedTotal.value > pageSize.value ? props.showQuickJumper : false);
	return () => {
		const { align, simple, showTotal, showLessItems, jumpPrevIcon, jumpNextIcon, pageSizeOptions, disabled, classNames: paginationClassNames, styles, hideOnSinglePage, sizeChangerRender, showSizeChanger: showSizeChangerProp, totalBoundaryShowSizeChanger, itemRender } = props;
		const prefixCls = mergedPrefixCls.value;
		const selectPrefixCls = mergedSelectPrefixCls.value;
		const locale = mergedLocale.value;
		const total = mergedTotal.value;
		const showTitle = mergedShowTitle.value;
		const showPrevNextJumpers = mergedShowPrevNextJumpers.value;
		const totalBoundary = totalBoundaryShowSizeChanger ?? mergedTotalBoundaryShowSizeChanger.value;
		const showSizeChanger = showSizeChangerProp ?? total > totalBoundary;
		const mergedItemRender = itemRender || defaultItemRender;
		const { style, className } = getAttrStyleAndClass(attrs);
		const dataOrAriaAttributeProps = pickAttrs(attrs, {
			aria: true,
			data: true
		});
		if (hideOnSinglePage && total <= pageSize.value) return null;
		const itemClassName = paginationClassNames?.item;
		const itemStyle = styles?.item;
		let prev = renderPrev(prevPage.value);
		if (prev) {
			const prevDisabled = !hasPrev.value || !allPages.value;
			(function() {
				return prev;
			})();
			prev = createVNode("li", {
				"title": showTitle ? locale?.prev_page : void 0,
				"onClick": prevHandle,
				"tabindex": prevDisabled ? void 0 : 0,
				"onKeydown": runIfEnterPrev,
				"class": classNames(`${prefixCls}-prev`, itemClassName, { [`${prefixCls}-disabled`]: prevDisabled }),
				"style": itemStyle,
				"aria-disabled": prevDisabled
			}, [prev]);
		}
		let next = renderNext(nextPage.value);
		if (next) {
			let nextDisabled, nextTabIndex;
			if (simple) {
				nextDisabled = !hasNext.value;
				nextTabIndex = hasPrev.value ? 0 : null;
			} else {
				nextDisabled = !hasNext.value || !allPages.value;
				nextTabIndex = nextDisabled ? null : 0;
			}
			(function() {
				return next;
			})();
			next = createVNode("li", {
				"title": showTitle ? locale?.next_page : void 0,
				"onClick": nextHandle,
				"tabindex": nextTabIndex ?? void 0,
				"onKeydown": runIfEnterNext,
				"class": classNames(`${prefixCls}-next`, itemClassName, { [`${prefixCls}-disabled`]: nextDisabled }),
				"style": itemStyle,
				"aria-disabled": nextDisabled
			}, [next]);
		}
		const totalText = showTotal && createVNode("li", { "class": `${prefixCls}-total-text` }, [showTotal(total, [total === 0 ? 0 : (current.value - 1) * pageSize.value + 1, current.value * pageSize.value > total ? total : current.value * pageSize.value])]);
		const isReadOnly = typeof simple === "object" ? simple.readOnly : !simple;
		let gotoButton = goButton.value;
		let simplePager = null;
		if (simple) {
			if (goButton.value) {
				if (typeof goButton.value === "boolean") gotoButton = createVNode("button", {
					"type": "button",
					"onClick": handleGoTO,
					"onKeyup": handleGoTO
				}, [locale?.jump_to_confirm]);
				else gotoButton = createVNode("span", {
					"onClick": handleGoTO,
					"onKeyup": handleGoTO
				}, [goButton.value]);
				(function() {
					return gotoButton;
				})();
				gotoButton = createVNode("li", {
					"title": showTitle ? `${locale?.jump_to}${current.value}/${allPages.value}` : void 0,
					"class": `${prefixCls}-simple-pager`
				}, [gotoButton]);
			}
			simplePager = createVNode("li", {
				"title": showTitle ? `${current.value}/${allPages.value}` : void 0,
				"class": classNames(`${prefixCls}-simple-pager`, itemClassName),
				"style": itemStyle
			}, [
				isReadOnly ? internalInputVal.value : createVNode("input", {
					"type": "text",
					"aria-label": locale?.jump_to,
					"value": internalInputVal.value,
					"disabled": disabled,
					"onKeydown": handleKeyDown,
					"onKeyup": handleKeyUp,
					"onChange": handleKeyUp,
					"onBlur": handleBlur,
					"size": 3
				}, null),
				createVNode("span", { "class": `${prefixCls}-slash` }, [createTextVNode("/")]),
				allPages.value
			]);
		}
		const pagerProps = {
			rootPrefixCls: prefixCls,
			onClick: handleChange,
			onKeyPress: runIfEnter,
			showTitle,
			itemRender: mergedItemRender,
			page: -1,
			className: itemClassName,
			style: itemStyle
		};
		const pagerList = [];
		const pageBufferSize = showLessItems ? 1 : 2;
		if (allPages.value <= 3 + pageBufferSize * 2) {
			if (!allPages.value) pagerList.push(createVNode(Pager_default, mergeProps(pagerProps, {
				"key": "noPager",
				"page": 1,
				"className": `${prefixCls}-item-disabled`
			}), null));
			for (let i = 1; i <= allPages.value; i += 1) pagerList.push(createVNode(Pager_default, mergeProps(pagerProps, {
				"key": i,
				"page": i,
				"active": current.value === i
			}), null));
		} else {
			const prevItemTitle = showLessItems ? locale?.prev_3 : locale?.prev_5;
			const nextItemTitle = showLessItems ? locale?.next_3 : locale?.next_5;
			const jumpPrevContent = mergedItemRender(jumpPrevPage.value, "jump-prev", getItemIcon(jumpPrevIcon, "prev page"));
			const jumpNextContent = mergedItemRender(jumpNextPage.value, "jump-next", getItemIcon(jumpNextIcon, "next page"));
			let jumpPrev = null;
			let jumpNext = null;
			if (showPrevNextJumpers) {
				jumpPrev = jumpPrevContent ? createVNode("li", {
					"title": showTitle ? prevItemTitle : void 0,
					"key": "prev",
					"onClick": jumpPrevHandle,
					"tabindex": 0,
					"onKeydown": runIfEnterJumpPrev,
					"class": classNames(`${prefixCls}-jump-prev`, { [`${prefixCls}-jump-prev-custom-icon`]: !!jumpPrevIcon })
				}, [jumpPrevContent]) : null;
				jumpNext = jumpNextContent ? createVNode("li", {
					"title": showTitle ? nextItemTitle : void 0,
					"key": "next",
					"onClick": jumpNextHandle,
					"tabindex": 0,
					"onKeydown": runIfEnterJumpNext,
					"class": classNames(`${prefixCls}-jump-next`, { [`${prefixCls}-jump-next-custom-icon`]: !!jumpNextIcon })
				}, [jumpNextContent]) : null;
			}
			let left = Math.max(1, current.value - pageBufferSize);
			let right = Math.min(current.value + pageBufferSize, allPages.value);
			if (current.value - 1 <= pageBufferSize) right = 1 + pageBufferSize * 2;
			if (allPages.value - current.value <= pageBufferSize) left = allPages.value - pageBufferSize * 2;
			for (let i = left; i <= right; i += 1) pagerList.push(createVNode(Pager_default, mergeProps(pagerProps, {
				"key": i,
				"page": i,
				"active": current.value === i
			}), null));
			if (current.value - 1 >= pageBufferSize * 2 && current.value !== 3) {
				if (pagerList[0]) pagerList[0] = cloneElement(pagerList[0], { className: classNames(`${prefixCls}-item-after-jump-prev`, pagerList[0].props?.className) });
				pagerList.unshift(jumpPrev);
			}
			if (allPages.value - current.value >= pageBufferSize * 2 && current.value !== allPages.value - 2) {
				const lastOne = pagerList[pagerList.length - 1];
				if (lastOne) pagerList[pagerList.length - 1] = cloneElement(lastOne, { className: classNames(`${prefixCls}-item-before-jump-next`, lastOne.props?.className) });
				pagerList.push(jumpNext);
			}
			if (left !== 1) pagerList.unshift(createVNode(Pager_default, mergeProps(pagerProps, {
				"key": 1,
				"page": 1
			}), null));
			if (right !== allPages.value) pagerList.push(createVNode(Pager_default, mergeProps(pagerProps, {
				"key": allPages.value,
				"page": allPages.value
			}), null));
		}
		const cls = classNames(prefixCls, props.className, className, {
			[`${prefixCls}-start`]: align === "start",
			[`${prefixCls}-center`]: align === "center",
			[`${prefixCls}-end`]: align === "end",
			[`${prefixCls}-simple`]: simple,
			[`${prefixCls}-disabled`]: disabled
		});
		return createVNode("ul", mergeProps({
			"ref": paginationRef,
			"class": cls,
			"style": style
		}, dataOrAriaAttributeProps), [
			totalText,
			prev,
			simple ? simplePager : pagerList,
			next,
			createVNode(Options_default, {
				"locale": locale,
				"rootPrefixCls": prefixCls,
				"disabled": disabled,
				"selectPrefixCls": selectPrefixCls,
				"changeSize": changePageSize,
				"pageSizeOptions": pageSizeOptions,
				"pageSize": pageSize.value,
				"quickGo": shouldDisplayQuickJumper.value ? handleChange : void 0,
				"goButton": gotoButton,
				"showSizeChanger": showSizeChanger,
				"sizeChangerRender": sizeChangerRender
			}, null)
		]);
	};
}, {
	props: {
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onShowSizeChange: {
			type: Function,
			required: false,
			default: void 0
		},
		itemRender: {
			type: Function,
			required: false,
			default: void 0
		},
		showTotal: {
			type: Function,
			required: false,
			default: void 0
		},
		role: {
			type: [String, null],
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		selectPrefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		pageSizeOptions: {
			type: Array,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: false,
			default: void 0
		},
		defaultCurrent: {
			type: Number,
			required: false,
			default: void 0
		},
		total: {
			type: Number,
			required: false,
			default: void 0
		},
		totalBoundaryShowSizeChanger: {
			type: Number,
			required: false,
			default: void 0
		},
		pageSize: {
			type: Number,
			required: false,
			default: void 0
		},
		defaultPageSize: {
			type: Number,
			required: false,
			default: void 0
		},
		hideOnSinglePage: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: String,
			required: false,
			default: void 0
		},
		showSizeChanger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		sizeChangerRender: {
			type: Function,
			required: false,
			default: void 0
		},
		showLessItems: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showPrevNextJumpers: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showQuickJumper: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		showTitle: {
			type: Boolean,
			required: false,
			default: void 0
		},
		simple: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false,
			default: void 0
		},
		prevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		nextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		jumpPrevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		jumpNextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		}
	},
	name: "VCPagination",
	inheritAttrs: false
});
export { Pagination_default as default };
