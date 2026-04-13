import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import MailFilledSvg from "@ant-design/icons-svg/es/asn/MailFilled.js";

//#region src/icons/MailFilled.tsx
/**![mail](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyOCAxNjBIOTZjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjY0MGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg4MzJjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTkyYzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tODAuOCAxMDguOUw1MzEuNyA1MTQuNGMtNy44IDYuMS0xOC43IDYuMS0yNi41IDBMMTg5LjYgMjY4LjlBNy4yIDcuMiAwIDAxMTk0IDI1Nmg2NDguOGE3LjIgNy4yIDAgMDE0LjQgMTIuOXoiIC8+PC9zdmc+) */
const MailFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": MailFilledSvg }), null);
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
	name: "MailFilled"
});

//#endregion
export { MailFilled as default };