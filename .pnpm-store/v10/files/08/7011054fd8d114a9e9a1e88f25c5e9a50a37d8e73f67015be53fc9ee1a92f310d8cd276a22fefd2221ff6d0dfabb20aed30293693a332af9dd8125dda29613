import Card_default from "./Card.js";
import CardGrid_default from "./CardGrid.js";
import CardMeta_default from "./CardMeta.js";

//#region src/card/index.tsx
Card_default.Grid = CardGrid_default;
Card_default.Meta = CardMeta_default;
Card_default.install = (app) => {
	app.component(Card_default.name, Card_default);
	app.component(CardGrid_default.name, CardGrid_default);
	app.component(CardMeta_default.name, CardMeta_default);
};
var card_default = Card_default;

//#endregion
export { CardGrid_default as CardGrid, CardMeta_default as CardMeta, card_default as default };