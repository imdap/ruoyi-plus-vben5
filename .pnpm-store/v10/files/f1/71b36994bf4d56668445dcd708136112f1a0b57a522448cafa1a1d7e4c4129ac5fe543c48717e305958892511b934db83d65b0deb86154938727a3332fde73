import radio_default$1 from "./radio.js";
import group_default from "./group.js";
import radioButton_default from "./radioButton.js";

//#region src/radio/index.tsx
const RadioGroup = group_default;
const RadioButton = radioButton_default;
radio_default$1.Button = radioButton_default;
radio_default$1.Group = group_default;
radio_default$1.__ANT_RADIO = true;
radio_default$1.install = (app) => {
	app.component(radio_default$1.name, radio_default$1);
	app.component(RadioGroup.name, RadioGroup);
	app.component(RadioButton.name, RadioButton);
};
var radio_default = radio_default$1;

//#endregion
export { RadioButton, RadioGroup, radio_default as default };