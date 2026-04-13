import Upload_default, { LIST_IGNORE } from "./Upload.js";
import Dragger_default from "./Dragger.js";

//#region src/upload/index.tsx
const Upload = Upload_default;
Upload.Dragger = Dragger_default;
Upload.LIST_IGNORE = LIST_IGNORE;
Upload.install = (app) => {
	app.component(Upload_default.name, Upload);
	app.component(Dragger_default.name, Dragger_default);
	return app;
};
const UploadDragger = Dragger_default;
var upload_default = Upload;

//#endregion
export { UploadDragger, upload_default as default };