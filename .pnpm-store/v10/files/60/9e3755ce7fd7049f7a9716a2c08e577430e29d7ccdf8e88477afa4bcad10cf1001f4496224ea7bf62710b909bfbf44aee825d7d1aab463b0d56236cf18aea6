import { warning } from "@v-c/util";
function legacyPropsWarning(props) {
	const { picker, disabledHours, disabledMinutes, disabledSeconds } = props;
	if (picker === "time" && (disabledHours || disabledMinutes || disabledSeconds)) warning(false, `'disabledHours', 'disabledMinutes', 'disabledSeconds' will be removed in the next major version, please use 'disabledTime' instead.`);
}
export { legacyPropsWarning };
