import { clsx } from "@v-c/util";

//#region src/_util/statusUtils.ts
function getStatusClassNames(prefixCls, status, hasFeedback) {
	return clsx({
		[`${prefixCls}-status-success`]: status === "success",
		[`${prefixCls}-status-warning`]: status === "warning",
		[`${prefixCls}-status-error`]: status === "error",
		[`${prefixCls}-status-validating`]: status === "validating",
		[`${prefixCls}-has-feedback`]: hasFeedback
	});
}
function getMergedStatus(contextStatus, customStatus) {
	return customStatus || contextStatus;
}

//#endregion
export { getMergedStatus, getStatusClassNames };