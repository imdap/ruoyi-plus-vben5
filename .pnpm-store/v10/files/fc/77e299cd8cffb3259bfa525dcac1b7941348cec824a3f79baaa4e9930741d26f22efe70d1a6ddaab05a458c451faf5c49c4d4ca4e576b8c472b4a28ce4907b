import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import DeleteFilledSvg from "@ant-design/icons-svg/es/asn/DeleteFilled.js";

//#region src/icons/DeleteFilled.tsx
/**![delete](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2NCAyNTZINzM2di04MGMwLTM1LjMtMjguNy02NC02NC02NEgzNTJjLTM1LjMgMC02NCAyOC43LTY0IDY0djgwSDE2MGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MzJjMCA0LjQgMy42IDggOCA4aDYwLjRsMjQuNyA1MjNjMS42IDM0LjEgMjkuOCA2MSA2My45IDYxaDQ1NGMzNC4yIDAgNjIuMy0yNi44IDYzLjktNjFsMjQuNy01MjNIODg4YzQuNCAwIDgtMy42IDgtOHYtMzJjMC0xNy43LTE0LjMtMzItMzItMzJ6bS0yMDAgMEgzNjB2LTcyaDMwNHY3MnoiIC8+PC9zdmc+) */
const DeleteFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": DeleteFilledSvg }), null);
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
	name: "DeleteFilled"
});

//#endregion
export { DeleteFilled as default };