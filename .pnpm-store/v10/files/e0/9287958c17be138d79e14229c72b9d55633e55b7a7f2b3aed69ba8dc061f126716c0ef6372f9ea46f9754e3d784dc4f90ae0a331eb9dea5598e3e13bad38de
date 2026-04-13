//#region src/notification/util.ts
function getPlacementStyle(placement, top, bottom) {
	let style;
	switch (placement) {
		case "top":
			style = {
				left: "50%",
				transform: "translateX(-50%)",
				right: "auto",
				top: `${top}px`,
				bottom: "auto"
			};
			break;
		case "topLeft":
			style = {
				left: 0,
				top: `${top}px`,
				bottom: "auto"
			};
			break;
		case "topRight":
			style = {
				right: 0,
				top: `${top}px`,
				bottom: "auto"
			};
			break;
		case "bottom":
			style = {
				left: "50%",
				transform: "translateX(-50%)",
				right: "auto",
				top: "auto",
				bottom: `${bottom}px`
			};
			break;
		case "bottomLeft":
			style = {
				left: 0,
				top: "auto",
				bottom: `${bottom}px`
			};
			break;
		default:
			style = {
				right: 0,
				top: "auto",
				bottom: `${bottom}px`
			};
			break;
	}
	return style;
}
function getMotion(prefixCls) {
	return { name: `${prefixCls}-fade` };
}
function getCloseIconConfig(closeIcon, notificationConfig, notification) {
	if (typeof closeIcon !== "undefined") return closeIcon;
	if (typeof notificationConfig?.closeIcon !== "undefined") return notificationConfig.closeIcon;
	return notification?.closeIcon;
}

//#endregion
export { getCloseIconConfig, getMotion, getPlacementStyle };