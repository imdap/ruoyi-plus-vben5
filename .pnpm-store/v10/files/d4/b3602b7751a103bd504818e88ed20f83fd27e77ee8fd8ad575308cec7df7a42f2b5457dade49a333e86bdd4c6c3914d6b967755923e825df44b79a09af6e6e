import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import LockFilledSvg from "@ant-design/icons-svg/es/asn/LockFilled.js";

//#region src/icons/LockFilled.tsx
/**![lock](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgzMiA0NjRoLTY4VjI0MGMwLTcwLjctNTcuMy0xMjgtMTI4LTEyOEgzODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4djIyNGgtNjhjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjM4NGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWNDk2YzAtMTcuNy0xNC4zLTMyLTMyLTMyek01NDAgNzAxdjUzYzAgNC40LTMuNiA4LTggOGgtNDBjLTQuNCAwLTgtMy42LTgtOHYtNTNhNDguMDEgNDguMDEgMCAxMTU2IDB6bTE1Mi0yMzdIMzMyVjI0MGMwLTMwLjkgMjUuMS01NiA1Ni01NmgyNDhjMzAuOSAwIDU2IDI1LjEgNTYgNTZ2MjI0eiIgLz48L3N2Zz4=) */
const LockFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": LockFilledSvg }), null);
	};
}, {
	props: {
		twoToneColor: {
			type: [String, Array],
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		tabIndex: {
			type: Number,
			required: false
		},
		spin: {
			type: Boolean,
			required: false
		},
		rotate: {
			type: Number,
			required: false
		}
	},
	name: "LockFilled"
});

//#endregion
export { LockFilled as default };