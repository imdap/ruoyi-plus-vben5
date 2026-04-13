import Input_default from "./Input.js";
import Group_default from "./Group.js";
import OTP_default from "./OTP/index.js";
import Password_default from "./Password.js";
import Search_default from "./Search.js";
import TextArea_default from "./TextArea.js";

//#region src/input/index.tsx
const CompoundedInput = Input_default;
CompoundedInput.Search = Search_default;
CompoundedInput.TextArea = TextArea_default;
CompoundedInput.Password = Password_default;
CompoundedInput.OTP = OTP_default;
CompoundedInput.Group = Group_default;
CompoundedInput.install = (app) => {
	app.component(Input_default.name, CompoundedInput);
	app.component(Search_default.name, Search_default);
	app.component(TextArea_default.name, TextArea_default);
	app.component(Password_default.name, Password_default);
	app.component(OTP_default.name, OTP_default);
	app.component(Group_default.name, Group_default);
	return app;
};
var input_default = CompoundedInput;
const InputGroup = Group_default;
const InputOTP = OTP_default;
const InputPassword = Password_default;
const InputSearch = Search_default;

//#endregion
export { InputGroup, InputOTP, InputPassword, InputSearch, TextArea_default as TextArea, input_default as default };