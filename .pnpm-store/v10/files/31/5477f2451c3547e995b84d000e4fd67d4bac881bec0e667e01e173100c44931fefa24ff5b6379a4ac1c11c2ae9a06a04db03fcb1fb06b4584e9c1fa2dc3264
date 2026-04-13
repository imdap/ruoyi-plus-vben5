import button_default from "../button/index.js";
import spin_default from "../spin/index.js";
import { Fragment, createVNode, defineComponent } from "vue";
import { ReloadOutlined } from "@antdv-next/icons";

//#region src/qrcode/QrcodeStatus.tsx
const defaultSpin = createVNode(spin_default, null, null);
const QRcodeStatus = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, locale, onRefresh, statusRender, status } = props;
		const defaultNodes = {
			expired: createVNode(Fragment, null, [createVNode("p", { "class": `${prefixCls}-expired` }, [locale?.expired]), onRefresh && createVNode(button_default, {
				"type": "link",
				"icon": () => createVNode(ReloadOutlined, null, null),
				"onClick": onRefresh
			}, { default: () => [locale?.refresh] })]),
			loading: defaultSpin,
			scanned: createVNode("p", { "class": `${prefixCls}-scanned` }, [locale?.scanned])
		};
		const defaultStatusRender = (info) => defaultNodes[info.status];
		return (statusRender ?? defaultStatusRender)({
			status,
			locale,
			onRefresh
		});
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true
	},
	locale: {
		type: Object,
		required: false
	},
	onRefresh: {
		type: Function,
		required: false
	},
	statusRender: {
		type: Function,
		required: false
	},
	status: { required: true }
} });
var QrcodeStatus_default = QRcodeStatus;

//#endregion
export { QrcodeStatus_default as default };