var urlReg;
var url_default = () => {
	if (urlReg) return urlReg;
	const word = "[a-fA-F\\d:]";
	const b = (options) => options && options.includeBoundaries ? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` : "";
	const v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
	const v6seg = "[a-fA-F\\d]{1,4}";
	const v6 = `(?:${[
		`(?:${v6seg}:){7}(?:${v6seg}|:)`,
		`(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)`,
		`(?:${v6seg}:){5}(?::${v4}|(?::${v6seg}){1,2}|:)`,
		`(?:${v6seg}:){4}(?:(?::${v6seg}){0,1}:${v4}|(?::${v6seg}){1,3}|:)`,
		`(?:${v6seg}:){3}(?:(?::${v6seg}){0,2}:${v4}|(?::${v6seg}){1,4}|:)`,
		`(?:${v6seg}:){2}(?:(?::${v6seg}){0,3}:${v4}|(?::${v6seg}){1,5}|:)`,
		`(?:${v6seg}:){1}(?:(?::${v6seg}){0,4}:${v4}|(?::${v6seg}){1,6}|:)`,
		`(?::(?:(?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))`
	].join("|")})(?:%[0-9a-zA-Z]{1,})?`;
	const v46Exact = /* @__PURE__ */ new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
	const v4exact = /* @__PURE__ */ new RegExp(`^${v4}$`);
	const v6exact = /* @__PURE__ */ new RegExp(`^${v6}$`);
	const ip = (options) => options && options.exact ? v46Exact : new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, "g");
	ip.v4 = (options) => options && options.exact ? v4exact : new RegExp(`${b(options)}${v4}${b(options)}`, "g");
	ip.v6 = (options) => options && options.exact ? v6exact : new RegExp(`${b(options)}${v6}${b(options)}`, "g");
	const regex = `(?:(?:(?:[a-z]+:)?//)|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${ip.v4().source}|${ip.v6().source}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`;
	urlReg = new RegExp(`(?:^${regex}$)`, "i");
	return urlReg;
};
export { url_default as default };
