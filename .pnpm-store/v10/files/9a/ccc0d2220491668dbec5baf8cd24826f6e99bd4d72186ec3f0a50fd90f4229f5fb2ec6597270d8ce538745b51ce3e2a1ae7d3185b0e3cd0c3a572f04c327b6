import { inject, provide } from "vue";
var SharedPanelContextKey = Symbol("SharedPanelContext");
function provideSharedPanelContext(context) {
	provide(SharedPanelContextKey, context);
}
function useSharedPanelContext() {
	return inject(SharedPanelContextKey, null);
}
var PanelContextKey = Symbol("PanelContext");
function providePanelContext(context) {
	provide(PanelContextKey, context);
}
function usePanelContext() {
	return inject(PanelContextKey, null);
}
function useInfo(props, panelType, sharedContext) {
	const ctx = sharedContext ?? useSharedPanelContext();
	const classNames = ctx?.value.classNames;
	const styles = ctx?.value.styles;
	const { prefixCls, generateConfig, locale, disabledDate, minDate, maxDate, cellRender, hoverValue, hoverRangeValue, onHover, values, pickerValue, onSelect, prevIcon, nextIcon, superPrevIcon, superNextIcon } = props;
	const now = generateConfig.getNow();
	return [{
		now,
		values,
		pickerValue,
		prefixCls,
		classNames,
		styles,
		disabledDate,
		minDate,
		maxDate,
		cellRender,
		hoverValue,
		hoverRangeValue,
		onHover,
		locale,
		generateConfig,
		onSelect,
		panelType,
		prevIcon,
		nextIcon,
		superPrevIcon,
		superNextIcon
	}, now];
}
var PickerHackContextKey = Symbol("PickerHackContext");
function providePickerHackContext(context) {
	provide(PickerHackContextKey, context);
}
function usePickerHackContext() {
	return inject(PickerHackContextKey, null);
}
export { providePanelContext, providePickerHackContext, provideSharedPanelContext, useInfo, usePanelContext, usePickerHackContext, useSharedPanelContext };
