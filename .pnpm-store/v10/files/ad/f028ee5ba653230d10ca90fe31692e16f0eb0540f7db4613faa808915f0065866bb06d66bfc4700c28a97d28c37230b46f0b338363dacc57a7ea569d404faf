import Sider_default, { useSiderCtx } from "./Sider.js";
import layout_default$1, { Content, Footer, Header } from "./layout.js";

//#region src/layout/index.tsx
const useLayoutSider = useSiderCtx;
layout_default$1.install = (app) => {
	app.component(layout_default$1.name, layout_default$1);
	app.component(Header.name, Header);
	app.component(Footer.name, Footer);
	app.component(Content.name, Content);
	app.component(Sider_default.name, Sider_default);
	return app;
};
const LayoutHeader = Header;
const LayoutFooter = Footer;
const LayoutContent = Content;
const LayoutSider = Sider_default;
var layout_default = layout_default$1;

//#endregion
export { LayoutContent, LayoutFooter, LayoutHeader, LayoutSider, layout_default as default, useLayoutSider };