import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import BulbFilledSvg from "@ant-design/icons-svg/es/asn/BulbFilled.js";

//#region src/icons/BulbFilled.tsx
/**![bulb](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM0OCA2NzYuMUMyNTAgNjE5LjQgMTg0IDUxMy40IDE4NCAzOTJjMC0xODEuMSAxNDYuOS0zMjggMzI4LTMyOHMzMjggMTQ2LjkgMzI4IDMyOGMwIDEyMS40LTY2IDIyNy40LTE2NCAyODQuMVY3OTJjMCAxNy43LTE0LjMgMzItMzIgMzJIMzgwYy0xNy43IDAtMzItMTQuMy0zMi0zMlY2NzYuMXpNMzkyIDg4OGgyNDBjNC40IDAgOCAzLjYgOCA4djMyYzAgMTcuNy0xNC4zIDMyLTMyIDMySDQxNmMtMTcuNyAwLTMyLTE0LjMtMzItMzJ2LTMyYzAtNC40IDMuNi04IDgtOHoiIC8+PC9zdmc+) */
const BulbFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": BulbFilledSvg }), null);
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
	name: "BulbFilled"
});

//#endregion
export { BulbFilled as default };