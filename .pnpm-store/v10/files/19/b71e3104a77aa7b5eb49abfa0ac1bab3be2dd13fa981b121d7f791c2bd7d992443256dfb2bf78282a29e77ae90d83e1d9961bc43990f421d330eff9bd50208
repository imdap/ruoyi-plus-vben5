import SummaryCell from "./Cell.js";
import FooterRow from "./Row.js";
import { defineComponent } from "vue";
//#region src/Footer/Summary.tsx
var Summary = /* @__PURE__ */ defineComponent({
	name: "TableSummary",
	props: ["fixed"],
	setup(_props, { slots }) {
		return () => slots.default?.();
	}
});
Summary.Row = FooterRow;
Summary.Cell = SummaryCell;
//#endregion
export { Summary as default };
