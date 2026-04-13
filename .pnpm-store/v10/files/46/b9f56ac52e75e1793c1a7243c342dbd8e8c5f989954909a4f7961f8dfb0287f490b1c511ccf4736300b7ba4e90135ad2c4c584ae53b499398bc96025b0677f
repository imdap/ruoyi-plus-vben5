import { getSlotPropsFnRun } from "../_util/tools.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import en_US_default from "../locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import button_default from "../button/index.js";
import { Fragment, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { CloseOutlined } from "@antdv-next/icons";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/tour/panelRender.tsx
const TourPanel = /* @__PURE__ */ defineComponent((props) => {
	const [contextLocaleGlobal] = useLocale_default("global", en_US_default.global);
	const [contextLocaleTour] = useLocale_default("Tour", en_US_default.Tour);
	return () => {
		const { stepProps, current, type, indicatorsRender, actionsRender } = props;
		const { prefixCls, total = 1, title, onClose, onPrev, onNext, onFinish, cover, description, nextButtonProps, prevButtonProps, type: stepType, closable, classes = {}, styles = {} } = stepProps;
		const ariaProps = pickAttrs(closable ?? {}, true);
		const mergedType = stepType ?? type;
		const mergedCloseIcon = createVNode("button", mergeProps({
			"type": "button",
			"onClick": onClose,
			"class": `${prefixCls}-close`,
			"aria-label": contextLocaleGlobal?.value.close
		}, ariaProps), [closable?.closeIcon || createVNode(CloseOutlined, { "class": `${prefixCls}-close-icon` }, null)]);
		const isLastStep = current === total - 1;
		const prevBtnClick = () => {
			onPrev?.();
			prevButtonProps?.onClick?.();
		};
		const nextBtnClick = () => {
			if (isLastStep) onFinish?.();
			else onNext?.();
			nextButtonProps?.onClick?.();
		};
		const _title = getSlotPropsFnRun({}, { title }, "title");
		const headerNode = isNonNullable_default(_title) ? createVNode("div", {
			"class": clsx(`${prefixCls}-header`, classes.header),
			"style": styles.header
		}, [createVNode("div", {
			"class": clsx(`${prefixCls}-title`, classes.title),
			"style": styles.title
		}, [_title])]) : null;
		const _description = getSlotPropsFnRun({}, { description }, "description");
		const descriptionNode = isNonNullable_default(_description) ? createVNode("div", {
			"class": clsx(`${prefixCls}-description`, classes.description),
			"style": styles.description
		}, [_description]) : null;
		const _cover = getSlotPropsFnRun({}, { cover }, "cover");
		const coverNode = isNonNullable_default(_cover) ? createVNode("div", {
			"class": clsx(`${prefixCls}-cover`, classes.cover),
			"style": styles.cover
		}, [_cover]) : null;
		let mergedIndicatorNode;
		if (indicatorsRender) mergedIndicatorNode = indicatorsRender(current, total);
		else mergedIndicatorNode = [...Array.from({ length: total }).keys()].map((stepItem, index) => createVNode("span", {
			"key": stepItem,
			"class": clsx(index === current && `${prefixCls}-indicator-active`, `${prefixCls}-indicator`, classes.indicator),
			"style": styles.indicator
		}, null));
		const mainBtnType = mergedType === "primary" ? "default" : "primary";
		const secondaryBtnProps = {
			type: "default",
			ghost: mergedType === "primary"
		};
		const prevButtonPropsChild = getSlotPropsFnRun({}, prevButtonProps ?? {}, "children");
		let _prevBtn = props?.prevButtonProps?.({
			current,
			isFirst: current === 0,
			isLast: isLastStep
		});
		_prevBtn = Array.isArray(_prevBtn) ? _prevBtn : [_prevBtn];
		_prevBtn = filterEmpty(_prevBtn).filter(Boolean);
		if (!_prevBtn.length) _prevBtn = prevButtonPropsChild;
		const nextButtonPropsChild = getSlotPropsFnRun({}, nextButtonProps ?? {}, "children");
		let _nextBtn = props?.nextButtonProps?.({
			current,
			isFirst: current === 0,
			isLast: isLastStep
		});
		_nextBtn = Array.isArray(_nextBtn) ? _nextBtn : [_nextBtn];
		_nextBtn = filterEmpty(_nextBtn).filter(Boolean);
		if (!_nextBtn.length) _nextBtn = nextButtonPropsChild;
		const defaultActionsNode = createVNode(Fragment, null, [current !== 0 ? createVNode(button_default, mergeProps({ "size": "small" }, secondaryBtnProps, prevButtonProps, {
			"onClick": prevBtnClick,
			"class": clsx(`${prefixCls}-prev-btn`, prevButtonProps?.class)
		}), { default: () => [_prevBtn ?? contextLocaleTour?.value?.Previous] }) : null, createVNode(button_default, mergeProps({
			"size": "small",
			"type": mainBtnType
		}, nextButtonProps, {
			"onClick": nextBtnClick,
			"class": clsx(`${prefixCls}-next-btn`, nextButtonProps?.class)
		}), { default: () => [_nextBtn ?? (isLastStep ? contextLocaleTour?.value?.Finish : contextLocaleTour?.value?.Next)] })]);
		return createVNode("div", { "class": `${prefixCls}-panel` }, [createVNode("div", {
			"class": clsx(`${prefixCls}-section`, classes.section),
			"style": styles.section
		}, [
			closable && mergedCloseIcon,
			coverNode,
			headerNode,
			descriptionNode,
			createVNode("div", {
				"class": clsx(`${prefixCls}-footer`, classes.footer),
				"style": styles.footer
			}, [total > 1 && createVNode("div", {
				"class": clsx(`${prefixCls}-indicators`, classes.indicators),
				"style": styles.indicators
			}, [mergedIndicatorNode]), createVNode("div", {
				"class": clsx(`${prefixCls}-actions`, classes.actions),
				"style": styles.actions
			}, [actionsRender ? actionsRender(defaultActionsNode, {
				current,
				total
			}) : defaultActionsNode])])
		])]);
	};
}, {
	props: {
		stepProps: {
			type: Object,
			required: true
		},
		current: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: false
		},
		indicatorsRender: {
			type: Function,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		actionsRender: {
			type: Function,
			required: false
		},
		prevButtonProps: {
			type: Function,
			required: false
		},
		nextButtonProps: {
			type: Function,
			required: false
		}
	},
	name: "TourPanel",
	inheritAttrs: false
});
var panelRender_default = TourPanel;

//#endregion
export { panelRender_default as default };