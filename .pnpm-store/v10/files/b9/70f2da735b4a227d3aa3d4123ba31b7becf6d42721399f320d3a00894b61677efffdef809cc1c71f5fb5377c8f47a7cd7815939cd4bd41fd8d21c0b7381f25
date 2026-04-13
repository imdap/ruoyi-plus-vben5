import { genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { genNoticeStyle, prepareComponentToken, prepareNotificationToken } from "./index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/notification/style/pure-panel.ts
var pure_panel_default = genSubStyleComponent(["Notification", "PurePanel"], (token) => {
	const noticeCls = `${token.componentCls}-notice`;
	const notificationToken = prepareNotificationToken(token);
	return { [`${noticeCls}-pure-panel`]: {
		...genNoticeStyle(notificationToken),
		width: notificationToken.width,
		maxWidth: `calc(100vw - ${unit(token.calc(notificationToken.notificationMarginEdge).mul(2).equal())})`,
		margin: 0
	} };
}, prepareComponentToken);

//#endregion
export { pure_panel_default as default };