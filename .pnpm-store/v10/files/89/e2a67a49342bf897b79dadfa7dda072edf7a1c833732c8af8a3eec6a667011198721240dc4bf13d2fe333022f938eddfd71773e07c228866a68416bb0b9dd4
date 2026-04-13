import Typography_default from "./Typography.js";
import Link_default from "./Link.js";
import Paragraph_default from "./Paragraph.js";
import Text_default from "./Text.js";
import Title_default from "./Title.js";

//#region src/typography/index.tsx
const TypographyText = Text_default;
const TypographyLink = Link_default;
const TypographyTitle = Title_default;
const TypographyParagraph = Paragraph_default;
const Typography = Typography_default;
Typography.Text = Text_default;
Typography.Link = Link_default;
Typography.Title = Title_default;
Typography.Paragraph = Paragraph_default;
Typography.install = (app) => {
	app.component(Typography.name, Typography);
	app.component(Text_default.name, Text_default);
	app.component(Link_default.name, Link_default);
	app.component(Title_default.name, Title_default);
	app.component(Paragraph_default.name, Paragraph_default);
};
var typography_default = Typography;

//#endregion
export { TypographyLink, TypographyParagraph, TypographyText, TypographyTitle, typography_default as default };