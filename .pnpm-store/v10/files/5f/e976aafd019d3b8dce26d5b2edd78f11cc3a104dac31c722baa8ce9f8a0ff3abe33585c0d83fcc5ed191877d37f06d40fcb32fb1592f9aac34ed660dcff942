import { useSiderCtx } from "../layout/Sider.js";
import MenuDivider_default from "./MenuDivider.js";
import MenuItem_default from "./MenuItem.js";
import SubMenu_default from "./SubMenu.js";
import menu_default$1 from "./menu.js";
import MenuItemGroup_default from "./MenuItemGroup.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";

//#region src/menu/index.tsx
const Menu = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	const menuRef = shallowRef();
	const { siderCollapsed } = useSiderCtx();
	expose({
		menu: computed(() => menuRef?.value?.menu),
		focus: (options) => {
			menuRef.value?.menu?.focus?.(options);
		}
	});
	return () => {
		const events = {
			"onClick": (info) => emit("click", info),
			"onSelect": (info) => emit("select", info),
			"onDeselect": (info) => emit("deselect", info),
			"onOpenChange": (openKeys) => emit("openChange", openKeys),
			"onUpdate:openKeys": (openKeys) => emit("update:openKeys", openKeys),
			"onUpdate:selectedKeys": (selectedKeys) => emit("update:selectedKeys", selectedKeys)
		};
		return createVNode(menu_default$1, mergeProps({ "ref": menuRef }, attrs, props, events, { "siderCollapsed": siderCollapsed?.value }), slots);
	};
}, {
	props: {
		theme: {
			type: String,
			required: false
		},
		inlineIndent: {
			type: Number,
			required: false
		},
		_internalDisableMenuItemTitleTooltip: {
			type: Boolean,
			required: false,
			default: void 0
		},
		items: {
			type: Array,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		extraRender: {
			type: Function,
			required: false
		},
		iconRender: {
			type: Function,
			required: false
		},
		itemIcon: {
			type: Function,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledOverflow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false
		},
		mode: { required: false },
		inlineCollapsed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpenKeys: {
			type: Array,
			required: false
		},
		openKeys: {
			type: Array,
			required: false
		},
		selectable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultSelectedKeys: {
			type: Array,
			required: false
		},
		selectedKeys: {
			type: Array,
			required: false
		},
		motion: {
			type: Object,
			required: false
		},
		defaultMotions: {
			type: Object,
			required: false
		},
		subMenuOpenDelay: {
			type: Number,
			required: false
		},
		subMenuCloseDelay: {
			type: Number,
			required: false
		},
		forceSubMenuRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		triggerSubMenuAction: { required: false },
		builtinPlacements: { required: false },
		expandIcon: { required: false },
		overflowedIndicator: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		overflowedIndicatorPopupClassName: {
			type: String,
			required: false
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		_internalRenderMenuItem: {
			type: Function,
			required: false
		},
		_internalRenderSubMenuItem: {
			type: Function,
			required: false
		},
		popupRender: { required: false },
		id: {
			type: String,
			required: false
		}
	},
	emits: [
		"click",
		"select",
		"deselect",
		"openChange",
		"update:openKeys",
		"update:selectedKeys"
	],
	name: "AMenu",
	inheritAttrs: false
});
Menu.Item = MenuItem_default;
Menu.SubMenu = SubMenu_default;
Menu.ItemGroup = MenuItemGroup_default;
Menu.Divider = MenuDivider_default;
Menu.install = (app) => {
	app.component(Menu.name, Menu);
	app.component(MenuItem_default.name, MenuItem_default);
	app.component(SubMenu_default.name, SubMenu_default);
	app.component(MenuItemGroup_default.name, MenuItemGroup_default);
	app.component(MenuDivider_default.name, MenuDivider_default);
};
const MenuItem = MenuItem_default;
var menu_default = Menu;

//#endregion
export { MenuDivider_default as MenuDivider, MenuItem, MenuItemGroup_default as MenuItemGroup, SubMenu_default as SubMenu, menu_default as default };