//#region ../../node_modules/.pnpm/prettier@3.8.1/node_modules/prettier/plugins/glimmer.mjs
var Un = Object.defineProperty;
var Oe = (e, t) => {
	for (var r in t) Un(e, r, {
		get: t[r],
		enumerable: !0
	});
};
var Bn = {};
Oe(Bn, {
	languages: () => Ln,
	parsers: () => yr,
	printers: () => Ai
});
var Jt = (e, t) => (r, s, ...n) => r | 1 && s == null ? void 0 : (t.call(s) ?? s[e]).apply(s, n);
var Mn = String.prototype.replaceAll ?? function(e, t) {
	return e.global ? this.replace(e, t) : this.split(e).join(t);
}, St = Jt("replaceAll", function() {
	if (typeof this == "string") return Mn;
});
function Yn(e) {
	return this[e < 0 ? this.length + e : e];
}
var V = Jt("at", function() {
	if (Array.isArray(this) || typeof this == "string") return Yn;
});
var Kn = () => {}, Dt = Kn;
var Ot = "string", It = "array", $t = "cursor", kt = "indent", Et = "align", Xt = "trim", vt = "group", wt = "fill", Tt = "if-break", Zt = "indent-if-break", te = "line-suffix", ee = "line-suffix-boundary", Q = "line", re = "label", xt = "break-parent", ne = new Set([
	$t,
	kt,
	Et,
	Xt,
	vt,
	wt,
	Tt,
	Zt,
	te,
	ee,
	Q,
	re,
	xt
]);
function Wn(e) {
	if (typeof e == "string") return Ot;
	if (Array.isArray(e)) return It;
	if (!e) return;
	let { type: t } = e;
	if (ne.has(t)) return t;
}
var se = Wn;
var jn = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
function Qn(e) {
	let t = e === null ? "null" : typeof e;
	if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
	if (se(e)) throw new Error("doc is valid.");
	let r = Object.prototype.toString.call(e);
	if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
	let s = jn([...ne].map((n) => `'${n}'`));
	return `Unexpected doc.type '${e.type}'.
Expected it to be ${s}.`;
}
var Ie = class extends Error {
	name = "InvalidDocError";
	constructor(t) {
		super(Qn(t)), this.doc = t;
	}
}, _r = Ie;
function Jn(e, t) {
	if (typeof e == "string") return t(e);
	let r = /* @__PURE__ */ new Map();
	return s(e);
	function s(i) {
		if (r.has(i)) return r.get(i);
		let a = n(i);
		return r.set(i, a), a;
	}
	function n(i) {
		switch (se(i)) {
			case It: return t(i.map(s));
			case wt: return t({
				...i,
				parts: i.parts.map(s)
			});
			case Tt: return t({
				...i,
				breakContents: s(i.breakContents),
				flatContents: s(i.flatContents)
			});
			case vt: {
				let { expandedStates: a, contents: o } = i;
				return a ? (a = a.map(s), o = a[0]) : o = s(o), t({
					...i,
					contents: o,
					expandedStates: a
				});
			}
			case Et:
			case kt:
			case Zt:
			case re:
			case te: return t({
				...i,
				contents: s(i.contents)
			});
			case Ot:
			case $t:
			case Xt:
			case ee:
			case Q:
			case xt: return t(i);
			default: throw new _r(i);
		}
	}
}
function ie(e, t = Lr) {
	return Jn(e, (r) => typeof r == "string" ? ct(t, r.split(`
`)) : r);
}
var M = Dt, ae = Dt, Dr = Dt, Or = Dt;
function F(e) {
	return M(e), {
		type: kt,
		contents: e
	};
}
function $n(e, t) {
	return Or(e), M(t), {
		type: Et,
		contents: t,
		n: e
	};
}
function Be(e) {
	return $n(-1, e);
}
var Re = { type: xt };
function qe(e) {
	return Dr(e), {
		type: wt,
		parts: e
	};
}
function I(e, t = {}) {
	return M(e), ae(t.expandedStates, !0), {
		type: vt,
		id: t.id,
		contents: e,
		break: !!t.shouldBreak,
		expandedStates: t.expandedStates
	};
}
function Ve(e, t = "", r = {}) {
	return M(e), t !== "" && M(t), {
		type: Tt,
		breakContents: e,
		flatContents: t,
		groupId: r.groupId
	};
}
function ct(e, t) {
	M(e), ae(t);
	let r = [];
	for (let s = 0; s < t.length; s++) s !== 0 && r.push(e), r.push(t[s]);
	return r;
}
var N = { type: Q }, H = {
	type: Q,
	soft: !0
}, ut = [{
	type: Q,
	hard: !0
}, Re], Lr = [{
	type: Q,
	hard: !0,
	literal: !0
}, Re];
var Ir = Object.freeze({
	character: "'",
	codePoint: 39
}), Br = Object.freeze({
	character: "\"",
	codePoint: 34
}), ts = Object.freeze({
	preferred: Ir,
	alternate: Br
}), es = Object.freeze({
	preferred: Br,
	alternate: Ir
});
function rs(e, t) {
	let { preferred: r, alternate: s } = t === !0 || t === "'" ? ts : es, { length: n } = e, i = 0, a = 0;
	for (let o = 0; o < n; o++) {
		let c = e.charCodeAt(o);
		c === r.codePoint ? i++ : c === s.codePoint && a++;
	}
	return (i > a ? s : r).character;
}
var oe = rs;
function Fe(e) {
	if (typeof e != "string") throw new TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var He = class {
	#t;
	constructor(t) {
		this.#t = new Set(t);
	}
	getLeadingWhitespaceCount(t) {
		let r = this.#t, s = 0;
		for (let n = 0; n < t.length && r.has(t.charAt(n)); n++) s++;
		return s;
	}
	getTrailingWhitespaceCount(t) {
		let r = this.#t, s = 0;
		for (let n = t.length - 1; n >= 0 && r.has(t.charAt(n)); n--) s++;
		return s;
	}
	getLeadingWhitespace(t) {
		let r = this.getLeadingWhitespaceCount(t);
		return t.slice(0, r);
	}
	getTrailingWhitespace(t) {
		let r = this.getTrailingWhitespaceCount(t);
		return t.slice(t.length - r);
	}
	hasLeadingWhitespace(t) {
		return this.#t.has(t.charAt(0));
	}
	hasTrailingWhitespace(t) {
		return this.#t.has(V(0, t, -1));
	}
	trimStart(t) {
		let r = this.getLeadingWhitespaceCount(t);
		return t.slice(r);
	}
	trimEnd(t) {
		let r = this.getTrailingWhitespaceCount(t);
		return t.slice(0, t.length - r);
	}
	trim(t) {
		return this.trimEnd(this.trimStart(t));
	}
	split(t, r = !1) {
		let s = `[${Fe([...this.#t].join(""))}]+`, n = new RegExp(r ? `(${s})` : s, "u");
		return t.split(n);
	}
	hasWhitespaceCharacter(t) {
		let r = this.#t;
		return Array.prototype.some.call(t, (s) => r.has(s));
	}
	hasNonWhitespaceCharacter(t) {
		let r = this.#t;
		return Array.prototype.some.call(t, (s) => !r.has(s));
	}
	isWhitespaceOnly(t) {
		let r = this.#t;
		return Array.prototype.every.call(t, (s) => r.has(s));
	}
	#e(t) {
		let r = Number.POSITIVE_INFINITY;
		for (let s of t.split(`
`)) {
			if (s.length === 0) continue;
			let n = this.getLeadingWhitespaceCount(s);
			if (n === 0) return 0;
			s.length !== n && n < r && (r = n);
		}
		return r === Number.POSITIVE_INFINITY ? 0 : r;
	}
	dedentString(t) {
		let r = this.#e(t);
		return r === 0 ? t : t.split(`
`).map((s) => s.slice(r)).join(`
`);
	}
};
var R = new He([
	"	",
	`
`,
	"\f",
	"\r",
	" "
]);
function is(e) {
	return Array.isArray(e) && e.length > 0;
}
var Bt = is;
var Ue = class extends Error {
	name = "UnexpectedNodeError";
	constructor(t, r, s = "type") {
		super(`Unexpected ${r} node ${s}: ${JSON.stringify(t[s])}.`), this.node = t;
	}
}, qr = Ue;
function Vr(e, t, r) {
	if (e.type === "TextNode") {
		let s = e.chars.trim();
		if (!s) return null;
		r.tag === "style" && r.children.length === 1 && r.children[0] === e ? t.chars = "" : t.chars = R.split(s).join(" ");
	}
	e.type === "ElementNode" && (delete t.startTag, delete t.openTag, delete t.parts, delete t.endTag, delete t.closeTag, delete t.nameNode, delete t.body, delete t.blockParamNodes, delete t.params, delete t.path), e.type === "Block" && (delete t.blockParamNodes, delete t.params), e.type === "AttrNode" && e.name.toLowerCase() === "class" && delete t.value, e.type === "PathExpression" && (t.head = e.head.original);
}
Vr.ignoredProperties = new Set(["loc", "selfClosing"]);
var Fr = Vr;
function as(e) {
	let { node: t } = e;
	if (t.type !== "TextNode") return;
	let { parent: r } = e;
	if (!(r.type === "ElementNode" && r.tag === "style" && r.children.length === 1 && r.children[0] === t)) return;
	let s = r.attributes.find((n) => n.type === "AttrNode" && n.name === "lang");
	if (!(s && !(s.value.type === "TextNode" && (s.value.chars === "" || s.value.chars === "css")))) return async (n) => {
		let i = t.chars;
		return i.trim() ? await n(i, { parser: "css" }) : "";
	};
}
var Hr = as;
var Rt = null;
function qt(e) {
	if (Rt !== null && typeof Rt.property) {
		let t = Rt;
		return Rt = qt.prototype = null, t;
	}
	return Rt = qt.prototype = e ?? Object.create(null), new qt();
}
var os = 10;
for (let e = 0; e <= os; e++) qt();
function Me(e) {
	return qt(e);
}
function ls(e, t = "type") {
	Me(e);
	function r(s) {
		let n = s[t], i = e[n];
		if (!Array.isArray(i)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${n}'.`), { node: s });
		return i;
	}
	return r;
}
var Ur = ls;
var cs = Object.freeze([]);
function zr() {
	return cs;
}
zr();
zr();
var ze = Object.assign;
var Mr = console;
function Yr(e, t = "unexpected unreachable branch") {
	throw Mr.log("unreachable", e), Mr.log(`${t} :: ${JSON.stringify(e)} (${e})`), /* @__PURE__ */ new Error("code reached unreachable");
}
var Vt = (function() {
	var e = function(X, b, S, y) {
		for (S = S || {}, y = X.length; y--; S[X[y]] = b);
		return S;
	}, t = [2, 52], r = [1, 20], s = [
		5,
		14,
		15,
		19,
		29,
		34,
		39,
		44,
		47,
		48,
		53,
		57,
		61
	], n = [1, 44], i = [1, 40], a = [1, 43], o = [1, 33], c = [1, 34], h = [1, 35], f = [1, 36], p = [1, 37], g = [1, 42], E = [1, 46], T = [
		14,
		15,
		19,
		29,
		34,
		39,
		44,
		47,
		48,
		53,
		57,
		61
	], D = [
		14,
		15,
		19,
		29,
		34,
		44,
		47,
		48,
		53,
		57,
		61
	], B = [15, 18], O = [
		14,
		15,
		19,
		29,
		34,
		47,
		48,
		53,
		57,
		61
	], z = [
		33,
		67,
		73,
		75,
		84,
		85,
		86,
		87,
		88,
		89
	], P = [
		23,
		33,
		56,
		67,
		68,
		73,
		75,
		77,
		79,
		84,
		85,
		86,
		87,
		88,
		89
	], U = [1, 62], C = [1, 63], $ = [
		23,
		33,
		56,
		68,
		73,
		79
	], W = [
		23,
		33,
		56,
		67,
		68,
		73,
		75,
		77,
		79,
		84,
		85,
		86,
		87,
		88,
		89,
		92,
		93
	], Sr = [2, 51], kr = [1, 64], Er = [
		67,
		73,
		75,
		77,
		84,
		85,
		86,
		87,
		88,
		89
	], vr = [
		56,
		67,
		73,
		75,
		84,
		85,
		86,
		87,
		88,
		89
	], wr = [1, 75], we = [1, 76], Te = [1, 83], dt = [
		33,
		67,
		73,
		75,
		79,
		84,
		85,
		86,
		87,
		88,
		89
	], Tr = [
		23,
		67,
		73,
		75,
		84,
		85,
		86,
		87,
		88,
		89
	], xr = [
		67,
		68,
		73,
		75,
		84,
		85,
		86,
		87,
		88,
		89
	], gt = [33, 79], xe = [1, 134], Nr = [73, 81], Ne = {
		trace: function() {},
		yy: {},
		symbols_: {
			error: 2,
			root: 3,
			program: 4,
			EOF: 5,
			program_repetition0: 6,
			statement: 7,
			mustache: 8,
			block: 9,
			rawBlock: 10,
			partial: 11,
			partialBlock: 12,
			content: 13,
			COMMENT: 14,
			CONTENT: 15,
			openRawBlock: 16,
			rawBlock_repetition0: 17,
			END_RAW_BLOCK: 18,
			OPEN_RAW_BLOCK: 19,
			helperName: 20,
			openRawBlock_repetition0: 21,
			openRawBlock_option0: 22,
			CLOSE_RAW_BLOCK: 23,
			openBlock: 24,
			block_option0: 25,
			closeBlock: 26,
			openInverse: 27,
			block_option1: 28,
			OPEN_BLOCK: 29,
			openBlock_repetition0: 30,
			openBlock_option0: 31,
			openBlock_option1: 32,
			CLOSE: 33,
			OPEN_INVERSE: 34,
			openInverse_repetition0: 35,
			openInverse_option0: 36,
			openInverse_option1: 37,
			openInverseChain: 38,
			OPEN_INVERSE_CHAIN: 39,
			openInverseChain_repetition0: 40,
			openInverseChain_option0: 41,
			openInverseChain_option1: 42,
			inverseAndProgram: 43,
			INVERSE: 44,
			inverseChain: 45,
			inverseChain_option0: 46,
			OPEN_ENDBLOCK: 47,
			OPEN: 48,
			hash: 49,
			expr: 50,
			mustache_repetition0: 51,
			mustache_option0: 52,
			OPEN_UNESCAPED: 53,
			mustache_repetition1: 54,
			mustache_option1: 55,
			CLOSE_UNESCAPED: 56,
			OPEN_PARTIAL: 57,
			partial_repetition0: 58,
			partial_option0: 59,
			openPartialBlock: 60,
			OPEN_PARTIAL_BLOCK: 61,
			openPartialBlock_repetition0: 62,
			openPartialBlock_option0: 63,
			exprHead: 64,
			arrayLiteral: 65,
			sexpr: 66,
			OPEN_SEXPR: 67,
			CLOSE_SEXPR: 68,
			sexpr_repetition0: 69,
			sexpr_option0: 70,
			hash_repetition_plus0: 71,
			hashSegment: 72,
			ID: 73,
			EQUALS: 74,
			OPEN_ARRAY: 75,
			arrayLiteral_repetition0: 76,
			CLOSE_ARRAY: 77,
			blockParams: 78,
			OPEN_BLOCK_PARAMS: 79,
			blockParams_repetition_plus0: 80,
			CLOSE_BLOCK_PARAMS: 81,
			path: 82,
			dataName: 83,
			STRING: 84,
			NUMBER: 85,
			BOOLEAN: 86,
			UNDEFINED: 87,
			NULL: 88,
			DATA: 89,
			pathSegments: 90,
			sep: 91,
			SEP: 92,
			PRIVATE_SEP: 93,
			$accept: 0,
			$end: 1
		},
		terminals_: {
			2: "error",
			5: "EOF",
			14: "COMMENT",
			15: "CONTENT",
			18: "END_RAW_BLOCK",
			19: "OPEN_RAW_BLOCK",
			23: "CLOSE_RAW_BLOCK",
			29: "OPEN_BLOCK",
			33: "CLOSE",
			34: "OPEN_INVERSE",
			39: "OPEN_INVERSE_CHAIN",
			44: "INVERSE",
			47: "OPEN_ENDBLOCK",
			48: "OPEN",
			53: "OPEN_UNESCAPED",
			56: "CLOSE_UNESCAPED",
			57: "OPEN_PARTIAL",
			61: "OPEN_PARTIAL_BLOCK",
			67: "OPEN_SEXPR",
			68: "CLOSE_SEXPR",
			73: "ID",
			74: "EQUALS",
			75: "OPEN_ARRAY",
			77: "CLOSE_ARRAY",
			79: "OPEN_BLOCK_PARAMS",
			81: "CLOSE_BLOCK_PARAMS",
			84: "STRING",
			85: "NUMBER",
			86: "BOOLEAN",
			87: "UNDEFINED",
			88: "NULL",
			89: "DATA",
			92: "SEP",
			93: "PRIVATE_SEP"
		},
		productions_: [
			0,
			[3, 2],
			[4, 1],
			[7, 1],
			[7, 1],
			[7, 1],
			[7, 1],
			[7, 1],
			[7, 1],
			[7, 1],
			[13, 1],
			[10, 3],
			[16, 5],
			[9, 4],
			[9, 4],
			[24, 6],
			[27, 6],
			[38, 6],
			[43, 2],
			[45, 3],
			[45, 1],
			[26, 3],
			[8, 3],
			[8, 5],
			[8, 5],
			[11, 5],
			[12, 3],
			[60, 5],
			[50, 1],
			[50, 1],
			[64, 1],
			[64, 1],
			[66, 3],
			[66, 5],
			[49, 1],
			[72, 3],
			[65, 3],
			[78, 3],
			[20, 1],
			[20, 1],
			[20, 1],
			[20, 1],
			[20, 1],
			[20, 1],
			[20, 1],
			[83, 2],
			[91, 1],
			[91, 1],
			[82, 3],
			[82, 1],
			[90, 3],
			[90, 1],
			[6, 0],
			[6, 2],
			[17, 0],
			[17, 2],
			[21, 0],
			[21, 2],
			[22, 0],
			[22, 1],
			[25, 0],
			[25, 1],
			[28, 0],
			[28, 1],
			[30, 0],
			[30, 2],
			[31, 0],
			[31, 1],
			[32, 0],
			[32, 1],
			[35, 0],
			[35, 2],
			[36, 0],
			[36, 1],
			[37, 0],
			[37, 1],
			[40, 0],
			[40, 2],
			[41, 0],
			[41, 1],
			[42, 0],
			[42, 1],
			[46, 0],
			[46, 1],
			[51, 0],
			[51, 2],
			[52, 0],
			[52, 1],
			[54, 0],
			[54, 2],
			[55, 0],
			[55, 1],
			[58, 0],
			[58, 2],
			[59, 0],
			[59, 1],
			[62, 0],
			[62, 2],
			[63, 0],
			[63, 1],
			[69, 0],
			[69, 2],
			[70, 0],
			[70, 1],
			[71, 1],
			[71, 2],
			[76, 0],
			[76, 2],
			[80, 1],
			[80, 2]
		],
		performAction: function(b, S, y, m, w, l, bt) {
			var u = l.length - 1;
			switch (w) {
				case 1: return l[u - 1];
				case 2:
					this.$ = m.prepareProgram(l[u]);
					break;
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 20:
				case 28:
				case 29:
				case 30:
				case 31:
				case 38:
				case 39:
				case 46:
				case 47:
					this.$ = l[u];
					break;
				case 9:
					this.$ = {
						type: "CommentStatement",
						value: m.stripComment(l[u]),
						strip: m.stripFlags(l[u], l[u]),
						loc: m.locInfo(this._$)
					};
					break;
				case 10:
					this.$ = {
						type: "ContentStatement",
						original: l[u],
						value: l[u],
						loc: m.locInfo(this._$)
					};
					break;
				case 11:
					this.$ = m.prepareRawBlock(l[u - 2], l[u - 1], l[u], this._$);
					break;
				case 12:
					this.$ = {
						path: l[u - 3],
						params: l[u - 2],
						hash: l[u - 1]
					};
					break;
				case 13:
					this.$ = m.prepareBlock(l[u - 3], l[u - 2], l[u - 1], l[u], !1, this._$);
					break;
				case 14:
					this.$ = m.prepareBlock(l[u - 3], l[u - 2], l[u - 1], l[u], !0, this._$);
					break;
				case 15:
					this.$ = {
						open: l[u - 5],
						path: l[u - 4],
						params: l[u - 3],
						hash: l[u - 2],
						blockParams: l[u - 1],
						strip: m.stripFlags(l[u - 5], l[u])
					};
					break;
				case 16:
				case 17:
					this.$ = {
						path: l[u - 4],
						params: l[u - 3],
						hash: l[u - 2],
						blockParams: l[u - 1],
						strip: m.stripFlags(l[u - 5], l[u])
					};
					break;
				case 18:
					this.$ = {
						strip: m.stripFlags(l[u - 1], l[u - 1]),
						program: l[u]
					};
					break;
				case 19:
					var Z = m.prepareBlock(l[u - 2], l[u - 1], l[u], l[u], !1, this._$), Lt = m.prepareProgram([Z], l[u - 1].loc);
					Lt.chained = !0, this.$ = {
						strip: l[u - 2].strip,
						program: Lt,
						chain: !0
					};
					break;
				case 21:
					this.$ = {
						path: l[u - 1],
						strip: m.stripFlags(l[u - 2], l[u])
					};
					break;
				case 22:
					this.$ = m.prepareMustache(m.syntax.hash(l[u - 1], m.locInfo(this._$), {
						yy: m,
						syntax: "expr"
					}), [], void 0, l[u - 2], m.stripFlags(l[u - 2], l[u]), this._$);
					break;
				case 23:
				case 24:
					this.$ = m.prepareMustache(l[u - 3], l[u - 2], l[u - 1], l[u - 4], m.stripFlags(l[u - 4], l[u]), this._$);
					break;
				case 25:
					this.$ = {
						type: "PartialStatement",
						name: l[u - 3],
						params: l[u - 2],
						hash: l[u - 1],
						indent: "",
						strip: m.stripFlags(l[u - 4], l[u]),
						loc: m.locInfo(this._$)
					};
					break;
				case 26:
					this.$ = m.preparePartialBlock(l[u - 2], l[u - 1], l[u], this._$);
					break;
				case 27:
					this.$ = {
						path: l[u - 3],
						params: l[u - 2],
						hash: l[u - 1],
						strip: m.stripFlags(l[u - 4], l[u])
					};
					break;
				case 32:
					this.$ = m.syntax.hash(l[u - 1], m.locInfo(this._$), {
						yy: m,
						syntax: "expr"
					});
					break;
				case 33:
					this.$ = {
						type: "SubExpression",
						path: l[u - 3],
						params: l[u - 2],
						hash: l[u - 1],
						loc: m.locInfo(this._$)
					};
					break;
				case 34:
					this.$ = {
						type: "Hash",
						pairs: l[u],
						loc: m.locInfo(this._$)
					};
					break;
				case 35:
					this.$ = {
						type: "HashPair",
						key: m.id(l[u - 2]),
						value: l[u],
						loc: m.locInfo(this._$)
					};
					break;
				case 36:
					this.$ = m.syntax.square(l[u - 1], m.locInfo(this._$), {
						yy: m,
						syntax: "expr"
					});
					break;
				case 37:
					this.$ = m.id(l[u - 1]);
					break;
				case 40:
					this.$ = {
						type: "StringLiteral",
						value: l[u],
						original: l[u],
						loc: m.locInfo(this._$)
					};
					break;
				case 41:
					this.$ = {
						type: "NumberLiteral",
						value: Number(l[u]),
						original: Number(l[u]),
						loc: m.locInfo(this._$)
					};
					break;
				case 42:
					this.$ = {
						type: "BooleanLiteral",
						value: l[u] === "true",
						original: l[u] === "true",
						loc: m.locInfo(this._$)
					};
					break;
				case 43:
					this.$ = {
						type: "UndefinedLiteral",
						original: void 0,
						value: void 0,
						loc: m.locInfo(this._$)
					};
					break;
				case 44:
					this.$ = {
						type: "NullLiteral",
						original: null,
						value: null,
						loc: m.locInfo(this._$)
					};
					break;
				case 45:
					this.$ = m.preparePath(!0, !1, l[u], this._$);
					break;
				case 48:
					this.$ = m.preparePath(!1, l[u - 2], l[u], this._$);
					break;
				case 49:
					this.$ = m.preparePath(!1, !1, l[u], this._$);
					break;
				case 50:
					l[u - 2].push({
						part: m.id(l[u]),
						original: l[u],
						separator: l[u - 1]
					}), this.$ = l[u - 2];
					break;
				case 51:
					this.$ = [{
						part: m.id(l[u]),
						original: l[u]
					}];
					break;
				case 52:
				case 54:
				case 56:
				case 64:
				case 70:
				case 76:
				case 84:
				case 88:
				case 92:
				case 96:
				case 100:
				case 106:
					this.$ = [];
					break;
				case 53:
				case 55:
				case 57:
				case 65:
				case 71:
				case 77:
				case 85:
				case 89:
				case 93:
				case 97:
				case 101:
				case 105:
				case 107:
				case 109:
					l[u - 1].push(l[u]);
					break;
				case 104:
				case 108:
					this.$ = [l[u]];
					break;
			}
		},
		table: [
			e([
				5,
				14,
				15,
				19,
				29,
				34,
				48,
				53,
				57,
				61
			], t, {
				3: 1,
				4: 2,
				6: 3
			}),
			{ 1: [3] },
			{ 5: [1, 4] },
			e([
				5,
				39,
				44,
				47
			], [2, 2], {
				7: 5,
				8: 6,
				9: 7,
				10: 8,
				11: 9,
				12: 10,
				13: 11,
				24: 15,
				27: 16,
				16: 17,
				60: 19,
				14: [1, 12],
				15: r,
				19: [1, 23],
				29: [1, 21],
				34: [1, 22],
				48: [1, 13],
				53: [1, 14],
				57: [1, 18],
				61: [1, 24]
			}),
			{ 1: [2, 1] },
			e(s, [2, 53]),
			e(s, [2, 3]),
			e(s, [2, 4]),
			e(s, [2, 5]),
			e(s, [2, 6]),
			e(s, [2, 7]),
			e(s, [2, 8]),
			e(s, [2, 9]),
			{
				20: 28,
				49: 25,
				50: 26,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				20: 28,
				50: 45,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(T, t, {
				6: 3,
				4: 47
			}),
			e(D, t, {
				6: 3,
				4: 48
			}),
			e(B, [2, 54], { 17: 49 }),
			{
				20: 28,
				50: 50,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(O, t, {
				6: 3,
				4: 51
			}),
			e([
				5,
				14,
				15,
				18,
				19,
				29,
				34,
				39,
				44,
				47,
				48,
				53,
				57,
				61
			], [2, 10]),
			{
				20: 52,
				64: 53,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				20: 54,
				64: 53,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				20: 55,
				64: 53,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				20: 28,
				50: 56,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{ 33: [1, 57] },
			e(z, [2, 84], { 51: 58 }),
			e([
				23,
				33,
				56,
				68,
				79
			], [2, 34], {
				72: 59,
				73: [1, 60]
			}),
			e(P, [2, 28]),
			e(P, [2, 29], {
				91: 61,
				92: U,
				93: C
			}),
			e($, [2, 104]),
			e(P, [2, 38]),
			e(P, [2, 39]),
			e(P, [2, 40]),
			e(P, [2, 41]),
			e(P, [2, 42]),
			e(P, [2, 43]),
			e(P, [2, 44]),
			e(W, [2, 30]),
			e(W, [2, 31]),
			e([
				23,
				33,
				56,
				67,
				68,
				73,
				75,
				79,
				84,
				85,
				86,
				87,
				88,
				89,
				92,
				93
			], Sr, { 74: kr }),
			e(P, [2, 49], {
				91: 65,
				92: U,
				93: C
			}),
			{
				73: E,
				90: 66
			},
			e(Er, [2, 106], { 76: 67 }),
			{
				20: 28,
				49: 68,
				50: 69,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(vr, [2, 88], { 54: 70 }),
			e(W, Sr),
			{
				25: 71,
				38: 73,
				39: wr,
				43: 74,
				44: we,
				45: 72,
				47: [2, 60]
			},
			{
				28: 77,
				43: 78,
				44: we,
				47: [2, 62]
			},
			{
				13: 80,
				15: r,
				18: [1, 79]
			},
			e(z, [2, 92], { 58: 81 }),
			{
				26: 82,
				47: Te
			},
			e(dt, [2, 64], { 30: 84 }),
			{
				91: 61,
				92: U,
				93: C
			},
			e(dt, [2, 70], { 35: 85 }),
			e(Tr, [2, 56], { 21: 86 }),
			e(z, [2, 96], { 62: 87 }),
			e(s, [2, 22]),
			{
				20: 28,
				33: [2, 86],
				49: 90,
				50: 89,
				52: 88,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e($, [2, 105]),
			{ 74: kr },
			{
				73: E,
				90: 91
			},
			{ 73: [2, 46] },
			{ 73: [2, 47] },
			{
				20: 28,
				50: 92,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{ 73: [1, 93] },
			e(P, [2, 45], {
				91: 65,
				92: U,
				93: C
			}),
			{
				20: 28,
				50: 95,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				77: [1, 94],
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{ 68: [1, 96] },
			e(xr, [2, 100], { 69: 97 }),
			{
				20: 28,
				49: 100,
				50: 99,
				55: 98,
				56: [2, 90],
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				26: 101,
				47: Te
			},
			{ 47: [2, 61] },
			e(T, t, {
				6: 3,
				4: 102
			}),
			{ 47: [2, 20] },
			{
				20: 103,
				64: 53,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(O, t, {
				6: 3,
				4: 104
			}),
			{
				26: 105,
				47: Te
			},
			{ 47: [2, 63] },
			e(s, [2, 11]),
			e(B, [2, 55]),
			{
				20: 28,
				33: [2, 94],
				49: 108,
				50: 107,
				59: 106,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(s, [2, 26]),
			{
				20: 109,
				64: 53,
				65: 38,
				66: 39,
				67: n,
				73: E,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			e(gt, [2, 66], {
				71: 27,
				20: 28,
				64: 29,
				72: 30,
				82: 31,
				83: 32,
				65: 38,
				66: 39,
				90: 41,
				31: 110,
				50: 111,
				49: 112,
				67: n,
				73: i,
				75: a,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g
			}),
			e(gt, [2, 72], {
				71: 27,
				20: 28,
				64: 29,
				72: 30,
				82: 31,
				83: 32,
				65: 38,
				66: 39,
				90: 41,
				36: 113,
				50: 114,
				49: 115,
				67: n,
				73: i,
				75: a,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g
			}),
			{
				20: 28,
				22: 116,
				23: [2, 58],
				49: 118,
				50: 117,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{
				20: 28,
				33: [2, 98],
				49: 121,
				50: 120,
				63: 119,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{ 33: [1, 122] },
			e(z, [2, 85]),
			{ 33: [2, 87] },
			e(P, [2, 48], {
				91: 65,
				92: U,
				93: C
			}),
			e($, [2, 35]),
			e(W, [2, 50]),
			e(W, [2, 36]),
			e(Er, [2, 107]),
			e(W, [2, 32]),
			{
				20: 28,
				49: 125,
				50: 124,
				64: 29,
				65: 38,
				66: 39,
				67: n,
				68: [2, 102],
				70: 123,
				71: 27,
				72: 30,
				73: i,
				75: a,
				82: 31,
				83: 32,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g,
				90: 41
			},
			{ 56: [1, 126] },
			e(vr, [2, 89]),
			{ 56: [2, 91] },
			e(s, [2, 13]),
			{
				38: 73,
				39: wr,
				43: 74,
				44: we,
				45: 128,
				46: 127,
				47: [2, 82]
			},
			e(dt, [2, 76], { 40: 129 }),
			{ 47: [2, 18] },
			e(s, [2, 14]),
			{ 33: [1, 130] },
			e(z, [2, 93]),
			{ 33: [2, 95] },
			{ 33: [1, 131] },
			{
				32: 132,
				33: [2, 68],
				78: 133,
				79: xe
			},
			e(dt, [2, 65]),
			e(gt, [2, 67]),
			{
				33: [2, 74],
				37: 135,
				78: 136,
				79: xe
			},
			e(dt, [2, 71]),
			e(gt, [2, 73]),
			{ 23: [1, 137] },
			e(Tr, [2, 57]),
			{ 23: [2, 59] },
			{ 33: [1, 138] },
			e(z, [2, 97]),
			{ 33: [2, 99] },
			e(s, [2, 23]),
			{ 68: [1, 139] },
			e(xr, [2, 101]),
			{ 68: [2, 103] },
			e(s, [2, 24]),
			{ 47: [2, 19] },
			{ 47: [2, 83] },
			e(gt, [2, 78], {
				71: 27,
				20: 28,
				64: 29,
				72: 30,
				82: 31,
				83: 32,
				65: 38,
				66: 39,
				90: 41,
				41: 140,
				50: 141,
				49: 142,
				67: n,
				73: i,
				75: a,
				84: o,
				85: c,
				86: h,
				87: f,
				88: p,
				89: g
			}),
			e(s, [2, 25]),
			e(s, [2, 21]),
			{ 33: [1, 143] },
			{ 33: [2, 69] },
			{
				73: [1, 145],
				80: 144
			},
			{ 33: [1, 146] },
			{ 33: [2, 75] },
			e(B, [2, 12]),
			e(O, [2, 27]),
			e(W, [2, 33]),
			{
				33: [2, 80],
				42: 147,
				78: 148,
				79: xe
			},
			e(dt, [2, 77]),
			e(gt, [2, 79]),
			e(T, [2, 15]),
			{
				73: [1, 150],
				81: [1, 149]
			},
			e(Nr, [2, 108]),
			e(D, [2, 16]),
			{ 33: [1, 151] },
			{ 33: [2, 81] },
			{ 33: [2, 37] },
			e(Nr, [2, 109]),
			e(T, [2, 17])
		],
		defaultActions: {
			4: [2, 1],
			62: [2, 46],
			63: [2, 47],
			72: [2, 61],
			74: [2, 20],
			78: [2, 63],
			90: [2, 87],
			100: [2, 91],
			104: [2, 18],
			108: [2, 95],
			118: [2, 59],
			121: [2, 99],
			125: [2, 103],
			127: [2, 19],
			128: [2, 83],
			133: [2, 69],
			136: [2, 75],
			148: [2, 81],
			149: [2, 37]
		},
		parseError: function(b, S) {
			if (S.recoverable) this.trace(b);
			else {
				var y = new Error(b);
				throw y.hash = S, y;
			}
		},
		parse: function(b) {
			var S = this, y = [0], w = [null], l = [], bt = this.table, u = "", Z = 0, Lt = 0, Ar = 0, qn = 2, Pr = 1, Vn = l.slice.call(arguments, 1), x = Object.create(this.lexer), ot = { yy: {} };
			for (var Pe in this.yy) Object.prototype.hasOwnProperty.call(this.yy, Pe) && (ot.yy[Pe] = this.yy[Pe]);
			x.setInput(b, ot.yy), ot.yy.lexer = x, ot.yy.parser = this, typeof x.yylloc > "u" && (x.yylloc = {});
			var Ce = x.yylloc;
			l.push(Ce);
			var Fn = x.options && x.options.ranges;
			typeof ot.yy.parseError == "function" ? this.parseError = ot.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
			for (var Hn = function() {
				var Y;
				return Y = x.lex() || Pr, typeof Y != "number" && (Y = S.symbols_[Y] || Y), Y;
			}, L, _e, lt, q, Le, yt = {}, jt, j, Cr, Qt;;) {
				if (lt = y[y.length - 1], this.defaultActions[lt] ? q = this.defaultActions[lt] : ((L === null || typeof L > "u") && (L = Hn()), q = bt[lt] && bt[lt][L]), typeof q > "u" || !q.length || !q[0]) {
					var De = "";
					Qt = [];
					for (jt in bt[lt]) this.terminals_[jt] && jt > qn && Qt.push("'" + this.terminals_[jt] + "'");
					x.showPosition ? De = "Parse error on line " + (Z + 1) + `:
` + x.showPosition() + `
Expecting ` + Qt.join(", ") + ", got '" + (this.terminals_[L] || L) + "'" : De = "Parse error on line " + (Z + 1) + ": Unexpected " + (L == Pr ? "end of input" : "'" + (this.terminals_[L] || L) + "'"), this.parseError(De, {
						text: x.match,
						token: this.terminals_[L] || L,
						line: x.yylineno,
						loc: Ce,
						expected: Qt
					});
				}
				if (q[0] instanceof Array && q.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + lt + ", token: " + L);
				switch (q[0]) {
					case 1:
						y.push(L), w.push(x.yytext), l.push(x.yylloc), y.push(q[1]), L = null, _e ? (L = _e, _e = null) : (Lt = x.yyleng, u = x.yytext, Z = x.yylineno, Ce = x.yylloc, Ar > 0 && Ar--);
						break;
					case 2:
						if (j = this.productions_[q[1]][1], yt.$ = w[w.length - j], yt._$ = {
							first_line: l[l.length - (j || 1)].first_line,
							last_line: l[l.length - 1].last_line,
							first_column: l[l.length - (j || 1)].first_column,
							last_column: l[l.length - 1].last_column
						}, Fn && (yt._$.range = [l[l.length - (j || 1)].range[0], l[l.length - 1].range[1]]), Le = this.performAction.apply(yt, [
							u,
							Lt,
							Z,
							ot.yy,
							q[1],
							w,
							l
						].concat(Vn)), typeof Le < "u") return Le;
						j && (y = y.slice(0, -1 * j * 2), w = w.slice(0, -1 * j), l = l.slice(0, -1 * j)), y.push(this.productions_[q[1]][0]), w.push(yt.$), l.push(yt._$), Cr = bt[y[y.length - 2]][y[y.length - 1]], y.push(Cr);
						break;
					case 3: return !0;
				}
			}
			return !0;
		}
	};
	Ne.lexer = (function() {
		return {
			EOF: 1,
			parseError: function(S, y) {
				if (this.yy.parser) this.yy.parser.parseError(S, y);
				else throw new Error(S);
			},
			setInput: function(b, S) {
				return this.yy = S || this.yy || {}, this._input = b, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
					first_line: 1,
					first_column: 0,
					last_line: 1,
					last_column: 0
				}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
			},
			input: function() {
				var b = this._input[0];
				this.yytext += b, this.yyleng++, this.offset++, this.match += b, this.matched += b;
				return b.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), b;
			},
			unput: function(b) {
				var S = b.length, y = b.split(/(?:\r\n?|\n)/g);
				this._input = b + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - S), this.offset -= S;
				var m = this.match.split(/(?:\r\n?|\n)/g);
				this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), y.length - 1 && (this.yylineno -= y.length - 1);
				var w = this.yylloc.range;
				return this.yylloc = {
					first_line: this.yylloc.first_line,
					last_line: this.yylineno + 1,
					first_column: this.yylloc.first_column,
					last_column: y ? (y.length === m.length ? this.yylloc.first_column : 0) + m[m.length - y.length].length - y[0].length : this.yylloc.first_column - S
				}, this.options.ranges && (this.yylloc.range = [w[0], w[0] + this.yyleng - S]), this.yyleng = this.yytext.length, this;
			},
			more: function() {
				return this._more = !0, this;
			},
			reject: function() {
				if (this.options.backtrack_lexer) this._backtrack = !0;
				else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
					text: "",
					token: null,
					line: this.yylineno
				});
				return this;
			},
			less: function(b) {
				this.unput(this.match.slice(b));
			},
			pastInput: function() {
				var b = this.matched.substr(0, this.matched.length - this.match.length);
				return (b.length > 20 ? "..." : "") + b.substr(-20).replace(/\n/g, "");
			},
			upcomingInput: function() {
				var b = this.match;
				return b.length < 20 && (b += this._input.substr(0, 20 - b.length)), (b.substr(0, 20) + (b.length > 20 ? "..." : "")).replace(/\n/g, "");
			},
			showPosition: function() {
				var b = this.pastInput(), S = new Array(b.length + 1).join("-");
				return b + this.upcomingInput() + `
` + S + "^";
			},
			test_match: function(b, S) {
				var y, m, w;
				if (this.options.backtrack_lexer && (w = {
					yylineno: this.yylineno,
					yylloc: {
						first_line: this.yylloc.first_line,
						last_line: this.last_line,
						first_column: this.yylloc.first_column,
						last_column: this.yylloc.last_column
					},
					yytext: this.yytext,
					match: this.match,
					matches: this.matches,
					matched: this.matched,
					yyleng: this.yyleng,
					offset: this.offset,
					_more: this._more,
					_input: this._input,
					yy: this.yy,
					conditionStack: this.conditionStack.slice(0),
					done: this.done
				}, this.options.ranges && (w.yylloc.range = this.yylloc.range.slice(0))), m = b[0].match(/(?:\r\n?|\n).*/g), m && (this.yylineno += m.length), this.yylloc = {
					first_line: this.yylloc.last_line,
					last_line: this.yylineno + 1,
					first_column: this.yylloc.last_column,
					last_column: m ? m[m.length - 1].length - m[m.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
				}, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], y = this.performAction.call(this, this.yy, this, S, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), y) return y;
				if (this._backtrack) {
					for (var l in w) this[l] = w[l];
					return !1;
				}
				return !1;
			},
			next: function() {
				if (this.done) return this.EOF;
				this._input || (this.done = !0);
				var b, S, y, m;
				this._more || (this.yytext = "", this.match = "");
				for (var w = this._currentRules(), l = 0; l < w.length; l++) if (y = this._input.match(this.rules[w[l]]), y && (!S || y[0].length > S[0].length)) {
					if (S = y, m = l, this.options.backtrack_lexer) {
						if (b = this.test_match(y, w[l]), b !== !1) return b;
						if (this._backtrack) {
							S = !1;
							continue;
						} else return !1;
					} else if (!this.options.flex) break;
				}
				return S ? (b = this.test_match(S, w[m]), b !== !1 ? b : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
					text: "",
					token: null,
					line: this.yylineno
				});
			},
			lex: function() {
				return this.next() || this.lex();
			},
			begin: function(S) {
				this.conditionStack.push(S);
			},
			popState: function() {
				return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
			},
			_currentRules: function() {
				return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
			},
			topState: function(S) {
				return S = this.conditionStack.length - 1 - Math.abs(S || 0), S >= 0 ? this.conditionStack[S] : "INITIAL";
			},
			pushState: function(S) {
				this.begin(S);
			},
			stateStackSize: function() {
				return this.conditionStack.length;
			},
			options: {},
			performAction: function(S, y, m, w) {
				function l(u, Z) {
					return y.yytext = y.yytext.substring(u, y.yyleng - Z + u);
				}
				switch (m) {
					case 0:
						if (y.yytext.slice(-2) === "\\\\" ? (l(0, 1), this.begin("mu")) : y.yytext.slice(-1) === "\\" ? (l(0, 1), this.begin("emu")) : this.begin("mu"), y.yytext) return 15;
						break;
					case 1: return 15;
					case 2: return this.popState(), 15;
					case 3: return this.begin("raw"), 15;
					case 4: return this.popState(), this.conditionStack[this.conditionStack.length - 1] === "raw" ? 15 : (l(5, 9), 18);
					case 5: return 15;
					case 6: return this.popState(), 14;
					case 7: return 67;
					case 8: return 68;
					case 9:
						if (S.syntax.square === "string") this.unput(y.yytext), this.begin("escl");
						else return 75;
						break;
					case 10: return 77;
					case 11: return 19;
					case 12: return this.popState(), this.begin("raw"), 23;
					case 13: return 57;
					case 14: return 61;
					case 15: return 29;
					case 16: return 47;
					case 17: return this.popState(), 44;
					case 18: return this.popState(), 44;
					case 19: return 34;
					case 20: return 39;
					case 21: return 53;
					case 22: return 48;
					case 23:
						this.unput(y.yytext), this.popState(), this.begin("com");
						break;
					case 24: return this.popState(), 14;
					case 25: return 48;
					case 26: return 74;
					case 27: return 73;
					case 28: return 73;
					case 29: return 93;
					case 30: return 92;
					case 31: break;
					case 32: return this.popState(), 56;
					case 33: return this.popState(), 33;
					case 34: return y.yytext = l(1, 2).replace(/\\"/g, "\""), 84;
					case 35: return y.yytext = l(1, 2).replace(/\\'/g, "'"), 84;
					case 36: return 89;
					case 37: return 86;
					case 38: return 86;
					case 39: return 87;
					case 40: return 88;
					case 41: return 85;
					case 42: return 79;
					case 43: return 81;
					case 44: return 73;
					case 45: return y.yytext = y.yytext.replace(/\\([\\\]])/g, "$1"), this.popState(), 73;
					case 46: return "INVALID";
					case 47: return 5;
				}
			},
			rules: [
				/^(?:[^\x00]*?(?=(\{\{)))/,
				/^(?:[^\x00]+)/,
				/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
				/^(?:\{\{\{\{(?=[^/]))/,
				/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,
				/^(?:[^\x00]+?(?=(\{\{\{\{)))/,
				/^(?:[\s\S]*?--(~)?\}\})/,
				/^(?:\()/,
				/^(?:\))/,
				/^(?:\[)/,
				/^(?:\])/,
				/^(?:\{\{\{\{)/,
				/^(?:\}\}\}\})/,
				/^(?:\{\{(~)?>)/,
				/^(?:\{\{(~)?#>)/,
				/^(?:\{\{(~)?#\*?)/,
				/^(?:\{\{(~)?\/)/,
				/^(?:\{\{(~)?\^\s*(~)?\}\})/,
				/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,
				/^(?:\{\{(~)?\^)/,
				/^(?:\{\{(~)?\s*else\b)/,
				/^(?:\{\{(~)?\{)/,
				/^(?:\{\{(~)?&)/,
				/^(?:\{\{(~)?!--)/,
				/^(?:\{\{(~)?![\s\S]*?\}\})/,
				/^(?:\{\{(~)?\*?)/,
				/^(?:=)/,
				/^(?:\.\.)/,
				/^(?:\.(?=([=~}\s\/.)\]|])))/,
				/^(?:\.#)/,
				/^(?:[\/.])/,
				/^(?:\s+)/,
				/^(?:\}(~)?\}\})/,
				/^(?:(~)?\}\})/,
				/^(?:"(\\["]|[^"])*")/,
				/^(?:'(\\[']|[^'])*')/,
				/^(?:@)/,
				/^(?:true(?=([~}\s)\]])))/,
				/^(?:false(?=([~}\s)\]])))/,
				/^(?:undefined(?=([~}\s)\]])))/,
				/^(?:null(?=([~}\s)\]])))/,
				/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)\]])))/,
				/^(?:as\s+\|)/,
				/^(?:\|)/,
				/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)\]|]))))/,
				/^(?:\[(\\\]|[^\]])*\])/,
				/^(?:.)/,
				/^(?:$)/
			],
			conditions: {
				mu: {
					rules: [
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23,
						24,
						25,
						26,
						27,
						28,
						29,
						30,
						31,
						32,
						33,
						34,
						35,
						36,
						37,
						38,
						39,
						40,
						41,
						42,
						43,
						44,
						46,
						47
					],
					inclusive: !1
				},
				emu: {
					rules: [2],
					inclusive: !1
				},
				com: {
					rules: [6],
					inclusive: !1
				},
				raw: {
					rules: [
						3,
						4,
						5
					],
					inclusive: !1
				},
				escl: {
					rules: [45],
					inclusive: !1
				},
				INITIAL: {
					rules: [
						0,
						1,
						47
					],
					inclusive: !0
				}
			}
		};
	})();
	function Ae() {
		this.yy = {};
	}
	return Ae.prototype = Ne, Ne.Parser = Ae, new Ae();
})();
var Ye = [
	"description",
	"fileName",
	"lineNumber",
	"endLineNumber",
	"message",
	"name",
	"number",
	"stack"
];
function Ge(e, t) {
	var r = t && t.loc, s, n, i, a;
	r && (s = r.start.line, n = r.end.line, i = r.start.column, a = r.end.column, e += " - " + s + ":" + i);
	for (var o = Error.prototype.constructor.call(this, e), c = 0; c < Ye.length; c++) this[Ye[c]] = o[Ye[c]];
	Error.captureStackTrace && Error.captureStackTrace(this, Ge);
	try {
		r && (this.lineNumber = s, this.endLineNumber = n, Object.defineProperty ? (Object.defineProperty(this, "column", {
			value: i,
			enumerable: !0
		}), Object.defineProperty(this, "endColumn", {
			value: a,
			enumerable: !0
		})) : (this.column = i, this.endColumn = a));
	} catch {}
}
Ge.prototype = /* @__PURE__ */ new Error();
var tt = Ge;
function le() {
	this.parents = [];
}
le.prototype = {
	constructor: le,
	mutating: !1,
	acceptKey: function(e, t) {
		var r = this.accept(e[t]);
		if (this.mutating) {
			if (r && !le.prototype[r.type]) throw new tt("Unexpected node type \"" + r.type + "\" found when accepting " + t + " on " + e.type);
			e[t] = r;
		}
	},
	acceptRequired: function(e, t) {
		if (this.acceptKey(e, t), !e[t]) throw new tt(e.type + " requires " + t);
	},
	acceptArray: function(e) {
		for (var t = 0, r = e.length; t < r; t++) this.acceptKey(e, t), e[t] || (e.splice(t, 1), t--, r--);
	},
	accept: function(e) {
		if (e) {
			if (!this[e.type]) throw new tt("Unknown type: " + e.type, e);
			this.current && this.parents.unshift(this.current), this.current = e;
			var t = this[e.type](e);
			if (this.current = this.parents.shift(), !this.mutating || t) return t;
			if (t !== !1) return e;
		}
	},
	Program: function(e) {
		this.acceptArray(e.body);
	},
	MustacheStatement: ce,
	Decorator: ce,
	BlockStatement: Gr,
	DecoratorBlock: Gr,
	PartialStatement: Kr,
	PartialBlockStatement: function(e) {
		Kr.call(this, e), this.acceptKey(e, "program");
	},
	ContentStatement: function() {},
	CommentStatement: function() {},
	SubExpression: ce,
	PathExpression: function() {},
	StringLiteral: function() {},
	NumberLiteral: function() {},
	BooleanLiteral: function() {},
	UndefinedLiteral: function() {},
	NullLiteral: function() {},
	Hash: function(e) {
		this.acceptArray(e.pairs);
	},
	HashPair: function(e) {
		this.acceptRequired(e, "value");
	}
};
function ce(e) {
	this.acceptRequired(e, "path"), this.acceptArray(e.params), this.acceptKey(e, "hash");
}
function Gr(e) {
	ce.call(this, e), this.acceptKey(e, "program"), this.acceptKey(e, "inverse");
}
function Kr(e) {
	this.acceptRequired(e, "name"), this.acceptArray(e.params), this.acceptKey(e, "hash");
}
var Wr = le;
function G(e) {
	e === void 0 && (e = {}), this.options = e;
}
G.prototype = new Wr();
G.prototype.Program = function(e) {
	var t = !this.options.ignoreStandalone, r = !this.isRootSeen;
	this.isRootSeen = !0;
	for (var s = e.body, n = 0, i = s.length; n < i; n++) {
		var a = s[n], o = this.accept(a);
		if (o) {
			var c = Ke(s, n, r), h = We(s, n, r), f = o.openStandalone && c, p = o.closeStandalone && h, g = o.inlineStandalone && c && h;
			o.close && ht(s, n, !0), o.open && et(s, n, !0), t && g && (ht(s, n), et(s, n) && a.type === "PartialStatement" && (a.indent = /([ \t]+$)/.exec(s[n - 1].original)[1])), t && f && (ht((a.program || a.inverse).body), et(s, n)), t && p && (ht(s, n), et((a.inverse || a.program).body));
		}
	}
	return e;
};
G.prototype.BlockStatement = G.prototype.DecoratorBlock = G.prototype.PartialBlockStatement = function(e) {
	this.accept(e.program), this.accept(e.inverse);
	var t = e.program || e.inverse, r = e.program && e.inverse, s = r, n = r;
	if (r && r.chained) for (s = r.body[0].program; n.chained;) n = n.body[n.body.length - 1].program;
	var i = {
		open: e.openStrip.open,
		close: e.closeStrip.close,
		openStandalone: We(t.body),
		closeStandalone: Ke((s || t).body)
	};
	if (e.openStrip.close && ht(t.body, null, !0), r) {
		var a = e.inverseStrip;
		a.open && et(t.body, null, !0), a.close && ht(s.body, null, !0), e.closeStrip.open && et(n.body, null, !0), !this.options.ignoreStandalone && Ke(t.body) && We(s.body) && (et(t.body), ht(s.body));
	} else e.closeStrip.open && et(t.body, null, !0);
	return i;
};
G.prototype.Decorator = G.prototype.MustacheStatement = function(e) {
	return e.strip;
};
G.prototype.PartialStatement = G.prototype.CommentStatement = function(e) {
	var t = e.strip || {};
	return {
		inlineStandalone: !0,
		open: t.open,
		close: t.close
	};
};
function Ke(e, t, r) {
	t === void 0 && (t = e.length);
	var s = e[t - 1], n = e[t - 2];
	if (!s) return r;
	if (s.type === "ContentStatement") return (n || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(s.original);
}
function We(e, t, r) {
	t === void 0 && (t = -1);
	var s = e[t + 1], n = e[t + 2];
	if (!s) return r;
	if (s.type === "ContentStatement") return (n || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(s.original);
}
function ht(e, t, r) {
	var s = e[t == null ? 0 : t + 1];
	if (!(!s || s.type !== "ContentStatement" || !r && s.rightStripped)) {
		var n = s.value;
		s.value = s.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, ""), s.rightStripped = s.value !== n;
	}
}
function et(e, t, r) {
	var s = e[t == null ? e.length - 1 : t - 1];
	if (!(!s || s.type !== "ContentStatement" || !r && s.leftStripped)) {
		var n = s.value;
		return s.value = s.value.replace(r ? /\s+$/ : /[ \t]+$/, ""), s.leftStripped = s.value !== n, s.leftStripped;
	}
}
var jr = G;
var Ft = {};
Oe(Ft, {
	SourceLocation: () => Qe,
	id: () => ps,
	prepareBlock: () => ys,
	prepareMustache: () => gs,
	preparePartialBlock: () => ks,
	preparePath: () => ds,
	prepareProgram: () => Ss,
	prepareRawBlock: () => bs,
	stripComment: () => ms,
	stripFlags: () => fs
});
var hs = function(e, t, r) {
	if (r || arguments.length === 2) for (var s = 0, n = t.length, i; s < n; s++) (i || !(s in t)) && (i || (i = Array.prototype.slice.call(t, 0, s)), i[s] = t[s]);
	return e.concat(i || Array.prototype.slice.call(t));
};
function je(e, t) {
	if (t = t.path ? t.path.original : t, e.path.original !== t) {
		var r = { loc: e.path.loc };
		throw new tt(e.path.original + " doesn't match " + t, r);
	}
}
function Qe(e, t) {
	this.source = e, this.start = {
		line: t.first_line,
		column: t.first_column
	}, this.end = {
		line: t.last_line,
		column: t.last_column
	};
}
function ps(e) {
	return /^\[.*\]$/.test(e) ? e.substring(1, e.length - 1) : e;
}
function fs(e, t) {
	return {
		open: e.charAt(2) === "~",
		close: t.charAt(t.length - 3) === "~"
	};
}
function ms(e) {
	return e.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}
function ds(e, t, r, s) {
	s = this.locInfo(s);
	var n;
	e ? n = "@" : t ? n = t.original + "." : n = "";
	for (var i = [], a = 0, o = 0, c = r.length; o < c; o++) {
		var h = r[o].part, f = r[o].original !== h, p = r[o].separator, g = p === ".#" ? "#" : "";
		if (n += (p || "") + h, !f && (h === ".." || h === "." || h === "this")) {
			if (i.length > 0) throw new tt("Invalid path: " + n, { loc: s });
			h === ".." && a++;
		} else i.push("".concat(g).concat(h));
	}
	var E = t || i.shift();
	return {
		type: "PathExpression",
		this: n.startsWith("this."),
		data: e,
		depth: a,
		head: E,
		tail: i,
		parts: E ? hs([E], i, !0) : i,
		original: n,
		loc: s
	};
}
function gs(e, t, r, s, n, i) {
	var a = s.charAt(3) || s.charAt(2), o = a !== "{" && a !== "&";
	return {
		type: /\*/.test(s) ? "Decorator" : "MustacheStatement",
		path: e,
		params: t,
		hash: r,
		escaped: o,
		strip: n,
		loc: this.locInfo(i)
	};
}
function bs(e, t, r, s) {
	je(e, r), s = this.locInfo(s);
	var n = {
		type: "Program",
		body: t,
		strip: {},
		loc: s
	};
	return {
		type: "BlockStatement",
		path: e.path,
		params: e.params,
		hash: e.hash,
		program: n,
		openStrip: {},
		inverseStrip: {},
		closeStrip: {},
		loc: s
	};
}
function ys(e, t, r, s, n, i) {
	s && s.path && je(e, s);
	var a = /\*/.test(e.open);
	t.blockParams = e.blockParams;
	var o, c;
	if (r) {
		if (a) throw new tt("Unexpected inverse block on decorator", r);
		r.chain && (r.program.body[0].closeStrip = s.strip), c = r.strip, o = r.program;
	}
	return n && (n = o, o = t, t = n), {
		type: a ? "DecoratorBlock" : "BlockStatement",
		path: e.path,
		params: e.params,
		hash: e.hash,
		program: t,
		inverse: o,
		openStrip: e.strip,
		inverseStrip: c,
		closeStrip: s && s.strip,
		loc: this.locInfo(i)
	};
}
function Ss(e, t) {
	if (!t && e.length) {
		var r = e[0].loc, s = e[e.length - 1].loc;
		r && s && (t = {
			source: r.source,
			start: {
				line: r.start.line,
				column: r.start.column
			},
			end: {
				line: s.end.line,
				column: s.end.column
			}
		});
	}
	return {
		type: "Program",
		body: e,
		strip: {},
		loc: t
	};
}
function ks(e, t, r, s) {
	return je(e, r), {
		type: "PartialBlockStatement",
		name: e.path,
		params: e.params,
		hash: e.hash,
		program: t,
		openStrip: e.strip,
		closeStrip: r && r.strip,
		loc: this.locInfo(s)
	};
}
var Qr = {};
for (ue in Ft) Object.prototype.hasOwnProperty.call(Ft, ue) && (Qr[ue] = Ft[ue]);
var ue;
function he(e, t) {
	var r, s, n;
	if (e.type === "Program") return e;
	Vt.yy = Qr, Vt.yy.locInfo = function(o) {
		return new Qe(t && t.srcName, o);
	};
	var i;
	typeof ((r = t?.syntax) === null || r === void 0 ? void 0 : r.square) == "function" ? i = t.syntax.square : ((s = t?.syntax) === null || s === void 0 ? void 0 : s.square) === "node" ? i = Es : i = "string";
	var a;
	return typeof ((n = t?.syntax) === null || n === void 0 ? void 0 : n.hash) == "function" ? a = t.syntax.hash : a = vs, Vt.yy.syntax = {
		square: i,
		hash: a
	}, Vt.parse(e);
}
function Es(e, t) {
	return {
		type: "ArrayLiteral",
		items: e,
		loc: t
	};
}
function vs(e, t) {
	return {
		type: "HashLiteral",
		pairs: e.pairs,
		loc: t
	};
}
function Je(e, t) {
	var r = he(e, t);
	return new jr(t).accept(r);
}
var $r = {
	Aacute: "Á",
	aacute: "á",
	Abreve: "Ă",
	abreve: "ă",
	ac: "∾",
	acd: "∿",
	acE: "∾̳",
	Acirc: "Â",
	acirc: "â",
	acute: "´",
	Acy: "А",
	acy: "а",
	AElig: "Æ",
	aelig: "æ",
	af: "⁡",
	Afr: "𝔄",
	afr: "𝔞",
	Agrave: "À",
	agrave: "à",
	alefsym: "ℵ",
	aleph: "ℵ",
	Alpha: "Α",
	alpha: "α",
	Amacr: "Ā",
	amacr: "ā",
	amalg: "⨿",
	amp: "&",
	AMP: "&",
	andand: "⩕",
	And: "⩓",
	and: "∧",
	andd: "⩜",
	andslope: "⩘",
	andv: "⩚",
	ang: "∠",
	ange: "⦤",
	angle: "∠",
	angmsdaa: "⦨",
	angmsdab: "⦩",
	angmsdac: "⦪",
	angmsdad: "⦫",
	angmsdae: "⦬",
	angmsdaf: "⦭",
	angmsdag: "⦮",
	angmsdah: "⦯",
	angmsd: "∡",
	angrt: "∟",
	angrtvb: "⊾",
	angrtvbd: "⦝",
	angsph: "∢",
	angst: "Å",
	angzarr: "⍼",
	Aogon: "Ą",
	aogon: "ą",
	Aopf: "𝔸",
	aopf: "𝕒",
	apacir: "⩯",
	ap: "≈",
	apE: "⩰",
	ape: "≊",
	apid: "≋",
	apos: "'",
	ApplyFunction: "⁡",
	approx: "≈",
	approxeq: "≊",
	Aring: "Å",
	aring: "å",
	Ascr: "𝒜",
	ascr: "𝒶",
	Assign: "≔",
	ast: "*",
	asymp: "≈",
	asympeq: "≍",
	Atilde: "Ã",
	atilde: "ã",
	Auml: "Ä",
	auml: "ä",
	awconint: "∳",
	awint: "⨑",
	backcong: "≌",
	backepsilon: "϶",
	backprime: "‵",
	backsim: "∽",
	backsimeq: "⋍",
	Backslash: "∖",
	Barv: "⫧",
	barvee: "⊽",
	barwed: "⌅",
	Barwed: "⌆",
	barwedge: "⌅",
	bbrk: "⎵",
	bbrktbrk: "⎶",
	bcong: "≌",
	Bcy: "Б",
	bcy: "б",
	bdquo: "„",
	becaus: "∵",
	because: "∵",
	Because: "∵",
	bemptyv: "⦰",
	bepsi: "϶",
	bernou: "ℬ",
	Bernoullis: "ℬ",
	Beta: "Β",
	beta: "β",
	beth: "ℶ",
	between: "≬",
	Bfr: "𝔅",
	bfr: "𝔟",
	bigcap: "⋂",
	bigcirc: "◯",
	bigcup: "⋃",
	bigodot: "⨀",
	bigoplus: "⨁",
	bigotimes: "⨂",
	bigsqcup: "⨆",
	bigstar: "★",
	bigtriangledown: "▽",
	bigtriangleup: "△",
	biguplus: "⨄",
	bigvee: "⋁",
	bigwedge: "⋀",
	bkarow: "⤍",
	blacklozenge: "⧫",
	blacksquare: "▪",
	blacktriangle: "▴",
	blacktriangledown: "▾",
	blacktriangleleft: "◂",
	blacktriangleright: "▸",
	blank: "␣",
	blk12: "▒",
	blk14: "░",
	blk34: "▓",
	block: "█",
	bne: "=⃥",
	bnequiv: "≡⃥",
	bNot: "⫭",
	bnot: "⌐",
	Bopf: "𝔹",
	bopf: "𝕓",
	bot: "⊥",
	bottom: "⊥",
	bowtie: "⋈",
	boxbox: "⧉",
	boxdl: "┐",
	boxdL: "╕",
	boxDl: "╖",
	boxDL: "╗",
	boxdr: "┌",
	boxdR: "╒",
	boxDr: "╓",
	boxDR: "╔",
	boxh: "─",
	boxH: "═",
	boxhd: "┬",
	boxHd: "╤",
	boxhD: "╥",
	boxHD: "╦",
	boxhu: "┴",
	boxHu: "╧",
	boxhU: "╨",
	boxHU: "╩",
	boxminus: "⊟",
	boxplus: "⊞",
	boxtimes: "⊠",
	boxul: "┘",
	boxuL: "╛",
	boxUl: "╜",
	boxUL: "╝",
	boxur: "└",
	boxuR: "╘",
	boxUr: "╙",
	boxUR: "╚",
	boxv: "│",
	boxV: "║",
	boxvh: "┼",
	boxvH: "╪",
	boxVh: "╫",
	boxVH: "╬",
	boxvl: "┤",
	boxvL: "╡",
	boxVl: "╢",
	boxVL: "╣",
	boxvr: "├",
	boxvR: "╞",
	boxVr: "╟",
	boxVR: "╠",
	bprime: "‵",
	breve: "˘",
	Breve: "˘",
	brvbar: "¦",
	bscr: "𝒷",
	Bscr: "ℬ",
	bsemi: "⁏",
	bsim: "∽",
	bsime: "⋍",
	bsolb: "⧅",
	bsol: "\\",
	bsolhsub: "⟈",
	bull: "•",
	bullet: "•",
	bump: "≎",
	bumpE: "⪮",
	bumpe: "≏",
	Bumpeq: "≎",
	bumpeq: "≏",
	Cacute: "Ć",
	cacute: "ć",
	capand: "⩄",
	capbrcup: "⩉",
	capcap: "⩋",
	cap: "∩",
	Cap: "⋒",
	capcup: "⩇",
	capdot: "⩀",
	CapitalDifferentialD: "ⅅ",
	caps: "∩︀",
	caret: "⁁",
	caron: "ˇ",
	Cayleys: "ℭ",
	ccaps: "⩍",
	Ccaron: "Č",
	ccaron: "č",
	Ccedil: "Ç",
	ccedil: "ç",
	Ccirc: "Ĉ",
	ccirc: "ĉ",
	Cconint: "∰",
	ccups: "⩌",
	ccupssm: "⩐",
	Cdot: "Ċ",
	cdot: "ċ",
	cedil: "¸",
	Cedilla: "¸",
	cemptyv: "⦲",
	cent: "¢",
	centerdot: "·",
	CenterDot: "·",
	cfr: "𝔠",
	Cfr: "ℭ",
	CHcy: "Ч",
	chcy: "ч",
	check: "✓",
	checkmark: "✓",
	Chi: "Χ",
	chi: "χ",
	circ: "ˆ",
	circeq: "≗",
	circlearrowleft: "↺",
	circlearrowright: "↻",
	circledast: "⊛",
	circledcirc: "⊚",
	circleddash: "⊝",
	CircleDot: "⊙",
	circledR: "®",
	circledS: "Ⓢ",
	CircleMinus: "⊖",
	CirclePlus: "⊕",
	CircleTimes: "⊗",
	cir: "○",
	cirE: "⧃",
	cire: "≗",
	cirfnint: "⨐",
	cirmid: "⫯",
	cirscir: "⧂",
	ClockwiseContourIntegral: "∲",
	CloseCurlyDoubleQuote: "”",
	CloseCurlyQuote: "’",
	clubs: "♣",
	clubsuit: "♣",
	colon: ":",
	Colon: "∷",
	Colone: "⩴",
	colone: "≔",
	coloneq: "≔",
	comma: ",",
	commat: "@",
	comp: "∁",
	compfn: "∘",
	complement: "∁",
	complexes: "ℂ",
	cong: "≅",
	congdot: "⩭",
	Congruent: "≡",
	conint: "∮",
	Conint: "∯",
	ContourIntegral: "∮",
	copf: "𝕔",
	Copf: "ℂ",
	coprod: "∐",
	Coproduct: "∐",
	copy: "©",
	COPY: "©",
	copysr: "℗",
	CounterClockwiseContourIntegral: "∳",
	crarr: "↵",
	cross: "✗",
	Cross: "⨯",
	Cscr: "𝒞",
	cscr: "𝒸",
	csub: "⫏",
	csube: "⫑",
	csup: "⫐",
	csupe: "⫒",
	ctdot: "⋯",
	cudarrl: "⤸",
	cudarrr: "⤵",
	cuepr: "⋞",
	cuesc: "⋟",
	cularr: "↶",
	cularrp: "⤽",
	cupbrcap: "⩈",
	cupcap: "⩆",
	CupCap: "≍",
	cup: "∪",
	Cup: "⋓",
	cupcup: "⩊",
	cupdot: "⊍",
	cupor: "⩅",
	cups: "∪︀",
	curarr: "↷",
	curarrm: "⤼",
	curlyeqprec: "⋞",
	curlyeqsucc: "⋟",
	curlyvee: "⋎",
	curlywedge: "⋏",
	curren: "¤",
	curvearrowleft: "↶",
	curvearrowright: "↷",
	cuvee: "⋎",
	cuwed: "⋏",
	cwconint: "∲",
	cwint: "∱",
	cylcty: "⌭",
	dagger: "†",
	Dagger: "‡",
	daleth: "ℸ",
	darr: "↓",
	Darr: "↡",
	dArr: "⇓",
	dash: "‐",
	Dashv: "⫤",
	dashv: "⊣",
	dbkarow: "⤏",
	dblac: "˝",
	Dcaron: "Ď",
	dcaron: "ď",
	Dcy: "Д",
	dcy: "д",
	ddagger: "‡",
	ddarr: "⇊",
	DD: "ⅅ",
	dd: "ⅆ",
	DDotrahd: "⤑",
	ddotseq: "⩷",
	deg: "°",
	Del: "∇",
	Delta: "Δ",
	delta: "δ",
	demptyv: "⦱",
	dfisht: "⥿",
	Dfr: "𝔇",
	dfr: "𝔡",
	dHar: "⥥",
	dharl: "⇃",
	dharr: "⇂",
	DiacriticalAcute: "´",
	DiacriticalDot: "˙",
	DiacriticalDoubleAcute: "˝",
	DiacriticalGrave: "`",
	DiacriticalTilde: "˜",
	diam: "⋄",
	diamond: "⋄",
	Diamond: "⋄",
	diamondsuit: "♦",
	diams: "♦",
	die: "¨",
	DifferentialD: "ⅆ",
	digamma: "ϝ",
	disin: "⋲",
	div: "÷",
	divide: "÷",
	divideontimes: "⋇",
	divonx: "⋇",
	DJcy: "Ђ",
	djcy: "ђ",
	dlcorn: "⌞",
	dlcrop: "⌍",
	dollar: "$",
	Dopf: "𝔻",
	dopf: "𝕕",
	Dot: "¨",
	dot: "˙",
	DotDot: "⃜",
	doteq: "≐",
	doteqdot: "≑",
	DotEqual: "≐",
	dotminus: "∸",
	dotplus: "∔",
	dotsquare: "⊡",
	doublebarwedge: "⌆",
	DoubleContourIntegral: "∯",
	DoubleDot: "¨",
	DoubleDownArrow: "⇓",
	DoubleLeftArrow: "⇐",
	DoubleLeftRightArrow: "⇔",
	DoubleLeftTee: "⫤",
	DoubleLongLeftArrow: "⟸",
	DoubleLongLeftRightArrow: "⟺",
	DoubleLongRightArrow: "⟹",
	DoubleRightArrow: "⇒",
	DoubleRightTee: "⊨",
	DoubleUpArrow: "⇑",
	DoubleUpDownArrow: "⇕",
	DoubleVerticalBar: "∥",
	DownArrowBar: "⤓",
	downarrow: "↓",
	DownArrow: "↓",
	Downarrow: "⇓",
	DownArrowUpArrow: "⇵",
	DownBreve: "̑",
	downdownarrows: "⇊",
	downharpoonleft: "⇃",
	downharpoonright: "⇂",
	DownLeftRightVector: "⥐",
	DownLeftTeeVector: "⥞",
	DownLeftVectorBar: "⥖",
	DownLeftVector: "↽",
	DownRightTeeVector: "⥟",
	DownRightVectorBar: "⥗",
	DownRightVector: "⇁",
	DownTeeArrow: "↧",
	DownTee: "⊤",
	drbkarow: "⤐",
	drcorn: "⌟",
	drcrop: "⌌",
	Dscr: "𝒟",
	dscr: "𝒹",
	DScy: "Ѕ",
	dscy: "ѕ",
	dsol: "⧶",
	Dstrok: "Đ",
	dstrok: "đ",
	dtdot: "⋱",
	dtri: "▿",
	dtrif: "▾",
	duarr: "⇵",
	duhar: "⥯",
	dwangle: "⦦",
	DZcy: "Џ",
	dzcy: "џ",
	dzigrarr: "⟿",
	Eacute: "É",
	eacute: "é",
	easter: "⩮",
	Ecaron: "Ě",
	ecaron: "ě",
	Ecirc: "Ê",
	ecirc: "ê",
	ecir: "≖",
	ecolon: "≕",
	Ecy: "Э",
	ecy: "э",
	eDDot: "⩷",
	Edot: "Ė",
	edot: "ė",
	eDot: "≑",
	ee: "ⅇ",
	efDot: "≒",
	Efr: "𝔈",
	efr: "𝔢",
	eg: "⪚",
	Egrave: "È",
	egrave: "è",
	egs: "⪖",
	egsdot: "⪘",
	el: "⪙",
	Element: "∈",
	elinters: "⏧",
	ell: "ℓ",
	els: "⪕",
	elsdot: "⪗",
	Emacr: "Ē",
	emacr: "ē",
	empty: "∅",
	emptyset: "∅",
	EmptySmallSquare: "◻",
	emptyv: "∅",
	EmptyVerySmallSquare: "▫",
	emsp13: " ",
	emsp14: " ",
	emsp: " ",
	ENG: "Ŋ",
	eng: "ŋ",
	ensp: " ",
	Eogon: "Ę",
	eogon: "ę",
	Eopf: "𝔼",
	eopf: "𝕖",
	epar: "⋕",
	eparsl: "⧣",
	eplus: "⩱",
	epsi: "ε",
	Epsilon: "Ε",
	epsilon: "ε",
	epsiv: "ϵ",
	eqcirc: "≖",
	eqcolon: "≕",
	eqsim: "≂",
	eqslantgtr: "⪖",
	eqslantless: "⪕",
	Equal: "⩵",
	equals: "=",
	EqualTilde: "≂",
	equest: "≟",
	Equilibrium: "⇌",
	equiv: "≡",
	equivDD: "⩸",
	eqvparsl: "⧥",
	erarr: "⥱",
	erDot: "≓",
	escr: "ℯ",
	Escr: "ℰ",
	esdot: "≐",
	Esim: "⩳",
	esim: "≂",
	Eta: "Η",
	eta: "η",
	ETH: "Ð",
	eth: "ð",
	Euml: "Ë",
	euml: "ë",
	euro: "€",
	excl: "!",
	exist: "∃",
	Exists: "∃",
	expectation: "ℰ",
	exponentiale: "ⅇ",
	ExponentialE: "ⅇ",
	fallingdotseq: "≒",
	Fcy: "Ф",
	fcy: "ф",
	female: "♀",
	ffilig: "ﬃ",
	fflig: "ﬀ",
	ffllig: "ﬄ",
	Ffr: "𝔉",
	ffr: "𝔣",
	filig: "ﬁ",
	FilledSmallSquare: "◼",
	FilledVerySmallSquare: "▪",
	fjlig: "fj",
	flat: "♭",
	fllig: "ﬂ",
	fltns: "▱",
	fnof: "ƒ",
	Fopf: "𝔽",
	fopf: "𝕗",
	forall: "∀",
	ForAll: "∀",
	fork: "⋔",
	forkv: "⫙",
	Fouriertrf: "ℱ",
	fpartint: "⨍",
	frac12: "½",
	frac13: "⅓",
	frac14: "¼",
	frac15: "⅕",
	frac16: "⅙",
	frac18: "⅛",
	frac23: "⅔",
	frac25: "⅖",
	frac34: "¾",
	frac35: "⅗",
	frac38: "⅜",
	frac45: "⅘",
	frac56: "⅚",
	frac58: "⅝",
	frac78: "⅞",
	frasl: "⁄",
	frown: "⌢",
	fscr: "𝒻",
	Fscr: "ℱ",
	gacute: "ǵ",
	Gamma: "Γ",
	gamma: "γ",
	Gammad: "Ϝ",
	gammad: "ϝ",
	gap: "⪆",
	Gbreve: "Ğ",
	gbreve: "ğ",
	Gcedil: "Ģ",
	Gcirc: "Ĝ",
	gcirc: "ĝ",
	Gcy: "Г",
	gcy: "г",
	Gdot: "Ġ",
	gdot: "ġ",
	ge: "≥",
	gE: "≧",
	gEl: "⪌",
	gel: "⋛",
	geq: "≥",
	geqq: "≧",
	geqslant: "⩾",
	gescc: "⪩",
	ges: "⩾",
	gesdot: "⪀",
	gesdoto: "⪂",
	gesdotol: "⪄",
	gesl: "⋛︀",
	gesles: "⪔",
	Gfr: "𝔊",
	gfr: "𝔤",
	gg: "≫",
	Gg: "⋙",
	ggg: "⋙",
	gimel: "ℷ",
	GJcy: "Ѓ",
	gjcy: "ѓ",
	gla: "⪥",
	gl: "≷",
	glE: "⪒",
	glj: "⪤",
	gnap: "⪊",
	gnapprox: "⪊",
	gne: "⪈",
	gnE: "≩",
	gneq: "⪈",
	gneqq: "≩",
	gnsim: "⋧",
	Gopf: "𝔾",
	gopf: "𝕘",
	grave: "`",
	GreaterEqual: "≥",
	GreaterEqualLess: "⋛",
	GreaterFullEqual: "≧",
	GreaterGreater: "⪢",
	GreaterLess: "≷",
	GreaterSlantEqual: "⩾",
	GreaterTilde: "≳",
	Gscr: "𝒢",
	gscr: "ℊ",
	gsim: "≳",
	gsime: "⪎",
	gsiml: "⪐",
	gtcc: "⪧",
	gtcir: "⩺",
	gt: ">",
	GT: ">",
	Gt: "≫",
	gtdot: "⋗",
	gtlPar: "⦕",
	gtquest: "⩼",
	gtrapprox: "⪆",
	gtrarr: "⥸",
	gtrdot: "⋗",
	gtreqless: "⋛",
	gtreqqless: "⪌",
	gtrless: "≷",
	gtrsim: "≳",
	gvertneqq: "≩︀",
	gvnE: "≩︀",
	Hacek: "ˇ",
	hairsp: " ",
	half: "½",
	hamilt: "ℋ",
	HARDcy: "Ъ",
	hardcy: "ъ",
	harrcir: "⥈",
	harr: "↔",
	hArr: "⇔",
	harrw: "↭",
	Hat: "^",
	hbar: "ℏ",
	Hcirc: "Ĥ",
	hcirc: "ĥ",
	hearts: "♥",
	heartsuit: "♥",
	hellip: "…",
	hercon: "⊹",
	hfr: "𝔥",
	Hfr: "ℌ",
	HilbertSpace: "ℋ",
	hksearow: "⤥",
	hkswarow: "⤦",
	hoarr: "⇿",
	homtht: "∻",
	hookleftarrow: "↩",
	hookrightarrow: "↪",
	hopf: "𝕙",
	Hopf: "ℍ",
	horbar: "―",
	HorizontalLine: "─",
	hscr: "𝒽",
	Hscr: "ℋ",
	hslash: "ℏ",
	Hstrok: "Ħ",
	hstrok: "ħ",
	HumpDownHump: "≎",
	HumpEqual: "≏",
	hybull: "⁃",
	hyphen: "‐",
	Iacute: "Í",
	iacute: "í",
	ic: "⁣",
	Icirc: "Î",
	icirc: "î",
	Icy: "И",
	icy: "и",
	Idot: "İ",
	IEcy: "Е",
	iecy: "е",
	iexcl: "¡",
	iff: "⇔",
	ifr: "𝔦",
	Ifr: "ℑ",
	Igrave: "Ì",
	igrave: "ì",
	ii: "ⅈ",
	iiiint: "⨌",
	iiint: "∭",
	iinfin: "⧜",
	iiota: "℩",
	IJlig: "Ĳ",
	ijlig: "ĳ",
	Imacr: "Ī",
	imacr: "ī",
	image: "ℑ",
	ImaginaryI: "ⅈ",
	imagline: "ℐ",
	imagpart: "ℑ",
	imath: "ı",
	Im: "ℑ",
	imof: "⊷",
	imped: "Ƶ",
	Implies: "⇒",
	incare: "℅",
	in: "∈",
	infin: "∞",
	infintie: "⧝",
	inodot: "ı",
	intcal: "⊺",
	int: "∫",
	Int: "∬",
	integers: "ℤ",
	Integral: "∫",
	intercal: "⊺",
	Intersection: "⋂",
	intlarhk: "⨗",
	intprod: "⨼",
	InvisibleComma: "⁣",
	InvisibleTimes: "⁢",
	IOcy: "Ё",
	iocy: "ё",
	Iogon: "Į",
	iogon: "į",
	Iopf: "𝕀",
	iopf: "𝕚",
	Iota: "Ι",
	iota: "ι",
	iprod: "⨼",
	iquest: "¿",
	iscr: "𝒾",
	Iscr: "ℐ",
	isin: "∈",
	isindot: "⋵",
	isinE: "⋹",
	isins: "⋴",
	isinsv: "⋳",
	isinv: "∈",
	it: "⁢",
	Itilde: "Ĩ",
	itilde: "ĩ",
	Iukcy: "І",
	iukcy: "і",
	Iuml: "Ï",
	iuml: "ï",
	Jcirc: "Ĵ",
	jcirc: "ĵ",
	Jcy: "Й",
	jcy: "й",
	Jfr: "𝔍",
	jfr: "𝔧",
	jmath: "ȷ",
	Jopf: "𝕁",
	jopf: "𝕛",
	Jscr: "𝒥",
	jscr: "𝒿",
	Jsercy: "Ј",
	jsercy: "ј",
	Jukcy: "Є",
	jukcy: "є",
	Kappa: "Κ",
	kappa: "κ",
	kappav: "ϰ",
	Kcedil: "Ķ",
	kcedil: "ķ",
	Kcy: "К",
	kcy: "к",
	Kfr: "𝔎",
	kfr: "𝔨",
	kgreen: "ĸ",
	KHcy: "Х",
	khcy: "х",
	KJcy: "Ќ",
	kjcy: "ќ",
	Kopf: "𝕂",
	kopf: "𝕜",
	Kscr: "𝒦",
	kscr: "𝓀",
	lAarr: "⇚",
	Lacute: "Ĺ",
	lacute: "ĺ",
	laemptyv: "⦴",
	lagran: "ℒ",
	Lambda: "Λ",
	lambda: "λ",
	lang: "⟨",
	Lang: "⟪",
	langd: "⦑",
	langle: "⟨",
	lap: "⪅",
	Laplacetrf: "ℒ",
	laquo: "«",
	larrb: "⇤",
	larrbfs: "⤟",
	larr: "←",
	Larr: "↞",
	lArr: "⇐",
	larrfs: "⤝",
	larrhk: "↩",
	larrlp: "↫",
	larrpl: "⤹",
	larrsim: "⥳",
	larrtl: "↢",
	latail: "⤙",
	lAtail: "⤛",
	lat: "⪫",
	late: "⪭",
	lates: "⪭︀",
	lbarr: "⤌",
	lBarr: "⤎",
	lbbrk: "❲",
	lbrace: "{",
	lbrack: "[",
	lbrke: "⦋",
	lbrksld: "⦏",
	lbrkslu: "⦍",
	Lcaron: "Ľ",
	lcaron: "ľ",
	Lcedil: "Ļ",
	lcedil: "ļ",
	lceil: "⌈",
	lcub: "{",
	Lcy: "Л",
	lcy: "л",
	ldca: "⤶",
	ldquo: "“",
	ldquor: "„",
	ldrdhar: "⥧",
	ldrushar: "⥋",
	ldsh: "↲",
	le: "≤",
	lE: "≦",
	LeftAngleBracket: "⟨",
	LeftArrowBar: "⇤",
	leftarrow: "←",
	LeftArrow: "←",
	Leftarrow: "⇐",
	LeftArrowRightArrow: "⇆",
	leftarrowtail: "↢",
	LeftCeiling: "⌈",
	LeftDoubleBracket: "⟦",
	LeftDownTeeVector: "⥡",
	LeftDownVectorBar: "⥙",
	LeftDownVector: "⇃",
	LeftFloor: "⌊",
	leftharpoondown: "↽",
	leftharpoonup: "↼",
	leftleftarrows: "⇇",
	leftrightarrow: "↔",
	LeftRightArrow: "↔",
	Leftrightarrow: "⇔",
	leftrightarrows: "⇆",
	leftrightharpoons: "⇋",
	leftrightsquigarrow: "↭",
	LeftRightVector: "⥎",
	LeftTeeArrow: "↤",
	LeftTee: "⊣",
	LeftTeeVector: "⥚",
	leftthreetimes: "⋋",
	LeftTriangleBar: "⧏",
	LeftTriangle: "⊲",
	LeftTriangleEqual: "⊴",
	LeftUpDownVector: "⥑",
	LeftUpTeeVector: "⥠",
	LeftUpVectorBar: "⥘",
	LeftUpVector: "↿",
	LeftVectorBar: "⥒",
	LeftVector: "↼",
	lEg: "⪋",
	leg: "⋚",
	leq: "≤",
	leqq: "≦",
	leqslant: "⩽",
	lescc: "⪨",
	les: "⩽",
	lesdot: "⩿",
	lesdoto: "⪁",
	lesdotor: "⪃",
	lesg: "⋚︀",
	lesges: "⪓",
	lessapprox: "⪅",
	lessdot: "⋖",
	lesseqgtr: "⋚",
	lesseqqgtr: "⪋",
	LessEqualGreater: "⋚",
	LessFullEqual: "≦",
	LessGreater: "≶",
	lessgtr: "≶",
	LessLess: "⪡",
	lesssim: "≲",
	LessSlantEqual: "⩽",
	LessTilde: "≲",
	lfisht: "⥼",
	lfloor: "⌊",
	Lfr: "𝔏",
	lfr: "𝔩",
	lg: "≶",
	lgE: "⪑",
	lHar: "⥢",
	lhard: "↽",
	lharu: "↼",
	lharul: "⥪",
	lhblk: "▄",
	LJcy: "Љ",
	ljcy: "љ",
	llarr: "⇇",
	ll: "≪",
	Ll: "⋘",
	llcorner: "⌞",
	Lleftarrow: "⇚",
	llhard: "⥫",
	lltri: "◺",
	Lmidot: "Ŀ",
	lmidot: "ŀ",
	lmoustache: "⎰",
	lmoust: "⎰",
	lnap: "⪉",
	lnapprox: "⪉",
	lne: "⪇",
	lnE: "≨",
	lneq: "⪇",
	lneqq: "≨",
	lnsim: "⋦",
	loang: "⟬",
	loarr: "⇽",
	lobrk: "⟦",
	longleftarrow: "⟵",
	LongLeftArrow: "⟵",
	Longleftarrow: "⟸",
	longleftrightarrow: "⟷",
	LongLeftRightArrow: "⟷",
	Longleftrightarrow: "⟺",
	longmapsto: "⟼",
	longrightarrow: "⟶",
	LongRightArrow: "⟶",
	Longrightarrow: "⟹",
	looparrowleft: "↫",
	looparrowright: "↬",
	lopar: "⦅",
	Lopf: "𝕃",
	lopf: "𝕝",
	loplus: "⨭",
	lotimes: "⨴",
	lowast: "∗",
	lowbar: "_",
	LowerLeftArrow: "↙",
	LowerRightArrow: "↘",
	loz: "◊",
	lozenge: "◊",
	lozf: "⧫",
	lpar: "(",
	lparlt: "⦓",
	lrarr: "⇆",
	lrcorner: "⌟",
	lrhar: "⇋",
	lrhard: "⥭",
	lrm: "‎",
	lrtri: "⊿",
	lsaquo: "‹",
	lscr: "𝓁",
	Lscr: "ℒ",
	lsh: "↰",
	Lsh: "↰",
	lsim: "≲",
	lsime: "⪍",
	lsimg: "⪏",
	lsqb: "[",
	lsquo: "‘",
	lsquor: "‚",
	Lstrok: "Ł",
	lstrok: "ł",
	ltcc: "⪦",
	ltcir: "⩹",
	lt: "<",
	LT: "<",
	Lt: "≪",
	ltdot: "⋖",
	lthree: "⋋",
	ltimes: "⋉",
	ltlarr: "⥶",
	ltquest: "⩻",
	ltri: "◃",
	ltrie: "⊴",
	ltrif: "◂",
	ltrPar: "⦖",
	lurdshar: "⥊",
	luruhar: "⥦",
	lvertneqq: "≨︀",
	lvnE: "≨︀",
	macr: "¯",
	male: "♂",
	malt: "✠",
	maltese: "✠",
	Map: "⤅",
	map: "↦",
	mapsto: "↦",
	mapstodown: "↧",
	mapstoleft: "↤",
	mapstoup: "↥",
	marker: "▮",
	mcomma: "⨩",
	Mcy: "М",
	mcy: "м",
	mdash: "—",
	mDDot: "∺",
	measuredangle: "∡",
	MediumSpace: " ",
	Mellintrf: "ℳ",
	Mfr: "𝔐",
	mfr: "𝔪",
	mho: "℧",
	micro: "µ",
	midast: "*",
	midcir: "⫰",
	mid: "∣",
	middot: "·",
	minusb: "⊟",
	minus: "−",
	minusd: "∸",
	minusdu: "⨪",
	MinusPlus: "∓",
	mlcp: "⫛",
	mldr: "…",
	mnplus: "∓",
	models: "⊧",
	Mopf: "𝕄",
	mopf: "𝕞",
	mp: "∓",
	mscr: "𝓂",
	Mscr: "ℳ",
	mstpos: "∾",
	Mu: "Μ",
	mu: "μ",
	multimap: "⊸",
	mumap: "⊸",
	nabla: "∇",
	Nacute: "Ń",
	nacute: "ń",
	nang: "∠⃒",
	nap: "≉",
	napE: "⩰̸",
	napid: "≋̸",
	napos: "ŉ",
	napprox: "≉",
	natural: "♮",
	naturals: "ℕ",
	natur: "♮",
	nbsp: "\xA0",
	nbump: "≎̸",
	nbumpe: "≏̸",
	ncap: "⩃",
	Ncaron: "Ň",
	ncaron: "ň",
	Ncedil: "Ņ",
	ncedil: "ņ",
	ncong: "≇",
	ncongdot: "⩭̸",
	ncup: "⩂",
	Ncy: "Н",
	ncy: "н",
	ndash: "–",
	nearhk: "⤤",
	nearr: "↗",
	neArr: "⇗",
	nearrow: "↗",
	ne: "≠",
	nedot: "≐̸",
	NegativeMediumSpace: "​",
	NegativeThickSpace: "​",
	NegativeThinSpace: "​",
	NegativeVeryThinSpace: "​",
	nequiv: "≢",
	nesear: "⤨",
	nesim: "≂̸",
	NestedGreaterGreater: "≫",
	NestedLessLess: "≪",
	NewLine: `
`,
	nexist: "∄",
	nexists: "∄",
	Nfr: "𝔑",
	nfr: "𝔫",
	ngE: "≧̸",
	nge: "≱",
	ngeq: "≱",
	ngeqq: "≧̸",
	ngeqslant: "⩾̸",
	nges: "⩾̸",
	nGg: "⋙̸",
	ngsim: "≵",
	nGt: "≫⃒",
	ngt: "≯",
	ngtr: "≯",
	nGtv: "≫̸",
	nharr: "↮",
	nhArr: "⇎",
	nhpar: "⫲",
	ni: "∋",
	nis: "⋼",
	nisd: "⋺",
	niv: "∋",
	NJcy: "Њ",
	njcy: "њ",
	nlarr: "↚",
	nlArr: "⇍",
	nldr: "‥",
	nlE: "≦̸",
	nle: "≰",
	nleftarrow: "↚",
	nLeftarrow: "⇍",
	nleftrightarrow: "↮",
	nLeftrightarrow: "⇎",
	nleq: "≰",
	nleqq: "≦̸",
	nleqslant: "⩽̸",
	nles: "⩽̸",
	nless: "≮",
	nLl: "⋘̸",
	nlsim: "≴",
	nLt: "≪⃒",
	nlt: "≮",
	nltri: "⋪",
	nltrie: "⋬",
	nLtv: "≪̸",
	nmid: "∤",
	NoBreak: "⁠",
	NonBreakingSpace: "\xA0",
	nopf: "𝕟",
	Nopf: "ℕ",
	Not: "⫬",
	not: "¬",
	NotCongruent: "≢",
	NotCupCap: "≭",
	NotDoubleVerticalBar: "∦",
	NotElement: "∉",
	NotEqual: "≠",
	NotEqualTilde: "≂̸",
	NotExists: "∄",
	NotGreater: "≯",
	NotGreaterEqual: "≱",
	NotGreaterFullEqual: "≧̸",
	NotGreaterGreater: "≫̸",
	NotGreaterLess: "≹",
	NotGreaterSlantEqual: "⩾̸",
	NotGreaterTilde: "≵",
	NotHumpDownHump: "≎̸",
	NotHumpEqual: "≏̸",
	notin: "∉",
	notindot: "⋵̸",
	notinE: "⋹̸",
	notinva: "∉",
	notinvb: "⋷",
	notinvc: "⋶",
	NotLeftTriangleBar: "⧏̸",
	NotLeftTriangle: "⋪",
	NotLeftTriangleEqual: "⋬",
	NotLess: "≮",
	NotLessEqual: "≰",
	NotLessGreater: "≸",
	NotLessLess: "≪̸",
	NotLessSlantEqual: "⩽̸",
	NotLessTilde: "≴",
	NotNestedGreaterGreater: "⪢̸",
	NotNestedLessLess: "⪡̸",
	notni: "∌",
	notniva: "∌",
	notnivb: "⋾",
	notnivc: "⋽",
	NotPrecedes: "⊀",
	NotPrecedesEqual: "⪯̸",
	NotPrecedesSlantEqual: "⋠",
	NotReverseElement: "∌",
	NotRightTriangleBar: "⧐̸",
	NotRightTriangle: "⋫",
	NotRightTriangleEqual: "⋭",
	NotSquareSubset: "⊏̸",
	NotSquareSubsetEqual: "⋢",
	NotSquareSuperset: "⊐̸",
	NotSquareSupersetEqual: "⋣",
	NotSubset: "⊂⃒",
	NotSubsetEqual: "⊈",
	NotSucceeds: "⊁",
	NotSucceedsEqual: "⪰̸",
	NotSucceedsSlantEqual: "⋡",
	NotSucceedsTilde: "≿̸",
	NotSuperset: "⊃⃒",
	NotSupersetEqual: "⊉",
	NotTilde: "≁",
	NotTildeEqual: "≄",
	NotTildeFullEqual: "≇",
	NotTildeTilde: "≉",
	NotVerticalBar: "∤",
	nparallel: "∦",
	npar: "∦",
	nparsl: "⫽⃥",
	npart: "∂̸",
	npolint: "⨔",
	npr: "⊀",
	nprcue: "⋠",
	nprec: "⊀",
	npreceq: "⪯̸",
	npre: "⪯̸",
	nrarrc: "⤳̸",
	nrarr: "↛",
	nrArr: "⇏",
	nrarrw: "↝̸",
	nrightarrow: "↛",
	nRightarrow: "⇏",
	nrtri: "⋫",
	nrtrie: "⋭",
	nsc: "⊁",
	nsccue: "⋡",
	nsce: "⪰̸",
	Nscr: "𝒩",
	nscr: "𝓃",
	nshortmid: "∤",
	nshortparallel: "∦",
	nsim: "≁",
	nsime: "≄",
	nsimeq: "≄",
	nsmid: "∤",
	nspar: "∦",
	nsqsube: "⋢",
	nsqsupe: "⋣",
	nsub: "⊄",
	nsubE: "⫅̸",
	nsube: "⊈",
	nsubset: "⊂⃒",
	nsubseteq: "⊈",
	nsubseteqq: "⫅̸",
	nsucc: "⊁",
	nsucceq: "⪰̸",
	nsup: "⊅",
	nsupE: "⫆̸",
	nsupe: "⊉",
	nsupset: "⊃⃒",
	nsupseteq: "⊉",
	nsupseteqq: "⫆̸",
	ntgl: "≹",
	Ntilde: "Ñ",
	ntilde: "ñ",
	ntlg: "≸",
	ntriangleleft: "⋪",
	ntrianglelefteq: "⋬",
	ntriangleright: "⋫",
	ntrianglerighteq: "⋭",
	Nu: "Ν",
	nu: "ν",
	num: "#",
	numero: "№",
	numsp: " ",
	nvap: "≍⃒",
	nvdash: "⊬",
	nvDash: "⊭",
	nVdash: "⊮",
	nVDash: "⊯",
	nvge: "≥⃒",
	nvgt: ">⃒",
	nvHarr: "⤄",
	nvinfin: "⧞",
	nvlArr: "⤂",
	nvle: "≤⃒",
	nvlt: "<⃒",
	nvltrie: "⊴⃒",
	nvrArr: "⤃",
	nvrtrie: "⊵⃒",
	nvsim: "∼⃒",
	nwarhk: "⤣",
	nwarr: "↖",
	nwArr: "⇖",
	nwarrow: "↖",
	nwnear: "⤧",
	Oacute: "Ó",
	oacute: "ó",
	oast: "⊛",
	Ocirc: "Ô",
	ocirc: "ô",
	ocir: "⊚",
	Ocy: "О",
	ocy: "о",
	odash: "⊝",
	Odblac: "Ő",
	odblac: "ő",
	odiv: "⨸",
	odot: "⊙",
	odsold: "⦼",
	OElig: "Œ",
	oelig: "œ",
	ofcir: "⦿",
	Ofr: "𝔒",
	ofr: "𝔬",
	ogon: "˛",
	Ograve: "Ò",
	ograve: "ò",
	ogt: "⧁",
	ohbar: "⦵",
	ohm: "Ω",
	oint: "∮",
	olarr: "↺",
	olcir: "⦾",
	olcross: "⦻",
	oline: "‾",
	olt: "⧀",
	Omacr: "Ō",
	omacr: "ō",
	Omega: "Ω",
	omega: "ω",
	Omicron: "Ο",
	omicron: "ο",
	omid: "⦶",
	ominus: "⊖",
	Oopf: "𝕆",
	oopf: "𝕠",
	opar: "⦷",
	OpenCurlyDoubleQuote: "“",
	OpenCurlyQuote: "‘",
	operp: "⦹",
	oplus: "⊕",
	orarr: "↻",
	Or: "⩔",
	or: "∨",
	ord: "⩝",
	order: "ℴ",
	orderof: "ℴ",
	ordf: "ª",
	ordm: "º",
	origof: "⊶",
	oror: "⩖",
	orslope: "⩗",
	orv: "⩛",
	oS: "Ⓢ",
	Oscr: "𝒪",
	oscr: "ℴ",
	Oslash: "Ø",
	oslash: "ø",
	osol: "⊘",
	Otilde: "Õ",
	otilde: "õ",
	otimesas: "⨶",
	Otimes: "⨷",
	otimes: "⊗",
	Ouml: "Ö",
	ouml: "ö",
	ovbar: "⌽",
	OverBar: "‾",
	OverBrace: "⏞",
	OverBracket: "⎴",
	OverParenthesis: "⏜",
	para: "¶",
	parallel: "∥",
	par: "∥",
	parsim: "⫳",
	parsl: "⫽",
	part: "∂",
	PartialD: "∂",
	Pcy: "П",
	pcy: "п",
	percnt: "%",
	period: ".",
	permil: "‰",
	perp: "⊥",
	pertenk: "‱",
	Pfr: "𝔓",
	pfr: "𝔭",
	Phi: "Φ",
	phi: "φ",
	phiv: "ϕ",
	phmmat: "ℳ",
	phone: "☎",
	Pi: "Π",
	pi: "π",
	pitchfork: "⋔",
	piv: "ϖ",
	planck: "ℏ",
	planckh: "ℎ",
	plankv: "ℏ",
	plusacir: "⨣",
	plusb: "⊞",
	pluscir: "⨢",
	plus: "+",
	plusdo: "∔",
	plusdu: "⨥",
	pluse: "⩲",
	PlusMinus: "±",
	plusmn: "±",
	plussim: "⨦",
	plustwo: "⨧",
	pm: "±",
	Poincareplane: "ℌ",
	pointint: "⨕",
	popf: "𝕡",
	Popf: "ℙ",
	pound: "£",
	prap: "⪷",
	Pr: "⪻",
	pr: "≺",
	prcue: "≼",
	precapprox: "⪷",
	prec: "≺",
	preccurlyeq: "≼",
	Precedes: "≺",
	PrecedesEqual: "⪯",
	PrecedesSlantEqual: "≼",
	PrecedesTilde: "≾",
	preceq: "⪯",
	precnapprox: "⪹",
	precneqq: "⪵",
	precnsim: "⋨",
	pre: "⪯",
	prE: "⪳",
	precsim: "≾",
	prime: "′",
	Prime: "″",
	primes: "ℙ",
	prnap: "⪹",
	prnE: "⪵",
	prnsim: "⋨",
	prod: "∏",
	Product: "∏",
	profalar: "⌮",
	profline: "⌒",
	profsurf: "⌓",
	prop: "∝",
	Proportional: "∝",
	Proportion: "∷",
	propto: "∝",
	prsim: "≾",
	prurel: "⊰",
	Pscr: "𝒫",
	pscr: "𝓅",
	Psi: "Ψ",
	psi: "ψ",
	puncsp: " ",
	Qfr: "𝔔",
	qfr: "𝔮",
	qint: "⨌",
	qopf: "𝕢",
	Qopf: "ℚ",
	qprime: "⁗",
	Qscr: "𝒬",
	qscr: "𝓆",
	quaternions: "ℍ",
	quatint: "⨖",
	quest: "?",
	questeq: "≟",
	quot: "\"",
	QUOT: "\"",
	rAarr: "⇛",
	race: "∽̱",
	Racute: "Ŕ",
	racute: "ŕ",
	radic: "√",
	raemptyv: "⦳",
	rang: "⟩",
	Rang: "⟫",
	rangd: "⦒",
	range: "⦥",
	rangle: "⟩",
	raquo: "»",
	rarrap: "⥵",
	rarrb: "⇥",
	rarrbfs: "⤠",
	rarrc: "⤳",
	rarr: "→",
	Rarr: "↠",
	rArr: "⇒",
	rarrfs: "⤞",
	rarrhk: "↪",
	rarrlp: "↬",
	rarrpl: "⥅",
	rarrsim: "⥴",
	Rarrtl: "⤖",
	rarrtl: "↣",
	rarrw: "↝",
	ratail: "⤚",
	rAtail: "⤜",
	ratio: "∶",
	rationals: "ℚ",
	rbarr: "⤍",
	rBarr: "⤏",
	RBarr: "⤐",
	rbbrk: "❳",
	rbrace: "}",
	rbrack: "]",
	rbrke: "⦌",
	rbrksld: "⦎",
	rbrkslu: "⦐",
	Rcaron: "Ř",
	rcaron: "ř",
	Rcedil: "Ŗ",
	rcedil: "ŗ",
	rceil: "⌉",
	rcub: "}",
	Rcy: "Р",
	rcy: "р",
	rdca: "⤷",
	rdldhar: "⥩",
	rdquo: "”",
	rdquor: "”",
	rdsh: "↳",
	real: "ℜ",
	realine: "ℛ",
	realpart: "ℜ",
	reals: "ℝ",
	Re: "ℜ",
	rect: "▭",
	reg: "®",
	REG: "®",
	ReverseElement: "∋",
	ReverseEquilibrium: "⇋",
	ReverseUpEquilibrium: "⥯",
	rfisht: "⥽",
	rfloor: "⌋",
	rfr: "𝔯",
	Rfr: "ℜ",
	rHar: "⥤",
	rhard: "⇁",
	rharu: "⇀",
	rharul: "⥬",
	Rho: "Ρ",
	rho: "ρ",
	rhov: "ϱ",
	RightAngleBracket: "⟩",
	RightArrowBar: "⇥",
	rightarrow: "→",
	RightArrow: "→",
	Rightarrow: "⇒",
	RightArrowLeftArrow: "⇄",
	rightarrowtail: "↣",
	RightCeiling: "⌉",
	RightDoubleBracket: "⟧",
	RightDownTeeVector: "⥝",
	RightDownVectorBar: "⥕",
	RightDownVector: "⇂",
	RightFloor: "⌋",
	rightharpoondown: "⇁",
	rightharpoonup: "⇀",
	rightleftarrows: "⇄",
	rightleftharpoons: "⇌",
	rightrightarrows: "⇉",
	rightsquigarrow: "↝",
	RightTeeArrow: "↦",
	RightTee: "⊢",
	RightTeeVector: "⥛",
	rightthreetimes: "⋌",
	RightTriangleBar: "⧐",
	RightTriangle: "⊳",
	RightTriangleEqual: "⊵",
	RightUpDownVector: "⥏",
	RightUpTeeVector: "⥜",
	RightUpVectorBar: "⥔",
	RightUpVector: "↾",
	RightVectorBar: "⥓",
	RightVector: "⇀",
	ring: "˚",
	risingdotseq: "≓",
	rlarr: "⇄",
	rlhar: "⇌",
	rlm: "‏",
	rmoustache: "⎱",
	rmoust: "⎱",
	rnmid: "⫮",
	roang: "⟭",
	roarr: "⇾",
	robrk: "⟧",
	ropar: "⦆",
	ropf: "𝕣",
	Ropf: "ℝ",
	roplus: "⨮",
	rotimes: "⨵",
	RoundImplies: "⥰",
	rpar: ")",
	rpargt: "⦔",
	rppolint: "⨒",
	rrarr: "⇉",
	Rrightarrow: "⇛",
	rsaquo: "›",
	rscr: "𝓇",
	Rscr: "ℛ",
	rsh: "↱",
	Rsh: "↱",
	rsqb: "]",
	rsquo: "’",
	rsquor: "’",
	rthree: "⋌",
	rtimes: "⋊",
	rtri: "▹",
	rtrie: "⊵",
	rtrif: "▸",
	rtriltri: "⧎",
	RuleDelayed: "⧴",
	ruluhar: "⥨",
	rx: "℞",
	Sacute: "Ś",
	sacute: "ś",
	sbquo: "‚",
	scap: "⪸",
	Scaron: "Š",
	scaron: "š",
	Sc: "⪼",
	sc: "≻",
	sccue: "≽",
	sce: "⪰",
	scE: "⪴",
	Scedil: "Ş",
	scedil: "ş",
	Scirc: "Ŝ",
	scirc: "ŝ",
	scnap: "⪺",
	scnE: "⪶",
	scnsim: "⋩",
	scpolint: "⨓",
	scsim: "≿",
	Scy: "С",
	scy: "с",
	sdotb: "⊡",
	sdot: "⋅",
	sdote: "⩦",
	searhk: "⤥",
	searr: "↘",
	seArr: "⇘",
	searrow: "↘",
	sect: "§",
	semi: ";",
	seswar: "⤩",
	setminus: "∖",
	setmn: "∖",
	sext: "✶",
	Sfr: "𝔖",
	sfr: "𝔰",
	sfrown: "⌢",
	sharp: "♯",
	SHCHcy: "Щ",
	shchcy: "щ",
	SHcy: "Ш",
	shcy: "ш",
	ShortDownArrow: "↓",
	ShortLeftArrow: "←",
	shortmid: "∣",
	shortparallel: "∥",
	ShortRightArrow: "→",
	ShortUpArrow: "↑",
	shy: "­",
	Sigma: "Σ",
	sigma: "σ",
	sigmaf: "ς",
	sigmav: "ς",
	sim: "∼",
	simdot: "⩪",
	sime: "≃",
	simeq: "≃",
	simg: "⪞",
	simgE: "⪠",
	siml: "⪝",
	simlE: "⪟",
	simne: "≆",
	simplus: "⨤",
	simrarr: "⥲",
	slarr: "←",
	SmallCircle: "∘",
	smallsetminus: "∖",
	smashp: "⨳",
	smeparsl: "⧤",
	smid: "∣",
	smile: "⌣",
	smt: "⪪",
	smte: "⪬",
	smtes: "⪬︀",
	SOFTcy: "Ь",
	softcy: "ь",
	solbar: "⌿",
	solb: "⧄",
	sol: "/",
	Sopf: "𝕊",
	sopf: "𝕤",
	spades: "♠",
	spadesuit: "♠",
	spar: "∥",
	sqcap: "⊓",
	sqcaps: "⊓︀",
	sqcup: "⊔",
	sqcups: "⊔︀",
	Sqrt: "√",
	sqsub: "⊏",
	sqsube: "⊑",
	sqsubset: "⊏",
	sqsubseteq: "⊑",
	sqsup: "⊐",
	sqsupe: "⊒",
	sqsupset: "⊐",
	sqsupseteq: "⊒",
	square: "□",
	Square: "□",
	SquareIntersection: "⊓",
	SquareSubset: "⊏",
	SquareSubsetEqual: "⊑",
	SquareSuperset: "⊐",
	SquareSupersetEqual: "⊒",
	SquareUnion: "⊔",
	squarf: "▪",
	squ: "□",
	squf: "▪",
	srarr: "→",
	Sscr: "𝒮",
	sscr: "𝓈",
	ssetmn: "∖",
	ssmile: "⌣",
	sstarf: "⋆",
	Star: "⋆",
	star: "☆",
	starf: "★",
	straightepsilon: "ϵ",
	straightphi: "ϕ",
	strns: "¯",
	sub: "⊂",
	Sub: "⋐",
	subdot: "⪽",
	subE: "⫅",
	sube: "⊆",
	subedot: "⫃",
	submult: "⫁",
	subnE: "⫋",
	subne: "⊊",
	subplus: "⪿",
	subrarr: "⥹",
	subset: "⊂",
	Subset: "⋐",
	subseteq: "⊆",
	subseteqq: "⫅",
	SubsetEqual: "⊆",
	subsetneq: "⊊",
	subsetneqq: "⫋",
	subsim: "⫇",
	subsub: "⫕",
	subsup: "⫓",
	succapprox: "⪸",
	succ: "≻",
	succcurlyeq: "≽",
	Succeeds: "≻",
	SucceedsEqual: "⪰",
	SucceedsSlantEqual: "≽",
	SucceedsTilde: "≿",
	succeq: "⪰",
	succnapprox: "⪺",
	succneqq: "⪶",
	succnsim: "⋩",
	succsim: "≿",
	SuchThat: "∋",
	sum: "∑",
	Sum: "∑",
	sung: "♪",
	sup1: "¹",
	sup2: "²",
	sup3: "³",
	sup: "⊃",
	Sup: "⋑",
	supdot: "⪾",
	supdsub: "⫘",
	supE: "⫆",
	supe: "⊇",
	supedot: "⫄",
	Superset: "⊃",
	SupersetEqual: "⊇",
	suphsol: "⟉",
	suphsub: "⫗",
	suplarr: "⥻",
	supmult: "⫂",
	supnE: "⫌",
	supne: "⊋",
	supplus: "⫀",
	supset: "⊃",
	Supset: "⋑",
	supseteq: "⊇",
	supseteqq: "⫆",
	supsetneq: "⊋",
	supsetneqq: "⫌",
	supsim: "⫈",
	supsub: "⫔",
	supsup: "⫖",
	swarhk: "⤦",
	swarr: "↙",
	swArr: "⇙",
	swarrow: "↙",
	swnwar: "⤪",
	szlig: "ß",
	Tab: "	",
	target: "⌖",
	Tau: "Τ",
	tau: "τ",
	tbrk: "⎴",
	Tcaron: "Ť",
	tcaron: "ť",
	Tcedil: "Ţ",
	tcedil: "ţ",
	Tcy: "Т",
	tcy: "т",
	tdot: "⃛",
	telrec: "⌕",
	Tfr: "𝔗",
	tfr: "𝔱",
	there4: "∴",
	therefore: "∴",
	Therefore: "∴",
	Theta: "Θ",
	theta: "θ",
	thetasym: "ϑ",
	thetav: "ϑ",
	thickapprox: "≈",
	thicksim: "∼",
	ThickSpace: "  ",
	ThinSpace: " ",
	thinsp: " ",
	thkap: "≈",
	thksim: "∼",
	THORN: "Þ",
	thorn: "þ",
	tilde: "˜",
	Tilde: "∼",
	TildeEqual: "≃",
	TildeFullEqual: "≅",
	TildeTilde: "≈",
	timesbar: "⨱",
	timesb: "⊠",
	times: "×",
	timesd: "⨰",
	tint: "∭",
	toea: "⤨",
	topbot: "⌶",
	topcir: "⫱",
	top: "⊤",
	Topf: "𝕋",
	topf: "𝕥",
	topfork: "⫚",
	tosa: "⤩",
	tprime: "‴",
	trade: "™",
	TRADE: "™",
	triangle: "▵",
	triangledown: "▿",
	triangleleft: "◃",
	trianglelefteq: "⊴",
	triangleq: "≜",
	triangleright: "▹",
	trianglerighteq: "⊵",
	tridot: "◬",
	trie: "≜",
	triminus: "⨺",
	TripleDot: "⃛",
	triplus: "⨹",
	trisb: "⧍",
	tritime: "⨻",
	trpezium: "⏢",
	Tscr: "𝒯",
	tscr: "𝓉",
	TScy: "Ц",
	tscy: "ц",
	TSHcy: "Ћ",
	tshcy: "ћ",
	Tstrok: "Ŧ",
	tstrok: "ŧ",
	twixt: "≬",
	twoheadleftarrow: "↞",
	twoheadrightarrow: "↠",
	Uacute: "Ú",
	uacute: "ú",
	uarr: "↑",
	Uarr: "↟",
	uArr: "⇑",
	Uarrocir: "⥉",
	Ubrcy: "Ў",
	ubrcy: "ў",
	Ubreve: "Ŭ",
	ubreve: "ŭ",
	Ucirc: "Û",
	ucirc: "û",
	Ucy: "У",
	ucy: "у",
	udarr: "⇅",
	Udblac: "Ű",
	udblac: "ű",
	udhar: "⥮",
	ufisht: "⥾",
	Ufr: "𝔘",
	ufr: "𝔲",
	Ugrave: "Ù",
	ugrave: "ù",
	uHar: "⥣",
	uharl: "↿",
	uharr: "↾",
	uhblk: "▀",
	ulcorn: "⌜",
	ulcorner: "⌜",
	ulcrop: "⌏",
	ultri: "◸",
	Umacr: "Ū",
	umacr: "ū",
	uml: "¨",
	UnderBar: "_",
	UnderBrace: "⏟",
	UnderBracket: "⎵",
	UnderParenthesis: "⏝",
	Union: "⋃",
	UnionPlus: "⊎",
	Uogon: "Ų",
	uogon: "ų",
	Uopf: "𝕌",
	uopf: "𝕦",
	UpArrowBar: "⤒",
	uparrow: "↑",
	UpArrow: "↑",
	Uparrow: "⇑",
	UpArrowDownArrow: "⇅",
	updownarrow: "↕",
	UpDownArrow: "↕",
	Updownarrow: "⇕",
	UpEquilibrium: "⥮",
	upharpoonleft: "↿",
	upharpoonright: "↾",
	uplus: "⊎",
	UpperLeftArrow: "↖",
	UpperRightArrow: "↗",
	upsi: "υ",
	Upsi: "ϒ",
	upsih: "ϒ",
	Upsilon: "Υ",
	upsilon: "υ",
	UpTeeArrow: "↥",
	UpTee: "⊥",
	upuparrows: "⇈",
	urcorn: "⌝",
	urcorner: "⌝",
	urcrop: "⌎",
	Uring: "Ů",
	uring: "ů",
	urtri: "◹",
	Uscr: "𝒰",
	uscr: "𝓊",
	utdot: "⋰",
	Utilde: "Ũ",
	utilde: "ũ",
	utri: "▵",
	utrif: "▴",
	uuarr: "⇈",
	Uuml: "Ü",
	uuml: "ü",
	uwangle: "⦧",
	vangrt: "⦜",
	varepsilon: "ϵ",
	varkappa: "ϰ",
	varnothing: "∅",
	varphi: "ϕ",
	varpi: "ϖ",
	varpropto: "∝",
	varr: "↕",
	vArr: "⇕",
	varrho: "ϱ",
	varsigma: "ς",
	varsubsetneq: "⊊︀",
	varsubsetneqq: "⫋︀",
	varsupsetneq: "⊋︀",
	varsupsetneqq: "⫌︀",
	vartheta: "ϑ",
	vartriangleleft: "⊲",
	vartriangleright: "⊳",
	vBar: "⫨",
	Vbar: "⫫",
	vBarv: "⫩",
	Vcy: "В",
	vcy: "в",
	vdash: "⊢",
	vDash: "⊨",
	Vdash: "⊩",
	VDash: "⊫",
	Vdashl: "⫦",
	veebar: "⊻",
	vee: "∨",
	Vee: "⋁",
	veeeq: "≚",
	vellip: "⋮",
	verbar: "|",
	Verbar: "‖",
	vert: "|",
	Vert: "‖",
	VerticalBar: "∣",
	VerticalLine: "|",
	VerticalSeparator: "❘",
	VerticalTilde: "≀",
	VeryThinSpace: " ",
	Vfr: "𝔙",
	vfr: "𝔳",
	vltri: "⊲",
	vnsub: "⊂⃒",
	vnsup: "⊃⃒",
	Vopf: "𝕍",
	vopf: "𝕧",
	vprop: "∝",
	vrtri: "⊳",
	Vscr: "𝒱",
	vscr: "𝓋",
	vsubnE: "⫋︀",
	vsubne: "⊊︀",
	vsupnE: "⫌︀",
	vsupne: "⊋︀",
	Vvdash: "⊪",
	vzigzag: "⦚",
	Wcirc: "Ŵ",
	wcirc: "ŵ",
	wedbar: "⩟",
	wedge: "∧",
	Wedge: "⋀",
	wedgeq: "≙",
	weierp: "℘",
	Wfr: "𝔚",
	wfr: "𝔴",
	Wopf: "𝕎",
	wopf: "𝕨",
	wp: "℘",
	wr: "≀",
	wreath: "≀",
	Wscr: "𝒲",
	wscr: "𝓌",
	xcap: "⋂",
	xcirc: "◯",
	xcup: "⋃",
	xdtri: "▽",
	Xfr: "𝔛",
	xfr: "𝔵",
	xharr: "⟷",
	xhArr: "⟺",
	Xi: "Ξ",
	xi: "ξ",
	xlarr: "⟵",
	xlArr: "⟸",
	xmap: "⟼",
	xnis: "⋻",
	xodot: "⨀",
	Xopf: "𝕏",
	xopf: "𝕩",
	xoplus: "⨁",
	xotime: "⨂",
	xrarr: "⟶",
	xrArr: "⟹",
	Xscr: "𝒳",
	xscr: "𝓍",
	xsqcup: "⨆",
	xuplus: "⨄",
	xutri: "△",
	xvee: "⋁",
	xwedge: "⋀",
	Yacute: "Ý",
	yacute: "ý",
	YAcy: "Я",
	yacy: "я",
	Ycirc: "Ŷ",
	ycirc: "ŷ",
	Ycy: "Ы",
	ycy: "ы",
	yen: "¥",
	Yfr: "𝔜",
	yfr: "𝔶",
	YIcy: "Ї",
	yicy: "ї",
	Yopf: "𝕐",
	yopf: "𝕪",
	Yscr: "𝒴",
	yscr: "𝓎",
	YUcy: "Ю",
	yucy: "ю",
	yuml: "ÿ",
	Yuml: "Ÿ",
	Zacute: "Ź",
	zacute: "ź",
	Zcaron: "Ž",
	zcaron: "ž",
	Zcy: "З",
	zcy: "з",
	Zdot: "Ż",
	zdot: "ż",
	zeetrf: "ℨ",
	ZeroWidthSpace: "​",
	Zeta: "Ζ",
	zeta: "ζ",
	zfr: "𝔷",
	Zfr: "ℨ",
	ZHcy: "Ж",
	zhcy: "ж",
	zigrarr: "⇝",
	zopf: "𝕫",
	Zopf: "ℤ",
	Zscr: "𝒵",
	zscr: "𝓏",
	zwj: "‍",
	zwnj: "‌"
}, ws = /^#[xX]([A-Fa-f0-9]+)$/, Ts = /^#([0-9]+)$/, xs = /^([A-Za-z0-9]+)$/, $e = (function() {
	function e(t) {
		this.named = t;
	}
	return e.prototype.parse = function(t) {
		if (t) {
			var r = t.match(ws);
			if (r) return String.fromCharCode(parseInt(r[1], 16));
			if (r = t.match(Ts), r) return String.fromCharCode(parseInt(r[1], 10));
			if (r = t.match(xs), r) return this.named[r[1]];
		}
	}, e;
})(), Ns = /[\t\n\f ]/, As = /[A-Za-z]/, Ps = /\r\n?/g;
function _(e) {
	return Ns.test(e);
}
function Jr(e) {
	return As.test(e);
}
function Cs(e) {
	return e.replace(Ps, `
`);
}
var Xe = (function() {
	function e(t, r, s) {
		s === void 0 && (s = "precompile"), this.delegate = t, this.entityParser = r, this.mode = s, this.state = "beforeData", this.line = -1, this.column = -1, this.input = "", this.index = -1, this.tagNameBuffer = "", this.states = {
			beforeData: function() {
				var n = this.peek();
				if (n === "<" && !this.isIgnoredEndTag()) this.transitionTo("tagOpen"), this.markTagStart(), this.consume();
				else {
					if (this.mode === "precompile" && n === `
`) {
						var i = this.tagNameBuffer.toLowerCase();
						(i === "pre" || i === "textarea") && this.consume();
					}
					this.transitionTo("data"), this.delegate.beginData();
				}
			},
			data: function() {
				var n = this.peek(), i = this.tagNameBuffer;
				n === "<" && !this.isIgnoredEndTag() ? (this.delegate.finishData(), this.transitionTo("tagOpen"), this.markTagStart(), this.consume()) : n === "&" && i !== "script" && i !== "style" ? (this.consume(), this.delegate.appendToData(this.consumeCharRef() || "&")) : (this.consume(), this.delegate.appendToData(n));
			},
			tagOpen: function() {
				var n = this.consume();
				n === "!" ? this.transitionTo("markupDeclarationOpen") : n === "/" ? this.transitionTo("endTagOpen") : (n === "@" || n === ":" || Jr(n)) && (this.transitionTo("tagName"), this.tagNameBuffer = "", this.delegate.beginStartTag(), this.appendToTagName(n));
			},
			markupDeclarationOpen: function() {
				var n = this.consume();
				if (n === "-" && this.peek() === "-") this.consume(), this.transitionTo("commentStart"), this.delegate.beginComment();
				else n.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase() === "DOCTYPE" && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.transitionTo("doctype"), this.delegate.beginDoctype && this.delegate.beginDoctype());
			},
			doctype: function() {
				_(this.consume()) && this.transitionTo("beforeDoctypeName");
			},
			beforeDoctypeName: function() {
				var n = this.consume();
				_(n) || (this.transitionTo("doctypeName"), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase()));
			},
			doctypeName: function() {
				var n = this.consume();
				_(n) ? this.transitionTo("afterDoctypeName") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase());
			},
			afterDoctypeName: function() {
				var n = this.consume();
				if (!_(n)) if (n === ">") this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData");
				else {
					var i = n.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase(), a = i.toUpperCase() === "PUBLIC", o = i.toUpperCase() === "SYSTEM";
					(a || o) && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume()), a ? this.transitionTo("afterDoctypePublicKeyword") : o && this.transitionTo("afterDoctypeSystemKeyword");
				}
			},
			afterDoctypePublicKeyword: function() {
				var n = this.peek();
				_(n) ? (this.transitionTo("beforeDoctypePublicIdentifier"), this.consume()) : n === "\"" ? (this.transitionTo("doctypePublicIdentifierDoubleQuoted"), this.consume()) : n === "'" ? (this.transitionTo("doctypePublicIdentifierSingleQuoted"), this.consume()) : n === ">" && (this.consume(), this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData"));
			},
			doctypePublicIdentifierDoubleQuoted: function() {
				var n = this.consume();
				n === "\"" ? this.transitionTo("afterDoctypePublicIdentifier") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(n);
			},
			doctypePublicIdentifierSingleQuoted: function() {
				var n = this.consume();
				n === "'" ? this.transitionTo("afterDoctypePublicIdentifier") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(n);
			},
			afterDoctypePublicIdentifier: function() {
				var n = this.consume();
				_(n) ? this.transitionTo("betweenDoctypePublicAndSystemIdentifiers") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : n === "\"" ? this.transitionTo("doctypeSystemIdentifierDoubleQuoted") : n === "'" && this.transitionTo("doctypeSystemIdentifierSingleQuoted");
			},
			betweenDoctypePublicAndSystemIdentifiers: function() {
				var n = this.consume();
				_(n) || (n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : n === "\"" ? this.transitionTo("doctypeSystemIdentifierDoubleQuoted") : n === "'" && this.transitionTo("doctypeSystemIdentifierSingleQuoted"));
			},
			doctypeSystemIdentifierDoubleQuoted: function() {
				var n = this.consume();
				n === "\"" ? this.transitionTo("afterDoctypeSystemIdentifier") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(n);
			},
			doctypeSystemIdentifierSingleQuoted: function() {
				var n = this.consume();
				n === "'" ? this.transitionTo("afterDoctypeSystemIdentifier") : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData")) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(n);
			},
			afterDoctypeSystemIdentifier: function() {
				var n = this.consume();
				_(n) || n === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo("beforeData"));
			},
			commentStart: function() {
				var n = this.consume();
				n === "-" ? this.transitionTo("commentStartDash") : n === ">" ? (this.delegate.finishComment(), this.transitionTo("beforeData")) : (this.delegate.appendToCommentData(n), this.transitionTo("comment"));
			},
			commentStartDash: function() {
				var n = this.consume();
				n === "-" ? this.transitionTo("commentEnd") : n === ">" ? (this.delegate.finishComment(), this.transitionTo("beforeData")) : (this.delegate.appendToCommentData("-"), this.transitionTo("comment"));
			},
			comment: function() {
				var n = this.consume();
				n === "-" ? this.transitionTo("commentEndDash") : this.delegate.appendToCommentData(n);
			},
			commentEndDash: function() {
				var n = this.consume();
				n === "-" ? this.transitionTo("commentEnd") : (this.delegate.appendToCommentData("-" + n), this.transitionTo("comment"));
			},
			commentEnd: function() {
				var n = this.consume();
				n === ">" ? (this.delegate.finishComment(), this.transitionTo("beforeData")) : (this.delegate.appendToCommentData("--" + n), this.transitionTo("comment"));
			},
			tagName: function() {
				var n = this.consume();
				_(n) ? this.transitionTo("beforeAttributeName") : n === "/" ? this.transitionTo("selfClosingStartTag") : n === ">" ? (this.delegate.finishTag(), this.transitionTo("beforeData")) : this.appendToTagName(n);
			},
			endTagName: function() {
				var n = this.consume();
				_(n) ? (this.transitionTo("beforeAttributeName"), this.tagNameBuffer = "") : n === "/" ? (this.transitionTo("selfClosingStartTag"), this.tagNameBuffer = "") : n === ">" ? (this.delegate.finishTag(), this.transitionTo("beforeData"), this.tagNameBuffer = "") : this.appendToTagName(n);
			},
			beforeAttributeName: function() {
				var n = this.peek();
				if (_(n)) {
					this.consume();
					return;
				} else n === "/" ? (this.transitionTo("selfClosingStartTag"), this.consume()) : n === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : n === "=" ? (this.delegate.reportSyntaxError("attribute name cannot start with equals sign"), this.transitionTo("attributeName"), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(n)) : (this.transitionTo("attributeName"), this.delegate.beginAttribute());
			},
			attributeName: function() {
				var n = this.peek();
				_(n) ? (this.transitionTo("afterAttributeName"), this.consume()) : n === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo("selfClosingStartTag")) : n === "=" ? (this.transitionTo("beforeAttributeValue"), this.consume()) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : n === "\"" || n === "'" || n === "<" ? (this.delegate.reportSyntaxError(n + " is not a valid character within attribute names"), this.consume(), this.delegate.appendToAttributeName(n)) : (this.consume(), this.delegate.appendToAttributeName(n));
			},
			afterAttributeName: function() {
				var n = this.peek();
				if (_(n)) {
					this.consume();
					return;
				} else n === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo("selfClosingStartTag")) : n === "=" ? (this.consume(), this.transitionTo("beforeAttributeValue")) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.transitionTo("attributeName"), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(n));
			},
			beforeAttributeValue: function() {
				var n = this.peek();
				_(n) ? this.consume() : n === "\"" ? (this.transitionTo("attributeValueDoubleQuoted"), this.delegate.beginAttributeValue(!0), this.consume()) : n === "'" ? (this.transitionTo("attributeValueSingleQuoted"), this.delegate.beginAttributeValue(!0), this.consume()) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : (this.transitionTo("attributeValueUnquoted"), this.delegate.beginAttributeValue(!1), this.consume(), this.delegate.appendToAttributeValue(n));
			},
			attributeValueDoubleQuoted: function() {
				var n = this.consume();
				n === "\"" ? (this.delegate.finishAttributeValue(), this.transitionTo("afterAttributeValueQuoted")) : n === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(n);
			},
			attributeValueSingleQuoted: function() {
				var n = this.consume();
				n === "'" ? (this.delegate.finishAttributeValue(), this.transitionTo("afterAttributeValueQuoted")) : n === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(n);
			},
			attributeValueUnquoted: function() {
				var n = this.peek();
				_(n) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo("beforeAttributeName")) : n === "/" ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo("selfClosingStartTag")) : n === "&" ? (this.consume(), this.delegate.appendToAttributeValue(this.consumeCharRef() || "&")) : n === ">" ? (this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : (this.consume(), this.delegate.appendToAttributeValue(n));
			},
			afterAttributeValueQuoted: function() {
				var n = this.peek();
				_(n) ? (this.consume(), this.transitionTo("beforeAttributeName")) : n === "/" ? (this.consume(), this.transitionTo("selfClosingStartTag")) : n === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo("beforeData")) : this.transitionTo("beforeAttributeName");
			},
			selfClosingStartTag: function() {
				this.peek() === ">" ? (this.consume(), this.delegate.markTagAsSelfClosing(), this.delegate.finishTag(), this.transitionTo("beforeData")) : this.transitionTo("beforeAttributeName");
			},
			endTagOpen: function() {
				var n = this.consume();
				(n === "@" || n === ":" || Jr(n)) && (this.transitionTo("endTagName"), this.tagNameBuffer = "", this.delegate.beginEndTag(), this.appendToTagName(n));
			}
		}, this.reset();
	}
	return e.prototype.reset = function() {
		this.transitionTo("beforeData"), this.input = "", this.tagNameBuffer = "", this.index = 0, this.line = 1, this.column = 0, this.delegate.reset();
	}, e.prototype.transitionTo = function(t) {
		this.state = t;
	}, e.prototype.tokenize = function(t) {
		this.reset(), this.tokenizePart(t), this.tokenizeEOF();
	}, e.prototype.tokenizePart = function(t) {
		for (this.input += Cs(t); this.index < this.input.length;) {
			var r = this.states[this.state];
			if (r !== void 0) r.call(this);
			else throw new Error("unhandled state " + this.state);
		}
	}, e.prototype.tokenizeEOF = function() {
		this.flushData();
	}, e.prototype.flushData = function() {
		this.state === "data" && (this.delegate.finishData(), this.transitionTo("beforeData"));
	}, e.prototype.peek = function() {
		return this.input.charAt(this.index);
	}, e.prototype.consume = function() {
		var t = this.peek();
		return this.index++, t === `
` ? (this.line++, this.column = 0) : this.column++, t;
	}, e.prototype.consumeCharRef = function() {
		var t = this.input.indexOf(";", this.index);
		if (t !== -1) {
			var r = this.input.slice(this.index, t), s = this.entityParser.parse(r);
			if (s) {
				for (var n = r.length; n;) this.consume(), n--;
				return this.consume(), s;
			}
		}
	}, e.prototype.markTagStart = function() {
		this.delegate.tagOpen();
	}, e.prototype.appendToTagName = function(t) {
		this.tagNameBuffer += t, this.delegate.appendToTagName(t);
	}, e.prototype.isIgnoredEndTag = function() {
		var t = this.tagNameBuffer;
		return t === "title" && this.input.substring(this.index, this.index + 8) !== "</title>" || t === "style" && this.input.substring(this.index, this.index + 8) !== "</style>" || t === "script" && this.input.substring(this.index, this.index + 9) !== "<\/script>";
	}, e;
})();
(function() {
	function e(t, r) {
		r === void 0 && (r = {}), this.options = r, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new Xe(this, t, r.mode), this._currentAttribute = void 0;
	}
	return e.prototype.tokenize = function(t) {
		return this.tokens = [], this.tokenizer.tokenize(t), this.tokens;
	}, e.prototype.tokenizePart = function(t) {
		return this.tokens = [], this.tokenizer.tokenizePart(t), this.tokens;
	}, e.prototype.tokenizeEOF = function() {
		return this.tokens = [], this.tokenizer.tokenizeEOF(), this.tokens[0];
	}, e.prototype.reset = function() {
		this.token = null, this.startLine = 1, this.startColumn = 0;
	}, e.prototype.current = function() {
		var t = this.token;
		if (t === null) throw new Error("token was unexpectedly null");
		if (arguments.length === 0) return t;
		for (var r = 0; r < arguments.length; r++) if (t.type === arguments[r]) return t;
		throw new Error("token type was unexpectedly " + t.type);
	}, e.prototype.push = function(t) {
		this.token = t, this.tokens.push(t);
	}, e.prototype.currentAttribute = function() {
		return this._currentAttribute;
	}, e.prototype.addLocInfo = function() {
		this.options.loc && (this.current().loc = {
			start: {
				line: this.startLine,
				column: this.startColumn
			},
			end: {
				line: this.tokenizer.line,
				column: this.tokenizer.column
			}
		}), this.startLine = this.tokenizer.line, this.startColumn = this.tokenizer.column;
	}, e.prototype.beginDoctype = function() {
		this.push({
			type: "Doctype",
			name: ""
		});
	}, e.prototype.appendToDoctypeName = function(t) {
		this.current("Doctype").name += t;
	}, e.prototype.appendToDoctypePublicIdentifier = function(t) {
		var r = this.current("Doctype");
		r.publicIdentifier === void 0 ? r.publicIdentifier = t : r.publicIdentifier += t;
	}, e.prototype.appendToDoctypeSystemIdentifier = function(t) {
		var r = this.current("Doctype");
		r.systemIdentifier === void 0 ? r.systemIdentifier = t : r.systemIdentifier += t;
	}, e.prototype.endDoctype = function() {
		this.addLocInfo();
	}, e.prototype.beginData = function() {
		this.push({
			type: "Chars",
			chars: ""
		});
	}, e.prototype.appendToData = function(t) {
		this.current("Chars").chars += t;
	}, e.prototype.finishData = function() {
		this.addLocInfo();
	}, e.prototype.beginComment = function() {
		this.push({
			type: "Comment",
			chars: ""
		});
	}, e.prototype.appendToCommentData = function(t) {
		this.current("Comment").chars += t;
	}, e.prototype.finishComment = function() {
		this.addLocInfo();
	}, e.prototype.tagOpen = function() {}, e.prototype.beginStartTag = function() {
		this.push({
			type: "StartTag",
			tagName: "",
			attributes: [],
			selfClosing: !1
		});
	}, e.prototype.beginEndTag = function() {
		this.push({
			type: "EndTag",
			tagName: ""
		});
	}, e.prototype.finishTag = function() {
		this.addLocInfo();
	}, e.prototype.markTagAsSelfClosing = function() {
		this.current("StartTag").selfClosing = !0;
	}, e.prototype.appendToTagName = function(t) {
		this.current("StartTag", "EndTag").tagName += t;
	}, e.prototype.beginAttribute = function() {
		this._currentAttribute = [
			"",
			"",
			!1
		];
	}, e.prototype.appendToAttributeName = function(t) {
		this.currentAttribute()[0] += t;
	}, e.prototype.beginAttributeValue = function(t) {
		this.currentAttribute()[2] = t;
	}, e.prototype.appendToAttributeValue = function(t) {
		this.currentAttribute()[1] += t;
	}, e.prototype.finishAttributeValue = function() {
		this.current("StartTag").attributes.push(this._currentAttribute);
	}, e.prototype.reportSyntaxError = function(t) {
		this.current().syntaxError = t;
	}, e;
})();
var pe = {
	Append: 1,
	TrustingAppend: 2,
	Comment: 3,
	Modifier: 4,
	StrictModifier: 5,
	Block: 6,
	StrictBlock: 7,
	Component: 8,
	OpenElement: 10,
	OpenElementWithSplat: 11,
	FlushElement: 12,
	CloseElement: 13,
	StaticAttr: 14,
	DynamicAttr: 15,
	ComponentAttr: 16,
	AttrSplat: 17,
	Yield: 18,
	DynamicArg: 20,
	StaticArg: 21,
	TrustingDynamicAttr: 22,
	TrustingComponentAttr: 23,
	StaticComponentAttr: 24,
	Debugger: 26,
	Undefined: 27,
	Call: 28,
	Concat: 29,
	GetSymbol: 30,
	GetLexicalSymbol: 32,
	GetStrictKeyword: 31,
	GetFreeAsComponentOrHelperHead: 35,
	GetFreeAsHelperHead: 37,
	GetFreeAsModifierHead: 38,
	GetFreeAsComponentHead: 39,
	InElement: 40,
	If: 41,
	Each: 42,
	Let: 44,
	WithDynamicVars: 45,
	InvokeComponent: 46,
	HasBlock: 48,
	HasBlockParams: 49,
	Curry: 50,
	Not: 51,
	IfInline: 52,
	GetDynamicVar: 53,
	Log: 54
};
function Xr(e) {
	return function(t) {
		return Array.isArray(t) && t[0] === e;
	};
}
Xr(pe.FlushElement);
Xr(pe.GetSymbol);
var _s = !1;
new RegExp(/["\x26\xa0]/u.source, "gu");
new RegExp(/[&<>\xa0]/u.source, "gu");
var de = new Set([
	"area",
	"base",
	"br",
	"col",
	"command",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
function on() {
	return [...de];
}
function Os(e) {
	return de.has(e.toLowerCase()) && e[0]?.toLowerCase() === e[0];
}
function Yt(e) {
	return !!e && e.length > 0;
}
function fr(e) {
	return e.length === 0 ? void 0 : e[e.length - 1];
}
function Is(e) {
	return e.length === 0 ? void 0 : e[0];
}
var st = Object.freeze({
	line: 1,
	column: 0
}), Bs = Object.freeze({
	source: "(synthetic)",
	start: st,
	end: st
}), sr = Object.freeze({
	source: "(nonexistent)",
	start: st,
	end: st
}), nt = Object.freeze({
	source: "(broken)",
	start: st,
	end: st
}), ir = class {
	constructor(t) {
		this._whens = t;
	}
	first(t) {
		for (let r of this._whens) {
			let s = r.match(t);
			if (Yt(s)) return s[0];
		}
		return null;
	}
}, ge = class {
	get(t, r) {
		let s = this._map.get(t);
		return s || (s = r(), this._map.set(t, s), s);
	}
	add(t, r) {
		this._map.set(t, r);
	}
	match(t) {
		let r = (function(a) {
			switch (a) {
				case "Broken":
				case "InternalsSynthetic":
				case "NonExistent": return "IS_INVISIBLE";
				default: return a;
			}
		})(t), s = [], n = this._map.get(r), i = this._map.get("MATCH_ANY");
		return n && s.push(n), i && s.push(i), s;
	}
	constructor() {
		this._map = /* @__PURE__ */ new Map();
	}
};
function ln(e) {
	return e(new ar()).validate();
}
var ar = class {
	validate() {
		return (t, r) => this.matchFor(t.kind, r.kind)(t, r);
	}
	matchFor(t, r) {
		let s = this._whens.match(t);
		return Yt(s), new ir(s).first(r);
	}
	when(t, r, s) {
		return this._whens.get(t, (() => new ge())).add(r, s), this;
	}
	constructor() {
		this._whens = new ge();
	}
}, or = class e {
	static synthetic(t) {
		return new e({
			loc: A.synthetic(t),
			chars: t
		});
	}
	static load(t, r) {
		return new e({
			loc: A.load(t, r[1]),
			chars: r[0]
		});
	}
	constructor(t) {
		this.loc = t.loc, this.chars = t.chars;
	}
	getString() {
		return this.chars;
	}
	serialize() {
		return [this.chars, this.loc.serialize()];
	}
}, A = class e {
	static get NON_EXISTENT() {
		return new J("NonExistent", sr).wrap();
	}
	static load(t, r) {
		return typeof r == "number" ? e.forCharPositions(t, r, r) : typeof r == "string" ? e.synthetic(r) : Array.isArray(r) ? e.forCharPositions(t, r[0], r[1]) : r === "NonExistent" ? e.NON_EXISTENT : r === "Broken" ? e.broken(nt) : void Yr(r);
	}
	static forHbsLoc(t, r) {
		return new Mt(t, {
			start: new at(t, r.start),
			end: new at(t, r.end)
		}, r).wrap();
	}
	static forCharPositions(t, r, s) {
		return new Ut(t, {
			start: new ft(t, r),
			end: new ft(t, s)
		}).wrap();
	}
	static synthetic(t) {
		return new J("InternalsSynthetic", sr, t).wrap();
	}
	static broken(t = nt) {
		return new J("Broken", t).wrap();
	}
	constructor(t) {
		var r;
		this.data = t, this.isInvisible = (r = t.kind) !== "CharPosition" && r !== "HbsPosition";
	}
	getStart() {
		return this.data.getStart().wrap();
	}
	getEnd() {
		return this.data.getEnd().wrap();
	}
	get loc() {
		let t = this.data.toHbsSpan();
		return t === null ? nt : t.toHbsLoc();
	}
	get module() {
		return this.data.getModule();
	}
	get startPosition() {
		return this.loc.start;
	}
	get endPosition() {
		return this.loc.end;
	}
	toJSON() {
		return this.loc;
	}
	withStart(t) {
		return K(t.data, this.data.getEnd());
	}
	withEnd(t) {
		return K(this.data.getStart(), t.data);
	}
	asString() {
		return this.data.asString();
	}
	toSlice(t) {
		let r = this.data.asString();
		return JSON.stringify(r), JSON.stringify(t), new or({
			loc: this,
			chars: t || r
		});
	}
	get start() {
		return this.loc.start;
	}
	set start(t) {
		this.data.locDidUpdate({ start: t });
	}
	get end() {
		return this.loc.end;
	}
	set end(t) {
		this.data.locDidUpdate({ end: t });
	}
	get source() {
		return this.module;
	}
	collapse(t) {
		switch (t) {
			case "start": return this.getStart().collapsed();
			case "end": return this.getEnd().collapsed();
		}
	}
	extend(t) {
		return K(this.data.getStart(), t.data.getEnd());
	}
	serialize() {
		return this.data.serialize();
	}
	slice({ skipStart: t = 0, skipEnd: r = 0 }) {
		return K(this.getStart().move(t).data, this.getEnd().move(-r).data);
	}
	sliceStartChars({ skipStart: t = 0, chars: r }) {
		return K(this.getStart().move(t).data, this.getStart().move(t + r).data);
	}
	sliceEndChars({ skipEnd: t = 0, chars: r }) {
		return K(this.getEnd().move(t - r).data, this.getStart().move(-t).data);
	}
}, Ut = class {
	#t;
	constructor(t, r) {
		this.source = t, this.charPositions = r, this.kind = "CharPosition", this.#t = null;
	}
	wrap() {
		return new A(this);
	}
	asString() {
		return this.source.slice(this.charPositions.start.charPos, this.charPositions.end.charPos);
	}
	getModule() {
		return this.source.module;
	}
	getStart() {
		return this.charPositions.start;
	}
	getEnd() {
		return this.charPositions.end;
	}
	locDidUpdate() {}
	toHbsSpan() {
		let t = this.#t;
		if (t === null) {
			let r = this.charPositions.start.toHbsPos(), s = this.charPositions.end.toHbsPos();
			t = this.#t = r === null || s === null ? it : new Mt(this.source, {
				start: r,
				end: s
			});
		}
		return t === it ? null : t;
	}
	serialize() {
		let { start: { charPos: t }, end: { charPos: r } } = this.charPositions;
		return t === r ? t : [t, r];
	}
	toCharPosSpan() {
		return this;
	}
}, Mt = class {
	#t;
	#e;
	constructor(t, r, s = null) {
		this.source = t, this.hbsPositions = r, this.kind = "HbsPosition", this.#t = null, this.#e = s;
	}
	serialize() {
		let t = this.toCharPosSpan();
		return t === null ? "Broken" : t.wrap().serialize();
	}
	wrap() {
		return new A(this);
	}
	updateProvided(t, r) {
		this.#e && (this.#e[r] = t), this.#t = null, this.#e = {
			start: t,
			end: t
		};
	}
	locDidUpdate({ start: t, end: r }) {
		t !== void 0 && (this.updateProvided(t, "start"), this.hbsPositions.start = new at(this.source, t, null)), r !== void 0 && (this.updateProvided(r, "end"), this.hbsPositions.end = new at(this.source, r, null));
	}
	asString() {
		let t = this.toCharPosSpan();
		return t === null ? "" : t.asString();
	}
	getModule() {
		return this.source.module;
	}
	getStart() {
		return this.hbsPositions.start;
	}
	getEnd() {
		return this.hbsPositions.end;
	}
	toHbsLoc() {
		return {
			start: this.hbsPositions.start.hbsPos,
			end: this.hbsPositions.end.hbsPos
		};
	}
	toHbsSpan() {
		return this;
	}
	toCharPosSpan() {
		let t = this.#t;
		if (t === null) {
			let r = this.hbsPositions.start.toCharPos(), s = this.hbsPositions.end.toCharPos();
			if (!r || !s) return t = this.#t = it, null;
			t = this.#t = new Ut(this.source, {
				start: r,
				end: s
			});
		}
		return t === it ? null : t;
	}
}, J = class {
	constructor(t, r, s = null) {
		this.kind = t, this.loc = r, this.string = s;
	}
	serialize() {
		switch (this.kind) {
			case "Broken":
			case "NonExistent": return this.kind;
			case "InternalsSynthetic": return this.string || "";
		}
	}
	wrap() {
		return new A(this);
	}
	asString() {
		return this.string || "";
	}
	locDidUpdate({ start: t, end: r }) {
		t !== void 0 && (this.loc.start = t), r !== void 0 && (this.loc.end = r);
	}
	getModule() {
		return "an unknown module";
	}
	getStart() {
		return new zt(this.kind, this.loc.start);
	}
	getEnd() {
		return new zt(this.kind, this.loc.end);
	}
	toCharPosSpan() {
		return this;
	}
	toHbsSpan() {
		return null;
	}
	toHbsLoc() {
		return nt;
	}
}, K = ln(((e) => e.when("HbsPosition", "HbsPosition", ((t, r) => new Mt(t.source, {
	start: t,
	end: r
}).wrap())).when("CharPosition", "CharPosition", ((t, r) => new Ut(t.source, {
	start: t,
	end: r
}).wrap())).when("CharPosition", "HbsPosition", ((t, r) => {
	let s = r.toCharPos();
	return s === null ? new J("Broken", nt).wrap() : K(t, s);
})).when("HbsPosition", "CharPosition", ((t, r) => {
	let s = t.toCharPos();
	return s === null ? new J("Broken", nt).wrap() : K(s, r);
})).when("IS_INVISIBLE", "MATCH_ANY", ((t) => new J(t.kind, nt).wrap())).when("MATCH_ANY", "IS_INVISIBLE", ((t, r) => new J(r.kind, nt).wrap())))), it = "BROKEN", Pt = class e {
	static forHbsPos(t, r) {
		return new at(t, r, null).wrap();
	}
	static broken(t = st) {
		return new zt("Broken", t).wrap();
	}
	constructor(t) {
		this.data = t;
	}
	get offset() {
		let t = this.data.toCharPos();
		return t === null ? null : t.offset;
	}
	eql(t) {
		return Rs(this.data, t.data);
	}
	until(t) {
		return K(this.data, t.data);
	}
	move(t) {
		let r = this.data.toCharPos();
		if (r === null) return e.broken();
		{
			let s = r.offset + t;
			return r.source.validate(s) ? new ft(r.source, s).wrap() : e.broken();
		}
	}
	collapsed() {
		return K(this.data, this.data);
	}
	toJSON() {
		return this.data.toJSON();
	}
}, ft = class {
	constructor(t, r) {
		this.source = t, this.charPos = r, this.kind = "CharPosition", this._locPos = null;
	}
	toCharPos() {
		return this;
	}
	toJSON() {
		let t = this.toHbsPos();
		return t === null ? st : t.toJSON();
	}
	wrap() {
		return new Pt(this);
	}
	get offset() {
		return this.charPos;
	}
	toHbsPos() {
		let t = this._locPos;
		if (t === null) {
			let r = this.source.hbsPosFor(this.charPos);
			this._locPos = t = r === null ? it : new at(this.source, r, this.charPos);
		}
		return t === it ? null : t;
	}
}, at = class {
	constructor(t, r, s = null) {
		this.source = t, this.hbsPos = r, this.kind = "HbsPosition", this._charPos = s === null ? null : new ft(t, s);
	}
	toCharPos() {
		let t = this._charPos;
		if (t === null) {
			let r = this.source.charPosFor(this.hbsPos);
			this._charPos = t = r === null ? it : new ft(this.source, r);
		}
		return t === it ? null : t;
	}
	toJSON() {
		return this.hbsPos;
	}
	wrap() {
		return new Pt(this);
	}
	toHbsPos() {
		return this;
	}
}, zt = class {
	constructor(t, r) {
		this.kind = t, this.pos = r;
	}
	toCharPos() {
		return null;
	}
	toJSON() {
		return this.pos;
	}
	wrap() {
		return new Pt(this);
	}
	get offset() {
		return null;
	}
}, Rs = ln(((e) => e.when("HbsPosition", "HbsPosition", (({ hbsPos: t }, { hbsPos: r }) => t.column === r.column && t.line === r.line)).when("CharPosition", "CharPosition", (({ charPos: t }, { charPos: r }) => t === r)).when("CharPosition", "HbsPosition", (({ offset: t }, r) => t === r.toCharPos()?.offset)).when("HbsPosition", "CharPosition", ((t, { offset: r }) => t.toCharPos()?.offset === r)).when("MATCH_ANY", "MATCH_ANY", (() => !1)))), pt = class e {
	static from(t, r = {}) {
		return new e(t, r.meta?.moduleName);
	}
	constructor(t, r = "an unknown module") {
		this.source = t, this.module = r;
	}
	validate(t) {
		return t >= 0 && t <= this.source.length;
	}
	slice(t, r) {
		return this.source.slice(t, r);
	}
	offsetFor(t, r) {
		return Pt.forHbsPos(this, {
			line: t,
			column: r
		});
	}
	spanFor({ start: t, end: r }) {
		return A.forHbsLoc(this, {
			start: {
				line: t.line,
				column: t.column
			},
			end: {
				line: r.line,
				column: r.column
			}
		});
	}
	hbsPosFor(t) {
		let r = 0, s = 0;
		if (t > this.source.length) return null;
		for (;;) {
			let n = this.source.indexOf(`
`, s);
			if (t <= n || n === -1) return {
				line: r + 1,
				column: t - s
			};
			r += 1, s = n + 1;
		}
	}
	charPosFor(t) {
		let { line: r, column: s } = t, n = this.source.length, i = 0, a = 0;
		for (; a < n;) {
			let o = this.source.indexOf(`
`, a);
			if (o === -1 && (o = this.source.length), i === r - 1) {
				if (a + s > o) return o;
				if (_s) {
					let c = this.hbsPosFor(a + s);
					c.line, c.column;
				}
				return a + s;
			}
			if (o === -1) return 0;
			i += 1, a = o + 1;
		}
		return n;
	}
};
function k(e, t) {
	let { module: r, loc: s } = t, { line: n, column: i } = s.start, a = t.asString(), o = a ? `

|
|  ${a.split(`
`).join(`
|  `)}
|

` : "", c = /* @__PURE__ */ new Error(`${e}: ${o}(error occurred in '${r}' @ line ${n} : column ${i})`);
	return c.name = "SyntaxError", c.location = t, c.code = a, c;
}
var be = {
	Template: ["body"],
	Block: ["body"],
	MustacheStatement: [
		"path",
		"params",
		"hash"
	],
	BlockStatement: [
		"path",
		"params",
		"hash",
		"program",
		"inverse"
	],
	ElementModifierStatement: [
		"path",
		"params",
		"hash"
	],
	CommentStatement: [],
	MustacheCommentStatement: [],
	ElementNode: [
		"attributes",
		"modifiers",
		"children",
		"comments"
	],
	AttrNode: ["value"],
	TextNode: [],
	ConcatStatement: ["parts"],
	SubExpression: [
		"path",
		"params",
		"hash"
	],
	PathExpression: [],
	StringLiteral: [],
	BooleanLiteral: [],
	NumberLiteral: [],
	NullLiteral: [],
	UndefinedLiteral: [],
	Hash: ["pairs"],
	HashPair: ["value"]
}, mr = (function() {
	function e(t, r, s, n) {
		let i = Error.call(this, t);
		this.key = n, this.message = t, this.node = r, this.parent = s, i.stack && (this.stack = i.stack);
	}
	return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
})();
function Zr(e, t, r) {
	return new mr("Cannot remove a node unless it is part of an array", e, t, r);
}
function qs(e, t, r) {
	return new mr("Cannot replace a node with multiple nodes unless it is part of an array", e, t, r);
}
function tn(e, t) {
	return new mr("Replacing and removing in key handlers is not yet supported.", e, null, t);
}
var Ct = class {
	constructor(t, r = null, s = null) {
		this.node = t, this.parent = r, this.parentKey = s;
	}
	get parentNode() {
		return this.parent ? this.parent.node : null;
	}
	parents() {
		return { [Symbol.iterator]: () => new lr(this) };
	}
}, lr = class {
	constructor(t) {
		this.path = t;
	}
	next() {
		return this.path.parent ? (this.path = this.path.parent, {
			done: !1,
			value: this.path
		}) : {
			done: !0,
			value: null
		};
	}
};
function cn(e) {
	return typeof e == "function" ? e : e.enter;
}
function un(e) {
	return typeof e == "function" ? void 0 : e.exit;
}
function ye(e, t) {
	let r, s, n, { node: i, parent: a, parentKey: o } = t, c = (function(h, f) {
		if (h.Program && (f === "Template" && !h.Template || f === "Block" && !h.Block)) return h.Program;
		let p = h[f];
		return p !== void 0 ? p : h.All;
	})(e, i.type);
	if (c !== void 0 && (r = cn(c), s = un(c)), r !== void 0 && (n = r(i, t)), n != null) {
		if (JSON.stringify(i) !== JSON.stringify(n)) return Array.isArray(n) ? (hn(e, n, a, o), n) : ye(e, new Ct(n, a, o)) || n;
		n = void 0;
	}
	if (n === void 0) {
		let h = be[i.type];
		for (let f = 0; f < h.length; f++) Vs(e, c, t, h[f]);
		s !== void 0 && (n = s(i, t));
	}
	return n;
}
function en(e, t, r) {
	e[t] = r;
}
function Vs(e, t, r, s) {
	let n, i, { node: a } = r, o = (function(c, h) {
		return c[h];
	})(a, s);
	if (o) {
		if (t !== void 0) {
			let c = (function(h, f) {
				let p = typeof h != "function" ? h.keys : void 0;
				if (p === void 0) return;
				let g = p[f];
				return g !== void 0 ? g : p.All;
			})(t, s);
			c !== void 0 && (n = cn(c), i = un(c));
		}
		if (n !== void 0 && n(a, s) !== void 0) throw tn(a, s);
		if (Array.isArray(o)) hn(e, o, r, s);
		else {
			let c = ye(e, new Ct(o, r, s));
			c !== void 0 && (function(h, f, p, g) {
				if (g === null) throw Zr(p, h, f);
				if (Array.isArray(g)) {
					if (g.length !== 1) throw g.length === 0 ? Zr(p, h, f) : qs(p, h, f);
					en(h, f, g[0]);
				} else en(h, f, g);
			})(a, s, o, c);
		}
		if (i !== void 0 && i(a, s) !== void 0) throw tn(a, s);
	}
}
function hn(e, t, r, s) {
	for (let n = 0; n < t.length; n++) {
		let i = t[n], a = ye(e, new Ct(i, r, s));
		a !== void 0 && (n += Fs(t, n, a) - 1);
	}
}
function Fs(e, t, r) {
	return r === null ? (e.splice(t, 1), 0) : Array.isArray(r) ? (e.splice(t, 1, ...r), r.length) : (e.splice(t, 1, r), 1);
}
function Hs(e, t) {
	ye(t, new Ct(e));
}
function At(e, t) {
	(function(r) {
		switch (r.type) {
			case "Block":
			case "Template": return r.body;
			case "ElementNode": return r.children;
		}
	})(e).push(t);
}
function pn(e) {
	return e.type === "StringLiteral" || e.type === "BooleanLiteral" || e.type === "NumberLiteral" || e.type === "NullLiteral" || e.type === "UndefinedLiteral";
}
var Ze;
function tr() {
	return Ze || (Ze = new pt("", "(synthetic)")), Ze;
}
function rn(e, t) {
	return d.var({
		name: e,
		loc: v(t || null)
	});
}
function rt(e, t) {
	let r = v(t || null);
	if (typeof e != "string") {
		if ("type" in e) return e;
		{
			e.head.indexOf(".");
			let { head: i, tail: a } = e;
			return d.path({
				head: d.head({
					original: i,
					loc: r.sliceStartChars({ chars: i.length })
				}),
				tail: a,
				loc: v(t || null)
			});
		}
	}
	let { head: s, tail: n } = (function(i, a) {
		let [o, ...c] = i.split("."), h = d.head({
			original: o,
			loc: v(a || null)
		});
		return d.path({
			head: h,
			tail: c,
			loc: v(a || null)
		});
	})(e, r);
	return d.path({
		head: s,
		tail: n,
		loc: r
	});
}
function me(e, t, r) {
	return d.literal({
		type: e,
		value: t,
		loc: v(r || null)
	});
}
function Ht(e = [], t) {
	return d.hash({
		pairs: e,
		loc: v(t || null)
	});
}
function fn(e) {
	return e.map(((t) => typeof t == "string" ? d.var({
		name: t,
		loc: A.synthetic(t)
	}) : t));
}
function nn(e = [], t = [], r = !1, s) {
	return d.blockItself({
		body: e,
		params: fn(t),
		chained: r,
		loc: v(s || null)
	});
}
function sn(e = [], t = [], r) {
	return d.template({
		body: e,
		blockParams: t,
		loc: v(r || null)
	});
}
function v(...e) {
	if (e.length === 1) {
		let t = e[0];
		return t && typeof t == "object" ? A.forHbsLoc(tr(), t) : A.forHbsLoc(tr(), Bs);
	}
	{
		let [t, r, s, n, i] = e, a = i ? new pt("", i) : tr();
		return A.forHbsLoc(a, {
			start: {
				line: t,
				column: r
			},
			end: {
				line: s || t,
				column: n || r
			}
		});
	}
}
var Us = {
	mustache: function(e, t = [], r = Ht([]), s = !1, n, i) {
		return d.mustache({
			path: rt(e),
			params: t,
			hash: r,
			trusting: s,
			strip: i,
			loc: v(n || null)
		});
	},
	block: function(e, t, r, s, n = null, i, a, o, c) {
		let h, f = null;
		return h = s.type === "Template" ? d.blockItself({
			params: fn(s.blockParams),
			body: s.body,
			loc: s.loc
		}) : s, n?.type === "Template" ? (n.blockParams.length, f = d.blockItself({
			params: [],
			body: n.body,
			loc: n.loc
		})) : f = n, d.block({
			path: rt(e),
			params: t || [],
			hash: r || Ht([]),
			defaultBlock: h,
			elseBlock: f,
			loc: v(i || null),
			openStrip: a,
			inverseStrip: o,
			closeStrip: c
		});
	},
	comment: function(e, t) {
		return d.comment({
			value: e,
			loc: v(t || null)
		});
	},
	mustacheComment: function(e, t) {
		return d.mustacheComment({
			value: e,
			loc: v(t || null)
		});
	},
	element: function(e, t = {}) {
		let r, s, { attrs: n, blockParams: i, modifiers: a, comments: o, children: c, openTag: h, closeTag: f, loc: p } = t;
		typeof e == "string" ? e.endsWith("/") ? (r = rt(e.slice(0, -1)), s = !0) : r = rt(e) : "type" in e ? (e.type, e.type, r = e) : "path" in e ? (e.path.type, e.path.type, r = e.path, s = e.selfClosing) : (r = rt(e.name), s = e.selfClosing);
		let g = i?.map(((T) => typeof T == "string" ? rn(T) : T)), E = null;
		return f ? E = v(f) : f === void 0 && (E = s || Os(r.original) ? null : v(null)), d.element({
			path: r,
			selfClosing: s || !1,
			attributes: n || [],
			params: g || [],
			modifiers: a || [],
			comments: o || [],
			children: c || [],
			openTag: v(h || null),
			closeTag: E,
			loc: v(p || null)
		});
	},
	elementModifier: function(e, t, r, s) {
		return d.elementModifier({
			path: rt(e),
			params: t || [],
			hash: r || Ht([]),
			loc: v(s || null)
		});
	},
	attr: function(e, t, r) {
		return d.attr({
			name: e,
			value: t,
			loc: v(r || null)
		});
	},
	text: function(e = "", t) {
		return d.text({
			chars: e,
			loc: v(t || null)
		});
	},
	sexpr: function(e, t = [], r = Ht([]), s) {
		return d.sexpr({
			path: rt(e),
			params: t,
			hash: r,
			loc: v(s || null)
		});
	},
	concat: function(e, t) {
		if (!Yt(e)) throw new Error("b.concat requires at least one part");
		return d.concat({
			parts: e,
			loc: v(t || null)
		});
	},
	hash: Ht,
	pair: function(e, t, r) {
		return d.pair({
			key: e,
			value: t,
			loc: v(r || null)
		});
	},
	literal: me,
	program: function(e, t, r) {
		return t && t.length ? nn(e, t, !1, r) : sn(e, [], r);
	},
	blockItself: nn,
	template: sn,
	loc: v,
	pos: function(e, t) {
		return d.pos({
			line: e,
			column: t
		});
	},
	path: rt,
	fullPath: function(e, t = [], r) {
		return d.path({
			head: e,
			tail: t,
			loc: v(r || null)
		});
	},
	head: function(e, t) {
		return d.head({
			original: e,
			loc: v(t || null)
		});
	},
	at: function(e, t) {
		return d.atName({
			name: e,
			loc: v(t || null)
		});
	},
	var: rn,
	this: function(e) {
		return d.this({ loc: v(e || null) });
	},
	string: er("StringLiteral"),
	boolean: er("BooleanLiteral"),
	number: er("NumberLiteral"),
	undefined: () => me("UndefinedLiteral", void 0),
	null: () => me("NullLiteral", null)
};
function er(e) {
	return function(t, r) {
		return me(e, t, r);
	};
}
var fe = {
	close: !1,
	open: !1
}, d = new class {
	pos({ line: e, column: t }) {
		return {
			line: e,
			column: t
		};
	}
	blockItself({ body: e, params: t, chained: r = !1, loc: s }) {
		return {
			type: "Block",
			body: e,
			params: t,
			get blockParams() {
				return this.params.map(((n) => n.name));
			},
			set blockParams(n) {
				this.params = n.map(((i) => d.var({
					name: i,
					loc: A.synthetic(i)
				})));
			},
			chained: r,
			loc: s
		};
	}
	template({ body: e, blockParams: t, loc: r }) {
		return {
			type: "Template",
			body: e,
			blockParams: t,
			loc: r
		};
	}
	mustache({ path: e, params: t, hash: r, trusting: s, loc: n, strip: i = fe }) {
		return (function({ path: a, params: o, hash: c, trusting: h, strip: f, loc: p }) {
			let g = {
				type: "MustacheStatement",
				path: a,
				params: o,
				hash: c,
				trusting: h,
				strip: f,
				loc: p
			};
			return Object.defineProperty(g, "escaped", {
				enumerable: !1,
				get() {
					return !this.trusting;
				},
				set(E) {
					this.trusting = !E;
				}
			}), g;
		})({
			path: e,
			params: t,
			hash: r,
			trusting: s,
			strip: i,
			loc: n
		});
	}
	block({ path: e, params: t, hash: r, defaultBlock: s, elseBlock: n = null, loc: i, openStrip: a = fe, inverseStrip: o = fe, closeStrip: c = fe }) {
		return {
			type: "BlockStatement",
			path: e,
			params: t,
			hash: r,
			program: s,
			inverse: n,
			loc: i,
			openStrip: a,
			inverseStrip: o,
			closeStrip: c
		};
	}
	comment({ value: e, loc: t }) {
		return {
			type: "CommentStatement",
			value: e,
			loc: t
		};
	}
	mustacheComment({ value: e, loc: t }) {
		return {
			type: "MustacheCommentStatement",
			value: e,
			loc: t
		};
	}
	concat({ parts: e, loc: t }) {
		return {
			type: "ConcatStatement",
			parts: e,
			loc: t
		};
	}
	element({ path: e, selfClosing: t, attributes: r, modifiers: s, params: n, comments: i, children: a, openTag: o, closeTag: c, loc: h }) {
		let f = t;
		return {
			type: "ElementNode",
			path: e,
			attributes: r,
			modifiers: s,
			params: n,
			comments: i,
			children: a,
			openTag: o,
			closeTag: c,
			loc: h,
			get tag() {
				return this.path.original;
			},
			set tag(p) {
				this.path.original = p;
			},
			get blockParams() {
				return this.params.map(((p) => p.name));
			},
			set blockParams(p) {
				this.params = p.map(((g) => d.var({
					name: g,
					loc: A.synthetic(g)
				})));
			},
			get selfClosing() {
				return f;
			},
			set selfClosing(p) {
				f = p, this.closeTag = p ? null : A.synthetic(`</${this.tag}>`);
			}
		};
	}
	elementModifier({ path: e, params: t, hash: r, loc: s }) {
		return {
			type: "ElementModifierStatement",
			path: e,
			params: t,
			hash: r,
			loc: s
		};
	}
	attr({ name: e, value: t, loc: r }) {
		return {
			type: "AttrNode",
			name: e,
			value: t,
			loc: r
		};
	}
	text({ chars: e, loc: t }) {
		return {
			type: "TextNode",
			chars: e,
			loc: t
		};
	}
	sexpr({ path: e, params: t, hash: r, loc: s }) {
		return {
			type: "SubExpression",
			path: e,
			params: t,
			hash: r,
			loc: s
		};
	}
	path({ head: e, tail: t, loc: r }) {
		return (function({ head: s, tail: n, loc: i }) {
			let a = {
				type: "PathExpression",
				head: s,
				tail: n,
				get original() {
					return [this.head.original, ...this.tail].join(".");
				},
				set original(o) {
					let [c, ...h] = o.split(".");
					this.head = Us.head(c, this.head.loc), this.tail = h;
				},
				loc: i
			};
			return Object.defineProperty(a, "parts", {
				enumerable: !1,
				get() {
					let o = this.original.split(".");
					return o[0] === "this" ? o.shift() : o[0].startsWith("@") && (o[0] = o[0].slice(1)), Object.freeze(o);
				},
				set(o) {
					let c = [...o];
					c[0] === "this" || c[0]?.startsWith("@") || (this.head.type === "ThisHead" ? c.unshift("this") : this.head.type === "AtHead" && (c[0] = `@${c[0]}`)), this.original = c.join(".");
				}
			}), Object.defineProperty(a, "this", {
				enumerable: !1,
				get() {
					return this.head.type === "ThisHead";
				}
			}), Object.defineProperty(a, "data", {
				enumerable: !1,
				get() {
					return this.head.type === "AtHead";
				}
			}), a;
		})({
			head: e,
			tail: t,
			loc: r
		});
	}
	head({ original: e, loc: t }) {
		return e === "this" ? this.this({ loc: t }) : e[0] === "@" ? this.atName({
			name: e,
			loc: t
		}) : this.var({
			name: e,
			loc: t
		});
	}
	this({ loc: e }) {
		return {
			type: "ThisHead",
			get original() {
				return "this";
			},
			loc: e
		};
	}
	atName({ name: e, loc: t }) {
		let r = "", s = {
			type: "AtHead",
			get name() {
				return r;
			},
			set name(n) {
				n[0], n.indexOf("."), r = n;
			},
			get original() {
				return this.name;
			},
			set original(n) {
				this.name = n;
			},
			loc: t
		};
		return s.name = e, s;
	}
	var({ name: e, loc: t }) {
		let r = "", s = {
			type: "VarHead",
			get name() {
				return r;
			},
			set name(n) {
				n[0], n.indexOf("."), r = n;
			},
			get original() {
				return this.name;
			},
			set original(n) {
				this.name = n;
			},
			loc: t
		};
		return s.name = e, s;
	}
	hash({ pairs: e, loc: t }) {
		return {
			type: "Hash",
			pairs: e,
			loc: t
		};
	}
	pair({ key: e, value: t, loc: r }) {
		return {
			type: "HashPair",
			key: e,
			value: t,
			loc: r
		};
	}
	literal({ type: e, value: t, loc: r }) {
		return (function({ type: s, value: n, loc: i }) {
			let a = {
				type: s,
				value: n,
				loc: i
			};
			return Object.defineProperty(a, "original", {
				enumerable: !1,
				get() {
					return this.value;
				},
				set(o) {
					this.value = o;
				}
			}), a;
		})({
			type: e,
			value: t,
			loc: r
		});
	}
}(), cr = class {
	constructor(t, r = new $e($r), s = "precompile") {
		this.elementStack = [], this.currentAttribute = null, this.currentNode = null, this.source = t, this.lines = t.source.split(/\r\n?|\n/u), this.tokenizer = new Xe(this, r, s);
	}
	offset() {
		let { line: t, column: r } = this.tokenizer;
		return this.source.offsetFor(t, r);
	}
	pos({ line: t, column: r }) {
		return this.source.offsetFor(t, r);
	}
	finish(t) {
		return ze({}, t, { loc: t.start.until(this.offset()) });
	}
	get currentAttr() {
		return this.currentAttribute;
	}
	get currentTag() {
		let t = this.currentNode;
		return t && (t.type === "StartTag" || t.type), t;
	}
	get currentStartTag() {
		let t = this.currentNode;
		return t && t.type, t;
	}
	get currentEndTag() {
		let t = this.currentNode;
		return t && t.type, t;
	}
	get currentComment() {
		let t = this.currentNode;
		return t && t.type, t;
	}
	get currentData() {
		let t = this.currentNode;
		return t && t.type, t;
	}
	acceptNode(t) {
		return this[t.type](t);
	}
	currentElement() {
		return fr(this.elementStack);
	}
	sourceForNode(t, r) {
		let s, n, i, a = t.loc.start.line - 1, o = a - 1, c = t.loc.start.column, h = [];
		for (r ? (n = r.loc.end.line - 1, i = r.loc.end.column) : (n = t.loc.end.line - 1, i = t.loc.end.column); o < n;) o++, s = this.lines[o], o === a ? a === n ? h.push(s.slice(c, i)) : h.push(s.slice(c)) : o === n ? h.push(s.slice(0, i)) : h.push(s);
		return h.join(`
`);
	}
}, ur = class extends cr {
	parse(t, r) {
		t.loc;
		let s = d.template({
			body: [],
			blockParams: r,
			loc: this.source.spanFor(t.loc)
		}), n = this.parseProgram(s, t);
		return this.pendingError?.eof(n.loc.getEnd()), n;
	}
	Program(t, r) {
		t.loc;
		let s = d.blockItself({
			body: [],
			params: r,
			chained: t.chained,
			loc: this.source.spanFor(t.loc)
		});
		return this.parseProgram(s, t);
	}
	parseProgram(t, r) {
		if (r.body.length === 0) return t;
		let s;
		try {
			this.elementStack.push(t);
			for (let n of r.body) this.acceptNode(n);
		} finally {
			s = this.elementStack.pop();
		}
		if (t !== s) {
			if (s?.type === "ElementNode") throw k(`Unclosed element \`${s.tag}\``, s.loc);
			t.type;
		}
		return t;
	}
	BlockStatement(t) {
		if (this.tokenizer.state === "comment") return t.loc, void this.appendToCommentData(this.sourceForNode(t));
		if (this.tokenizer.state !== "data" && this.tokenizer.state !== "beforeData") throw k("A block may only be used inside an HTML element or another block.", this.source.spanFor(t.loc));
		let { path: r, params: s, hash: n } = rr(this, t), i = this.source.spanFor(t.loc), a, o = [];
		if (t.program.blockParams?.length) {
			let p = n.loc.collapse("end");
			p = t.program.loc ? p.withEnd(this.source.spanFor(t.program.loc).getStart()) : t.program.body[0] ? p.withEnd(this.source.spanFor(t.program.body[0].loc).getStart()) : p.withEnd(i.getEnd()), a = an(this.source, t, p);
			let g = p.asString(), E = g.indexOf("|") + 1, T = g.indexOf("|", E);
			for (let D of t.program.blockParams) {
				let B, O;
				B = E >= T ? -1 : g.indexOf(D, E), B === -1 || B + D.length > T ? (E = T, O = this.source.spanFor(sr)) : (E = B, O = p.sliceStartChars({
					skipStart: E,
					chars: D.length
				}), E += D.length), o.push(d.var({
					name: D,
					loc: O
				}));
			}
		} else a = an(this.source, t, i);
		let c = this.Program(a.program, o), h = a.inverse ? this.Program(a.inverse, []) : null, f = d.block({
			path: r,
			params: s,
			hash: n,
			defaultBlock: c,
			elseBlock: h,
			loc: this.source.spanFor(t.loc),
			openStrip: t.openStrip,
			inverseStrip: t.inverseStrip,
			closeStrip: t.closeStrip
		});
		At(this.currentElement(), f);
	}
	MustacheStatement(t) {
		this.pendingError?.mustache(this.source.spanFor(t.loc));
		let { tokenizer: r } = this;
		if (r.state === "comment") return void this.appendToCommentData(this.sourceForNode(t));
		let s, { escaped: n, loc: i, strip: a } = t;
		if ("original" in t.path && t.path.original === "...attributes") throw k("Illegal use of ...attributes", this.source.spanFor(t.loc));
		if (pn(t.path)) s = d.mustache({
			path: this.acceptNode(t.path),
			params: [],
			hash: d.hash({
				pairs: [],
				loc: this.source.spanFor(t.path.loc).collapse("end")
			}),
			trusting: !n,
			loc: this.source.spanFor(i),
			strip: a
		});
		else {
			let { path: o, params: c, hash: h } = rr(this, t);
			s = d.mustache({
				path: o,
				params: c,
				hash: h,
				trusting: !n,
				loc: this.source.spanFor(i),
				strip: a
			});
		}
		switch (r.state) {
			case "tagOpen":
			case "tagName": throw k("Cannot use mustaches in an elements tagname", s.loc);
			case "beforeAttributeName":
				nr(this.currentStartTag, s);
				break;
			case "attributeName":
			case "afterAttributeName":
				this.beginAttributeValue(!1), this.finishAttributeValue(), nr(this.currentStartTag, s), r.transitionTo("beforeAttributeName");
				break;
			case "afterAttributeValueQuoted":
				nr(this.currentStartTag, s), r.transitionTo("beforeAttributeName");
				break;
			case "beforeAttributeValue":
				this.beginAttributeValue(!1), this.appendDynamicAttributeValuePart(s), r.transitionTo("attributeValueUnquoted");
				break;
			case "attributeValueDoubleQuoted":
			case "attributeValueSingleQuoted":
			case "attributeValueUnquoted":
				this.appendDynamicAttributeValuePart(s);
				break;
			default: At(this.currentElement(), s);
		}
		return s;
	}
	appendDynamicAttributeValuePart(t) {
		this.finalizeTextPart();
		let r = this.currentAttr;
		r.isDynamic = !0, r.parts.push(t);
	}
	finalizeTextPart() {
		let t = this.currentAttr.currentPart;
		t !== null && (this.currentAttr.parts.push(t), this.startTextPart());
	}
	startTextPart() {
		this.currentAttr.currentPart = null;
	}
	ContentStatement(t) {
		(function(r, s) {
			let n = s.loc.start.line, i = s.loc.start.column, a = (function(o, c) {
				if (c === "") return {
					lines: o.split(`
`).length - 1,
					columns: 0
				};
				let [h] = o.split(c), f = h.split(/\n/u), p = f.length - 1;
				return {
					lines: p,
					columns: f[p].length
				};
			})(s.original, s.value);
			n += a.lines, a.lines ? i = a.columns : i += a.columns, r.line = n, r.column = i;
		})(this.tokenizer, t), this.tokenizer.tokenizePart(t.value), this.tokenizer.flushData();
	}
	CommentStatement(t) {
		let { tokenizer: r } = this;
		if (r.state === "comment") return this.appendToCommentData(this.sourceForNode(t)), null;
		let { value: s, loc: n } = t, i = d.mustacheComment({
			value: s,
			loc: this.source.spanFor(n)
		});
		switch (r.state) {
			case "beforeAttributeName":
			case "afterAttributeName":
				this.currentStartTag.comments.push(i);
				break;
			case "beforeData":
			case "data":
				At(this.currentElement(), i);
				break;
			default: throw k(`Using a Handlebars comment when in the \`${r.state}\` state is not supported`, this.source.spanFor(t.loc));
		}
		return i;
	}
	PartialStatement(t) {
		throw k("Handlebars partials are not supported", this.source.spanFor(t.loc));
	}
	PartialBlockStatement(t) {
		throw k("Handlebars partial blocks are not supported", this.source.spanFor(t.loc));
	}
	Decorator(t) {
		throw k("Handlebars decorators are not supported", this.source.spanFor(t.loc));
	}
	DecoratorBlock(t) {
		throw k("Handlebars decorator blocks are not supported", this.source.spanFor(t.loc));
	}
	SubExpression(t) {
		let { path: r, params: s, hash: n } = rr(this, t);
		return d.sexpr({
			path: r,
			params: s,
			hash: n,
			loc: this.source.spanFor(t.loc)
		});
	}
	PathExpression(t) {
		let { original: r } = t, s;
		if (r.indexOf("/") !== -1) {
			if (r.slice(0, 2) === "./") throw k("Using \"./\" is not supported in Glimmer and unnecessary", this.source.spanFor(t.loc));
			if (r.slice(0, 3) === "../") throw k("Changing context using \"../\" is not supported in Glimmer", this.source.spanFor(t.loc));
			if (r.indexOf(".") !== -1) throw k("Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths", this.source.spanFor(t.loc));
			s = [t.parts.join("/")];
		} else {
			if (r === ".") throw k("'.' is not a supported path in Glimmer; check for a path with a trailing '.'", this.source.spanFor(t.loc));
			s = t.parts;
		}
		let n, i = !1;
		if (/^this(?:\..+)?$/u.test(r) && (i = !0), i) n = d.this({ loc: this.source.spanFor({
			start: t.loc.start,
			end: {
				line: t.loc.start.line,
				column: t.loc.start.column + 4
			}
		}) });
		else if (t.data) {
			let a = s.shift();
			if (a === void 0) throw k("Attempted to parse a path expression, but it was not valid. Paths beginning with @ must start with a-z.", this.source.spanFor(t.loc));
			n = d.atName({
				name: `@${a}`,
				loc: this.source.spanFor({
					start: t.loc.start,
					end: {
						line: t.loc.start.line,
						column: t.loc.start.column + a.length + 1
					}
				})
			});
		} else {
			let a = s.shift();
			if (a === void 0) throw k("Attempted to parse a path expression, but it was not valid. Paths must start with a-z or A-Z.", this.source.spanFor(t.loc));
			n = d.var({
				name: a,
				loc: this.source.spanFor({
					start: t.loc.start,
					end: {
						line: t.loc.start.line,
						column: t.loc.start.column + a.length
					}
				})
			});
		}
		return d.path({
			head: n,
			tail: s,
			loc: this.source.spanFor(t.loc)
		});
	}
	Hash(t) {
		let r = t.pairs.map(((s) => d.pair({
			key: s.key,
			value: this.acceptNode(s.value),
			loc: this.source.spanFor(s.loc)
		})));
		return d.hash({
			pairs: r,
			loc: this.source.spanFor(t.loc)
		});
	}
	StringLiteral(t) {
		return d.literal({
			type: "StringLiteral",
			value: t.value,
			loc: this.source.spanFor(t.loc)
		});
	}
	BooleanLiteral(t) {
		return d.literal({
			type: "BooleanLiteral",
			value: t.value,
			loc: this.source.spanFor(t.loc)
		});
	}
	NumberLiteral(t) {
		return d.literal({
			type: "NumberLiteral",
			value: t.value,
			loc: this.source.spanFor(t.loc)
		});
	}
	UndefinedLiteral(t) {
		return d.literal({
			type: "UndefinedLiteral",
			value: void 0,
			loc: this.source.spanFor(t.loc)
		});
	}
	NullLiteral(t) {
		return d.literal({
			type: "NullLiteral",
			value: null,
			loc: this.source.spanFor(t.loc)
		});
	}
	constructor(...t) {
		super(...t), this.pendingError = null;
	}
};
function rr(e, t) {
	let r;
	switch (t.path.type) {
		case "PathExpression":
			r = e.PathExpression(t.path);
			break;
		case "SubExpression":
			r = e.SubExpression(t.path);
			break;
		case "StringLiteral":
		case "UndefinedLiteral":
		case "NullLiteral":
		case "NumberLiteral":
		case "BooleanLiteral": {
			let i;
			throw i = t.path.type === "BooleanLiteral" ? t.path.original.toString() : t.path.type === "StringLiteral" ? `"${t.path.original}"` : t.path.type === "NullLiteral" ? "null" : t.path.type === "NumberLiteral" ? t.path.value.toString() : "undefined", k(`${t.path.type} "${t.path.type === "StringLiteral" ? t.path.original : i}" cannot be called as a sub-expression, replace (${i}) with ${i}`, e.source.spanFor(t.path.loc));
		}
	}
	let s = t.params.map(((i) => e.acceptNode(i))), n = Yt(s) ? fr(s).loc : r.loc;
	return {
		path: r,
		params: s,
		hash: t.hash ? e.Hash(t.hash) : d.hash({
			pairs: [],
			loc: e.source.spanFor(n).collapse("end")
		})
	};
}
function nr(e, t) {
	let { path: r, params: s, hash: n, loc: i } = t;
	if (pn(r)) {
		let o = `{{${(function(c) {
			return c.type === "UndefinedLiteral" ? "undefined" : JSON.stringify(c.value);
		})(r)}}}`;
		throw k(`In <${e.name} ... ${o} ..., ${o} is not a valid modifier`, t.loc);
	}
	let a = d.elementModifier({
		path: r,
		params: s,
		hash: n,
		loc: i
	});
	e.modifiers.push(a);
}
function an(e, t, r) {
	if (!t.program.loc) {
		let n = V(0, t.program.body, 0), i = V(0, t.program.body, -1);
		if (n && i) t.program.loc = {
			...n.loc,
			end: i.loc.end
		};
		else {
			let a = e.spanFor(t.loc);
			t.program.loc = r.withEnd(a.getEnd());
		}
	}
	let s = e.spanFor(t.program.loc).getEnd();
	return t.inverse && !t.inverse.loc && (t.inverse.loc = s.collapsed()), t;
}
function Nt(e) {
	return /[\t\n\f ]/u.test(e);
}
var hr = class extends ur {
	reset() {
		this.currentNode = null;
	}
	beginComment() {
		this.currentNode = {
			type: "CommentStatement",
			value: "",
			start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
		};
	}
	appendToCommentData(t) {
		this.currentComment.value += t;
	}
	finishComment() {
		At(this.currentElement(), d.comment(this.finish(this.currentComment)));
	}
	beginData() {
		this.currentNode = {
			type: "TextNode",
			chars: "",
			start: this.offset()
		};
	}
	appendToData(t) {
		this.currentData.chars += t;
	}
	finishData() {
		At(this.currentElement(), d.text(this.finish(this.currentData)));
	}
	tagOpen() {
		this.tagOpenLine = this.tokenizer.line, this.tagOpenColumn = this.tokenizer.column;
	}
	beginStartTag() {
		this.currentNode = {
			type: "StartTag",
			name: "",
			nameStart: null,
			nameEnd: null,
			attributes: [],
			modifiers: [],
			comments: [],
			params: [],
			selfClosing: !1,
			start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
		};
	}
	beginEndTag() {
		this.currentNode = {
			type: "EndTag",
			name: "",
			start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
		};
	}
	finishTag() {
		let t = this.finish(this.currentTag);
		if (t.type === "StartTag") {
			if (this.finishStartTag(), t.name === ":") throw k("Invalid named block named detected, you may have created a named block without a name, or you may have began your name with a number. Named blocks must have names that are at least one character long, and begin with a lower case letter", this.source.spanFor({
				start: this.currentTag.start.toJSON(),
				end: this.offset().toJSON()
			}));
			(de.has(t.name) || t.selfClosing) && this.finishEndTag(!0);
		} else t.type, t.type, this.finishEndTag(!1);
	}
	finishStartTag() {
		let { name: t, nameStart: r, nameEnd: s } = this.currentStartTag, n = r.until(s), [i, ...a] = t.split("."), o = d.path({
			head: d.head({
				original: i,
				loc: n.sliceStartChars({ chars: i.length })
			}),
			tail: a,
			loc: n
		}), { attributes: c, modifiers: h, comments: f, params: p, selfClosing: g, loc: E } = this.finish(this.currentStartTag), T = d.element({
			path: o,
			selfClosing: g,
			attributes: c,
			modifiers: h,
			comments: f,
			params: p,
			children: [],
			openTag: E,
			closeTag: g ? null : A.broken(),
			loc: E
		});
		this.elementStack.push(T);
	}
	finishEndTag(t) {
		let { start: r } = this.currentTag, s = this.finish(this.currentTag), n = this.elementStack.pop();
		this.validateEndTag(s, n, t);
		let i = this.currentElement();
		t ? n.closeTag = null : n.selfClosing ? n.closeTag : n.closeTag = r.until(this.offset()), n.loc = n.loc.withEnd(this.offset()), At(i, d.element(n));
	}
	markTagAsSelfClosing() {
		let t = this.currentTag;
		if (t.type !== "StartTag") throw k("Invalid end tag: closing tag must not be self-closing", this.source.spanFor({
			start: t.start.toJSON(),
			end: this.offset().toJSON()
		}));
		t.selfClosing = !0;
	}
	appendToTagName(t) {
		let r = this.currentTag;
		if (r.name += t, r.type === "StartTag") {
			let s = this.offset();
			r.nameStart === null && (r.nameEnd, r.nameStart = s.move(-1)), r.nameEnd = s;
		}
	}
	beginAttribute() {
		let t = this.offset();
		this.currentAttribute = {
			name: "",
			parts: [],
			currentPart: null,
			isQuoted: !1,
			isDynamic: !1,
			start: t,
			valueSpan: t.collapsed()
		};
	}
	appendToAttributeName(t) {
		this.currentAttr.name += t, this.currentAttr.name === "as" && this.parsePossibleBlockParams();
	}
	beginAttributeValue(t) {
		this.currentAttr.isQuoted = t, this.startTextPart(), this.currentAttr.valueSpan = this.offset().collapsed();
	}
	appendToAttributeValue(t) {
		let r = this.currentAttr.parts, s = r[r.length - 1], n = this.currentAttr.currentPart;
		if (n) n.chars += t, n.loc = n.loc.withEnd(this.offset());
		else {
			let i = this.offset();
			i = t === `
` ? s ? s.loc.getEnd() : this.currentAttr.valueSpan.getStart() : i.move(-1), this.currentAttr.currentPart = d.text({
				chars: t,
				loc: i.collapsed()
			});
		}
	}
	finishAttributeValue() {
		this.finalizeTextPart();
		let t = this.currentTag, r = this.offset();
		if (t.type === "EndTag") throw k("Invalid end tag: closing tag must not have attributes", this.source.spanFor({
			start: t.start.toJSON(),
			end: r.toJSON()
		}));
		let { name: s, parts: n, start: i, isQuoted: a, isDynamic: o, valueSpan: c } = this.currentAttr;
		if (s.startsWith("|") && n.length === 0 && !a && !o) throw k("Invalid block parameters syntax: block parameters must be preceded by the `as` keyword", i.until(i.move(s.length)));
		let h = this.assembleAttributeValue(n, a, o, i.until(r));
		h.loc = c.withEnd(r);
		let f = d.attr({
			name: s,
			value: h,
			loc: i.until(r)
		});
		this.currentStartTag.attributes.push(f);
	}
	parsePossibleBlockParams() {
		let t = /[!"#%&'()*+./;<=>@[\\\]^`{|}~]/u;
		this.tokenizer.state;
		let r = this.currentStartTag, s = this.currentAttr, n = { state: "PossibleAs" }, i = {
			PossibleAs: (o) => {
				if (n.state, Nt(o)) n = { state: "BeforeStartPipe" }, this.tokenizer.transitionTo("afterAttributeName"), this.tokenizer.consume();
				else {
					if (o === "|") throw k("Invalid block parameters syntax: expecting at least one space character between \"as\" and \"|\"", s.start.until(this.offset().move(1)));
					n = { state: "Done" };
				}
			},
			BeforeStartPipe: (o) => {
				n.state, Nt(o) ? this.tokenizer.consume() : o === "|" ? (n = { state: "BeforeBlockParamName" }, this.tokenizer.transitionTo("beforeAttributeName"), this.tokenizer.consume()) : n = { state: "Done" };
			},
			BeforeBlockParamName: (o) => {
				if (n.state, Nt(o)) this.tokenizer.consume();
				else if (o === "") n = { state: "Done" }, this.pendingError = {
					mustache(c) {
						throw k("Invalid block parameters syntax: mustaches cannot be used inside parameters list", c);
					},
					eof(c) {
						throw k("Invalid block parameters syntax: expecting the tag to be closed with \">\" or \"/>\" after parameters list", s.start.until(c));
					}
				};
				else if (o === "|") {
					if (r.params.length === 0) throw k("Invalid block parameters syntax: empty parameters list, expecting at least one identifier", s.start.until(this.offset().move(1)));
					n = { state: "AfterEndPipe" }, this.tokenizer.consume();
				} else {
					if (o === ">" || o === "/") throw k("Invalid block parameters syntax: incomplete parameters list, expecting \"|\" but the tag was closed prematurely", s.start.until(this.offset().move(1)));
					n = {
						state: "BlockParamName",
						name: o,
						start: this.offset()
					}, this.tokenizer.consume();
				}
			},
			BlockParamName: (o) => {
				if (n.state, o === "") n = { state: "Done" }, this.pendingError = {
					mustache(c) {
						throw k("Invalid block parameters syntax: mustaches cannot be used inside parameters list", c);
					},
					eof(c) {
						throw k("Invalid block parameters syntax: expecting the tag to be closed with \">\" or \"/>\" after parameters list", s.start.until(c));
					}
				};
				else if (o === "|" || Nt(o)) {
					let c = n.start.until(this.offset());
					if (n.name === "this" || t.test(n.name)) throw k(`Invalid block parameters syntax: invalid identifier name \`${n.name}\``, c);
					r.params.push(d.var({
						name: n.name,
						loc: c
					})), n = o === "|" ? { state: "AfterEndPipe" } : { state: "BeforeBlockParamName" }, this.tokenizer.consume();
				} else {
					if (o === ">" || o === "/") throw k("Invalid block parameters syntax: expecting \"|\" but the tag was closed prematurely", s.start.until(this.offset().move(1)));
					n.name += o, this.tokenizer.consume();
				}
			},
			AfterEndPipe: (o) => {
				n.state, Nt(o) ? this.tokenizer.consume() : o === "" ? (n = { state: "Done" }, this.pendingError = {
					mustache(c) {
						throw k("Invalid block parameters syntax: modifiers cannot follow parameters list", c);
					},
					eof(c) {
						throw k("Invalid block parameters syntax: expecting the tag to be closed with \">\" or \"/>\" after parameters list", s.start.until(c));
					}
				}) : o === ">" || o === "/" ? n = { state: "Done" } : (n = {
					state: "Error",
					message: "Invalid block parameters syntax: expecting the tag to be closed with \">\" or \"/>\" after parameters list",
					start: this.offset()
				}, this.tokenizer.consume());
			},
			Error: (o) => {
				if (n.state, o === "" || o === "/" || o === ">" || Nt(o)) throw k(n.message, n.start.until(this.offset()));
				this.tokenizer.consume();
			},
			Done: () => {}
		}, a;
		do
			a = this.tokenizer.peek(), i[n.state](a);
		while (n.state !== "Done" && a !== "");
		n.state;
	}
	reportSyntaxError(t) {
		throw k(t, this.offset().collapsed());
	}
	assembleConcatenatedValue(t) {
		let r = Is(t), s = fr(t);
		return d.concat({
			parts: t,
			loc: this.source.spanFor(r.loc).extend(this.source.spanFor(s.loc))
		});
	}
	validateEndTag(t, r, s) {
		if (de.has(t.name) && !s) throw k(`<${t.name}> elements do not need end tags. You should remove it`, t.loc);
		if (r.type !== "ElementNode") throw k(`Closing tag </${t.name}> without an open tag`, t.loc);
		if (r.tag !== t.name) throw k(`Closing tag </${t.name}> did not match last open tag <${r.tag}> (on line ${r.loc.startPosition.line})`, t.loc);
	}
	assembleAttributeValue(t, r, s, n) {
		if (s) {
			if (r) return this.assembleConcatenatedValue(t);
			{
				let [i, a] = t;
				if (a === void 0 || a.type === "TextNode" && a.chars === "/") return i;
				throw k("An unquoted attribute value must be a string or a mustache, preceded by whitespace or a '=' character, and followed by whitespace, a '>' character, or '/>'", n);
			}
		}
		return Yt(t) ? t[0] : d.text({
			chars: "",
			loc: n
		});
	}
	constructor(...t) {
		super(...t), this.tagOpenLine = 0, this.tagOpenColumn = 0;
	}
}, Ms = {}, pr = class extends $e {
	constructor() {
		super({});
	}
	parse() {}
};
function mn(e, t = {}) {
	let r, s, n, i = t.mode || "precompile";
	typeof e == "string" ? (r = new pt(e, t.meta?.moduleName), s = i === "codemod" ? he(e, t.parseOptions) : Je(e, t.parseOptions)) : e instanceof pt ? (r = e, s = i === "codemod" ? he(e.source, t.parseOptions) : Je(e.source, t.parseOptions)) : (r = new pt("", t.meta?.moduleName), s = e), i === "codemod" && (n = new pr());
	let a = A.forCharPositions(r, 0, r.source.length);
	s.loc = {
		source: "(program)",
		start: a.startPosition,
		end: a.endPosition
	};
	let o = new hr(r, n, i).parse(s, t.locals ?? []);
	if (t.plugins?.ast) for (let c of t.plugins.ast) Hs(o, c(ze({}, t, { syntax: Ms }, { plugins: void 0 })).visitor);
	return o;
}
var dn = Ur(be);
var mt = (e) => e.loc.start.offset, Gt = (e) => e.loc.end.offset;
var Gs = new Set(on());
function bn(e) {
	return e.toUpperCase() === e;
}
function Ks(e) {
	return e.type === "ElementNode" && typeof e.tag == "string" && !e.tag.startsWith(":") && (bn(e.tag[0]) || e.tag.includes("."));
}
function Ws(e) {
	return Gs.has(e.toLowerCase()) && !bn(e[0]);
}
function dr(e) {
	return e.selfClosing === !0 || Ws(e.tag) || Ks(e) && e.children.every((t) => Se(t));
}
function Se(e) {
	return e.type === "TextNode" && !/\S/u.test(e.chars);
}
function gn(e) {
	return e?.type === "MustacheCommentStatement" && typeof e.value == "string" && e.value.trim() === "prettier-ignore";
}
function yn(e) {
	return gn(e.node) || e.isInArray && (e.key === "children" || e.key === "body" || e.key === "parts") && gn(e.siblings[e.index - 2]);
}
var xn = 2;
function js(e, t, r) {
	let { node: s } = e;
	switch (s.type) {
		case "Block":
		case "Program":
		case "Template": return I(e.map(r, "body"));
		case "ElementNode": {
			let n = t.htmlWhitespaceSensitivity !== "ignore", i = [!n && e.previous?.type === "ElementNode" ? H : "", I([Js(e, r)])];
			if (dr(s)) return [i];
			let a = [
				"</",
				s.tag,
				">"
			], o = s.tag === "style";
			if (s.children.length === 0 || (!n || o) && s.children.every((h) => Se(h))) return [i, a];
			let c = e.map(r, "children");
			return o || !n ? [
				i,
				F([H, ...c]),
				H,
				a
			] : [
				i,
				F(I(c)),
				a
			];
		}
		case "BlockStatement": return Pn(e) ? [
			ni(e, r),
			En(e, t, r),
			vn(e, t, r)
		] : [ti(e, r), I([
			En(e, t, r),
			vn(e, t, r),
			si(e, t, r)
		])];
		case "ElementModifierStatement": return I([
			"{{",
			Tn(e, r),
			"}}"
		]);
		case "MustacheStatement": return I([
			ke(s),
			Tn(e, r),
			Ee(s)
		]);
		case "SubExpression": return I([
			"(",
			ui(e, r),
			H,
			")"
		]);
		case "AttrNode": {
			let { name: n, value: i } = s, a = i.type === "TextNode";
			if (a && i.chars === "" && mt(i) === Gt(i)) return n;
			let c = a ? oe(i.chars, t.singleQuote) : i.type === "ConcatStatement" ? oe(i.parts.map((f) => f.type === "TextNode" ? f.chars : "").join(""), t.singleQuote) : "", h = r("value");
			return [
				n,
				"=",
				c,
				n === "class" && c ? I(F(h)) : h,
				c
			];
		}
		case "ConcatStatement": return e.map(r, "parts");
		case "Hash": return ct(N, e.map(r, "pairs"));
		case "HashPair": return [
			s.key,
			"=",
			r("value")
		];
		case "TextNode": {
			let n = s.chars, { parent: i } = e;
			if (i.type === "ElementNode") {
				if (i.tag === "pre") return ie(n);
				if (i.tag === "style") return n = St(0, n, /^\n+/gu, ""), n = R.trimEnd(n), n = R.dedentString(n), ie(n, ut);
			}
			n = St(0, n, "{{", "\\{{");
			let a = ii(e);
			if (a) {
				if (a === "class") {
					let D = n.trim().split(/\s+/u).join(" "), B = !1, O = !1;
					return e.parent.type === "ConcatStatement" && (e.previous?.type === "MustacheStatement" && /^\s/u.test(n) && (B = !0), e.next?.type === "MustacheStatement" && /\s$/u.test(n) && D !== "" && (O = !0)), [
						B ? N : "",
						D,
						O ? N : ""
					];
				}
				return ie(n);
			}
			let o = R.isWhitespaceOnly(n), { isFirst: c, isLast: h } = e;
			if (t.htmlWhitespaceSensitivity !== "ignore") {
				let D = h && e.parent.type === "Template", B = c && e.parent.type === "Template";
				if (o) {
					if (B || D) return "";
					let C = [N], $ = _t(n);
					return $ && (C = Kt($)), h && (C = C.map((W) => Be(W))), C;
				}
				let O = R.getLeadingWhitespace(n), z = [];
				if (O) {
					z = [N];
					let C = _t(O);
					C && (z = Kt(C)), n = n.slice(O.length);
				}
				let P = R.getTrailingWhitespace(n), U = [];
				if (P) {
					if (!D) {
						U = [N];
						let C = _t(P);
						C && (U = Kt(C)), h && (U = U.map(($) => Be($)));
					}
					n = n.slice(0, -P.length);
				}
				return [
					...z,
					qe(wn(n)),
					...U
				];
			}
			let f = _t(n), p = ai(n), g = oi(n);
			if ((c || h) && o && (e.parent.type === "Block" || e.parent.type === "ElementNode" || e.parent.type === "Template")) return "";
			o && f ? (p = Math.min(f, xn), g = 0) : ((e.next?.type === "BlockStatement" || e.next?.type === "ElementNode") && (g = Math.max(g, 1)), (e.previous?.type === "BlockStatement" || e.previous?.type === "ElementNode") && (p = Math.max(p, 1)));
			let E = "", T = "";
			return g === 0 && e.next?.type === "MustacheStatement" && (T = " "), p === 0 && e.previous?.type === "MustacheStatement" && (E = " "), c && (p = 0, E = ""), h && (g = 0, T = ""), R.hasLeadingWhitespace(n) && (n = E + R.trimStart(n)), R.hasTrailingWhitespace(n) && (n = R.trimEnd(n) + T), [
				...Kt(p),
				qe(wn(n)),
				...Kt(g)
			];
		}
		case "MustacheCommentStatement": {
			let n = mt(s), i = Gt(s), a = t.originalText.charAt(n + 2) === "~", o = t.originalText.charAt(i - 3) === "~", c = s.value.includes("}}") ? "--" : "";
			return [
				"{{",
				a ? "~" : "",
				"!",
				c,
				s.value,
				c,
				o ? "~" : "",
				"}}"
			];
		}
		case "PathExpression": return mi(s);
		case "BooleanLiteral": return String(s.value);
		case "CommentStatement": return [
			"<!--",
			s.value,
			"-->"
		];
		case "StringLiteral": return li(e, t);
		case "NumberLiteral": return String(s.value);
		case "UndefinedLiteral": return "undefined";
		case "NullLiteral": return "null";
		default: throw new qr(s, "Handlebars");
	}
}
function Qs(e, t) {
	return mt(e) - mt(t);
}
function Js(e, t) {
	let { node: r } = e, s = [
		"attributes",
		"modifiers",
		"comments"
	].filter((i) => Bt(r[i])), n = s.flatMap((i) => r[i]).sort(Qs);
	for (let i of s) e.each(({ node: a }) => {
		let o = n.indexOf(a);
		n.splice(o, 1, [N, t()]);
	}, i);
	return Bt(r.blockParams) && n.push(N, br(r)), [
		"<",
		r.tag,
		F(n),
		$s(r)
	];
}
function $s(e) {
	return dr(e) ? Ve([H, "/>"], [" />", H]) : Ve([H, ">"], ">");
}
function ke(e) {
	return [e.trusting ? "{{{" : "{{", e.strip?.open ? "~" : ""];
}
function Ee(e) {
	let t = e.trusting ? "}}}" : "}}";
	return [e.strip?.close ? "~" : "", t];
}
function Xs(e) {
	return [
		ke(e),
		e.openStrip.open ? "~" : "",
		"#"
	];
}
function Zs(e) {
	let t = Ee(e);
	return [e.openStrip.close ? "~" : "", t];
}
function Sn(e) {
	return [
		ke(e),
		e.closeStrip.open ? "~" : "",
		"/"
	];
}
function kn(e) {
	let t = Ee(e);
	return [e.closeStrip.close ? "~" : "", t];
}
function Nn(e) {
	return [ke(e), e.inverseStrip.open ? "~" : ""];
}
function An(e) {
	let t = Ee(e);
	return [e.inverseStrip.close ? "~" : "", t];
}
function ti(e, t) {
	let { node: r } = e, s = [], n = ve(e, t);
	return n && s.push(I(n)), Bt(r.program.blockParams) && s.push(br(r.program)), I([
		Xs(r),
		gr(e, t),
		s.length > 0 ? F([N, ct(N, s)]) : "",
		H,
		Zs(r)
	]);
}
function ei(e, t) {
	return [
		t.htmlWhitespaceSensitivity === "ignore" ? ut : "",
		Nn(e),
		"else",
		An(e)
	];
}
var ri = ({ path: e }, { path: t }) => [e, t].every((r) => r.type === "PathExpression" && r.head.type === "VarHead") && e.head.name === t.head.name;
function Pn(e) {
	if (!e.match((r) => r.type === "BlockStatement", (r, s) => s === "body" && r.type === "Block" && r.body.length === 1, (r, s) => s === "inverse" && r.type === "BlockStatement")) return !1;
	let { node: t } = e;
	return t.path.type === "PathExpression" && t.path.head.type === "VarHead" && t.path.head.name === "if" || ri(t, e.grandparent);
}
function ni(e, t) {
	let { node: r, grandparent: s } = e;
	return I([
		Nn(s),
		[
			"else",
			" ",
			s.inverse.body[0].path.head.name
		],
		F([
			N,
			I(ve(e, t)),
			...Bt(r.program.blockParams) ? [N, br(r.program)] : []
		]),
		H,
		An(s)
	]);
}
function si(e, t, r) {
	let { node: s } = e;
	return t.htmlWhitespaceSensitivity === "ignore" ? [
		Cn(s) ? H : ut,
		Sn(s),
		r("path"),
		kn(s)
	] : [
		Sn(s),
		r("path"),
		kn(s)
	];
}
function Cn(e) {
	return e.type === "BlockStatement" && e.program.body.every((t) => Se(t));
}
function En(e, t, r) {
	let { node: s } = e;
	if (Cn(s)) return "";
	let n = r("program");
	return t.htmlWhitespaceSensitivity === "ignore" ? F([ut, n]) : F(n);
}
function vn(e, t, r) {
	let { node: s } = e;
	if (!s.inverse) return "";
	let n = r("inverse"), i = t.htmlWhitespaceSensitivity === "ignore" ? [ut, n] : n;
	return e.call(Pn, "inverse", "body", 0) ? i : [ei(s, t), F(i)];
}
function wn(e) {
	return ct(N, R.split(e));
}
function ii(e) {
	for (let t = 0; t < 2; t++) {
		let r = e.getParentNode(t);
		if (r?.type === "AttrNode") return r.name.toLowerCase();
	}
}
function _t(e) {
	return e = typeof e == "string" ? e : "", e.split(`
`).length - 1;
}
function ai(e) {
	e = typeof e == "string" ? e : "";
	return _t((e.match(/^([^\S\n\r]*[\n\r])+/gu) || [])[0] || "");
}
function oi(e) {
	e = typeof e == "string" ? e : "";
	return _t((e.match(/([\n\r][^\S\n\r]*)+$/gu) || [])[0] || "");
}
function Kt(e = 0) {
	return Array.from({ length: Math.min(e, xn) }).fill(ut);
}
function li(e, t) {
	let { node: { value: r } } = e, s = oe(r, ci(e) ? !t.singleQuote : t.singleQuote);
	return [
		s,
		St(0, r, s, `\\${s}`),
		s
	];
}
function ci(e) {
	let { ancestors: t } = e, r = t.findIndex((s) => s.type !== "SubExpression");
	return r !== -1 && t[r + 1].type === "ConcatStatement" && t[r + 2].type === "AttrNode";
}
function ui(e, t) {
	let r = gr(e, t), s = ve(e, t);
	return s ? F([
		r,
		N,
		I(s)
	]) : r;
}
function Tn(e, t) {
	let r = gr(e, t), s = ve(e, t);
	return s ? [F([
		r,
		N,
		s
	]), H] : r;
}
function gr(e, t) {
	return t("path");
}
function ve(e, t) {
	let { node: r } = e, s = [];
	return r.params.length > 0 && s.push(...e.map(t, "params")), r.hash?.pairs.length > 0 && s.push(t("hash")), s.length === 0 ? "" : ct(N, s);
}
function br(e) {
	return [
		"as |",
		e.blockParams.join(" "),
		"|"
	];
}
var hi = /* @__PURE__ */ new Set("!\"#%&'()*+,./;<=>@[\\]^`{|}~"), pi = new Set([
	"true",
	"false",
	"null",
	"undefined"
]), fi = (e, t) => t === 0 && e.startsWith("@") ? !1 : t !== 0 && pi.has(e) || /\s/u.test(e) || /^\d/u.test(e) || Array.prototype.some.call(e, (r) => hi.has(r));
function mi(e) {
	return e.tail.length === 0 && e.original.includes("/") ? e.original : [e.head.original, ...e.tail].map((r, s) => fi(r, s) ? `[${r}]` : r).join(".");
}
var _n = {
	features: { experimental_frontMatterSupport: {
		massageAstNode: !0,
		embed: !0,
		print: !0
	} },
	print: js,
	massageAstNode: Fr,
	hasPrettierIgnore: yn,
	getVisitorKeys: dn,
	embed: Hr
};
var Ln = [{
	name: "Handlebars",
	type: "markup",
	aceMode: "handlebars",
	extensions: [".handlebars", ".hbs"],
	tmScope: "text.html.handlebars",
	aliases: ["hbs", "htmlbars"],
	parsers: ["glimmer"],
	vscodeLanguageIds: ["handlebars"],
	linguistLanguageId: 155
}];
var yr = {};
Oe(yr, { glimmer: () => Ni });
function gi(e, t) {
	let r = /* @__PURE__ */ new SyntaxError(e + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
	return Object.assign(r, t);
}
var Dn = gi;
var On = Symbol.for("PRETTIER_IS_FRONT_MATTER");
var Wt = 3;
function bi(e) {
	let t = e.slice(0, Wt);
	if (t !== "---" && t !== "+++") return;
	let r = e.indexOf(`
`, Wt);
	if (r === -1) return;
	let s = e.slice(Wt, r).trim(), n = e.indexOf(`
${t}`, r), i = s;
	if (i || (i = t === "+++" ? "toml" : "yaml"), n === -1 && t === "---" && i === "yaml" && (n = e.indexOf(`
...`, r)), n === -1) return;
	let a = n + 1 + Wt, o = e.charAt(a + 1);
	if (!/\s?/u.test(o)) return;
	let c = e.slice(0, a), h;
	return {
		language: i,
		explicitLanguage: s || null,
		value: e.slice(r + 1, n),
		startDelimiter: t,
		endDelimiter: c.slice(-Wt),
		raw: c,
		start: {
			line: 1,
			column: 0,
			index: 0
		},
		end: {
			index: c.length,
			get line() {
				return h ?? (h = c.split(`
`)), h.length;
			},
			get column() {
				return h ?? (h = c.split(`
`)), V(0, h, -1).length;
			}
		},
		[On]: !0
	};
}
function yi(e) {
	let t = bi(e);
	return t ? {
		frontMatter: t,
		get content() {
			let { raw: r } = t;
			return St(0, r, /[^\n]/gu, " ") + e.slice(r.length);
		}
	} : { content: e };
}
var In = yi;
function Si(e) {
	let t = e.children ?? e.body;
	if (t) for (let r = 0; r < t.length - 1; r++) t[r].type === "TextNode" && t[r + 1].type === "MustacheStatement" && (t[r].chars = t[r].chars.replace(/\\$/u, "\\\\"));
}
var ki = (e) => {
	let { start: t, end: r } = e.loc;
	t.offset = e.loc.getStart().offset, r.offset = e.loc.getEnd().offset;
}, Ei = () => ({
	name: "glimmerPrettierParsePlugin",
	visitor: { All(e) {
		ki(e), Si(e);
	} }
}), vi = {
	mode: "codemod",
	plugins: { ast: [Ei] }
};
function wi(e) {
	let { frontMatter: t, content: r } = In(e), s;
	try {
		s = mn(r, vi);
	} catch (n) {
		let i = xi(n);
		if (i) throw Dn(Ti(n), {
			loc: i,
			cause: n
		});
		throw n;
	}
	if (t) {
		let n = {
			...t,
			type: "FrontMatter",
			loc: {
				start: {
					...t.start,
					offset: t.start.index
				},
				end: {
					...t.end,
					offset: t.end.index
				}
			}
		};
		s.body.unshift(n);
	}
	return s;
}
function Ti(e) {
	let { message: t } = e, r = t.split(`
`);
	return r.length >= 4 && /^Parse error on line \d+:$/u.test(r[0]) && /^-*\^$/u.test(V(0, r, -2)) ? V(0, r, -1) : r.length >= 4 && /:\s?$/u.test(r[0]) && /^\(error occurred in '.*?' @ line \d+ : column \d+\)$/u.test(V(0, r, -1)) && r[1] === "" && V(0, r, -2) === "" && r.slice(2, -2).every((s) => s.startsWith("|")) ? r[0].trim().slice(0, -1) : t;
}
function xi(e) {
	let { location: t, hash: r } = e;
	if (t) {
		let { start: s, end: n } = t;
		return typeof n.line != "number" ? { start: s } : t;
	}
	if (r) {
		let { loc: { last_line: s, last_column: n } } = r;
		return { start: {
			line: s,
			column: n + 1
		} };
	}
}
var Ni = {
	parse: wi,
	astFormat: "glimmer",
	locStart: mt,
	locEnd: Gt
};
var Ai = { glimmer: _n };
//#endregion
export { Bn as default, Ln as languages, yr as parsers, Ai as printers };
