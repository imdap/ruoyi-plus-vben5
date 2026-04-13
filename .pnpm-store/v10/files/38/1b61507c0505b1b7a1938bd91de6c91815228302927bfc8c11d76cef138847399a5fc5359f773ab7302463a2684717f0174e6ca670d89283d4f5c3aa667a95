//#region ../cspell-pipe/dist/helpers/iteratorToIterable.js
function* iteratorToIterable(iterator) {
	try {
		let n;
		while (!(n = iterator.next()).done) yield n.value;
	} catch (e) {
		if (iterator.throw) return iterator.throw(e);
		throw e;
	} finally {
		iterator.return?.();
	}
}
//#endregion
//#region ../cspell-pipe/dist/operators/append.js
/**
* Append values onto the end of an iterable.
* @param iterablesToAppend - the iterables in the order to be appended.
* @returns
*/
function opAppendSync(...iterablesToAppend) {
	function* fnAppend(iter) {
		yield* iter;
		for (const i of iterablesToAppend) yield* i;
	}
	return fnAppend;
}
//#endregion
//#region ../cspell-pipe/dist/operators/combine.js
function opCombineSync(...fns) {
	function combine(iter) {
		for (const fn of fns) iter = fn(iter);
		return iter;
	}
	return combine;
}
//#endregion
//#region ../cspell-pipe/dist/operators/concatMap.js
function opConcatMapSync(mapFn) {
	function fnConcatMapSync(iterable) {
		function opConcatMapIterator() {
			const iter = iterable[Symbol.iterator]();
			let resultsIter = void 0;
			function nextConcatMap() {
				while (true) {
					if (resultsIter) {
						const { done, value } = resultsIter.next();
						if (!done) return { value };
						resultsIter = void 0;
					}
					const { done, value } = iter.next();
					if (done) return {
						done,
						value: void 0
					};
					resultsIter = mapFn(value)[Symbol.iterator]();
				}
			}
			return { next: nextConcatMap };
		}
		return { [Symbol.iterator]: opConcatMapIterator };
	}
	return fnConcatMapSync;
}
//#endregion
//#region ../cspell-pipe/dist/operators/filter.js
function opFilterSync(filterFn) {
	function opFilterIterable(iterable) {
		function opFilterIterator() {
			const iter = iterable[Symbol.iterator]();
			function nextOpFilter() {
				while (true) {
					const { done, value } = iter.next();
					if (done) return {
						done,
						value: void 0
					};
					if (filterFn(value)) return { value };
				}
			}
			return { next: nextOpFilter };
		}
		return { [Symbol.iterator]: opFilterIterator };
	}
	return opFilterIterable;
}
//#endregion
//#region ../cspell-pipe/dist/operators/flatten.js
function opFlattenSync() {
	function* fn(iter) {
		for (const v of iter) yield* v;
	}
	return fn;
}
//#endregion
//#region ../cspell-pipe/dist/operators/map.js
function opMapSync(mapFn) {
	function opMapIterable(iterable) {
		function opMapIterator() {
			const iter = iterable[Symbol.iterator]();
			function nextOpMap() {
				const { done, value } = iter.next();
				if (done) return {
					done,
					value: void 0
				};
				return { value: mapFn(value) };
			}
			return { next: nextOpMap };
		}
		return { [Symbol.iterator]: opMapIterator };
	}
	return opMapIterable;
}
//#endregion
//#region ../cspell-pipe/dist/operators/reduce.js
function opReduceSync(reduceFn, initialValue) {
	function* reduce(head, tail) {
		for (const v of tail) head = reduceFn(head, v);
		yield head;
	}
	function* fn(iter) {
		const ht = initialValue === void 0 ? headTail(iter) : {
			head: initialValue,
			tail: iter
		};
		if (!ht) return;
		yield* reduce(ht.head, ht.tail);
	}
	return fn;
}
function headTail(iter) {
	const iterator = iter[Symbol.iterator]();
	const first = iterator.next();
	if (first.done) return void 0;
	return {
		head: first.value,
		tail: iteratorToIterable(iterator)
	};
}
//#endregion
//#region ../cspell-pipe/dist/operators/unique.js
function opUniqueSync(k) {
	function fnK(key) {
		function* fn(iter) {
			const s = /* @__PURE__ */ new Set();
			for (const v of iter) {
				const kk = key(v);
				if (s.has(kk)) continue;
				s.add(kk);
				yield v;
			}
		}
		return fn;
	}
	function* fn(iter) {
		const s = /* @__PURE__ */ new Set();
		for (const v of iter) {
			if (s.has(v)) continue;
			s.add(v);
			yield v;
		}
	}
	return k ? fnK(k) : fn;
}
//#endregion
//#region ../cspell-pipe/dist/pipe.js
function pipeSync(i, ...fns) {
	return opCombineSync(...fns)(i);
}
//#endregion
//#region ../cspell-pipe/dist/reduce.js
function reduceSync(iter, reduceFn, initialValue) {
	return [...initialValue === void 0 ? pipeSync(iter, opReduceSync(reduceFn)) : pipeSync(iter, opReduceSync(reduceFn, initialValue))][0];
}
//#endregion
//#region src/lib/utils/memorizeLastCall.ts
const SymEmpty = Symbol("memorizeLastCall");
function memorizeLastCall(fn) {
	let lastP = void 0;
	let lastR = SymEmpty;
	function calc(p) {
		if (lastP === p && lastR !== SymEmpty) return lastR;
		lastP = p;
		lastR = fn(p);
		return lastR;
	}
	return calc;
}
//#endregion
//#region src/lib/ITrieNode/find.ts
const defaultLegacyMinCompoundLength$2 = 3;
const _defaultFindOptions$1 = {
	matchCase: false,
	compoundMode: "compound",
	legacyMinCompoundLength: defaultLegacyMinCompoundLength$2
};
Object.freeze(_defaultFindOptions$1);
const knownCompoundModes$1 = new Map([
	"none",
	"compound",
	"legacy"
].map((a) => [a, a]));
const notFound = {
	found: false,
	compoundUsed: false,
	caseMatched: false,
	forbidden: void 0
};
Object.freeze(notFound);
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function findWordNode$1(root, word, options) {
	return _findWordNode$1(root, word, options);
}
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function findWord$1(root, word, options) {
	if (root.find && !options?.compoundSeparator) {
		const found = root.find(word, options?.matchCase || false);
		if (found) {
			if (options?.checkForbidden && found.forbidden === void 0) found.forbidden = isForbiddenWord$1(root, word, root.forbidPrefix);
			return found;
		}
		if (!root.hasCompoundWords) return notFound;
	}
	const { found, compoundUsed, caseMatched, forbidden } = _findWordNode$1(root, word, options);
	const result = {
		found,
		compoundUsed,
		caseMatched,
		forbidden
	};
	if (options?.checkForbidden && forbidden === void 0) result.forbidden = isForbiddenWord$1(root, word, root.forbidPrefix);
	return result;
}
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function _findWordNode$1(root, word, options) {
	const trieInfo = root.info;
	const matchCase = options?.matchCase || false;
	const compoundMode = knownCompoundModes$1.get(options?.compoundMode) || _defaultFindOptions$1.compoundMode;
	const compoundPrefix = compoundMode === "compound" ? trieInfo.compoundCharacter ?? root.compoundFix : "";
	const ignoreCasePrefix = matchCase ? "" : trieInfo.stripCaseAndAccentsPrefix ?? root.caseInsensitivePrefix;
	const mustCheckForbidden = options?.checkForbidden === true;
	const checkForbidden = options?.checkForbidden ?? true;
	const compoundSeparator = options?.compoundSeparator || "";
	function __findCompound() {
		const f = findCompoundWord$1(root, word, compoundPrefix, ignoreCasePrefix, compoundSeparator);
		if (f.found !== false && (mustCheckForbidden || f.compoundUsed && checkForbidden)) f.forbidden = isForbiddenWord$1(!f.caseMatched ? walk$2(root, root.caseInsensitivePrefix) : root, word, root.forbidPrefix);
		return f;
	}
	function __findExact() {
		const n = root.getNode ? root.getNode(word) : walk$2(root, word);
		return {
			found: isEndOfWordNode$1(n) && word,
			compoundUsed: false,
			forbidden: checkForbidden ? isForbiddenWord$1(root, word, root.forbidPrefix) : void 0,
			node: n,
			caseMatched: true
		};
	}
	switch (compoundMode) {
		case "none": return matchCase ? __findExact() : __findCompound();
		case "compound": return __findCompound();
		case "legacy": return findLegacyCompound$1(root, word, options);
	}
}
function findLegacyCompound$1(root, word, options) {
	const roots = [root];
	if (!options?.matchCase) roots.push(walk$2(root, root.caseInsensitivePrefix));
	return findLegacyCompoundNode$1(roots, word, options?.legacyMinCompoundLength || defaultLegacyMinCompoundLength$2, options?.compoundSeparator ?? "+");
}
function findCompoundNode$1(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator) {
	const stack = [{
		n: root,
		compoundPrefix: ignoreCasePrefix,
		cr: void 0,
		caseMatched: true,
		s: ""
	}];
	const compoundPrefix = compoundCharacter || ignoreCasePrefix;
	const possibleCompoundPrefix = ignoreCasePrefix && compoundCharacter ? ignoreCasePrefix + compoundCharacter : "";
	const nw = word.normalize();
	const w = [...nw];
	function determineRoot(s) {
		const prefix = s.compoundPrefix;
		let r = root;
		let i;
		for (i = 0; i < prefix.length && r; ++i) r = r.get(prefix[i]);
		const caseMatched = s.caseMatched && prefix[0] !== ignoreCasePrefix;
		return {
			n: s.n,
			compoundPrefix: prefix === compoundPrefix ? possibleCompoundPrefix : "",
			cr: r,
			caseMatched,
			s: prefix.endsWith(compoundCharacter) ? compoundSeparator : ""
		};
	}
	let compoundUsed = false;
	let caseMatched = true;
	let i = 0;
	let node;
	while (true) {
		const s = stack[i];
		const h = w[i++];
		const n = s.cr || s.n;
		const c = h && n?.get(h) || void 0;
		if (c && i < word.length) {
			caseMatched = s.caseMatched;
			stack[i] = {
				n: c,
				compoundPrefix,
				cr: void 0,
				caseMatched,
				s: ""
			};
		} else if (!c || !c.eow) {
			node = node || c;
			while (--i > 0) {
				const s = stack[i];
				if (!s.compoundPrefix || !s.n?.hasChildren()) continue;
				if (s.n.get(compoundCharacter)) break;
			}
			if (i >= 0 && stack[i].compoundPrefix) {
				compoundUsed = i > 0;
				const r = determineRoot(stack[i]);
				stack[i] = r;
				if (!r.cr) break;
				if (!i && !r.caseMatched && nw !== nw.toLowerCase()) break;
			} else break;
		} else {
			node = c;
			caseMatched = s.caseMatched;
			break;
		}
	}
	function joinCompoundWord() {
		return stack.map((s) => s.s).map((c, i) => c + w[i]).join("");
	}
	const f = i === word.length && word || false;
	return {
		found: f && (compoundSeparator ? joinCompoundWord() : f),
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function findCompoundWord$1(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator) {
	const { found, compoundUsed, node, caseMatched } = findCompoundNode$1(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator);
	if (!node || !node.eow) return {
		found: false,
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
	return {
		found,
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function findWordExact$1(root, word) {
	const r = root;
	if (r?.findExact) return r.findExact(word);
	return isEndOfWordNode$1(walk$2(root, word));
}
function isEndOfWordNode$1(n) {
	return !!n?.eow;
}
function walk$2(root, word) {
	const w = [...word];
	let n = root;
	let i = 0;
	while (n && i < w.length) {
		const h = w[i++];
		n = n.get(h);
	}
	return n;
}
function findLegacyCompoundNode$1(roots, word, minCompoundLength, compoundSeparator) {
	const root = roots[0];
	const numRoots = roots.length;
	const stack = [{
		n: root,
		usedRoots: 1,
		subLength: 0,
		isCompound: false,
		cr: void 0,
		caseMatched: true
	}];
	const w = word;
	const wLen = w.length;
	let compoundUsed = false;
	let caseMatched = true;
	let i = 0;
	let node;
	while (true) {
		const s = stack[i];
		const h = w[i++];
		const c = (s.cr || s.n)?.get(h);
		if (c && i < wLen) stack[i] = {
			n: c,
			usedRoots: 0,
			subLength: s.subLength + 1,
			isCompound: s.isCompound,
			cr: void 0,
			caseMatched: s.caseMatched
		};
		else if (!c || !c.eow || c.eow && s.subLength < minCompoundLength - 1) {
			while (--i > 0) {
				const s = stack[i];
				if (s.usedRoots < numRoots && s.n?.eow && (s.subLength >= minCompoundLength || !s.subLength) && wLen - i >= minCompoundLength) break;
			}
			if (i > 0 || stack[i].usedRoots < numRoots) {
				compoundUsed = i > 0;
				const s = stack[i];
				s.cr = roots[s.usedRoots++];
				s.subLength = 0;
				s.isCompound = compoundUsed;
				s.caseMatched = s.caseMatched && s.usedRoots <= 1;
			} else break;
		} else {
			node = c;
			caseMatched = s.caseMatched;
			break;
		}
	}
	function extractWord() {
		if (!word || i < word.length) return false;
		const letters = [];
		let subLen = 0;
		for (let j = 0; j < i; ++j) {
			const { subLength } = stack[j];
			if (subLength < subLen) letters.push(compoundSeparator);
			letters.push(word[j]);
			subLen = subLength;
		}
		return letters.join("");
	}
	return {
		found: extractWord(),
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function isForbiddenWord$1(root, word, forbiddenPrefix) {
	const r = root;
	if (r?.isForbidden) return r.isForbidden(word);
	return findWordExact$1(root?.get(forbiddenPrefix), word);
}
const createFindOptions$1 = memorizeLastCall(_createFindOptions$1);
function _createFindOptions$1(options) {
	if (!options) return _defaultFindOptions$1;
	const d = _defaultFindOptions$1;
	return {
		matchCase: options.matchCase ?? d.matchCase,
		compoundMode: options.compoundMode ?? d.compoundMode,
		legacyMinCompoundLength: options.legacyMinCompoundLength ?? d.legacyMinCompoundLength,
		checkForbidden: options.checkForbidden ?? d.checkForbidden,
		compoundSeparator: options.compoundSeparator ?? d.compoundSeparator
	};
}
//#endregion
//#region src/lib/walker/walkerTypes.ts
const JOIN_SEPARATOR = "+";
const WORD_SEPARATOR = " ";
const CompoundWordsMethod = {
	NONE: 0,
	SEPARATE_WORDS: 1,
	JOIN_WORDS: 2,
	0: "NONE",
	1: "SEPARATE_WORDS",
	2: "JOIN_WORDS"
};
//#endregion
//#region src/lib/ITrieNode/walker/walker.ts
/**
* Walks the Trie and yields a value at each node.
* next(goDeeper: boolean):
*/
function* compoundWalker$1(root, compoundingMethod) {
	const empty = Object.freeze([]);
	const roots = {
		[CompoundWordsMethod.NONE]: empty,
		[CompoundWordsMethod.JOIN_WORDS]: [["+", root]],
		[CompoundWordsMethod.SEPARATE_WORDS]: [[" ", root]]
	};
	const rc = roots[compoundingMethod].length ? roots[compoundingMethod] : void 0;
	function children(n) {
		if (n.hasChildren()) {
			const entries = n.entries();
			const c = Array.isArray(entries) ? entries : [...entries];
			return n.eow && rc ? [...c, ...rc] : c;
		}
		if (n.eow) return roots[compoundingMethod];
		return empty;
	}
	let depth = 0;
	const stack = [];
	stack[depth] = {
		t: "",
		c: children(root),
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length) {
			const [char, node] = s.c[s.ci++];
			const text = baseText + char;
			if ((yield {
				text,
				node,
				depth
			}) ?? true) {
				depth++;
				baseText = text;
				stack[depth] = {
					t: text,
					c: children(node),
					ci: 0
				};
			}
			s = stack[depth];
		}
		depth -= 1;
	}
}
/**
* Walks the Trie and yields a value at each node.
* next(goDeeper: boolean):
*/
function* nodeWalker$1(root) {
	let depth = 0;
	const stack = [];
	const entries = root.entries();
	stack[depth] = {
		t: "",
		n: root,
		c: Array.isArray(entries) ? entries : [...entries],
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length && s.n) {
			const idx = s.ci++;
			const [char, node] = s.c[idx];
			const text = baseText + char;
			if ((yield {
				text,
				node,
				depth
			}) !== false) {
				depth++;
				baseText = text;
				const s = stack[depth];
				const entries = node.entries();
				const c = Array.isArray(entries) ? entries : [...entries];
				if (s) {
					s.t = text;
					s.n = node;
					s.c = c;
					s.ci = 0;
				} else stack[depth] = {
					t: text,
					n: node,
					c,
					ci: 0
				};
			}
			s = stack[depth];
		}
		depth -= 1;
	}
}
function walker$1(root, compoundingMethod = CompoundWordsMethod.NONE) {
	return compoundingMethod === CompoundWordsMethod.NONE ? nodeWalker$1(root) : compoundWalker$1(root, compoundingMethod);
}
function walkerWords$1(root) {
	return walkerWordsITrie(root);
}
/**
* Walks the Trie and yields each word.
*/
function* walkerWordsITrie(root) {
	let depth = 0;
	const stack = [];
	const entries = root.entries();
	stack[depth] = {
		t: "",
		n: root,
		c: Array.isArray(entries) ? entries : [...entries],
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length && s.n) {
			const [char, node] = s.c[s.ci++];
			if (!node) continue;
			const text = baseText + char;
			if (node.eow) yield text;
			depth++;
			baseText = text;
			const entries = node.entries();
			const c = Array.isArray(entries) ? entries : [...entries];
			if (stack[depth]) {
				s = stack[depth];
				s.t = text;
				s.n = node;
				s.c = c;
				s.ci = 0;
			} else stack[depth] = {
				t: text,
				n: node,
				c,
				ci: 0
			};
			s = stack[depth];
		}
		depth -= 1;
	}
}
//#endregion
//#region src/lib/ITrieNode/trie-util.ts
/**
* Generate a Iterator that can walk a Trie and yield the words.
*/
function iteratorTrieWords$1(node) {
	return walkerWords$1(node);
}
function findNode$1(node, word) {
	for (let i = 0; i < word.length; ++i) {
		const n = node.get(word[i]);
		if (!n) return void 0;
		node = n;
	}
	return node;
}
function countWords$1(root) {
	const visited = /* @__PURE__ */ new Map();
	function walk(n) {
		const nestedCount = visited.get(n.id);
		if (nestedCount !== void 0) return nestedCount;
		let cnt = n.eow ? 1 : 0;
		visited.set(n, cnt);
		for (const c of n.values()) cnt += walk(c);
		visited.set(n, cnt);
		return cnt;
	}
	return walk(root);
}
//#endregion
//#region src/lib/utils/debugger.ts
let debuggerIsAttached = false;
function isDebuggerAttached() {
	return debuggerIsAttached;
}
//#endregion
//#region src/lib/utils/isDefined.ts
function isDefined(t) {
	return t !== void 0;
}
//#endregion
//#region src/lib/walker/hintedWalker.ts
function hintedWalker(root, ignoreCase, hint, compoundingMethod, emitWordSeparator) {
	return hintedWalkerNext(root, ignoreCase, hint, compoundingMethod, emitWordSeparator);
}
/**
* Walks the Trie and yields a value at each node.
* next(goDeeper: boolean):
*/
function* hintedWalkerNext(root, ignoreCase, hint, compoundingMethod, emitWordSeparator = "") {
	const _compoundingMethod = compoundingMethod ?? CompoundWordsMethod.NONE;
	const compoundCharacter = root.compoundCharacter;
	const noCaseCharacter = root.stripCaseAndAccentsPrefix;
	const rawRoots = [root, ignoreCase ? root.c[noCaseCharacter] : void 0].filter(isDefined);
	const specialRootsPrefix = existMap([
		compoundCharacter,
		noCaseCharacter,
		root.forbiddenWordPrefix
	]);
	function filterRoot(root) {
		const c = (root.c && Object.entries(root.c))?.filter(([v]) => !(v in specialRootsPrefix));
		return { c: c && Object.fromEntries(c) };
	}
	const roots = rawRoots.map(filterRoot);
	const compoundRoots = rawRoots.map((r) => r.c?.[compoundCharacter]).filter(isDefined);
	const setOfCompoundRoots = new Set(compoundRoots);
	const rootsForCompoundMethods = [...roots, ...compoundRoots];
	const compoundMethodRoots = {
		[CompoundWordsMethod.NONE]: [],
		[CompoundWordsMethod.JOIN_WORDS]: rootsForCompoundMethods.map((r) => ["+", r]),
		[CompoundWordsMethod.SEPARATE_WORDS]: rootsForCompoundMethods.map((r) => [" ", r])
	};
	function* children(n, hintOffset) {
		if (n.c) {
			const h = hint.slice(hintOffset, hintOffset + 3) + hint.slice(Math.max(0, hintOffset - 2), hintOffset);
			const hints = new Set(h);
			const c = n.c;
			yield* [...hints].filter((a) => a in c).map((letter) => ({
				letter,
				node: c[letter],
				hintOffset: hintOffset + 1
			}));
			hints.add(compoundCharacter);
			yield* Object.entries(c).filter((a) => !hints.has(a[0])).map(([letter, node]) => ({
				letter,
				node,
				hintOffset: hintOffset + 1
			}));
			if (compoundCharacter in c && !setOfCompoundRoots.has(n)) for (const compoundRoot of compoundRoots) for (const child of children(compoundRoot, hintOffset)) {
				const { letter, node, hintOffset } = child;
				yield {
					letter: emitWordSeparator + letter,
					node,
					hintOffset
				};
			}
		}
		if (n.f) yield* [...compoundMethodRoots[_compoundingMethod]].map(([letter, node]) => ({
			letter,
			node,
			hintOffset
		}));
	}
	for (const root of roots) {
		let depth = 0;
		const stack = [];
		const stackText = [""];
		stack[depth] = children(root, depth);
		let ir;
		while (depth >= 0) {
			while (!(ir = stack[depth].next()).done) {
				const { letter: char, node, hintOffset } = ir.value;
				const text = stackText[depth] + char;
				const hinting = yield {
					text,
					node,
					depth
				};
				if (hinting && hinting.goDeeper) {
					depth++;
					stackText[depth] = text;
					stack[depth] = children(node, hintOffset);
				}
			}
			depth -= 1;
		}
	}
}
function existMap(values) {
	const m = Object.create(null);
	for (const v of values) m[v] = true;
	return m;
}
//#endregion
//#region src/lib/TrieNode/trie.ts
function trieRootToITrieRoot(root) {
	return ImplITrieRoot.toITrieNode(root);
}
const EmptyKeys = Object.freeze([]);
const EmptyValues = Object.freeze([]);
const EmptyEntries = Object.freeze([]);
var ImplITrieNode = class ImplITrieNode {
	id;
	_keys;
	node;
	constructor(node) {
		this.node = node;
		this.id = node;
	}
	/** flag End of Word */
	get eow() {
		return !!this.node.f;
	}
	/** number of children */
	get size() {
		if (!this.node.c) return 0;
		return this.keys().length;
	}
	/** get keys to children */
	keys() {
		if (this._keys) return this._keys;
		const keys = this.node.c ? Object.keys(this.node.c) : EmptyKeys;
		this._keys = keys;
		return keys;
	}
	/** get the child nodes */
	values() {
		return !this.node.c ? EmptyValues : Object.values(this.node.c).map((n) => ImplITrieNode.toITrieNode(n));
	}
	entries() {
		return !this.node.c ? EmptyEntries : Object.entries(this.node.c).map(([k, n]) => [k, ImplITrieNode.toITrieNode(n)]);
	}
	/** get child ITrieNode */
	get(char) {
		const n = this.node.c?.[char];
		if (!n) return void 0;
		return ImplITrieNode.toITrieNode(n);
	}
	getNode(chars) {
		return this.findNode(chars);
	}
	has(char) {
		const c = this.node.c;
		return c && char in c || false;
	}
	child(keyIdx) {
		const char = this.keys()[keyIdx];
		const n = char && this.get(char);
		if (!n) throw new Error("Index out of range.");
		return n;
	}
	hasChildren() {
		return !!this.node.c;
	}
	#findTrieNode(word) {
		let node = this.node;
		for (const char of word) {
			if (!node) return void 0;
			node = node.c?.[char];
		}
		return node;
	}
	findNode(word) {
		const node = this.#findTrieNode(word);
		return node && ImplITrieNode.toITrieNode(node);
	}
	findExact(word) {
		const node = this.#findTrieNode(word);
		return !!node && !!node.f;
	}
	static toITrieNode(node) {
		return new this(node);
	}
};
var ImplITrieRoot = class extends ImplITrieNode {
	info;
	hasForbiddenWords;
	hasCompoundWords;
	hasNonStrictWords;
	root;
	constructor(root) {
		super(root);
		this.root = root;
		const { stripCaseAndAccentsPrefix, compoundCharacter, forbiddenWordPrefix, suggestionPrefix } = root;
		this.info = {
			stripCaseAndAccentsPrefix,
			compoundCharacter,
			forbiddenWordPrefix,
			suggestionPrefix
		};
		this.hasForbiddenWords = !!root.c[forbiddenWordPrefix];
		this.hasCompoundWords = !!root.c[compoundCharacter];
		this.hasNonStrictWords = !!root.c[stripCaseAndAccentsPrefix];
	}
	get eow() {
		return false;
	}
	resolveId(id) {
		return new ImplITrieNode(id);
	}
	get forbidPrefix() {
		return this.root.forbiddenWordPrefix;
	}
	get compoundFix() {
		return this.root.compoundCharacter;
	}
	get caseInsensitivePrefix() {
		return this.root.stripCaseAndAccentsPrefix;
	}
	get suggestionPrefix() {
		return this.root.suggestionPrefix;
	}
	static toITrieNode(node) {
		return new this(node);
	}
};
//#endregion
//#region src/lib/walker/walker.ts
/**
* Walks the Trie and yields a value at each node.
* next(goDeeper: boolean):
*/
function* compoundWalker(root, compoundingMethod) {
	const roots = {
		[CompoundWordsMethod.NONE]: [],
		[CompoundWordsMethod.JOIN_WORDS]: [["+", root]],
		[CompoundWordsMethod.SEPARATE_WORDS]: [[" ", root]]
	};
	const rc = roots[compoundingMethod].length ? roots[compoundingMethod] : void 0;
	const empty = [];
	function children(n) {
		if (n.c && n.f && rc) return [...Object.entries(n.c), ...rc];
		if (n.c) return Object.entries(n.c);
		if (n.f && rc) return rc;
		return empty;
	}
	let depth = 0;
	const stack = [];
	stack[depth] = {
		t: "",
		c: children(root),
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length) {
			const [char, node] = s.c[s.ci++];
			const text = baseText + char;
			if ((yield {
				text,
				node,
				depth
			}) ?? true) {
				depth++;
				baseText = text;
				stack[depth] = {
					t: text,
					c: children(node),
					ci: 0
				};
			}
			s = stack[depth];
		}
		depth -= 1;
	}
}
/**
* Walks the Trie and yields a value at each node.
* next(goDeeper: boolean):
*/
function* nodeWalker(root) {
	const empty = [];
	function children(n) {
		if (n.c) return Object.keys(n.c);
		return empty;
	}
	let depth = 0;
	const stack = [];
	stack[depth] = {
		t: "",
		n: root.c,
		c: children(root),
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length && s.n) {
			const char = s.c[s.ci++];
			const node = s.n[char];
			const text = baseText + char;
			if ((yield {
				text,
				node,
				depth
			}) !== false) {
				depth++;
				baseText = text;
				const s = stack[depth];
				const c = children(node);
				if (s) {
					s.t = text;
					s.n = node.c;
					s.c = c;
					s.ci = 0;
				} else stack[depth] = {
					t: text,
					n: node.c,
					c,
					ci: 0
				};
			}
			s = stack[depth];
		}
		depth -= 1;
	}
}
const walkerWords = _walkerWords;
/**
* Walks the Trie and yields each word.
*/
function* _walkerWords(root) {
	const empty = [];
	function children(n) {
		if (n.c) return Object.keys(n.c);
		return empty;
	}
	let depth = 0;
	const stack = [];
	stack[depth] = {
		t: "",
		n: root.c,
		c: children(root),
		ci: 0
	};
	while (depth >= 0) {
		let s = stack[depth];
		let baseText = s.t;
		while (s.ci < s.c.length && s.n) {
			const char = s.c[s.ci++];
			const node = s.n[char];
			const text = baseText + char;
			if (node.f) yield text;
			depth++;
			baseText = text;
			const c = children(node);
			if (stack[depth]) {
				s = stack[depth];
				s.t = text;
				s.n = node.c;
				s.c = c;
				s.ci = 0;
			} else stack[depth] = {
				t: text,
				n: node.c,
				c,
				ci: 0
			};
			s = stack[depth];
		}
		depth -= 1;
	}
}
function walker(root, compoundingMethod = CompoundWordsMethod.NONE) {
	return compoundingMethod === CompoundWordsMethod.NONE ? nodeWalker(root) : compoundWalker(root, compoundingMethod);
}
const defaultSuggestionOptions = {
	compoundMethod: CompoundWordsMethod.NONE,
	ignoreCase: true,
	changeLimit: 5,
	numSuggestions: 8,
	includeTies: true,
	get timeout() {
		return isDebuggerAttached() ? 1e6 : 1e3;
	}
};
const keyMapOfSuggestionOptionsStrict = {
	changeLimit: "changeLimit",
	compoundMethod: "compoundMethod",
	ignoreCase: "ignoreCase",
	compoundSeparator: "compoundSeparator",
	filter: "filter",
	includeTies: "includeTies",
	numSuggestions: "numSuggestions",
	timeout: "timeout",
	weightMap: "weightMap"
};
/**
* Create suggestion options using composition.
* @param opts - partial options.
* @returns Options - with defaults.
*/
function createSuggestionOptions(...opts) {
	const options = { ...defaultSuggestionOptions };
	const keys = Object.keys(keyMapOfSuggestionOptionsStrict);
	for (const opt of opts) for (const key of keys) assign(options, opt, key);
	return options;
}
function assign(dest, src, k) {
	dest[k] = src[k] ?? dest[k];
}
//#endregion
//#region src/lib/utils/PairingHeap.ts
var PairingHeap = class {
	_heap;
	_size = 0;
	compare;
	constructor(compare) {
		this.compare = compare;
	}
	/** Add an item to the heap. */
	add(v) {
		this._heap = insert$1(this.compare, this._heap, v);
		++this._size;
		return this;
	}
	/** take an item from the heap. */
	dequeue() {
		const n = this.next();
		if (n.done) return void 0;
		return n.value;
	}
	/** Add items to the heap */
	append(i) {
		for (const v of i) this.add(v);
		return this;
	}
	/** get the next value */
	next() {
		if (!this._heap) return {
			value: void 0,
			done: true
		};
		const value = this._heap.v;
		--this._size;
		this._heap = removeHead(this.compare, this._heap);
		return { value };
	}
	/** peek at the next value without removing it. */
	peek() {
		return this._heap?.v;
	}
	[Symbol.iterator]() {
		return this;
	}
	/** alias of `size` */
	get length() {
		return this._size;
	}
	/** number of entries in the heap. */
	get size() {
		return this._size;
	}
};
function removeHead(compare, heap) {
	if (!heap || !heap.c) return void 0;
	return mergeSiblings(compare, heap.c);
}
function insert$1(compare, heap, v) {
	const n = {
		v,
		s: void 0,
		c: void 0
	};
	if (!heap || compare(v, heap.v) <= 0) {
		n.c = heap;
		return n;
	}
	n.s = heap.c;
	heap.c = n;
	return heap;
}
function merge(compare, a, b) {
	if (compare(a.v, b.v) <= 0) {
		a.s = void 0;
		b.s = a.c;
		a.c = b;
		return a;
	}
	b.s = void 0;
	a.s = b.c;
	b.c = a;
	return b;
}
function mergeSiblings(compare, n) {
	if (!n.s) return n;
	const s = n.s;
	const ss = s.s;
	const m = merge(compare, n, s);
	return ss ? merge(compare, m, mergeSiblings(compare, ss)) : m;
}
//#endregion
//#region src/lib/suggestions/constants.ts
const opCosts = {
	baseCost: 100,
	swapCost: 75,
	duplicateLetterCost: 80,
	compound: 1,
	visuallySimilar: 1,
	firstLetterBias: 5,
	wordBreak: 99,
	wordLengthCostFactor: .5
};
new Intl.Collator("en", { sensitivity: "base" }).compare;
/**
* This a set of letters that look like each other.
* There can be a maximum of 30 groups.
* It is possible for a letter to appear in more than 1 group, but not encouraged.
*/
const visualLetterGroups = [
	forms("ǎàåÄÀAãâáǟặắấĀāăąaäæɐɑαаᾳ") + "ᾳ",
	forms("Bbḃвъь"),
	forms("ċČčcĉçCÇćĊСсς"),
	forms("ḎḋḏḑďđḍDd"),
	forms("ēëÈÊËềéèếệĕeEĒėęěêəɛёЁеʒ"),
	forms("fḟFﬀ"),
	forms("ġĠĞǧĝģGgɣ"),
	forms("ħĦĥḥHhḤȟн"),
	forms("IįïİÎÍīiÌìíîıɪɨїΊΙ"),
	forms("jJĵ"),
	forms("ķKkκкќ"),
	forms("ḷłľļLlĺḶίι"),
	forms("Mṃṁm"),
	forms("nņÑNṇňŇñńŋѝий"),
	forms("ÒOøȭŌōőỏoÖòȱȯóôõöơɔόδо"),
	forms("PṗpрРρ"),
	forms("Qq"),
	forms("řRṛrŕŗѓгя"),
	forms("ṣšȘṢsSŠṡŞŝśșʃΣ"),
	forms("tțȚťTṭṬṫ"),
	forms("ÜüûŪưůūűúÛŭÙùuųU"),
	forms("Vvν"),
	forms("ŵwWẃẅẁωш"),
	forms("xXх"),
	forms("ÿýYŷyÝỳУўу"),
	forms("ZẓžŽżŻźz")
];
function forms(letters) {
	const n = letters.normalize("NFC").replaceAll(/\p{M}/gu, "");
	const na = n.normalize("NFD").replaceAll(/\p{M}/gu, "");
	return [...new Set(n + n.toLowerCase() + n.toUpperCase() + na + na.toLowerCase() + na.toUpperCase())].join("");
}
/**
* This is a map of letters to groups mask values.
* If two letters are part of the same group then `visualLetterMaskMap[a] & visualLetterMaskMap[b] !== 0`
*/
const visualLetterMaskMap = calcVisualLetterMasks(visualLetterGroups);
/**
*
* @param groups
* @returns
*/
function calcVisualLetterMasks(groups) {
	const map = Object.create(null);
	for (let i = 0; i < groups.length; ++i) {
		const m = 1 << i;
		const g = groups[i];
		for (const c of g) map[c] = (map[c] || 0) | m;
	}
	return map;
}
//#endregion
//#region src/lib/utils/assert.ts
function assert(condition, message = "Assert Failed") {
	if (condition) return;
	throw new Error(message);
}
//#endregion
//#region src/lib/distance/weightedMaps.ts
const matchPossibleWordSeparators = /[+∙•・●]/g;
function createWeightMap(...defs) {
	const map = _createWeightMap();
	addDefsToWeightMap(map, defs);
	return map;
}
function addDefToWeightMap(map, ...defs) {
	return addDefsToWeightMap(map, defs);
}
function addAdjustment(map, ...adjustments) {
	for (const adj of adjustments) map.adjustments.set(adj.id, adj);
	return map;
}
function addDefsToWeightMap(map, defs) {
	function addSet(set, def) {
		addSetToTrieCost(map.insDel, set, def.insDel, def.penalty);
		addSetToTrieTrieCost(map.replace, set, def.replace, def.penalty);
		addSetToTrieTrieCost(map.swap, set, def.swap, def.penalty);
	}
	for (const _def of defs) {
		const def = normalizeDef(_def);
		splitMap$1(def).forEach((s) => addSet(s, def));
	}
	return map;
}
function _createWeightMap() {
	return {
		insDel: {},
		replace: {},
		swap: {},
		adjustments: /* @__PURE__ */ new Map()
	};
}
function lowest(a, b) {
	if (a === void 0) return b;
	if (b === void 0) return a;
	return a <= b ? a : b;
}
function highest(a, b) {
	if (a === void 0) return b;
	if (b === void 0) return a;
	return a >= b ? a : b;
}
function normalize(s) {
	const f = new Set([s]);
	f.add(s.normalize("NFC"));
	f.add(s.normalize("NFD"));
	return f;
}
function* splitMapSubstringsIterable(map) {
	let seq = "";
	let mode = 0;
	for (const char of map) {
		if (mode && char === ")") {
			yield* normalize(seq);
			mode = 0;
			continue;
		}
		if (mode) {
			seq += char;
			continue;
		}
		if (char === "(") {
			mode = 1;
			seq = "";
			continue;
		}
		yield* normalize(char);
	}
}
function splitMapSubstrings(map) {
	return [...splitMapSubstringsIterable(map)];
}
/**
* Splits a WeightedMapDef.map
* @param map
*/
function splitMap$1(def) {
	const { map } = def;
	return map.split("|").map(splitMapSubstrings).filter((s) => s.length > 0);
}
function addToTrieCost(trie, str, cost, penalties) {
	if (!str) return;
	let t = trie;
	for (const c of str) {
		const n = t.n = t.n || Object.create(null);
		t = n[c] = n[c] || Object.create(null);
	}
	t.c = lowest(t.c, cost);
	t.p = highest(t.p, penalties);
}
function addToTrieTrieCost(trie, left, right, cost, penalties) {
	let t = trie;
	for (const c of left) {
		const n = t.n = t.n || Object.create(null);
		t = n[c] = n[c] || Object.create(null);
	}
	addToTrieCost(t.t = t.t || Object.create(null), right, cost, penalties);
}
function addSetToTrieCost(trie, set, cost, penalties) {
	if (cost === void 0) return;
	for (const str of set) addToTrieCost(trie, str, cost, penalties);
}
function addSetToTrieTrieCost(trie, set, cost, penalties) {
	if (cost === void 0) return;
	for (const left of set) for (const right of set) {
		if (left === right) continue;
		addToTrieTrieCost(trie, left, right, cost, penalties);
	}
}
function* searchTrieNodes(trie, str, i) {
	const len = str.length;
	for (let n = trie.n; i < len && n;) {
		const t = n[str[i]];
		if (!t) return;
		++i;
		yield {
			i,
			t
		};
		n = t.n;
	}
}
function* findTrieCostPrefixes(trie, str, i) {
	for (const n of searchTrieNodes(trie, str, i)) {
		const { c, p } = n.t;
		if (c !== void 0) yield {
			i: n.i,
			c,
			p: p || 0
		};
	}
}
function* findTrieTrieCostPrefixes(trie, str, i) {
	for (const n of searchTrieNodes(trie, str, i)) {
		const t = n.t.t;
		if (t !== void 0) yield {
			i: n.i,
			t
		};
	}
}
function createWeightCostCalculator(weightMap) {
	return new _WeightCostCalculator(weightMap);
}
var _WeightCostCalculator = class {
	weightMap;
	constructor(weightMap) {
		this.weightMap = weightMap;
	}
	*calcInsDelCosts(pos) {
		const { a, ai, b, bi, c, p } = pos;
		for (const del of findTrieCostPrefixes(this.weightMap.insDel, a, ai)) yield {
			a,
			b,
			ai: del.i,
			bi,
			c: c + del.c,
			p: p + del.p
		};
		for (const ins of findTrieCostPrefixes(this.weightMap.insDel, b, bi)) yield {
			a,
			b,
			ai,
			bi: ins.i,
			c: c + ins.c,
			p: p + ins.p
		};
	}
	*calcReplaceCosts(pos) {
		const { a, ai, b, bi, c, p } = pos;
		for (const del of findTrieTrieCostPrefixes(this.weightMap.replace, a, ai)) for (const ins of findTrieCostPrefixes(del.t, b, bi)) yield {
			a,
			b,
			ai: del.i,
			bi: ins.i,
			c: c + ins.c,
			p: p + ins.p
		};
	}
	*calcSwapCosts(pos) {
		const { a, ai, b, bi, c, p } = pos;
		const swap = this.weightMap.swap;
		for (const left of findTrieTrieCostPrefixes(swap, a, ai)) for (const right of findTrieCostPrefixes(left.t, a, left.i)) {
			const sw = a.slice(left.i, right.i) + a.slice(ai, left.i);
			if (b.slice(bi).startsWith(sw)) {
				const len = sw.length;
				yield {
					a,
					b,
					ai: ai + len,
					bi: bi + len,
					c: c + right.c,
					p: p + right.p
				};
			}
		}
	}
	calcAdjustment(word) {
		let penalty = 0;
		for (const adj of this.weightMap.adjustments.values()) if (adj.regexp.global) for (const _m of word.matchAll(adj.regexp)) penalty += adj.penalty;
		else if (adj.regexp.test(word)) penalty += adj.penalty;
		return penalty;
	}
};
function normalizeDef(def) {
	const { map, ...rest } = def;
	return {
		...rest,
		map: normalizeMap(map)
	};
}
function normalizeMap(map) {
	return map.replaceAll(matchPossibleWordSeparators, "∙");
}
//#endregion
//#region src/lib/distance/distanceAStarWeighted.ts
/**
* Calculate the edit distance between two words using an A* algorithm.
*
* Using basic weights, this algorithm has the same results as the Damerau-Levenshtein algorithm.
*/
function distanceAStarWeighted(wordA, wordB, map, cost = 100) {
	const calc = createWeightCostCalculator(map);
	const best = _distanceAStarWeightedEx(wordA, wordB, calc, cost);
	const penalty = calc.calcAdjustment(wordB);
	return best.c + best.p + penalty;
}
function _distanceAStarWeightedEx(wordA, wordB, map, cost = 100) {
	const a = "^" + wordA + "$";
	const b = "^" + wordB + "$";
	const aN = a.length;
	const bN = b.length;
	const candidates = new CandidatePool(aN, bN);
	candidates.add({
		ai: 0,
		bi: 0,
		c: 0,
		p: 0,
		f: void 0
	});
	/** Substitute / Replace */
	function opSub(n) {
		const { ai, bi, c, p } = n;
		if (ai < aN && bi < bN) {
			const cc = a[ai] === b[bi] ? c : c + cost;
			candidates.add({
				ai: ai + 1,
				bi: bi + 1,
				c: cc,
				p,
				f: n
			});
		}
	}
	/** Insert */
	function opIns(n) {
		const { ai, bi, c, p } = n;
		if (bi < bN) candidates.add({
			ai,
			bi: bi + 1,
			c: c + cost,
			p,
			f: n
		});
	}
	/** Delete */
	function opDel(n) {
		const { ai, bi, c, p } = n;
		if (ai < aN) candidates.add({
			ai: ai + 1,
			bi,
			c: c + cost,
			p,
			f: n
		});
	}
	/** Swap adjacent letters */
	function opSwap(n) {
		const { ai, bi, c, p } = n;
		if (a[ai] === b[bi + 1] && a[ai + 1] === b[bi]) candidates.add({
			ai: ai + 2,
			bi: bi + 2,
			c: c + cost,
			p,
			f: n
		});
	}
	function opMap(n) {
		const { ai, bi, c, p } = n;
		const pos = {
			a,
			b,
			ai,
			bi,
			c,
			p
		};
		[
			map.calcInsDelCosts(pos),
			map.calcSwapCosts(pos),
			map.calcReplaceCosts(pos)
		].forEach((iter) => {
			for (const nn of iter) candidates.add({
				...nn,
				f: n
			});
		});
	}
	let best;
	while (best = candidates.next()) {
		if (best.ai === aN && best.bi === bN) break;
		opSwap(best);
		opIns(best);
		opDel(best);
		opMap(best);
		opSub(best);
	}
	assert(best);
	return best;
}
var CandidatePool = class {
	pool = new PairingHeap(compare$1);
	grid = [];
	aN;
	bN;
	constructor(aN, bN) {
		this.aN = aN;
		this.bN = bN;
	}
	next() {
		let n;
		while (n = this.pool.dequeue()) if (!n.d) return n;
	}
	add(n) {
		const i = idx(n.ai, n.bi, this.bN);
		const g = this.grid[i];
		if (!g) {
			this.grid[i] = n;
			this.pool.add(n);
			return;
		}
		if (g.c <= n.c) return;
		g.d = true;
		this.grid[i] = n;
		this.pool.add(n);
	}
};
function idx(r, c, cols) {
	return r * cols + c;
}
function compare$1(a, b) {
	return a.c - b.c || b.ai + b.bi - a.ai - a.bi;
}
//#endregion
//#region src/lib/distance/levenshtein.ts
const initialRow = [...".".repeat(50)].map((_, i) => i);
Object.freeze(initialRow);
/**
* Damerau–Levenshtein distance
* [Damerau–Levenshtein distance - Wikipedia](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance)
* @param a - first word
* @param b - second word
* @returns Distance value
*/
function levenshteinDistance(a, b) {
	const aa = "  " + a;
	const bb = "  " + b;
	const nA = a.length + 1;
	const nB = b.length + 1;
	const firstRow = initialRow.slice(0, nA + 1);
	for (let i = firstRow.length; i <= nA; ++i) firstRow[i] = i;
	const matrix = [
		firstRow,
		[1, ...firstRow],
		[
			2,
			1,
			...firstRow
		]
	];
	let ppRow = matrix[0];
	let pRow = matrix[1];
	for (let j = 2; j <= nB; ++j) {
		const row = matrix[j % 3];
		row[0] = pRow[0] + 1;
		row[1] = pRow[1] + 1;
		const bp = bb[j - 1];
		const bc = bb[j];
		let ap = aa[0];
		for (let i = 2, i1 = 1; i <= nA; i1 = i, ++i) {
			const ac = aa[i];
			const c = pRow[i1] + (ac === bc ? 0 : 1);
			const ct = ac === bp && ap === bc ? ppRow[i1 - 1] + 1 : c;
			row[i] = Math.min(c, ct, pRow[i] + 1, row[i1] + 1);
			ap = ac;
		}
		ppRow = pRow;
		pRow = row;
	}
	return pRow[nA];
}
//#endregion
//#region src/lib/distance/distance.ts
const defaultCost = 100;
/**
* Calculate the edit distance between any two words.
* Use the Damerau–Levenshtein distance algorithm.
* @param wordA
* @param wordB
* @param editCost - the cost of each edit (defaults to 100)
* @returns the edit distance.
*/
function editDistance(wordA, wordB, editCost = defaultCost) {
	return levenshteinDistance(wordA, wordB) * editCost;
}
/**
* Calculate the weighted edit distance between any two words.
* @param wordA
* @param wordB
* @param weights - the weights to use
* @param editCost - the cost of each edit (defaults to 100)
* @returns the edit distance
*/
function editDistanceWeighted(wordA, wordB, weights, editCost = defaultCost) {
	return distanceAStarWeighted(wordA, wordB, weights, editCost);
}
/**
* Collect Map definitions into a single weighted map.
* @param defs - list of definitions
* @returns A Weighted Map to be used with distance calculations.
*/
function createWeightedMap(defs) {
	return createWeightMap(...defs);
}
//#endregion
//#region src/lib/utils/timer.ts
function startTimer() {
	const start = performance.now();
	return () => performance.now() - start;
}
//#endregion
//#region src/lib/utils/util.ts
function isDefined$1(a) {
	return a !== void 0;
}
/**
* Remove any fields with an `undefined` value.
* @param t - object to clean
* @returns t
*/
function cleanCopy(t) {
	return clean$1({ ...t });
}
/**
* Remove any fields with an `undefined` value.
* **MODIFIES THE OBJECT**
* @param t - object to clean
* @returns t
*/
function clean$1(t) {
	for (const prop in t) if (t[prop] === void 0) delete t[prop];
	return t;
}
function unique(a) {
	return [...new Set(a)];
}
/**
*
* @param text verbatim text to be inserted into a regexp
* @returns text that can be used in a regexp.
*/
function regexQuote(text) {
	return text.replaceAll(/([[\]\-+(){},|*.\\])/g, "\\$1");
}
/**
* Factory to create a function that will replace all occurrences of `match` with `withText`
* @param match - string to match
* @param replaceWithText - the text to substitute.
*/
function replaceAllFactory(match, replaceWithText) {
	const r = RegExp(regexQuote(match), "g");
	return (text) => text.replace(r, replaceWithText);
}
//#endregion
//#region src/lib/suggestions/suggestCollector.ts
const defaultMaxNumberSuggestions = 10;
const BASE_COST = 100;
const MAX_NUM_CHANGES = 5;
const MAX_ALLOWED_COST_SCALE = 1.03 * .5;
const collator = new Intl.Collator();
const regexSeparator = new RegExp(`[${regexQuote(" ")}]`, "g");
const wordLengthCost = [
	0,
	50,
	25,
	5,
	0
];
const EXTRA_WORD_COST = 5;
/** time in ms */
const DEFAULT_COLLECTOR_TIMEOUT = 1e3;
const symStopProcessing = Symbol("Collector Stop Processing");
function compSuggestionResults(a, b) {
	return (a.isPreferred && -1 || 0) - (b.isPreferred && -1 || 0) || a.cost - b.cost || a.word.length - b.word.length || collator.compare(a.word, b.word);
}
const defaultSuggestionCollectorOptions = Object.freeze({
	numSuggestions: defaultMaxNumberSuggestions,
	filter: () => true,
	changeLimit: MAX_NUM_CHANGES,
	includeTies: false,
	ignoreCase: true,
	timeout: DEFAULT_COLLECTOR_TIMEOUT,
	weightMap: void 0,
	compoundSeparator: "",
	compoundMethod: void 0
});
function suggestionCollector(wordToMatch, options) {
	const { filter = () => true, changeLimit = MAX_NUM_CHANGES, includeTies = false, ignoreCase = true, timeout = DEFAULT_COLLECTOR_TIMEOUT, weightMap, compoundSeparator = defaultSuggestionCollectorOptions.compoundSeparator } = options;
	const numSuggestions = Math.max(options.numSuggestions, 0) || 0;
	const numSugToHold = weightMap ? numSuggestions * 2 : numSuggestions;
	const sugs = /* @__PURE__ */ new Map();
	let maxCost = BASE_COST * Math.min(wordToMatch.length * MAX_ALLOWED_COST_SCALE, changeLimit);
	const useSeparator = compoundSeparator || (weightMap ? "∙" : defaultSuggestionCollectorOptions.compoundSeparator);
	const fnCleanWord = !useSeparator || useSeparator === compoundSeparator ? (w) => w : replaceAllFactory(useSeparator, "");
	if (useSeparator && weightMap) addDefToWeightMap(weightMap, {
		map: useSeparator,
		insDel: 50
	});
	const genSuggestionOptions = clean$1({
		changeLimit,
		ignoreCase,
		compoundMethod: options.compoundMethod,
		compoundSeparator: useSeparator
	});
	let timeRemaining = timeout;
	function dropMax() {
		if (sugs.size < 2 || !numSuggestions) {
			sugs.clear();
			return;
		}
		const sorted = [...sugs.values()].sort(compSuggestionResults);
		let i = numSugToHold - 1;
		maxCost = sorted[i].cost;
		for (; i < sorted.length && sorted[i].cost <= maxCost; ++i);
		for (; i < sorted.length; ++i) sugs.delete(sorted[i].word);
	}
	function adjustCost(sug) {
		if (sug.isPreferred) return sug;
		const words = sug.word.split(regexSeparator);
		const extraCost = words.map((w) => wordLengthCost[w.length] || 0).reduce((a, b) => a + b, 0) + (words.length - 1) * EXTRA_WORD_COST;
		return {
			word: sug.word,
			cost: sug.cost + extraCost
		};
	}
	function collectSuggestion(suggestion) {
		const { word, cost, isPreferred } = adjustCost(suggestion);
		if (cost <= maxCost && filter(suggestion.word, cost)) {
			const known = sugs.get(word);
			if (known) {
				known.cost = Math.min(known.cost, cost);
				known.isPreferred = known.isPreferred || isPreferred;
			} else {
				sugs.set(word, {
					word,
					cost,
					isPreferred
				});
				if (cost < maxCost && sugs.size > numSugToHold) dropMax();
			}
		}
		return maxCost;
	}
	/**
	* Collection suggestions from a SuggestionIterator
	* @param src - the SuggestionIterator used to generate suggestions.
	* @param timeout - the amount of time in milliseconds to allow for suggestions.
	*/
	function collect(src, timeout, filter) {
		let stop = false;
		timeout = timeout ?? timeRemaining;
		timeout = Math.min(timeout, timeRemaining);
		if (timeout < 0) return;
		const timer = startTimer();
		let ir;
		while (!(ir = src.next(stop || maxCost)).done) {
			if (timer() > timeout) stop = symStopProcessing;
			const { value } = ir;
			if (!value) continue;
			if (isSuggestionResult(value)) {
				if (!filter || filter(value.word, value.cost)) collectSuggestion(value);
				continue;
			}
		}
		timeRemaining -= timer();
	}
	function cleanCompoundResult(sr) {
		const { word, cost } = sr;
		const cWord = fnCleanWord(word);
		if (cWord !== word) return {
			word: cWord,
			cost,
			compoundWord: word,
			isPreferred: void 0
		};
		return { ...sr };
	}
	function suggestions() {
		if (numSuggestions < 1 || !sugs.size) return [];
		const NF = "NFD";
		const nWordToMatch = wordToMatch.normalize(NF);
		const rawValues = [...sugs.values()];
		const sorted = (weightMap ? rawValues.map(({ word, cost, isPreferred }) => ({
			word,
			cost: isPreferred ? cost : editDistanceWeighted(nWordToMatch, word.normalize(NF), weightMap, 110),
			isPreferred
		})) : rawValues).sort(compSuggestionResults).map(cleanCompoundResult);
		let i = Math.min(sorted.length, numSuggestions) - 1;
		const limit = includeTies ? sorted.length : Math.min(sorted.length, numSuggestions);
		const iCost = sorted[i].cost;
		const maxCost = Math.min(iCost, weightMap ? changeLimit * BASE_COST - 1 : iCost);
		for (i = 1; i < limit && sorted[i].cost <= maxCost; ++i);
		sorted.length = i;
		return sorted;
	}
	return {
		collect,
		add: function(suggestion) {
			collectSuggestion(suggestion);
			return this;
		},
		get suggestions() {
			return suggestions();
		},
		get maxCost() {
			return maxCost;
		},
		get word() {
			return wordToMatch;
		},
		get maxNumSuggestions() {
			return numSuggestions;
		},
		get changeLimit() {
			return changeLimit;
		},
		includesTies: includeTies,
		ignoreCase,
		symbolStopProcessing: symStopProcessing,
		genSuggestionOptions
	};
}
/**
* Impersonating a Collector, allows searching for multiple variants on the same word.
* The collection is still in the original collector.
* @param collector - collector to impersonate
* @param word - word to present instead of `collector.word`.
* @returns a SuggestionCollector
*/
function impersonateCollector(collector, word) {
	const r = Object.create(collector);
	Object.defineProperty(r, "word", {
		value: word,
		writable: false
	});
	return r;
}
function isSuggestionResult(s) {
	const r = s;
	return !!r && typeof r === "object" && r?.cost !== void 0 && r.word !== void 0;
}
//#endregion
//#region src/lib/suggestions/suggestAStar.ts
/**
* Compare Path Nodes.
* Balance the calculation between depth vs cost
*/
function comparePath(a, b) {
	return a.c / (a.i + 1) - b.c / (b.i + 1) + (b.i - a.i);
}
function suggestAStar(trie, word, options = {}) {
	const opts = createSuggestionOptions(options);
	const collector = suggestionCollector(word, opts);
	collector.collect(getSuggestionsAStar(trie, word, opts));
	return collector.suggestions;
}
function* getSuggestionsAStar(trie, srcWord, options = {}) {
	const { compoundMethod, changeLimit, ignoreCase, weightMap } = createSuggestionOptions(options);
	const visMap = visualLetterMaskMap;
	const root = trie.getRoot();
	const rootIgnoreCase = ignoreCase && root.get(root.info.stripCaseAndAccentsPrefix) || void 0;
	const pathHeap = new PairingHeap(comparePath);
	const resultHeap = new PairingHeap(compareSuggestion);
	const rootPNode = {
		n: root,
		i: 0,
		c: 0,
		s: "",
		p: void 0,
		t: createCostTrie()
	};
	const BC = opCosts.baseCost;
	const VC = opCosts.visuallySimilar;
	const DL = opCosts.duplicateLetterCost;
	const wordSeparator = compoundMethod === CompoundWordsMethod.JOIN_WORDS ? "+" : " ";
	const sc = specialChars(trie.info);
	const comp = trie.info.compoundCharacter;
	const compRoot = root.get(comp);
	const compRootIgnoreCase = rootIgnoreCase && rootIgnoreCase.get(comp);
	const emitted = Object.create(null);
	const debug = isDebuggerAttached();
	const srcLetters = [...srcWord];
	/** Initial limit is based upon the length of the word. */
	let limit = BC * Math.min(srcLetters.length * opCosts.wordLengthCostFactor, changeLimit);
	pathHeap.add(rootPNode);
	if (rootIgnoreCase) pathHeap.add({
		n: rootIgnoreCase,
		i: 0,
		c: 0,
		s: "",
		p: void 0,
		t: createCostTrie()
	});
	let best = pathHeap.dequeue();
	let maxSize = pathHeap.size;
	let suggestionsGenerated = 0;
	let nodesProcessed = 0;
	let nodesProcessedLimit = 1e3;
	let minGen = 1;
	while (best) {
		if (++nodesProcessed > nodesProcessedLimit) {
			nodesProcessedLimit += 1e3;
			if (suggestionsGenerated < minGen) break;
			minGen += suggestionsGenerated;
		}
		if (best.c > limit) {
			best = pathHeap.dequeue();
			maxSize = Math.max(maxSize, pathHeap.size);
			continue;
		}
		processPath(best);
		for (const sug of resultHeap) {
			++suggestionsGenerated;
			if (sug.cost > limit) continue;
			if (sug.word in emitted && emitted[sug.word] <= sug.cost) continue;
			const action = yield sug;
			emitted[sug.word] = sug.cost;
			if (typeof action === "number") limit = Math.min(action, limit);
			if (typeof action === "symbol") return;
		}
		best = pathHeap.dequeue();
		maxSize = Math.max(maxSize, pathHeap.size);
	}
	return;
	function compareSuggestion(a, b) {
		const pa = a.isPreferred && 1 || 0;
		return (b.isPreferred && 1 || 0) - pa || a.cost - b.cost || Math.abs(a.word.charCodeAt(0) - srcWord.charCodeAt(0)) - Math.abs(b.word.charCodeAt(0) - srcWord.charCodeAt(0));
	}
	function processPath(p) {
		const len = srcLetters.length;
		if (p.n.eow && p.i === len) {
			const result = {
				word: pNodeToWord(p),
				cost: p.c
			};
			if (debug) console.log("add possible suggestion: %o", {
				...result,
				nodes: pNodeToDbgInfo(p).map(({ id, s, c, a }) => `${a}{${s || "∅"}} $${c}-> ${id} `).join("")
			});
			resultHeap.add(result);
		}
		calcEdges(p);
	}
	function calcEdges(p) {
		const { n, i, t } = p;
		const s = srcLetters[i];
		const sg = visMap[s] || 0;
		const cost0 = p.c;
		const cost = cost0 + BC + (i ? 0 : opCosts.firstLetterBias);
		const costVis = cost0 + VC;
		const costLegacyCompound = cost0 + opCosts.wordBreak;
		const costCompound = cost0 + opCosts.compound;
		if (s) {
			const m = n.get(s);
			if (m) storePath(t, m, i + 1, cost0, s, p, "=", s);
			if (weightMap) processWeightMapEdges(p, weightMap);
			const ns = srcLetters[i + 1];
			if (s === ns && m) storePath(t, m, i + 2, cost0 + DL, s, p, "dd", s);
			storePath(t, n, i + 1, cost, "", p, "d", "");
			for (const [ss, node] of n.entries()) {
				if (ss === s || ss in sc) continue;
				const c = sg & (visMap[ss] || 0) ? costVis : cost;
				storePath(t, node, i + 1, c, ss, p, "r", ss);
			}
			if (n.eow && i && compoundMethod) storePath(t, root, i, costLegacyCompound, wordSeparator, p, "L", wordSeparator);
			if (ns) {
				const n2 = n.get(ns)?.get(s);
				if (n2) {
					const ss = ns + s;
					storePath(t, n2, i + 2, cost0 + opCosts.swapCost, ss, p, "s", ss);
				}
			}
		}
		if (compRoot && costCompound <= limit && n.get(comp)) {
			if (compRootIgnoreCase) storePath(t, compRootIgnoreCase, i, costCompound, "", p, "~+", "~+");
			storePath(t, compRoot, i, costCompound, "", p, "+", "+");
		}
		if (cost <= limit) for (const [char, node] of n.entries()) {
			if (char in sc) continue;
			storePath(t, node, i, cost, char, p, "i", char);
		}
	}
	function processWeightMapEdges(p, weightMap) {
		delLetters(p, weightMap, srcLetters, storePath);
		insLetters(p, weightMap, srcLetters, storePath);
		repLetters(p, weightMap, srcLetters, storePath);
	}
	/**
	* Apply a cost to the current step.
	* @param t - trie node
	* @param s - letter to apply, empty string means to apply to the current node
	* @param i - index
	* @param c - cost
	* @returns PNode if it was applied, otherwise undefined
	*/
	function storePath(t, n, i, c, s, p, a, ss) {
		const tt = getCostTrie(t, ss);
		if (tt.c[i] <= c || c > limit) return void 0;
		tt.c[i] = c;
		pathHeap.add({
			n,
			i,
			c,
			s,
			p,
			t: tt,
			a
		});
	}
}
function delLetters(pNode, weightMap, letters, storePath) {
	const { t, n } = pNode;
	const trie = weightMap.insDel;
	let ii = pNode.i;
	const cost0 = pNode.c - pNode.i;
	const len = letters.length;
	for (let nn = trie.n; ii < len && nn;) {
		const tt = nn[letters[ii]];
		if (!tt) return;
		++ii;
		if (tt.c !== void 0) storePath(t, n, ii, cost0 + tt.c, "", pNode, "d", "");
		nn = tt.n;
	}
}
function insLetters(p, weightMap, _letters, storePath) {
	const { t, i, c, n } = p;
	const cost0 = c;
	searchTrieCostNodesMatchingTrie2(weightMap.insDel, n, (s, tc, n) => {
		if (tc.c !== void 0) storePath(t, n, i, cost0 + tc.c, s, p, "i", s);
	});
}
function repLetters(pNode, weightMap, letters, storePath) {
	const node = pNode.n;
	const pt = pNode.t;
	const cost0 = pNode.c;
	const len = letters.length;
	const trie = weightMap.replace;
	let i = pNode.i;
	for (let n = trie.n; i < len && n;) {
		const t = n[letters[i]];
		if (!t) return;
		++i;
		const tInsert = t.t;
		if (tInsert) searchTrieCostNodesMatchingTrie2(tInsert, node, (s, tt, n) => {
			const c = tt.c;
			if (c === void 0) return;
			storePath(pt, n, i, cost0 + c + (tt.p || 0), s, pNode, "r", s);
		});
		n = t.n;
	}
}
function createCostTrie() {
	return {
		c: [],
		t: Object.create(null)
	};
}
function getCostTrie(t, s) {
	if (s.length === 1) return t.t[s] ??= createCostTrie();
	if (!s) return t;
	let tt = t;
	for (const c of s) tt = tt.t[c] ??= createCostTrie();
	return tt;
}
function pNodeToDbgInfo(p) {
	const parts = [];
	let n = p;
	while (n) {
		const id = formatNodeId(n.n.id);
		parts.push({
			id,
			s: n.s,
			c: n.c,
			a: n.a || ""
		});
		n = n.p;
	}
	parts.reverse();
	return parts;
}
function formatNodeId(id) {
	const s = id.toString(16).padStart(16, "0");
	const upper = s.slice(0, 8).replace(/^0+/, "").padStart(4, "0");
	const lower = s.slice(8).replace(/^0+/, "");
	return `${upper}${lower ? "." + lower : ""}`;
}
function pNodeToWord(p) {
	const parts = [];
	let n = p;
	while (n) {
		parts.push(n.s);
		n = n.p;
	}
	parts.reverse();
	return parts.join("");
}
function specialChars(options) {
	const charSet = Object.create(null);
	for (const c of Object.values(options)) if (typeof c === "string") charSet[c] = true;
	return charSet;
}
function searchTrieCostNodesMatchingTrie2(trie, node, emit, s = "") {
	const n = trie.n;
	if (!n) return;
	for (const [key, c] of node.entries()) {
		const t = n[key];
		if (!t) continue;
		const pfx = s + key;
		emit(pfx, t, c);
		if (t.n) searchTrieCostNodesMatchingTrie2(t, c, emit, pfx);
	}
}
//#endregion
//#region src/lib/ITrieNode/TrieInfo.ts
const defaultTrieInfoSettings = {
	forbiddenWordPrefix: "!",
	stripCaseAndAccentsPrefix: "~",
	compoundCharacter: "+",
	suggestionPrefix: ":"
};
const revMapDefaultTrieInfoSettings = {
	"!": "forbiddenWordPrefix",
	"~": "stripCaseAndAccentsPrefix",
	"+": "compoundCharacter",
	":": "suggestionPrefix"
};
const defaultTrieCharacteristics = {
	hasForbiddenWords: "!",
	hasNonStrictWords: "~",
	hasCompoundWords: "+",
	hasPreferredSuggestions: ":"
};
const mapInfoToCharacteristics = {
	compoundCharacter: "hasCompoundWords",
	stripCaseAndAccentsPrefix: "hasNonStrictWords",
	forbiddenWordPrefix: "hasForbiddenWords",
	suggestionPrefix: "hasPreferredSuggestions"
};
const mapCharacteristicToInfo = {
	hasCompoundWords: "compoundCharacter",
	hasNonStrictWords: "stripCaseAndAccentsPrefix",
	hasForbiddenWords: "forbiddenWordPrefix",
	hasPreferredSuggestions: "suggestionPrefix"
};
const keysTrieCharacteristics = Object.keys(defaultTrieCharacteristics);
const keysTrieInfo = Object.keys(defaultTrieInfoSettings);
const revMapDefaultTrieCharacteristics = {
	"!": "hasForbiddenWords",
	"+": "hasCompoundWords",
	"~": "hasNonStrictWords",
	":": "hasPreferredSuggestions"
};
function parseTrieInfoFlags(info) {
	const trieInfo = {};
	for (let i = 0; i < info.length; i += 2) {
		const k = info[i];
		const c = info[i + 1];
		if (!charInRevMapDefaultTrieInfoSettings(k) || !c) continue;
		const key = revMapDefaultTrieInfoSettings[k];
		trieInfo[key] = c;
	}
	return trieInfo;
}
function normalizeTrieInfo(info, defaultInfo = defaultTrieInfoSettings) {
	return {
		compoundCharacter: info?.compoundCharacter || defaultInfo.compoundCharacter,
		stripCaseAndAccentsPrefix: info?.stripCaseAndAccentsPrefix || defaultInfo.stripCaseAndAccentsPrefix,
		forbiddenWordPrefix: info?.forbiddenWordPrefix || defaultInfo.forbiddenWordPrefix,
		suggestionPrefix: info?.suggestionPrefix || defaultInfo.suggestionPrefix
	};
}
/**
* Extract the TrieInfo a source PartialTrieInfo
* @param info - The source PartialTrieInfo
* @returns a new object with only the defined TrieInfo properties.
*/
function extractTrieInfo(info) {
	return partialInfoToInfo(info);
}
function cvtTrieInfoToFlags(info) {
	let flags = "";
	for (const k of keysTrieInfo) {
		const c = info[k];
		if (!c) continue;
		assert(c.length === 1, `Expected single character for trie info ${k}, got '${c}'`);
		const flagChar = defaultTrieInfoSettings[k];
		flags += flagChar + c;
	}
	return flags;
}
function charInRevMapDefaultTrieInfoSettings(c) {
	return c in revMapDefaultTrieInfoSettings;
}
function parseTrieCharacteristics(chars) {
	const characteristics = {};
	for (const c of chars) {
		if (!charInRevMapDefaultTrieCharacteristics(c)) continue;
		const key = revMapDefaultTrieCharacteristics[c];
		characteristics[key] = true;
	}
	return characteristics;
}
function mapTrieCharacteristics(characteristics, info) {
	let chars = "";
	for (const k of keysTrieCharacteristics) if (characteristics[k] === true) {
		const c = info[mapCharacteristicToInfo[k]] || "";
		chars += c;
	}
	return chars;
}
function cvtTrieCharacteristicsToFlags(characteristics) {
	return mapTrieCharacteristics(characteristics, defaultTrieInfoSettings);
}
function charInRevMapDefaultTrieCharacteristics(c) {
	return c in revMapDefaultTrieCharacteristics;
}
function mapTrieCharacteristicToInfoValues(char, info) {
	return keysTrieCharacteristics.map((k) => [k, char[k]]).filter((kvp) => kvp[1] === true).map(([k]) => mapCharacteristicToInfo[k]).map((k) => info[k]);
}
var TrieInfoBuilder = class {
	#givenInfo;
	#givenCharacteristics;
	#srcInfo;
	#knownChars;
	#foundChars;
	constructor(info, characteristics) {
		this.#givenInfo = info;
		this.#srcInfo = normalizeTrieInfo(info);
		this.#knownChars = revTrieInfo(this.#srcInfo);
		this.#givenCharacteristics = characteristics || {};
		this.#foundChars = new Set(mapTrieCharacteristicToInfoValues(this.#givenCharacteristics, this.#srcInfo));
	}
	setInfo(info) {
		this.#givenInfo = info;
		this.#srcInfo = normalizeTrieInfo(info);
		this.#knownChars = revTrieInfo(this.#srcInfo);
		this.#foundChars = new Set(mapTrieCharacteristicToInfoValues(this.#givenCharacteristics, this.#srcInfo));
	}
	getActiveInfo() {
		return this.#srcInfo;
	}
	addWord(word) {
		if (word[0] in this.#knownChars) this.#foundChars.add(word[0]);
	}
	#getCharacteristics() {
		const characteristics = {};
		for (const char of this.#foundChars) {
			const key = this.#knownChars[char];
			if (!key) continue;
			const charToCharacteristic = mapInfoToCharacteristics[key];
			if (!charToCharacteristic) continue;
			characteristics[charToCharacteristic] = true;
		}
		return characteristics;
	}
	#getInfo() {
		const info = partialInfoToInfo(this.#givenInfo);
		for (const char of this.#foundChars) {
			const key = this.#knownChars[char];
			if (!key) continue;
			info[key] = this.#srcInfo[key];
		}
		return info;
	}
	build() {
		return {
			info: this.#getInfo(),
			characteristics: this.#getCharacteristics()
		};
	}
};
function partialInfoToInfo(info) {
	if (!info) return {};
	return Object.fromEntries(keysTrieInfo.map((k) => [k, info[k]]).filter(([_k, v]) => !!v));
}
function revTrieInfo(info) {
	const rev = {};
	for (const k of keysTrieInfo) {
		const v = info[k];
		if (typeof v !== "string") continue;
		rev[v] = k;
	}
	return rev;
}
//#endregion
//#region src/lib/utils/endian.ts
let cachedEndianness;
function endianness() {
	if (cachedEndianness) return cachedEndianness;
	const uint32s = new Uint32Array([168496141]);
	cachedEndianness = new Uint8Array(uint32s.buffer)[0] === 10 ? "BE" : "LE";
	return cachedEndianness;
}
//#endregion
//#region src/lib/binary/binaryFormat.ts
const isLittleEndian = endianness() === "LE";
const BytesSize = {
	uint8: 1,
	uint16: 2,
	uint32: 4,
	uint64: 8,
	string: 1
};
/**
* BinaryFormatBuilder is used to define the structure and layout of binary data.
* It provides methods to add various data types (uint8, uint16, uint32, strings, arrays)
* and pointers to the format definition. Each element is automatically aligned and positioned
* based on its type and size. Once all elements are added, call build() to create an
* immutable BinaryFormat that can be used with BinaryDataBuilder and BinaryDataReader.
*/
var BinaryFormatBuilder = class {
	#elements = [];
	#elementsByName = /* @__PURE__ */ new Map();
	#offset = 0;
	#textEncoder = new TextEncoder();
	addUint8(name, description, value) {
		const uValue = value === void 0 || typeof value === "number" ? new Uint8Array([value || 0]) : new Uint8Array(value);
		return this.addData(name, description, "value", uValue);
	}
	addUint16(name, description, value) {
		const uValue = value !== void 0 ? rawNumberToUint16Array(value) : rawNumberToUint16Array(0);
		return this.addData(name, description, "value", uValue);
	}
	addUint32(name, description, value) {
		const uValue = value !== void 0 ? rawNumberToUint32Array(value) : rawNumberToUint32Array(0);
		return this.addData(name, description, "value", uValue);
	}
	/**
	* A pointer to a uint32 array, it has two parts, the offset and the length.
	* @param name - name of pointer
	* @param description - the description of the field
	* @param overload - optional name of element to overload
	* @returns this
	*/
	addUint32ArrayPtr(name, description, overload) {
		return this.addPointer(BytesSize.uint32, name, description, overload);
	}
	/**
	* A pointer to a uint16 array, it has two parts, the offset and the length.
	* @param name - name of pointer
	* @param description - the description of the field
	* @param overload - optional name of element to overload
	* @returns this
	*/
	addUint16ArrayPtr(name, description, overload) {
		return this.addPointer(BytesSize.uint16, name, description, overload);
	}
	/**
	* A pointer to a uint8 array, it has two parts, the offset and the length.
	* @param name - name of pointer
	* @param description - the description of the field
	* @param overload - optional name of element to overload
	* @returns this
	*/
	addUint8ArrayPtr(name, description, overload) {
		return this.addPointer(BytesSize.uint8, name, description, overload);
	}
	/**
	* A pointer to a string of UTF-8 bytes, it has two parts, the offset and the length.
	* @param name - name of pointer
	* @param description - the description of the field
	* @param overload - optional name of element to overload
	* @returns this
	*/
	addStringPtr(name, description, overload) {
		return this.addPointer(BytesSize.string, name, description, overload);
	}
	/**
	* Add a pointer element.
	* @param byteSize - size of each element pointed to
	* @param name - name of the pointer
	* @param description - description of the pointer
	* @param overload - optional name of element to overload
	* @returns this
	*/
	addPointer(byteSize, name, description, overload) {
		const alignment = 4;
		let offset = byteAlign(this.#offset, alignment);
		if (overload) {
			const existing = this.#elementsByName.get(overload);
			assert(existing, `Overload target not found: ${overload}`);
			offset = byteAlign(existing.offset, alignment);
			assert(existing.offset === offset, `Overload target offset mismatch: ${overload}`);
		}
		const element = {
			name,
			description,
			type: "ptr+size",
			alignment,
			offset,
			size: 8,
			value: void 0,
			byteSize,
			overload
		};
		this.#addElement(element);
		return this;
	}
	addString(name, description, length) {
		const value = typeof length === "string" ? this.#textEncoder.encode(length) : new Uint8Array(length);
		this.addData(name, description, "value", value);
		return this;
	}
	addUint8Array(name, description, length) {
		const value = new Uint8Array(length);
		this.addData(name, description, "value", value);
		return this;
	}
	addData(name, description, formatType, data) {
		const byteSize = data.byteLength / data.length;
		assert(isByteAlignment(byteSize), `Invalid byte size: ${byteSize} for field: ${name}`);
		const alignment = byteSize;
		const offset = byteAlign(this.#offset, byteSize);
		const value = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
		const size = value.byteLength;
		this.#addElement({
			name,
			description,
			type: formatType,
			alignment,
			offset,
			size,
			value,
			byteSize
		});
		return this;
	}
	#addElement(element) {
		assert(!this.#elementsByName.has(element.name), `Duplicate element name: ${element.name}`);
		const expectedOffset = byteAlign(element.offset, element.alignment);
		assert(element.offset === expectedOffset, `Element alignment mismatch for ${element.name} with alignment ${element.alignment}. Expected: ${expectedOffset}, Found: ${element.offset}`);
		this.#elementsByName.set(element.name, element);
		this.#elements.push(element);
		if (!element.overload) this.#offset = element.offset + element.size;
	}
	build() {
		return new BinaryFormat([...this.#elements]);
	}
};
/**
* BinaryFormat represents the structure and layout of binary data.
* It contains a collection of format elements that describe the fields,
* their types, offsets, sizes, and byte alignment within the binary data.
*
* This class is typically created using BinaryFormatBuilder and is used
* by BinaryDataBuilder and BinaryDataReader to write and read binary data
* according to the defined format.
*/
var BinaryFormat = class {
	elements;
	#fieldsByName = /* @__PURE__ */ new Map();
	#offset;
	constructor(elements) {
		this.elements = elements;
		this.#fieldsByName = new Map(elements.map((el) => [el.name, el]));
		this.#offset = Math.max(...elements.map((el) => el.offset + el.size), 0);
	}
	get size() {
		return this.#offset;
	}
	getField(name) {
		return this.#fieldsByName.get(name);
	}
	toJSON() {
		return this.elements.map(formatElementToJSON);
	}
	toString() {
		const nameWidth = Math.max(4, ...this.elements.map((el) => el.name.length), 4);
		const offsetWidth = 8;
		const sizeWidth = 6;
		const typeWidth = Math.max(4, ...this.elements.map((el) => el.type.length), 4);
		const lines = [];
		addHeaderLines();
		this.elements.forEach(addElement);
		return lines.join("\n");
		function addHeaderLines() {
			const line = formatLine([
				"name",
				"offset",
				"size",
				"type",
				"mask",
				"description",
				"value"
			]);
			lines.push("Binary Format:");
			lines.push(line);
			lines.push("-".repeat(line.length));
		}
		function addElement(e) {
			lines.push(formatLine([
				e.name,
				e.offset.toString(),
				e.size.toString(),
				e.type,
				e.byteSize.toString(2).padStart(4, "0"),
				e.description,
				e.value ? `${e.value}` : ""
			]));
		}
		function formatLine([name, offset, size, type, mask, description, value]) {
			name = name.padEnd(nameWidth, " ");
			offset = offset.padStart(offsetWidth, " ");
			size = size.padStart(sizeWidth, " ");
			type = type.padEnd(typeWidth, " ");
			value = value ? `(${value})` : "";
			return `${name} ${offset} ${size} ${type} ${mask} ${description} ${value}`.trim();
		}
	}
};
var BinaryDataBuilder = class {
	#dataElementMap = /* @__PURE__ */ new Map();
	#offset = 0;
	#endian;
	#useLE;
	#encoder = new TextEncoder();
	#dataByOffset = /* @__PURE__ */ new Map();
	format;
	constructor(format, endian = endianness()) {
		this.format = format;
		this.#offset = format.size;
		this.#endian = endian;
		this.#useLE = endian === "LE";
		this.#dataElementMap = /* @__PURE__ */ new Map();
		this.#populateDataElementMap();
	}
	#populateDataElementMap() {
		for (const ref of this.format.elements) {
			const { name, offset, size } = ref;
			let data = this.#dataByOffset.get(offset);
			if (!data || data.byteLength < size) {
				data = new Uint8Array(size);
				this.#dataByOffset.set(offset, data);
			}
			if (ref.value) data.set(ref.value);
			const de = {
				name,
				offset,
				size,
				data,
				ref
			};
			this.#dataElementMap.set(de.name, de);
			this.#offset = Math.max(this.#offset, offset + size);
		}
	}
	setString(name, value) {
		const element = this.getDataElement(name);
		assert(element, `Field not found: ${name}`);
		const formatElement = element.ref;
		assert(formatElement, `Field Format not found: ${name}`);
		assert(formatElement.byteSize === BytesSize.string, `Field is not a string: ${name}`);
		assert(this.#encoder.encodeInto(value, element.data).read === value.length, `String too long for field ${name}: ${value}`);
		return this;
	}
	setUint32(name, value) {
		const element = this.getDataElement(name);
		assert(element, `Field not found: ${name}`);
		const formatElement = element.ref;
		assert(formatElement, `Field Format not found: ${name}`);
		assert(formatElement.byteSize === BytesSize.uint32, `Field is not a uint32: ${name}`);
		const view = new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength);
		const useLittle = this.#endian === "LE";
		view.setUint32(0, value, useLittle);
		return this;
	}
	setUint16(name, value) {
		const element = this.getDataElement(name);
		assert(element, `Field not found: ${name}`);
		const formatElement = element.ref;
		assert(formatElement, `Field Format not found: ${name}`);
		assert(formatElement.byteSize === BytesSize.uint16, `Field is not a uint16: ${name}`);
		const view = new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength);
		const useLittle = this.#endian === "LE";
		view.setUint16(0, value, useLittle);
		return this;
	}
	setUint8(name, value) {
		const element = this.getDataElement(name);
		assert(element, `Field not found: ${name}`);
		const formatElement = element.ref;
		assert(formatElement, `Field Format not found: ${name}`);
		assert(formatElement.byteSize === BytesSize.uint8, `Field is not a uint8: ${name}`);
		element.data[0] = value;
		return this;
	}
	/**
	* Adjust the offset so it lands on the alignment boundary.
	* 1 = byte align
	* 2 = 16bit align
	* 4 = 32bit align
	* 8 = 64bit align
	* @param alignment - the byte alignment
	*/
	alignTo(alignment) {
		const aMask = alignment - 1;
		this.#offset = this.#offset + aMask & ~aMask;
	}
	/**
	* Append a data element to the binary data.
	* @param data - the data to add
	* @returns the DataElement added
	*/
	addDataElement(data, alignment) {
		this.alignTo(alignment);
		const offset = this.#offset;
		const name = `data_${offset}`;
		const size = data.byteLength;
		const de = {
			name,
			offset,
			size,
			data
		};
		this.#dataElementMap.set(de.name, de);
		this.#offset = offset + size;
		return de;
	}
	/**
	* Append the data and set the pointer to it.
	* The Uint32Array  will be converted to the proper endianness if necessary.
	* @param name - name of the pointer field
	* @param data - the data to add
	* @param alignment - the alignment for the data, default 4
	* @returns this
	*/
	setPtrUint32Array(name, data, alignment = 4) {
		return this.#setPtrData(name, convertUint32ArrayToUint8Array(data, this.#useLE), alignment);
	}
	/**
	* Append the data and set the pointer to it.
	* The Uint16Array  will be converted to the proper endianness if necessary.
	* @param name - name of the pointer field
	* @param data - the data to add
	* @param alignment - the alignment for the data, default 2
	* @returns this
	*/
	setPtrUint16Array(name, data, alignment = 2) {
		return this.#setPtrData(name, convertUint16ArrayToUint8Array(data, this.#useLE), alignment);
	}
	/**
	* Append the data and set the pointer to it.
	* @param name - name of the pointer field
	* @param data - the data to add
	* @param alignment - the alignment for the data, default 1
	* @returns this
	*/
	setPtrUint8Array(name, data, alignment = 1) {
		return this.#setPtrData(name, data, alignment);
	}
	/**
	* Append the string and set the pointer to it. It will be encoded as UTF-8.
	* Note: the alignment is 1. Use alignTo() if you need a different alignment.
	* @param name - name of the pointer field
	* @param str - the data to add
	* @returns this
	*/
	setPtrString(name, str) {
		return this.#setPtrData(name, this.#encoder.encode(str), 1);
	}
	#setPtrData(name, dataView, alignment) {
		const element = this.getDataElement(name);
		assert(element, `Field not found: ${name}`);
		const formatElement = element.ref;
		assert(formatElement, `Field Format not found: ${name}`);
		assert(formatElement.type === "ptr+size", `Field is not a pointer: ${name}`);
		assert(formatElement.byteSize === alignment, `Pointer byte size mismatch: ${name}`);
		const data = new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength);
		const de = this.addDataElement(data, alignment);
		this.#setPtr(element, de.offset, de.size);
		return this;
	}
	#setPtr(element, dataOffset, dataLength) {
		assert(element.data.byteLength >= 8, `Pointer data too small: ${element.name}`);
		const view = new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength);
		view.setUint32(0, dataOffset, this.#useLE);
		view.setUint32(4, dataLength, this.#useLE);
	}
	get offset() {
		return this.#offset;
	}
	get endian() {
		return this.#endian;
	}
	getDataElement(name) {
		return this.#dataElementMap.get(name);
	}
	build() {
		const buffer = new Uint8Array(this.#offset);
		for (const element of this.#dataElementMap.values()) buffer.set(element.data, element.offset);
		return buffer;
	}
};
function convertUint32ArrayEndiannessInPlace(data) {
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const byteLength = data.length * 4;
	for (let i = 0; i < byteLength; i += 4) {
		const v = view.getUint32(i, true);
		view.setUint32(i, v, false);
	}
	return data;
}
function convertUint16ArrayEndiannessInPlace(data) {
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const byteLength = data.length * 2;
	for (let i = 0; i < byteLength; i += 2) {
		const v = view.getUint16(i, true);
		view.setUint16(i, v, false);
	}
	return data;
}
function convertUint32ArrayToUint8Array(data, useLittle, isLE = isLittleEndian) {
	if (isLE === useLittle) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	const target = new Uint32Array(data.length);
	target.set(data);
	convertUint32ArrayEndiannessInPlace(target);
	return new Uint8Array(target.buffer, target.byteOffset, target.byteLength);
}
function convertUint16ArrayToUint8Array(data, useLittle, isLE = isLittleEndian) {
	if (isLE === useLittle) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	const target = new Uint16Array(data.length);
	target.set(data);
	convertUint16ArrayEndiannessInPlace(target);
	return new Uint8Array(target.buffer, target.byteOffset, target.byteLength);
}
function rawNumberToUint32Array(value) {
	return new Uint32Array([value]);
}
function rawNumberToUint16Array(value) {
	return new Uint16Array([value]);
}
var BinaryDataReader = class {
	data;
	format;
	#decoder = new TextDecoder();
	#useLE;
	/**
	* Binary Data Reader
	* @param data - the raw binary data
	* @param format - the expected format
	* @param endian - the endian of the data (can be changed later)
	*/
	constructor(data, format, endian = endianness()) {
		this.data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
		this.format = format;
		this.#useLE = endian === "LE";
	}
	/**
	* Get a string from the data.
	* It will decode the string as UTF-8 from the following field types: 'string', 'ptrString', 'ptrUint8Array'.
	* @param name - name of the string field
	* @returns string value
	*/
	getString(name) {
		const element = this.getDataElement(name);
		const formatElement = element.ref;
		assert(formatElement.byteSize === BytesSize.string, `Field is not a string: ${name}`);
		if (formatElement.type === "value") return this.#decoder.decode(element.data);
		assert(formatElement.type === "ptr+size", `Field is not a string: ${name}`);
		const strData = this.#getPtrData(element);
		return this.#decoder.decode(strData);
	}
	/**
	* Get a Uint32 from the data.
	* @param name - name of the Uint32 field
	* @returns number value
	*/
	getUint32(name) {
		const element = this.getDataElement(name);
		const formatElement = element.ref;
		assert(formatElement.type === "value" && formatElement.byteSize === BytesSize.uint32, `Field is not a uint32: ${name}`);
		return new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength).getUint32(0, this.#useLE);
	}
	/**
	* Get a Uint16 from the data.
	* @param name - name of the Uint16 field
	* @returns number value
	*/
	getUint16(name) {
		const element = this.getDataElement(name);
		const formatElement = element.ref;
		assert(formatElement.type === "value" && formatElement.byteSize === BytesSize.uint16, `Field is not a uint16: ${name}`);
		return new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength).getUint16(0, this.#useLE);
	}
	/**
	* Read a field as Uint16 starting at the given byte offset.
	* @param name - name of field
	* @param byteOffset - offset of in bytes from the beginning of the field
	* @returns the value read.
	*/
	getAsUint16(name, byteOffset = 0) {
		const element = this.getDataElement(name);
		return new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength).getUint16(byteOffset, this.#useLE);
	}
	/**
	* Get a Uint8 from the data.
	* @param name - name of the Uint8 field
	* @returns number value
	*/
	getUint8(name) {
		const element = this.getDataElement(name);
		const formatElement = element.ref;
		assert(formatElement.type === "value" && formatElement.byteSize === BytesSize.uint8, `Field is not a uint8: ${name}`);
		return element.data[0];
	}
	/**
	* Gets Uint32Array data from a pointer field.
	* Note: The returned Uint32Array may be a view of the underlying data.
	* If the endianness does not match, a copy will be made.
	* @param name - name of the field
	* @returns Uint32Array value
	*/
	getPtrUint32Array(name) {
		const element = this.getDataElement(name);
		const ref = element.ref;
		assert(ref.type === "ptr+size" && ref.byteSize === BytesSize.uint32, `Field is not a ptrUint32Array: ${name}`);
		const arrData = this.#getPtrData(element);
		const rawData32 = new Uint32Array(arrData.buffer, arrData.byteOffset, arrData.byteLength / ref.byteSize);
		if (isLittleEndian === this.#useLE) return rawData32;
		return convertUint32ArrayEndiannessInPlace(new Uint32Array(rawData32));
	}
	/**
	* Gets Uint16Array data from a pointer field.
	* Note: The returned Uint16Array may be a view of the underlying data.
	* If the endianness does not match, a copy will be made.
	* @param name - name of the field
	* @returns Uint16Array value
	*/
	getPtrUint16Array(name) {
		const element = this.getDataElement(name);
		const ref = element.ref;
		assert(ref.type === "ptr+size" && ref.byteSize === BytesSize.uint16, `Field is not a ptrUint16Array: ${name}`);
		const arrData = this.#getPtrData(element);
		const rawData16 = new Uint16Array(arrData.buffer, arrData.byteOffset, arrData.byteLength / ref.byteSize);
		if (isLittleEndian === this.#useLE) return rawData16;
		return convertUint16ArrayEndiannessInPlace(new Uint16Array(rawData16));
	}
	/**
	* Gets Uint8Array data from a pointer field.
	* Note: The returned Uint8Array is a view of the underlying data.
	* @param name - name of the field
	* @returns Uint8Array value
	*/
	getPtrUint8Array(name) {
		const element = this.getDataElement(name);
		assert(element.ref.type === "ptr+size", `Field is not a ptr+size: ${name}`);
		return this.#getPtrData(element);
	}
	/**
	* Gets string data from a pointer field.
	* @param name - name of the field
	* @returns string value
	*/
	getPtrString(name) {
		const element = this.getDataElement(name);
		assert(element.ref.type === "ptr+size", `Field is not a ptr+size: ${name}`);
		const strData = this.#getPtrData(element);
		return this.#decoder.decode(strData);
	}
	#getPtrData(element) {
		const formatElement = element.ref;
		assert(formatElement.type === "ptr+size", `Field is not a ptr+size: ${element.name} (${formatElement.type})`);
		const view = new DataView(element.data.buffer, element.data.byteOffset, element.data.byteLength);
		const offset = view.getUint32(0, this.#useLE);
		const length = view.getUint32(4, this.#useLE);
		return this.data.subarray(offset, offset + length);
	}
	/**
	* Get the Element information by name
	* @param name - name of the field
	* @returns DataElementWithRef
	*/
	getDataElement(name) {
		const element = this.format.getField(name);
		assert(element, `Field not found: ${name}`);
		const data = this.data.subarray(element.offset, element.offset + element.size);
		return {
			name: element.name,
			offset: element.offset,
			size: element.size,
			data,
			ref: element
		};
	}
	set endian(endian) {
		this.#useLE = endian === "LE";
	}
	get endian() {
		return this.#useLE ? "LE" : "BE";
	}
	reverseEndian() {
		this.#useLE = !this.#useLE;
	}
	/**
	* Get the raw bytes for a field.
	* @param name - name of the field
	* @returns the bytes or undefined
	*/
	getUint8Array(name) {
		const element = this.getDataElement(name);
		if (!element) return void 0;
		return element.data;
	}
	/**
	* Get the FormatElement for a field.
	* @param name - name of the field
	* @returns the element or undefined
	*/
	getField(name) {
		return this.format.getField(name);
	}
};
function formatElementToJSON(fe) {
	const { value } = fe;
	const v = value ? [...value] : void 0;
	return {
		...fe,
		value: v
	};
}
function byteAlign(offset, alignment) {
	const aMask = alignment - 1;
	return offset + aMask & ~aMask;
}
function isByteAlignment(value) {
	return value === 1 || value === 2 || value === 4 || value === 8;
}
//#endregion
//#region src/lib/GTrie/GTrie.ts
var GTrieNode = class {
	children;
	value;
	constructor(value, children) {
		this.value = value;
		this.children = children;
	}
};
/**
* ### Generic Tries
*
* This is a Trie class that can contain any data. It is used in optimizing the dictionary and storing lookup data.
* The performance is "good enough" for most uses, but may need to be optimized for large data sets.
*
* K - Key type
* V - Value type
*/
var GTrie = class GTrie {
	root;
	constructor() {
		this.root = new GTrieNode();
	}
	/**
	*
	* @param keys - the path to the child node
	* @param value - the value to set / insert
	* @return the previous value if one existed
	*/
	insert(keys, value) {
		const node = this.insertNode(keys);
		const prev = node.value;
		node.value = value;
		return prev;
	}
	/**
	* Insert nodes for the given keys into the trie.
	* Existing nodes are reused.
	* @param keys
	* @returns the final node inserted or found
	*/
	insertNode(keys) {
		let currentNode = this.root;
		for (const key of keys) {
			let children = currentNode.children;
			if (!children) {
				children = /* @__PURE__ */ new Map();
				currentNode.children = children;
			}
			let child = children.get(key);
			if (!child) {
				child = new GTrieNode();
				children.set(key, child);
			}
			currentNode = child;
		}
		return currentNode;
	}
	findNode(keys) {
		let currentNode = this.root;
		for (const key of keys) {
			const children = currentNode.children;
			if (!children) return;
			const child = children.get(key);
			if (!child) return;
			currentNode = child;
		}
		return currentNode;
	}
	has(keys) {
		return this.findNode(keys)?.value !== void 0;
	}
	hasNode(keys) {
		return this.findNode(keys) !== void 0;
	}
	get(keys) {
		const node = this.findNode(keys);
		return node ? node.value : void 0;
	}
	static fromEntries(entries) {
		const trie = new GTrie();
		for (const [keys, value] of entries) trie.insert(keys, value);
		return trie;
	}
};
//#endregion
//#region ../cspell-performance-monitor/dist/index.js
const symbolCSpell = Symbol.for("cspell");
const globalThisCSpell = globalThis;
function _measurePerfStart(name, enabled) {
	if (!enabled) return;
	performance.mark(name + "-start");
}
function _measurePerfEnd(name, enabled) {
	if (!enabled) return;
	performance.mark(name + "-end");
	performance.measure(name, name + "-start", name + "-end");
}
/**
* Creates performance marks and measures the time taken between them.
* @param name - name of the performance entry
* @returns a function to stop the timer.
*/
function measurePerf(name) {
	const enabled = isEnabledPerformanceMeasurements();
	_measurePerfStart(name, enabled);
	return makeDisposableFunction(() => {
		_measurePerfEnd(name, enabled);
	});
}
function makeDisposableFunction(fn) {
	const disposableFn = fn;
	disposableFn[Symbol.dispose] = fn;
	disposableFn[Symbol.asyncDispose] = () => (fn(), Promise.resolve());
	return disposableFn;
}
function isEnabledPerformanceMeasurements() {
	return !!globalThisCSpell[symbolCSpell]?.enablePerformanceMeasurements;
}
//#endregion
//#region src/lib/StringTable/StringTable.ts
/**
* This is a set of strings stored in a compact form.
*
* Strings are stored as UTF-8 encoded bytes in a single contiguous buffer.
* Each string is referenced by its starting index and length within the buffer.
*
* This design minimizes memory overhead by avoiding individual string objects,
* allowing efficient storage and retrieval of a large number of strings.
*
* Strings are retrieved based on their index.
*
* The internal index table contains the offset and length of each string in the buffer.
*
*/
var StringTable = class {
	#index;
	#data;
	#strLenBits;
	#strLenMask;
	#decoder = new TextDecoder();
	/**
	*
	* @param index - the lookup index format: `offset|len` where the low bits are the length
	* @param utf8ByteData - the UTF-8 encoded byte data for all the strings
	* @param strLenBits - number of bits used to store the length of the string in the index entry
	*/
	constructor(index, utf8ByteData, strLenBits) {
		this.#index = index;
		this.#data = utf8ByteData;
		this.#strLenBits = strLenBits;
		this.#strLenMask = (1 << strLenBits) - 1;
	}
	get index() {
		return this.#index;
	}
	get charData() {
		return this.#data;
	}
	get strLenBits() {
		return this.#strLenBits;
	}
	get length() {
		return this.#index.length;
	}
	getStringBytes(idx) {
		if (idx < 0 || idx >= this.#index.length) return void 0;
		return this.#getBytesByIndexValue(this.#index[idx]);
	}
	getString(idx) {
		const bytes = this.getStringBytes(idx);
		if (!bytes) return void 0;
		return this.#decoder.decode(bytes);
	}
	#getBytesByIndexValue(value) {
		const offset = value >>> this.#strLenBits;
		const length = value & this.#strLenMask;
		return this.#data.subarray(offset, offset + length);
	}
	dataByteLength() {
		return this.#data.byteLength;
	}
	bitInfo() {
		const strLenBits = this.strLenBits;
		const offsetBits = Math.ceil(Math.log2(this.charData.length + 1));
		return {
			strLenBits,
			offsetBits,
			minIndexBits: strLenBits + offsetBits
		};
	}
	values() {
		return [...this.#index].map((v) => this.#getBytesByIndexValue(v));
	}
	toString() {
		return [...this.#index].map((_, i) => this.getString(i) || "").join(", ");
	}
	toJSON() {
		return {
			index: [...this.#index],
			data: [...this.#data],
			strLenBits: this.#strLenBits
		};
	}
};
var StringTableBuilder = class StringTableBuilder {
	#data = [];
	#encoder = new TextEncoder();
	#lookupTrie = new GTrie();
	#locked = false;
	#maxStrLen = 0;
	addStringBytes(bytes) {
		assert(!this.#locked, "StringTableBuilder is locked and cannot be modified.");
		const found = this.#lookupTrie.get(bytes);
		if (found !== void 0) return found;
		const idx = this.#data.push(bytes) - 1;
		this.#lookupTrie.insert(bytes, idx);
		this.#maxStrLen = Math.max(this.#maxStrLen, bytes.length);
		return idx;
	}
	addString(str) {
		const bytes = this.#encoder.encode(str);
		return this.addStringBytes(bytes);
	}
	getEntry(idx) {
		return this.#data[idx];
	}
	get length() {
		return this.#data.length;
	}
	build() {
		const endPerf = measurePerf("StringTableBuilder.build");
		const table = this.#build();
		endPerf();
		return table;
	}
	#build() {
		this.#locked = true;
		if (!this.#data.length) return new StringTable([], new Uint8Array(0), 8);
		const sortedBySize = this.#data.map((b, i) => ({
			b,
			i
		})).sort((a, b) => b.b.length - a.b.length);
		const byteValues = [];
		const strLenBits = Math.ceil(Math.log2(this.#maxStrLen + 1));
		const strLenMask = (1 << strLenBits) - 1;
		const index = new Array(this.#data.length);
		for (const { b, i } of sortedBySize) {
			let offset = findValues(b);
			if (offset < 0) offset = appendValues(b);
			const length = b.length;
			assert(length <= strLenMask, `String length ${length} exceeds maximum of ${strLenMask}`);
			index[i] = offset << strLenBits | length;
		}
		return new StringTable(index, new Uint8Array(byteValues), strLenBits);
		function findValues(buf) {
			const bufLen = buf.length;
			const maxOffset = byteValues.length - bufLen;
			for (let i = 0; i <= maxOffset; i++) {
				let match = true;
				for (let j = 0; j < bufLen; j++) if (byteValues[i + j] !== buf[j]) {
					match = false;
					break;
				}
				if (match) return i;
			}
			return -1;
		}
		function appendValues(buf) {
			const offset = byteValues.length;
			byteValues.push(...buf);
			return offset;
		}
	}
	static fromStringTable(table) {
		const builder = new StringTableBuilder();
		const values = table.values();
		const len = values.length;
		for (let i = 0; i < len; ++i) builder.addStringBytes(values[i]);
		return builder;
	}
};
/**
* The endian code used to identify endianness in the binary format.
* We use the 16-bit value 0x5453 (corresponding to the characters 'S' (0x53) and 'T' (0x54)).
* In little-endian representation, 0x5453 is stored as bytes 0x53 0x54 ('S', 'T').
* In big-endian representation, 0x5453 is stored as bytes 0x54 0x53 ('T', 'S').
*
* The value stored should match the value retrieved, otherwise the endianness is incorrect.
*/
const bomCode = 21587;
function getStringTableBinaryFormat() {
	return new BinaryFormatBuilder().addUint8("indexBits", "The number of bits needed for each index entry", 32).addUint8("strLenBits", "The number of bits needed to store the max length of a string in the table.", 8).addUint16("bom", "The Byte Order Mark.", bomCode).addString("reserved", "Reserved for future use", 4).addUint32ArrayPtr("index32", "String index array of 32 bit entries").addUint16ArrayPtr("index16", "String index array of 16 bit entries", "index32").addUint8ArrayPtr("index", "String index array of 8 bit entries", "index32").addUint8ArrayPtr("data", "String byte data").build();
}
/**
* Encodes a StringTable into binary data so that it can be stored or transmitted.
* @param table - the string table to encode
* @param endian - the resulting endianness of the data.
* @returns The encoded string table binary data.
*/
function encodeStringTableToBinary(table, endian) {
	const strLenBits = table.strLenBits;
	const minIndexBits = strLenBits + Math.ceil(Math.log2(table.charData.length + 1));
	const indexBits = minIndexBits <= 16 ? 16 : 32;
	assert(minIndexBits <= indexBits, `Index bits ${indexBits} is too small for required bits ${minIndexBits}`);
	const builder = new BinaryDataBuilder(getStringTableBinaryFormat(), endian);
	builder.setUint8("indexBits", indexBits);
	builder.setUint8("strLenBits", strLenBits);
	builder.setUint16("bom", bomCode);
	if (indexBits === 16) builder.setPtrUint16Array("index16", toU16Array(table.index));
	else builder.setPtrUint32Array("index32", toU32Array(table.index));
	builder.setPtrUint8Array("data", table.charData);
	return builder.build();
}
/**
* Decodes binary data into a StringTable.
* @param data - the byte data of the string table.
* @param endian - the endianness of the encoded data.
* @returns The decoded StringTable.
*/
function decodeStringTableFromBinary(data, endian) {
	if (!data?.length) return new StringTable([], new Uint8Array(0), 8);
	const reader = new BinaryDataReader(data, getStringTableBinaryFormat(), endian);
	const indexBits = reader.getUint8("indexBits");
	const strLenBits = reader.getUint8("strLenBits");
	const bomStored = reader.getUint16("bom");
	assert(!bomStored || bomStored === bomCode, "Endian mismatch");
	return new StringTable(indexBits === 16 ? reader.getPtrUint16Array("index16") : reader.getPtrUint32Array("index32"), reader.getPtrUint8Array("data"), strLenBits);
}
function toU16Array(data) {
	if (data instanceof Uint16Array) return data;
	return new Uint16Array(data);
}
function toU32Array(data) {
	if (data instanceof Uint32Array) return data;
	return new Uint32Array(data);
}
//#endregion
//#region src/lib/utils/text.ts
/**
* Expand a line into a set of characters.
*
* Example:
* - `a-c` -> `<a,b,c>`
* - `ac-` -> `<a,c,->`
* - `-abz` -> `<-,a,b,z>`
* - `\u0300-\u0308` -> `<accents>`
*
* @param line - set of characters
* @param rangeChar - the character to indicate ranges, set to empty to not have ranges.
*/
function expandCharacterSet(line, rangeChar = "-") {
	const charSet = /* @__PURE__ */ new Set();
	let mode = 0;
	let prev = "";
	for (const char of line) {
		if (mode) {
			expandRange(prev, char).forEach((a) => charSet.add(a));
			mode = 0;
		}
		if (char === rangeChar && prev) {
			mode = 1;
			continue;
		}
		charSet.add(char);
		prev = char;
	}
	if (mode) charSet.add(rangeChar);
	return charSet;
}
/**
* Expands a range between two characters.
* - `a <= b` -- `[a, b]`
* - `a > b` -- `[]`
* @param a - staring character
* @param b - ending character
* @returns array of unicode characters.
*/
function expandRange(a, b) {
	const values = [];
	const end = b.codePointAt(0);
	const begin = a.codePointAt(0);
	if (!(begin && end)) return values;
	for (let i = begin; i <= end; ++i) values.push(String.fromCodePoint(i));
	return values;
}
/**
* Tries to find the different cases for a letter.
* It can generate multiple forms:
* - `ß` => `['ß', 'SS', 'ss']`
* - `a` => `['a', 'A']`
* - `A` => `['A', 'z']`
* - `Å` => `['A', 'z']`
* @param letter - the letter to generate upper and lower cases.
* @param locale - the locale to use for changing case.
* @returns the set of found cases.
*/
function caseForms(letter, locale) {
	const forms = new Set([letter]);
	function tryCases(s) {
		forms.add(s.toLocaleLowerCase(locale));
		forms.add(s.toLocaleUpperCase(locale));
	}
	tryCases(letter);
	[...forms].forEach(tryCases);
	return [...forms].filter((a) => !!a);
}
/**
* Generate the different normalized forms of the letters.
* @param letter - letter to normalize.
* @returns combined set of possible forms.
*/
function accentForms(letter) {
	return new Set([
		letter,
		letter.normalize("NFC"),
		letter.normalize("NFD")
	]);
}
/**
* Remove all accents.
* @param characters - unicode characters
* @returns characters with accents removed (if it was possible)
*/
function stripAccents(characters) {
	return characters.normalize("NFD").replaceAll(/\p{M}/gu, "");
}
/**
* Remove all non accent characters from a string.
* @param characters - characters with accents.
* @returns - only the accents.
*/
function stripNonAccents(characters) {
	return characters.normalize("NFD").replaceAll(/[^\p{M}]/gu, "");
}
function isValidUtf16Character(char) {
	const len = char.length;
	const code = char.charCodeAt(0) & 64512;
	return len === 1 && (code & 63488) !== 55296 || len === 2 && (code & 64512) === 55296 && (char.charCodeAt(1) & 64512) === 56320;
}
function assertValidUtf16Character(char) {
	if (!isValidUtf16Character(char)) {
		const len = char.length;
		const codes = toCharCodes(char.slice(0, 2)).map((c) => "0x" + ("0000" + c.toString(16)).slice(-4));
		let message;
		if (len === 1) message = `Invalid utf16 character, lone surrogate: ${codes[0]}`;
		else if (len === 2) message = `Invalid utf16 character, not a valid surrogate pair: [${codes.join(", ")}]`;
		else message = `Invalid utf16 character, must be a single character, found: ${len}`;
		throw new Error(message);
	}
}
function toCharCodes(s) {
	const values = [];
	for (let i = 0; i < s.length; ++i) values.push(s.charCodeAt(i));
	return values;
}
//#endregion
//#region src/lib/TrieBlob/Utf8.ts
/**
* Encode a CodePoint into a Big Endian utf8 value, up to 4 bytes.
* These numbers sort into the correct order for utf8.
*
*            hightest byte           lowest byte   Code Point Range
* - 1 byte:  00000000 00000000 00000000 0xxxxxxx - 0x0000_0000 - 0x0000_007f
* - 2 bytes: 00000000 00000000 110xxxxx 10xxxxxx - 0x0000_0080 - 0x0000_07ff
* - 3 bytes: 00000000 1110xxxx 10xxxxxx 10xxxxxx - 0x0000_0800 - 0x0000_ffff
* - 4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx - 0x0001_0000 - 0x001f_ffff
*
* @param code - the code point to encode
* @returns number containing the utf8 value.
*/
function encodeToUtf8_32(code) {
	if (code < 128) return code;
	if (code < 2048) return 49280 | (code & 1984) << 2 | code & 63;
	if (code < 65536) return 14712960 | (code & 61440) << 4 | (code & 4032) << 2 | code & 63;
	return 4034953344 + ((code & 1835008) << 6 | (code & 258048) << 4 | (code & 4032) << 2 | code & 63);
}
/**
* Encode a CodePoint into a Little Endian utf8 value, up to 4 bytes.
*
* These numbers DO NOT sort into the correct order for utf8.
*
*            hightest byte           lowest byte   Code Point Range
* - 1 byte:  00000000 00000000 00000000 0xxxxxxx - 0x0000_0000 - 0x0000_007f
* - 2 bytes: 00000000 00000000 10xxxxxx 110xxxxx - 0x0000_0080 - 0x0000_07ff
* - 3 bytes: 00000000 10xxxxxx 10xxxxxx 1110xxxx - 0x0000_0800 - 0x0000_ffff
* - 4 bytes: 10xxxxxx 10xxxxxx 10xxxxxx 11110xxx - 0x0001_0000 - 0x001f_ffff
*
* @param code - the code point to encode
* @returns number containing the utf8 value.
*/
function encodeToUtf8_32Rev(code) {
	if (code < 128) return code;
	if (code < 2048) return 32960 | (code & 1984) >> 6 | (code & 63) << 8;
	if (code < 65536) return 8421600 | (code & 61440) >>> 12 | (code & 4032) << 2 | (code & 63) << 16;
	return 2155905264 + ((code & 1835008) >>> 18 | (code & 258048) >>> 4 | (code & 4032) << 10 | (code & 63) << 24);
}
/**
* Incrementally decodes a stream of UTF‑8 bytes into Unicode code points.
*
* This class keeps a small amount of state (`remaining` and `value`) so that callers can
* feed it one byte at a time via {@link Utf8Accumulator.decode}, and receive a complete
* code point whenever enough continuation bytes have been seen. If a full code point has
* not yet been assembled, `decode` returns `undefined`. On invalid byte sequences, the
* accumulator is reset to a known-good state.
*
* The design is similar in spirit to {@link TextDecoderStream} (it copes with multi-byte
* sequences and boundaries that may fall between input chunks), but it is implemented as a
* lightweight, allocation-free helper object that can be cheaply cloned and reset. This
* makes it suitable for performance‑sensitive code and for environments where
* `TextDecoderStream` is not available or where creating full stream instances would be
* unnecessarily expensive.
*/
var Utf8Accumulator = class Utf8Accumulator {
	/**
	* Number of remaining continuation bytes expected for the current code point being decoded.
	*/
	remaining = 0;
	/**
	* Partially decoded code point value being accumulated.
	*/
	value = 0;
	/**
	* Decode a single utf8 byte
	* @param byte
	* @returns a CodePoint if a full code point has been decoded, undefined if more bytes are needed, or 0xfffd on error.
	*/
	decode(byte) {
		let remaining = this.remaining;
		if (byte & -256) return this.reset();
		if ((byte & 128) === 0) {
			if (remaining) return this.reset();
			return byte;
		}
		if (remaining) {
			if ((byte & 192) !== 128) return this.reset();
			let value = this.value;
			value = value << 6 | byte & 63;
			this.value = value;
			remaining -= 1;
			this.remaining = remaining;
			return remaining ? void 0 : value;
		}
		if ((byte & 224) === 192) {
			this.value = byte & 31;
			this.remaining = 1;
			return;
		}
		if ((byte & 240) === 224) {
			this.value = byte & 15;
			this.remaining = 2;
			return;
		}
		if ((byte & 248) === 240) {
			this.value = byte & 7;
			this.remaining = 3;
			return;
		}
		return this.reset();
	}
	get codePoint() {
		return this.remaining ? void 0 : this.value;
	}
	decodeBytesToString(bytes) {
		let value = "";
		const len = bytes.length;
		for (let i = 0; i < len; ++i) {
			const code = this.decode(bytes[i]);
			if (code) value += String.fromCodePoint(code);
		}
		return value;
	}
	reset() {
		this.remaining = 0;
		this.value = 0;
		return 65533;
	}
	clone(into = new Utf8Accumulator()) {
		into.remaining = this.remaining;
		into.value = this.value;
		return into;
	}
	static isMultiByte(v) {
		return (v & 128) !== 0;
	}
	static isSingleByte(v) {
		return (v & 128) === 0;
	}
	static create() {
		return new this();
	}
};
function encodeTextToUtf8_32Rev(offset) {
	const text = offset.text;
	let code = text.charCodeAt(offset.i) & 65535;
	code = (code & 63488) === 55296 ? text.codePointAt(offset.i++) || 0 : code;
	offset.i++;
	if (code < 128) return code;
	if (code < 2048) return 32960 | (code & 1984) >> 6 | (code & 63) << 8;
	if (code < 65536) return 8421600 | (code & 61440) >>> 12 | (code & 4032) << 2 | (code & 63) << 16;
	return 2155905264 + ((code & 1835008) >>> 18 | (code & 258048) >>> 4 | (code & 4032) << 10 | (code & 63) << 24);
}
function encodeTextToUtf8Into(text, into, offset = 0) {
	const t = {
		text,
		i: 0
	};
	let i = offset;
	for (; t.i < text.length;) {
		const code = encodeTextToUtf8_32Rev(t);
		for (let utf8_32Rev = code; utf8_32Rev !== 0; utf8_32Rev >>>= 8) into[i++] = utf8_32Rev & 255;
	}
	return i - offset;
}
function encodeTextToUtf8(text) {
	const into = new Array(text.length);
	encodeTextToUtf8Into(text, into);
	return into;
}
//#endregion
//#region src/lib/TrieBlob/CharIndex.ts
Object.freeze([0]);
var CharIndex = class CharIndex {
	#charToUtf8SeqMap;
	#lastWord = "";
	#lastWordSeq = [];
	#multiByteChars;
	charIndex;
	constructor(charIndex = /* @__PURE__ */ new Set()) {
		this.charIndex = charIndex;
		this.#charToUtf8SeqMap = buildCharIndexSequenceMap(charIndex);
		this.#multiByteChars = [...this.#charToUtf8SeqMap.values()].some((c) => c.length > 1);
	}
	getCharUtf8Seq(c) {
		const found = this.#charToUtf8SeqMap.get(c);
		if (found) return found;
		const s = encodeTextToUtf8(c);
		this.#charToUtf8SeqMap.set(c, s);
		return s;
	}
	wordToUtf8Seq(word) {
		if (this.#lastWord === word) return this.#lastWordSeq;
		const seq = encodeTextToUtf8(word);
		this.#lastWord = word;
		this.#lastWordSeq = seq;
		return seq;
	}
	indexContainsMultiByteChars() {
		return this.#multiByteChars;
	}
	get size() {
		return this.charIndex.size;
	}
	toJSON() {
		return { charIndex: [...this.charIndex].join("") };
	}
	static fromJSON(json) {
		return new CharIndex(new Set(json.charIndex));
	}
	static fromIterable(charIndex) {
		const charSet = /* @__PURE__ */ new Set();
		for (const s of charIndex) for (const c of s) charSet.add(c);
		return new CharIndex(charSet);
	}
};
function buildCharIndexSequenceMap(charIndex) {
	const map = /* @__PURE__ */ new Map();
	for (const key of charIndex) map.set(key, encodeTextToUtf8(key));
	return map;
}
var CharIndexBuilder = class {
	charIndex = /* @__PURE__ */ new Set();
	charIndexMap = /* @__PURE__ */ new Map();
	charIndexSeqMap = /* @__PURE__ */ new Map();
	#mapIdxToSeq = /* @__PURE__ */ new Map();
	constructor() {
		this.getUtf8Value("");
	}
	getUtf8Value(c) {
		const found = this.charIndexMap.get(c);
		if (found !== void 0) return found;
		const nc = c.normalize("NFC");
		this.charIndex.add(nc);
		const utf8 = encodeToUtf8_32(nc.codePointAt(0) || 0);
		this.charIndexMap.set(c, utf8);
		this.charIndexMap.set(nc, utf8);
		this.charIndexMap.set(c.normalize("NFD"), utf8);
		return utf8;
	}
	utf8ValueToUtf8Seq(idx) {
		const found = this.#mapIdxToSeq.get(idx);
		if (found !== void 0) return found;
		const seq = splitUtf8(idx);
		this.#mapIdxToSeq.set(idx, seq);
		return seq;
	}
	charToUtf8Seq(c) {
		const idx = this.getUtf8Value(c);
		return this.utf8ValueToUtf8Seq(idx);
	}
	wordToUtf8Seq(word) {
		const seq = new Array(word.length);
		let i = 0;
		for (const c of word) {
			const idx = this.getUtf8Value(c);
			const cSep = this.utf8ValueToUtf8Seq(idx);
			if (typeof cSep === "number") {
				seq[i++] = cSep;
				continue;
			}
			for (const cIdx of cSep) seq[i++] = cIdx;
		}
		if (seq.length !== i) seq.length = i;
		return seq;
	}
	get size() {
		return this.charIndex.size;
	}
	build() {
		return new CharIndex(this.charIndex);
	}
};
function splitUtf8(utf8) {
	utf8 = utf8 < 0 ? 4294967296 + utf8 : utf8;
	if (utf8 <= 255) return [utf8];
	if (utf8 <= 65535) return [utf8 >> 8 & 255, utf8 & 255];
	if (utf8 <= 16777215) return [
		utf8 >> 16 & 255,
		utf8 >> 8 & 255,
		utf8 & 255
	];
	return [
		utf8 >> 24 & 255,
		utf8 >> 16 & 255,
		utf8 >> 8 & 255,
		utf8 & 255
	].filter((v) => v);
}
//#endregion
//#region src/lib/TrieBlob/TrieBlobFormat.ts
const NodeHeaderPrefixMask = 1073741312;
//#endregion
//#region src/lib/TrieBlob/optimizeNodes.ts
const MAX_AUTO_ADD_TO_STRING_TABLE = 4;
/**
* Convert from a Trie to a DAWG by merging identical nodes.
* @param nodes - the nodes to optimize. This array and the contents WILL BE CHANGED and used as a scratch space.
* @returns the optimized nodes.
*/
function optimizeNodes(nodes) {
	const endPerf = measurePerf("TrieBlob.optimizeNodes");
	/** the has map to look up locked nodes. */
	const nodeHashMap = /* @__PURE__ */ new Map();
	const lockedNodes = /* @__PURE__ */ new WeakMap();
	const eowNode = nodes[1];
	getHashList(eowNode).push(eowNode);
	lockNode(eowNode, 1);
	walk(0);
	const n = compactNodes(nodes);
	endPerf();
	return n;
	function getHashList(node) {
		const hash = xorNode(node);
		let list = nodeHashMap.get(hash);
		if (list) return list;
		list = [];
		nodeHashMap.set(hash, list);
		return list;
	}
	function lockNode(node, index) {
		lockedNodes.set(node, index);
		return index;
	}
	function findMatchingLockedNode(hash, node) {
		const candidates = nodeHashMap.get(hash);
		if (!candidates) return void 0;
		return findMatchingNode(node, candidates);
	}
	function registerNode(nodeIdx, node) {
		if (!nodeIdx) return nodeIdx;
		const match = findMatchingLockedNode(xorNode(node), node);
		if (!match) {
			getHashList(node).push(node);
			return lockNode(node, nodeIdx);
		}
		return lockNode(node, lockedNodes.get(match) || 0);
	}
	function walk(nodeIdx) {
		const node = nodes[nodeIdx];
		if (lockedNodes.has(node)) return nodeIdx;
		const count = node.length - 1;
		for (let i = 1; i <= count; ++i) {
			const entry = node[i];
			const childIdx = entry >> 8;
			const newChildIdx = walk(childIdx);
			if (newChildIdx !== childIdx) node[i] = entry & 255 | newChildIdx << 8;
		}
		return registerNode(nodeIdx, node);
	}
}
function xorNode(a) {
	let xor = 0;
	for (let i = 0; i < a.length; ++i) xor ^= a[i];
	return xor;
}
function findMatchingNode(node, candidates) {
	for (let i = candidates.length - 1; i >= 0; --i) {
		const candidate = candidates[i];
		if (compareNodes(node, candidate)) return candidate;
	}
}
function compareNodes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length && diff === 0; ++i) diff = a[i] - b[i];
	return !diff;
}
/**
* Walk the trie and remove any nodes that are not reachable.
* @param nodes - the nodes to compact they will get modified.
* @returns the compacted nodes.
*/
function compactNodes(nodes) {
	const nodeMap = /* @__PURE__ */ new Map();
	const compacted = [];
	nodeMap.set(0, 0);
	nodeMap.set(1, 1);
	compacted.push(nodes[0], nodes[1]);
	walk(0);
	return compacted;
	function walk(nodeIdx) {
		const found = nodeMap.get(nodeIdx);
		if (found) return found;
		const node = nodes[nodeIdx];
		const count = node.length - 1;
		for (let i = 1; i <= count; ++i) {
			const entry = node[i];
			const newChildIdx = walk(entry >> 8);
			node[i] = entry & 255 | newChildIdx << 8;
		}
		if (!nodeIdx) return nodeIdx;
		const newIndex = compacted.push(node) - 1;
		nodeMap.set(nodeIdx, newIndex);
		return newIndex;
	}
}
function calculateByteSize(nodes) {
	let count = 0;
	for (let i = nodes.length - 1; i >= 0; --i) count += nodes[i].length;
	return count * 4;
}
function copyNodes(nodes) {
	const size = calculateByteSize(nodes);
	const dst = Array(nodes.length);
	const buffer = new ArrayBuffer(size);
	for (let i = 0, offset = 0; i < nodes.length; ++i) {
		const node = nodes[i];
		const nodeCopy = new Uint32Array(buffer, offset, node.length);
		nodeCopy.set(node);
		dst[i] = nodeCopy;
		offset += nodeCopy.byteLength;
	}
	return dst;
}
function copyNodesAndStringTable(src) {
	return {
		nodes: copyNodes(src.nodes),
		stringTableBuilder: StringTableBuilder.fromStringTable(src.stringTable)
	};
}
function optimizeNodesWithStringTable(src) {
	const endPerf = measurePerf("TrieBlob.optimizeNodesWithStringTable");
	const { nodes, stringTableBuilder: builder } = copyNodesAndStringTable(src);
	const multipleNodeRefs = calcHasMultipleReferences(nodes);
	const multiStringRefs = new Set([0]);
	if (!builder.length) builder.addString("");
	walkNodes(nodes, 0, { after: processNode });
	const r = {
		nodes: optimizeNodes(nodes),
		stringTable: builder.build()
	};
	endPerf();
	return r;
	/**
	* If possible, replace the current node with a prefix node.
	* @param nodeIdx - node to process
	*/
	function processNode(nodeIdx) {
		const node = nodes[nodeIdx];
		if (node.length !== 2) return;
		const header = node[0];
		if ((header & 256) !== 0) return;
		if (header & 1073741312) return;
		const childEntry = node[1];
		const charByte = childEntry & 255;
		const childIdx = childEntry >>> 8;
		if (multipleNodeRefs.has(childIdx)) return;
		const childNode = nodes[childIdx];
		const childHeader = childNode[0];
		const childPrefixIdx = (childHeader & NodeHeaderPrefixMask) >>> 9;
		const childBytes = builder.getEntry(childPrefixIdx) || [];
		if (!multiStringRefs.has(childPrefixIdx)) {
			multiStringRefs.add(childPrefixIdx);
			if (childBytes.length >= MAX_AUTO_ADD_TO_STRING_TABLE) return;
		}
		const prefixBytes = [charByte, ...childBytes];
		const prefixIdx = builder.addStringBytes(prefixBytes);
		const newNode = Uint32Array.from(childNode);
		newNode[0] = prefixIdx << 9 | childHeader & ~NodeHeaderPrefixMask;
		nodes[nodeIdx] = newNode;
	}
}
function calcHasMultipleReferences(nodes) {
	const seen = /* @__PURE__ */ new Set();
	const multiple = /* @__PURE__ */ new Set();
	walkNodes(nodes, 0, { before: (nodeIdx) => {
		if (seen.has(nodeIdx)) {
			multiple.add(nodeIdx);
			return true;
		}
		seen.add(nodeIdx);
		return false;
	} });
	return multiple;
}
function walkNodes(nodes, nodeIdx, options) {
	const after = options.after || (() => void 0);
	const before = options.before || (() => void 0);
	function walk(nodeIdx) {
		if (before(nodeIdx)) return;
		const node = nodes[nodeIdx];
		const count = node.length - 1;
		for (let i = 1; i <= count; ++i) walk(node[i] >> 8);
		after(nodeIdx);
	}
	walk(nodeIdx);
}
//#endregion
//#region src/lib/TrieBlob/resolveMap.ts
function resolveMap(map, key, resolve) {
	const r = map.get(key);
	if (r !== void 0) return r;
	const v = resolve(key);
	map.set(key, v);
	return v;
}
//#endregion
//#region src/lib/constants.ts
const COMPOUND_FIX = "+";
const OPTIONAL_COMPOUND_FIX = "*";
const CASE_INSENSITIVE_PREFIX = "~";
const FORBID_PREFIX = "!";
const defaultTrieInfo = Object.freeze({
	compoundCharacter: "+",
	forbiddenWordPrefix: "!",
	stripCaseAndAccentsPrefix: "~",
	suggestionPrefix: ":"
});
//#endregion
//#region src/lib/utils/mergeDefaults.ts
/**
* Creates a new object of type T based upon the field values from `value`.
* n[k] = value[k] ?? default[k] where k must be a field in default.
* Note: it will remove fields not in defaultValue!
* @param value
* @param defaultValue
*/
function mergeDefaults(value, defaultValue) {
	const result = { ...defaultValue };
	if (value) {
		for (const [k, v] of Object.entries(value)) if (k in result) result[k] = v ?? result[k];
	}
	return result;
}
//#endregion
//#region src/lib/utils/mergeOptionalWithDefaults.ts
function mergeOptionalWithDefaults(...options) {
	return options.reduce((acc, opt) => mergeDefaults(opt, acc), defaultTrieInfo);
}
//#endregion
//#region src/lib/TrieBlob/prefix.ts
function matchEntirePrefix(text, prefix) {
	while (!prefix.done) {
		const byte = prefix.cur();
		const charVal = text.cur();
		if (text.done || byte !== charVal) return false;
		prefix.next();
		text.next();
	}
	return true;
}
//#endregion
//#region src/lib/utils/rawData.ts
function toUint8Array(data) {
	return data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
//#endregion
//#region src/lib/TrieBlob/TrieBlobEncoder.ts
const headerSig = "TrieBlob";
const version = "00.01.00";
const endianSig = 67305985;
function getBinaryFormat() {
	return new BinaryFormatBuilder().addString("sig", "Signature \"TrieBlob\"", headerSig).addUint32("endian", "Endianness signature", endianSig).addString("version", "Version string", version).addUint32ArrayPtr("nodes", "Pointer to nodes array").addString("reserved0", "Old Pointer to TrieInfo JSON string", 8).addString("trieInfo", "Pointer to TrieInfo JSON string", 16).addString("characteristics", "Available characteristic values", 8).addUint8ArrayPtr("stringTable", "Pointer to String Table data").addString("reserved", "Reserved space", 64).build();
}
function encodeTrieBlobToBTrie(blob) {
	const builder = new BinaryDataBuilder(getBinaryFormat());
	builder.setPtrUint32Array("nodes", blob.nodes);
	builder.setString("trieInfo", cvtTrieInfoToFlags(blob.info));
	builder.setString("characteristics", cvtTrieCharacteristicsToFlags(blob.characteristics));
	if (blob.stringTable.length) {
		const stringTableData = encodeStringTableToBinary(blob.stringTable, builder.endian);
		builder.setPtrUint8Array("stringTable", stringTableData);
	}
	return builder.build();
}
function decodeTrieBlobToBTrie(blob) {
	const reader = new BinaryDataReader(blob, getBinaryFormat());
	if (reader.getString("sig") !== headerSig) throw new ErrorDecodeTrieBlob("Invalid TrieBlob Header");
	if (reader.getUint32("endian") !== endianSig) {
		reader.reverseEndian();
		assert(reader.getUint32("endian") === endianSig, "Invalid TrieBlob Header after endian conversion");
	}
	const fileVersion = reader.getString("version");
	if (fileVersion !== version) {
		console.warn(`Warning: TrieBlob version mismatch. Expected: ${version}, Found: ${fileVersion}`);
		assert(fileVersion.startsWith(version.slice(0, 6)), "Unsupported TrieBlob version");
	}
	const nodes = reader.getPtrUint32Array("nodes");
	const info = parseTrieInfoFlags(reader.getString("trieInfo"));
	const characteristics = parseTrieCharacteristics(reader.getString("characteristics"));
	return {
		nodes,
		stringTable: decodeStringTableFromBinary(reader.getPtrUint8Array("stringTable"), reader.endian),
		info,
		characteristics
	};
}
var ErrorDecodeTrieBlob = class extends Error {
	constructor(message) {
		super(message);
	}
};
function isBTrieData(data) {
	const buf = toUint8Array(data);
	if (buf.length < 8) return false;
	for (let i = 0; i < 8; i++) if (buf[i] !== headerSig.codePointAt(i)) return false;
	return true;
}
//#endregion
//#region src/lib/TrieBlob/TrieBlobNodeRef.ts
function trieBlobNodeRefToITrieNodeId(ref) {
	return (BigInt(ref.nodeIdx) << 32n) + BigInt(ref.pfx);
}
function iTrieNodeIdToTrieBlobNodeRefParts(id) {
	assert(typeof id === "bigint", "iTrieNodeIdToTrieBlobNodeRefParts: id must be a bigint");
	return {
		nodeIdx: Number(id >> 32n) & 2147483647,
		pfx: Number(id & 4294967295n)
	};
}
//#endregion
//#region src/lib/TrieBlob/TrieBlobIRoot.ts
const EMPTY_KEYS = Object.freeze([]);
const EMPTY_NODES = Object.freeze([]);
const EMPTY_ENTRIES = Object.freeze([]);
var TrieBlobINode = class TrieBlobINode {
	id;
	node;
	eow;
	_keys;
	_hasChildren;
	_size;
	_nodesEntries;
	_entries;
	_values;
	charToIdx;
	trie;
	constructor(trie, node) {
		this.trie = trie;
		this.node = node;
		this.eow = trie.isEow(node);
		this.id = trieBlobNodeRefToITrieNodeId(node);
	}
	/** get keys to children */
	keys() {
		if (this._keys) return this._keys;
		if (!this.hasChildren) return EMPTY_KEYS;
		this._keys = this.getNodesEntries().map(([key]) => key);
		return this._keys;
	}
	values() {
		if (!this.hasChildren) return EMPTY_NODES;
		if (this._values) return this._values;
		this._values = this.entries().map(([, value]) => value);
		return this._values;
	}
	valueAt(keyIdx) {
		if (this._values) return this._values[keyIdx];
		return this.entryAt(keyIdx)[1];
	}
	entries() {
		if (this._entries) return this._entries;
		if (!this.hasChildren) return EMPTY_ENTRIES;
		this._entries = this.getNodesEntries().map(([key, value]) => [key, new TrieBlobINode(this.trie, value)]);
		return this._entries;
	}
	entryAt(keyIdx) {
		if (this._entries) return this._entries[keyIdx];
		return this.entries()[keyIdx];
	}
	/** get child ITrieNode */
	get(char) {
		return this.#getChildNode(char);
	}
	has(char) {
		return this.trie.nodeGetChild(this.node, char) !== void 0;
	}
	hasChildren() {
		return this._hasChildren ??= this.trie.hasChildren(this.node);
	}
	child(keyIdx) {
		return this.valueAt(keyIdx);
	}
	#getChildNodeRef(char) {
		return this.trie.nodeGetChild(this.node, char);
	}
	#getChildNode(char) {
		if (this.charToIdx) {
			const keyIdx = this.charToIdx[char];
			if (keyIdx === void 0) return void 0;
			return this.child(keyIdx);
		}
		const idx = this.#getChildNodeRef(char);
		if (idx === void 0) return void 0;
		return new TrieBlobINode(this.trie, idx);
	}
	getNode(word) {
		const n = this.trie.nodeFindNode(this.node, word);
		return n === void 0 ? void 0 : new TrieBlobINode(this.trie, n);
	}
	findExact(word) {
		return this.trie.nodeFindExact(this.node, word);
	}
	getNodesEntries() {
		return this._nodesEntries ??= this.trie.getChildEntries(this.node);
	}
	get size() {
		return this._size ??= this.getNodesEntries().length;
	}
};
var TrieBlobIRoot = class extends TrieBlobINode {
	find;
	isForbidden;
	hasForbiddenWords;
	hasCompoundWords;
	hasNonStrictWords;
	info;
	constructor(trie, nodeIdx) {
		super(trie, nodeIdx);
		this.info = trie.info;
		this.find = trie.find;
		this.isForbidden = trie.isForbidden;
		this.hasForbiddenWords = trie.hasForbiddenWords;
		this.hasCompoundWords = trie.hasCompoundWords;
		this.hasNonStrictWords = trie.hasNonStrictWords;
	}
	resolveId(id) {
		return new TrieBlobINode(this.trie, this.trie.fromITrieNodeId(id));
	}
	get forbidPrefix() {
		return this.info.forbiddenWordPrefix;
	}
	get compoundFix() {
		return this.info.compoundCharacter;
	}
	get caseInsensitivePrefix() {
		return this.info.stripCaseAndAccentsPrefix;
	}
	get suggestionPrefix() {
		return this.info.suggestionPrefix;
	}
};
//#endregion
//#region src/lib/TrieBlob/TypedArrayCursor.ts
var TypedArrayCursor = class {
	array;
	i;
	done;
	length;
	constructor(array, i = 0, done) {
		this.array = array;
		this.i = i;
		this.length = array.length;
		this.done = (done ?? (i >= this.length ? true : void 0)) || void 0;
	}
	cur() {
		return this.done ? void 0 : this.array[this.i];
	}
	next() {
		if (this.done) return void 0;
		const i = ++this.i;
		if (i >= this.array.length) {
			this.done = true;
			return;
		}
		return this.array[i];
	}
};
function createUint8ArrayCursor(array, i = 0) {
	return new TypedArrayCursor(array, i);
}
//#endregion
//#region src/lib/TrieBlob/Utf8Cursor.ts
var Utf8CursorImpl = class {
	text;
	i;
	code;
	done;
	constructor(text, i = 0) {
		this.text = text;
		this.i = i < 0 ? i = text.length : i;
		this.code = 0;
		this.done = i < 0 || i >= text.length ? true : void 0;
		this.cur();
	}
	cur() {
		if (this.done) return 0;
		this.code ||= encodeTextToUtf8_32Rev(this);
		return this.code & 255;
	}
	next() {
		if (this.done) return 0;
		this.code >>>= 8;
		this.code ||= encodeTextToUtf8_32Rev(this);
		this.done = !this.code && this.i >= this.text.length;
		return this.code & 255;
	}
};
function createTextToUtf8Cursor(text, offset = 0) {
	return new Utf8CursorImpl(text, offset);
}
//#endregion
//#region src/lib/TrieBlob/TrieBlob.ts
var TrieBlob = class TrieBlob {
	info;
	#forbidIdx;
	#compoundIdx;
	#nonStrictIdx;
	#suggestIdx;
	#size;
	#iTrieRoot;
	/** the nodes data in 8 bits */
	#nodes8;
	#stringTable;
	#beAdj = endianness() === "BE" ? 3 : 0;
	#rootRef;
	wordToCharacters = (word) => [...word];
	hasForbiddenWords;
	hasCompoundWords;
	hasNonStrictWords;
	nodes;
	NodeMaskNumChildren;
	NodeChildRefShift;
	hasPreferredSuggestions;
	constructor(nodes, stringTable, info) {
		this.nodes = nodes;
		this.#stringTable = stringTable;
		trieBlobSort(nodes);
		this.info = mergeOptionalWithDefaults(info);
		this.#rootRef = this.toRef(0);
		this.#nodes8 = new Uint8Array(nodes.buffer, nodes.byteOffset + this.#beAdj);
		this.#forbidIdx = this.#findNode(this.#rootRef, this.info.forbiddenWordPrefix);
		this.#compoundIdx = this.#findNode(this.#rootRef, this.info.compoundCharacter);
		this.#nonStrictIdx = this.#findNode(this.#rootRef, this.info.stripCaseAndAccentsPrefix);
		this.#suggestIdx = this.#findNode(this.#rootRef, this.info.suggestionPrefix);
		this.hasForbiddenWords = !!this.#forbidIdx;
		this.hasCompoundWords = !!this.#compoundIdx;
		this.hasNonStrictWords = !!this.#nonStrictIdx;
		this.NodeMaskNumChildren = 255;
		this.NodeChildRefShift = 8;
		this.hasPreferredSuggestions = !!this.#suggestIdx;
	}
	has(word) {
		return this.#hasWord(this.rootRef, word);
	}
	isForbiddenWord(word) {
		return !!this.#forbidIdx && this.#hasWord(this.#forbidIdx, word);
	}
	/**
	* Try to find the word in the trie. The word must be normalized.
	* If `strict` is `true` the case and accents must match.
	* Compound words are supported assuming that the compound character is in the trie.
	*
	* @param word - the word to find (normalized)
	* @param strict - if `true` the case and accents must match.
	*/
	find(word, strict) {
		const found = this.#hasWord(this.rootRef, word);
		if (found || !this.hasCompoundWords) {
			if (found) return {
				found: word,
				compoundUsed: false,
				caseMatched: true,
				forbidden: void 0
			};
			if (strict || !this.#nonStrictIdx) return {
				found: false,
				compoundUsed: false,
				caseMatched: false,
				forbidden: void 0
			};
			return {
				found: this.#hasWord(this.#nonStrictIdx, word) && word,
				compoundUsed: false,
				caseMatched: false,
				forbidden: void 0
			};
		}
	}
	getRoot() {
		return this.#iTrieRoot ??= this._getRoot();
	}
	_getRoot() {
		return new TrieBlobIRoot({
			info: this.info,
			nodes: this.nodes,
			nodeFindExact: this.#hasWord.bind(this),
			nodeGetChild: this.#findNode.bind(this),
			nodeFindNode: this.#findNode.bind(this),
			isEow: this.isRefEOW.bind(this),
			getChildEntries: this.#getChildrenFromRef.bind(this),
			hasChildren: this.hasChildren.bind(this),
			isForbidden: this.isForbiddenWord.bind(this),
			findExact: this.has.bind(this),
			find: this.find.bind(this),
			nodeToITrieNodeId: trieBlobNodeRefToITrieNodeId,
			fromITrieNodeId: iTrieNodeIdToTrieBlobNodeRefParts,
			hasCompoundWords: this.hasCompoundWords,
			hasForbiddenWords: this.hasForbiddenWords,
			hasNonStrictWords: this.hasNonStrictWords,
			hasPreferredSuggestions: this.hasPreferredSuggestions
		}, this.rootRef);
	}
	getNode(prefix) {
		return findNode$1(this.getRoot(), prefix);
	}
	get stringTable() {
		return this.#stringTable;
	}
	/**
	* Check if the word is in the trie starting at the given node index.
	*/
	#hasWord(nodeRef, word) {
		const nodeIdxFound = this.#findNode(nodeRef, word);
		if (!nodeIdxFound) return false;
		return this.isRefEOW(nodeIdxFound);
	}
	/**
	* Find the node index for the given Utf8 character sequence.
	* @param nodeIdx - node index to start the search
	* @param seq - the byte sequence of the character to look for
	* @returns
	*/
	#findNode(nodeRef, text) {
		if (!nodeRef) return void 0;
		const _nodes = this.nodes;
		const _nodes8 = this.#nodes8;
		const pfxShift = 9;
		let { nodeIdx, pfx, prefix } = nodeRef;
		const t = createTextToUtf8Cursor(text);
		for (; !t.done; t.next()) {
			const nodes = _nodes;
			const nodes8 = _nodes8;
			const node = nodes[nodeIdx];
			const prefixIdx = node >>> pfxShift;
			prefix ||= prefixIdx ? this.#stringTable.getStringBytes(prefixIdx) : void 0;
			const pfxCursor = prefix && createUint8ArrayCursor(prefix, pfx);
			if (pfxCursor && !matchEntirePrefix(t, pfxCursor)) return t.done ? {
				nodeIdx,
				pfx: pfxCursor.i,
				prefix
			} : void 0;
			prefix = void 0;
			pfx = 0;
			const charVal = t.cur() & 255;
			const count = node & 255;
			const idx4 = nodeIdx << 2;
			if (count > 15) {
				const pEnd = idx4 + (count << 2);
				let i = idx4 + 4;
				let j = pEnd;
				while (j - i >= 4) {
					const m = i + j >> 1 & -4;
					if (nodes8[m] < charVal) i = m + 4;
					else j = m;
				}
				if (i > pEnd || nodes8[i] !== charVal) return void 0;
				nodeIdx = nodes[i >> 2] >>> 8;
			} else {
				let i = idx4 + count * 4;
				for (; i > idx4; i -= 4) if (nodes8[i] === charVal) break;
				if (i <= idx4) return void 0;
				nodeIdx = nodes[i >> 2] >>> 8;
			}
		}
		return {
			nodeIdx,
			pfx,
			prefix
		};
	}
	/**
	* get an iterable for all the words in the dictionary.
	* @param prefix - optional prefix to filter the words returned. The words will be prefixed with this value.
	*/
	*words(prefix) {
		if (!prefix) {
			yield* this.#walkWords(this.rootRef);
			return;
		}
		const nodeIdx = this.#findNode(this.rootRef, prefix);
		if (!nodeIdx) return;
		for (const suffix of this.#walkWords(nodeIdx)) yield prefix + suffix;
	}
	*#walkWords(rootRef) {
		const NodeMaskNumChildren = 255;
		const NodeMaskEOW = 256;
		const NodeMaskChildCharIndex = 255;
		const NodeChildRefShift = 8;
		const nodeHeaderPrefixShift = 9;
		const nodes = this.nodes;
		const st = this.#stringTable;
		const stack = [{
			nodeIdx: rootRef.nodeIdx,
			pfx: rootRef.pfx,
			pos: 0,
			word: "",
			acc: Utf8Accumulator.create()
		}];
		let depth = 0;
		while (depth >= 0) {
			const s = stack[depth];
			if (!s.pos) applyPrefixString(s);
			const { nodeIdx, pos, word, acc } = s;
			const node = nodes[nodeIdx];
			if (!pos && node & NodeMaskEOW) yield word;
			if (pos >= (node & NodeMaskNumChildren)) {
				--depth;
				continue;
			}
			const entry = nodes[nodeIdx + ++stack[depth].pos];
			const nAcc = acc.clone();
			const codePoint = nAcc.decode(entry & NodeMaskChildCharIndex);
			const letter = codePoint && String.fromCodePoint(codePoint) || "";
			++depth;
			stack[depth] = {
				nodeIdx: entry >>> NodeChildRefShift,
				pos: 0,
				pfx: 0,
				word: word + letter,
				acc: nAcc
			};
		}
		function applyPrefixString(s) {
			const prefixIdx = nodes[s.nodeIdx] >>> nodeHeaderPrefixShift;
			const fullPrefix = prefixIdx ? st.getStringBytes(prefixIdx) : void 0;
			if (!fullPrefix || s.pfx >= fullPrefix.length) return;
			let prefix = fullPrefix;
			if (s.pfx) prefix = prefix.subarray(s.pfx);
			s.word += s.acc.decodeBytesToString(prefix);
			s.pfx = fullPrefix.length;
		}
	}
	get size() {
		if (this.#size) return this.#size;
		const NodeMaskNumChildren = 255;
		const nodes = this.nodes;
		let p = 0;
		let count = 0;
		while (p < nodes.length) {
			++count;
			p += (nodes[p] & NodeMaskNumChildren) + 1;
		}
		this.#size = count;
		return count;
	}
	toJSON() {
		return {
			options: this.info,
			nodes: nodesToJson(this.nodes)
		};
	}
	encodeToBTrie() {
		return this.encodeBin();
	}
	encodeBin() {
		return encodeTrieBlobToBTrie({
			nodes: this.nodes,
			stringTable: this.stringTable,
			info: this.info,
			characteristics: this
		});
	}
	static decodeBin(blob) {
		const info = decodeTrieBlobToBTrie(blob);
		return new TrieBlob(info.nodes, info.stringTable, info.info);
	}
	/**
	* Walk the trie starting at the given reference at position 0 (or depth).
	* @param stack - the stack used while walking - updated
	* @param depth - that starting depth in the stack
	* @yields the depth in the stack. The stack will contain the current Reference.
	*/
	*#walk(stack, depth = 0) {
		const MaskNumChildren = 255;
		const NodeRefShift = 8;
		const CharMask = 255;
		const PrefixMask = NodeHeaderPrefixMask;
		const PrefixShift = 9;
		const nodes = this.nodes;
		stack[0] ||= {
			nodeIdx: 0,
			pfx: 0,
			pos: 0,
			prefix: void 0,
			bChar: 0
		};
		while (depth >= 0) {
			let s = stack[depth];
			const { nodeIdx, pos, pfx, prefix } = s;
			if (!pos) {
				if (!(yield depth)) {
					--depth;
					continue;
				}
			}
			if (prefix) {
				if (pos) {
					--depth;
					continue;
				}
				s.pos = 1;
				++depth;
				stack[depth] ||= {
					nodeIdx: 0,
					pfx: 0,
					pos: 0,
					prefix: void 0,
					bChar: 0
				};
				s = stack[depth];
				s.nodeIdx = nodeIdx;
				s.pfx = pfx + 1;
				s.pos = 0;
				s.prefix = s.pfx < prefix.length ? prefix : void 0;
				s.bChar = prefix[pfx];
				continue;
			}
			if (pos >= (nodes[nodeIdx] & MaskNumChildren)) {
				--depth;
				continue;
			}
			const entry = nodes[nodeIdx + ++s.pos];
			const eNodeIdx = entry >>> NodeRefShift;
			++depth;
			stack[depth] ||= {
				nodeIdx: 0,
				pfx: 0,
				pos: 0,
				prefix: void 0,
				bChar: 0
			};
			s = stack[depth];
			s.nodeIdx = eNodeIdx;
			s.pfx = 0;
			s.pos = 0;
			const pfxV = nodes[eNodeIdx] & PrefixMask;
			s.prefix = pfxV ? this.#stringTable.getStringBytes(pfxV >>> PrefixShift) : void 0;
			s.bChar = entry & CharMask;
		}
	}
	getChildrenFromRef(ref) {
		return this.#getChildrenFromRef(this.#cvtToRefPfx(ref));
	}
	hasChildren(ref) {
		const node = this.nodes[ref.nodeIdx];
		const pfxV = node & NodeHeaderPrefixMask;
		const has = (node & 255) !== 0;
		if (!pfxV) return has;
		if (isRefPfx(ref)) return ref.prefix ? true : has;
		ref = this.#cvtToRefPfx(ref);
		return ref.prefix ? true : has;
	}
	#getChildrenFromRef(ref) {
		const accStack = [Utf8Accumulator.create()];
		const stack = [{
			...ref,
			pos: 0,
			bChar: 0
		}];
		const results = [];
		const iterable = this.#walk(stack);
		let deeper = false;
		for (let next = iterable.next(true); !next.done; next = iterable.next(deeper)) {
			const depth = next.value;
			if (depth <= 0) {
				if (!depth) {
					deeper = true;
					continue;
				}
				break;
			}
			const s = stack[depth];
			accStack[depth] = accStack[depth - 1].clone(accStack[depth]);
			const char = accStack[depth].decode(s.bChar);
			if (char) {
				deeper = false;
				results.push([String.fromCodePoint(char), {
					nodeIdx: s.nodeIdx,
					pfx: s.pfx,
					prefix: s.prefix
				}]);
				continue;
			}
			deeper = true;
		}
		return results;
	}
	/**
	* Checks if a location is at an end-of-word node.
	* @param ref
	* @returns
	*/
	isRefEOW(ref) {
		if (ref.prefix && ref.pfx < ref.prefix.length) return false;
		return !!(this.nodes[ref.nodeIdx] & 256);
	}
	#getNodePrefix(nodeIdx, pfx) {
		const pfxV = this.nodes[nodeIdx] & NodeHeaderPrefixMask;
		const prefix = pfxV ? this.#stringTable.getStringBytes(pfxV >>> 9) : void 0;
		if (!prefix) return void 0;
		if (pfx >= prefix.length) return void 0;
		return prefix;
	}
	#cvtToRefPfx(ref) {
		if (isRefPfx(ref)) return ref;
		const refPfx = ref;
		refPfx.prefix = this.#getNodePrefix(ref.nodeIdx, ref.pfx);
		return refPfx;
	}
	toRef(nodeIdx, pfx = 0) {
		return this.#cvtToRefPfx({
			nodeIdx,
			pfx
		});
	}
	get rootRef() {
		return this.#rootRef;
	}
	getNodeDebugInfo(ref) {
		const node = this.nodes[ref.nodeIdx];
		const isEOW = !!(node & 256);
		const count = node & 255;
		const children = /* @__PURE__ */ new Map();
		for (let i = 1; i <= count; ++i) {
			const entry = this.nodes[ref.nodeIdx + i];
			const c = entry & 255;
			const idx = entry >>> 8;
			children.set(charToHex(c), numberToHex(idx) + " " + idx);
		}
		return {
			...ref,
			prefix: ref.prefix ? [...ref.prefix].map(charToHex).join(", ") : "",
			isEOW,
			count,
			children
		};
	}
	static copyNodes(trie) {
		return new Uint32Array(trie.nodes);
	}
};
function nodesToJson(nodes) {
	function nodeElement(offset) {
		const node = nodes[offset];
		const numChildren = node & 255;
		const eow = !!(node & 256);
		const children = [];
		for (let i = 1; i <= numChildren; ++i) children.push({
			c: ("00" + (nodes[offset + i] & 255).toString(16)).slice(-2),
			o: nodes[offset + i] >>> 8
		});
		return {
			id: offset,
			eow,
			n: offset + numChildren + 1,
			c: children
		};
	}
	const elements = [];
	let offset = 0;
	while (offset < nodes.length) {
		const e = nodeElement(offset);
		elements.push(e);
		offset = e.n;
	}
	return elements;
}
/**
* Sorts the child nodes in the trie to ensure binary lookup works.
* @param data
*/
function trieBlobSort(data) {
	const MaskNumChildren = 255;
	const MaskChildCharIndex = 255;
	const limit = data.length;
	let idx = 0;
	let node = data[0];
	let nc = node & MaskNumChildren;
	for (; idx < limit; idx += nc + 1, node = data[idx], nc = node & MaskNumChildren) {
		if (!nc) continue;
		const start = idx + 1;
		const end = start + nc;
		let last = 0;
		let i = start;
		for (; i < end; ++i) {
			const cIdx = data[i] & MaskChildCharIndex;
			if (last >= cIdx) break;
			last = cIdx;
		}
		if (i === end) continue;
		data.slice(start, end).sort((a, b) => (a & MaskChildCharIndex) - (b & MaskChildCharIndex)).forEach((v, i) => data[start + i] = v);
	}
}
function numberToHex(n) {
	const digits = n.toString(16).padStart(8, "0");
	return "0x" + digits.slice(0, 4) + "_" + digits.slice(4);
}
function charToHex(c) {
	return c.toString(16).padStart(2, "0") + " " + (c >= 32 && c <= 126 ? String.fromCodePoint(c) : ".");
}
function isRefPfx(ref) {
	return "prefix" in ref;
}
//#endregion
//#region src/lib/TrieBlob/TrieBuilderUtils.ts
/**
* Sorts the nodes in place if possible.
* @param nodes
* @param mask
* @returns
*/
function sortNodes(nodes, mask) {
	const endPerf = measurePerf("TrieBlobBuilder.sortNodes");
	for (let i = 0; i < nodes.length; ++i) {
		const node = nodes[i];
		if (node.length <= 2 || isSorted(node, mask, 1)) continue;
		sortSubArray(node, mask, 1);
	}
	endPerf();
	return nodes;
}
function sortSubArray(node, mask, startAt) {
	const compare = (a, b) => !a ? -1 : !b ? 1 : (a & mask) - (b & mask);
	if (node.subarray === void 0) {
		const header = node[0];
		node[0] = Number.MIN_SAFE_INTEGER;
		node.sort(compare);
		node[0] = header;
		return;
	}
	node.subarray(startAt).sort(compare);
}
function isSorted(node, mask, start, end) {
	if (node.length > 2) {
		const limit = end ?? node.length;
		let last = -1;
		for (let j = start; j < limit; ++j) {
			const n = node[j] & mask;
			if (n < last) return false;
			last = n;
		}
	}
	return true;
}
function toTrieBlob(nodes, stringTable, info) {
	const endPerf = measurePerf("TrieBlob.toTrieBlob");
	const nodeMaskChildCharIndex = 255;
	const nodeChildRefShift = 8;
	function calcNodeToIndex(nodes) {
		let offset = 0;
		const idx = Array(nodes.length + 1);
		for (let i = 0; i < nodes.length; ++i) {
			idx[i] = offset;
			offset += nodes[i].length;
		}
		idx[nodes.length] = offset;
		return idx;
	}
	const nodeToIndex = calcNodeToIndex(nodes);
	const nodeElementCount = nodeToIndex[nodeToIndex.length - 1];
	const binNodes = new Uint32Array(nodeElementCount);
	const lenShift = 0;
	const refShift = 8;
	const NodeHeaderMask = -256;
	let offset = 0;
	for (let i = 0; i < nodes.length; ++i) {
		const node = nodes[i];
		binNodes[offset++] = node.length - 1 << lenShift | node[0] & NodeHeaderMask;
		for (let j = 1; j < node.length; ++j) {
			const v = node[j];
			const nodeRef = v >>> nodeChildRefShift;
			const charIndex = v & nodeMaskChildCharIndex;
			binNodes[offset++] = nodeToIndex[nodeRef] << refShift | charIndex;
		}
	}
	const t = new TrieBlob(binNodes, stringTable, info);
	endPerf();
	return t;
}
//#endregion
//#region src/lib/TrieBlob/TrieBlobBuilder.ts
const AUTO_OPTIMIZE_NODE_COUNT = 0;
var TrieBlobBuilder = class TrieBlobBuilder {
	charIndex = new CharIndexBuilder();
	nodes;
	_readonly = false;
	IdxEOW;
	_cursor;
	_cursorId = 0;
	wordToCharacters = (word) => [...word];
	#infoBuilder;
	constructor(options, characteristics) {
		this.nodes = [[0], Object.freeze([256])];
		this.IdxEOW = 1;
		this.#infoBuilder = new TrieInfoBuilder(options, characteristics);
	}
	setOptions(options) {
		this.#infoBuilder.setInfo(options);
		return this.#infoBuilder.getActiveInfo();
	}
	get options() {
		return this.#infoBuilder.getActiveInfo();
	}
	wordToUtf8Seq(word) {
		return this.charIndex.wordToUtf8Seq(word);
	}
	letterToUtf8Seq(letter) {
		return this.charIndex.charToUtf8Seq(letter);
	}
	insert(word) {
		this.#assertNotReadonly();
		if (typeof word === "string") return this.#insertWord(word);
		return this.insertWords(word);
	}
	getCursor() {
		this.#assertNotReadonly();
		this._cursor ??= this.createCursor(++this._cursorId);
		return this._cursor;
	}
	createCursor(id) {
		const endPerf = measurePerf("TrieBlobBuilder.cursor");
		const nodeChildRefShift = 8;
		const NodeMaskEOW = 256;
		const LetterMask = 255;
		const refNodes = [0, 1];
		const lookupCharCode = createCharUtf8_32RevLookup();
		let disposed = false;
		const dispose = () => {
			if (disposed) return;
			endPerf();
			disposed = true;
			if (this._cursorId === id) this._cursor = void 0;
		};
		function childPos(node, letterIdx) {
			for (let i = 1; i < node.length; ++i) if ((node[i] & LetterMask) === letterIdx) return i;
			return 0;
		}
		assert(this.nodes.length === 2);
		const eowNodeIndex = 1;
		const eowShifted = eowNodeIndex << nodeChildRefShift;
		const nodes = this.nodes;
		const stack = [{
			nodeIdx: 0,
			pos: 0,
			pDepth: -1
		}];
		let nodeIdx = 0;
		let depth = 0;
		/**
		* Asserts that the cursor has not been disposed and is still valid.
		* There can be only one valid cursor per builder at a time.
		*/
		const assertNotDisposed = () => {
			assert(!disposed, "Cursor has been disposed");
			assert(id === this._cursorId, "Cursor is no longer valid");
		};
		/**
		* A single character can result in multiple nodes being created
		* because it takes multiple bytes to represent a character.
		* @param char - character to insert.
		*/
		function insertChar(char) {
			assertNotDisposed();
			if (!nodes[nodeIdx]) refNodes.push(nodeIdx);
			const pDepth = depth;
			for (let encoded = lookupCharCode(char); encoded; encoded >>>= 8) insertCharByteCode(encoded & 255, pDepth);
		}
		/**
		* A single character can result in multiple nodes being created
		* because it takes multiple bytes to represent a character.
		* @param byte - partial character index.
		*/
		function insertCharByteCode(byte, pDepth) {
			if (nodes[nodeIdx] && Object.isFrozen(nodes[nodeIdx])) {
				nodeIdx = nodes.push([...nodes[nodeIdx]]) - 1;
				const { pos, nodeIdx: pNodeIdx } = stack[depth];
				const pNode = nodes[pNodeIdx];
				pNode[pos] = pNode[pos] & LetterMask | nodeIdx << nodeChildRefShift;
			}
			const node = nodes[nodeIdx] || [0];
			nodes[nodeIdx] = node;
			const hasIdx = childPos(node, byte);
			const childIdx = hasIdx ? node[hasIdx] >>> nodeChildRefShift : nodes.length;
			const pos = hasIdx || node.push(childIdx << nodeChildRefShift | byte) - 1;
			++depth;
			const s = stack[depth];
			if (s) {
				s.nodeIdx = nodeIdx;
				s.pos = pos;
				s.pDepth = pDepth;
			} else stack[depth] = {
				nodeIdx,
				pos,
				pDepth
			};
			nodeIdx = childIdx;
		}
		function markEOW() {
			assertNotDisposed();
			if (nodeIdx === eowNodeIndex) return;
			const node = nodes[nodeIdx];
			if (!node) {
				const { pos, nodeIdx: pNodeIdx } = stack[depth];
				const pNode = nodes[pNodeIdx];
				pNode[pos] = pNode[pos] & LetterMask | eowShifted;
			} else {
				nodes[nodeIdx] = node;
				node[0] |= NodeMaskEOW;
			}
			nodeIdx = eowNodeIndex;
		}
		function reference(refId) {
			assertNotDisposed();
			const refNodeIdx = refNodes[refId];
			assert(refNodeIdx !== void 0);
			assert(nodes[nodeIdx] === void 0);
			assert(nodes[refNodeIdx]);
			Object.freeze(nodes[refNodeIdx]);
			const s = stack[depth];
			nodeIdx = s.nodeIdx;
			const pos = s.pos;
			const node = nodes[nodeIdx];
			node[pos] = refNodeIdx << nodeChildRefShift | node[pos] & LetterMask;
		}
		function backStep(num) {
			assertNotDisposed();
			if (!num) return;
			assert(num <= depth && num > 0);
			for (let n = num; n > 0; --n) depth = stack[depth].pDepth;
			nodeIdx = stack[depth + 1].nodeIdx;
		}
		return {
			insertChar,
			markEOW,
			reference,
			backStep,
			dispose,
			[Symbol.dispose]: dispose
		};
	}
	/**
	* Insert multiple words. Performance is (~10%) better if the words are sorted.
	* @param words - words to insert
	* @returns this
	*/
	insertWords(words) {
		for (const word of words) this.#insertWord(word);
		return this;
	}
	#insertWord(word) {
		word = word.trim();
		if (!word) return this;
		this.#infoBuilder.addWord(word);
		const NodeMaskChildCharIndex = 255;
		const nodeChildRefShift = 8;
		const NodeMaskEOW = 256;
		const IdxEOW = this.IdxEOW;
		const nodes = this.nodes;
		let nodeIdx = 0;
		const wLen = word.length;
		const bytes = [];
		for (const t = {
			text: word,
			i: 0
		}; t.i < wLen;) {
			const isLastChar = t.i >= wLen - 1;
			for (let utf8Code = encodeTextToUtf8_32Rev(t); utf8Code; utf8Code >>>= 8) {
				const seq = utf8Code & 255;
				bytes.push(seq);
				const node = nodes[nodeIdx];
				let i = node.length - 1;
				for (; i > 0; --i) if ((node[i] & NodeMaskChildCharIndex) === seq) break;
				const isEow = isLastChar && utf8Code <= 255;
				if (i > 0) {
					nodeIdx = node[i] >>> nodeChildRefShift;
					if (nodeIdx === 1 && !isEow) {
						nodeIdx = this.nodes.push([NodeMaskEOW]) - 1;
						node[i] = nodeIdx << nodeChildRefShift | seq;
					}
					continue;
				}
				nodeIdx = isEow ? IdxEOW : this.nodes.push([0]) - 1;
				node.push(nodeIdx << nodeChildRefShift | seq);
			}
		}
		if (nodeIdx > 1) {
			const node = nodes[nodeIdx];
			node[0] |= NodeMaskEOW;
		}
		return this;
	}
	has(word) {
		const NodeMaskChildCharIndex = 255;
		const nodeChildRefShift = 8;
		const NodeMaskEOW = 256;
		const nodes = this.nodes;
		const charIndexes = this.wordToUtf8Seq(word);
		const len = charIndexes.length;
		let nodeIdx = 0;
		let node = nodes[nodeIdx];
		for (let p = 0; p < len; ++p, node = nodes[nodeIdx]) {
			const letterIdx = charIndexes[p];
			let i = node.length - 1;
			for (; i > 0; --i) if ((node[i] & NodeMaskChildCharIndex) === letterIdx) break;
			if (i < 1) return false;
			nodeIdx = node[i] >>> nodeChildRefShift;
		}
		return !!(node[0] & NodeMaskEOW);
	}
	isReadonly() {
		return this._readonly;
	}
	freeze() {
		this._readonly = true;
		return this;
	}
	copyNodes() {
		return this.nodes.map((n) => [...n]);
	}
	build(buildOptions) {
		this._cursor?.dispose?.();
		this._readonly = true;
		this.freeze();
		const endPerf = measurePerf("TrieBlobBuilder.build");
		const { optimize, useStringTable } = buildOptions || {};
		const info = this.#infoBuilder.build();
		const bNodes = this.nodes;
		let sortedNodes = sortNodes(bNodes, 255);
		if (optimize ?? sortNodes.length < AUTO_OPTIMIZE_NODE_COUNT) sortedNodes = optimizeNodes(sortedNodes);
		const stringTable = new StringTableBuilder().build();
		const r = useStringTable ? optimizeNodesWithStringTable({
			nodes: sortedNodes,
			stringTable
		}) : {
			nodes: sortedNodes,
			stringTable
		};
		const data = toTrieBlob(r.nodes, r.stringTable, normalizeTrieInfo(info.info));
		endPerf();
		return data;
	}
	toJSON() {
		return {
			options: this.options,
			nodes: this.nodes
		};
	}
	#assertNotReadonly() {
		assert(!this.isReadonly(), "FastTrieBlobBuilder is readonly");
	}
	static fromWordList(words, options, buildOptions) {
		return new TrieBlobBuilder(options).insert(words).build(buildOptions);
	}
	/**
	* Create a TrieBlob from a TrieRoot.
	*
	* This is equivalent to, but slightly faster because it avoids creating an ITrieNodes
	* ```ts
	* static fromTrieRoot(root: TrieRoot, optimize?: boolean): TrieBlob {
	*   return this.fromITrieRoot(trieRootToITrieRoot(root), optimize);
	* }
	* ```
	*
	* @param root - TrieRoot
	* @param buildOptions - optional build options
	* @returns TrieBlob
	*/
	static fromTrieRoot(root, buildOptions) {
		const endPerf = measurePerf("TrieBlobBuilder.fromTrieRoot");
		const NodeCharIndexMask = 255;
		const nodeChildRefShift = 8;
		const NodeMaskEOW = 256;
		const tf = new TrieBlobBuilder(void 0, root);
		const IdxEOW = tf.IdxEOW;
		const known = new Map([[root, 0]]);
		function resolveNode(n) {
			if (n.f && !n.c) return IdxEOW;
			const node = [n.f ? NodeMaskEOW : 0];
			return tf.nodes.push(node) - 1;
		}
		function walk(n) {
			const found = known.get(n);
			if (found) return found;
			const nodeIdx = resolveMap(known, n, resolveNode);
			const node = tf.nodes[nodeIdx];
			if (!n.c) return nodeIdx;
			const children = Object.entries(n.c);
			for (let p = 0; p < children.length; ++p) {
				const [char, childNode] = children[p];
				addCharToNode(node, char, childNode);
			}
			return nodeIdx;
		}
		function resolveChild(node, charIndex) {
			let i = 1;
			for (; i < node.length && (node[i] & NodeCharIndexMask) !== charIndex; ++i);
			return i;
		}
		function addCharToNode(node, char, n) {
			const indexSeq = tf.letterToUtf8Seq(char);
			assertValidUtf16Character(char);
			for (const idx of indexSeq.slice(0, -1)) {
				const pos = resolveChild(node, idx);
				if (pos < node.length) node = tf.nodes[node[pos] >>> nodeChildRefShift];
				else {
					const next = [0];
					const nodeIdx = tf.nodes.push(next) - 1;
					node[pos] = nodeIdx << nodeChildRefShift | idx;
					node = next;
				}
			}
			const letterIdx = indexSeq[indexSeq.length - 1];
			const i = node.push(letterIdx) - 1;
			node[i] = walk(n) << nodeChildRefShift | letterIdx;
		}
		walk(root);
		const result = tf.build(buildOptions);
		endPerf();
		return result;
	}
	/**
	* Create a TrieBlob from a TrieRoot.
	*
	* @param root - root node
	* @param buildOptions - optional build options
	* @returns TrieBlob
	*/
	static fromITrieRoot(root, buildOptions) {
		const endPerf = measurePerf("TrieBlobBuilder.fromITrieRoot");
		const NodeCharIndexMask = 255;
		const nodeChildRefShift = 8;
		const NodeMaskEOW = 256;
		const tf = new TrieBlobBuilder(void 0, root);
		const IdxEOW = tf.IdxEOW;
		const known = new Map([[root.id, 0]]);
		function resolveNode(n) {
			if (n.eow && !n.hasChildren()) return IdxEOW;
			const node = [n.eow ? NodeMaskEOW : 0];
			return tf.nodes.push(node) - 1;
		}
		function walk(n) {
			const found = known.get(n.id);
			if (found) return found;
			const nodeIdx = resolveMap(known, n.id, () => resolveNode(n));
			const node = tf.nodes[nodeIdx];
			if (!n.hasChildren()) return nodeIdx;
			const children = n.entries();
			for (const [char, childNode] of children) addCharToNode(node, char, childNode);
			return nodeIdx;
		}
		function resolveChild(node, charIndex) {
			let i = 1;
			for (; i < node.length && (node[i] & NodeCharIndexMask) !== charIndex; ++i);
			return i;
		}
		function addCharToNode(node, char, n) {
			const indexSeq = tf.letterToUtf8Seq(char);
			assertValidUtf16Character(char);
			for (const idx of indexSeq.slice(0, -1)) {
				const pos = resolveChild(node, idx);
				if (pos < node.length) node = tf.nodes[node[pos] >>> nodeChildRefShift];
				else {
					const next = [0];
					const nodeIdx = tf.nodes.push(next) - 1;
					node[pos] = nodeIdx << nodeChildRefShift | idx;
					node = next;
				}
			}
			const letterIdx = indexSeq[indexSeq.length - 1];
			const i = node.push(letterIdx) - 1;
			node[i] = walk(n) << nodeChildRefShift | letterIdx;
		}
		walk(root);
		const result = tf.build(buildOptions);
		endPerf();
		return result;
	}
};
function createCharUtf8_32RevLookup(maxSize = 256) {
	let size = 0;
	let map = Object.create(null);
	return (char) => {
		let code = map[char];
		if (!code) {
			size++;
			if (size >= maxSize) {
				size = 1;
				map = Object.create(null);
			}
			code = encodeToUtf8_32Rev(char.codePointAt(0) || 0);
			map[char] = code;
		}
		return code;
	};
}
//#endregion
//#region src/lib/utils/clean.ts
function clean(t) {
	const copy = { ...t };
	for (const key of Object.keys(copy)) if (copy[key] === void 0) delete copy[key];
	return copy;
}
//#endregion
//#region src/lib/ITrie.ts
const defaultLegacyMinCompoundLength$1 = 3;
const cvtFindWordOptions = memorizeLastCall(_cvtFindWordOptions);
function _cvtFindWordOptions(options) {
	return createFindOptions$1({
		matchCase: options?.caseSensitive,
		checkForbidden: options?.checkForbidden,
		compoundSeparator: options?.compoundSeparator
	});
}
var ITrieImpl = class ITrieImpl {
	_info;
	root;
	count;
	weightMap;
	#optionsCompound = this.createFindOptions({ compoundMode: "compound" });
	#findOptionsT = {
		caseSensitive: true,
		checkForbidden: true
	};
	#findOptionsF = {
		caseSensitive: false,
		checkForbidden: true
	};
	hasForbiddenWords;
	hasCompoundWords;
	hasNonStrictWords;
	data;
	constructor(data) {
		this.data = data;
		this.root = data.getRoot();
		this._info = mergeOptionalWithDefaults(data.info);
		this.hasForbiddenWords = data.hasForbiddenWords;
		this.hasCompoundWords = data.hasCompoundWords;
		this.hasNonStrictWords = data.hasNonStrictWords;
	}
	/**
	* Number of words in the Trie, the first call to this method might be expensive.
	* Use `size` to get the number of nodes.
	*/
	numWords() {
		this.count ??= countWords$1(this.root);
		return this.count;
	}
	isNumWordsKnown() {
		return this.count !== void 0;
	}
	get size() {
		return this.data.size;
	}
	get info() {
		return this._info;
	}
	/**
	* @param text - text to find in the Trie
	*/
	find(text) {
		return findWordNode$1(this.data.getRoot(), text, this.#optionsCompound).node;
	}
	/**
	* A case sensitive search for the word.
	* @param word - the word to search for.
	* @param minLegacyCompoundLength - minimum length of legacy compounds to consider.
	* @returns true if the word is found and not forbidden.
	*/
	has(word, minLegacyCompoundLength) {
		if (minLegacyCompoundLength !== void 0) return this.#hasLegacy(word, minLegacyCompoundLength);
		return this.hasWord(word, true);
	}
	#hasLegacy(word, minLegacyCompoundLength) {
		if (this.hasWord(word, false)) return true;
		if (minLegacyCompoundLength) {
			const f = this.findWord(word, {
				useLegacyWordCompounds: minLegacyCompoundLength,
				caseSensitive: false,
				checkForbidden: true
			});
			return !!f.found && !f.forbidden;
		}
		return false;
	}
	/**
	* Determine if a word is in the dictionary.
	* @param word - the exact word to search for - must be normalized.
	* @param caseSensitive - false means also searching a dictionary where the words were normalized to lower case and accents removed.
	* @returns true if the word was found and is not forbidden.
	*/
	hasWord(word, caseSensitive) {
		const options = caseSensitive ? this.#findOptionsT : this.#findOptionsF;
		const r = this.findWord(word, options);
		return !r.forbidden && !!r.found;
	}
	findWord(word, options) {
		if (options?.useLegacyWordCompounds) {
			const len = options.useLegacyWordCompounds !== true ? options.useLegacyWordCompounds : defaultLegacyMinCompoundLength$1;
			const findOptions = this.createFindOptions({
				legacyMinCompoundLength: len,
				matchCase: options.caseSensitive || false,
				compoundSeparator: void 0
			});
			return findLegacyCompound$1(this.root, word, findOptions);
		}
		return findWord$1(this.root, word, cvtFindWordOptions(options));
	}
	/**
	* Determine if a word is in the forbidden word list.
	* @param word the word to lookup.
	*/
	isForbiddenWord(word) {
		return this.hasForbiddenWords && isForbiddenWord$1(this.root, word, this.info.forbiddenWordPrefix);
	}
	/**
	* Provides an ordered sequence of words with the prefix of text.
	*/
	completeWord(text) {
		const n = this.find(text);
		const compoundChar = this.info.compoundCharacter;
		const subNodes = pipeSync(n ? iteratorTrieWords$1(n) : [], opFilterSync((w) => w[w.length - 1] !== compoundChar), opMapSync((suffix) => text + suffix));
		return pipeSync(n && n.eow ? [text] : [], opAppendSync(subNodes));
	}
	/**
	* Checks to see if there are preferred suggestions for the given text.
	* @param text
	*/
	wordHasPreferredSuggestions(text) {
		return this.has(this.info.suggestionPrefix + text);
	}
	/**
	* Get preferred suggestions for the given text.
	* @param text - the exact word to search for.
	*/
	getPreferredSuggestions(text) {
		const prefix = text + this.info.suggestionPrefix;
		return pipeSync(this.getAllPreferredSuggestions(prefix), opMapSync((s) => s.slice(prefix.length)));
	}
	/**
	* Get a list of all preferred suggestions in the trie.
	* They are returned in order and in the following format:
	* ```
	* <word1>:<suggestion1>
	* <word1>:<suggestion2>
	* <word2>:<suggestion1>
	* ```
	*
	* If `startingWith` is provided, only words that start with the prefix are returned.
	*
	* @param startingWith - optional prefix to filter the words returned.
	*/
	getAllPreferredSuggestions(startingWith = "") {
		const regexpSugIndex = /:[0-9a-f]{1,2}:/;
		const sugPrefix = this.info.suggestionPrefix;
		return pipeSync(this.data.words(sugPrefix + startingWith), opMapSync((result) => result.slice(1).replace(regexpSugIndex, ":")), opFilterSync((w) => w.includes(":")));
	}
	/**
	* Checks to see if the trie contains preferred suggestions for any words.
	*/
	get hasPreferredSuggestions() {
		return this.data.hasPreferredSuggestions;
	}
	/**
	* Suggest spellings for `text`.  The results are sorted by edit distance with changes near the beginning of a word having a greater impact.
	* @param text - the text to search for
	* @param maxNumSuggestions - the maximum number of suggestions to return.
	* @param compoundMethod - Use to control splitting words.
	* @param numChanges - the maximum number of changes allowed to text. This is an approximate value, since some changes cost less than others.
	*                      the lower the value, the faster results are returned. Values less than 4 are best.
	*/
	suggest(text, options) {
		return this.suggestWithCost(text, options).map((a) => a.word);
	}
	/**
	* Suggest spellings for `text`.  The results are sorted by edit distance with changes near the beginning of a word having a greater impact.
	* The results include the word and adjusted edit cost.  This is useful for merging results from multiple tries.
	*/
	suggestWithCost(text, options) {
		const sep = options.compoundSeparator;
		const weightMap = options.weightMap || this.weightMap;
		const adjWord = sep ? replaceAllFactory(sep, "") : (a) => a;
		const optFilter = options.filter;
		const filter = optFilter ? (word, cost) => {
			const w = adjWord(word);
			return !this.isForbiddenWord(w) && optFilter(w, cost);
		} : (word) => !this.isForbiddenWord(adjWord(word));
		const opts = {
			...options,
			filter,
			weightMap
		};
		return suggestAStar(this.data, text, opts);
	}
	/**
	* genSuggestions will generate suggestions and send them to `collector`. `collector` is responsible for returning the max acceptable cost.
	* Costs are measured in weighted changes. A cost of 100 is the same as 1 edit. Some edits are considered cheaper.
	* Returning a MaxCost < 0 will effectively cause the search for suggestions to stop.
	*/
	genSuggestions(collector, compoundMethod) {
		const filter = (word) => !this.isForbiddenWord(word);
		const options = createSuggestionOptions(clean({
			compoundMethod,
			...collector.genSuggestionOptions
		}));
		const suggestions = getSuggestionsAStar(this.data, collector.word, options);
		collector.collect(suggestions, void 0, filter);
	}
	/**
	* Returns an iterator that can be used to get all words in the trie. For some dictionaries, this can result in millions of words.
	* Note: this will not compound words automatically.
	* @param prefix - optional prefix to filter the words returned. The words will be prefixed with this value.
	*/
	words(prefix) {
		return this.data.words(prefix);
	}
	/**
	* Allows iteration over the entire tree.
	* On the returned Iterator, calling .next(goDeeper: boolean), allows for controlling the depth.
	*/
	iterate() {
		return walker$1(this.root);
	}
	static create(words, info) {
		const builder = new TrieBlobBuilder(info);
		builder.insert(words);
		return new ITrieImpl(builder.build());
	}
	createFindOptions(options) {
		return createFindOptions$1(options);
	}
};
//#endregion
//#region src/lib/buildITrie.ts
function buildITrieFromWords(words, info = {}, buildOptions) {
	const endPerf = measurePerf("buildITrieFromWords");
	try {
		const builder = new TrieBlobBuilder(info);
		builder.insert(words);
		return new ITrieImpl(builder.build(buildOptions));
	} finally {
		endPerf();
	}
}
//#endregion
//#region src/lib/utils/isValidChar.ts
function isValidChar(char) {
	return isValidUtf16Character(char);
}
function assertIsValidChar(char, message) {
	if (!isValidChar(char)) assert(false, `${message} "${char}" ${formatCharCodes(char)}`);
}
function formatCharCodes(char) {
	return char.split("").map((c) => "0x" + c.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()).join(":");
}
//#endregion
//#region src/lib/TrieNode/TrieNode.ts
const FLAG_WORD = 1;
//#endregion
//#region src/lib/TrieNode/trie-util.ts
function insert(word, root = {}) {
	const text = [...word];
	let node = root;
	for (let i = 0; i < text.length; ++i) {
		const head = text[i];
		const c = node.c || Object.create(null);
		node.c = c;
		node = c[head] || {};
		c[head] = node;
	}
	node.f = (node.f || 0) | 1;
	return root;
}
function isWordTerminationNode(node) {
	return ((node.f || 0) & 1) === 1;
}
/**
* Sorts the nodes in a trie in place.
*/
function orderTrie(node) {
	if (!node.c) return;
	const nodes = Object.entries(node.c).sort(([a], [b]) => a < b ? -1 : 1);
	node.c = Object.fromEntries(nodes);
	for (const n of nodes) orderTrie(n[1]);
}
/**
* Generator an iterator that will walk the Trie parent then children in a depth first fashion that preserves sorted order.
*/
function walk(node) {
	return walker(node);
}
const iterateTrie = walk;
/**
* Generate a Iterator that can walk a Trie and yield the words.
*/
function iteratorTrieWords(node) {
	return walkerWords(node);
}
function createTrieRoot(options) {
	return new CTrieRoot(options);
}
function createTrieRootFromList(words, options) {
	const root = createTrieRoot(options);
	for (const word of words) if (word.length) insert(word, root);
	return root;
}
function has(node, word) {
	let h = word.slice(0, 1);
	let t = word.slice(1);
	while (node.c && h in node.c) {
		node = node.c[h];
		h = t.slice(0, 1);
		t = t.slice(1);
	}
	return !h.length && !!((node.f || 0) & 1);
}
function findNode(node, word) {
	for (let i = 0; i < word.length; ++i) {
		const n = node.c?.[word[i]];
		if (!n) return void 0;
		node = n;
	}
	return node;
}
function countNodes(root) {
	const seen = /* @__PURE__ */ new Set();
	function walk(n) {
		if (seen.has(n)) return;
		seen.add(n);
		if (n.c) Object.values(n.c).forEach((n) => walk(n));
	}
	walk(root);
	return seen.size;
}
function countWords(root) {
	const visited = /* @__PURE__ */ new Map();
	function walk(n) {
		if (visited.has(n)) return visited.get(n);
		let cnt = n.f ? 1 : 0;
		visited.set(n, cnt);
		if (!n.c) return cnt;
		for (const c of Object.values(n.c)) cnt += walk(c);
		visited.set(n, cnt);
		return cnt;
	}
	return walk(root);
}
function checkCircular(root) {
	const seen = /* @__PURE__ */ new Set();
	const inStack = /* @__PURE__ */ new Set();
	function walk(n) {
		if (seen.has(n)) return {
			isCircular: false,
			allSeen: true
		};
		if (inStack.has(n)) {
			const stack = [...inStack, n];
			return {
				isCircular: true,
				allSeen: false,
				ref: {
					stack,
					word: trieStackToWord(stack),
					pos: stack.indexOf(n)
				}
			};
		}
		inStack.add(n);
		let r = {
			isCircular: false,
			allSeen: true
		};
		if (n.c) r = Object.values(n.c).reduce((acc, n) => {
			if (acc.isCircular) return acc;
			const r = walk(n);
			r.allSeen = r.allSeen && acc.allSeen;
			return r;
		}, r);
		if (r.allSeen) seen.add(n);
		inStack.delete(n);
		return r;
	}
	return walk(root);
}
function reverseMapTrieNode(node) {
	return node.c && new Map(Object.entries(node.c).map(([c, n]) => [n, c]));
}
function trieStackToWord(stack) {
	let word = "";
	let lastMap = reverseMapTrieNode(stack[0]);
	for (let i = 1; i < stack.length; ++i) {
		const n = stack[i];
		const char = lastMap?.get(n);
		if (char) word += char;
		lastMap = reverseMapTrieNode(n);
	}
	return word;
}
function isCircular(root) {
	return checkCircular(root).isCircular;
}
function trieNodeToRoot(node, options) {
	return CTrieRoot.createFrom(node, options);
}
var CTrieRoot = class CTrieRoot {
	c;
	compoundCharacter;
	stripCaseAndAccentsPrefix;
	forbiddenWordPrefix;
	suggestionPrefix;
	constructor(options) {
		const newOptions = mergeOptionalWithDefaults(options);
		this.c = Object.create(null);
		this.compoundCharacter = newOptions.compoundCharacter;
		this.stripCaseAndAccentsPrefix = newOptions.stripCaseAndAccentsPrefix;
		this.forbiddenWordPrefix = newOptions.forbiddenWordPrefix;
		this.suggestionPrefix = newOptions.suggestionPrefix;
	}
	get hasForbiddenWords() {
		return !!this.c[this.forbiddenWordPrefix];
	}
	get hasCompoundWords() {
		return !!this.c[this.compoundCharacter];
	}
	get hasNonStrictWords() {
		return !!this.c[this.stripCaseAndAccentsPrefix];
	}
	get hasPreferredSuggestions() {
		return !!this.c[this.suggestionPrefix];
	}
	static createFrom(trie, options) {
		const root = new CTrieRoot(options);
		root.c = trie.c || Object.create(null);
		return root;
	}
};
//#endregion
//#region src/lib/consolidate.ts
/**
* Consolidate to DAWG
* @param root the root of the Trie tree
*/
function consolidate(root) {
	let count = 0;
	const signatures = /* @__PURE__ */ new Map();
	const cached = /* @__PURE__ */ new Map();
	const knownMap = /* @__PURE__ */ new Map();
	if (isCircular(root)) throw new Error("Trie is circular.");
	function signature(n) {
		return (n.f ? "*" : "") + (n.c ? JSON.stringify(Object.entries(n.c).map(([k, n]) => [k, cached.get(n)])) : "");
	}
	function findEow(n) {
		if (n.f && !n.c) return n;
		let r;
		// istanbul ignore else
		if (n.c) for (const c of Object.values(n.c)) {
			r = findEow(c);
			// istanbul ignore else
			if (r) break;
		}
		return r;
	}
	function compareMaps(a, b) {
		for (const e of a) if (b[e[0]] !== e[1]) return false;
		return a.length === b.size;
	}
	function deepCopy(n) {
		const k = knownMap.get(n);
		if (k) return k;
		const orig = n;
		if (n.c) {
			const children = Object.entries(n.c).map((c) => [c[0], deepCopy(c[1])]);
			if (!compareMaps(children, n.c)) n = {
				f: n.f,
				c: Object.fromEntries(children)
			};
		}
		const sig = signature(n);
		const ref = signatures.get(sig);
		if (ref) {
			knownMap.set(orig, ref);
			return ref;
		}
		Object.freeze(n);
		signatures.set(sig, n);
		cached.set(n, count++);
		knownMap.set(orig, n);
		return n;
	}
	function process(n) {
		if (cached.has(n)) return n;
		if (Object.isFrozen(n)) return knownMap.get(n) || deepCopy(n);
		if (n.c) {
			const children = Object.entries(n.c).sort((a, b) => a[0] < b[0] ? -1 : 1).map(([k, n]) => [k, process(n)]);
			n.c = Object.fromEntries(children);
		}
		const sig = signature(n);
		const ref = signatures.get(sig);
		if (ref) return ref;
		signatures.set(sig, n);
		cached.set(n, count++);
		return n;
	}
	const eow = findEow(root) || {
		f: 1,
		c: void 0
	};
	signatures.set(signature(eow), eow);
	cached.set(eow, count++);
	return trieNodeToRoot(process(root), root);
}
//#endregion
//#region src/lib/TrieBlob/trieDataEncoder.ts
function encodeITrieToBTrie(trie, buildOptions) {
	return encodeTrieDataToBTrie(trie.data, buildOptions);
}
function encodeTrieDataToBTrie(data, buildOptions) {
	if (!(buildOptions?.optimize || buildOptions?.useStringTable) && data.encodeToBTrie) return data.encodeToBTrie();
	return TrieBlobBuilder.fromITrieRoot(data.getRoot(), buildOptions).encodeToBTrie();
}
function decodeBTrie(data) {
	return TrieBlob.decodeBin(data);
}
//#endregion
//#region src/lib/TrieNode/find.ts
const _defaultFindOptions = {
	matchCase: false,
	compoundMode: "compound",
	forbidPrefix: "!",
	compoundFix: "+",
	caseInsensitivePrefix: "~",
	legacyMinCompoundLength: 3,
	compoundSeparator: void 0
};
const knownCompoundModes = new Map([
	"none",
	"compound",
	"legacy"
].map((a) => [a, a]));
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function findWord(root, word, options) {
	return _findWord(root, word, createFindOptions(options));
}
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function findWordNode(root, word, options) {
	return _findWordNode(root, word, createFindOptions(options));
}
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function _findWord(root, word, options) {
	const { node: _, ...result } = _findWordNode(root, word, options);
	return result;
}
/**
*
* @param root Trie root node. root.c contains the compound root and forbidden root.
* @param word A pre normalized word use `normalizeWord` or `normalizeWordToLowercase`
* @param options
*/
function _findWordNode(root, word, options) {
	const compoundMode = knownCompoundModes.get(options.compoundMode) || _defaultFindOptions.compoundMode;
	const compoundPrefix = options.compoundMode === "compound" ? root.compoundCharacter ?? options.compoundFix : "";
	const ignoreCasePrefix = options.matchCase ? "" : root.stripCaseAndAccentsPrefix ?? options.caseInsensitivePrefix;
	function __findCompound() {
		const f = findCompoundWord(root, word, compoundPrefix, ignoreCasePrefix, options.compoundSeparator || "");
		const result = { ...f };
		if (f.found !== false && f.compoundUsed) result.forbidden = isForbiddenWord(!f.caseMatched ? walk$1(root, options.caseInsensitivePrefix) : root, word, options.forbidPrefix);
		return result;
	}
	function __findExact() {
		const n = walk$1(root, word);
		return {
			found: isEndOfWordNode(n) && word,
			compoundUsed: false,
			forbidden: isForbiddenWord(root, word, options.forbidPrefix),
			node: n,
			caseMatched: true
		};
	}
	switch (compoundMode) {
		case "none": return options.matchCase ? __findExact() : __findCompound();
		case "compound": return __findCompound();
		case "legacy": return findLegacyCompound(root, word, options);
	}
}
function findLegacyCompound(root, word, options) {
	const roots = [root];
	if (!options.matchCase) roots.push(walk$1(root, options.caseInsensitivePrefix));
	return findLegacyCompoundNode(roots, word, options.legacyMinCompoundLength, options.compoundSeparator);
}
function findCompoundNode(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator) {
	const stack = [{
		n: root,
		compoundPrefix: ignoreCasePrefix,
		cr: void 0,
		caseMatched: true,
		s: ""
	}];
	const compoundPrefix = compoundCharacter || ignoreCasePrefix;
	const possibleCompoundPrefix = ignoreCasePrefix && compoundCharacter ? ignoreCasePrefix + compoundCharacter : "";
	const nw = word.normalize();
	const w = [...nw];
	function determineRoot(s) {
		const prefix = s.compoundPrefix;
		let r = root;
		let i;
		for (i = 0; i < prefix.length && r; ++i) r = r.c?.[prefix[i]];
		const caseMatched = s.caseMatched && prefix[0] !== ignoreCasePrefix;
		return {
			n: s.n,
			compoundPrefix: prefix === compoundPrefix ? possibleCompoundPrefix : "",
			cr: r,
			caseMatched,
			s: prefix.endsWith(compoundCharacter) ? compoundSeparator : ""
		};
	}
	let compoundUsed = false;
	let caseMatched = true;
	let i = 0;
	let node;
	while (true) {
		const s = stack[i];
		const h = w[i++];
		const c = (s.cr || s.n)?.c?.[h];
		if (c && i < word.length) {
			caseMatched = s.caseMatched;
			stack[i] = {
				n: c,
				compoundPrefix,
				cr: void 0,
				caseMatched,
				s: ""
			};
		} else if (!c || !c.f) {
			node = node || c;
			while (--i > 0) {
				const s = stack[i];
				if (!s.compoundPrefix || !s.n?.c) continue;
				if (compoundCharacter in s.n.c) break;
			}
			if (i >= 0 && stack[i].compoundPrefix) {
				compoundUsed = i > 0;
				const r = determineRoot(stack[i]);
				stack[i] = r;
				if (!r.cr) break;
				if (!i && !r.caseMatched && nw !== nw.toLowerCase()) break;
			} else break;
		} else {
			node = c;
			caseMatched = s.caseMatched;
			break;
		}
	}
	function joinCompoundWord() {
		return stack.map((s) => s.s).map((c, i) => c + w[i]).join("");
	}
	const f = i && i === word.length && word || false;
	return {
		found: f && (compoundSeparator ? joinCompoundWord() : f),
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function findCompoundWord(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator) {
	const { found, compoundUsed, node, caseMatched } = findCompoundNode(root, word, compoundCharacter, ignoreCasePrefix, compoundSeparator);
	if (!node || !node.f) return {
		found: false,
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
	return {
		found,
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function findWordExact(root, word) {
	return isEndOfWordNode(walk$1(root, word));
}
function isEndOfWordNode(n) {
	return n?.f === 1;
}
function walk$1(root, word) {
	const w = [...word];
	let n = root;
	let i = 0;
	while (n && i < w.length) {
		const h = w[i++];
		n = n.c?.[h];
	}
	return n;
}
function findLegacyCompoundNode(roots, word, minCompoundLength, compoundSeparator) {
	const root = roots[0];
	const numRoots = roots.length;
	const stack = [{
		n: root,
		usedRoots: 1,
		subLength: 0,
		isCompound: false,
		cr: void 0,
		caseMatched: true
	}];
	const sep = compoundSeparator ?? "+";
	const w = word;
	const wLen = w.length;
	let compoundUsed = false;
	let caseMatched = true;
	let i = 0;
	let node;
	while (true) {
		const s = stack[i];
		const h = w[i++];
		const c = (s.cr || s.n)?.c?.[h];
		if (c && i < wLen) stack[i] = {
			n: c,
			usedRoots: 0,
			subLength: s.subLength + 1,
			isCompound: s.isCompound,
			cr: void 0,
			caseMatched: s.caseMatched
		};
		else if (!c || !c.f || c.f && s.subLength < minCompoundLength - 1) {
			while (--i > 0) {
				const s = stack[i];
				if (s.usedRoots < numRoots && s.n?.f && (s.subLength >= minCompoundLength || !s.subLength) && wLen - i >= minCompoundLength) break;
			}
			if (i > 0 || stack[i].usedRoots < numRoots) {
				compoundUsed = i > 0;
				const s = stack[i];
				s.cr = roots[s.usedRoots++];
				s.subLength = 0;
				s.isCompound = compoundUsed;
				s.caseMatched = s.caseMatched && s.usedRoots <= 1;
			} else break;
		} else {
			node = c;
			caseMatched = s.caseMatched;
			break;
		}
	}
	function extractWord() {
		if (!word || i < word.length) return false;
		const letters = [];
		let subLen = 0;
		for (let j = 0; j < i; ++j) {
			const { subLength } = stack[j];
			if (subLength < subLen) letters.push(sep);
			letters.push(word[j]);
			subLen = subLength;
		}
		return letters.join("");
	}
	return {
		found: extractWord(),
		compoundUsed,
		node,
		forbidden: void 0,
		caseMatched
	};
}
function isForbiddenWord(root, word, forbiddenPrefix) {
	return findWordExact(root?.c?.[forbiddenPrefix], word);
}
const createFindOptions = memorizeLastCall(_createFindOptions);
function _createFindOptions(options) {
	return mergeDefaults(options, _defaultFindOptions);
}
//#endregion
//#region src/lib/TrieNode/TrieNodeTrie.ts
var TrieNodeTrie = class TrieNodeTrie {
	_iTrieRoot;
	info;
	_size;
	hasForbiddenWords;
	hasCompoundWords;
	hasNonStrictWords;
	hasPreferredSuggestions;
	root;
	constructor(root) {
		this.root = root;
		this.info = mergeOptionalWithDefaults(root);
		this.hasForbiddenWords = root.hasForbiddenWords;
		this.hasCompoundWords = root.hasCompoundWords;
		this.hasNonStrictWords = root.hasNonStrictWords;
		this.hasPreferredSuggestions = root.hasPreferredSuggestions;
	}
	wordToCharacters = (word) => [...word];
	get iTrieRoot() {
		return this._iTrieRoot || (this._iTrieRoot = trieRootToITrieRoot(this.root));
	}
	getRoot() {
		return this.iTrieRoot;
	}
	getNode(prefix) {
		return findNode$1(this.getRoot(), prefix);
	}
	*words(prefix) {
		if (!prefix) {
			yield* iteratorTrieWords$1(this.getRoot());
			return;
		}
		const node = this.getNode(prefix);
		if (!node) return;
		if (node.eow) yield prefix;
		for (const suffix of iteratorTrieWords$1(node)) yield prefix + suffix;
	}
	has(word) {
		return findWordExact(this.root, word);
	}
	isForbiddenWord(word) {
		return findWordExact(this.root.c[this.root.forbiddenWordPrefix], word);
	}
	get size() {
		return this._size ??= countNodes(this.root);
	}
	static createFromWords(words, options) {
		return new TrieNodeTrie(createTrieRootFromList(words, options));
	}
	static createFromWordsAndConsolidate(words, options) {
		return new TrieNodeTrie(consolidate(createTrieRootFromList(words, options)));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/gensequence@8.0.8/node_modules/gensequence/dist/util/util.js
function* toIterableIterator$2(i) {
	yield* i;
}
//#endregion
//#region ../../node_modules/.pnpm/gensequence@8.0.8/node_modules/gensequence/dist/operators/operatorsBase.js
/**
* Operators used by Sequence
*/
function* filter$1(i, fnFilter) {
	for (const v of i) if (fnFilter(v)) yield v;
}
function* skip$1(i, n) {
	let a = 0;
	for (const t of i) {
		if (a >= n) yield t;
		a += 1;
	}
}
function* take$1(i, n) {
	let a = 0;
	if (n) for (const t of i) {
		if (a >= n) break;
		yield t;
		a += 1;
	}
}
/**
* Concat two iterables together
*/
function* concat$1(i, j) {
	yield* i;
	yield* j;
}
function* concatMap$1(i, fn) {
	for (const t of i) yield* fn(t);
}
/**
* Combine two iterables together using fnMap function.
*/
function* combine$1(i, j, fnMap) {
	const jit = j[Symbol.iterator]();
	for (const r of i) {
		const s = jit.next().value;
		yield fnMap(r, s);
	}
}
/**
* apply a mapping function to an Iterable.
*/
function map$1(i, fnMap) {
	function* fn(i, fnMap) {
		for (const v of i) yield fnMap(v);
	}
	return fn(i, fnMap);
}
function* scan$1(i, fnReduce, initValue) {
	let index = 0;
	if (initValue === void 0) {
		index = 1;
		const iter = i[Symbol.iterator]();
		let r = iter.next();
		if (!r.done) yield r.value;
		initValue = r.value;
		i = makeIterable(iter);
	}
	let prevValue = initValue;
	for (const t of i) {
		const nextValue = fnReduce(prevValue, t, index);
		yield nextValue;
		prevValue = nextValue;
		index += 1;
	}
}
function all$1(i, fn) {
	for (const t of i) if (!fn(t)) return false;
	return true;
}
function any$1(i, fn) {
	for (const t of i) if (fn(t)) return true;
	return false;
}
function count$1(i) {
	return reduce$1(i, (p) => p + 1, 0);
}
function first$1(i, fn, defaultValue) {
	fn = fn || (() => true);
	for (const t of i) if (fn(t)) return t;
	return defaultValue;
}
function forEach$1(i, fn) {
	let index = 0;
	for (const t of i) {
		fn(t, index);
		index += 1;
	}
}
function max$1(i, selector = (t) => t) {
	return reduce$1(i, (p, c) => selector(c) > selector(p) ? c : p, void 0);
}
function min$1(i, selector = (t) => t) {
	return reduce$1(i, (p, c) => selector(c) < selector(p) ? c : p, void 0);
}
function reduce$1(i, fnReduce, initialValue) {
	const iter = makeIterable(i[Symbol.iterator]());
	let index = 0;
	if (initialValue === void 0) {
		index = 1;
		initialValue = iter.next().value;
	}
	let prevValue = initialValue;
	for (const t of iter) {
		prevValue = fnReduce(prevValue, t, index);
		index += 1;
	}
	return prevValue;
}
async function reduceAsync$1(i, fnReduce, initialValue) {
	const iter = makeIterable(i[Symbol.iterator]());
	let index = 0;
	if (initialValue === void 0) {
		index = 1;
		initialValue = iter.next().value;
	}
	let previousValue = await initialValue;
	for (const p of iter) {
		const t = await p;
		previousValue = await fnReduce(previousValue, t, index);
		index += 1;
	}
	return previousValue;
}
/**
* Convert an Iterator into an IterableIterator
*/
function makeIterable(i) {
	function* fromIterator(i) {
		for (let r = i.next(); !r.done; r = i.next()) yield r.value;
	}
	function* fromIterable(i) {
		yield* i;
	}
	return isIterable(i) ? isIterableIterator(i) ? i : fromIterable(i) : fromIterator(i);
}
function isIterable(i) {
	return !!i[Symbol.iterator];
}
function isIterableIterator(i) {
	return typeof i.next == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/gensequence@8.0.8/node_modules/gensequence/dist/operators/operators.js
/**
* Operators used by Sequence
*/
function filter(fnFilter) {
	return (i) => filter$1(i, fnFilter);
}
function skip(n) {
	return (i) => skip$1(i, n);
}
function take(n) {
	return (i) => take$1(i, n);
}
/**
* Concat two iterables together
*/
function concat(j) {
	return (i) => concat$1(i, j);
}
function concatMap(fn) {
	return (i) => concatMap$1(i, fn);
}
/**
* Combine two iterables together using fnMap function.
*/
function combine(fnMap, j) {
	return (i) => combine$1(i, j, fnMap);
}
/**
* apply a mapping function to an Iterable.
*/
function map(fnMap) {
	return (i) => map$1(i, fnMap);
}
function scan(fnReduce, initValue) {
	return (i) => scan$1(i, fnReduce, initValue);
}
function all(fn) {
	return (i) => all$1(i, fn);
}
function any(fn) {
	return (i) => any$1(i, fn);
}
function count() {
	return (i) => count$1(i);
}
function first(fn, defaultValue) {
	return (i) => first$1(i, fn, defaultValue);
}
function forEach(fn) {
	return (i) => forEach$1(i, fn);
}
function max(selector) {
	return (i) => max$1(i, selector);
}
function min(selector) {
	return (i) => min$1(i, selector);
}
function reduce(fnReduce, initialValue) {
	return (i) => reduce$1(i, fnReduce, initialValue);
}
function reduceAsync(fnReduceAsync, initialValue) {
	return (i) => reduceAsync$1(i, fnReduceAsync, initialValue);
}
function pipe(...fns) {
	return (i) => {
		for (const fn of fns) i = fn ? fn(i) : i;
		return i;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/gensequence@8.0.8/node_modules/gensequence/dist/ImplSequence.js
var ImplSequence = class ImplSequence {
	i;
	_iterator;
	constructor(i) {
		this.i = i;
	}
	get iter() {
		return typeof this.i === "function" ? this.i() : this.i;
	}
	get iterator() {
		if (!this._iterator) this._iterator = this.iter[Symbol.iterator]();
		return this._iterator;
	}
	inject(fn) {
		const iter = this.i;
		return () => fn(typeof iter === "function" ? iter() : iter);
	}
	chain(fn) {
		return new ImplSequence(this.inject(fn));
	}
	[Symbol.iterator]() {
		return this.iter[Symbol.iterator]();
	}
	next() {
		return this.iterator.next();
	}
	filter(fnFilter) {
		return this.chain(filter(fnFilter));
	}
	skip(n) {
		return this.chain(skip(n));
	}
	take(n) {
		return this.chain(take(n));
	}
	concat(j) {
		return this.chain(concat(j));
	}
	concatMap(fn) {
		return this.chain(concatMap(fn));
	}
	combine(fn, j) {
		return this.chain(combine(fn, j));
	}
	map(fn) {
		return this.chain(map(fn));
	}
	scan(fnReduce, initValue) {
		return this.chain(scan(fnReduce, initValue));
	}
	pipe(...fns) {
		if (!fns.length) return this;
		return this.chain(pipe.apply(null, fns));
	}
	all(fnFilter) {
		return all(fnFilter)(this.iter);
	}
	any(fnFilter) {
		return any(fnFilter)(this.iter);
	}
	count() {
		return count()(this.iter);
	}
	first(fnFilter, defaultValue) {
		return first(fnFilter, defaultValue)(this.iter);
	}
	forEach(fn) {
		return forEach(fn)(this.iter);
	}
	max(fnSelector) {
		return max(fnSelector)(this.iter);
	}
	min(fnSelector) {
		return min(fnSelector)(this.iter);
	}
	reduce(fnReduce, initValue) {
		return reduce(fnReduce, initValue)(this.iter);
	}
	reduceAsync(fnReduceAsync, initialValue) {
		return reduceAsync(fnReduceAsync, initialValue)(this.iter);
	}
	reduceToSequence(fnReduce, initialValue) {
		return this.chain(reduce(fnReduce, initialValue));
	}
	toArray() {
		return [...this.iter];
	}
	toIterable() {
		return toIterableIterator$2(this.iter);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/gensequence@8.0.8/node_modules/gensequence/dist/GenSequence.js
function genSequence(i) {
	return new ImplSequence(i);
}
//#endregion
//#region src/lib/convertToTrieRefNodes.ts
const MinReferenceCount = 3;
/**
* An iterator that will emit TrieRefNodes mostly in descending frequency
* @param root Root of the Trie -- a DAWG is preferred to keep the number of duplicates down.
*/
function convertToTrieRefNodes(root) {
	const eow = {
		f: 1,
		c: void 0
	};
	const tallies = new Map([[eow, 0]]);
	let count = 0;
	const cached = /* @__PURE__ */ new Map();
	const rollupTally = /* @__PURE__ */ new Map();
	function tally(n) {
		if (n.f && !n.c) {
			tallies.set(eow, (tallies.get(eow) || 0) + 1);
			return;
		}
		const t = tallies.get(n);
		if (t) {
			tallies.set(n, t + 1);
			return;
		}
		tallies.set(n, 1);
		for (const c of n.c && Object.values(n.c) || []) tally(c);
	}
	function rollup(n) {
		const c = rollupTally.get(n);
		if (c) return c;
		if (!n.c) {
			const sum = tallies.get(eow) || 0;
			rollupTally.set(n, sum);
			return sum;
		}
		const sum = Object.values(n.c).reduce((acc, v) => acc + rollup(v), tallies.get(n) || 0);
		rollupTally.set(n, sum);
		return sum;
	}
	function* walkByTallies(tallies) {
		const nodes = genSequence(tallies).filter((a) => a[1] >= MinReferenceCount);
		for (const [n] of [...nodes].sort((a, b) => b[1] - a[1])) yield* walkByRollup(n);
	}
	function* walkByRollup(n) {
		if (cached.has(n)) return;
		if (n.f && !n.c) {
			cached.set(n, cached.get(eow));
			return;
		}
		const children = (n.c && Object.values(n.c) || []).sort((a, b) => (rollupTally.get(b) || 0) - (rollupTally.get(a) || 0));
		for (const c of children) yield* walkByRollup(c);
		cached.set(n, count++);
		yield convert(n);
	}
	function convert(n) {
		const { f, c } = n;
		const r = c ? Object.entries(c).sort((a, b) => a[0] < b[0] ? -1 : 1).map(([s, n]) => [s, cached.get(n)]) : void 0;
		return r ? f ? {
			f,
			r
		} : { r } : { f };
	}
	function* walk(root) {
		cached.set(eow, count++);
		yield convert(eow);
		yield* walkByTallies(tallies);
		yield* walkByRollup(root);
	}
	tally(root);
	rollup(root);
	return walk(root);
}
//#endregion
//#region src/lib/io/importExportV1.ts
const EOW$2 = "*";
function toReferences(node) {
	return genSequence(convertToTrieRefNodes(node));
}
const regExpEscapeChars = /([[\]\\,:{}*])/g;
const regExTrailingComma = /,(\}|\n)/g;
function escapeChar(char) {
	return char.replaceAll(regExpEscapeChars, "\\$1");
}
function trieToExportString(node, base) {
	function* walk(node) {
		if (node.f) yield EOW$2;
		if (node.r) {
			const refs = [...node.r].sort((a, b) => a[0] < b[0] ? -1 : 1);
			for (const n of refs) {
				const [c, r] = n;
				const ref = r ? r.toString(base) : "";
				yield escapeChar(c) + ref + ",";
			}
		}
	}
	return genSequence(walk(node));
}
function generateHeader$3(base, comment) {
	return genSequence([
		...[
			"#!/usr/bin/env cspell-trie reader",
			"TrieXv1",
			"base=" + base
		],
		...comment ? comment.split("\n").map((a) => "# " + a) : [],
		...["# Data:"]
	]).map((a) => a + "\n");
}
/**
* Serialize a TrieNode.
* Note: This is destructive.  The node will no longer be usable.
* Even though it is possible to preserve the trie, dealing with very large tries can consume a lot of memory.
* Considering this is the last step before exporting, it was decided to let this be destructive.
*/
function serializeTrie$4(root, options = 16) {
	options = typeof options === "number" ? { base: options } : options;
	const { base = 16, comment = "" } = options;
	const radix = base > 36 ? 36 : base < 10 ? 10 : base;
	const rows = toReferences(root).map((node) => {
		return [...trieToExportString(node, radix), "\n"].join("").replaceAll(regExTrailingComma, "$1");
	});
	return generateHeader$3(radix, comment).concat(rows);
}
function* toIterableIterator$1(iter) {
	yield* iter;
}
function importTrie$5(linesX) {
	let radix = 16;
	const comment = /^\s*#/;
	const iter = toIterableIterator$1(linesX);
	function parseHeaderRows(headerRows) {
		const header = headerRows.slice(0, 2).join("\n");
		const headerReg = /^TrieXv1\nbase=(\d+)$/;
		/* istanbul ignore if */
		if (!headerReg.test(header)) throw new Error("Unknown file format");
		radix = Number.parseInt(header.replace(headerReg, "$1"), 10);
	}
	function readHeader(iter) {
		const headerRows = [];
		while (true) {
			const next = iter.next();
			if (next.done) break;
			const line = next.value.trim();
			if (!line || comment.test(line)) continue;
			if (line === "*") break;
			headerRows.push(line);
		}
		parseHeaderRows(headerRows);
	}
	const regNotEscapedCommas = /(^|[^\\]),/g;
	const regUnescapeCommas = /__COMMA__/g;
	const regUnescape = /[\\](.)/g;
	const flagsWord = { f: 1 };
	function splitLine(line) {
		return line.replaceAll(regNotEscapedCommas, "$1__COMMA__").split(regUnescapeCommas).map((a) => a.replaceAll(regUnescape, "$1"));
	}
	function decodeLine(line, nodes) {
		const isWord = line[0] === EOW$2;
		line = isWord ? line.slice(1) : line;
		const flags = isWord ? flagsWord : {};
		const children = splitLine(line).filter((a) => !!a).map((a) => [a[0], Number.parseInt(a.slice(1) || "0", radix)]).map(([k, i]) => [k, nodes[i]]);
		return {
			...children.length ? { c: Object.fromEntries(children) } : {},
			...flags
		};
	}
	readHeader(iter);
	return trieNodeToRoot(genSequence(["*"]).concat(iter).map((a) => a.replace(/\r?\n/, "")).filter((a) => !!a).reduce((acc, line) => {
		const { lines, nodes } = acc;
		const root = decodeLine(line, nodes);
		nodes[lines] = root;
		return {
			lines: lines + 1,
			root,
			nodes
		};
	}, {
		lines: 0,
		nodes: [],
		root: {}
	}).root, {});
}
//#endregion
//#region src/lib/io/importExportV2.ts
const EOW$1 = "*";
const DATA$3 = "__DATA__";
function leaves(node) {
	function toRefNode(node, k) {
		const refNode = node;
		refNode.s = refNode.s ?? k;
		return refNode;
	}
	function* walk(node, k, p) {
		const ref = toRefNode(node, k);
		if (!ref.c) yield {
			n: ref,
			p
		};
		else for (const n of Object.entries(ref.c)) yield* walk(n[1], n[0], ref);
	}
	return genSequence(walk(node, ""));
}
function flattenToReferences(node) {
	function* walk() {
		let iterations = 100;
		let processed = 0;
		let index = 0;
		do {
			processed = 0;
			const signatureMap = /* @__PURE__ */ new Map();
			for (const leaf of leaves(node)) {
				const h = signature(leaf.n);
				let m = signatureMap.get(h);
				if (m === void 0) {
					yield leaf.n;
					m = index;
					signatureMap.set(h, m);
					index += 1;
				}
				/* istanbul ignore else */
				if (leaf.p && leaf.p.c) {
					leaf.p.r = leaf.p.r || [];
					leaf.p.r.push(m);
					delete leaf.p.c[leaf.n.s];
					if (!Object.entries(leaf.p.c).length) delete leaf.p.c;
				}
				processed += 1;
			}
			iterations -= 1;
		} while (processed && iterations && node.c);
		yield node;
	}
	return genSequence(walk());
}
function signature(node) {
	const flags = node.f ? EOW$1 : "";
	const refs = node.r ? node.r.sort((a, b) => a - b).join(",") : "";
	return node.s + flags + refs;
}
function toLine(node, base) {
	const flags = node.f ? EOW$1 : "";
	const refs = node.r ? node.r.sort((a, b) => a - b).map((r) => r.toString(base)).join(",") : "";
	return node.s + flags + refs;
}
function generateHeader$2(base, comment) {
	return genSequence([
		"#!/usr/bin/env cspell-trie reader",
		"TrieXv2",
		"base=" + base,
		...comment ? comment.split("\n").map((a) => "# " + a) : [],
		"# Data:",
		DATA$3
	]);
}
/**
* Serialize a TrieNode.
* Note: This is destructive.  The node will no longer be usable.
* Even though it is possible to preserve the trie, dealing with very large tries can consume a lot of memory.
* Considering this is the last step before exporting, it was decided to let this be destructive.
*/
function serializeTrie$3(root, options = 16) {
	options = typeof options === "number" ? { base: options } : options;
	const { base = 16, comment = "" } = options;
	const radix = base > 36 ? 36 : base < 10 ? 10 : base;
	const rows = flattenToReferences({
		...root,
		s: "^"
	}).map((n) => toLine(n, base));
	return generateHeader$2(radix, comment).concat(rows).map((a) => a + "\n");
}
function* toIterableIterator(iter) {
	yield* iter;
}
function importTrie$4(linesX) {
	let radix = 16;
	const comment = /^\s*#/;
	const iter = toIterableIterator(linesX);
	function parseHeaderRows(headerRows) {
		const header = headerRows.slice(0, 2).join("\n");
		const headerReg = /^TrieXv2\nbase=(\d+)$/;
		/* istanbul ignore if */
		if (!headerReg.test(header)) throw new Error("Unknown file format");
		radix = Number.parseInt(header.replace(headerReg, "$1"), 10);
	}
	function readHeader(iter) {
		const headerRows = [];
		while (true) {
			const next = iter.next();
			if (next.done) break;
			const line = next.value.trim();
			if (!line || comment.test(line)) continue;
			if (line === "__DATA__") break;
			headerRows.push(line);
		}
		parseHeaderRows(headerRows);
	}
	function parseLine(line, base) {
		const isWord = line[1] === EOW$1;
		const refOffset = isWord ? 2 : 1;
		const refs = line.slice(refOffset).split(",").filter((a) => !!a).map((r) => Number.parseInt(r, base));
		return {
			letter: line[0],
			isWord,
			refs
		};
	}
	const flagsWord = { f: 1 };
	function decodeLine(line, nodes) {
		const { letter, isWord, refs } = parseLine(line, radix);
		const flags = isWord ? flagsWord : {};
		const children = refs.map((r) => nodes[r]).sort((a, b) => a.s < b.s ? -1 : 1).map((n) => [n.s, n]);
		return {
			s: letter,
			...children.length ? { c: Object.fromEntries(children) } : {},
			...flags
		};
	}
	readHeader(iter);
	return trieNodeToRoot(genSequence(iter).map((a) => a.replace(/\r?\n/, "")).filter((a) => !!a).reduce((acc, line) => {
		const { nodes } = acc;
		const root = decodeLine(line, nodes);
		nodes.push(root);
		return {
			root,
			nodes
		};
	}, {
		nodes: [],
		root: {
			s: "",
			c: Object.create(null)
		}
	}).root, {});
}
//#endregion
//#region src/lib/utils/bufferLines.ts
function* buffer(iter, bufferSize) {
	const buffer = [];
	for (const s of iter) {
		buffer.push(s);
		if (buffer.length >= bufferSize) {
			yield buffer;
			buffer.length = 0;
		}
	}
	if (buffer.length) {
		yield buffer;
		buffer.length = 0;
	}
}
function* bufferLines(iter, bufferSize, eol) {
	if (eol) for (const s of buffer(iter, bufferSize)) yield s.join("") + eol;
	else for (const s of buffer(iter, bufferSize)) yield s.join("");
}
//#endregion
//#region src/lib/io/importExportV4.ts
/**
* Trie file format v4
*
* Trie format v4 is very similar to v3. The v4 reader can even read v3 files.
* The motivation behind v4 is to reduce the cost of storing `.trie` files in git.
* When a word is added in v3, nearly the entire file is changed due to the absolute
* references. V4 adds an index sorted by the most frequently used reference to the least.
* Because git diff is line based, it is important to add line breaks at logical points.
* V3 added line breaks just to make sure the lines were not too long, V4 takes a different
* approach. Line breaks are added at two distinct points. First, at the start of each two
* letter prefix and second after approximately 50 words have been emitted.
*
* To improve readability and git diff, at the beginning of each two letter prefix,
* a comment is emitted.
*
* Example:
*
* ```
* /* ab *​/
* ```
*/
const REF_INDEX_BEGIN = "[";
const REF_INDEX_END = "]";
const INLINE_DATA_COMMENT_LINE = "/";
const specialCharacters$1 = stringToCharSet$2([
	"$",
	"<",
	"\n",
	"#",
	"@",
	";",
	"\\",
	"\r",
	REF_INDEX_BEGIN,
	REF_INDEX_END,
	INLINE_DATA_COMMENT_LINE,
	..."0123456789",
	..."`~!@#$%^&*()_-+=[]{};:'\"<>,./?\\|"
].join(""));
const SPECIAL_CHARACTERS_MAP = [
	["\n", "\\n"],
	["\r", "\\r"],
	["\\", "\\\\"]
];
const specialCharacterMap$1 = stringToCharMap(SPECIAL_CHARACTERS_MAP);
const characterMap$1 = stringToCharMap(SPECIAL_CHARACTERS_MAP.map((a) => [a[1], a[0]]));
const specialPrefix$1 = stringToCharSet$2("~!");
const WORDS_PER_LINE$1 = 20;
const DATA$2 = "__DATA__";
function generateHeader$1(base, comment) {
	return `\
#!/usr/bin/env cspell-trie reader
TrieXv4
base=${base}
${comment.split("\n").map((a) => "# " + a.trimEnd()).join("\n")}
# Data:
${DATA$2}
`;
}
/**
* Serialize a TrieRoot.
*/
function serializeTrie$2(root, options = 16) {
	options = typeof options === "number" ? { base: options } : options;
	const { base = 10, comment = "" } = options;
	const radix = base > 36 ? 36 : base < 10 ? 10 : base;
	const cache = /* @__PURE__ */ new Map();
	const refMap = buildReferenceMap(root, base);
	const nodeToIndexMap = new Map(refMap.refCounts.map(([node], index) => [node, index]));
	let count = 0;
	const backBuffer = {
		last: "",
		count: 0,
		words: 0,
		eol: false
	};
	const wordChars = [];
	function ref(n, idx) {
		const r = idx === void 0 || n < idx ? "#" + n.toString(radix) : "@" + idx.toString(radix);
		return radix === 10 ? r : r + ";";
	}
	function escape(s) {
		return s in specialCharacters$1 ? "\\" + (specialCharacterMap$1[s] || s) : s;
	}
	function* flush() {
		while (backBuffer.count) {
			const n = Math.min(9, backBuffer.count);
			yield n > 1 ? backBuffer.last + n : backBuffer.last;
			backBuffer.last = "<";
			backBuffer.count -= n;
		}
		if (backBuffer.eol) {
			yield "\n";
			backBuffer.eol = false;
			backBuffer.words = 0;
		}
	}
	function* emit(s) {
		switch (s) {
			case "$":
				yield* flush();
				backBuffer.last = "$";
				backBuffer.count = 0;
				backBuffer.words++;
				break;
			case "<":
				backBuffer.count++;
				break;
			case "\n":
				backBuffer.eol = true;
				break;
			default:
				if (backBuffer.words >= WORDS_PER_LINE$1) backBuffer.eol = true;
				yield* flush();
				if (s.startsWith("#") || s.startsWith("@")) backBuffer.words++;
				yield s;
		}
	}
	const comment_begin = `
${INLINE_DATA_COMMENT_LINE}* `;
	const comment_end = ` *${INLINE_DATA_COMMENT_LINE}
`;
	function* walk(node, depth) {
		const nodeNumber = cache.get(node);
		const refIndex = nodeToIndexMap.get(node);
		if (nodeNumber !== void 0) {
			yield* emit(ref(nodeNumber, refIndex));
			return;
		}
		if (node.c) {
			if (depth > 0 && depth <= 2) yield* emit(comment_begin + wordChars.slice(0, depth).map(escape).join("") + comment_end);
			cache.set(node, count++);
			const c = Object.entries(node.c).sort((a, b) => a[0] < b[0] ? -1 : 1);
			for (const [s, n] of c) {
				wordChars[depth] = s;
				yield* emit(escape(s));
				yield* walk(n, depth + 1);
				yield* emit("<");
				if (depth === 0) yield* emit("\n");
			}
		}
		if (node.f) yield* emit("$");
		if (depth === 2 || depth === 3 && wordChars[0] in specialPrefix$1) yield* emit("\n");
	}
	function* serialize(node) {
		yield* walk(node, 0);
		yield* flush();
	}
	const lines = [...bufferLines(serialize(root), 1e3, "")];
	const reference = "[\n" + refMap.refCounts.map(([node]) => cache.get(node) || 0).map((n) => n.toString(radix)).join(",").replaceAll(/.{110,130}[,]/g, "$&\n") + "\n]\n";
	return pipeSync([generateHeader$1(radix, comment), reference], opAppendSync(lines));
}
function buildReferenceMap(root, base) {
	const refCount = /* @__PURE__ */ new Map();
	let nodeCount = 0;
	function walk(node) {
		const ref = refCount.get(node);
		if (ref) {
			ref.c++;
			return;
		}
		refCount.set(node, {
			c: 1,
			n: nodeCount++
		});
		if (!node.c) return;
		for (const child of Object.values(node.c)) walk(child);
	}
	walk(root);
	const refCountAndNode = [...pipeSync(refCount, opFilterSync(([_, ref]) => ref.c >= 2))].sort((a, b) => b[1].c - a[1].c || a[1].n - b[1].n);
	let adj = 0;
	const baseLogScale = 1 / Math.log(base);
	return { refCounts: refCountAndNode.filter(([_, ref], idx) => {
		const i = idx - adj;
		const charsIdx = Math.ceil(Math.log(i) * baseLogScale);
		const charsNode = Math.ceil(Math.log(ref.n) * baseLogScale);
		const keep = ref.c * (charsNode - charsIdx) - charsIdx > 0;
		adj += keep ? 0 : 1;
		return keep;
	}).map(([n, ref]) => [n, ref.c]) };
}
function importTrie$3(linesX) {
	linesX = typeof linesX === "string" ? linesX.split(/^/m) : linesX;
	let radix = 10;
	const comment = /^\s*#/;
	const iter = tapIterable(pipeSync(linesX, opConcatMapSync((a) => a.split(/^/m))));
	function parseHeaderRows(headerRows) {
		const header = headerRows.slice(0, 2).join("\n");
		const headerReg = /^TrieXv[34]\nbase=(\d+)$/;
		/* istanbul ignore if */
		if (!headerReg.test(header)) throw new Error("Unknown file format");
		radix = Number.parseInt(header.replace(headerReg, "$1"), 10);
	}
	function readHeader(iter) {
		const headerRows = [];
		for (const value of iter) {
			const line = value.trim();
			if (!line || comment.test(line)) continue;
			if (line === "__DATA__") break;
			headerRows.push(line);
		}
		parseHeaderRows(headerRows);
	}
	readHeader(iter);
	return parseStream$1(radix, iter);
}
const numbersSet = stringToCharSet$2("0123456789");
function parseStream$1(radix, iter) {
	const eow = Object.freeze({ f: 1 });
	let refIndex = [];
	const root = trieNodeToRoot({}, {});
	function parseReference(acc, s) {
		const isIndexRef = s === "@";
		let ref = "";
		function parser(acc, s) {
			if (s === ";" || radix === 10 && !(s in numbersSet)) {
				const { root, nodes, stack } = acc;
				const r = Number.parseInt(ref, radix);
				const top = stack[stack.length - 1];
				const p = stack[stack.length - 2].node;
				const n = isIndexRef ? refIndex[r] : r;
				p.c && (p.c[top.s] = nodes[n]);
				const rr = {
					root,
					nodes,
					stack,
					parser: void 0
				};
				return s === ";" ? rr : parserMain(rr, s);
			}
			ref = ref + s;
			return acc;
		}
		const { nodes } = acc;
		nodes.pop();
		return {
			...acc,
			nodes,
			parser
		};
	}
	function parseEscapeCharacter(acc, _) {
		let prev = "";
		const parser = function(acc, s) {
			if (prev) {
				s = characterMap$1[prev + s] || s;
				return parseCharacter({
					...acc,
					parser: void 0
				}, s);
			}
			if (s === "\\") {
				prev = s;
				return acc;
			}
			return parseCharacter({
				...acc,
				parser: void 0
			}, s);
		};
		return {
			...acc,
			parser
		};
	}
	function parseComment(acc, s) {
		const endOfComment = s;
		let isEscaped = false;
		function parser(acc, s) {
			if (isEscaped) {
				isEscaped = false;
				return acc;
			}
			if (s === "\\") {
				isEscaped = true;
				return acc;
			}
			if (s === endOfComment) return {
				...acc,
				parser: void 0
			};
			return acc;
		}
		return {
			...acc,
			parser
		};
	}
	function parseCharacter(acc, s) {
		const parser = void 0;
		const { root, nodes, stack } = acc;
		const node = stack[stack.length - 1].node;
		const c = node.c ?? Object.create(null);
		const n = {
			f: void 0,
			c: void 0,
			n: nodes.length
		};
		c[s] = n;
		node.c = c;
		stack.push({
			node: n,
			s
		});
		nodes.push(n);
		return {
			root,
			nodes,
			stack,
			parser
		};
	}
	function parseEOW(acc, _) {
		const parser = parseBack;
		const { root, nodes, stack } = acc;
		const top = stack[stack.length - 1];
		const node = top.node;
		node.f = 1;
		if (!node.c) {
			top.node = eow;
			const p = stack[stack.length - 2].node;
			p.c && (p.c[top.s] = eow);
			nodes.pop();
		}
		stack.pop();
		return {
			root,
			nodes,
			stack,
			parser
		};
	}
	const charactersBack = stringToCharSet$2("<23456789");
	function parseBack(acc, s) {
		if (!(s in charactersBack)) return parserMain({
			...acc,
			parser: void 0
		}, s);
		let n = s === "<" ? 1 : Number.parseInt(s, 10) - 1;
		const { stack } = acc;
		while (n-- > 0) stack.pop();
		return {
			...acc,
			parser: parseBack
		};
	}
	function parseIgnore(acc, _) {
		return acc;
	}
	const parsers = createStringLookupMap([
		["$", parseEOW],
		["<", parseBack],
		["#", parseReference],
		["@", parseReference],
		["\\", parseEscapeCharacter],
		["\n", parseIgnore],
		["\r", parseIgnore],
		[INLINE_DATA_COMMENT_LINE, parseComment]
	]);
	function parserMain(acc, s) {
		return (acc.parser ?? parsers[s] ?? parseCharacter)(acc, s);
	}
	const charsetSpaces = stringToCharSet$2(" \r\n	");
	function parseReferenceIndex(acc, s) {
		let json = "";
		function parserStart(acc, s) {
			if (s === REF_INDEX_BEGIN) {
				json = json + s;
				return {
					...acc,
					parser
				};
			}
			if (s in charsetSpaces) return acc;
			return parserMain({
				...acc,
				parser: void 0
			}, s);
		}
		function parser(acc, s) {
			json = json + s;
			if (s === REF_INDEX_END) {
				refIndex = json.replaceAll(/[\s[\]]/g, "").split(",").map((n) => Number.parseInt(n, radix));
				return {
					...acc,
					parser: void 0
				};
			}
			return acc;
		}
		return parserStart({
			...acc,
			parser: parserStart
		}, s);
	}
	reduceSync(pipeSync(iter, opConcatMapSync((a) => [...a])), parserMain, {
		nodes: [root],
		root,
		stack: [{
			node: root,
			s: ""
		}],
		parser: parseReferenceIndex
	});
	return root;
}
function stringToCharSet$2(values) {
	const set = Object.create(null);
	const len = values.length;
	for (let i = 0; i < len; ++i) set[values[i]] = true;
	return set;
}
function stringToCharMap(values) {
	return createStringLookupMap(values);
}
function createStringLookupMap(values) {
	const map = Object.create(null);
	const len = values.length;
	for (let i = 0; i < len; ++i) map[values[i][0]] = values[i][1];
	return map;
}
/**
* Allows an iterable to be shared by multiple consumers.
* Each consumer takes from the iterable.
* @param iterable - the iterable to share
*/
function tapIterable(iterable) {
	let lastValue;
	let iter;
	function getNext() {
		if (lastValue && lastValue.done) return { ...lastValue };
		iter = iter || iterable[Symbol.iterator]();
		lastValue = iter.next();
		return lastValue;
	}
	function* iterableFn() {
		let next;
		while (!(next = getNext()).done) yield next.value;
	}
	return { [Symbol.iterator]: iterableFn };
}
//#endregion
//#region src/lib/TrieNode/TrieNodeBuilder.ts
const EOW = Object.freeze({
	f: 1,
	k: true
});
const compare = new Intl.Collator().compare;
var TrieNodeBuilder = class {
	#cursor;
	root = createTrieRoot();
	#trieInfoBuilder = new TrieInfoBuilder(this.root);
	shouldSort = false;
	suggestionPrefix = this.root.suggestionPrefix;
	wordToCharacters = (word) => [...word];
	setOptions(options) {
		const opts = mergeOptionalWithDefaults(options, this.root);
		Object.assign(this.root, opts);
		return opts;
	}
	build() {
		return new TrieNodeTrie(this.root);
	}
	getCursor() {
		this.#cursor ??= this.createCursor();
		return this.#cursor;
	}
	createCursor() {
		const root = this.root;
		const sug = this.suggestionPrefix;
		const nodes = [root, EOW];
		const eow = EOW;
		assert(Object.keys(root.c).length === 0, "The Trie MUST be empty for cursors to work.");
		const stack = [{
			n: root,
			c: ""
		}];
		let currNode = root;
		let depth = 0;
		const insertChar = (char) => {
			assertIsValidChar(char);
			if (!depth || char === sug) this.#trieInfoBuilder.addWord(char);
			if (currNode.k) {
				const s = stack[depth];
				const { k: _, c, ...copy } = currNode;
				currNode = s.n.c[s.c] = copy;
				if (c) currNode.c = Object.assign(Object.create(null), c);
				nodes.push(currNode);
			}
			const c = currNode.c || Object.create(null);
			currNode.c = c;
			const n = currNode;
			const next = c[char] = c[char] || {};
			nodes.push(next);
			++depth;
			const s = stack[depth];
			if (s) {
				s.n = n;
				s.c = char;
			} else stack.push({
				n,
				c: char
			});
			currNode = next;
		};
		const markEOW = () => {
			if (!currNode.c) {
				const s = stack[depth];
				s.n.c[s.c] = eow;
				if (nodes[nodes.length - 1] === currNode) nodes.pop();
				currNode = eow;
			} else currNode.f = 1;
		};
		const reference = (nodeId) => {
			const s = stack[depth];
			s.n.c[s.c] = nodes[nodeId];
			nodes.pop();
		};
		const backStep = (num) => {
			if (!num) return;
			assert(num <= depth && num > 0);
			depth -= num;
			currNode = stack[depth + 1].n;
		};
		return {
			insertChar,
			markEOW,
			reference,
			backStep
		};
	}
	sortChildren(node) {
		const entries = Object.entries(node.c).sort((a, b) => compare(a[0], b[0]));
		node.c = Object.fromEntries(entries);
		for (const c of Object.values(node.c)) if (c.c) this.sortChildren(c);
	}
	sortNodes() {
		if (this.shouldSort) this.sortChildren(this.root);
	}
};
//#endregion
//#region src/lib/io/importV3.ts
const characterMap = new Map([...new Map([
	["\n", "\\n"],
	["\r", "\\r"],
	["\\", "\\\\"]
])].map((a) => [a[1], a[0]]));
const DATA$1 = "__DATA__";
function importTrieV3AsTrieRoot(srcLines) {
	return importTrieV3WithBuilder(new TrieNodeBuilder(), srcLines);
}
function importTrieV3WithBuilder(builder, srcLines) {
	const timerStart = measurePerf("importTrieV3");
	const dataLines = typeof srcLines === "string" ? srcLines.split("\n") : Array.isArray(srcLines) ? srcLines : [...srcLines];
	let radix = 16;
	const comment = /^\s*#/;
	function parseHeaderRows(headerRows) {
		const header = headerRows.slice(0, 2).join("\n");
		const headerReg = /^TrieXv3\nbase=(\d+)$/;
		/* istanbul ignore if */
		if (!headerReg.test(header)) throw new Error("Unknown file format");
		radix = Number.parseInt(header.replace(headerReg, "$1"), 10);
	}
	function findStartOfData(data) {
		for (let i = 0; i < data.length; ++i) if (data[i].includes(DATA$1)) return i;
		return -1;
	}
	function readHeader(data) {
		const headerRows = [];
		for (const hLine of data) {
			const line = hLine.trim();
			if (!line || comment.test(line)) continue;
			if (line === DATA$1) break;
			headerRows.push(line);
		}
		parseHeaderRows(headerRows);
	}
	const startOfData = findStartOfData(dataLines);
	if (startOfData < 0) throw new Error("Unknown file format");
	readHeader(dataLines.slice(0, startOfData));
	let node = {
		cursor: builder.getCursor(),
		parser: void 0
	};
	const parser = parseStream(radix);
	const timerParse = measurePerf("importTrieV3.parse");
	for (let i = startOfData + 1; i < dataLines.length; ++i) {
		const line = dataLines[i];
		for (const c of line) node = parser(node, c);
	}
	timerParse();
	timerStart();
	return builder.build();
}
function parseStream(radix) {
	function parseReference(acc, _) {
		let ref = "";
		function parser(acc, s) {
			if (s === ";") {
				const { cursor } = acc;
				const r = Number.parseInt(ref, radix);
				cursor.reference(r + 1);
				acc.parser = void 0;
				return acc;
			}
			ref = ref + s;
			return acc;
		}
		acc.parser = parser;
		return acc;
	}
	function parseEscapeCharacter(acc, _) {
		let prev = "";
		const parser = function(acc, s) {
			if (prev) {
				s = characterMap.get(prev + s) || s;
				acc.parser = void 0;
				return parseCharacter(acc, s);
			}
			if (s === "\\") {
				prev = s;
				return acc;
			}
			acc.parser = void 0;
			return parseCharacter(acc, s);
		};
		acc.parser = parser;
		return acc;
	}
	function parseCharacter(acc, s) {
		acc.cursor.insertChar(s);
		acc.parser = void 0;
		return acc;
	}
	function parseEOW(acc, _) {
		acc.parser = parseBack;
		acc.cursor.markEOW();
		acc.cursor.backStep(1);
		return acc;
	}
	const charactersBack = stringToCharSet$1("<23456789");
	function parseBack(acc, s) {
		if (!(s in charactersBack)) {
			acc.parser = void 0;
			return parserMain(acc, s);
		}
		const n = s === "<" ? 1 : Number.parseInt(s, 10) - 1;
		acc.cursor.backStep(n);
		acc.parser = parseBack;
		return acc;
	}
	function parseIgnore(acc, _) {
		return acc;
	}
	const parsers = new Map([
		["$", parseEOW],
		["<", parseBack],
		["#", parseReference],
		["\\", parseEscapeCharacter],
		["\n", parseIgnore],
		["\r", parseIgnore]
	]);
	function parserMain(acc, s) {
		return (acc.parser ?? parsers.get(s) ?? parseCharacter)(acc, s);
	}
	return parserMain;
}
function stringToCharSet$1(values) {
	const set = Object.create(null);
	const len = values.length;
	for (let i = 0; i < len; ++i) set[values[i]] = true;
	return set;
}
//#endregion
//#region src/lib/io/importV3FastBlob.ts
function importTrieV3AsTrieBlob(srcLines) {
	return importTrieV3WithBuilder(new TrieBlobBuilder(), srcLines);
}
//#endregion
//#region src/lib/io/decode.ts
function decodeTrieData(raw) {
	if (typeof raw === "string") return decodeStringFormat(raw);
	const data = toUint8Array(raw);
	if (isBTrieData(data)) return decodeBTrie(data);
	return decodeStringFormat(new TextDecoder().decode(data));
}
function decodeStringFormat(data) {
	return importTrie$2(data);
}
const deserializers$1 = [
	(data) => new TrieNodeTrie(importTrie$5(data)),
	(data) => new TrieNodeTrie(importTrie$5(data)),
	(data) => new TrieNodeTrie(importTrie$4(data)),
	(data) => importTrieV3AsTrieBlob(data),
	(data) => new TrieNodeTrie(importTrie$3(data))
];
const headerReg$1 = /^\s*TrieXv(\d+)/m;
function importTrie$2(input) {
	const lines = Array.isArray(input) ? input : typeof input === "string" ? input.split("\n") : [...input];
	function parseHeaderRows(headerRows) {
		for (let i = 0; i < headerRows.length; ++i) {
			const match = headerRows[i].match(headerReg$1);
			if (match) return Number.parseInt(match[1], 10);
		}
		throw new Error("Unknown file format");
	}
	function readHeader(iter) {
		const headerRows = [];
		for (const entry of iter) {
			const line = entry.trim();
			headerRows.push(line);
			if (line === "*" || line === "__DATA__") break;
		}
		return headerRows;
	}
	const version = parseHeaderRows(readHeader(lines));
	const method = deserializers$1[version];
	if (!method) throw new Error(`Unsupported version: ${version}`);
	return method(lines);
}
//#endregion
//#region src/lib/suggestions/suggest.ts
const baseCost = opCosts.baseCost;
const postSwapCost = opCosts.swapCost - baseCost;
const insertSpaceCost = -1;
const mapSubCost = opCosts.visuallySimilar;
const maxCostScale = opCosts.wordLengthCostFactor;
const discourageInsertCost = baseCost;
const setOfSeparators = new Set(["+", " "]);
function suggest(root, word, options = {}) {
	const opts = createSuggestionOptions(options);
	const collector = suggestionCollector(word, clean(opts));
	collector.collect(genSuggestions(root, word, {
		...opts,
		...collector.genSuggestionOptions
	}));
	return collector.suggestions;
}
function* genSuggestions(root, word, options = {}) {
	const roots = Array.isArray(root) ? root : [root];
	for (const r of roots) yield* genCompoundableSuggestions(r, word, options);
}
function* genCompoundableSuggestions(root, word, options = {}) {
	const { compoundMethod = CompoundWordsMethod.NONE, changeLimit, ignoreCase } = createSuggestionOptions(options);
	const history = [];
	const historyTags = /* @__PURE__ */ new Map();
	const bc = baseCost;
	const psc = postSwapCost;
	const matrix = [[]];
	const stack = [];
	const x = " " + word;
	const mx = x.length - 1;
	const specialInsCosts = Object.assign(Object.create(null), {
		[" "]: insertSpaceCost,
		["+"]: insertSpaceCost
	});
	const specialSubCosts = Object.assign(Object.create(null), { "-": discourageInsertCost });
	let stopNow = false;
	let costLimit = bc * Math.min(word.length * maxCostScale, changeLimit);
	function updateCostLimit(maxCost) {
		switch (typeof maxCost) {
			case "number":
				costLimit = maxCost;
				break;
			case "symbol":
				stopNow = true;
				break;
		}
	}
	const a = 0;
	let b = 0;
	for (let i = 0, c = 0; i <= mx && c <= costLimit; ++i) {
		c = i * baseCost;
		matrix[0][i] = c;
		b = i;
	}
	stack[0] = {
		a,
		b
	};
	const iWalk = hintedWalker(root, ignoreCase, word, compoundMethod, options.compoundSeparator);
	let goDeeper = true;
	for (let r = iWalk.next({ goDeeper }); !stopNow && !r.done; r = iWalk.next({ goDeeper })) {
		const { text, node, depth } = r.value;
		let { a, b } = stack[depth];
		/** Current character from word */
		const w = text.slice(-1);
		/** Current character visual letter group */
		const wG = visualLetterMaskMap[w] || 0;
		if (setOfSeparators.has(w)) {
			const mxRange = matrix[depth].slice(a, b + 1);
			const mxMin = Math.min(...mxRange);
			const tag = [a, ...mxRange.map((c) => c - mxMin)].join(",");
			const ht = historyTags.get(tag);
			if (ht && ht.m <= mxMin) {
				goDeeper = false;
				const { i, w, m } = ht;
				if (i >= history.length) continue;
				if (history[i].word.slice(0, w.length) !== w) continue;
				const dc = mxMin - m;
				for (let p = i; p < history.length; ++p) {
					const { word, cost: hCost } = history[p];
					if (word.slice(0, w.length) !== w) break;
					const cost = hCost + dc;
					if (cost <= costLimit) updateCostLimit(yield {
						word: text + word.slice(w.length),
						cost
					});
				}
				continue;
			} else historyTags.set(tag, {
				w: text,
				i: history.length,
				m: mxMin
			});
		}
		/** current depth */
		const d = depth + 1;
		const lastSugLetter = d > 1 ? text[d - 2] : "";
		/** standard cost */
		const c = bc - d + (specialSubCosts[w] || 0);
		/** insert cost */
		const ci = c + (specialInsCosts[w] || 0);
		matrix[d] = matrix[d] || [];
		matrix[d][a] = matrix[d - 1][a] + ci + d - a;
		let lastLetter = x[a];
		let min = matrix[d][a];
		let i;
		for (i = a + 1; i <= b; ++i) {
			const curLetter = x[i];
			/** current group */
			const cG = visualLetterMaskMap[curLetter] || 0;
			const subCost = w === curLetter ? 0 : wG & cG ? mapSubCost : curLetter === lastSugLetter ? w === lastLetter ? psc : c : c;
			const e = Math.min(matrix[d - 1][i - 1] + subCost, matrix[d - 1][i] + ci, matrix[d][i - 1] + c);
			min = Math.min(min, e);
			matrix[d][i] = e;
			lastLetter = curLetter;
		}
		const { b: bb } = stack[d - 1];
		while (b < mx) {
			b += 1;
			i = b;
			const curLetter = x[i];
			const cG = visualLetterMaskMap[curLetter] || 0;
			const subCost = w === curLetter ? 0 : wG & cG ? mapSubCost : curLetter === lastSugLetter ? w === lastLetter ? psc : c : c;
			const j = Math.min(bb, i - 1);
			const e = Math.min(matrix[d - 1][j] + subCost, matrix[d][i - 1] + c);
			min = Math.min(min, e);
			matrix[d][i] = e;
			lastLetter = curLetter;
			if (e > costLimit) break;
		}
		for (; b > a && matrix[d][b] > costLimit; b -= 1);
		for (; a < b && matrix[d][a] > costLimit; a += 1);
		b = Math.min(b + 1, mx);
		stack[d] = {
			a,
			b
		};
		const cost = matrix[d][b];
		if (node.f && isWordTerminationNode(node) && cost <= costLimit) {
			const r = {
				word: text,
				cost
			};
			history.push(r);
			updateCostLimit(yield r);
		} else updateCostLimit(yield void 0);
		goDeeper = min <= costLimit;
	}
}
//#endregion
//#region src/lib/trie.ts
const defaultLegacyMinCompoundLength = 3;
var Trie = class Trie {
	_options;
	_findOptionsDefaults;
	_findOptionsExact;
	isLegacy;
	hasForbidden;
	root;
	count;
	constructor(root, count) {
		this.root = root;
		this.count = count;
		this._options = mergeOptionalWithDefaults(root);
		this.isLegacy = this.calcIsLegacy();
		this.hasForbidden = !!root.c[root.forbiddenWordPrefix];
		this._findOptionsDefaults = {
			caseInsensitivePrefix: this._options.stripCaseAndAccentsPrefix,
			compoundFix: this._options.compoundCharacter,
			forbidPrefix: this._options.forbiddenWordPrefix
		};
		this._findOptionsExact = this.createFindOptions({ compoundMode: "none" });
	}
	/**
	* Number of words in the Trie
	*/
	size() {
		this.count = this.count ?? countWords(this.root);
		return this.count;
	}
	isSizeKnown() {
		return this.count !== void 0;
	}
	get options() {
		return this._options;
	}
	/**
	* @param text - text to find in the Trie
	* @param minCompoundLength - deprecated - allows words to be glued together
	*/
	find(text, minCompoundLength = false) {
		const minLength = !minCompoundLength ? void 0 : minCompoundLength === true ? defaultLegacyMinCompoundLength : minCompoundLength;
		const options = this.createFindOptions({
			compoundMode: minLength ? "legacy" : "compound",
			legacyMinCompoundLength: minLength
		});
		return findWordNode(this.root, text, options).node;
	}
	/**
	* A case sensitive search for the word.
	* @param word - the word to search for.
	* @param minLegacyCompoundLength - minimum length of legacy compounds to consider.
	* @returns true if the word is found and not forbidden.
	*/
	has(word, minLegacyCompoundLength) {
		if (minLegacyCompoundLength !== void 0) return this.#hasLegacy(word, minLegacyCompoundLength);
		return this.hasWord(word, true);
	}
	#hasLegacy(word, minLegacyCompoundLength) {
		if (this.hasWord(word, false)) return true;
		if (minLegacyCompoundLength) return !!this.findWord(word, {
			useLegacyWordCompounds: minLegacyCompoundLength,
			caseSensitive: false
		}).found;
		return false;
	}
	/**
	* Determine if a word is in the dictionary.
	* @param word - the exact word to search for - must be normalized.
	* @param caseSensitive - false means also searching a dictionary where the words were normalized to lower case and accents removed.
	* @returns true if the word was found and is not forbidden.
	*/
	hasWord(word, caseSensitive) {
		const f = this.findWord(word, { caseSensitive });
		return !!f.found && !f.forbidden;
	}
	findWord(word, options) {
		if (options?.useLegacyWordCompounds) {
			const len = options.useLegacyWordCompounds !== true ? options.useLegacyWordCompounds : defaultLegacyMinCompoundLength;
			const findOptions = this.createFindOptions({
				legacyMinCompoundLength: len,
				matchCase: options.caseSensitive,
				compoundSeparator: void 0
			});
			return findLegacyCompound(this.root, word, findOptions);
		}
		if (options?.compoundSeparator) return findWord(this.root, word, this.createFindOptions({
			matchCase: options.caseSensitive,
			compoundSeparator: options.compoundSeparator
		}));
		const findOptions = this.createFindOptionsMatchCase(options?.caseSensitive);
		return findWord(this.root, word, findOptions);
	}
	/**
	* Determine if a word is in the forbidden word list.
	* @param word the word to lookup.
	*/
	isForbiddenWord(word) {
		return this.hasForbidden && isForbiddenWord(this.root, word, this.options.forbiddenWordPrefix);
	}
	/**
	* Provides an ordered sequence of words with the prefix of text.
	*/
	completeWord(text) {
		const n = this.find(text);
		const compoundChar = this.options.compoundCharacter;
		const subNodes = pipeSync(iteratorTrieWords(n || {}), opFilterSync((w) => w[w.length - 1] !== compoundChar), opMapSync((suffix) => text + suffix));
		return pipeSync(n && isWordTerminationNode(n) ? [text] : [], opAppendSync(subNodes));
	}
	/**
	* Suggest spellings for `text`.  The results are sorted by edit distance with changes near the beginning of a word having a greater impact.
	* @param text - the text to search for
	* @param maxNumSuggestions - the maximum number of suggestions to return.
	* @param compoundMethod - Use to control splitting words.
	* @param numChanges - the maximum number of changes allowed to text. This is an approximate value, since some changes cost less than others.
	*                      the lower the value, the faster results are returned. Values less than 4 are best.
	*/
	suggest(text, options) {
		return this.suggestWithCost(text, options).map((a) => a.word);
	}
	/**
	* Suggest spellings for `text`.  The results are sorted by edit distance with changes near the beginning of a word having a greater impact.
	* The results include the word and adjusted edit cost.  This is useful for merging results from multiple tries.
	*/
	suggestWithCost(text, options) {
		const sep = options.compoundSeparator;
		const adjWord = sep ? replaceAllFactory(sep, "") : (a) => a;
		const optFilter = options.filter;
		const filter = optFilter ? (word, cost) => {
			const w = adjWord(word);
			return !this.isForbiddenWord(w) && optFilter(w, cost);
		} : (word) => !this.isForbiddenWord(adjWord(word));
		const opts = {
			...options,
			filter
		};
		return suggest(this.root, text, opts);
	}
	/**
	* genSuggestions will generate suggestions and send them to `collector`. `collector` is responsible for returning the max acceptable cost.
	* Costs are measured in weighted changes. A cost of 100 is the same as 1 edit. Some edits are considered cheaper.
	* Returning a MaxCost < 0 will effectively cause the search for suggestions to stop.
	*/
	genSuggestions(collector, compoundMethod) {
		const filter = (word) => !this.isForbiddenWord(word);
		const options = clean({
			compoundMethod,
			...collector.genSuggestionOptions
		});
		const suggestions = genSuggestions(this.root, collector.word, options);
		collector.collect(suggestions, void 0, filter);
	}
	/**
	* Returns an iterator that can be used to get all words in the trie. For some dictionaries, this can result in millions of words.
	*/
	*words(prefix) {
		if (!prefix) {
			yield* iteratorTrieWords(this.root);
			return;
		}
		const node = this.find(prefix);
		if (!node) return;
		if (node.f) yield prefix;
		for (const suffix of iteratorTrieWords(node)) yield prefix + suffix;
	}
	/**
	* Allows iteration over the entire tree.
	* On the returned Iterator, calling .next(goDeeper: boolean), allows for controlling the depth.
	*/
	iterate() {
		return walker(this.root);
	}
	insert(word) {
		insert(word, this.root);
		return this;
	}
	calcIsLegacy() {
		const c = this.root.c;
		return !(c && c[this._options.compoundCharacter] || c[this._options.stripCaseAndAccentsPrefix] || c[this._options.forbiddenWordPrefix]);
	}
	static create(words, options) {
		const root = createTrieRootFromList(words, options);
		orderTrie(root);
		return new Trie(root, void 0);
	}
	createFindOptions(options = {}) {
		return createFindOptions({
			...this._findOptionsDefaults,
			...options
		});
	}
	lastCreateFindOptionsMatchCaseMap = /* @__PURE__ */ new Map();
	createFindOptionsMatchCase(matchCase) {
		const f = this.lastCreateFindOptionsMatchCaseMap.get(matchCase);
		if (f !== void 0) return f;
		const findOptions = this.createFindOptions({ matchCase });
		this.lastCreateFindOptionsMatchCaseMap.set(matchCase, findOptions);
		return findOptions;
	}
};
//#endregion
//#region src/lib/utils/secondChanceCache.ts
var SecondChanceCache = class {
	map0 = /* @__PURE__ */ new Map();
	map1 = /* @__PURE__ */ new Map();
	maxL0Size;
	constructor(maxL0Size) {
		this.maxL0Size = maxL0Size;
	}
	has(key) {
		if (this.map0.has(key)) return true;
		if (this.map1.has(key)) {
			this.set(key, this.get1(key));
			return true;
		}
		return false;
	}
	get(key) {
		return this.map0.get(key) ?? this.get1(key);
	}
	set(key, value) {
		if (this.map0.size >= this.maxL0Size && !this.map0.has(key)) {
			this.map1 = this.map0;
			this.map0 = /* @__PURE__ */ new Map();
		}
		this.map0.set(key, value);
		return this;
	}
	get size() {
		return this.map0.size + this.map1.size;
	}
	get size0() {
		return this.map0.size;
	}
	get size1() {
		return this.map1.size;
	}
	clear() {
		this.map0.clear();
		this.map1.clear();
		return this;
	}
	get1(key) {
		if (this.map1.has(key)) {
			const v = this.map1.get(key);
			this.map1.delete(key);
			this.map0.set(key, v);
			return v;
		}
	}
	toArray() {
		return [...this.map1, ...this.map0];
	}
};
//#endregion
//#region src/lib/TrieBuilder.ts
/**
* Builds an optimized Trie from a Iterable<string>. It attempts to reduce the size of the trie
* by finding common endings.
* @param words Iterable set of words -- no processing is done on the words, they are inserted as is.
* @param trieOptions options for the Trie
*/
function buildTrie(words, trieOptions) {
	return new TrieBuilder(words, trieOptions).build();
}
/**
* Builds a Trie from a Iterable<string>. NO attempt a reducing the size of the Trie is done.
* @param words Iterable set of words -- no processing is done on the words, they are inserted as is.
* @param trieOptions options for the Trie
*/
function buildTrieFast(words, trieOptions) {
	return new Trie(createTrieRootFromList(words, trieOptions), void 0);
}
const MAX_NUM_SIGS = 1e5;
const MAX_TRANSFORMS = 1e6;
const MAX_CACHE_SIZE = 1e6;
var TrieBuilder = class {
	count = 0;
	signatures = new SecondChanceCache(MAX_NUM_SIGS);
	cached = new SecondChanceCache(MAX_CACHE_SIZE);
	transforms = new SecondChanceCache(MAX_TRANSFORMS);
	_eow;
	/** position 0 of lastPath is always the root */
	lastPath = [{
		s: "",
		n: {
			id: 0,
			f: void 0,
			c: void 0
		}
	}];
	tails = /* @__PURE__ */ new Map();
	trieOptions;
	numWords = 0;
	_debug_lastWordsInserted = [];
	_debug_mode = false;
	constructor(words, trieOptions) {
		this._eow = this.#createNodeFrozen(1);
		this.tails.set("", this._eow);
		this.#canBeCached(this._eow);
		this.signatures.set(this.#signature(this._eow), this._eow);
		this.cached.set(this._eow, this._eow.id ?? ++this.count);
		this.trieOptions = Object.freeze(mergeOptionalWithDefaults(trieOptions));
		if (words) this.insert(words);
	}
	get _root() {
		return trieNodeToRoot(this.lastPath[0].n, this.trieOptions);
	}
	#signature(n) {
		const isWord = n.f ? "*" : "";
		const entries = n.c ? Object.entries(n.c) : void 0;
		const c = entries ? entries.map(([k, n]) => [k, this.cached.get(n)]) : void 0;
		return isWord + (c ? JSON.stringify(c) : "");
	}
	#canBeCached(n) {
		if (!n.c) return true;
		for (const v of Object.values(n.c)) if (!this.cached.has(v)) return false;
		return true;
	}
	#tryCacheFrozen(n) {
		assertFrozen(n);
		if (this.cached.has(n)) return n;
		this.cached.set(n, n.id ?? ++this.count);
		return n;
	}
	#freeze(n) {
		if (Object.isFrozen(n)) return n;
		// istanbul ignore else
		if (n.c) {
			const c = Object.entries(n.c).sort((a, b) => a[0] < b[0] ? -1 : 1).map(([k, n]) => [k, this.#freeze(n)]);
			n.c = Object.fromEntries(c);
			Object.freeze(n.c);
		}
		return Object.freeze(n);
	}
	#tryToCache(n) {
		if (!this.#canBeCached(n)) return n;
		const sig = this.#signature(n);
		const ref = this.signatures.get(sig);
		if (ref !== void 0) return this.#tryCacheFrozen(ref);
		this.signatures.set(sig, this.#freeze(n));
		return n;
	}
	#storeTransform(src, s, result) {
		if (!Object.isFrozen(result) || !Object.isFrozen(src)) return;
		this.#logDebug("storeTransform", () => ({
			s,
			src: this.#debNodeInfo(src),
			result: this.#debNodeInfo(result)
		}));
		const t = this.transforms.get(src) ?? /* @__PURE__ */ new Map();
		t.set(s, result);
		this.transforms.set(src, t);
	}
	#addChild(node, head, child) {
		if (node.c?.[head] !== child) {
			let c = node.c || Object.create(null);
			if (Object.isFrozen(c)) c = Object.assign(Object.create(null), c);
			c[head] = child;
			if (Object.isFrozen(node)) node = this.#createNode(node.f, c);
			else node.c = c;
		}
		return Object.isFrozen(child) ? this.#tryToCache(node) : node;
	}
	#buildTail(s) {
		const ss = s.join("");
		const v = this.tails.get(ss);
		if (v) return v;
		const head = s[0];
		const tail = s.slice(1);
		const t = this.tails.get(tail.join(""));
		const c = t || this.#buildTail(tail);
		const n = this.#addChild(this.#createNode(), head, c);
		if (!t) return n;
		const cachedNode = this.#tryCacheFrozen(this.#freeze(n));
		this.tails.set(ss, cachedNode);
		return cachedNode;
	}
	#_insert(node, s, d) {
		this.#logDebug("_insert", () => ({
			n: this.#debNodeInfo(node),
			s,
			d,
			w: this.lastPath.map((a) => a.s).join("")
		}));
		const orig = node;
		if (Object.isFrozen(node)) {
			const n = this.transforms.get(node)?.get(s.join(""));
			if (n) return this.#tryCacheFrozen(n);
		}
		if (!s.length) if (!node.c) return this._eow;
		else {
			node = this.#copyIfFrozen(node);
			node.f = this._eow.f;
			return node;
		}
		const head = s[0];
		const tail = s.slice(1);
		const cNode = node.c?.[head];
		const child = cNode ? this.#_insert(cNode, tail, d + 1) : this.#buildTail(tail);
		node = this.#addChild(node, head, child);
		this.#storeTransform(orig, s.join(""), node);
		this.lastPath[d] = {
			s: head,
			n: child
		};
		return node;
	}
	insertWord(word) {
		this.#logDebug("insertWord", word);
		this._debug_lastWordsInserted[this.numWords & 15] = word;
		this.numWords++;
		const chars = [...word];
		let d = 1;
		for (const s of chars) {
			if (this.lastPath[d]?.s !== s) break;
			d++;
		}
		if (chars.length < d) d = chars.length;
		this.lastPath.length = d;
		d -= 1;
		const { n } = this.lastPath[d];
		const tail = chars.slice(d);
		this.lastPath[d].n = this.#_insert(n, tail, d + 1);
		while (d > 0) {
			const { s, n } = this.lastPath[d];
			d -= 1;
			const parent = this.lastPath[d];
			const pn = parent.n;
			parent.n = this.#addChild(pn, s, n);
			if (pn === parent.n) break;
			const tail = chars.slice(d);
			this.#storeTransform(pn, tail.join(""), parent.n);
		}
	}
	insert(words) {
		for (const w of words) w && this.insertWord(w);
	}
	/**
	* Resets the builder
	*/
	reset() {
		this.lastPath = [{
			s: "",
			n: {
				id: 0,
				f: void 0,
				c: void 0
			}
		}];
		this.cached.clear();
		this.signatures.clear();
		this.signatures.set(this.#signature(this._eow), this._eow);
		this.count = 0;
		this.cached.set(this._eow, this._eow.id ?? ++this.count);
	}
	build(consolidateSuffixes = false) {
		const root = this._root;
		this.reset();
		const check = checkCircular(this._root);
		if (check.isCircular) {
			const { word, pos } = check.ref;
			console.error("Circular Reference %o", {
				word,
				pos
			});
			throw new Error("Trie: Circular Reference");
		}
		return new Trie(consolidateSuffixes ? consolidate(root) : root);
	}
	#debNodeInfo(node) {
		return {
			id: node.id ?? "?",
			cid: this.cached.get(node) ?? "?",
			f: node.f || 0,
			c: node.c ? Object.fromEntries(Object.entries(node.c).map(([k, n]) => [k, {
				id: n.id,
				r: this.cached.get(n)
			}])) : void 0,
			L: Object.isFrozen(node)
		};
	}
	#logDebug(methodName, contentOrFunction) {
		this.#runDebug(() => {
			const content = typeof contentOrFunction === "function" ? contentOrFunction() : contentOrFunction;
			console.warn("%s: %o", methodName, content);
		});
	}
	#runDebug(method) {
		if (this._debug_mode) method();
	}
	#copyIfFrozen(n) {
		if (!Object.isFrozen(n)) return n;
		const c = n.c ? Object.assign(Object.create(null), n.c) : void 0;
		return this.#createNode(n.f, c);
	}
	#createNodeFrozen(f, c) {
		return this.#freeze(this.#createNode(f, c));
	}
	#createNode(f, c) {
		return {
			id: ++this.count,
			f,
			c
		};
	}
};
function assertFrozen(n) {
	if (!("id" in n)) console.warn("%o", n);
	if (!Object.isFrozen(n) || !("id" in n)) throw new Error("Must be TrieNodeExFrozen");
}
//#endregion
//#region src/lib/utils/normalizeWord.ts
/**
* Normalize word unicode.
* @param text - text to normalize
* @returns returns a word normalized to `NFC`
*/
const normalizeWord = (text) => text.normalize();
/**
* converts text to lower case and removes any accents.
* @param text - text to convert
* @returns lowercase word without accents
* @deprecated true
*/
const normalizeWordToLowercase = (text) => text.toLowerCase().normalize("NFD").replaceAll(/\p{M}/gu, "");
/**
* generate case insensitive forms of a word
* @param text - text to convert
* @returns the forms of the word.
*/
const normalizeWordForCaseInsensitive = (text) => {
	const t = text.toLowerCase();
	return [t, t.normalize("NFD").replaceAll(/\p{M}/gu, "")];
};
//#endregion
//#region src/lib/SimpleDictionaryParser.ts
const BATCH_SIZE = 0;
const _defaultOptions = {
	commentCharacter: "#",
	optionalCompoundCharacter: "*",
	compoundCharacter: "+",
	forbiddenPrefix: "!",
	caseInsensitivePrefix: "~",
	keepExactPrefix: "=",
	stripCaseAndAccents: true,
	stripCaseAndAccentsKeepDuplicate: false,
	stripCaseAndAccentsOnForbidden: false,
	split: false,
	splitKeepBoth: false,
	splitSeparator: /[\s,;]/g,
	keepOptionalCompoundCharacter: false,
	suggestionPrefix: ":",
	disableSuggestionHandling: false,
	makeWordsForbidden: false
};
Object.freeze(_defaultOptions);
const cSpellToolDirective = "cspell-dictionary:";
/**
* Normalizes a dictionary words based upon prefix / suffixes.
* Case insensitive versions are also generated.
* @param options - defines prefixes used when parsing lines.
* @returns words that have been normalized.
*/
function createDictionaryLineParserMapper(options) {
	const _options = options || _defaultOptions;
	const { commentCharacter = _defaultOptions.commentCharacter, optionalCompoundCharacter: optionalCompound = _defaultOptions.optionalCompoundCharacter, compoundCharacter: compound = _defaultOptions.compoundCharacter, caseInsensitivePrefix: ignoreCase = _defaultOptions.caseInsensitivePrefix, forbiddenPrefix: forbidden = _defaultOptions.forbiddenPrefix, keepExactPrefix: keepCase = _defaultOptions.keepExactPrefix, splitSeparator = _defaultOptions.splitSeparator, splitKeepBoth = _defaultOptions.splitKeepBoth, stripCaseAndAccentsKeepDuplicate = _defaultOptions.stripCaseAndAccentsKeepDuplicate, stripCaseAndAccentsOnForbidden = _defaultOptions.stripCaseAndAccentsOnForbidden, keepOptionalCompoundCharacter = _defaultOptions.keepOptionalCompoundCharacter, makeWordsForbidden = _defaultOptions.makeWordsForbidden } = _options;
	let { stripCaseAndAccents = !makeWordsForbidden && _defaultOptions.stripCaseAndAccents, split = _defaultOptions.split, suggestionPrefix = _defaultOptions.suggestionPrefix } = _options;
	const disableSuggestionHandling = _options.disableSuggestionHandling || [
		"",
		" ",
		"	",
		"\0"
	].includes(suggestionPrefix);
	if (disableSuggestionHandling) suggestionPrefix = " ";
	function isString(line) {
		return typeof line === "string";
	}
	function trim(line) {
		return line.trim();
	}
	function removeComments(line) {
		const idx = line.indexOf(commentCharacter);
		if (idx < 0) return line;
		const idxDirective = line.indexOf(cSpellToolDirective, idx);
		if (idxDirective >= 0) {
			const flags = line.slice(idxDirective).split(/[\s,;]/g).map((s) => s.trim()).filter((a) => !!a);
			for (const flag of flags) switch (flag) {
				case "split":
					split = true;
					break;
				case "no-split":
					split = false;
					break;
				case "no-generate-alternatives":
					stripCaseAndAccents = false;
					break;
				case "generate-alternatives":
					stripCaseAndAccents = true;
					break;
			}
		}
		return line.slice(0, idx).trim();
	}
	function filterEmptyLines(line) {
		return !!line;
	}
	function* mapOptionalPrefix(line) {
		if (line[0] === optionalCompound) {
			const t = line.slice(1);
			yield t;
			yield compound + t;
		} else yield line;
	}
	function* mapOptionalSuffix(line) {
		if (line.slice(-1) === optionalCompound) {
			const t = line.slice(0, -1);
			yield t;
			yield t + compound;
		} else yield line;
	}
	const doNotNormalizePrefix = Object.create(null);
	[
		ignoreCase,
		keepCase,
		"\""
	].forEach((prefix) => doNotNormalizePrefix[prefix] = true);
	if (!stripCaseAndAccentsOnForbidden) doNotNormalizePrefix[forbidden] = true;
	function removeDoublePrefix(w) {
		return w.startsWith(ignoreCase + ignoreCase) ? w.slice(1) : w;
	}
	function stripKeepCasePrefixAndQuotes(word) {
		word = word.replaceAll(/"(.*?)"/g, "$1");
		return word[0] === keepCase ? word.slice(1) : word;
	}
	function _normalize(word) {
		return normalizeWord(stripKeepCasePrefixAndQuotes(word));
	}
	function* handleForbiddenPrefix(words) {
		if (!makeWordsForbidden) {
			yield* words;
			return;
		}
		const f = forbidden;
		const ff = f + f;
		const sug = suggestionPrefix;
		for (const word of words) {
			if (word.startsWith(sug)) {
				yield word;
				continue;
			}
			yield (f + word).replaceAll(ff, "");
		}
	}
	function* mapNormalize(word) {
		const nWord = _normalize(word);
		const forms = /* @__PURE__ */ new Set();
		forms.add(nWord);
		if (stripCaseAndAccents && !(word[0] in doNotNormalizePrefix)) for (const n of normalizeWordForCaseInsensitive(nWord)) (stripCaseAndAccentsKeepDuplicate || n !== nWord) && forms.add(ignoreCase + n);
		yield* forms;
	}
	function* splitWords(lines) {
		for (const line of lines) {
			if (split) {
				yield* splitLine(line.includes("\"") ? line.replaceAll(/".*?"/g, (quoted) => " " + quoted.replaceAll(/(\s)/g, "\\$1") + " ") : line, splitSeparator).map((escaped) => escaped.replaceAll("\\", ""));
				if (!splitKeepBoth) continue;
			}
			yield line;
		}
	}
	function* splitLines(paragraphs) {
		for (const paragraph of paragraphs) yield* paragraph.split("\n");
	}
	/**
	* Handle suggestion lines.
	* `:` is the default suggestions prefix.
	*
	* The format can be:
	* - `:word:suggestion1` # word with a single preferred suggestion (note: it is only a suggestion.)
	* - `:word : suggestion1` # word with a single preferred suggestion (space will be removed).
	* - `:word:suggestion1,suggestion2` # word with multiple preferred suggestions
	* - `:word -> suggestion1, suggestion2` # word with multiple preferred suggestions (alternate format)
	* - `:word:suggestion1,suggestion2` # this is purely a suggestion entry.
	* - `!word:suggestion1,suggestion2` # forbidden word with suggestions.
	* - `word:suggestion1,suggestion2` # normal word with suggestions, the word is included in the dictionary.
	*
	* They are stored in the dictionary with the following format:
	*   `<prefix><word><suggestionPrefix><index><suggestionPrefix><suggestion>`
	*
	*
	* Example forbidden word with suggestions:
	* - `!word` the word itself
	* - `!word:0:first_suggestion` the word itself
	* - `!word:1:second_suggestion` the word itself
	* @param lines
	*/
	function* handleSuggestions(lines) {
		if (disableSuggestionHandling) {
			yield* lines;
			return;
		}
		for (const line of lines) yield* handleSuggestion(line);
	}
	const r = /^\s*(?<prefix>[!:~]*)(?<word>.*?)(?:->|:([0-9a-f]{1,2}:)?)(?<suggestions>.*)$/;
	const suggestionSequence = /* @__PURE__ */ new Map();
	const knownSuggestions = /* @__PURE__ */ new Set();
	function addSuggestion(word, suggestion) {
		const p = suggestionPrefix;
		const pp = p + p;
		const n = suggestionSequence.get(word) || 0;
		const k = word + pp + suggestion;
		if (knownSuggestions.has(k)) return;
		knownSuggestions.add(k);
		suggestionSequence.set(word, n + 1);
		return k.replace(pp, p + n.toString(16) + p);
	}
	function* handleSuggestion(line) {
		const hasAltFormat = line.includes("->");
		if (!line.includes(":") && !hasAltFormat) {
			yield line;
			return;
		}
		const m = line.match(r);
		if (!m || !m.groups) {
			yield line;
			return;
		}
		const prefix = m.groups["prefix"] || "";
		const word = (m.groups["word"] || "").trim();
		const suggestions = (m.groups["suggestions"] || "").split(",").map((s) => s.trim()).filter((s) => !!s);
		if (!prefix.includes(":")) yield prefix + word;
		const ww = ":" + word;
		yield ww;
		for (let i = 0; i < suggestions.length; i++) {
			const sug = addSuggestion(ww, suggestions[i]);
			if (sug) yield sug;
		}
	}
	const mapCompounds = keepOptionalCompoundCharacter ? [] : [opConcatMapSync(mapOptionalPrefix), opConcatMapSync(mapOptionalSuffix)];
	const optionalOperators = [];
	if (options?.sortBatchSize) optionalOperators.push(createBatchAndSortLines(options.sortBatchSize));
	return opCombineSync(opFilterSync(isString), splitLines, opMapSync(removeComments), splitWords, opMapSync(trim), opFilterSync(filterEmptyLines), handleSuggestions, ...mapCompounds, opConcatMapSync(mapNormalize), handleForbiddenPrefix, opMapSync(removeDoublePrefix), ...optionalOperators);
}
/**
* Normalizes a dictionary words based upon prefix / suffixes.
* Case insensitive versions are also generated.
* @param lines - one word per line
* @param _options - defines prefixes used when parsing lines.
* @returns words that have been normalized.
*/
function parseDictionaryLines(lines, options) {
	return createDictionaryLineParserMapper(options)(typeof lines === "string" ? [lines] : lines);
}
function parseLinesToDictionaryLegacy(lines, options) {
	const dictLines = parseDictionaryLines(lines, mergeOptions(_defaultOptions, options, { disableSuggestionHandling: true }));
	return buildTrieFast([...new Set(dictLines)].sort(), trieInfoFromOptions(options));
}
function parseDictionaryLegacy(text, options) {
	return parseLinesToDictionaryLegacy(typeof text === "string" ? text.split("\n") : text, options);
}
function parseLinesToDictionary(lines, options) {
	const endPerf = measurePerf("parseLinesToDictionary");
	const dictLines = parseDictionaryLines(lines, mergeOptions(_defaultOptions, options));
	const words = [...new Set(dictLines)].sort();
	const { optimize, useStringTable } = options || {};
	const t = buildITrieFromWords(words, trieInfoFromOptions(options), {
		optimize,
		useStringTable
	});
	endPerf();
	return t;
}
function parseDictionary(text, options) {
	return parseLinesToDictionary(typeof text === "string" ? text.split("\n") : text, options);
}
function trieInfoFromOptions(options) {
	const info = extractTrieInfo(options);
	const sugPrefix = info.suggestionPrefix ?? ":";
	if (options?.disableSuggestionHandling || sugPrefix !== ":") info.suggestionPrefix = " ";
	return info;
}
function mergeOptions(base, ...partials) {
	const opt = { ...base };
	for (const p of partials) {
		if (!p) continue;
		Object.assign(opt, p);
	}
	return opt;
}
const RegExpToEncode = /\\([\s,;])/g;
const RegExpDecode = /<<(%[\da-f]{2})>>/gi;
function encodeLine(line) {
	return line.replaceAll(RegExpToEncode, (_, v) => "<<" + encodeURIComponent(v) + ">>");
}
function decodeLine(line) {
	return line.replaceAll(RegExpDecode, (_, v) => "\\" + decodeURIComponent(v));
}
function splitLine(line, regExp) {
	return encodeLine(line).split(regExp).map((line) => decodeLine(line));
}
function createBatchAndSortLines(batchSize = BATCH_SIZE) {
	if (batchSize <= 1) return (s) => s;
	function* batchAndSortLines(lines) {
		const maxSize = batchSize;
		const batch = Array(maxSize);
		let i = 0;
		for (const line of lines) {
			batch[i++] = line;
			if (i >= maxSize) {
				batch.sort();
				yield* batch;
				i = 0;
			}
		}
		batch.length = i;
		batch.sort();
		yield* batch;
	}
	return batchAndSortLines;
}
//#endregion
//#region src/lib/utils/decompress.ts
async function decompress(data, method = "gzip") {
	const ds = new DecompressionStream(method);
	const writer = ds.writable.getWriter();
	const reader = ds.readable.getReader();
	try {
		const pWrite = writer.write(data).then(() => writer.close());
		const chunks = [];
		let size = 0;
		while (true) {
			const chunk = await reader.read();
			if (chunk.done) break;
			chunks.push(chunk.value);
			size += chunk.value.length;
		}
		const result = new Uint8Array(size);
		for (let offset = 0, i = 0; i < chunks.length; i++) {
			result.set(chunks[i], offset);
			offset += chunks[i].length;
		}
		await pWrite;
		return result;
	} finally {
		reader.releaseLock();
		writer.releaseLock();
	}
}
//#endregion
//#region src/lib/decodeTrie.ts
function decodeTrie(raw) {
	const endPerf = measurePerf("decodeTrie");
	const t = new ITrieImpl(decodeTrieData(raw));
	endPerf();
	return t;
}
async function decodeFile(file, options) {
	let pathname = file.url.pathname;
	let content = file.content;
	if (pathname.endsWith(".gz")) {
		pathname = pathname.slice(0, -3);
		if (typeof content !== "string") content = await decompress(content, "gzip");
	}
	if (pathname.endsWith(".trie") || pathname.endsWith(".btrie")) return decodeTrie(content);
	return parseDictionary(typeof content === "string" ? content : new TextDecoder().decode(content), options);
}
async function convertToBTrie(file, options) {
	const bTrieData = encodeITrieToBTrie(await decodeFile(file, options), options);
	const url = new URL(file.url);
	url.pathname = url.pathname.replaceAll(/\.gz$/g, "");
	url.pathname = url.pathname.split(".").slice(0, -1).join(".") + ".btrie";
	return {
		url,
		content: bTrieData
	};
}
//#endregion
//#region src/lib/io/importExportV3.ts
const specialCharacters = stringToCharSet([
	"$",
	"<",
	"\n",
	"#",
	";",
	"\\",
	"\r",
	"0123456789",
	"`~!@#$%^&*()_-+=[]{};:'\"<>,./?\\|"
].join(""));
const specialCharacterMap = new Map([
	["\n", "\\n"],
	["\r", "\\r"],
	["\\", "\\\\"]
]);
const specialPrefix = stringToCharSet("~!");
const WORDS_PER_LINE = 20;
const DATA = "__DATA__";
function generateHeader(base, comment) {
	return [
		"#!/usr/bin/env cspell-trie reader",
		"TrieXv3",
		"base=" + base,
		...comment ? comment.split("\n").map((a) => "# " + a) : [],
		"# Data:",
		DATA
	].map((a) => a + "\n");
}
/**
* Serialize a TrieRoot.
*/
function serializeTrie$1(root, options = 16) {
	options = typeof options === "number" ? {
		base: options,
		addLineBreaksToImproveDiffs: false
	} : options;
	const { base = 16, comment = "", addLineBreaksToImproveDiffs: addBreaks = true } = options;
	const radix = base > 36 ? 36 : base < 10 ? 10 : base;
	const cache = /* @__PURE__ */ new Map();
	const cacheShouldRef = /* @__PURE__ */ new Map();
	let count = 0;
	const backBuffer = {
		last: "",
		count: 0,
		words: 0,
		eol: false
	};
	const optimizeSimpleReferences = options.optimizeSimpleReferences ?? false;
	const wordChars = [];
	function ref(n) {
		return "#" + n.toString(radix) + ";";
	}
	function escape(s) {
		return s in specialCharacters ? "\\" + (specialCharacterMap.get(s) || s) : s;
	}
	function* flush() {
		while (backBuffer.count) {
			const n = Math.min(9, backBuffer.count);
			yield n > 1 ? backBuffer.last + n : backBuffer.last;
			backBuffer.last = "<";
			backBuffer.count -= n;
		}
		if (backBuffer.eol) {
			yield "\n";
			backBuffer.eol = false;
			backBuffer.words = 0;
		}
	}
	function* emit(s) {
		switch (s) {
			case "$":
				yield* flush();
				backBuffer.last = "$";
				backBuffer.count = 0;
				backBuffer.words++;
				break;
			case "<":
				backBuffer.count++;
				break;
			case "\n":
				backBuffer.eol = true;
				break;
			default:
				if (backBuffer.words >= WORDS_PER_LINE) backBuffer.eol = true;
				yield* flush();
				if (s.startsWith("#")) backBuffer.words++;
				yield s;
		}
	}
	function* walk(node, depth) {
		const r = cache.get(node);
		if (r !== void 0 && (!optimizeSimpleReferences || !shouldSimpleRef(node))) {
			yield* emit(ref(r));
			return;
		}
		if (node.c) {
			if (addBreaks && depth > 0 && depth <= 2) yield* emit("\n");
			cache.set(node, count++);
			const c = Object.entries(node.c).sort((a, b) => a[0] < b[0] ? -1 : 1);
			for (const [s, n] of c) {
				wordChars[depth] = s;
				yield* emit(escape(s));
				yield* walk(n, depth + 1);
				yield* emit("<");
				if (depth === 0) yield* emit("\n");
			}
		}
		if (node.f) yield* emit("$");
		if (addBreaks && (depth === 2 || depth === 3 && wordChars[0] in specialPrefix)) yield* emit("\n");
	}
	function* serialize(node) {
		yield* walk(node, 0);
		yield* flush();
	}
	function _calcShouldSimpleRef(node) {
		if (!node.c) return false;
		const values = Object.values(node.c);
		if (values.length !== 1) return false;
		const n = values[0];
		return !!n.f && (!n.c || !Object.values(n.c).length);
	}
	function shouldSimpleRef(node) {
		const r = cacheShouldRef.get(node);
		if (r !== void 0) return r;
		const rr = _calcShouldSimpleRef(node);
		cacheShouldRef.set(node, rr);
		return rr;
	}
	return pipeSync(generateHeader(radix, comment), opAppendSync(bufferLines(serialize(root), 1200, "")));
}
function importTrie$1(srcLines) {
	return importTrieV3AsTrieRoot(srcLines).root;
}
function stringToCharSet(values) {
	const set = Object.create(null);
	const len = values.length;
	for (let i = 0; i < len; ++i) set[values[i]] = true;
	return set;
}
//#endregion
//#region src/lib/io/importExport.ts
const serializers = [
	serializeTrie$4,
	serializeTrie$4,
	serializeTrie$3,
	serializeTrie$1,
	serializeTrie$2
];
const deserializers = [
	importTrie$5,
	importTrie$5,
	importTrie$4,
	importTrie$1,
	importTrie$3
];
const DEFAULT_VERSION = 3;
/**
* Serialize a TrieNode.
* Note: This is destructive.  The node will no longer be usable.
* Even though it is possible to preserve the trie, dealing with very large tries can consume a lot of memory.
* Considering this is the last step before exporting, it was decided to let this be destructive.
*/
function serializeTrie(root, options = 16) {
	const version = typeof options !== "number" && options.version ? options.version : DEFAULT_VERSION;
	const method = serializers[version];
	if (!method) throw new Error(`Unknown version: ${version}`);
	return method(root, options);
}
const headerReg = /^\s*TrieXv(\d+)/m;
function importTrie(input) {
	const lines = Array.isArray(input) ? input : typeof input === "string" ? input.split("\n") : [...input];
	function parseHeaderRows(headerRows) {
		for (let i = 0; i < headerRows.length; ++i) {
			const match = headerRows[i].match(headerReg);
			if (match) return Number.parseInt(match[1], 10);
		}
		throw new Error("Unknown file format");
	}
	function readHeader(iter) {
		const headerRows = [];
		for (const entry of iter) {
			const line = entry.trim();
			headerRows.push(line);
			if (line === "*" || line === "__DATA__") break;
		}
		return headerRows;
	}
	const version = parseHeaderRows(readHeader(lines));
	const method = deserializers[version];
	if (!method) throw new Error(`Unsupported version: ${version}`);
	return method(lines);
}
//#endregion
//#region src/lib/models/locale/knownLocales.ts
const codes = [
	["af", "Afrikaans"],
	[
		"af-NA",
		"Afrikaans",
		"Namibia"
	],
	[
		"af-ZA",
		"Afrikaans",
		"South Africa"
	],
	["ak", "Akan"],
	[
		"ak-GH",
		"Akan",
		"Ghana"
	],
	["am", "Amharic"],
	[
		"am-ET",
		"Amharic",
		"Ethiopia"
	],
	["ar", "Arabic"],
	["ar-1", "Arabic"],
	[
		"ar-AE",
		"Arabic",
		"United Arab Emirates"
	],
	[
		"ar-BH",
		"Arabic",
		"Bahrain"
	],
	[
		"ar-DJ",
		"Arabic",
		"Djibouti"
	],
	[
		"ar-DZ",
		"Arabic",
		"Algeria"
	],
	[
		"ar-EG",
		"Arabic",
		"Egypt"
	],
	["ar-EH", "Arabic"],
	[
		"ar-ER",
		"Arabic",
		"Eritrea"
	],
	[
		"ar-IL",
		"Arabic",
		"Israel"
	],
	[
		"ar-IQ",
		"Arabic",
		"Iraq"
	],
	[
		"ar-JO",
		"Arabic",
		"Jordan"
	],
	[
		"ar-KM",
		"Arabic",
		"Comoros"
	],
	[
		"ar-KW",
		"Arabic",
		"Kuwait"
	],
	[
		"ar-LB",
		"Arabic",
		"Lebanon"
	],
	[
		"ar-LY",
		"Arabic",
		"Libya"
	],
	[
		"ar-MA",
		"Arabic",
		"Morocco"
	],
	[
		"ar-MR",
		"Arabic",
		"Mauritania"
	],
	[
		"ar-OM",
		"Arabic",
		"Oman"
	],
	["ar-PS", "Arabic"],
	[
		"ar-QA",
		"Arabic",
		"Qatar"
	],
	[
		"ar-SA",
		"Arabic",
		"Saudi Arabia"
	],
	[
		"ar-SD",
		"Arabic",
		"Sudan"
	],
	[
		"ar-SO",
		"Arabic",
		"Somalia"
	],
	["ar-SS", "Arabic"],
	[
		"ar-SY",
		"Arabic",
		"Syria"
	],
	[
		"ar-TD",
		"Arabic",
		"Chad"
	],
	[
		"ar-TN",
		"Arabic",
		"Tunisia"
	],
	[
		"ar-YE",
		"Arabic",
		"Yemen"
	],
	["as", "Assamese"],
	[
		"as-IN",
		"Assamese",
		"India"
	],
	["az", "Azerbaijani"],
	[
		"az-AZ",
		"Azerbaijani",
		"Azerbaijan"
	],
	["be", "Belarusian"],
	[
		"be-BY",
		"Belarusian",
		"Belarus"
	],
	["bg", "Bulgarian"],
	[
		"bg-BG",
		"Bulgarian",
		"Bulgaria"
	],
	["bm", "Bambara"],
	[
		"bm-ML",
		"Bambara",
		"Mali"
	],
	["bn", "Bengali"],
	[
		"bn-BD",
		"Bengali",
		"Bangladesh"
	],
	[
		"bn-IN",
		"Bengali",
		"India"
	],
	["bo", "Tibetan"],
	[
		"bo-CN",
		"Tibetan",
		"China"
	],
	[
		"bo-IN",
		"Tibetan",
		"India"
	],
	["br", "Breton"],
	[
		"br-FR",
		"Breton",
		"France"
	],
	["bs", "Bosnian"],
	[
		"bs-BA",
		"Bosnian",
		"Bosnia and Herzegovina"
	],
	["ca", "Catalan"],
	[
		"ca-AD",
		"Catalan",
		"Andorra"
	],
	[
		"ca-ES",
		"Catalan",
		"Spain"
	],
	[
		"ca-FR",
		"Catalan",
		"France"
	],
	[
		"ca-IT",
		"Catalan",
		"Italy"
	],
	["ce", "Chechen"],
	[
		"ce-RU",
		"Chechen",
		"Russia"
	],
	["cs", "Czech"],
	[
		"cs-CZ",
		"Czech",
		"Czech Republic"
	],
	["cu", "Old Slavonic"],
	[
		"cu-RU",
		"Old Slavonic",
		"Russia"
	],
	["cy", "Welsh"],
	[
		"cy-GB",
		"Welsh",
		"United Kingdom"
	],
	["da", "Danish"],
	[
		"da-DK",
		"Danish",
		"Denmark"
	],
	[
		"da-GL",
		"Danish",
		"Greenland"
	],
	["de", "German"],
	[
		"de-AT",
		"German",
		"Austria"
	],
	[
		"de-BE",
		"German",
		"Belgium"
	],
	[
		"de-CH",
		"German",
		"Switzerland"
	],
	[
		"de-DE",
		"German",
		"Germany"
	],
	[
		"de-IT",
		"German",
		"Italy"
	],
	[
		"de-LI",
		"German",
		"Liechtenstein"
	],
	[
		"de-LU",
		"German",
		"Luxembourg"
	],
	["dz", "Dzongkha"],
	[
		"dz-BT",
		"Dzongkha",
		"Bhutan"
	],
	["ee", "Ewe"],
	[
		"ee-GH",
		"Ewe",
		"Ghana"
	],
	[
		"ee-TG",
		"Ewe",
		"Togo"
	],
	[
		"el",
		"Greek",
		"Modern (1453-)"
	],
	[
		"el-CY",
		"Greek",
		"Cyprus"
	],
	[
		"el-GR",
		"Greek",
		"Greece"
	],
	["en", "English"],
	[
		"en-AG",
		"English",
		"Antigua and Barbuda"
	],
	[
		"en-AI",
		"English",
		"Anguilla"
	],
	[
		"en-AS",
		"English",
		"American Samoa"
	],
	[
		"en-AT",
		"English",
		"Austria"
	],
	[
		"en-AU",
		"English",
		"Australia"
	],
	[
		"en-BB",
		"English",
		"Barbados"
	],
	[
		"en-BE",
		"English",
		"Belgium"
	],
	[
		"en-BI",
		"English",
		"Burundi"
	],
	[
		"en-BM",
		"English",
		"Bermuda"
	],
	[
		"en-BS",
		"English",
		"Bahamas"
	],
	[
		"en-BW",
		"English",
		"Botswana"
	],
	[
		"en-BZ",
		"English",
		"Belize"
	],
	[
		"en-CA",
		"English",
		"Canada"
	],
	[
		"en-CC",
		"English",
		"Cocos (Keeling) Islands"
	],
	[
		"en-CH",
		"English",
		"Switzerland"
	],
	[
		"en-CK",
		"English",
		"Cook Islands"
	],
	[
		"en-CM",
		"English",
		"Cameroon"
	],
	[
		"en-CX",
		"English",
		"Christmas Island"
	],
	[
		"en-CY",
		"English",
		"Cyprus"
	],
	[
		"en-DE",
		"English",
		"Germany"
	],
	["en-DG", "English"],
	[
		"en-DK",
		"English",
		"Denmark"
	],
	[
		"en-DM",
		"English",
		"Dominica"
	],
	[
		"en-ER",
		"English",
		"Eritrea"
	],
	[
		"en-FI",
		"English",
		"Finland"
	],
	[
		"en-FJ",
		"English",
		"Fiji"
	],
	[
		"en-FK",
		"English",
		"Falkland Islands (Islas Malvinas)"
	],
	[
		"en-FM",
		"English",
		"Micronesia"
	],
	[
		"en-GB",
		"English",
		"United Kingdom"
	],
	[
		"en-GD",
		"English",
		"Grenada"
	],
	[
		"en-GG",
		"English",
		"Guernsey"
	],
	[
		"en-GH",
		"English",
		"Ghana"
	],
	[
		"en-GI",
		"English",
		"Gibraltar"
	],
	[
		"en-GM",
		"English",
		"Gambia"
	],
	[
		"en-GU",
		"English",
		"Guam"
	],
	[
		"en-GY",
		"English",
		"Guyana"
	],
	[
		"en-HK",
		"English",
		"Hong Kong"
	],
	[
		"en-IE",
		"English",
		"Ireland"
	],
	[
		"en-IL",
		"English",
		"Israel"
	],
	[
		"en-IM",
		"English",
		"Isle of Man"
	],
	[
		"en-IN",
		"English",
		"India"
	],
	[
		"en-IO",
		"English",
		"British Indian Ocean Territory"
	],
	[
		"en-JE",
		"English",
		"Jersey"
	],
	[
		"en-JM",
		"English",
		"Jamaica"
	],
	[
		"en-KE",
		"English",
		"Kenya"
	],
	[
		"en-KI",
		"English",
		"Kiribati"
	],
	[
		"en-KN",
		"English",
		"Saint Kitts and Nevis"
	],
	[
		"en-KY",
		"English",
		"Cayman Islands"
	],
	[
		"en-LC",
		"English",
		"Saint Lucia"
	],
	[
		"en-LR",
		"English",
		"Liberia"
	],
	[
		"en-LS",
		"English",
		"Lesotho"
	],
	[
		"en-MG",
		"English",
		"Madagascar"
	],
	[
		"en-MH",
		"English",
		"Marshall Islands"
	],
	[
		"en-MO",
		"English",
		"Macau"
	],
	[
		"en-MP",
		"English",
		"Northern Mariana Islands"
	],
	[
		"en-MS",
		"English",
		"Montserrat"
	],
	[
		"en-MT",
		"English",
		"Malta"
	],
	[
		"en-MU",
		"English",
		"Mauritius"
	],
	[
		"en-MW",
		"English",
		"Malawi"
	],
	[
		"en-MY",
		"English",
		"Malaysia"
	],
	[
		"en-NA",
		"English",
		"Namibia"
	],
	[
		"en-NF",
		"English",
		"Norfolk Island"
	],
	[
		"en-NG",
		"English",
		"Nigeria"
	],
	[
		"en-NL",
		"English",
		"Netherlands"
	],
	[
		"en-NR",
		"English",
		"Nauru"
	],
	[
		"en-NU",
		"English",
		"Niue"
	],
	[
		"en-NZ",
		"English",
		"New Zealand"
	],
	[
		"en-PG",
		"English",
		"Papua New Guinea"
	],
	[
		"en-PH",
		"English",
		"Philippines"
	],
	[
		"en-PK",
		"English",
		"Pakistan"
	],
	[
		"en-PN",
		"English",
		"Pitcairn Islands"
	],
	[
		"en-PR",
		"English",
		"Puerto Rico"
	],
	[
		"en-PW",
		"English",
		"Palau"
	],
	[
		"en-RW",
		"English",
		"Rwanda"
	],
	[
		"en-SB",
		"English",
		"Solomon Islands"
	],
	[
		"en-SC",
		"English",
		"Seychelles"
	],
	[
		"en-SD",
		"English",
		"Sudan"
	],
	[
		"en-SE",
		"English",
		"Sweden"
	],
	[
		"en-SG",
		"English",
		"Singapore"
	],
	[
		"en-SH",
		"English",
		"Saint Helena"
	],
	[
		"en-SI",
		"English",
		"Slovenia"
	],
	[
		"en-SL",
		"English",
		"Sierra Leone"
	],
	["en-SS", "English"],
	["en-SX", "English"],
	[
		"en-SZ",
		"English",
		"Swaziland"
	],
	[
		"en-TC",
		"English",
		"Turks and Caicos Islands"
	],
	[
		"en-TK",
		"English",
		"Tokelau"
	],
	[
		"en-TO",
		"English",
		"Tonga"
	],
	[
		"en-TT",
		"English",
		"Trinidad and Tobago"
	],
	[
		"en-TV",
		"English",
		"Tuvalu"
	],
	[
		"en-TZ",
		"English",
		"Tanzania"
	],
	[
		"en-UG",
		"English",
		"Uganda"
	],
	[
		"en-UM",
		"English",
		"Baker Island"
	],
	[
		"en-US",
		"English",
		"United States"
	],
	[
		"en-VC",
		"English",
		"Saint Vincent and the Grenadines"
	],
	[
		"en-VG",
		"English",
		"British Virgin Islands"
	],
	[
		"en-VI",
		"English",
		"U.S. Virgin Islands"
	],
	[
		"en-VU",
		"English",
		"Vanuatu"
	],
	[
		"en-WS",
		"English",
		"Samoa"
	],
	[
		"en-ZA",
		"English",
		"South Africa"
	],
	[
		"en-ZM",
		"English",
		"Zambia"
	],
	[
		"en-ZW",
		"English",
		"Zimbabwe"
	],
	["eo", "Esperanto"],
	["es", "Spanish"],
	[
		"es-AR",
		"Spanish",
		"Argentina"
	],
	[
		"es-BO",
		"Spanish",
		"Bolivia"
	],
	[
		"es-BR",
		"Spanish",
		"Brazil"
	],
	[
		"es-BZ",
		"Spanish",
		"Belize"
	],
	[
		"es-CL",
		"Spanish",
		"Chile"
	],
	[
		"es-CO",
		"Spanish",
		"Colombia"
	],
	[
		"es-CR",
		"Spanish",
		"Costa Rica"
	],
	[
		"es-CU",
		"Spanish",
		"Cuba"
	],
	[
		"es-DO",
		"Spanish",
		"Dominican Republic"
	],
	["es-EA", "Spanish"],
	[
		"es-EC",
		"Spanish",
		"Ecuador"
	],
	[
		"es-ES",
		"Spanish",
		"Spain"
	],
	[
		"es-GQ",
		"Spanish",
		"Equatorial Guinea"
	],
	[
		"es-GT",
		"Spanish",
		"Guatemala"
	],
	[
		"es-HN",
		"Spanish",
		"Honduras"
	],
	["es-IC", "Spanish"],
	[
		"es-MX",
		"Spanish",
		"Mexico"
	],
	[
		"es-NI",
		"Spanish",
		"Nicaragua"
	],
	[
		"es-PA",
		"Spanish",
		"Panama"
	],
	[
		"es-PE",
		"Spanish",
		"Peru"
	],
	[
		"es-PH",
		"Spanish",
		"Philippines"
	],
	[
		"es-PR",
		"Spanish",
		"Puerto Rico"
	],
	[
		"es-PY",
		"Spanish",
		"Paraguay"
	],
	[
		"es-SV",
		"Spanish",
		"El Salvador"
	],
	[
		"es-US",
		"Spanish",
		"United States"
	],
	[
		"es-UY",
		"Spanish",
		"Uruguay"
	],
	[
		"es-VE",
		"Spanish",
		"Venezuela"
	],
	["et", "Estonian"],
	[
		"et-EE",
		"Estonian",
		"Estonia"
	],
	["eu", "Basque"],
	[
		"eu-ES",
		"Basque",
		"Spain"
	],
	["fa", "Persian"],
	[
		"fa-AF",
		"Persian",
		"Afghanistan"
	],
	[
		"fa-IR",
		"Persian",
		"Iran"
	],
	["ff", "Fulah"],
	[
		"ff-CM",
		"Fulah",
		"Cameroon"
	],
	[
		"ff-GN",
		"Fulah",
		"Guinea"
	],
	[
		"ff-MR",
		"Fulah",
		"Mauritania"
	],
	[
		"ff-SN",
		"Fulah",
		"Senegal"
	],
	["fi", "Finnish"],
	[
		"fi-FI",
		"Finnish",
		"Finland"
	],
	["fo", "Faroese"],
	[
		"fo-DK",
		"Faroese",
		"Denmark"
	],
	[
		"fo-FO",
		"Faroese",
		"Faroe Islands"
	],
	["fr", "French"],
	[
		"fr-BE",
		"French",
		"Belgium"
	],
	[
		"fr-BF",
		"French",
		"Burkina Faso"
	],
	[
		"fr-BI",
		"French",
		"Burundi"
	],
	[
		"fr-BJ",
		"French",
		"Benin"
	],
	["fr-BL", "French"],
	[
		"fr-CA",
		"French",
		"Canada"
	],
	[
		"fr-CD",
		"French",
		"Congo"
	],
	[
		"fr-CF",
		"French",
		"Central African Republic"
	],
	[
		"fr-CG",
		"French",
		"Congo"
	],
	[
		"fr-CH",
		"French",
		"Switzerland"
	],
	["fr-CI", "French, Cote d'Ivoire (Ivory Coast)"],
	[
		"fr-CM",
		"French",
		"Cameroon"
	],
	[
		"fr-DJ",
		"French",
		"Djibouti"
	],
	[
		"fr-DZ",
		"French",
		"Algeria"
	],
	[
		"fr-FR",
		"French",
		"France"
	],
	[
		"fr-GA",
		"French",
		"Gabon"
	],
	[
		"fr-GF",
		"French",
		"French Guiana"
	],
	[
		"fr-GN",
		"French",
		"Guinea"
	],
	[
		"fr-GP",
		"French",
		"Saint Barthelemy"
	],
	[
		"fr-GQ",
		"French",
		"Equatorial Guinea"
	],
	[
		"fr-HT",
		"French",
		"Haiti"
	],
	[
		"fr-KM",
		"French",
		"Comoros"
	],
	[
		"fr-LU",
		"French",
		"Luxembourg"
	],
	[
		"fr-MA",
		"French",
		"Morocco"
	],
	[
		"fr-MC",
		"French",
		"Monaco"
	],
	["fr-MF", "French"],
	[
		"fr-MG",
		"French",
		"Madagascar"
	],
	[
		"fr-ML",
		"French",
		"Mali"
	],
	[
		"fr-MQ",
		"French",
		"Martinique"
	],
	[
		"fr-MR",
		"French",
		"Mauritania"
	],
	[
		"fr-MU",
		"French",
		"Mauritius"
	],
	[
		"fr-NC",
		"French",
		"New Caledonia"
	],
	[
		"fr-NE",
		"French",
		"Niger"
	],
	[
		"fr-PF",
		"French",
		"French Polynesia"
	],
	[
		"fr-PM",
		"French",
		"Saint Pierre and Miquelon"
	],
	[
		"fr-RE",
		"French",
		"Reunion"
	],
	[
		"fr-RW",
		"French",
		"Rwanda"
	],
	[
		"fr-SC",
		"French",
		"Seychelles"
	],
	[
		"fr-SN",
		"French",
		"Senegal"
	],
	[
		"fr-SY",
		"French",
		"Syria"
	],
	[
		"fr-TD",
		"French",
		"Chad"
	],
	[
		"fr-TG",
		"French",
		"Togo"
	],
	[
		"fr-TN",
		"French",
		"Tunisia"
	],
	[
		"fr-VU",
		"French",
		"Vanuatu"
	],
	[
		"fr-WF",
		"French",
		"Wallis and Futuna"
	],
	[
		"fr-YT",
		"French",
		"Mayotte"
	],
	["fy", "Western Frisian"],
	[
		"fy-NL",
		"Western Frisian",
		"Netherlands"
	],
	["ga", "Irish"],
	[
		"ga-IE",
		"Irish",
		"Ireland"
	],
	["gd", "Gaelic"],
	[
		"gd-GB",
		"Gaelic",
		"United Kingdom"
	],
	["gl", "Galician"],
	[
		"gl-ES",
		"Galician",
		"Spain"
	],
	["gu", "Gujarati"],
	[
		"gu-IN",
		"Gujarati",
		"India"
	],
	["gv", "Manx"],
	[
		"gv-IM",
		"Manx",
		"Isle of Man"
	],
	["ha", "Hausa"],
	[
		"ha-GH",
		"Hausa",
		"Ghana"
	],
	[
		"ha-NE",
		"Hausa",
		"Niger"
	],
	[
		"ha-NG",
		"Hausa",
		"Nigeria"
	],
	["he", "Hebrew"],
	[
		"he-IL",
		"Hebrew",
		"Israel"
	],
	["hi", "Hindi"],
	[
		"hi-IN",
		"Hindi",
		"India"
	],
	["hr", "Croatian"],
	[
		"hr-BA",
		"Croatian",
		"Bosnia and Herzegovina"
	],
	[
		"hr-HR",
		"Croatian",
		"Croatia"
	],
	["hu", "Hungarian"],
	[
		"hu-HU",
		"Hungarian",
		"Hungary"
	],
	["hy", "Armenian"],
	[
		"hy-AM",
		"Armenian",
		"Armenia"
	],
	["id", "Indonesian"],
	[
		"id-ID",
		"Indonesian",
		"Indonesia"
	],
	["ig", "Igbo"],
	[
		"ig-NG",
		"Igbo",
		"Nigeria"
	],
	["ii", "Sichuan Yi"],
	[
		"ii-CN",
		"Sichuan Yi",
		"China"
	],
	["is", "Icelandic"],
	[
		"is-IS",
		"Icelandic",
		"Iceland"
	],
	["it", "Italian"],
	[
		"it-CH",
		"Italian",
		"Switzerland"
	],
	[
		"it-IT",
		"Italian",
		"Italy"
	],
	[
		"it-SM",
		"Italian",
		"San Marino"
	],
	[
		"it-VA",
		"Italian",
		"Vatican City"
	],
	["ja", "Japanese"],
	[
		"ja-JP",
		"Japanese",
		"Japan"
	],
	["ka", "Georgian"],
	[
		"ka-GE",
		"Georgian",
		"Georgia"
	],
	["ki", "Kikuyu"],
	[
		"ki-KE",
		"Kikuyu",
		"Kenya"
	],
	["kk", "Kazakh"],
	[
		"kk-KZ",
		"Kazakh",
		"Kazakhstan"
	],
	["kl", "Kalaallisut"],
	[
		"kl-GL",
		"Kalaallisut",
		"Greenland"
	],
	["km", "Central Khmer"],
	[
		"km-KH",
		"Central Khmer",
		"Cambodia"
	],
	["kn", "Kannada"],
	[
		"kn-IN",
		"Kannada",
		"India"
	],
	["ko", "Korean"],
	[
		"ko-KP",
		"Korean",
		"Korea"
	],
	[
		"ko-KR",
		"Korean",
		"Korea"
	],
	["ks", "Kashmiri"],
	[
		"ks-IN",
		"Kashmiri",
		"India"
	],
	["kw", "Cornish"],
	[
		"kw-GB",
		"Cornish",
		"United Kingdom"
	],
	["ky", "Kirghiz"],
	[
		"ky-KG",
		"Kirghiz",
		"Kyrgyzstan"
	],
	["lb", "Luxembourgish"],
	[
		"lb-LU",
		"Luxembourgish",
		"Luxembourg"
	],
	["lg", "Ganda"],
	[
		"lg-UG",
		"Ganda",
		"Uganda"
	],
	["ln", "Lingala"],
	[
		"ln-AO",
		"Lingala",
		"Angola"
	],
	[
		"ln-CD",
		"Lingala",
		"Congo"
	],
	[
		"ln-CF",
		"Lingala",
		"Central African Republic"
	],
	[
		"ln-CG",
		"Lingala",
		"Congo"
	],
	["lo", "Lao"],
	[
		"lo-LA",
		"Lao",
		"Laos"
	],
	["lt", "Lithuanian"],
	[
		"lt-LT",
		"Lithuanian",
		"Lithuania"
	],
	["lu", "Luba-Katanga"],
	[
		"lu-CD",
		"Luba-Katanga",
		"Congo"
	],
	["lv", "Latvian"],
	[
		"lv-LV",
		"Latvian",
		"Latvia"
	],
	["mg", "Malagasy"],
	[
		"mg-MG",
		"Malagasy",
		"Madagascar"
	],
	["mk", "Macedonian"],
	[
		"mk-MK",
		"Macedonian",
		"Macedonia"
	],
	["ml", "Malayalam"],
	[
		"ml-IN",
		"Malayalam",
		"India"
	],
	["mn", "Mongolian"],
	[
		"mn-MN",
		"Mongolian",
		"Mongolia"
	],
	["mr", "Marathi"],
	[
		"mr-IN",
		"Marathi",
		"India"
	],
	["ms", "Malay"],
	[
		"ms-BN",
		"Malay",
		"Brunei"
	],
	[
		"ms-MY",
		"Malay",
		"Malaysia"
	],
	[
		"ms-SG",
		"Malay",
		"Singapore"
	],
	["mt", "Maltese"],
	[
		"mt-MT",
		"Maltese",
		"Malta"
	],
	["my", "Burmese"],
	[
		"my-MM",
		"Burmese",
		"Myanmar (Burma)"
	],
	["nb", "Bokmål Norwegian"],
	[
		"nb-NO",
		"Bokmål Norwegian",
		"Norway"
	],
	[
		"nb-SJ",
		"Bokmål Norwegian",
		"Svalbard"
	],
	["nd", "Ndebele, North"],
	[
		"nd-ZW",
		"Ndebele, North",
		"Zimbabwe"
	],
	["ne", "Nepali"],
	[
		"ne-IN",
		"Nepali",
		"India"
	],
	[
		"ne-NP",
		"Nepali",
		"Nepal"
	],
	["nl", "Dutch"],
	[
		"nl-AW",
		"Dutch",
		"Aruba"
	],
	[
		"nl-BE",
		"Dutch",
		"Belgium"
	],
	["nl-BQ", "Dutch"],
	["nl-CW", "Dutch"],
	[
		"nl-NL",
		"Dutch",
		"Netherlands"
	],
	[
		"nl-SR",
		"Dutch",
		"Suriname"
	],
	["nl-SX", "Dutch"],
	["nn", "Norwegian Nynorsk"],
	[
		"nn-NO",
		"Norwegian Nynorsk",
		"Norway"
	],
	["om", "Oromo"],
	[
		"om-ET",
		"Oromo",
		"Ethiopia"
	],
	[
		"om-KE",
		"Oromo",
		"Kenya"
	],
	["or", "Oriya"],
	[
		"or-IN",
		"Oriya",
		"India"
	],
	["os", "Ossetian"],
	[
		"os-GE",
		"Ossetian",
		"Georgia"
	],
	[
		"os-RU",
		"Ossetian",
		"Russia"
	],
	["pa", "Panjabi"],
	[
		"pa-IN",
		"Panjabi",
		"India"
	],
	[
		"pa-PK",
		"Panjabi",
		"Pakistan"
	],
	["pl", "Polish"],
	[
		"pl-PL",
		"Polish",
		"Poland"
	],
	["ps", "Pushto"],
	[
		"ps-AF",
		"Pushto",
		"Afghanistan"
	],
	["pt", "Portuguese"],
	[
		"pt-AO",
		"Portuguese",
		"Angola"
	],
	[
		"pt-BR",
		"Portuguese",
		"Brazil"
	],
	[
		"pt-CH",
		"Portuguese",
		"Switzerland"
	],
	[
		"pt-CV",
		"Portuguese",
		"Cape Verde"
	],
	[
		"pt-GQ",
		"Portuguese",
		"Equatorial Guinea"
	],
	[
		"pt-GW",
		"Portuguese",
		"Guinea-Bissau"
	],
	[
		"pt-LU",
		"Portuguese",
		"Luxembourg"
	],
	[
		"pt-MO",
		"Portuguese",
		"Macau"
	],
	[
		"pt-MZ",
		"Portuguese",
		"Mozambique"
	],
	[
		"pt-PT",
		"Portuguese",
		"Portugal"
	],
	[
		"pt-ST",
		"Portuguese",
		"Sao Tome and Principe"
	],
	[
		"pt-TL",
		"Portuguese",
		"Timor-Leste (East Timor)"
	],
	["qu", "Quechua"],
	[
		"qu-BO",
		"Quechua",
		"Bolivia"
	],
	[
		"qu-EC",
		"Quechua",
		"Ecuador"
	],
	[
		"qu-PE",
		"Quechua",
		"Peru"
	],
	["rm", "Romansh"],
	[
		"rm-CH",
		"Romansh",
		"Switzerland"
	],
	["rn", "Rundi"],
	[
		"rn-BI",
		"Rundi",
		"Burundi"
	],
	["ro", "Romanian"],
	[
		"ro-MD",
		"Romanian",
		"Moldova"
	],
	[
		"ro-RO",
		"Romanian",
		"Romania"
	],
	["ru", "Russian"],
	[
		"ru-BY",
		"Russian",
		"Belarus"
	],
	[
		"ru-KG",
		"Russian",
		"Kyrgyzstan"
	],
	[
		"ru-KZ",
		"Russian",
		"Kazakhstan"
	],
	[
		"ru-MD",
		"Russian",
		"Moldova"
	],
	[
		"ru-RU",
		"Russian",
		"Russia"
	],
	[
		"ru-UA",
		"Russian",
		"Ukraine"
	],
	["rw", "Kinyarwanda"],
	[
		"rw-RW",
		"Kinyarwanda",
		"Rwanda"
	],
	["se", "Northern Sami"],
	[
		"se-FI",
		"Northern Sami",
		"Finland"
	],
	[
		"se-NO",
		"Northern Sami",
		"Norway"
	],
	[
		"se-SE",
		"Northern Sami",
		"Sweden"
	],
	["sg", "Sango"],
	[
		"sg-CF",
		"Sango",
		"Central African Republic"
	],
	["si", "Sinhala"],
	[
		"si-LK",
		"Sinhala",
		"Sri Lanka"
	],
	["sk", "Slovak"],
	[
		"sk-SK",
		"Slovak",
		"Slovakia"
	],
	["sl", "Slovenian"],
	[
		"sl-SI",
		"Slovenian",
		"Slovenia"
	],
	["sn", "Shona"],
	[
		"sn-ZW",
		"Shona",
		"Zimbabwe"
	],
	["so", "Somali"],
	[
		"so-DJ",
		"Somali",
		"Djibouti"
	],
	[
		"so-ET",
		"Somali",
		"Ethiopia"
	],
	[
		"so-KE",
		"Somali",
		"Kenya"
	],
	[
		"so-SO",
		"Somali",
		"Somalia"
	],
	["sq", "Albanian"],
	[
		"sq-AL",
		"Albanian",
		"Albania"
	],
	[
		"sq-MK",
		"Albanian",
		"Macedonia"
	],
	["sq-XK", "Albanian"],
	["sr", "Serbian"],
	[
		"sr-BA",
		"Serbian",
		"Bosnia and Herzegovina"
	],
	[
		"sr-ME",
		"Serbian",
		"Montenegro"
	],
	[
		"sr-RS",
		"Serbian",
		"Serbia"
	],
	["sr-XK", "Serbian"],
	["sv", "Swedish"],
	[
		"sv-AX",
		"Swedish",
		"Aland"
	],
	[
		"sv-FI",
		"Swedish",
		"Finland"
	],
	[
		"sv-SE",
		"Swedish",
		"Sweden"
	],
	["sw", "Swahili"],
	[
		"sw-CD",
		"Swahili",
		"Congo"
	],
	[
		"sw-KE",
		"Swahili",
		"Kenya"
	],
	[
		"sw-TZ",
		"Swahili",
		"Tanzania"
	],
	[
		"sw-UG",
		"Swahili",
		"Uganda"
	],
	["ta", "Tamil"],
	[
		"ta-IN",
		"Tamil",
		"India"
	],
	[
		"ta-LK",
		"Tamil",
		"Sri Lanka"
	],
	[
		"ta-MY",
		"Tamil",
		"Malaysia"
	],
	[
		"ta-SG",
		"Tamil",
		"Singapore"
	],
	["te", "Telugu"],
	[
		"te-IN",
		"Telugu",
		"India"
	],
	["th", "Thai"],
	[
		"th-TH",
		"Thai",
		"Thailand"
	],
	["ti", "Tigrinya"],
	[
		"ti-ER",
		"Tigrinya",
		"Eritrea"
	],
	[
		"ti-ET",
		"Tigrinya",
		"Ethiopia"
	],
	["tk", "Turkmen"],
	[
		"tk-TM",
		"Turkmen",
		"Turkmenistan"
	],
	["to", "Tonga (Tonga Islands)"],
	[
		"to-TO",
		"Tonga (Tonga Islands)",
		"Tonga"
	],
	["tr", "Turkish"],
	[
		"tr-CY",
		"Turkish",
		"Cyprus"
	],
	[
		"tr-TR",
		"Turkish",
		"Turkey"
	],
	["ug", "Uighur"],
	[
		"ug-CN",
		"Uighur",
		"China"
	],
	["uk", "Ukrainian"],
	[
		"uk-UA",
		"Ukrainian",
		"Ukraine"
	],
	["ur", "Urdu"],
	[
		"ur-IN",
		"Urdu",
		"India"
	],
	[
		"ur-PK",
		"Urdu",
		"Pakistan"
	],
	["uz", "Uzbek"],
	[
		"uz-AF",
		"Uzbek",
		"Afghanistan"
	],
	[
		"uz-UZ",
		"Uzbek",
		"Uzbekistan"
	],
	["vi", "Vietnamese"],
	[
		"vi-VN",
		"Vietnamese",
		"Vietnam"
	],
	["vo", "Volapük"],
	["yi", "Yiddish"],
	["yi-1", "Yiddish"],
	["yo", "Yoruba"],
	[
		"yo-BJ",
		"Yoruba",
		"Benin"
	],
	[
		"yo-NG",
		"Yoruba",
		"Nigeria"
	],
	["zh", "Chinese"],
	[
		"zh-CN",
		"Chinese",
		"China"
	],
	[
		"zh-HK",
		"Chinese",
		"Hong Kong"
	],
	[
		"zh-MO",
		"Chinese",
		"Macau"
	],
	[
		"zh-SG",
		"Chinese",
		"Singapore"
	],
	[
		"zh-TW",
		"Chinese",
		"China"
	],
	["zu", "Zulu"],
	[
		"zu-ZA",
		"Zulu",
		"South Africa"
	]
];
//#endregion
//#region src/lib/models/locale/locale.ts
let codesByLocale;
var Locale = class {
	_raw;
	_locale;
	constructor(locale) {
		this._raw = locale;
		this._locale = normalizeLocale(locale);
	}
	get locale() {
		return this._locale;
	}
	localInfo() {
		return lookupLocaleInfo(this._locale);
	}
	isValid() {
		return isStandardLocale(this._locale);
	}
	toJSON() {
		return this.locale;
	}
	toString() {
		return this.locale;
	}
};
const regExTwoLetter = /^[a-z]{2}$/i;
const regExLocaleWithCountry = /^([a-z]{2})[_-]?([a-z]{2,3})$/i;
const regExValidLocale = /^([a-z]{2})(?:-([A-Z]{2,3}))?$/;
/**
* Attempt to normalize a locale.
* @param locale a locale string
*/
function normalizeLocale(locale) {
	locale = locale.trim();
	if (regExTwoLetter.test(locale)) return locale.toLowerCase();
	const m = locale.match(regExLocaleWithCountry);
	if (!m) return locale;
	return `${m[1].toLowerCase()}-${m[2].toUpperCase()}`;
}
function isStandardLocale(locale) {
	return regExValidLocale.test(locale);
}
function lookupLocaleInfo(locale) {
	codesByLocale = codesByLocale || buildLocaleLookup();
	return codesByLocale.get(locale);
}
function buildLocaleLookup() {
	const info = codes.map(([locale, language, country]) => ({
		locale,
		language,
		country
	}));
	return new Map(info.map((i) => [i.locale, i]));
}
function createLocale(locale) {
	return new Locale(locale);
}
function parseLocale(locales) {
	locales = typeof locales === "string" ? locales.split(",") : locales;
	return locales.map(createLocale);
}
//#endregion
//#region src/lib/mappers/mapCosts.ts
const defaultEditCosts = {
	accentCosts: 1,
	baseCost: 100,
	capsCosts: 1,
	firstLetterPenalty: 4,
	nonAlphabetCosts: 110
};
const defaultHunspellCosts = {
	...defaultEditCosts,
	ioConvertCost: 30,
	keyboardCost: 99,
	mapCost: 25,
	replaceCosts: 75,
	tryCharCost: 100
};
function mapHunspellCosts(costs = {}) {
	return {
		...defaultHunspellCosts,
		...cleanCopy(costs)
	};
}
function mapEditCosts(costs = {}) {
	return {
		...defaultEditCosts,
		...cleanCopy(costs)
	};
}
//#endregion
//#region src/lib/mappers/joinLetters.ts
/**
* Bring letters / strings together.
* - `['a', 'b'] => 'ab'`
* - `['a', 'bc'] => 'a(bc)'`
* @param letters - letters to join
*/
function joinLetters(letters) {
	return [...letters].map((a) => a.length > 1 || !a.length ? `(${a})` : a).join("");
}
//#endregion
//#region src/lib/mappers/mapToSuggestionCostDef.ts
function parseAlphabet(cs, locale, editCost) {
	const { cost, penalty } = cs;
	const alphabet = joinLetters([...pipeSync([...pipeSync(expandCharacterSet(cs.characters), opMapSync((c) => caseForms(c, locale).sort()))], opFlattenSync(), opMapSync((letter) => accentForms(letter)), opFlattenSync(), opUniqueSync())].sort());
	return [
		clean$1({
			map: alphabet,
			replace: cost,
			insDel: cost,
			swap: cost,
			penalty
		}),
		parseAlphabetCaps(cs.characters, locale, editCost),
		...calcCostsForAccentedLetters(alphabet, locale, editCost)
	];
}
function parseAlphabetCaps(alphabet, locale, editCost) {
	return {
		map: [...pipeSync(expandCharacterSet(alphabet), opMapSync((c) => caseForms(c, locale).sort()))].map((a) => joinLetters(a)).join("|"),
		replace: editCost.capsCosts
	};
}
function calcFirstCharacterReplaceDefs(alphabets, editCost) {
	return alphabets.map((cs) => calcFirstCharacterReplace(cs, editCost));
}
function calcFirstCharacterReplace(cs, editCost) {
	const mapOfFirstLetters = [...pipeSync(expandCharacterSet(cs.characters), opUniqueSync(), opMapSync((letter) => `(^${letter})`))].sort().join("") + "(^)";
	const penalty = editCost.firstLetterPenalty;
	return {
		map: mapOfFirstLetters,
		replace: cs.cost - penalty,
		penalty: penalty * 2
	};
}
function parseAccents(cs, _editCost) {
	const { cost, penalty } = cs;
	const accents = joinLetters([...pipeSync(expandCharacterSet(cs.characters), opMapSync((char) => stripNonAccents(char)))]);
	if (!accents) return void 0;
	return clean$1({
		map: accents,
		replace: cost,
		insDel: cost,
		penalty
	});
}
function calcCostsForAccentedLetters(simpleMap, locale, costs) {
	const charactersWithAccents = [...pipeSync(splitMap(simpleMap), opMapSync((char) => caseForms(char, locale)), opFlattenSync(), opMapSync((char) => [...accentForms(char)]), opFilterSync((forms) => forms.length > 1))];
	const replaceAccentMap = [...pipeSync(charactersWithAccents, opMapSync((forms) => new Set([...forms, ...forms.map((char) => stripAccents(char))])), opMapSync((forms) => [...forms].sort()), opFilterSync((forms) => forms.length > 1), opMapSync(joinLetters), opUniqueSync())].join("|");
	const cost = costs.accentCosts;
	const costToReplaceAccent = !replaceAccentMap ? [] : [{
		map: replaceAccentMap,
		replace: cost
	}];
	const normalizeMap = charactersWithAccents.map((a) => a.sort()).map(joinLetters).join("|");
	const costToNormalizeAccent = !normalizeMap ? [] : [{
		map: normalizeMap,
		replace: 0
	}];
	return [...costToReplaceAccent, ...costToNormalizeAccent];
}
/**
* Splits a simple map string into its parts.
* - `abc` => `a`, `b`, `c`
* - `a(bc)` => `a`, `bc`
* @param map - string of characters
*/
function* splitMap(map) {
	let seq = "";
	let mode = 0;
	for (const char of map) {
		if (mode && char === ")") {
			yield seq;
			mode = 0;
			continue;
		}
		if (mode) {
			seq += char;
			continue;
		}
		if (char === "(") {
			mode = 1;
			seq = "";
			continue;
		}
		yield char;
	}
}
//#endregion
//#region src/lib/mappers/mapHunspellInformation.ts
function hunspellInformationToSuggestionCostDef(hunInfo, locales) {
	const costs = calcCosts(hunInfo.costs, locales);
	const operations = [
		affKey,
		affKeyCaps,
		affMap,
		affMapAccents,
		affMapCaps,
		affNoTry,
		affRepConv,
		affTry,
		affTryAccents,
		affTryFirstCharacterReplace
	];
	function parseAff(aff, costs) {
		const regSupportedAff = /^(?:MAP|KEY|TRY|NO-TRY|ICONV|OCONV|REP)\s/;
		const rejectAff = /^(?:MAP|KEY|TRY|ICONV|OCONV|REP)\s+\d+$/;
		return [...pipeSync(aff.split("\n").map((a) => a.replace(/#.*/, "")).map((a) => a.trim()).filter((a) => regSupportedAff.test(a)).filter((a) => !rejectAff.test(a)), opMapSync((line) => pipeSync(operations, opMapSync((fn) => fn(line, costs)), opMapSync(asArrayOf), opFlattenSync())), opFlattenSync(), opFilterSync(isDefined$1))];
	}
	return parseAff(hunInfo.aff, costs);
}
function calcCosts(costs = {}, locale) {
	const useLocale = locale?.length ? locale.map((loc) => loc.locale) : void 0;
	return {
		...mapHunspellCosts(costs),
		locale: useLocale
	};
}
const regExpMap = /^(?:MAP)\s+(\S+)$/;
function affMap(line, costs) {
	const m = line.match(regExpMap);
	if (!m) return void 0;
	const map = m[1];
	const cost = costs.mapCost;
	return {
		map,
		replace: cost,
		swap: cost
	};
}
const regExpTry = /^(?:TRY)\s+(\S+)$/;
function affTry(line, costs) {
	const m = line.match(regExpTry);
	if (!m) return void 0;
	const cost = costs.tryCharCost;
	const characters = m[1];
	return parseAlphabet({
		characters,
		cost
	}, costs.locale, costs);
}
function affTryFirstCharacterReplace(line, costs) {
	const m = line.match(regExpTry);
	if (!m) return void 0;
	const characters = m[1];
	const cost = costs.tryCharCost;
	return calcFirstCharacterReplace({
		characters,
		cost
	}, costs);
}
const regExpNoTry = /^NO-TRY\s+(\S+)$/;
function affNoTry(line, costs) {
	const m = line.match(regExpNoTry);
	if (!m) return void 0;
	return {
		map: m[1],
		insDel: Math.max(costs.nonAlphabetCosts - costs.tryCharCost, 0),
		penalty: costs.nonAlphabetCosts + costs.tryCharCost
	};
}
const regExpRepConv = /^(?:REP|(?:I|O)CONV)\s+(\S+)\s+(\S+)$/;
function affRepConv(line, costs) {
	const m = line.match(regExpRepConv);
	if (!m) return void 0;
	const cost = line.startsWith("REP") ? costs.replaceCosts : costs.ioConvertCost;
	const from = m[1];
	let into = m[2];
	into = into.replace(/^0$/, "");
	if (from.startsWith("^") && !into.startsWith("^")) into = "^" + into;
	if (from.endsWith("$") && !into.endsWith("$")) into = into + "$";
	return {
		map: joinLetters([from, into]),
		replace: cost
	};
}
const regExpKey = /^(?:KEY)\s+(\S+)$/;
function affKey(line, costs) {
	const m = line.match(regExpKey);
	if (!m) return void 0;
	const kbd = m[1];
	const pairs = [...splitMap(kbd)].map(reducer((p, v) => ({
		a: p.b,
		b: v
	}), {
		a: "|",
		b: "|"
	})).filter((ab) => ab.a !== "|" && ab.b !== "|").map(({ a, b }) => joinLetters([a, b]));
	const pairsUpper = pairs.map((p) => p.toLocaleUpperCase(costs.locale));
	const map = unique([...pairs, ...pairsUpper]).join("|");
	const cost = costs.keyboardCost;
	return {
		map,
		replace: cost,
		swap: cost
	};
}
function affKeyCaps(line, costs) {
	const m = line.match(regExpKey);
	if (!m) return void 0;
	return parseCaps(m[1], costs);
}
function affMapCaps(line, costs) {
	const m = line.match(regExpMap);
	if (!m) return void 0;
	return parseCaps(m[1], costs);
}
function affTryAccents(line, costs) {
	const m = line.match(regExpTry);
	if (!m) return void 0;
	return calcCostsForAccentedLetters(m[1], costs.locale, costs);
}
function affMapAccents(line, costs) {
	const m = line.match(regExpMap);
	if (!m) return void 0;
	return calcCostsForAccentedLetters(m[1], costs.locale, costs);
}
function parseCaps(value, costs) {
	const locale = costs.locale;
	const map = unique([...splitMap(value)].filter((a) => a !== "|").map((s) => caseForms(s, locale)).filter((forms) => forms.length > 1).map(joinLetters)).join("|");
	const cost = costs.capsCosts;
	if (!map) return void 0;
	return {
		map,
		replace: cost
	};
}
function reducer(fn, initialVal) {
	let acc = initialVal;
	return (val, i) => acc = fn(acc, val, i);
}
function asArrayOf(v) {
	return Array.isArray(v) ? v : [v];
}
//#endregion
//#region src/lib/mappers/mapDictionaryInfo.ts
function mapDictionaryInformation(dictInfo) {
	const _locale = dictInfo.locale;
	const locale = _locale ? parseLocale(_locale).filter((loc) => loc.isValid()) : void 0;
	const locales = locale?.map((loc) => loc.locale);
	const costs = mapEditCosts(dictInfo.costs);
	const defsEC = dictInfo.suggestionEditCosts || [];
	const defsHI = dictInfo.hunspellInformation ? hunspellInformationToSuggestionCostDef(dictInfo.hunspellInformation, locale) : [];
	return [
		...defsEC,
		...processAlphabet(dictInfo.alphabet, locales, costs),
		...processAccents(dictInfo.accents, costs),
		...defsHI
	];
}
function processAlphabet(alphabet, locale, editCost) {
	const csAlphabet = toCharSets(alphabet, "a-zA-Z", editCost.baseCost);
	return [...pipeSync(csAlphabet, opMapSync((cs) => parseAlphabet(cs, locale, editCost)), opFlattenSync()), ...calcFirstCharacterReplaceDefs(csAlphabet, editCost)];
}
function toCharSets(cs, defaultValue, cost, penalty) {
	cs = cs ?? defaultValue;
	if (!cs) return [];
	if (typeof cs === "string") cs = [{
		characters: cs,
		cost
	}];
	if (penalty !== void 0) cs.forEach((cs) => cs.penalty = penalty);
	return cs;
}
function processAccents(accents, editCost) {
	return toCharSets(accents, "̀-́", editCost.accentCosts).map((cs) => parseAccents(cs, editCost)).filter(isDefined$1);
}
function mapDictionaryInformationToAdjustment(dictInfo) {
	if (!dictInfo.adjustments) return [];
	return dictInfo.adjustments.map(mapAdjustment);
}
function mapAdjustment(adj) {
	const { id, regexp, penalty } = adj;
	return {
		id,
		regexp: new RegExp(regexp),
		penalty
	};
}
//#endregion
//#region src/lib/mappers/mapDictionaryInfoToWeightMap.ts
const defaultDefs = [{
	map: "1234567890-.",
	insDel: 1,
	penalty: 200
}];
const defaultAdjustments = [
	{
		id: "compound-case-change",
		regexp: /\p{Ll}∙\p{Lu}/gu,
		penalty: 1e3
	},
	{
		id: "short-compounds-1",
		regexp: /^[^∙]{0,2}(?=∙)|∙[^∙]{0,2}(?=∙|$)/gm,
		penalty: 100
	},
	{
		id: "short-compounds-3",
		regexp: /^[^∙]{3}(?=∙)|∙[^∙]{3}(?=∙|$)/gm,
		penalty: 50
	}
];
function mapDictionaryInformationToWeightMap(dictInfo) {
	const defs = [...mapDictionaryInformation(dictInfo), ...defaultDefs];
	const adjustments = mapDictionaryInformationToAdjustment(dictInfo);
	const map = createWeightMap(...defs);
	addAdjustment(map, ...defaultAdjustments, ...adjustments);
	return map;
}
//#endregion
export { CASE_INSENSITIVE_PREFIX, COMPOUND_FIX, CompoundWordsMethod, FLAG_WORD, FORBID_PREFIX, GTrie, GTrieNode, JOIN_SEPARATOR, OPTIONAL_COMPOUND_FIX, Trie, TrieBuilder, WORD_SEPARATOR, buildITrieFromWords, buildTrie, buildTrieFast, consolidate, convertToBTrie, countNodes, countWords, createDictionaryLineParserMapper as createDictionaryLineParser, createTrieRoot, createTrieRootFromList, createWeightedMap, decodeFile, decodeTrie, defaultTrieInfo, defaultTrieInfo as defaultTrieOptions, editDistance, editDistanceWeighted, encodeITrieToBTrie, encodeTrieDataToBTrie, expandCharacterSet, findNode, has, hintedWalker, impersonateCollector, importTrie, insert, isCircular, isDefined, isWordTerminationNode, iterateTrie, iteratorTrieWords, mapDictionaryInformationToWeightMap, mergeDefaults, mergeOptionalWithDefaults, normalizeWord, normalizeWordForCaseInsensitive, normalizeWordToLowercase, orderTrie, parseDictionary, parseDictionaryLegacy, parseDictionaryLines, serializeTrie, suggestionCollector, trieNodeToRoot, walk, walker };

//# sourceMappingURL=index.js.map