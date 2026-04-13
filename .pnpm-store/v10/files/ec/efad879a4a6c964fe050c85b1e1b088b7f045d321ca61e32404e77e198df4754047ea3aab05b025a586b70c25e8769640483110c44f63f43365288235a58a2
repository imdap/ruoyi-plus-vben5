import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import LockOutlinedSvg from "@ant-design/icons-svg/es/asn/LockOutlined.js";

//#region src/icons/LockOutlined.tsx
/**![lock](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgzMiA0NjRoLTY4VjI0MGMwLTcwLjctNTcuMy0xMjgtMTI4LTEyOEgzODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4djIyNGgtNjhjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjM4NGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWNDk2YzAtMTcuNy0xNC4zLTMyLTMyLTMyek0zMzIgMjQwYzAtMzAuOSAyNS4xLTU2IDU2LTU2aDI0OGMzMC45IDAgNTYgMjUuMSA1NiA1NnYyMjRIMzMyVjI0MHptNDYwIDYwMEgyMzJWNTM2aDU2MHYzMDR6TTQ4NCA3MDF2NTNjMCA0LjQgMy42IDggOCA4aDQwYzQuNCAwIDgtMy42IDgtOHYtNTNhNDguMDEgNDguMDEgMCAxMC01NiAweiIgLz48L3N2Zz4=) */
const LockOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": LockOutlinedSvg }), null);
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
	name: "LockOutlined"
});

//#endregion
export { LockOutlined as default };