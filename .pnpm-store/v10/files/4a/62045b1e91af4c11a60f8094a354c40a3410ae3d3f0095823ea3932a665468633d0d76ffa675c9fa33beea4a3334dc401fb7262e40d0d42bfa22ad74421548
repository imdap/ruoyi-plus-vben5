import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import PlayCircleFilledSvg from "@ant-design/icons-svg/es/asn/PlayCircleFilled.js";

//#region src/icons/PlayCircleFilled.tsx
/**![play-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0xNDQuMSA0NTQuOUw0MzcuNyA2NzcuOGE4LjAyIDguMDIgMCAwMS0xMi43LTYuNVYzNTMuN2E4IDggMCAwMTEyLjctNi41TDY1Ni4xIDUwNmE3LjkgNy45IDAgMDEwIDEyLjl6IiAvPjwvc3ZnPg==) */
const PlayCircleFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": PlayCircleFilledSvg }), null);
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
	name: "PlayCircleFilled"
});

//#endregion
export { PlayCircleFilled as default };