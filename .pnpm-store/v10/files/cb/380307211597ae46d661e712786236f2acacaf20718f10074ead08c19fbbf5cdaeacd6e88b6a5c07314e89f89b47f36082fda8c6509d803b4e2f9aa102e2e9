import { isFileURL, isUrlLike, toFileURL, toURL, urlBasename, urlParent as urlDirname } from "@cspell/url";
import { Buffer } from "node:buffer";
import * as zlib from "node:zlib";
import { gunzipSync, gzip } from "node:zlib";
import { ServiceBus, createResponse, createResponseFail, isServiceResponseSuccess, requestFactory } from "@cspell/cspell-service-bus";
import * as fs from "node:fs";
import { promises, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import * as Stream from "node:stream";
import assert from "node:assert";
//#region src/async/asyncIterable.ts
/**
* Reads an entire iterable and converts it into a promise.
* @param asyncIterable the async iterable to wait for.
*/
async function toArray(asyncIterable) {
	const data = [];
	for await (const item of asyncIterable) data.push(item);
	return data;
}
//#endregion
//#region src/common/CFileReference.ts
var CFileReference = class CFileReference {
	/**
	* Use to ensure the nominal type separation between CFileReference and FileReference
	* See: https://github.com/microsoft/TypeScript/wiki/FAQ#when-and-why-are-classes-nominal
	*/
	_;
	gz;
	constructor(url, encoding, baseFilename, gz) {
		this.url = url;
		this.encoding = encoding;
		this.baseFilename = baseFilename;
		this.gz = gz ?? (baseFilename?.endsWith(".gz") || void 0) ?? (url.pathname.endsWith(".gz") || void 0);
	}
	static isCFileReference(obj) {
		return obj instanceof CFileReference;
	}
	static from(fileReference, encoding, baseFilename, gz) {
		if (CFileReference.isCFileReference(fileReference)) return fileReference;
		if (fileReference instanceof URL) return new CFileReference(fileReference, encoding, baseFilename, gz);
		return new CFileReference(fileReference.url, fileReference.encoding, fileReference.baseFilename, fileReference.gz);
	}
	toJson() {
		return {
			url: this.url.href,
			encoding: this.encoding,
			baseFilename: this.baseFilename,
			gz: this.gz
		};
	}
};
/**
*
* @param file - a URL, file path, or FileReference
* @param encoding - optional encoding used to decode the file.
* @param baseFilename - optional base filename used with data URLs.
* @param gz - optional flag to indicate if the file is gzipped.
* @returns a FileReference
*/
function toFileReference(file, encoding, baseFilename, gz) {
	const fileReference = typeof file === "string" ? toFileURL(file) : file;
	if (fileReference instanceof URL) return new CFileReference(fileReference, encoding, baseFilename, gz);
	return CFileReference.from(fileReference);
}
function isFileReference(ref) {
	return CFileReference.isCFileReference(ref) || !(ref instanceof URL) && typeof ref !== "string";
}
function renameFileReference(ref, newUrl) {
	return new CFileReference(newUrl, ref.encoding, ref.baseFilename, ref.gz);
}
function toFileResourceRequest(file, encoding, signal) {
	const fileReference = typeof file === "string" ? toFileURL(file) : file;
	if (fileReference instanceof URL) return {
		url: fileReference,
		encoding,
		signal
	};
	return {
		url: fileReference.url,
		encoding: encoding ?? fileReference.encoding,
		signal
	};
}
//#endregion
//#region src/errors/errors.ts
var ErrorNotImplemented = class extends Error {
	constructor(method, options) {
		super(`Method ${method} is not supported.`, options);
		this.method = method;
	}
};
var AssertionError = class extends Error {
	constructor(message, options) {
		super(message, options);
		this.message = message;
	}
};
//#endregion
//#region src/errors/assert.ts
function assert$1(value, message) {
	if (!value) throw new AssertionError(message ?? "Assertion failed");
}
//#endregion
//#region src/common/arrayBuffers.ts
function toUint8Array(data) {
	if (data instanceof Uint8Array) return data;
	return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
function arrayBufferViewToBuffer(data) {
	if (data instanceof Buffer) return data;
	return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
}
function copyArrayBufferView(data) {
	return new Uint8Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
}
function swap16(data) {
	arrayBufferViewToBuffer(data).swap16();
	return data;
}
function swapBytes(data) {
	return swap16(copyArrayBufferView(data));
}
//#endregion
//#region src/common/encode-decode.ts
const BOM_BE = 65279;
const BOM_LE = 65534;
const decoderUTF8 = new TextDecoder("utf8");
const decoderUTF16LE = new TextDecoder("utf-16le");
const decoderUTF16BE = createTextDecoderUtf16BE();
const encoderUTF8 = new TextEncoder();
function decodeUtf16LE(data) {
	const buf = toUint8Array(data);
	const bom = buf[0] << 8 | buf[1];
	return decoderUTF16LE.decode(bom === BOM_LE ? buf.subarray(2) : buf);
}
function decodeUtf16BE(data) {
	const buf = toUint8Array(data);
	const bom = buf[0] << 8 | buf[1];
	return decoderUTF16BE.decode(bom === BOM_BE ? buf.subarray(2) : buf);
}
function decodeToString(data, encoding) {
	if (isGZipped(data)) return decodeToString(decompressBuffer(data), encoding);
	const buf = toUint8Array(data);
	const bom = buf[0] << 8 | buf[1];
	if (bom === BOM_BE || buf[0] === 0 && buf[1] !== 0) return decodeUtf16BE(buf);
	if (bom === BOM_LE || buf[0] !== 0 && buf[1] === 0) return decodeUtf16LE(buf);
	if (!encoding) return decoderUTF8.decode(buf);
	switch (encoding) {
		case "utf-16be":
		case "utf16be": return decodeUtf16BE(buf);
		case "utf-16le":
		case "utf16le": return decodeUtf16LE(buf);
		case "utf-8":
		case "utf8": return decoderUTF8.decode(buf);
	}
	throw new UnsupportedEncodingError(encoding);
}
function decode(data, encoding) {
	switch (encoding) {
		case "base64":
		case "base64url":
		case "hex": return arrayBufferViewToBuffer(data).toString(encoding);
	}
	return decodeToString(data, encoding);
}
function encodeString$1(str, encoding, bom) {
	switch (encoding) {
		case void 0:
		case "utf-8":
		case "utf8": return encoderUTF8.encode(str);
		case "utf-16be":
		case "utf16be": return encodeUtf16BE(str, bom);
		case "utf-16le":
		case "utf16le": return encodeUtf16LE(str, bom);
	}
	return Buffer.from(str, encoding);
}
function encodeUtf16LE(str, bom = true) {
	const buf = Buffer.from(str, "utf16le");
	if (bom) {
		const target = Buffer.alloc(buf.length + 2);
		target.writeUint16LE(BOM_BE);
		buf.copy(target, 2);
		return target;
	}
	return buf;
}
function encodeUtf16BE(str, bom = true) {
	return swap16(encodeUtf16LE(str, bom));
}
function createTextDecoderUtf16BE() {
	try {
		return new TextDecoder("utf-16be");
	} catch {
		return {
			encoding: "utf-16be",
			fatal: false,
			ignoreBOM: false,
			decode: (input) => decoderUTF16LE.decode(swapBytes(input))
		};
	}
}
var UnsupportedEncodingError = class extends Error {
	constructor(encoding) {
		super(`Unsupported encoding: ${encoding}`);
	}
};
function isGZipped(data) {
	if (typeof data === "string") return false;
	const buf = toUint8Array(data);
	return buf[0] === 31 && buf[1] === 139;
}
function decompressBuffer(data) {
	if (!isGZipped(data)) return data;
	return gunzipSync(arrayBufferViewToBuffer(data));
}
async function decompress(data, method = "gzip") {
	const ds = new DecompressionStream(method || "deflate-raw");
	const writer = ds.writable.getWriter();
	writer.write(data);
	writer.close();
	const reader = ds.readable.getReader();
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
	return result;
}
//#endregion
//#region src/common/CFileResource.ts
var CFileResource = class CFileResource {
	baseFilename;
	url;
	content;
	encoding;
	#gz;
	#text;
	#data;
	constructor(url, content, encoding, baseFilename, gz) {
		this.url = url;
		this.content = content;
		this.encoding = encoding;
		this.baseFilename = baseFilename ?? (url.protocol !== "data:" && url.pathname.split("/").pop() || void 0);
		this.#gz = gz;
	}
	get gz() {
		if (this.#gz !== void 0) return this.#gz;
		if (this.url.pathname.endsWith(".gz")) return true;
		if (typeof this.content === "string") return false;
		return isGZipped(this.content);
	}
	getText(encoding) {
		if (this.#text !== void 0) return this.#text;
		const text = typeof this.content === "string" ? this.content : decode(this.content, encoding ?? this.encoding);
		this.#text = text;
		return text;
	}
	async getBytes(unzip) {
		if (unzip !== false && this.#data !== void 0) return this.#data;
		if (typeof this.content === "string") {
			this.#data = encodeString$1(this.content, this.encoding);
			return this.#data;
		}
		if (unzip ?? isGZipped(this.content)) {
			this.#data = await decompress(this.content, "gzip");
			return this.#data;
		}
		return this.content;
	}
	toJson() {
		return {
			url: this.url.href,
			content: this.getText(),
			encoding: this.encoding,
			baseFilename: this.baseFilename,
			gz: this.gz
		};
	}
	static isCFileResource(obj) {
		return obj instanceof CFileResource;
	}
	static from(urlOrFileResource, content, encoding, baseFilename, gz) {
		if (CFileResource.isCFileResource(urlOrFileResource)) {
			if (content) {
				const { url, encoding, baseFilename, gz } = urlOrFileResource;
				return new CFileResource(url, content, encoding, baseFilename, gz);
			}
			return urlOrFileResource;
		}
		if (urlOrFileResource instanceof URL) {
			assert$1(content !== void 0);
			return new CFileResource(urlOrFileResource, content, encoding, baseFilename, gz);
		}
		if (content !== void 0) {
			const fileRef = urlOrFileResource;
			return new CFileResource(fileRef.url, content, fileRef.encoding, fileRef.baseFilename, fileRef.gz);
		}
		assert$1("content" in urlOrFileResource && urlOrFileResource.content !== void 0);
		const fileResource = urlOrFileResource;
		return new CFileResource(fileResource.url, fileResource.content, fileResource.encoding, fileResource.baseFilename, fileResource.gz);
	}
};
function fromFileResource(fileResource, encoding) {
	return CFileResource.from(encoding ? {
		...fileResource,
		encoding
	} : fileResource);
}
function renameFileResource(fileResource, url) {
	return CFileResource.from({
		...fileResource,
		url
	});
}
//#endregion
//#region src/common/stat.ts
/**
* Compare two Stats to see if they have the same value.
* @param left - Stats
* @param right - Stats
* @returns 0 - equal; 1 - left > right; -1 left < right
*/
function compareStats(left, right) {
	if (left === right) return 0;
	if (left.eTag || right.eTag) return left.eTag === right.eTag ? 0 : (left.eTag || "") < (right.eTag || "") ? -1 : 1;
	const diff = left.size - right.size || left.mtimeMs - right.mtimeMs;
	return diff < 0 ? -1 : diff > 0 ? 1 : 0;
}
//#endregion
//#region src/common/urlOrReferenceToUrl.ts
function urlOrReferenceToUrl(urlOrReference) {
	return urlOrReference instanceof URL ? urlOrReference : urlOrReference.url;
}
//#endregion
//#region src/CSpellIO.ts
function toReadFileOptions(options) {
	if (!options) return options;
	if (typeof options === "string") return { encoding: options };
	return options;
}
//#endregion
//#region src/errors/error.ts
function toError$1(e) {
	if (e instanceof Error) return e;
	if (typeof e === "object" && e && "message" in e && typeof e.message === "string") return new Error(e.message, { cause: e });
	return new Error(e && e.toString());
}
//#endregion
//#region src/models/Stats.ts
let FileType = /* @__PURE__ */ function(FileType) {
	/**
	* The file type is unknown.
	*/
	FileType[FileType["Unknown"] = 0] = "Unknown";
	/**
	* A regular file.
	*/
	FileType[FileType["File"] = 1] = "File";
	/**
	* A directory.
	*/
	FileType[FileType["Directory"] = 2] = "Directory";
	/**
	* A symbolic link.
	*/
	FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
	return FileType;
}({});
//#endregion
//#region src/node/dataUrl.ts
/**
* Generates a string of the following format:
*
* `data:[mediaType][;charset=<encoding>[;base64],<data>`
*
* - `encoding` - defaults to `utf8` for text data
* @param data
* @param mediaType - The mediaType is a [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type string
* @param attributes - Additional attributes
*/
function encodeDataUrl(data, mediaType, attributes) {
	if (typeof data === "string") return encodeString(data, mediaType, attributes);
	return `data:${mediaType}${encodeAttributes(attributes || [])};base64,${arrayBufferViewToBuffer(data).toString("base64url")}`;
}
function toDataUrl(data, mediaType, attributes) {
	return new URL(encodeDataUrl(data, mediaType, attributes));
}
function encodeString(data, mediaType, attributes) {
	mediaType = mediaType || "text/plain";
	attributes = attributes || [];
	const asUrlComp = encodeURIComponent(data);
	const asBase64 = Buffer.from(data).toString("base64url");
	const useBase64 = asBase64.length < asUrlComp.length - 7;
	const encoded = useBase64 ? asBase64 : asUrlComp;
	const attribMap = new Map([["charset", "utf-8"], ...attributes]);
	attribMap.set("charset", "utf-8");
	const attribs = encodeAttributes(attribMap);
	return `data:${mediaType}${attribs}${useBase64 ? ";base64" : ""},${encoded}`;
}
function encodeAttributes(attributes) {
	return [...attributes].map(([key, value]) => `;${key}=${encodeURIComponent(value)}`).join("");
}
const dataUrlRegExHead = /^data:(?<mediaType>[^;,]*)(?<attributes>(?:;[^=]+=[^;,]*)*)(?<base64>;base64)?$/;
function decodeDataUrl(url) {
	url = url.toString();
	const [head, encodedData] = url.split(",", 2);
	if (!head || encodedData === void 0) throw new Error("Not a data url");
	const match = head.match(dataUrlRegExHead);
	if (!match || !match.groups) throw new Error("Not a data url");
	const mediaType = match.groups["mediaType"] || "";
	const rawAttributes = (match.groups["attributes"] || "").split(";").filter((a) => !!a).map((entry) => entry.split("=", 2)).map(([key, value]) => [key, decodeURIComponent(value)]);
	const attributes = new Map(rawAttributes);
	const encoding = attributes.get("charset");
	return {
		mediaType,
		data: !!match.groups["base64"] ? Buffer.from(encodedData, "base64url") : Buffer.from(decodeURIComponent(encodedData)),
		encoding,
		attributes
	};
}
function guessMimeType(filename) {
	if (filename.endsWith(".trie")) return {
		mimeType: "application/vnd.cspell.dictionary+trie",
		encoding: "utf-8"
	};
	if (filename.endsWith(".trie.gz")) return { mimeType: "application/vnd.cspell.dictionary+trie.gz" };
	if (filename.endsWith(".txt")) return {
		mimeType: "text/plain",
		encoding: "utf-8"
	};
	if (filename.endsWith(".txt.gz")) return { mimeType: "application/gzip" };
	if (filename.endsWith(".gz")) return { mimeType: "application/gzip" };
	if (filename.endsWith(".json")) return {
		mimeType: "application/json",
		encoding: "utf-8"
	};
	if (filename.endsWith(".yaml") || filename.endsWith(".yml")) return {
		mimeType: "application/x-yaml",
		encoding: "utf-8"
	};
}
//#endregion
//#region src/node/file/_fetch.ts
/** alias of global.fetch, useful for mocking */
const _fetch = globalThis.fetch;
//#endregion
//#region src/node/file/FetchError.ts
var FetchUrlError = class FetchUrlError extends Error {
	constructor(message, code, status, url) {
		super(message);
		this.code = code;
		this.status = status;
		this.url = url;
		this.name = "FetchUrlError";
	}
	static create(url, status, message) {
		if (status === 404) return new FetchUrlError(message || "URL not found.", "ENOENT", status, url);
		if (status >= 400 && status < 500) return new FetchUrlError(message || "Permission denied.", "EACCES", status, url);
		return new FetchUrlError(message || "Fatal Error", "ECONNREFUSED", status, url);
	}
	static fromError(url, e) {
		const cause = getCause(e);
		if (cause) return new FetchUrlError(cause.message, cause.code, void 0, url);
		if (isNodeError(e)) return new FetchUrlError(e.message, e.code, void 0, url);
		return new FetchUrlError(e.message, void 0, void 0, url);
	}
};
function isNodeError(e) {
	if (e instanceof Error && "code" in e && typeof e.code === "string") return true;
	if (e && typeof e === "object" && "code" in e && typeof e.code === "string") return true;
	return false;
}
function isError(e) {
	return e instanceof Error;
}
function isErrorWithOptionalCause(e) {
	return isError(e) && (!("cause" in e) || isNodeError(e.cause) || isNodeError(e));
}
function getCause(e) {
	return isErrorWithOptionalCause(e) ? e.cause : void 0;
}
function toFetchUrlError(err, url) {
	return err instanceof FetchUrlError ? err : FetchUrlError.fromError(url, toError(err));
}
function toError(err) {
	return err instanceof Error ? err : new Error("Unknown Error", { cause: err });
}
//#endregion
//#region src/node/file/fetch.ts
async function fetchHead(request) {
	const url = toURL$1(request);
	try {
		const r = await _fetch(url, { method: "HEAD" });
		if (!r.ok) throw FetchUrlError.create(url, r.status);
		return r.headers;
	} catch (e) {
		throw toFetchUrlError(e, url);
	}
}
async function fetchURL(url, signal) {
	try {
		const response = await _fetch(signal ? new Request(url, { signal }) : url);
		if (!response.ok) throw FetchUrlError.create(url, response.status);
		return await response.bytes();
	} catch (e) {
		throw toFetchUrlError(e, url);
	}
}
function toURL$1(url) {
	return typeof url === "string" ? new URL(url) : url;
}
//#endregion
//#region src/node/file/stat.ts
async function getStatHttp(url) {
	const headers = await fetchHead(url);
	const eTag = headers.get("etag") || void 0;
	const guessSize = Number.parseInt(headers.get("content-length") || "0", 10);
	return {
		size: eTag ? -1 : guessSize,
		mtimeMs: 0,
		eTag
	};
}
const RequestFsReadFile = requestFactory("fs:readFile");
const RequestFsReadFileTextSync = requestFactory("fs:readFileSync");
const RequestFsStat = requestFactory("fs:stat");
const RequestFsStatSync = requestFactory("fs:statSync");
const RequestFsWriteFile = requestFactory("fs:writeFile");
const RequestZlibInflate = requestFactory("zlib:inflate");
const RequestFsReadDirectory = requestFactory("fs:readDir");
//#endregion
//#region src/handlers/node/file.ts
const isGzFileRegExp = /\.gz($|[?#])/;
function isGzFile(url) {
	return isGzFileRegExp.test(typeof url === "string" ? url : url.pathname);
}
const pGzip = promisify(gzip);
/**
* Handle Binary File Reads
*/
const handleRequestFsReadFile = RequestFsReadFile.createRequestHandler(({ params }) => {
	const baseFilename = urlBasename(params.url);
	return createResponse(promises.readFile(fileURLToPath(params.url)).then((content) => CFileResource.from(params.url, content, params.encoding, baseFilename)));
}, void 0, "Node: Read Binary File.");
/**
* Handle Binary File Sync Reads
*/
const handleRequestFsReadFileSync = RequestFsReadFileTextSync.createRequestHandler(({ params }) => createResponse(CFileResource.from({
	...params,
	content: readFileSync(fileURLToPath(params.url))
})), void 0, "Node: Sync Read Binary File.");
/**
* Handle Binary File Reads
*/
const handleRequestFsReadDirectory = RequestFsReadDirectory.createRequestHandler(({ params }) => {
	return createResponse(promises.readdir(fileURLToPath(params.url), { withFileTypes: true }).then((entries) => direntToDirEntries(params.url, entries)));
}, void 0, "Node: Read Directory.");
/**
* Handle deflating gzip data
*/
const handleRequestZlibInflate = RequestZlibInflate.createRequestHandler(({ params }) => createResponse(gunzipSync(arrayBufferViewToBuffer(params.data))), void 0, "Node: gz deflate.");
const supportedFetchProtocols = {
	"http:": true,
	"https:": true
};
/**
* Handle fetching a file from http
*/
const handleRequestFsReadFileHttp = RequestFsReadFile.createRequestHandler((req, next) => {
	const { url, signal, encoding } = req.params;
	if (!(url.protocol in supportedFetchProtocols)) return next(req);
	return createResponse(fetchURL(url, signal).then((content) => CFileResource.from({
		url,
		encoding,
		content
	})));
}, void 0, "Node: Read Http(s) file.");
/**
* Handle decoding a data url
*/
const handleRequestFsReadFileSyncData = RequestFsReadFileTextSync.createRequestHandler((req, next) => {
	const { url, encoding } = req.params;
	if (url.protocol !== "data:") return next(req);
	const data = decodeDataUrl(url);
	return createResponse(CFileResource.from({
		url,
		content: data.data,
		encoding,
		baseFilename: data.attributes.get("filename")
	}));
}, void 0, "Node: Read data: urls.");
/**
* Handle decoding a data url
*/
const handleRequestFsReadFileData = RequestFsReadFile.createRequestHandler((req, next, dispatcher) => {
	const { url } = req.params;
	if (url.protocol !== "data:") return next(req);
	const res = dispatcher.dispatch(RequestFsReadFileTextSync.create(req.params));
	if (!isServiceResponseSuccess(res)) return res;
	return createResponse(Promise.resolve(res.value));
}, void 0, "Node: Read data: urls.");
/**
* Handle fs:stat
*/
const handleRequestFsStat = RequestFsStat.createRequestHandler(({ params }) => createResponse(toPromiseStats(promises.stat(fileURLToPath(params.url)))), void 0, "Node: fs.stat.");
function toStats(stat) {
	return {
		size: stat.size,
		mtimeMs: stat.mtimeMs,
		fileType: toFileType(stat)
	};
}
function toPromiseStats(pStat) {
	return pStat.then(toStats);
}
/**
* Handle fs:statSync
*/
const handleRequestFsStatSync = RequestFsStatSync.createRequestHandler((req) => {
	const { params } = req;
	try {
		return createResponse(statSync(fileURLToPath(params.url)));
	} catch (e) {
		return createResponseFail(req, toError$1(e));
	}
}, void 0, "Node: fs.stat.");
/**
* Handle deflating gzip data
*/
const handleRequestFsStatHttp = RequestFsStat.createRequestHandler((req, next) => {
	const { url } = req.params;
	if (!(url.protocol in supportedFetchProtocols)) return next(req);
	return createResponse(getStatHttp(url));
}, void 0, "Node: http get stat");
/**
* Handle fs:writeFile
*/
const handleRequestFsWriteFile = RequestFsWriteFile.createRequestHandler(({ params }) => createResponse(writeFile(params, params.content)), void 0, "Node: fs.writeFile");
async function writeFile(fileRef, content) {
	const gz = isGZipped(content);
	const { url, encoding, baseFilename } = fileRef;
	const resultRef = {
		url,
		encoding,
		baseFilename,
		gz
	};
	await promises.writeFile(fileURLToPath(fileRef.url), encodeContent(fileRef, content));
	return resultRef;
}
/**
* Handle fs:writeFile
*/
const handleRequestFsWriteFileDataUrl = RequestFsWriteFile.createRequestHandler((req, next) => {
	const fileResource = req.params;
	const { url } = req.params;
	if (url.protocol !== "data:") return next(req);
	const gz = isGZipped(fileResource.content);
	const baseFilename = fileResource.baseFilename || "file.txt" + (gz ? ".gz" : "");
	const mt = guessMimeType(baseFilename);
	const mediaType = mt?.mimeType || "text/plain";
	const dataUrl = toDataUrl(fileResource.content, mediaType, [["filename", baseFilename]]);
	return createResponse(Promise.resolve({
		url: dataUrl,
		baseFilename,
		gz,
		encoding: mt?.encoding
	}));
}, void 0, "Node: fs.writeFile DataUrl");
/**
* Handle fs:writeFile compressed
*/
const handleRequestFsWriteFileGz = RequestFsWriteFile.createRequestHandler((req, next, dispatcher) => {
	const fileResource = req.params;
	if (!fileResource.gz && !isGzFile(fileResource.url) && (!fileResource.baseFilename || !isGzFile(fileResource.baseFilename))) return next(req);
	if (typeof fileResource.content !== "string" && isGZipped(fileResource.content)) return next(req);
	return createResponse(compressAndChainWriteRequest(dispatcher, fileResource, fileResource.content));
}, void 0, "Node: fs.writeFile compressed");
async function compressAndChainWriteRequest(dispatcher, fileRef, content) {
	const buf = await pGzip(encodeContent(fileRef, content));
	const res = dispatcher.dispatch(RequestFsWriteFile.create({
		...fileRef,
		content: buf
	}));
	assert$1(isServiceResponseSuccess(res));
	return res.value;
}
function registerHandlers(serviceBus) {
	[
		handleRequestFsReadFile,
		handleRequestFsReadFileSync,
		handleRequestFsWriteFile,
		handleRequestFsWriteFileDataUrl,
		handleRequestFsWriteFileGz,
		handleRequestFsReadFileHttp,
		handleRequestFsReadFileData,
		handleRequestFsReadFileSyncData,
		handleRequestFsReadDirectory,
		handleRequestZlibInflate,
		handleRequestFsStatSync,
		handleRequestFsStat,
		handleRequestFsStatHttp
	].forEach((handler) => serviceBus.addHandler(handler));
}
function encodeContent(ref, content) {
	if (typeof content === "string") {
		if ([
			void 0,
			"utf8",
			"utf-8"
		].includes(ref.encoding)) return content;
		return arrayBufferViewToBuffer(encodeString$1(content, ref.encoding));
	}
	return arrayBufferViewToBuffer(content);
}
function mapperDirentToDirEntry(dir) {
	return (dirent) => direntToDirEntry(dir, dirent);
}
function direntToDirEntries(dir, dirent) {
	return dirent.map(mapperDirentToDirEntry(dir));
}
function direntToDirEntry(dir, dirent) {
	return {
		name: dirent.name,
		dir,
		fileType: toFileType(dirent)
	};
}
function toFileType(statLike) {
	const t = statLike.isFile() ? FileType.File : statLike.isDirectory() ? FileType.Directory : FileType.Unknown;
	return statLike.isSymbolicLink() ? t | FileType.SymbolicLink : t;
}
//#endregion
//#region src/CSpellIONode.ts
let defaultCSpellIONode = void 0;
var CSpellIONode = class {
	constructor(serviceBus = new ServiceBus()) {
		this.serviceBus = serviceBus;
		registerHandlers(serviceBus);
	}
	readFile(urlOrFilename, options) {
		const readOptions = toReadFileOptions(options);
		const ref = toFileResourceRequest(urlOrFilename, readOptions?.encoding, readOptions?.signal);
		const res = this.serviceBus.dispatch(RequestFsReadFile.create(ref));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "readFile");
		return res.value;
	}
	readDirectory(urlOrFilename) {
		const ref = toFileReference(urlOrFilename);
		const res = this.serviceBus.dispatch(RequestFsReadDirectory.create(ref));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "readDirectory");
		return res.value;
	}
	readFileSync(urlOrFilename, encoding) {
		const ref = toFileReference(urlOrFilename, encoding);
		const res = this.serviceBus.dispatch(RequestFsReadFileTextSync.create(ref));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "readFileSync");
		return res.value;
	}
	writeFile(urlOrFilename, content) {
		const ref = toFileReference(urlOrFilename);
		const fileResource = CFileResource.from(ref, content);
		const res = this.serviceBus.dispatch(RequestFsWriteFile.create(fileResource));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "writeFile");
		return res.value;
	}
	getStat(urlOrFilename) {
		const ref = toFileReference(urlOrFilename);
		const res = this.serviceBus.dispatch(RequestFsStat.create(ref));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "getStat");
		return res.value;
	}
	getStatSync(urlOrFilename) {
		const ref = toFileReference(urlOrFilename);
		const res = this.serviceBus.dispatch(RequestFsStatSync.create(ref));
		if (!isServiceResponseSuccess(res)) throw genError(res.error, "getStatSync");
		return res.value;
	}
	compareStats(left, right) {
		return compareStats(left, right);
	}
	toURL(urlOrFilename, relativeTo) {
		if (isFileReference(urlOrFilename)) return urlOrFilename.url;
		return toURL(urlOrFilename, relativeTo);
	}
	toFileURL(urlOrFilename, relativeTo) {
		if (isFileReference(urlOrFilename)) return urlOrFilename.url;
		return toFileURL(urlOrFilename, relativeTo);
	}
	urlBasename(urlOrFilename) {
		return urlBasename(this.toURL(urlOrFilename));
	}
	urlDirname(urlOrFilename) {
		return urlDirname(this.toURL(urlOrFilename));
	}
};
function genError(err, alt) {
	return err || new ErrorNotImplemented(alt);
}
function getDefaultCSpellIO() {
	if (defaultCSpellIONode) return defaultCSpellIONode;
	const cspellIO = new CSpellIONode();
	defaultCSpellIONode = cspellIO;
	return cspellIO;
}
//#endregion
//#region src/common/transformers.ts
function encoderTransformer(iterable, encoding) {
	return isAsyncIterable(iterable) ? encoderAsyncIterable(iterable, encoding) : encoderIterable(iterable, encoding);
}
function* encoderIterable(iterable, encoding) {
	let useBom = true;
	for (const chunk of iterable) {
		yield encodeString$1(chunk, encoding, useBom);
		useBom = false;
	}
}
async function* encoderAsyncIterable(iterable, encoding) {
	let useBom = true;
	for await (const chunk of iterable) {
		yield encodeString$1(chunk, encoding, useBom);
		useBom = false;
	}
}
function isAsyncIterable(v) {
	return v && typeof v === "object" && !!v[Symbol.asyncIterator];
}
//#endregion
//#region src/node/file/fileWriter.ts
const pipeline = promisify(Stream.pipeline);
function writeToFile(filename, data, encoding) {
	return writeToFileIterable(filename, typeof data === "string" ? [data] : data, encoding);
}
function writeToFileIterable(filename, data, encoding) {
	return pipeline(Stream.Readable.from(encoderTransformer(data, encoding)), /\.gz$/.test(filename) ? zlib.createGzip() : new Stream.PassThrough(), fs.createWriteStream(filename));
}
//#endregion
//#region src/file/file.ts
async function readFileText(filename, encoding) {
	return (await getDefaultCSpellIO().readFile(filename, encoding)).getText();
}
function readFileTextSync(filename, encoding) {
	return getDefaultCSpellIO().readFileSync(filename, encoding).getText();
}
async function getStat(filenameOrUri) {
	try {
		return await getDefaultCSpellIO().getStat(filenameOrUri);
	} catch (e) {
		return toError$1(e);
	}
}
function getStatSync(filenameOrUri) {
	try {
		return getDefaultCSpellIO().getStatSync(filenameOrUri);
	} catch (e) {
		return toError$1(e);
	}
}
//#endregion
//#region src/VirtualFS/constants.ts
const CSPELL_VFS_PROTOCOL = "cspell-vfs:";
//#endregion
//#region src/VirtualFS/findUpFromUrl.ts
async function findUpFromUrl(name, from, options) {
	const { type: entryType = "file", stopAt, fs } = options;
	let dir = new URL(".", from);
	const root = new URL("/", dir);
	const predicate = makePredicate(fs, name, entryType);
	const stopAtHrefs = new Set((Array.isArray(stopAt) ? stopAt : [stopAt || root]).map((p) => new URL(".", p).href));
	let last = "";
	while (dir.href !== last) {
		const found = await predicate(dir);
		if (found !== void 0) return found;
		last = dir.href;
		if (dir.href === root.href || stopAtHrefs.has(dir.href)) break;
		dir = new URL("..", dir);
	}
}
function makePredicate(fs, name, entryType) {
	if (typeof name === "function") return name;
	const checkStat = entryType === "file" || entryType === "!file" ? "isFile" : "isDirectory";
	const checkValue = entryType.startsWith("!") ? false : true;
	function checkName(dir, name) {
		const f = new URL(name, dir);
		return fs.stat(f).then((stats) => (stats.isUnknown() || stats[checkStat]() === checkValue) && f || void 0).catch(() => void 0);
	}
	if (!Array.isArray(name)) return (dir) => checkName(dir, name);
	return async (dir) => {
		const pending = name.map((n) => checkName(dir, n));
		for (const p of pending) {
			const found = await p;
			if (found) return found;
		}
	};
}
//#endregion
//#region src/VirtualFS/CVFileSystem.ts
var CVFileSystem = class {
	#core;
	readFile;
	writeFile;
	stat;
	readDirectory;
	getCapabilities;
	constructor(core) {
		this.#core = core;
		this.readFile = this.#core.readFile.bind(this.#core);
		this.writeFile = this.#core.writeFile.bind(this.#core);
		this.stat = this.#core.stat.bind(this.#core);
		this.readDirectory = this.#core.readDirectory.bind(this.#core);
		this.getCapabilities = this.#core.getCapabilities.bind(this.#core);
	}
	get providerInfo() {
		return this.#core.providerInfo;
	}
	get hasProvider() {
		return this.#core.hasProvider;
	}
	findUp(name, from, options = {}) {
		return findUpFromUrl(name, from, {
			...options,
			fs: this.#core
		});
	}
};
//#endregion
//#region src/VirtualFS/errors.ts
var VFSError = class extends Error {
	url;
	code;
	constructor(message, options) {
		super(message, { cause: options?.cause });
		this.name = "VFSError";
		this.url = options?.url instanceof URL ? options.url.href : options?.url;
		this.code = options?.code;
	}
};
var VFSNotSupported = class extends VFSError {
	constructor(methodName, url) {
		super(`Method ${methodName} is not supported for ${url.href}`, { url });
	}
};
var VFSNotFoundError = class extends VFSError {
	constructor(url, options) {
		super(`Not found: ${url.href}`, {
			...options,
			url,
			code: options?.code ?? "ENOENT"
		});
	}
};
var VFSErrorUnsupportedRequest = class extends VFSError {
	constructor(request, url, parameters) {
		super(`Unsupported request: ${request}`, { url });
		this.request = request;
		this.parameters = parameters;
	}
};
//#endregion
//#region src/VirtualFS/VFileSystem.ts
let FSCapabilityFlags = /* @__PURE__ */ function(FSCapabilityFlags) {
	FSCapabilityFlags[FSCapabilityFlags["None"] = 0] = "None";
	FSCapabilityFlags[FSCapabilityFlags["Stat"] = 1] = "Stat";
	FSCapabilityFlags[FSCapabilityFlags["Read"] = 2] = "Read";
	FSCapabilityFlags[FSCapabilityFlags["Write"] = 4] = "Write";
	FSCapabilityFlags[FSCapabilityFlags["ReadWrite"] = 6] = "ReadWrite";
	FSCapabilityFlags[FSCapabilityFlags["ReadDir"] = 8] = "ReadDir";
	FSCapabilityFlags[FSCapabilityFlags["WriteDir"] = 16] = "WriteDir";
	FSCapabilityFlags[FSCapabilityFlags["ReadWriteDir"] = 24] = "ReadWriteDir";
	return FSCapabilityFlags;
}({});
//#endregion
//#region src/VirtualFS/MemVfsProvider.ts
var MemFileSystemProvider = class {
	name;
	protocol;
	#vfs;
	/**
	* @param name - the name of the provider, used for debugging and logging.
	* @param protocol - the protocol (end with a :), examples: `vfs:`, `cspell-vfs:`
	*/
	constructor(name, protocol) {
		this.name = name;
		this.protocol = protocol;
		this.#vfs = new MemVFileSystem(name, protocol);
	}
	getFileSystem(url) {
		if (url.protocol !== this.protocol) return;
		return this.#vfs;
	}
	get memFS() {
		return this.#vfs;
	}
	dispose() {
		this.#vfs.dispose();
	}
	[Symbol.dispose]() {
		this.dispose();
	}
};
var MemVFileSystem = class {
	name;
	protocol;
	capabilities = FSCapabilityFlags.ReadWrite | FSCapabilityFlags.Stat;
	#files = /* @__PURE__ */ new Map();
	constructor(name, protocol) {
		this.name = name;
		this.protocol = protocol;
		this.providerInfo = { name };
		this.#files = /* @__PURE__ */ new Map();
	}
	/**
	* Read a file.
	* @param url - URL to read
	* @param options - options for reading the file.
	* @returns A FileResource, the content will not be decoded. Use `.getText()` to get the decoded text.
	*/
	async readFile(url, _options) {
		return this.#getEntryOrThrow(url).file;
	}
	/**
	* Write a file
	* @param file - the file to write
	*/
	async writeFile(file) {
		const stats = {
			size: file.content.length,
			mtimeMs: performance.now(),
			fileType: FileType.File
		};
		const u = urlOrReferenceToUrl(file);
		this.#files.set(u.href, {
			file,
			stats
		});
		return { url: file.url };
	}
	/**
	* Get the stats for a url.
	* @param url - Url to fetch stats for.
	*/
	stat(url) {
		return this.#getEntryOrThrow(url).stats;
	}
	#getEntryOrThrow(url) {
		const u = urlOrReferenceToUrl(url);
		const found = this.#files.get(u.href);
		if (!found) throw new VFSNotFoundError(u);
		return found;
	}
	/**
	* Read the directory entries for a url.
	* The url should end with `/` to indicate a directory.
	* @param url - the url to read the directory entries for.
	*/
	async readDirectory(url) {
		throw new VFSNotSupported("readDirectory", url);
	}
	/**
	* Information about the provider.
	* It is up to the provider to define what information is available.
	*/
	providerInfo;
	dispose() {
		this.#files.clear();
	}
	[Symbol.dispose]() {
		this.dispose();
	}
};
//#endregion
//#region src/VirtualFS/capabilities.ts
var CFsCapabilities = class {
	constructor(flags) {
		this.flags = flags;
	}
	get readFile() {
		return !!(this.flags & FSCapabilityFlags.Read);
	}
	get writeFile() {
		return !!(this.flags & FSCapabilityFlags.Write);
	}
	get readDirectory() {
		return !!(this.flags & FSCapabilityFlags.ReadDir);
	}
	get writeDirectory() {
		return !!(this.flags & FSCapabilityFlags.WriteDir);
	}
	get stat() {
		return !!(this.flags & FSCapabilityFlags.Stat);
	}
};
function fsCapabilities(flags) {
	return new CFsCapabilities(flags);
}
//#endregion
//#region src/VirtualFS/CFileType.ts
var CFileType = class {
	constructor(fileType) {
		this.fileType = fileType;
	}
	isFile() {
		return this.fileType === FileType.File;
	}
	isDirectory() {
		return this.fileType === FileType.Directory;
	}
	isUnknown() {
		return !this.fileType;
	}
	isSymbolicLink() {
		return !!(this.fileType & FileType.SymbolicLink);
	}
};
//#endregion
//#region src/VirtualFS/CVfsStat.ts
var CVfsStat = class extends CFileType {
	constructor(stat) {
		super(stat.fileType || FileType.Unknown);
		this.stat = stat;
	}
	get size() {
		return this.stat.size;
	}
	get mtimeMs() {
		return this.stat.mtimeMs;
	}
	get eTag() {
		return this.stat.eTag;
	}
};
//#endregion
//#region src/VirtualFS/WrappedProviderFs.ts
function cspellIOToFsProvider(cspellIO) {
	const capabilities = FSCapabilityFlags.Stat | FSCapabilityFlags.ReadWrite | FSCapabilityFlags.ReadDir;
	const capabilitiesHttp = capabilities & ~FSCapabilityFlags.Write & ~FSCapabilityFlags.ReadDir;
	const capMap = {
		"file:": capabilities,
		"http:": capabilitiesHttp,
		"https:": capabilitiesHttp
	};
	const name = "CSpellIO";
	const supportedProtocols = new Set([
		"file:",
		"http:",
		"https:"
	]);
	const dispose = () => void 0;
	const fs = {
		providerInfo: { name },
		stat: (url) => cspellIO.getStat(url),
		readFile: (url, options) => cspellIO.readFile(url, options),
		readDirectory: (url) => cspellIO.readDirectory(url),
		writeFile: (file) => cspellIO.writeFile(file.url, file.content),
		dispose,
		capabilities,
		getCapabilities(url) {
			return fsCapabilities(capMap[url.protocol] || FSCapabilityFlags.None);
		},
		[Symbol.dispose]: dispose
	};
	return {
		name,
		getFileSystem: (url, _next) => {
			return supportedProtocols.has(url.protocol) ? fs : void 0;
		}
	};
}
function wrapError(e) {
	if (e instanceof VFSError) return e;
	return e;
}
var WrappedProviderFs = class WrappedProviderFs {
	hasProvider;
	capabilities;
	providerInfo;
	_capabilities;
	constructor(fs, eventLogger) {
		this.fs = fs;
		this.eventLogger = eventLogger;
		this.hasProvider = !!fs;
		this.capabilities = fs?.capabilities || FSCapabilityFlags.None;
		this._capabilities = fsCapabilities(this.capabilities);
		this.providerInfo = fs?.providerInfo || { name: "unknown" };
	}
	logEvent(method, event, traceID, url, message) {
		this.eventLogger({
			method,
			event,
			url,
			traceID,
			ts: performance.now(),
			message
		});
	}
	getCapabilities(url) {
		if (this.fs?.getCapabilities) return this.fs.getCapabilities(url);
		return this._capabilities;
	}
	async stat(urlRef) {
		const traceID = performance.now();
		const url = urlOrReferenceToUrl(urlRef);
		this.logEvent("stat", "start", traceID, url);
		try {
			checkCapabilityOrThrow(this.fs, this.capabilities, FSCapabilityFlags.Stat, "stat", url);
			return new CVfsStat(await this.fs.stat(urlRef));
		} catch (e) {
			this.logEvent("stat", "error", traceID, url, e instanceof Error ? e.message : "");
			throw wrapError(e);
		} finally {
			this.logEvent("stat", "end", traceID, url);
		}
	}
	async readFile(urlRef, optionsOrEncoding) {
		const traceID = performance.now();
		const url = urlOrReferenceToUrl(urlRef);
		this.logEvent("readFile", "start", traceID, url);
		try {
			checkCapabilityOrThrow(this.fs, this.capabilities, FSCapabilityFlags.Read, "readFile", url);
			const readOptions = toOptions(optionsOrEncoding);
			return fromFileResource(await this.fs.readFile(urlRef, readOptions), readOptions?.encoding);
		} catch (e) {
			this.logEvent("readFile", "error", traceID, url, e instanceof Error ? e.message : "");
			throw wrapError(e);
		} finally {
			this.logEvent("readFile", "end", traceID, url);
		}
	}
	async readDirectory(url) {
		const traceID = performance.now();
		this.logEvent("readDir", "start", traceID, url);
		try {
			checkCapabilityOrThrow(this.fs, this.capabilities, FSCapabilityFlags.ReadDir, "readDirectory", url);
			return (await this.fs.readDirectory(url)).map((e) => new CVfsDirEntry(e));
		} catch (e) {
			this.logEvent("readDir", "error", traceID, url, e instanceof Error ? e.message : "");
			throw wrapError(e);
		} finally {
			this.logEvent("readDir", "end", traceID, url);
		}
	}
	async writeFile(file) {
		const traceID = performance.now();
		const url = file.url;
		this.logEvent("writeFile", "start", traceID, url);
		try {
			checkCapabilityOrThrow(this.fs, this.capabilities, FSCapabilityFlags.Write, "writeFile", file.url);
			return await this.fs.writeFile(file);
		} catch (e) {
			this.logEvent("writeFile", "error", traceID, url, e instanceof Error ? e.message : "");
			throw wrapError(e);
		} finally {
			this.logEvent("writeFile", "end", traceID, url);
		}
	}
	static disposeOf(fs) {
		fs instanceof WrappedProviderFs && fs.fs?.dispose();
	}
};
function checkCapabilityOrThrow(fs, capabilities, flag, name, url) {
	if (!(capabilities & flag)) throw new VFSErrorUnsupportedRequest(name, url);
}
var CVfsDirEntry = class extends CFileType {
	_url;
	constructor(entry) {
		super(entry.fileType);
		this.entry = entry;
	}
	get name() {
		return this.entry.name;
	}
	get dir() {
		return this.entry.dir;
	}
	get url() {
		if (this._url) return this._url;
		this._url = new URL(this.entry.name, this.entry.dir);
		return this._url;
	}
	toJSON() {
		return {
			name: this.name,
			dir: this.dir,
			fileType: this.fileType
		};
	}
};
/**
* Chop URL at node_modules to make it more readable in logs. If the URL contains `node_modules`, the
* chopped URL will include the part before `node_modules`, followed by `…`, and then the last 3 parts
* of the URL. If the URL does not contain `node_modules`, the original URL href will be returned.
* @param url - the URL to chop.
* @returns string - the chopped URL, if the URL contains node_modules, otherwise the original URL href.
*/
function chopUrlAtNodeModules(url) {
	if (!url) return "";
	const href = url.href;
	const parts = href.split("/");
	const n = parts.indexOf("node_modules");
	if (n > 0) {
		const tail = parts.slice(n + 1);
		if (tail.length <= 3) return href;
		return parts.slice(0, n + 1).join("/") + "/…/" + tail.slice(-3).join("/");
	}
	return href;
}
function rPad(str, len, ch = " ") {
	return str.padEnd(len, ch);
}
function toOptions(val) {
	return typeof val === "string" ? { encoding: val } : val;
}
//#endregion
//#region src/VirtualFS/CVirtualFS.ts
var CVirtualFS = class {
	providers = /* @__PURE__ */ new Set();
	cachedFs = /* @__PURE__ */ new Map();
	revCacheFs = /* @__PURE__ */ new Map();
	fsc;
	fs;
	loggingEnabled = false;
	constructor() {
		this.fsc = fsPassThroughCore((url) => this._getFS(url));
		this.fs = new CVFileSystem(this.fsc);
	}
	enableLogging(value) {
		this.loggingEnabled = value ?? true;
	}
	log = console.log;
	logEvent = (event) => {
		if (this.loggingEnabled) {
			const id = event.traceID.toFixed(13).replaceAll(/\d{4}(?=\d)/g, "$&.");
			const msg = event.message ? `\n\t\t${event.message}` : "";
			const method = rPad(`${event.method}-${event.event}`, 16);
			this.log(`${method} ID:${id} ts:${event.ts.toFixed(13)} ${chopUrlAtNodeModules(event.url)}${msg}`);
		}
	};
	registerFileSystemProvider(...providers) {
		providers.forEach((provider) => this.providers.add(provider));
		this.reset();
		const dispose = () => {
			for (const provider of providers) {
				for (const key of this.revCacheFs.get(provider) || []) this.cachedFs.delete(key);
				this.providers.delete(provider);
			}
			this.reset();
		};
		return {
			dispose,
			[Symbol.dispose]: dispose
		};
	}
	getFS(url) {
		return new CVFileSystem(this._getFS(url));
	}
	_getFS(url) {
		const key = `${url.protocol}${url.hostname}`;
		const cached = this.cachedFs.get(key);
		if (cached) return cached;
		const fnNext = (provider, next) => {
			return (url) => {
				let calledNext = false;
				const fs = provider.getFileSystem(url, (_url) => {
					calledNext = calledNext || url === _url;
					return next(_url);
				});
				if (fs) {
					const s = this.revCacheFs.get(provider) || /* @__PURE__ */ new Set();
					s.add(key);
					this.revCacheFs.set(provider, s);
					return fs;
				}
				if (!calledNext) return next(url);
			};
		};
		let next = (_url) => void 0;
		for (const provider of this.providers) next = fnNext(provider, next);
		const fs = new WrappedProviderFs(next(url), this.logEvent);
		this.cachedFs.set(key, fs);
		return fs;
	}
	reset() {
		this.disposeOfCachedFs();
	}
	disposeOfCachedFs() {
		for (const [key, fs] of [...this.cachedFs].reverse()) {
			try {
				WrappedProviderFs.disposeOf(fs);
			} catch {}
			this.cachedFs.delete(key);
		}
		this.cachedFs.clear();
		this.revCacheFs.clear();
	}
	dispose() {
		this.disposeOfCachedFs();
		const providers = [...this.providers].reverse();
		for (const provider of providers) try {
			provider.dispose?.();
		} catch {}
	}
	[Symbol.dispose]() {
		this.dispose();
	}
};
function fsPassThroughCore(fs) {
	function gfs(ur, name) {
		const url = urlOrReferenceToUrl(ur);
		const f = fs(url);
		if (!f.hasProvider) throw new VFSErrorUnsupportedRequest(name, url, ur instanceof URL ? void 0 : {
			url: ur.url.toString(),
			encoding: ur.encoding
		});
		return f;
	}
	return {
		providerInfo: { name: "default" },
		hasProvider: true,
		stat: async (url) => gfs(url, "stat").stat(url),
		readFile: async (url, options) => gfs(url, "readFile").readFile(url, options),
		writeFile: async (file) => gfs(file, "writeFile").writeFile(file),
		readDirectory: async (url) => gfs(url, "readDirectory").readDirectory(url).then((entries) => entries.map((e) => new CVfsDirEntry(e))),
		getCapabilities: (url) => gfs(url, "getCapabilities").getCapabilities(url)
	};
}
function createVirtualFS(cspellIO) {
	const cspell = cspellIO || getDefaultCSpellIO();
	const vfs = new CVirtualFS();
	vfs.registerFileSystemProvider(cspellIOToFsProvider(cspell));
	vfs.registerFileSystemProvider(new MemFileSystemProvider(CSPELL_VFS_PROTOCOL + "default", CSPELL_VFS_PROTOCOL));
	return vfs;
}
let defaultVirtualFs = void 0;
function getDefaultVirtualFs() {
	if (!defaultVirtualFs) defaultVirtualFs = createVirtualFS();
	return defaultVirtualFs;
}
//#endregion
//#region src/VirtualFS/redirectProvider.ts
var RedirectProvider = class {
	constructor(name, publicRoot, privateRoot, options = { capabilitiesMask: -1 }) {
		this.name = name;
		this.publicRoot = publicRoot;
		this.privateRoot = privateRoot;
		this.options = options;
	}
	getFileSystem(url, next) {
		if (url.protocol !== this.publicRoot.protocol || url.host !== this.publicRoot.host) return;
		const privateFs = next(this.privateRoot);
		if (!privateFs) return;
		const shadowFS = next(url);
		return remapFS(this.name, privateFs, shadowFS, this.publicRoot, this.privateRoot, this.options);
	}
};
/**
* Create a provider that will redirect requests from the publicRoot to the privateRoot.
* This is useful for creating a virtual file system that is a subset of another file system.
*
* Example:
* ```ts
* const vfs = createVirtualFS();
* const provider = createRedirectProvider('test', new URL('file:///public/'), new URL('file:///private/'))
* vfs.registerFileSystemProvider(provider);
* // Read the content of `file:///private/file.txt`
* const file = vfs.fs.readFile(new URL('file:///public/file.txt');
* ```
*
* @param name - name of the provider
* @param publicRoot - the root of the public file system.
* @param privateRoot - the root of the private file system.
* @param options - options for the provider.
* @returns FileSystemProvider
*/
function createRedirectProvider(name, publicRoot, privateRoot, options) {
	assert(publicRoot.pathname.endsWith("/"), "publicRoot must end with a slash");
	assert(privateRoot.pathname.endsWith("/"), "privateRoot must end with a slash");
	return new RedirectProvider(name, publicRoot, privateRoot, options);
}
/**
* Create a Remapped file system that will redirect requests from the publicRoot to the privateRoot.
* Requests that do not match the publicRoot will be passed to the shadowFs.
* @param name - name of the provider
* @param fs - the private file system
* @param shadowFs - the file system that is obscured by the redirect.
* @param publicRoot - the root of the public file system.
* @param privateRoot - the root of the private file system.
* @returns ProviderFileSystem
*/
function remapFS(name, fs, shadowFs, publicRoot, privateRoot, options) {
	const { capabilitiesMask = -1, capabilities } = options;
	function mapToPrivate(url) {
		const relativePath = url.pathname.slice(publicRoot.pathname.length);
		return new URL(relativePath, privateRoot);
	}
	function mapToPublic(url) {
		const relativePath = url.pathname.slice(privateRoot.pathname.length);
		return new URL(relativePath, publicRoot);
	}
	const mapFileReferenceToPrivate = (ref) => {
		return renameFileReference(ref, mapToPrivate(ref.url));
	};
	const mapFileReferenceToPublic = (ref) => {
		return renameFileReference(ref, mapToPublic(ref.url));
	};
	const mapUrlOrReferenceToPrivate = (urlOrRef) => {
		return urlOrRef instanceof URL ? mapToPrivate(urlOrRef) : mapFileReferenceToPrivate(urlOrRef);
	};
	const mapFileResourceToPublic = (res) => {
		return renameFileResource(res, mapToPublic(res.url));
	};
	const mapFileResourceToPrivate = (res) => {
		return renameFileResource(res, mapToPrivate(res.url));
	};
	const mapDirEntryToPublic = (de) => {
		const dir = mapToPublic(de.dir);
		return {
			...de,
			dir
		};
	};
	const dispose = () => fs.dispose();
	return fsPassThrough({
		stat: async (url) => {
			const url2 = mapUrlOrReferenceToPrivate(url);
			return await fs.stat(url2);
		},
		readFile: async (url, options) => {
			const url2 = mapUrlOrReferenceToPrivate(url);
			return mapFileResourceToPublic(await fs.readFile(url2, options));
		},
		readDirectory: async (url) => {
			const url2 = mapToPrivate(url);
			return (await fs.readDirectory(url2)).map(mapDirEntryToPublic);
		},
		writeFile: async (file) => {
			const fileRef2 = mapFileResourceToPrivate(file);
			return mapFileReferenceToPublic(await fs.writeFile(fileRef2));
		},
		providerInfo: {
			...fs.providerInfo,
			name
		},
		capabilities: capabilities ?? fs.capabilities & capabilitiesMask,
		dispose,
		[Symbol.dispose]: dispose
	}, shadowFs, publicRoot);
}
function fsPassThrough(fs, shadowFs, root) {
	function gfs(ur, name) {
		const url = urlOrReferenceToUrl(ur);
		const f = url.href.startsWith(root.href) ? fs : shadowFs;
		if (!f) throw new VFSErrorUnsupportedRequest(name, url, ur instanceof URL ? void 0 : {
			url: ur.url.toString(),
			encoding: ur.encoding
		});
		return f;
	}
	return {
		get providerInfo() {
			return fs.providerInfo;
		},
		get capabilities() {
			return fs.capabilities;
		},
		stat: async (url) => gfs(url, "stat").stat(url),
		readFile: async (url) => gfs(url, "readFile").readFile(url),
		writeFile: async (file) => gfs(file, "writeFile").writeFile(file),
		readDirectory: async (url) => gfs(url, "readDirectory").readDirectory(url),
		getCapabilities(url) {
			const f = gfs(url, "getCapabilities");
			return f.getCapabilities ? f.getCapabilities(url) : fsCapabilities(f.capabilities);
		},
		dispose: () => {
			fs.dispose();
			shadowFs?.dispose();
		},
		[Symbol.dispose]() {
			this.dispose();
		}
	};
}
//#endregion
export { CFileReference, CFileResource, CSPELL_VFS_PROTOCOL, CSpellIONode, FSCapabilityFlags, FileType as VFileType, toArray as asyncIterableToArray, compareStats, createRedirectProvider, fromFileResource as createTextFileResource, createVirtualFS, encodeDataUrl, getDefaultCSpellIO, getDefaultVirtualFs, getStat, getStatSync, isFileURL, isUrlLike, readFileText, readFileTextSync, renameFileReference, renameFileResource, toDataUrl, toFileURL, toURL, urlBasename, urlDirname, urlOrReferenceToUrl, writeToFile, writeToFileIterable, writeToFileIterable as writeToFileIterableP };

//# sourceMappingURL=index.js.map