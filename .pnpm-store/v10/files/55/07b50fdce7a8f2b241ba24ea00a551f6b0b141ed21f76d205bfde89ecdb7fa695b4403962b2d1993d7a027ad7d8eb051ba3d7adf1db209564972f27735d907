import Actions_default from "./Actions.js";
import search_default from "./search.js";
import Section_default from "./Section.js";
import Transfer_default from "./Transfer.js";

//#region src/transfer/index.tsx
const InternalTransfer = Transfer_default;
InternalTransfer.List = Section_default;
InternalTransfer.Search = search_default;
InternalTransfer.Operation = Actions_default;
InternalTransfer.install = (app) => {
	app.component(Transfer_default.name, Transfer_default);
	app.component(Section_default.name, Section_default);
	app.component(search_default.name, search_default);
	app.component(Actions_default.name, Actions_default);
	return app;
};
var transfer_default = InternalTransfer;

//#endregion
export { transfer_default as default };