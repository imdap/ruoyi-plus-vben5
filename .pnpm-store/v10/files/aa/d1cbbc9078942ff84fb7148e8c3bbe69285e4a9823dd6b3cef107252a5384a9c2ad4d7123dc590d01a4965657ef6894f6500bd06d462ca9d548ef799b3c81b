import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import WalletOutlinedSvg from "@ant-design/icons-svg/es/asn/WalletOutlined.js";

//#region src/icons/WalletOutlined.tsx
/**![wallet](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDQ2NEg1MjhWNDQ4aDMxMnYxMjh6bTAgMjY0SDE4NFYxODRoNjU2djIwMEg0OTZjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjE5MmMwIDE3LjcgMTQuMyAzMiAzMiAzMmgzNDR2MjAwek01ODAgNTEyYTQwIDQwIDAgMTA4MCAwIDQwIDQwIDAgMTAtODAgMHoiIC8+PC9zdmc+) */
const WalletOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": WalletOutlinedSvg }), null);
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
	name: "WalletOutlined"
});

//#endregion
export { WalletOutlined as default };