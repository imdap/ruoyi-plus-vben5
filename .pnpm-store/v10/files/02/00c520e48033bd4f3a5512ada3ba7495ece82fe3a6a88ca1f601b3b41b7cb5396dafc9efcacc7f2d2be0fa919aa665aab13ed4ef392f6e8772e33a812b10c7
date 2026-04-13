import { i as __require, t as __commonJSMin } from "./chunk-DSjvVL_1-BYdvZw3N.js";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
//#region ../../node_modules/.pnpm/prettier-plugin-tailwindcss@0.0.0-insiders.3997fbd_prettier@3.8.1/node_modules/prettier-plugin-tailwindcss/dist/resolve-pWjAK-4f.mjs
function expiringMap(duration) {
	let map = /* @__PURE__ */ new Map();
	return {
		get(key) {
			let result = map.get(key);
			if (result && result.expiration > /* @__PURE__ */ new Date()) return result.value;
			map.delete(key);
		},
		remember(key, factory) {
			let result = map.get(key);
			if (result && result.expiration > /* @__PURE__ */ new Date()) return result.value;
			map.delete(key);
			let value = factory();
			this.set(key, value);
			return value;
		},
		set(key, value) {
			let expiration = /* @__PURE__ */ new Date();
			expiration.setMilliseconds(expiration.getMilliseconds() + duration);
			map.set(key, {
				value,
				expiration
			});
		}
	};
}
var require_memoize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const memoize = (fn) => {
		let cache = false;
		let result;
		return () => {
			if (cache) return result;
			result = fn();
			cache = true;
			fn = void 0;
			return result;
		};
	};
	module.exports = memoize;
}));
var require_CachedInputFileSystem = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { nextTick } = __require("process");
	const dirname = (path) => {
		let idx = path.length - 1;
		while (idx >= 0) {
			const char = path.charCodeAt(idx);
			if (char === 47 || char === 92) break;
			idx--;
		}
		if (idx < 0) return "";
		return path.slice(0, idx);
	};
	const runCallbacks = (callbacks, err, result) => {
		if (callbacks.length === 1) {
			callbacks[0](err, result);
			callbacks.length = 0;
			return;
		}
		let error;
		for (const callback of callbacks) try {
			callback(err, result);
		} catch (err) {
			if (!error) error = err;
		}
		callbacks.length = 0;
		if (error) throw error;
	};
	var OperationMergerBackend = class {
		constructor(provider, syncProvider, providerContext) {
			this._provider = provider;
			this._syncProvider = syncProvider;
			this._providerContext = providerContext;
			this._activeAsyncOperations = /* @__PURE__ */ new Map();
			this.provide = this._provider ? (path, options, callback) => {
				if (typeof options === "function") {
					callback = options;
					options = void 0;
				}
				if (typeof path !== "string" && !Buffer.isBuffer(path) && !(path instanceof URL) && typeof path !== "number") {
					callback(/* @__PURE__ */ new TypeError("path must be a string, Buffer, URL or number"));
					return;
				}
				if (options) return this._provider.call(this._providerContext, path, options, callback);
				let callbacks = this._activeAsyncOperations.get(path);
				if (callbacks) {
					callbacks.push(callback);
					return;
				}
				this._activeAsyncOperations.set(path, callbacks = [callback]);
				provider(path, (err, result) => {
					this._activeAsyncOperations.delete(path);
					runCallbacks(callbacks, err, result);
				});
			} : null;
			this.provideSync = this._syncProvider ? (path, options) => this._syncProvider.call(this._providerContext, path, options) : null;
		}
		purge() {}
		purgeParent() {}
	};
	const STORAGE_MODE_IDLE = 0;
	const STORAGE_MODE_SYNC = 1;
	const STORAGE_MODE_ASYNC = 2;
	var CacheBackend = class {
		constructor(duration, provider, syncProvider, providerContext) {
			this._duration = duration;
			this._provider = provider;
			this._syncProvider = syncProvider;
			this._providerContext = providerContext;
			this._activeAsyncOperations = /* @__PURE__ */ new Map();
			this._data = /* @__PURE__ */ new Map();
			this._levels = [];
			for (let i = 0; i < 10; i++) this._levels.push(/* @__PURE__ */ new Set());
			for (let i = 5e3; i < duration; i += 500) this._levels.push(/* @__PURE__ */ new Set());
			this._currentLevel = 0;
			this._tickInterval = Math.floor(duration / this._levels.length);
			this._mode = STORAGE_MODE_IDLE;
			this._timeout = void 0;
			this._nextDecay = void 0;
			this.provide = provider ? this.provide.bind(this) : null;
			this.provideSync = syncProvider ? this.provideSync.bind(this) : null;
		}
		provide(path, options, callback) {
			if (typeof options === "function") {
				callback = options;
				options = void 0;
			}
			if (typeof path !== "string" && !Buffer.isBuffer(path) && !(path instanceof URL) && typeof path !== "number") {
				callback(/* @__PURE__ */ new TypeError("path must be a string, Buffer, URL or number"));
				return;
			}
			const strPath = typeof path !== "string" ? path.toString() : path;
			if (options) return this._provider.call(this._providerContext, path, options, callback);
			if (this._mode === STORAGE_MODE_SYNC) this._enterAsyncMode();
			const cacheEntry = this._data.get(strPath);
			if (cacheEntry !== void 0) {
				if (cacheEntry.err) return nextTick(callback, cacheEntry.err);
				return nextTick(callback, null, cacheEntry.result);
			}
			let callbacks = this._activeAsyncOperations.get(strPath);
			if (callbacks !== void 0) {
				callbacks.push(callback);
				return;
			}
			this._activeAsyncOperations.set(strPath, callbacks = [callback]);
			this._provider.call(this._providerContext, path, (err, result) => {
				this._activeAsyncOperations.delete(strPath);
				this._storeResult(strPath, err, result);
				this._enterAsyncMode();
				runCallbacks(callbacks, err, result);
			});
		}
		provideSync(path, options) {
			if (typeof path !== "string" && !Buffer.isBuffer(path) && !(path instanceof URL) && typeof path !== "number") throw new TypeError("path must be a string");
			const strPath = typeof path !== "string" ? path.toString() : path;
			if (options) return this._syncProvider.call(this._providerContext, path, options);
			if (this._mode === STORAGE_MODE_SYNC) this._runDecays();
			const cacheEntry = this._data.get(strPath);
			if (cacheEntry !== void 0) {
				if (cacheEntry.err) throw cacheEntry.err;
				return cacheEntry.result;
			}
			const callbacks = this._activeAsyncOperations.get(strPath);
			this._activeAsyncOperations.delete(strPath);
			let result;
			try {
				result = this._syncProvider.call(this._providerContext, path);
			} catch (err) {
				this._storeResult(strPath, err, void 0);
				this._enterSyncModeWhenIdle();
				if (callbacks) runCallbacks(callbacks, err, void 0);
				throw err;
			}
			this._storeResult(strPath, null, result);
			this._enterSyncModeWhenIdle();
			if (callbacks) runCallbacks(callbacks, null, result);
			return result;
		}
		purge(what) {
			if (!what) {
				if (this._mode !== STORAGE_MODE_IDLE) {
					this._data.clear();
					for (const level of this._levels) level.clear();
					this._enterIdleMode();
				}
			} else if (typeof what === "string" || Buffer.isBuffer(what) || what instanceof URL || typeof what === "number") {
				const strWhat = typeof what !== "string" ? what.toString() : what;
				for (const [key, data] of this._data) if (key.startsWith(strWhat)) {
					this._data.delete(key);
					data.level.delete(key);
				}
				if (this._data.size === 0) this._enterIdleMode();
			} else {
				for (const [key, data] of this._data) for (const item of what) {
					const strItem = typeof item !== "string" ? item.toString() : item;
					if (key.startsWith(strItem)) {
						this._data.delete(key);
						data.level.delete(key);
						break;
					}
				}
				if (this._data.size === 0) this._enterIdleMode();
			}
		}
		purgeParent(what) {
			if (!what) this.purge();
			else if (typeof what === "string" || Buffer.isBuffer(what) || what instanceof URL || typeof what === "number") {
				const strWhat = typeof what !== "string" ? what.toString() : what;
				this.purge(dirname(strWhat));
			} else {
				const set = /* @__PURE__ */ new Set();
				for (const item of what) {
					const strItem = typeof item !== "string" ? item.toString() : item;
					set.add(dirname(strItem));
				}
				this.purge(set);
			}
		}
		_storeResult(path, err, result) {
			if (this._data.has(path)) return;
			const level = this._levels[this._currentLevel];
			this._data.set(path, {
				err,
				result,
				level
			});
			level.add(path);
		}
		_decayLevel() {
			const nextLevel = (this._currentLevel + 1) % this._levels.length;
			const decay = this._levels[nextLevel];
			this._currentLevel = nextLevel;
			for (const item of decay) this._data.delete(item);
			decay.clear();
			if (this._data.size === 0) this._enterIdleMode();
			else this._nextDecay += this._tickInterval;
		}
		_runDecays() {
			while (this._nextDecay <= Date.now() && this._mode !== STORAGE_MODE_IDLE) this._decayLevel();
		}
		_enterAsyncMode() {
			let timeout = 0;
			switch (this._mode) {
				case STORAGE_MODE_ASYNC: return;
				case STORAGE_MODE_IDLE:
					this._nextDecay = Date.now() + this._tickInterval;
					timeout = this._tickInterval;
					break;
				case STORAGE_MODE_SYNC:
					this._runDecays();
					if (this._mode === STORAGE_MODE_IDLE) return;
					timeout = Math.max(0, this._nextDecay - Date.now());
					break;
			}
			this._mode = STORAGE_MODE_ASYNC;
			const ref = setTimeout(() => {
				this._mode = STORAGE_MODE_SYNC;
				this._runDecays();
			}, timeout);
			if (ref.unref) ref.unref();
			this._timeout = ref;
		}
		_enterSyncModeWhenIdle() {
			if (this._mode === STORAGE_MODE_IDLE) {
				this._mode = STORAGE_MODE_SYNC;
				this._nextDecay = Date.now() + this._tickInterval;
			}
		}
		_enterIdleMode() {
			this._mode = STORAGE_MODE_IDLE;
			this._nextDecay = void 0;
			if (this._timeout) clearTimeout(this._timeout);
		}
	};
	const createBackend = (duration, provider, syncProvider, providerContext) => {
		if (duration > 0) return new CacheBackend(duration, provider, syncProvider, providerContext);
		return new OperationMergerBackend(provider, syncProvider, providerContext);
	};
	module.exports = class CachedInputFileSystem {
		constructor(fileSystem, duration) {
			this.fileSystem = fileSystem;
			this._lstatBackend = createBackend(duration, this.fileSystem.lstat, this.fileSystem.lstatSync, this.fileSystem);
			this.lstat = this._lstatBackend.provide;
			this.lstatSync = this._lstatBackend.provideSync;
			this._statBackend = createBackend(duration, this.fileSystem.stat, this.fileSystem.statSync, this.fileSystem);
			this.stat = this._statBackend.provide;
			this.statSync = this._statBackend.provideSync;
			this._readdirBackend = createBackend(duration, this.fileSystem.readdir, this.fileSystem.readdirSync, this.fileSystem);
			this.readdir = this._readdirBackend.provide;
			this.readdirSync = this._readdirBackend.provideSync;
			this._readFileBackend = createBackend(duration, this.fileSystem.readFile, this.fileSystem.readFileSync, this.fileSystem);
			this.readFile = this._readFileBackend.provide;
			this.readFileSync = this._readFileBackend.provideSync;
			this._readJsonBackend = createBackend(duration, this.fileSystem.readJson || this.readFile && ((path, callback) => {
				this.readFile(path, (err, buffer) => {
					if (err) return callback(err);
					if (!buffer || buffer.length === 0) return callback(/* @__PURE__ */ new Error("No file content"));
					let data;
					try {
						data = JSON.parse(buffer.toString("utf8"));
					} catch (err_) {
						return callback(err_);
					}
					callback(null, data);
				});
			}), this.fileSystem.readJsonSync || this.readFileSync && ((path) => {
				const buffer = this.readFileSync(path);
				return JSON.parse(buffer.toString("utf8"));
			}), this.fileSystem);
			this.readJson = this._readJsonBackend.provide;
			this.readJsonSync = this._readJsonBackend.provideSync;
			this._readlinkBackend = createBackend(duration, this.fileSystem.readlink, this.fileSystem.readlinkSync, this.fileSystem);
			this.readlink = this._readlinkBackend.provide;
			this.readlinkSync = this._readlinkBackend.provideSync;
			this._realpathBackend = createBackend(duration, this.fileSystem.realpath, this.fileSystem.realpathSync, this.fileSystem);
			this.realpath = this._realpathBackend.provide;
			this.realpathSync = this._realpathBackend.provideSync;
		}
		purge(what) {
			this._statBackend.purge(what);
			this._lstatBackend.purge(what);
			this._readdirBackend.purgeParent(what);
			this._readFileBackend.purge(what);
			this._readlinkBackend.purge(what);
			this._readJsonBackend.purge(what);
			this._realpathBackend.purge(what);
		}
	};
}));
var require_polyfills = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = __require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch;
	function patch(fs) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs);
		if (!fs.lutimes) patchLutimes(fs);
		fs.chown = chownFix(fs.chown);
		fs.fchown = chownFix(fs.fchown);
		fs.lchown = chownFix(fs.lchown);
		fs.chmod = chmodFix(fs.chmod);
		fs.fchmod = chmodFix(fs.fchmod);
		fs.lchmod = chmodFix(fs.lchmod);
		fs.chownSync = chownFixSync(fs.chownSync);
		fs.fchownSync = chownFixSync(fs.fchownSync);
		fs.lchownSync = chownFixSync(fs.lchownSync);
		fs.chmodSync = chmodFixSync(fs.chmodSync);
		fs.fchmodSync = chmodFixSync(fs.fchmodSync);
		fs.lchmodSync = chmodFixSync(fs.lchmodSync);
		fs.stat = statFix(fs.stat);
		fs.fstat = statFix(fs.fstat);
		fs.lstat = statFix(fs.lstat);
		fs.statSync = statFixSync(fs.statSync);
		fs.fstatSync = statFixSync(fs.fstatSync);
		fs.lstatSync = statFixSync(fs.lstatSync);
		if (fs.chmod && !fs.lchmod) {
			fs.lchmod = function(path, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchmodSync = function() {};
		}
		if (fs.chown && !fs.lchown) {
			fs.lchown = function(path, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchownSync = function() {};
		}
		if (platform === "win32") fs.rename = typeof fs.rename !== "function" ? fs.rename : (function(fs$rename) {
			function rename(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
			return rename;
		})(fs.rename);
		fs.read = typeof fs.read !== "function" ? fs.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs.read);
		fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs.readSync);
		function patchLchmod(fs) {
			fs.lchmod = function(path, mode, callback) {
				fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs.fchmod(fd, mode, function(err) {
						fs.close(fd, function(err2) {
							if (callback) callback(err || err2);
						});
					});
				});
			};
			fs.lchmodSync = function(path, mode) {
				var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs.closeSync(fd);
					} catch (er) {}
					else fs.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
				fs.lutimes = function(path, at, mt, cb) {
					fs.open(path, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs.futimes(fd, at, mt, function(er) {
							fs.close(fd, function(er2) {
								if (cb) cb(er || er2);
							});
						});
					});
				};
				fs.lutimesSync = function(path, at, mt) {
					var fd = fs.openSync(path, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs.closeSync(fd);
						} catch (er) {}
						else fs.closeSync(fd);
					}
					return ret;
				};
			} else if (fs.futimes) {
				fs.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
var require_legacy_streams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = __require("stream").Stream;
	module.exports = legacy;
	function legacy(fs) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path, options);
			Stream.call(this);
			var self = this;
			this.path = path;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 64 * 1024;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path, options);
			Stream.call(this);
			this.path = path;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = clone;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy = { __proto__: getPrototypeOf(obj) };
		else var copy = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy;
	}
}));
var require_graceful_fs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$1 = __require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$1 = __require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue;
		} });
	}
	var debug = noop;
	if (util$1.debuglog) debug = util$1.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m = util$1.format.apply(util$1, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs$1[gracefulQueue]) {
		publishQueue(fs$1, global[gracefulQueue] || []);
		fs$1.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$1, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs$1.close);
		fs$1.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$1, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs$1.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs$1[gracefulQueue]);
			__require("assert").equal(fs$1[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$1[gracefulQueue]);
	module.exports = patch(clone(fs$1));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$1.__patched) {
		module.exports = patch(fs$1);
		fs$1.__patched = true;
	}
	function patch(fs) {
		polyfills(fs);
		fs.gracefulify = patch;
		fs.createReadStream = createReadStream;
		fs.createWriteStream = createWriteStream;
		var fs$readFile = fs.readFile;
		fs.readFile = readFile;
		function readFile(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path, options, cb);
			function go$readFile(path, options, cb, startTime) {
				return fs$readFile(path, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs.writeFile;
		fs.writeFile = writeFile;
		function writeFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path, data, options, cb);
			function go$writeFile(path, data, options, cb, startTime) {
				return fs$writeFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs.appendFile;
		if (fs$appendFile) fs.appendFile = appendFile;
		function appendFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path, data, options, cb);
			function go$appendFile(path, data, options, cb, startTime) {
				return fs$appendFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs.copyFile;
		if (fs$copyFile) fs.copyFile = copyFile;
		function copyFile(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src, dest, flags, cb, startTime) {
				return fs$copyFile(src, dest, flags, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src,
							dest,
							flags,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs.readdir;
		fs.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
			} : function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
			};
			return go$readdir(path, options, cb);
			function fs$readdirCallback(path, options, cb, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb === "function") cb.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream(path, options) {
			return new fs.ReadStream(path, options);
		}
		function createWriteStream(path, options) {
			return new fs.WriteStream(path, options);
		}
		var fs$open = fs.open;
		fs.open = open;
		function open(path, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path, flags, mode, cb);
			function go$open(path, flags, mode, cb, startTime) {
				return fs$open(path, flags, mode, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path,
							flags,
							mode,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		return fs;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs$1[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i = 0; i < fs$1[gracefulQueue].length; ++i) if (fs$1[gracefulQueue][i].length > 2) {
			fs$1[gracefulQueue][i][3] = now;
			fs$1[gracefulQueue][i][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$1[gracefulQueue].length === 0) return;
		var elem = fs$1[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			if (sinceAttempt >= Math.min(sinceStart * 1.2, 100)) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$1[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
}));
var require_forEachBail = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function forEachBail(array, iterator, callback) {
		if (array.length === 0) return callback();
		let i = 0;
		const next = () => {
			let loop;
			iterator(array[i++], (err, result) => {
				if (err || result !== void 0 || i >= array.length) return callback(err, result, i);
				if (loop === false) while (next());
				loop = true;
			}, i);
			if (!loop) loop = false;
			return loop;
		};
		while (next());
	};
}));
var require_DescriptionFileUtils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	function cdUp(directory) {
		if (directory === "/") return null;
		const i = directory.lastIndexOf("/");
		const j = directory.lastIndexOf("\\");
		const path = i < 0 ? j : j < 0 ? i : i < j ? j : i;
		if (path < 0) return null;
		return directory.slice(0, path || 1);
	}
	function loadDescriptionFile(resolver, directory, filenames, oldInfo, resolveContext, callback) {
		(function findDescriptionFile() {
			if (oldInfo && oldInfo.directory === directory) return callback(null, oldInfo);
			forEachBail(filenames, (filename, callback) => {
				const descriptionFilePath = resolver.join(directory, filename);
				function onJson(err, resolvedContent) {
					if (err) {
						if (resolveContext.log) resolveContext.log(`${descriptionFilePath} (directory description file): ${err}`);
						else err.message = `${descriptionFilePath} (directory description file): ${err}`;
						return callback(err);
					}
					callback(null, {
						content: resolvedContent,
						directory,
						path: descriptionFilePath
					});
				}
				if (resolver.fileSystem.readJson) resolver.fileSystem.readJson(descriptionFilePath, (err, content) => {
					if (err) {
						if (typeof err.code !== "undefined") {
							if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(descriptionFilePath);
							return callback();
						}
						if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(descriptionFilePath);
						return onJson(err);
					}
					if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(descriptionFilePath);
					onJson(null, content);
				});
				else resolver.fileSystem.readFile(descriptionFilePath, (err, content) => {
					if (err) {
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(descriptionFilePath);
						return callback();
					}
					if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(descriptionFilePath);
					let json;
					if (content) try {
						json = JSON.parse(content.toString());
					} catch (err_) {
						return onJson(err_);
					}
					else return onJson(/* @__PURE__ */ new Error("No content in file"));
					onJson(null, json);
				});
			}, (err, result) => {
				if (err) return callback(err);
				if (result) return callback(null, result);
				const dir = cdUp(directory);
				if (!dir) return callback();
				directory = dir;
				return findDescriptionFile();
			});
		})();
	}
	function getField(content, field) {
		if (!content) return void 0;
		if (Array.isArray(field)) {
			let current = content;
			for (let j = 0; j < field.length; j++) {
				if (current === null || typeof current !== "object") {
					current = null;
					break;
				}
				current = current[field[j]];
			}
			return current;
		}
		return content[field];
	}
	module.exports.cdUp = cdUp;
	module.exports.getField = getField;
	module.exports.loadDescriptionFile = loadDescriptionFile;
}));
var require_getInnerRequest = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function getInnerRequest(resolver, request) {
		if (typeof request.__innerRequest === "string" && request.__innerRequest_request === request.request && request.__innerRequest_relativePath === request.relativePath) return request.__innerRequest;
		let innerRequest;
		if (request.request) {
			innerRequest = request.request;
			if (/^\.\.?(?:\/|$)/.test(innerRequest) && request.relativePath) innerRequest = resolver.join(request.relativePath, innerRequest);
		} else innerRequest = request.relativePath;
		request.__innerRequest_request = request.request;
		request.__innerRequest_relativePath = request.relativePath;
		return request.__innerRequest = innerRequest;
	};
}));
var require_AliasFieldPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DescriptionFileUtils = require_DescriptionFileUtils();
	const getInnerRequest = require_getInnerRequest();
	module.exports = class AliasFieldPlugin {
		constructor(source, field, target) {
			this.source = source;
			this.field = field;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("AliasFieldPlugin", (request, resolveContext, callback) => {
				if (!request.descriptionFileData) return callback();
				const innerRequest = getInnerRequest(resolver, request);
				if (!innerRequest) return callback();
				const fieldData = DescriptionFileUtils.getField(request.descriptionFileData, this.field);
				if (fieldData === null || typeof fieldData !== "object") {
					if (resolveContext.log) resolveContext.log(`Field '${this.field}' doesn't contain a valid alias configuration`);
					return callback();
				}
				const data = Object.prototype.hasOwnProperty.call(fieldData, innerRequest) ? fieldData[innerRequest] : innerRequest.startsWith("./") ? fieldData[innerRequest.slice(2)] : void 0;
				if (data === innerRequest) return callback();
				if (data === void 0) return callback();
				if (data === false) {
					const ignoreObj = {
						...request,
						path: false
					};
					if (typeof resolveContext.yield === "function") {
						resolveContext.yield(ignoreObj);
						return callback(null, null);
					}
					return callback(null, ignoreObj);
				}
				const obj = {
					...request,
					path: request.descriptionFileRoot,
					request: data,
					fullySpecified: false
				};
				resolver.doResolve(target, obj, `aliased from description file ${request.descriptionFilePath} with mapping '${innerRequest}' to '${data}'`, resolveContext, (err, result) => {
					if (err) return callback(err);
					if (result === void 0) return callback(null, null);
					callback(null, result);
				});
			});
		}
	};
}));
var require_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$1 = __require("path");
	const CHAR_HASH = "#".charCodeAt(0);
	const CHAR_SLASH = "/".charCodeAt(0);
	const CHAR_BACKSLASH = "\\".charCodeAt(0);
	const CHAR_A = "A".charCodeAt(0);
	const CHAR_Z = "Z".charCodeAt(0);
	const CHAR_LOWER_A = "a".charCodeAt(0);
	const CHAR_LOWER_Z = "z".charCodeAt(0);
	const CHAR_DOT = ".".charCodeAt(0);
	const CHAR_COLON = ":".charCodeAt(0);
	const posixNormalize = path$1.posix.normalize;
	const winNormalize = path$1.win32.normalize;
	const PathType = Object.freeze({
		Empty: 0,
		Normal: 1,
		Relative: 2,
		AbsoluteWin: 3,
		AbsolutePosix: 4,
		Internal: 5
	});
	const deprecatedInvalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
	const invalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))?(\\|\/|$)/i;
	const getType = (maybePath) => {
		switch (maybePath.length) {
			case 0: return PathType.Empty;
			case 1:
				switch (maybePath.charCodeAt(0)) {
					case CHAR_DOT: return PathType.Relative;
					case CHAR_SLASH: return PathType.AbsolutePosix;
					case CHAR_HASH: return PathType.Internal;
				}
				return PathType.Normal;
			case 2: {
				const c0 = maybePath.charCodeAt(0);
				switch (c0) {
					case CHAR_DOT:
						switch (maybePath.charCodeAt(1)) {
							case CHAR_DOT:
							case CHAR_SLASH: return PathType.Relative;
						}
						return PathType.Normal;
					case CHAR_SLASH: return PathType.AbsolutePosix;
					case CHAR_HASH: return PathType.Internal;
				}
				if (maybePath.charCodeAt(1) === CHAR_COLON && (c0 >= CHAR_A && c0 <= CHAR_Z || c0 >= CHAR_LOWER_A && c0 <= CHAR_LOWER_Z)) return PathType.AbsoluteWin;
				return PathType.Normal;
			}
		}
		const c0 = maybePath.charCodeAt(0);
		switch (c0) {
			case CHAR_DOT:
				switch (maybePath.charCodeAt(1)) {
					case CHAR_SLASH: return PathType.Relative;
					case CHAR_DOT:
						if (maybePath.charCodeAt(2) === CHAR_SLASH) return PathType.Relative;
						return PathType.Normal;
				}
				return PathType.Normal;
			case CHAR_SLASH: return PathType.AbsolutePosix;
			case CHAR_HASH: return PathType.Internal;
		}
		if (maybePath.charCodeAt(1) === CHAR_COLON) {
			const c2 = maybePath.charCodeAt(2);
			if ((c2 === CHAR_BACKSLASH || c2 === CHAR_SLASH) && (c0 >= CHAR_A && c0 <= CHAR_Z || c0 >= CHAR_LOWER_A && c0 <= CHAR_LOWER_Z)) return PathType.AbsoluteWin;
		}
		return PathType.Normal;
	};
	const normalize = (maybePath) => {
		switch (getType(maybePath)) {
			case PathType.Empty: return maybePath;
			case PathType.AbsoluteWin: return winNormalize(maybePath);
			case PathType.Relative: {
				const r = posixNormalize(maybePath);
				return getType(r) === PathType.Relative ? r : `./${r}`;
			}
		}
		return posixNormalize(maybePath);
	};
	const join = (rootPath, request) => {
		if (!request) return normalize(rootPath);
		const requestType = getType(request);
		switch (requestType) {
			case PathType.AbsolutePosix: return posixNormalize(request);
			case PathType.AbsoluteWin: return winNormalize(request);
		}
		switch (getType(rootPath)) {
			case PathType.Normal:
			case PathType.Relative:
			case PathType.AbsolutePosix: return posixNormalize(`${rootPath}/${request}`);
			case PathType.AbsoluteWin: return winNormalize(`${rootPath}\\${request}`);
		}
		switch (requestType) {
			case PathType.Empty: return rootPath;
			case PathType.Relative: {
				const r = posixNormalize(rootPath);
				return getType(r) === PathType.Relative ? r : `./${r}`;
			}
		}
		return posixNormalize(rootPath);
	};
	const joinCache = /* @__PURE__ */ new Map();
	const cachedJoin = (rootPath, request) => {
		let cacheEntry;
		let cache = joinCache.get(rootPath);
		if (cache === void 0) joinCache.set(rootPath, cache = /* @__PURE__ */ new Map());
		else {
			cacheEntry = cache.get(request);
			if (cacheEntry !== void 0) return cacheEntry;
		}
		cacheEntry = join(rootPath, request);
		cache.set(request, cacheEntry);
		return cacheEntry;
	};
	module.exports.PathType = PathType;
	module.exports.cachedJoin = cachedJoin;
	module.exports.deprecatedInvalidSegmentRegEx = deprecatedInvalidSegmentRegEx;
	module.exports.getType = getType;
	module.exports.invalidSegmentRegEx = invalidSegmentRegEx;
	module.exports.join = join;
	module.exports.normalize = normalize;
}));
var require_AliasPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	const { PathType, getType } = require_path();
	module.exports = class AliasPlugin {
		constructor(source, options, target) {
			this.source = source;
			this.options = Array.isArray(options) ? options : [options];
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const getAbsolutePathWithSlashEnding = (maybeAbsolutePath) => {
				const type = getType(maybeAbsolutePath);
				if (type === PathType.AbsolutePosix || type === PathType.AbsoluteWin) return resolver.join(maybeAbsolutePath, "_").slice(0, -1);
				return null;
			};
			const isSubPath = (path, maybeSubPath) => {
				const absolutePath = getAbsolutePathWithSlashEnding(maybeSubPath);
				if (!absolutePath) return false;
				return path.startsWith(absolutePath);
			};
			resolver.getHook(this.source).tapAsync("AliasPlugin", (request, resolveContext, callback) => {
				const innerRequest = request.request || request.path;
				if (!innerRequest) return callback();
				forEachBail(this.options, (item, callback) => {
					let shouldStop = false;
					const matchRequest = innerRequest === item.name || !item.onlyModule && (request.request ? innerRequest.startsWith(`${item.name}/`) : isSubPath(innerRequest, item.name));
					const splitName = item.name.split("*");
					const matchWildcard = !item.onlyModule && splitName.length === 2;
					if (matchRequest || matchWildcard) {
						const resolveWithAlias = (alias, callback) => {
							if (alias === false) {
								const ignoreObj = {
									...request,
									path: false
								};
								if (typeof resolveContext.yield === "function") {
									resolveContext.yield(ignoreObj);
									return callback(null, null);
								}
								return callback(null, ignoreObj);
							}
							let newRequestStr;
							const [prefix, suffix] = splitName;
							if (matchWildcard && innerRequest.startsWith(prefix) && innerRequest.endsWith(suffix)) {
								const match = innerRequest.slice(prefix.length, innerRequest.length - suffix.length);
								newRequestStr = alias.toString().replace("*", match);
							}
							if (matchRequest && innerRequest !== alias && !innerRequest.startsWith(`${alias}/`)) newRequestStr = alias + innerRequest.slice(item.name.length);
							if (newRequestStr !== void 0) {
								shouldStop = true;
								const obj = {
									...request,
									request: newRequestStr,
									fullySpecified: false
								};
								return resolver.doResolve(target, obj, `aliased with mapping '${item.name}': '${alias}' to '${newRequestStr}'`, resolveContext, (err, result) => {
									if (err) return callback(err);
									if (result) return callback(null, result);
									return callback();
								});
							}
							return callback();
						};
						const stoppingCallback = (err, result) => {
							if (err) return callback(err);
							if (result) return callback(null, result);
							if (shouldStop) return callback(null, null);
							return callback();
						};
						if (Array.isArray(item.alias)) return forEachBail(item.alias, resolveWithAlias, stoppingCallback);
						return resolveWithAlias(item.alias, stoppingCallback);
					}
					return callback();
				}, callback);
			});
		}
	};
}));
var require_AppendPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class AppendPlugin {
		constructor(source, appending, target) {
			this.source = source;
			this.appending = appending;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("AppendPlugin", (request, resolveContext, callback) => {
				const obj = {
					...request,
					path: request.path + this.appending,
					relativePath: request.relativePath && request.relativePath + this.appending
				};
				resolver.doResolve(target, obj, this.appending, resolveContext, callback);
			});
		}
	};
}));
var require_ConditionalPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class ConditionalPlugin {
		constructor(source, test, message, allowAlternatives, target) {
			this.source = source;
			this.test = test;
			this.message = message;
			this.allowAlternatives = allowAlternatives;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const { test, message, allowAlternatives } = this;
			const keys = Object.keys(test);
			resolver.getHook(this.source).tapAsync("ConditionalPlugin", (request, resolveContext, callback) => {
				for (const prop of keys) if (request[prop] !== test[prop]) return callback();
				resolver.doResolve(target, request, message, resolveContext, allowAlternatives ? callback : (err, result) => {
					if (err) return callback(err);
					if (result === void 0) return callback(null, null);
					callback(null, result);
				});
			});
		}
	};
}));
var require_DescriptionFilePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DescriptionFileUtils = require_DescriptionFileUtils();
	module.exports = class DescriptionFilePlugin {
		constructor(source, filenames, pathIsFile, target) {
			this.source = source;
			this.filenames = filenames;
			this.pathIsFile = pathIsFile;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("DescriptionFilePlugin", (request, resolveContext, callback) => {
				const { path } = request;
				if (!path) return callback();
				const directory = this.pathIsFile ? DescriptionFileUtils.cdUp(path) : path;
				if (!directory) return callback();
				DescriptionFileUtils.loadDescriptionFile(resolver, directory, this.filenames, request.descriptionFilePath ? {
					path: request.descriptionFilePath,
					content: request.descriptionFileData,
					directory: request.descriptionFileRoot
				} : void 0, resolveContext, (err, result) => {
					if (err) return callback(err);
					if (!result) {
						if (resolveContext.log) resolveContext.log(`No description file found in ${directory} or above`);
						return callback();
					}
					const relativePath = `.${path.slice(result.directory.length).replace(/\\/g, "/")}`;
					const obj = {
						...request,
						descriptionFilePath: result.path,
						descriptionFileData: result.content,
						descriptionFileRoot: result.directory,
						relativePath
					};
					resolver.doResolve(target, obj, `using description file: ${result.path} (relative path: ${relativePath})`, resolveContext, (err, result) => {
						if (err) return callback(err);
						if (result === void 0) return callback(null, null);
						callback(null, result);
					});
				});
			});
		}
	};
}));
var require_DirectoryExistsPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class DirectoryExistsPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("DirectoryExistsPlugin", (request, resolveContext, callback) => {
				const fs = resolver.fileSystem;
				const directory = request.path;
				if (!directory) return callback();
				fs.stat(directory, (err, stat) => {
					if (err || !stat) {
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(directory);
						if (resolveContext.log) resolveContext.log(`${directory} doesn't exist`);
						return callback();
					}
					if (!stat.isDirectory()) {
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(directory);
						if (resolveContext.log) resolveContext.log(`${directory} is not a directory`);
						return callback();
					}
					if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(directory);
					resolver.doResolve(target, request, `existing directory ${directory}`, resolveContext, callback);
				});
			});
		}
	};
}));
var require_identifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const getUrl = require_memoize()(() => __require("url"));
	const PATH_QUERY_FRAGMENT_REGEXP = /^(#?(?:\0.|[^?#\0])*)(\?(?:\0.|[^#\0])*)?(#.*)?$/;
	const ZERO_ESCAPE_REGEXP = /\0(.)/g;
	const FILE_REG_EXP = /file:/i;
	function parseIdentifier(identifier) {
		if (!identifier) return null;
		if (FILE_REG_EXP.test(identifier)) identifier = getUrl().fileURLToPath(identifier);
		if (identifier.indexOf("\0") !== -1) {
			const match = PATH_QUERY_FRAGMENT_REGEXP.exec(identifier);
			if (!match) return null;
			return [
				match[1].replace(ZERO_ESCAPE_REGEXP, "$1"),
				match[2] ? match[2].replace(ZERO_ESCAPE_REGEXP, "$1") : "",
				match[3] || ""
			];
		}
		const queryStart = identifier.indexOf("?");
		const fragmentStart = identifier.indexOf("#", 1);
		if (fragmentStart < 0) {
			if (queryStart < 0) return [
				identifier,
				"",
				""
			];
			return [
				identifier.slice(0, queryStart),
				identifier.slice(queryStart),
				""
			];
		}
		if (queryStart < 0 || fragmentStart < queryStart) return [
			identifier.slice(0, fragmentStart),
			"",
			identifier.slice(fragmentStart)
		];
		return [
			identifier.slice(0, queryStart),
			identifier.slice(queryStart, fragmentStart),
			identifier.slice(fragmentStart)
		];
	}
	module.exports.parseIdentifier = parseIdentifier;
}));
var require_entrypoints = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { parseIdentifier } = require_identifier();
	const slashCode = "/".charCodeAt(0);
	const dotCode = ".".charCodeAt(0);
	const hashCode = "#".charCodeAt(0);
	const patternRegEx = /\*/g;
	function patternKeyCompare(a, b) {
		const aPatternIndex = a.indexOf("*");
		const bPatternIndex = b.indexOf("*");
		const baseLenA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
		const baseLenB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
		if (baseLenA > baseLenB) return -1;
		if (baseLenB > baseLenA) return 1;
		if (aPatternIndex === -1) return 1;
		if (bPatternIndex === -1) return -1;
		if (a.length > b.length) return -1;
		if (b.length > a.length) return 1;
		return 0;
	}
	function findMatch(request, field) {
		if (Object.prototype.hasOwnProperty.call(field, request) && !request.includes("*") && !request.endsWith("/")) return [
			field[request],
			"",
			false,
			false,
			request
		];
		let bestMatch = "";
		let bestMatchSubpath;
		const keys = Object.getOwnPropertyNames(field);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const patternIndex = key.indexOf("*");
			if (patternIndex !== -1 && request.startsWith(key.slice(0, patternIndex))) {
				const patternTrailer = key.slice(patternIndex + 1);
				if (request.length >= key.length && request.endsWith(patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && key.lastIndexOf("*") === patternIndex) {
					bestMatch = key;
					bestMatchSubpath = request.slice(patternIndex, request.length - patternTrailer.length);
				}
			} else if (key[key.length - 1] === "/" && request.startsWith(key) && patternKeyCompare(bestMatch, key) === 1) {
				bestMatch = key;
				bestMatchSubpath = request.slice(key.length);
			}
		}
		if (bestMatch === "") return null;
		const target = field[bestMatch];
		const isSubpathMapping = bestMatch.endsWith("/");
		const isPattern = bestMatch.includes("*");
		return [
			target,
			bestMatchSubpath,
			isSubpathMapping,
			isPattern,
			bestMatch
		];
	}
	function isConditionalMapping(mapping) {
		return mapping !== null && typeof mapping === "object" && !Array.isArray(mapping);
	}
	function conditionalMapping(conditionalMapping_, conditionNames) {
		const lookup = [[
			conditionalMapping_,
			Object.keys(conditionalMapping_),
			0
		]];
		loop: while (lookup.length > 0) {
			const [mapping, conditions, j] = lookup[lookup.length - 1];
			for (let i = j; i < conditions.length; i++) {
				const condition = conditions[i];
				if (condition === "default") {
					const innerMapping = mapping[condition];
					if (isConditionalMapping(innerMapping)) {
						const conditionalMapping = innerMapping;
						lookup[lookup.length - 1][2] = i + 1;
						lookup.push([
							conditionalMapping,
							Object.keys(conditionalMapping),
							0
						]);
						continue loop;
					}
					return innerMapping;
				}
				if (conditionNames.has(condition)) {
					const innerMapping = mapping[condition];
					if (isConditionalMapping(innerMapping)) {
						const conditionalMapping = innerMapping;
						lookup[lookup.length - 1][2] = i + 1;
						lookup.push([
							conditionalMapping,
							Object.keys(conditionalMapping),
							0
						]);
						continue loop;
					}
					return innerMapping;
				}
			}
			lookup.pop();
		}
		return null;
	}
	function targetMapping(remainingRequest, isPattern, isSubpathMapping, mappingTarget, assert) {
		if (remainingRequest === void 0) {
			assert(mappingTarget, false);
			return mappingTarget;
		}
		if (isSubpathMapping) {
			assert(mappingTarget, true);
			return mappingTarget + remainingRequest;
		}
		assert(mappingTarget, false);
		let result = mappingTarget;
		if (isPattern) result = result.replace(patternRegEx, remainingRequest.replace(/\$/g, "$$"));
		return result;
	}
	function directMapping(remainingRequest, isPattern, isSubpathMapping, mappingTarget, conditionNames, assert) {
		if (mappingTarget === null) return [];
		if (typeof mappingTarget === "string") return [targetMapping(remainingRequest, isPattern, isSubpathMapping, mappingTarget, assert)];
		const targets = [];
		for (const exp of mappingTarget) {
			if (typeof exp === "string") {
				targets.push(targetMapping(remainingRequest, isPattern, isSubpathMapping, exp, assert));
				continue;
			}
			const mapping = conditionalMapping(exp, conditionNames);
			if (!mapping) continue;
			const innerExports = directMapping(remainingRequest, isPattern, isSubpathMapping, mapping, conditionNames, assert);
			for (const innerExport of innerExports) targets.push(innerExport);
		}
		return targets;
	}
	function createFieldProcessor(field, normalizeRequest, assertRequest, assertTarget) {
		return function fieldProcessor(request, conditionNames) {
			request = assertRequest(request);
			const match = findMatch(normalizeRequest(request), field);
			if (match === null) return [[], null];
			const [mapping, remainingRequest, isSubpathMapping, isPattern, usedField] = match;
			let direct = null;
			if (isConditionalMapping(mapping)) {
				direct = conditionalMapping(mapping, conditionNames);
				if (direct === null) return [[], null];
			} else direct = mapping;
			return [directMapping(remainingRequest, isPattern, isSubpathMapping, direct, conditionNames, assertTarget), usedField];
		};
	}
	function assertExportsFieldRequest(request) {
		if (request.charCodeAt(0) !== dotCode) throw new Error("Request should be relative path and start with \".\"");
		if (request.length === 1) return "";
		if (request.charCodeAt(1) !== slashCode) throw new Error("Request should be relative path and start with \"./\"");
		if (request.charCodeAt(request.length - 1) === slashCode) throw new Error("Only requesting file allowed");
		return request.slice(2);
	}
	function buildExportsField(field) {
		if (typeof field === "string" || Array.isArray(field)) return { ".": field };
		const keys = Object.keys(field);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (key.charCodeAt(0) !== dotCode) {
				if (i === 0) {
					while (i < keys.length) {
						const charCode = keys[i].charCodeAt(0);
						if (charCode === dotCode || charCode === slashCode) throw new Error(`Exports field key should be relative path and start with "." (key: ${JSON.stringify(key)})`);
						i++;
					}
					return { ".": field };
				}
				throw new Error(`Exports field key should be relative path and start with "." (key: ${JSON.stringify(key)})`);
			}
			if (key.length === 1) continue;
			if (key.charCodeAt(1) !== slashCode) throw new Error(`Exports field key should be relative path and start with "./" (key: ${JSON.stringify(key)})`);
		}
		return field;
	}
	function assertExportTarget(exp, expectFolder) {
		const parsedIdentifier = parseIdentifier(exp);
		if (!parsedIdentifier) return;
		const [relativePath] = parsedIdentifier;
		if (relativePath.charCodeAt(relativePath.length - 1) === slashCode !== expectFolder) throw new Error(expectFolder ? `Expecting folder to folder mapping. ${JSON.stringify(exp)} should end with "/"` : `Expecting file to file mapping. ${JSON.stringify(exp)} should not end with "/"`);
	}
	module.exports.processExportsField = function processExportsField(exportsField) {
		return createFieldProcessor(buildExportsField(exportsField), (request) => request.length === 0 ? "." : `./${request}`, assertExportsFieldRequest, assertExportTarget);
	};
	function assertImportsFieldRequest(request) {
		if (request.charCodeAt(0) !== hashCode) throw new Error("Request should start with \"#\"");
		if (request.length === 1) throw new Error("Request should have at least 2 characters");
		if (request.charCodeAt(request.length - 1) === slashCode) throw new Error("Only requesting file allowed");
		return request.slice(1);
	}
	function assertImportTarget(imp, expectFolder) {
		const parsedIdentifier = parseIdentifier(imp);
		if (!parsedIdentifier) return;
		const [relativePath] = parsedIdentifier;
		if (relativePath.charCodeAt(relativePath.length - 1) === slashCode !== expectFolder) throw new Error(expectFolder ? `Expecting folder to folder mapping. ${JSON.stringify(imp)} should end with "/"` : `Expecting file to file mapping. ${JSON.stringify(imp)} should not end with "/"`);
	}
	module.exports.processImportsField = function processImportsField(importsField) {
		return createFieldProcessor(importsField, (request) => `#${request}`, assertImportsFieldRequest, assertImportTarget);
	};
}));
var require_ExportsFieldPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DescriptionFileUtils = require_DescriptionFileUtils();
	const forEachBail = require_forEachBail();
	const { processExportsField } = require_entrypoints();
	const { parseIdentifier } = require_identifier();
	const { deprecatedInvalidSegmentRegEx, invalidSegmentRegEx } = require_path();
	module.exports = class ExportsFieldPlugin {
		constructor(source, conditionNames, fieldNamePath, target) {
			this.source = source;
			this.target = target;
			this.conditionNames = conditionNames;
			this.fieldName = fieldNamePath;
			this.fieldProcessorCache = /* @__PURE__ */ new WeakMap();
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("ExportsFieldPlugin", (request, resolveContext, callback) => {
				if (!request.descriptionFilePath) return callback();
				if (request.relativePath !== "." || request.request === void 0) return callback();
				const remainingRequest = request.query || request.fragment ? (request.request === "." ? "./" : request.request) + request.query + request.fragment : request.request;
				const exportsField = DescriptionFileUtils.getField(request.descriptionFileData, this.fieldName);
				if (!exportsField) return callback();
				if (request.directory) return callback(/* @__PURE__ */ new Error(`Resolving to directories is not possible with the exports field (request was ${remainingRequest}/)`));
				let paths;
				let usedField;
				try {
					let fieldProcessor = this.fieldProcessorCache.get(request.descriptionFileData);
					if (fieldProcessor === void 0) {
						fieldProcessor = processExportsField(exportsField);
						this.fieldProcessorCache.set(request.descriptionFileData, fieldProcessor);
					}
					[paths, usedField] = fieldProcessor(remainingRequest, this.conditionNames);
				} catch (err) {
					if (resolveContext.log) resolveContext.log(`Exports field in ${request.descriptionFilePath} can't be processed: ${err}`);
					return callback(err);
				}
				if (paths.length === 0) {
					const conditions = [...this.conditionNames];
					const conditionsStr = conditions.length === 1 ? `the condition "${conditions[0]}"` : `the conditions ${JSON.stringify(conditions)}`;
					return callback(/* @__PURE__ */ new Error(`"${remainingRequest}" is not exported under ${conditionsStr} from package ${request.descriptionFileRoot} (see exports field in ${request.descriptionFilePath})`));
				}
				forEachBail(paths, (path, callback, i) => {
					const parsedIdentifier = parseIdentifier(path);
					if (!parsedIdentifier) return callback();
					const [relativePath, query, fragment] = parsedIdentifier;
					if (relativePath.length === 0 || !relativePath.startsWith("./")) {
						if (paths.length === i) return callback(/* @__PURE__ */ new Error(`Invalid "exports" target "${path}" defined for "${usedField}" in the package config ${request.descriptionFilePath}, targets must start with "./"`));
						return callback();
					}
					if (invalidSegmentRegEx.exec(relativePath.slice(2)) !== null && deprecatedInvalidSegmentRegEx.test(relativePath.slice(2))) {
						if (paths.length === i) return callback(/* @__PURE__ */ new Error(`Invalid "exports" target "${path}" defined for "${usedField}" in the package config ${request.descriptionFilePath}, targets must start with "./"`));
						return callback();
					}
					const obj = {
						...request,
						request: void 0,
						path: resolver.join(request.descriptionFileRoot, relativePath),
						relativePath,
						query,
						fragment
					};
					resolver.doResolve(target, obj, `using exports field: ${path}`, resolveContext, (err, result) => {
						if (err) return callback(err);
						if (result === void 0) return callback(null, null);
						callback(null, result);
					});
				}, (err, result) => callback(err, result || null));
			});
		}
	};
}));
var require_ExtensionAliasPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	module.exports = class ExtensionAliasPlugin {
		constructor(source, options, target) {
			this.source = source;
			this.options = options;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const { extension, alias } = this.options;
			resolver.getHook(this.source).tapAsync("ExtensionAliasPlugin", (request, resolveContext, callback) => {
				const requestPath = request.request;
				if (!requestPath || !requestPath.endsWith(extension)) return callback();
				const isAliasString = typeof alias === "string";
				const resolve = (alias, callback, index) => {
					const newRequest = `${requestPath.slice(0, -extension.length)}${alias}`;
					return resolver.doResolve(target, {
						...request,
						request: newRequest,
						fullySpecified: true
					}, `aliased from extension alias with mapping '${extension}' to '${alias}'`, resolveContext, (err, result) => {
						if (!isAliasString && index) {
							if (index !== this.options.alias.length) {
								if (resolveContext.log) resolveContext.log(`Failed to alias from extension alias with mapping '${extension}' to '${alias}' for '${newRequest}': ${err}`);
								return callback(null, result);
							}
							return callback(err, result);
						}
						callback(err, result);
					});
				};
				const stoppingCallback = (err, result) => {
					if (err) return callback(err);
					if (result) return callback(null, result);
					return callback(null, null);
				};
				if (isAliasString) resolve(alias, stoppingCallback);
				else if (alias.length > 1) forEachBail(alias, resolve, stoppingCallback);
				else resolve(alias[0], stoppingCallback);
			});
		}
	};
}));
var require_FileExistsPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class FileExistsPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const fs = resolver.fileSystem;
			resolver.getHook(this.source).tapAsync("FileExistsPlugin", (request, resolveContext, callback) => {
				const file = request.path;
				if (!file) return callback();
				fs.stat(file, (err, stat) => {
					if (err || !stat) {
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(file);
						if (resolveContext.log) resolveContext.log(`${file} doesn't exist`);
						return callback();
					}
					if (!stat.isFile()) {
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(file);
						if (resolveContext.log) resolveContext.log(`${file} is not a file`);
						return callback();
					}
					if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(file);
					resolver.doResolve(target, request, `existing file: ${file}`, resolveContext, callback);
				});
			});
		}
	};
}));
var require_ImportsFieldPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DescriptionFileUtils = require_DescriptionFileUtils();
	const forEachBail = require_forEachBail();
	const { processImportsField } = require_entrypoints();
	const { parseIdentifier } = require_identifier();
	const { deprecatedInvalidSegmentRegEx, invalidSegmentRegEx } = require_path();
	const dotCode = ".".charCodeAt(0);
	module.exports = class ImportsFieldPlugin {
		constructor(source, conditionNames, fieldNamePath, targetFile, targetPackage) {
			this.source = source;
			this.targetFile = targetFile;
			this.targetPackage = targetPackage;
			this.conditionNames = conditionNames;
			this.fieldName = fieldNamePath;
			this.fieldProcessorCache = /* @__PURE__ */ new WeakMap();
		}
		apply(resolver) {
			const targetFile = resolver.ensureHook(this.targetFile);
			const targetPackage = resolver.ensureHook(this.targetPackage);
			resolver.getHook(this.source).tapAsync("ImportsFieldPlugin", (request, resolveContext, callback) => {
				if (!request.descriptionFilePath || request.request === void 0) return callback();
				const remainingRequest = request.request + request.query + request.fragment;
				const importsField = DescriptionFileUtils.getField(request.descriptionFileData, this.fieldName);
				if (!importsField) return callback();
				if (request.directory) return callback(/* @__PURE__ */ new Error(`Resolving to directories is not possible with the imports field (request was ${remainingRequest}/)`));
				let paths;
				let usedField;
				try {
					let fieldProcessor = this.fieldProcessorCache.get(request.descriptionFileData);
					if (fieldProcessor === void 0) {
						fieldProcessor = processImportsField(importsField);
						this.fieldProcessorCache.set(request.descriptionFileData, fieldProcessor);
					}
					[paths, usedField] = fieldProcessor(remainingRequest, this.conditionNames);
				} catch (err) {
					if (resolveContext.log) resolveContext.log(`Imports field in ${request.descriptionFilePath} can't be processed: ${err}`);
					return callback(err);
				}
				if (paths.length === 0) return callback(/* @__PURE__ */ new Error(`Package import ${remainingRequest} is not imported from package ${request.descriptionFileRoot} (see imports field in ${request.descriptionFilePath})`));
				forEachBail(paths, (path, callback, i) => {
					const parsedIdentifier = parseIdentifier(path);
					if (!parsedIdentifier) return callback();
					const [path_, query, fragment] = parsedIdentifier;
					switch (path_.charCodeAt(0)) {
						case dotCode: {
							if (invalidSegmentRegEx.exec(path_.slice(2)) !== null && deprecatedInvalidSegmentRegEx.test(path_.slice(2)) !== null) {
								if (paths.length === i) return callback(/* @__PURE__ */ new Error(`Invalid "imports" target "${path}" defined for "${usedField}" in the package config ${request.descriptionFilePath}, targets must start with "./"`));
								return callback();
							}
							const obj = {
								...request,
								request: void 0,
								path: resolver.join(request.descriptionFileRoot, path_),
								relativePath: path_,
								query,
								fragment
							};
							resolver.doResolve(targetFile, obj, `using imports field: ${path}`, resolveContext, (err, result) => {
								if (err) return callback(err);
								if (result === void 0) return callback(null, null);
								callback(null, result);
							});
							break;
						}
						default: {
							const obj = {
								...request,
								request: path_,
								relativePath: path_,
								fullySpecified: true,
								query,
								fragment
							};
							resolver.doResolve(targetPackage, obj, `using imports field: ${path}`, resolveContext, (err, result) => {
								if (err) return callback(err);
								if (result === void 0) return callback(null, null);
								callback(null, result);
							});
						}
					}
				}, (err, result) => callback(err, result || null));
			});
		}
	};
}));
var require_JoinRequestPartPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const namespaceStartCharCode = "@".charCodeAt(0);
	module.exports = class JoinRequestPartPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("JoinRequestPartPlugin", (request, resolveContext, callback) => {
				const req = request.request || "";
				let i = req.indexOf("/", 3);
				if (i >= 0 && req.charCodeAt(2) === namespaceStartCharCode) i = req.indexOf("/", i + 1);
				let moduleName;
				let remainingRequest;
				let fullySpecified;
				if (i < 0) {
					moduleName = req;
					remainingRequest = ".";
					fullySpecified = false;
				} else {
					moduleName = req.slice(0, i);
					remainingRequest = `.${req.slice(i)}`;
					fullySpecified = request.fullySpecified;
				}
				const obj = {
					...request,
					path: resolver.join(request.path, moduleName),
					relativePath: request.relativePath && resolver.join(request.relativePath, moduleName),
					request: remainingRequest,
					fullySpecified
				};
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
		}
	};
}));
var require_JoinRequestPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class JoinRequestPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("JoinRequestPlugin", (request, resolveContext, callback) => {
				const requestPath = request.path;
				const requestRequest = request.request;
				const obj = {
					...request,
					path: resolver.join(requestPath, requestRequest),
					relativePath: request.relativePath && resolver.join(request.relativePath, requestRequest),
					request: void 0
				};
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
		}
	};
}));
var require_MainFieldPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path = __require("path");
	const DescriptionFileUtils = require_DescriptionFileUtils();
	const alreadyTriedMainField = Symbol("alreadyTriedMainField");
	module.exports = class MainFieldPlugin {
		constructor(source, options, target) {
			this.source = source;
			this.options = options;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("MainFieldPlugin", (request, resolveContext, callback) => {
				if (request.path !== request.descriptionFileRoot || request[alreadyTriedMainField] === request.descriptionFilePath || !request.descriptionFilePath) return callback();
				const filename = path.basename(request.descriptionFilePath);
				let mainModule = DescriptionFileUtils.getField(request.descriptionFileData, this.options.name);
				if (!mainModule || typeof mainModule !== "string" || mainModule === "." || mainModule === "./") return callback();
				if (this.options.forceRelative && !/^\.\.?\//.test(mainModule)) mainModule = `./${mainModule}`;
				const obj = {
					...request,
					request: mainModule,
					module: false,
					directory: mainModule.endsWith("/"),
					[alreadyTriedMainField]: request.descriptionFilePath
				};
				return resolver.doResolve(target, obj, `use ${mainModule} from ${this.options.name} in ${filename}`, resolveContext, callback);
			});
		}
	};
}));
var require_getPaths = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function getPaths(path) {
		if (path === "/") return {
			paths: ["/"],
			segments: [""]
		};
		const parts = path.split(/(.*?[\\/]+)/);
		const paths = [path];
		const segments = [parts[parts.length - 1]];
		let part = parts[parts.length - 1];
		path = path.slice(0, Math.max(0, path.length - part.length - 1));
		for (let i = parts.length - 2; i > 2; i -= 2) {
			paths.push(path);
			part = parts[i];
			path = path.slice(0, Math.max(0, path.length - part.length)) || "/";
			segments.push(part.slice(0, -1));
		}
		[, part] = parts;
		segments.push(part);
		paths.push(part);
		return {
			paths,
			segments
		};
	};
	module.exports.basename = function basename(path) {
		const i = path.lastIndexOf("/");
		const j = path.lastIndexOf("\\");
		const resolvedPath = i < 0 ? j : j < 0 ? i : i < j ? j : i;
		if (resolvedPath < 0) return null;
		return path.slice(resolvedPath + 1);
	};
}));
var require_ModulesInHierarchicalDirectoriesPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	const getPaths = require_getPaths();
	module.exports = class ModulesInHierarchicalDirectoriesPlugin {
		constructor(source, directories, target) {
			this.source = source;
			this.directories = [...directories];
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("ModulesInHierarchicalDirectoriesPlugin", (request, resolveContext, callback) => {
				const fs = resolver.fileSystem;
				forEachBail(getPaths(request.path).paths.map((path) => this.directories.map((directory) => resolver.join(path, directory))).reduce((array, path) => {
					array.push(...path);
					return array;
				}, []), (addr, callback) => {
					fs.stat(addr, (err, stat) => {
						if (!err && stat && stat.isDirectory()) {
							const obj = {
								...request,
								path: addr,
								request: `./${request.request}`,
								module: false
							};
							const message = `looking for modules in ${addr}`;
							return resolver.doResolve(target, obj, message, resolveContext, callback);
						}
						if (resolveContext.log) resolveContext.log(`${addr} doesn't exist or is not a directory`);
						if (resolveContext.missingDependencies) resolveContext.missingDependencies.add(addr);
						return callback();
					});
				}, callback);
			});
		}
	};
}));
var require_ModulesInRootPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class ModulesInRootPlugin {
		constructor(source, path, target) {
			this.source = source;
			this.path = path;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("ModulesInRootPlugin", (request, resolveContext, callback) => {
				const obj = {
					...request,
					path: this.path,
					request: `./${request.request}`,
					module: false
				};
				resolver.doResolve(target, obj, `looking for modules in ${this.path}`, resolveContext, callback);
			});
		}
	};
}));
var require_NextPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class NextPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("NextPlugin", (request, resolveContext, callback) => {
				resolver.doResolve(target, request, null, resolveContext, callback);
			});
		}
	};
}));
var require_ParsePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class ParsePlugin {
		constructor(source, requestOptions, target) {
			this.source = source;
			this.requestOptions = requestOptions;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("ParsePlugin", (request, resolveContext, callback) => {
				const parsed = resolver.parse(request.request);
				const obj = {
					...request,
					...parsed,
					...this.requestOptions
				};
				if (request.query && !parsed.query) obj.query = request.query;
				if (request.fragment && !parsed.fragment) obj.fragment = request.fragment;
				if (parsed && resolveContext.log) {
					if (parsed.module) resolveContext.log("Parsed request is a module");
					if (parsed.directory) resolveContext.log("Parsed request is a directory");
				}
				if (obj.request && !obj.query && obj.fragment) {
					const directory = obj.fragment.endsWith("/");
					const alternative = {
						...obj,
						directory,
						request: obj.request + (obj.directory ? "/" : "") + (directory ? obj.fragment.slice(0, -1) : obj.fragment),
						fragment: ""
					};
					resolver.doResolve(target, alternative, null, resolveContext, (err, result) => {
						if (err) return callback(err);
						if (result) return callback(null, result);
						resolver.doResolve(target, obj, null, resolveContext, callback);
					});
					return;
				}
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
		}
	};
}));
var require_PnpPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class PnpPlugin {
		constructor(source, pnpApi, target, alternateTarget) {
			this.source = source;
			this.pnpApi = pnpApi;
			this.target = target;
			this.alternateTarget = alternateTarget;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const alternateTarget = resolver.ensureHook(this.alternateTarget);
			resolver.getHook(this.source).tapAsync("PnpPlugin", (request, resolveContext, callback) => {
				const req = request.request;
				if (!req) return callback();
				const issuer = `${request.path}/`;
				const packageMatch = /^(@[^/]+\/)?[^/]+/.exec(req);
				if (!packageMatch) return callback();
				const [packageName] = packageMatch;
				const innerRequest = `.${req.slice(packageName.length)}`;
				let resolution;
				let apiResolution;
				try {
					resolution = this.pnpApi.resolveToUnqualified(packageName, issuer, { considerBuiltins: false });
					if (resolution === null) {
						resolver.doResolve(alternateTarget, request, "issuer is not managed by a pnpapi", resolveContext, (err, result) => {
							if (err) return callback(err);
							if (result) return callback(null, result);
							return callback(null, null);
						});
						return;
					}
					if (resolveContext.fileDependencies) apiResolution = this.pnpApi.resolveToUnqualified("pnpapi", issuer, { considerBuiltins: false });
				} catch (error) {
					if (error.code === "MODULE_NOT_FOUND" && error.pnpCode === "UNDECLARED_DEPENDENCY") {
						if (resolveContext.log) {
							resolveContext.log("request is not managed by the pnpapi");
							for (const line of error.message.split("\n").filter(Boolean)) resolveContext.log(`  ${line}`);
						}
						return callback();
					}
					return callback(error);
				}
				if (resolution === packageName) return callback();
				if (apiResolution && resolveContext.fileDependencies) resolveContext.fileDependencies.add(apiResolution);
				const obj = {
					...request,
					path: resolution,
					request: innerRequest,
					ignoreSymlinks: true,
					fullySpecified: request.fullySpecified && innerRequest !== "."
				};
				resolver.doResolve(target, obj, `resolved by pnp to ${resolution}`, resolveContext, (err, result) => {
					if (err) return callback(err);
					if (result) return callback(null, result);
					return callback(null, null);
				});
			});
		}
	};
}));
var require_Hook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const deprecateContext = __require("util").deprecate(() => {}, "Hook.context is deprecated and will be removed");
	function CALL_DELEGATE(...args) {
		this.call = this._createCall("sync");
		return this.call(...args);
	}
	function CALL_ASYNC_DELEGATE(...args) {
		this.callAsync = this._createCall("async");
		return this.callAsync(...args);
	}
	function PROMISE_DELEGATE(...args) {
		this.promise = this._createCall("promise");
		return this.promise(...args);
	}
	var Hook = class {
		constructor(args = [], name = void 0) {
			this._args = args;
			this.name = name;
			this.taps = [];
			this.interceptors = [];
			this._call = CALL_DELEGATE;
			this.call = CALL_DELEGATE;
			this._callAsync = CALL_ASYNC_DELEGATE;
			this.callAsync = CALL_ASYNC_DELEGATE;
			this._promise = PROMISE_DELEGATE;
			this.promise = PROMISE_DELEGATE;
			this._x = void 0;
			this.compile = this.compile;
			this.tap = this.tap;
			this.tapAsync = this.tapAsync;
			this.tapPromise = this.tapPromise;
		}
		compile(_options) {
			throw new Error("Abstract: should be overridden");
		}
		_createCall(type) {
			return this.compile({
				taps: this.taps,
				interceptors: this.interceptors,
				args: this._args,
				type
			});
		}
		_tap(type, options, fn) {
			if (typeof options === "string") options = { name: options.trim() };
			else if (typeof options !== "object" || options === null) throw new Error("Invalid tap options");
			if (typeof options.name !== "string" || options.name === "") throw new Error("Missing name for tap");
			if (typeof options.context !== "undefined") deprecateContext();
			options = Object.assign({
				type,
				fn
			}, options);
			options = this._runRegisterInterceptors(options);
			this._insert(options);
		}
		tap(options, fn) {
			this._tap("sync", options, fn);
		}
		tapAsync(options, fn) {
			this._tap("async", options, fn);
		}
		tapPromise(options, fn) {
			this._tap("promise", options, fn);
		}
		_runRegisterInterceptors(options) {
			for (const interceptor of this.interceptors) if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== void 0) options = newOptions;
			}
			return options;
		}
		withOptions(options) {
			const mergeOptions = (opt) => Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);
			return {
				name: this.name,
				tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
				tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
				tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
				intercept: (interceptor) => this.intercept(interceptor),
				isUsed: () => this.isUsed(),
				withOptions: (opt) => this.withOptions(mergeOptions(opt))
			};
		}
		isUsed() {
			return this.taps.length > 0 || this.interceptors.length > 0;
		}
		intercept(interceptor) {
			this._resetCompilation();
			this.interceptors.push(Object.assign({}, interceptor));
			if (interceptor.register) for (let i = 0; i < this.taps.length; i++) this.taps[i] = interceptor.register(this.taps[i]);
		}
		_resetCompilation() {
			this.call = this._call;
			this.callAsync = this._callAsync;
			this.promise = this._promise;
		}
		_insert(item) {
			this._resetCompilation();
			let before;
			if (typeof item.before === "string") before = new Set([item.before]);
			else if (Array.isArray(item.before)) before = new Set(item.before);
			let stage = 0;
			if (typeof item.stage === "number") stage = item.stage;
			let i = this.taps.length;
			while (i > 0) {
				i--;
				const tap = this.taps[i];
				this.taps[i + 1] = tap;
				const xStage = tap.stage || 0;
				if (before) {
					if (before.has(tap.name)) {
						before.delete(tap.name);
						continue;
					}
					if (before.size > 0) continue;
				}
				if (xStage > stage) continue;
				i++;
				break;
			}
			this.taps[i] = item;
		}
	};
	Object.setPrototypeOf(Hook.prototype, null);
	module.exports = Hook;
}));
var require_HookCodeFactory = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var HookCodeFactory = class {
		constructor(config) {
			this.config = config;
			this.options = void 0;
			this._args = void 0;
		}
		create(options) {
			this.init(options);
			let fn;
			switch (this.options.type) {
				case "sync":
					fn = new Function(this.args(), `"use strict";\n${this.header()}${this.contentWithInterceptors({
						onError: (err) => `throw ${err};\n`,
						onResult: (result) => `return ${result};\n`,
						resultReturns: true,
						onDone: () => "",
						rethrowIfPossible: true
					})}`);
					break;
				case "async":
					fn = new Function(this.args({ after: "_callback" }), `"use strict";\n${this.header()}${this.contentWithInterceptors({
						onError: (err) => `_callback(${err});\n`,
						onResult: (result) => `_callback(null, ${result});\n`,
						onDone: () => "_callback();\n"
					})}`);
					break;
				case "promise": {
					let errorHelperUsed = false;
					const content = this.contentWithInterceptors({
						onError: (err) => {
							errorHelperUsed = true;
							return `_error(${err});\n`;
						},
						onResult: (result) => `_resolve(${result});\n`,
						onDone: () => "_resolve();\n"
					});
					let code = "";
					code += "\"use strict\";\n";
					code += this.header();
					code += "return new Promise((function(_resolve, _reject) {\n";
					if (errorHelperUsed) {
						code += "var _sync = true;\n";
						code += "function _error(_err) {\n";
						code += "if(_sync)\n";
						code += "_resolve(Promise.resolve().then((function() { throw _err; })));\n";
						code += "else\n";
						code += "_reject(_err);\n";
						code += "};\n";
					}
					code += content;
					if (errorHelperUsed) code += "_sync = false;\n";
					code += "}));\n";
					fn = new Function(this.args(), code);
					break;
				}
			}
			this.deinit();
			return fn;
		}
		setup(instance, options) {
			instance._x = options.taps.map((t) => t.fn);
		}
		init(options) {
			this.options = options;
			this._args = [...options.args];
		}
		deinit() {
			this.options = void 0;
			this._args = void 0;
		}
		contentWithInterceptors(options) {
			if (this.options.interceptors.length > 0) {
				const { onError, onResult, onDone } = options;
				let code = "";
				for (let i = 0; i < this.options.interceptors.length; i++) {
					const interceptor = this.options.interceptors[i];
					if (interceptor.call) code += `${this.getInterceptor(i)}.call(${this.args({ before: interceptor.context ? "_context" : void 0 })});\n`;
				}
				code += this.content(Object.assign(options, {
					onError: onError && ((err) => {
						let code = "";
						for (let i = 0; i < this.options.interceptors.length; i++) if (this.options.interceptors[i].error) code += `${this.getInterceptor(i)}.error(${err});\n`;
						code += onError(err);
						return code;
					}),
					onResult: onResult && ((result) => {
						let code = "";
						for (let i = 0; i < this.options.interceptors.length; i++) if (this.options.interceptors[i].result) code += `${this.getInterceptor(i)}.result(${result});\n`;
						code += onResult(result);
						return code;
					}),
					onDone: onDone && (() => {
						let code = "";
						for (let i = 0; i < this.options.interceptors.length; i++) if (this.options.interceptors[i].done) code += `${this.getInterceptor(i)}.done();\n`;
						code += onDone();
						return code;
					})
				}));
				return code;
			}
			return this.content(options);
		}
		header() {
			let code = "";
			code += this.needContext() ? "var _context = {};\n" : "var _context;\n";
			code += "var _x = this._x;\n";
			if (this.options.interceptors.length > 0) {
				code += "var _taps = this.taps;\n";
				code += "var _interceptors = this.interceptors;\n";
			}
			return code;
		}
		needContext() {
			for (const tap of this.options.taps) if (tap.context) return true;
			return false;
		}
		callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
			let code = "";
			let hasTapCached = false;
			for (let i = 0; i < this.options.interceptors.length; i++) {
				const interceptor = this.options.interceptors[i];
				if (interceptor.tap) {
					if (!hasTapCached) {
						code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`;
						hasTapCached = true;
					}
					code += `${this.getInterceptor(i)}.tap(${interceptor.context ? "_context, " : ""}_tap${tapIndex});\n`;
				}
			}
			code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
			const tap = this.options.taps[tapIndex];
			switch (tap.type) {
				case "sync":
					if (!rethrowIfPossible) {
						code += `var _hasError${tapIndex} = false;\n`;
						code += "try {\n";
					}
					if (onResult) code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({ before: tap.context ? "_context" : void 0 })});\n`;
					else code += `_fn${tapIndex}(${this.args({ before: tap.context ? "_context" : void 0 })});\n`;
					if (!rethrowIfPossible) {
						code += "} catch(_err) {\n";
						code += `_hasError${tapIndex} = true;\n`;
						code += onError("_err");
						code += "}\n";
						code += `if(!_hasError${tapIndex}) {\n`;
					}
					if (onResult) code += onResult(`_result${tapIndex}`);
					if (onDone) code += onDone();
					if (!rethrowIfPossible) code += "}\n";
					break;
				case "async": {
					let cbCode = "";
					cbCode += onResult ? `(function(_err${tapIndex}, _result${tapIndex}) {\n` : `(function(_err${tapIndex}) {\n`;
					cbCode += `if(_err${tapIndex}) {\n`;
					cbCode += onError(`_err${tapIndex}`);
					cbCode += "} else {\n";
					if (onResult) cbCode += onResult(`_result${tapIndex}`);
					if (onDone) cbCode += onDone();
					cbCode += "}\n";
					cbCode += "})";
					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : void 0,
						after: cbCode
					})});\n`;
					break;
				}
				case "promise":
					code += `var _hasResult${tapIndex} = false;\n`;
					code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({ before: tap.context ? "_context" : void 0 })});\n`;
					code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`;
					code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`;
					code += `_promise${tapIndex}.then((function(_result${tapIndex}) {\n`;
					code += `_hasResult${tapIndex} = true;\n`;
					if (onResult) code += onResult(`_result${tapIndex}`);
					if (onDone) code += onDone();
					code += `}), function(_err${tapIndex}) {\n`;
					code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`;
					code += onError(`!_err${tapIndex} ? new Error('Tap function (tapPromise) rejects "' + _err${tapIndex} + '" value') : _err${tapIndex}`);
					code += "});\n";
					break;
			}
			return code;
		}
		callTapsSeries({ onError, onResult, resultReturns, onDone, doneReturns, rethrowIfPossible }) {
			if (this.options.taps.length === 0) return onDone();
			const firstAsync = this.options.taps.findIndex((t) => t.type !== "sync");
			const somethingReturns = resultReturns || doneReturns;
			let code = "";
			let current = onDone;
			let unrollCounter = 0;
			for (let j = this.options.taps.length - 1; j >= 0; j--) {
				const i = j;
				if (current !== onDone && (this.options.taps[i].type !== "sync" || unrollCounter++ > 20)) {
					unrollCounter = 0;
					code += `function _next${i}() {\n`;
					code += current();
					code += "}\n";
					current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`;
				}
				const done = current;
				const doneBreak = (skipDone) => {
					if (skipDone) return "";
					return onDone();
				};
				const content = this.callTap(i, {
					onError: (error) => onError(i, error, done, doneBreak),
					onResult: onResult && ((result) => onResult(i, result, done, doneBreak)),
					onDone: !onResult && done,
					rethrowIfPossible: rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
				});
				current = () => content;
			}
			code += current();
			return code;
		}
		callTapsLooping({ onError, onDone, rethrowIfPossible }) {
			if (this.options.taps.length === 0) return onDone();
			const syncOnly = this.options.taps.every((t) => t.type === "sync");
			let code = "";
			if (!syncOnly) {
				code += "var _looper = (function() {\n";
				code += "var _loopAsync = false;\n";
			}
			code += "var _loop;\n";
			code += "do {\n";
			code += "_loop = false;\n";
			for (let i = 0; i < this.options.interceptors.length; i++) {
				const interceptor = this.options.interceptors[i];
				if (interceptor.loop) code += `${this.getInterceptor(i)}.loop(${this.args({ before: interceptor.context ? "_context" : void 0 })});\n`;
			}
			code += this.callTapsSeries({
				onError,
				onResult: (i, result, next, doneBreak) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += "_loop = true;\n";
					if (!syncOnly) code += "if(_loopAsync) _looper();\n";
					code += doneBreak(true);
					code += "} else {\n";
					code += next();
					code += "}\n";
					return code;
				},
				onDone: onDone && (() => {
					let code = "";
					code += "if(!_loop) {\n";
					code += onDone();
					code += "}\n";
					return code;
				}),
				rethrowIfPossible: rethrowIfPossible && syncOnly
			});
			code += "} while(_loop);\n";
			if (!syncOnly) {
				code += "_loopAsync = true;\n";
				code += "});\n";
				code += "_looper();\n";
			}
			return code;
		}
		callTapsParallel({ onError, onResult, onDone, rethrowIfPossible, onTap = (i, run) => run() }) {
			if (this.options.taps.length <= 1) return this.callTapsSeries({
				onError,
				onResult,
				onDone,
				rethrowIfPossible
			});
			let code = "";
			code += "do {\n";
			code += `var _counter = ${this.options.taps.length};\n`;
			if (onDone) {
				code += "var _done = (function() {\n";
				code += onDone();
				code += "});\n";
			}
			for (let i = 0; i < this.options.taps.length; i++) {
				const done = () => {
					if (onDone) return "if(--_counter === 0) _done();\n";
					return "--_counter;";
				};
				const doneBreak = (skipDone) => {
					if (skipDone || !onDone) return "_counter = 0;\n";
					return "_counter = 0;\n_done();\n";
				};
				code += "if(_counter <= 0) break;\n";
				code += onTap(i, () => this.callTap(i, {
					onError: (error) => {
						let code = "";
						code += "if(_counter > 0) {\n";
						code += onError(i, error, done, doneBreak);
						code += "}\n";
						return code;
					},
					onResult: onResult && ((result) => {
						let code = "";
						code += "if(_counter > 0) {\n";
						code += onResult(i, result, done, doneBreak);
						code += "}\n";
						return code;
					}),
					onDone: !onResult && (() => done()),
					rethrowIfPossible
				}), done, doneBreak);
			}
			code += "} while(false);\n";
			return code;
		}
		args({ before, after } = {}) {
			let allArgs = this._args;
			if (before) allArgs = [before, ...allArgs];
			if (after) allArgs = [...allArgs, after];
			if (allArgs.length === 0) return "";
			return allArgs.join(", ");
		}
		getTapFn(idx) {
			return `_x[${idx}]`;
		}
		getTap(idx) {
			return `_taps[${idx}]`;
		}
		getInterceptor(idx) {
			return `_interceptors[${idx}]`;
		}
	};
	module.exports = HookCodeFactory;
}));
var require_AsyncParallelBailHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncParallelBailHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onResult, onDone }) {
			let code = "";
			code += `var _results = new Array(${this.options.taps.length});\n`;
			code += "var _checkDone = function() {\n";
			code += "for(var i = 0; i < _results.length; i++) {\n";
			code += "var item = _results[i];\n";
			code += "if(item === undefined) return false;\n";
			code += "if(item.result !== undefined) {\n";
			code += onResult("item.result");
			code += "return true;\n";
			code += "}\n";
			code += "if(item.error) {\n";
			code += onError("item.error");
			code += "return true;\n";
			code += "}\n";
			code += "}\n";
			code += "return false;\n";
			code += "}\n";
			code += this.callTapsParallel({
				onError: (i, err, done, doneBreak) => {
					let code = "";
					code += `if(${i} < _results.length && ((_results.length = ${i + 1}), (_results[${i}] = { error: ${err} }), _checkDone())) {\n`;
					code += doneBreak(true);
					code += "} else {\n";
					code += done();
					code += "}\n";
					return code;
				},
				onResult: (i, result, done, doneBreak) => {
					let code = "";
					code += `if(${i} < _results.length && (${result} !== undefined && (_results.length = ${i + 1}), (_results[${i}] = { result: ${result} }), _checkDone())) {\n`;
					code += doneBreak(true);
					code += "} else {\n";
					code += done();
					code += "}\n";
					return code;
				},
				onTap: (i, run, done, _doneBreak) => {
					let code = "";
					if (i > 0) {
						code += `if(${i} >= _results.length) {\n`;
						code += done();
						code += "} else {\n";
					}
					code += run();
					if (i > 0) code += "}\n";
					return code;
				},
				onDone
			});
			return code;
		}
	};
	const factory = new AsyncParallelBailHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncParallelBailHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncParallelBailHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncParallelBailHook.prototype = null;
	module.exports = AsyncParallelBailHook;
}));
var require_AsyncParallelHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncParallelHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsParallel({
				onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	};
	const factory = new AsyncParallelHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncParallelHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncParallelHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncParallelHook.prototype = null;
	module.exports = AsyncParallelHook;
}));
var require_AsyncSeriesBailHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncSeriesBailHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onResult, resultReturns, onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)}\n} else {\n${next()}}\n`,
				resultReturns,
				onDone
			});
		}
	};
	const factory = new AsyncSeriesBailHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncSeriesBailHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesBailHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncSeriesBailHook.prototype = null;
	module.exports = AsyncSeriesBailHook;
}));
var require_AsyncSeriesHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncSeriesHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	};
	const factory = new AsyncSeriesHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncSeriesHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncSeriesHook.prototype = null;
	module.exports = AsyncSeriesHook;
}));
var require_AsyncSeriesLoopHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncSeriesLoopHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsLooping({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	};
	const factory = new AsyncSeriesLoopHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncSeriesLoopHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesLoopHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncSeriesLoopHook.prototype = null;
	module.exports = AsyncSeriesLoopHook;
}));
var require_AsyncSeriesWaterfallHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var AsyncSeriesWaterfallHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onResult, _onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onResult: (i, result, next) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += `${this._args[0]} = ${result};\n`;
					code += "}\n";
					code += next();
					return code;
				},
				onDone: () => onResult(this._args[0])
			});
		}
	};
	const factory = new AsyncSeriesWaterfallHookCodeFactory();
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function AsyncSeriesWaterfallHook(args = [], name = void 0) {
		if (args.length < 1) throw new Error("Waterfall hooks must have at least one argument");
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesWaterfallHook;
		hook.compile = COMPILE;
		hook._call = void 0;
		hook.call = void 0;
		return hook;
	}
	AsyncSeriesWaterfallHook.prototype = null;
	module.exports = AsyncSeriesWaterfallHook;
}));
var require_HookMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const util = __require("util");
	const defaultFactory = (key, hook) => hook;
	var HookMap = class {
		constructor(factory, name = void 0) {
			this._map = /* @__PURE__ */ new Map();
			this.name = name;
			this._factory = factory;
			this._interceptors = [];
		}
		get(key) {
			return this._map.get(key);
		}
		for(key) {
			const hook = this.get(key);
			if (hook !== void 0) return hook;
			let newHook = this._factory(key);
			const interceptors = this._interceptors;
			for (let i = 0; i < interceptors.length; i++) newHook = interceptors[i].factory(key, newHook);
			this._map.set(key, newHook);
			return newHook;
		}
		intercept(interceptor) {
			this._interceptors.push(Object.assign({ factory: defaultFactory }, interceptor));
		}
	};
	HookMap.prototype.tap = util.deprecate(function tap(key, options, fn) {
		return this.for(key).tap(options, fn);
	}, "HookMap#tap(key,…) is deprecated. Use HookMap#for(key).tap(…) instead.");
	HookMap.prototype.tapAsync = util.deprecate(function tapAsync(key, options, fn) {
		return this.for(key).tapAsync(options, fn);
	}, "HookMap#tapAsync(key,…) is deprecated. Use HookMap#for(key).tapAsync(…) instead.");
	HookMap.prototype.tapPromise = util.deprecate(function tapPromise(key, options, fn) {
		return this.for(key).tapPromise(options, fn);
	}, "HookMap#tapPromise(key,…) is deprecated. Use HookMap#for(key).tapPromise(…) instead.");
	module.exports = HookMap;
}));
var require_MultiHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class MultiHook {
		constructor(hooks, name = void 0) {
			this.hooks = hooks;
			this.name = name;
		}
		tap(options, fn) {
			for (const hook of this.hooks) hook.tap(options, fn);
		}
		tapAsync(options, fn) {
			for (const hook of this.hooks) hook.tapAsync(options, fn);
		}
		tapPromise(options, fn) {
			for (const hook of this.hooks) hook.tapPromise(options, fn);
		}
		isUsed() {
			for (const hook of this.hooks) if (hook.isUsed()) return true;
			return false;
		}
		intercept(interceptor) {
			for (const hook of this.hooks) hook.intercept(interceptor);
		}
		withOptions(options) {
			return new MultiHook(this.hooks.map((hook) => hook.withOptions(options)), this.name);
		}
	};
}));
var require_SyncBailHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var SyncBailHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)};\n} else {\n${next()}}\n`,
				resultReturns,
				onDone,
				rethrowIfPossible
			});
		}
	};
	const factory = new SyncBailHookCodeFactory();
	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncBailHook");
	};
	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncBailHook");
	};
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function SyncBailHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = SyncBailHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}
	SyncBailHook.prototype = null;
	module.exports = SyncBailHook;
}));
var require_SyncHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var SyncHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onDone, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onDone,
				rethrowIfPossible
			});
		}
	};
	const factory = new SyncHookCodeFactory();
	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncHook");
	};
	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncHook");
	};
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function SyncHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = SyncHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}
	SyncHook.prototype = null;
	module.exports = SyncHook;
}));
var require_SyncLoopHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var SyncLoopHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onDone, rethrowIfPossible }) {
			return this.callTapsLooping({
				onError: (i, err) => onError(err),
				onDone,
				rethrowIfPossible
			});
		}
	};
	const factory = new SyncLoopHookCodeFactory();
	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncLoopHook");
	};
	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncLoopHook");
	};
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function SyncLoopHook(args = [], name = void 0) {
		const hook = new Hook(args, name);
		hook.constructor = SyncLoopHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}
	SyncLoopHook.prototype = null;
	module.exports = SyncLoopHook;
}));
var require_SyncWaterfallHook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const Hook = require_Hook();
	const HookCodeFactory = require_HookCodeFactory();
	var SyncWaterfallHookCodeFactory = class extends HookCodeFactory {
		content({ onError, onResult, resultReturns, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onResult: (i, result, next) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += `${this._args[0]} = ${result};\n`;
					code += "}\n";
					code += next();
					return code;
				},
				onDone: () => onResult(this._args[0]),
				doneReturns: resultReturns,
				rethrowIfPossible
			});
		}
	};
	const factory = new SyncWaterfallHookCodeFactory();
	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncWaterfallHook");
	};
	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncWaterfallHook");
	};
	function COMPILE(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
	function SyncWaterfallHook(args = [], name = void 0) {
		if (args.length < 1) throw new Error("Waterfall hooks must have at least one argument");
		const hook = new Hook(args, name);
		hook.constructor = SyncWaterfallHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}
	SyncWaterfallHook.prototype = null;
	module.exports = SyncWaterfallHook;
}));
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.AsyncParallelBailHook = require_AsyncParallelBailHook();
	module.exports.AsyncParallelHook = require_AsyncParallelHook();
	module.exports.AsyncSeriesBailHook = require_AsyncSeriesBailHook();
	module.exports.AsyncSeriesHook = require_AsyncSeriesHook();
	module.exports.AsyncSeriesLoopHook = require_AsyncSeriesLoopHook();
	module.exports.AsyncSeriesWaterfallHook = require_AsyncSeriesWaterfallHook();
	module.exports.HookMap = require_HookMap();
	module.exports.MultiHook = require_MultiHook();
	module.exports.SyncBailHook = require_SyncBailHook();
	module.exports.SyncHook = require_SyncHook();
	module.exports.SyncLoopHook = require_SyncLoopHook();
	module.exports.SyncWaterfallHook = require_SyncWaterfallHook();
	module.exports.__esModule = true;
}));
var require_createInnerContext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function createInnerContext(options, message) {
		let messageReported = false;
		let innerLog;
		if (options.log) if (message) innerLog = (msg) => {
			if (!messageReported) {
				options.log(message);
				messageReported = true;
			}
			options.log(`  ${msg}`);
		};
		else innerLog = options.log;
		return {
			log: innerLog,
			yield: options.yield,
			fileDependencies: options.fileDependencies,
			contextDependencies: options.contextDependencies,
			missingDependencies: options.missingDependencies,
			stack: options.stack
		};
	};
}));
var require_Resolver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { AsyncSeriesBailHook, AsyncSeriesHook, SyncHook } = require_lib$1();
	const createInnerContext = require_createInnerContext();
	const { parseIdentifier } = require_identifier();
	const { PathType, cachedJoin: join, getType, normalize } = require_path();
	function toCamelCase(str) {
		return str.replace(/-([a-z])/g, (str) => str.slice(1).toUpperCase());
	}
	module.exports = class Resolver {
		static createStackEntry(hook, request) {
			return `${hook.name}: (${request.path}) ${request.request || ""}${request.query || ""}${request.fragment || ""}${request.directory ? " directory" : ""}${request.module ? " module" : ""}`;
		}
		constructor(fileSystem, options) {
			this.fileSystem = fileSystem;
			this.options = options;
			this.hooks = {
				resolveStep: new SyncHook(["hook", "request"], "resolveStep"),
				noResolve: new SyncHook(["request", "error"], "noResolve"),
				resolve: new AsyncSeriesBailHook(["request", "resolveContext"], "resolve"),
				result: new AsyncSeriesHook(["result", "resolveContext"], "result")
			};
		}
		ensureHook(name) {
			if (typeof name !== "string") return name;
			name = toCamelCase(name);
			if (name.startsWith("before")) return this.ensureHook(name[6].toLowerCase() + name.slice(7)).withOptions({ stage: -10 });
			if (name.startsWith("after")) return this.ensureHook(name[5].toLowerCase() + name.slice(6)).withOptions({ stage: 10 });
			const hook = this.hooks[name];
			if (!hook) {
				this.hooks[name] = new AsyncSeriesBailHook(["request", "resolveContext"], name);
				return this.hooks[name];
			}
			return hook;
		}
		getHook(name) {
			if (typeof name !== "string") return name;
			name = toCamelCase(name);
			if (name.startsWith("before")) return this.getHook(name[6].toLowerCase() + name.slice(7)).withOptions({ stage: -10 });
			if (name.startsWith("after")) return this.getHook(name[5].toLowerCase() + name.slice(6)).withOptions({ stage: 10 });
			const hook = this.hooks[name];
			if (!hook) throw new Error(`Hook ${name} doesn't exist`);
			return hook;
		}
		resolveSync(context, path, request) {
			let err;
			let result;
			let sync = false;
			this.resolve(context, path, request, {}, (_err, r) => {
				err = _err;
				result = r;
				sync = true;
			});
			if (!sync) throw new Error("Cannot 'resolveSync' because the fileSystem is not sync. Use 'resolve'!");
			if (err) throw err;
			if (result === void 0) throw new Error("No result");
			return result;
		}
		resolve(context, path, request, resolveContext, callback) {
			if (!context || typeof context !== "object") return callback(/* @__PURE__ */ new Error("context argument is not an object"));
			if (typeof path !== "string") return callback(/* @__PURE__ */ new Error("path argument is not a string"));
			if (typeof request !== "string") return callback(/* @__PURE__ */ new Error("request argument is not a string"));
			if (!resolveContext) return callback(/* @__PURE__ */ new Error("resolveContext argument is not set"));
			const obj = {
				context,
				path,
				request
			};
			let yield_;
			let yieldCalled = false;
			let finishYield;
			if (typeof resolveContext.yield === "function") {
				const old = resolveContext.yield;
				yield_ = (obj) => {
					old(obj);
					yieldCalled = true;
				};
				finishYield = (result) => {
					if (result) yield_(result);
					callback(null);
				};
			}
			const message = `resolve '${request}' in '${path}'`;
			const finishResolved = (result) => callback(null, result.path === false ? false : `${result.path.replace(/#/g, "\0#")}${result.query ? result.query.replace(/#/g, "\0#") : ""}${result.fragment || ""}`, result);
			const finishWithoutResolve = (log) => {
				const error = /* @__PURE__ */ new Error(`Can't ${message}`);
				error.details = log.join("\n");
				this.hooks.noResolve.call(obj, error);
				return callback(error);
			};
			if (resolveContext.log) {
				const parentLog = resolveContext.log;
				const log = [];
				return this.doResolve(this.hooks.resolve, obj, message, {
					log: (msg) => {
						parentLog(msg);
						log.push(msg);
					},
					yield: yield_,
					fileDependencies: resolveContext.fileDependencies,
					contextDependencies: resolveContext.contextDependencies,
					missingDependencies: resolveContext.missingDependencies,
					stack: resolveContext.stack
				}, (err, result) => {
					if (err) return callback(err);
					if (yieldCalled || result && yield_) return finishYield(result);
					if (result) return finishResolved(result);
					return finishWithoutResolve(log);
				});
			}
			return this.doResolve(this.hooks.resolve, obj, message, {
				log: void 0,
				yield: yield_,
				fileDependencies: resolveContext.fileDependencies,
				contextDependencies: resolveContext.contextDependencies,
				missingDependencies: resolveContext.missingDependencies,
				stack: resolveContext.stack
			}, (err, result) => {
				if (err) return callback(err);
				if (yieldCalled || result && yield_) return finishYield(result);
				if (result) return finishResolved(result);
				const log = [];
				return this.doResolve(this.hooks.resolve, obj, message, {
					log: (msg) => log.push(msg),
					yield: yield_,
					stack: resolveContext.stack
				}, (err, result) => {
					if (err) return callback(err);
					if (yieldCalled || result && yield_) return finishYield(result);
					return finishWithoutResolve(log);
				});
			});
		}
		doResolve(hook, request, message, resolveContext, callback) {
			const stackEntry = Resolver.createStackEntry(hook, request);
			let newStack;
			if (resolveContext.stack) {
				newStack = new Set(resolveContext.stack);
				if (resolveContext.stack.has(stackEntry)) {
					const recursionError = /* @__PURE__ */ new Error(`Recursion in resolving\nStack:\n  ${[...newStack].join("\n  ")}`);
					recursionError.recursion = true;
					if (resolveContext.log) resolveContext.log("abort resolving because of recursion");
					return callback(recursionError);
				}
				newStack.add(stackEntry);
			} else {
				newStack = /* @__PURE__ */ new Set();
				newStack.add(stackEntry);
			}
			this.hooks.resolveStep.call(hook, request);
			if (hook.isUsed()) {
				const innerContext = createInnerContext({
					log: resolveContext.log,
					yield: resolveContext.yield,
					fileDependencies: resolveContext.fileDependencies,
					contextDependencies: resolveContext.contextDependencies,
					missingDependencies: resolveContext.missingDependencies,
					stack: newStack
				}, message);
				return hook.callAsync(request, innerContext, (err, result) => {
					if (err) return callback(err);
					if (result) return callback(null, result);
					callback();
				});
			}
			callback();
		}
		parse(identifier) {
			const part = {
				request: "",
				query: "",
				fragment: "",
				module: false,
				directory: false,
				file: false,
				internal: false
			};
			const parsedIdentifier = parseIdentifier(identifier);
			if (!parsedIdentifier) return part;
			[part.request, part.query, part.fragment] = parsedIdentifier;
			if (part.request.length > 0) {
				part.internal = this.isPrivate(identifier);
				part.module = this.isModule(part.request);
				part.directory = this.isDirectory(part.request);
				if (part.directory) part.request = part.request.slice(0, -1);
			}
			return part;
		}
		isModule(path) {
			return getType(path) === PathType.Normal;
		}
		isPrivate(path) {
			return getType(path) === PathType.Internal;
		}
		isDirectory(path) {
			return path.endsWith("/");
		}
		join(path, request) {
			return join(path, request);
		}
		normalize(path) {
			return normalize(path);
		}
	};
}));
var require_RestrictionsPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const slashCode = "/".charCodeAt(0);
	const backslashCode = "\\".charCodeAt(0);
	const isInside = (path, parent) => {
		if (!path.startsWith(parent)) return false;
		if (path.length === parent.length) return true;
		const charCode = path.charCodeAt(parent.length);
		return charCode === slashCode || charCode === backslashCode;
	};
	module.exports = class RestrictionsPlugin {
		constructor(source, restrictions) {
			this.source = source;
			this.restrictions = restrictions;
		}
		apply(resolver) {
			resolver.getHook(this.source).tapAsync("RestrictionsPlugin", (request, resolveContext, callback) => {
				if (typeof request.path === "string") {
					const { path } = request;
					for (const rule of this.restrictions) if (typeof rule === "string") {
						if (!isInside(path, rule)) {
							if (resolveContext.log) resolveContext.log(`${path} is not inside of the restriction ${rule}`);
							return callback(null, null);
						}
					} else if (!rule.test(path)) {
						if (resolveContext.log) resolveContext.log(`${path} doesn't match the restriction ${rule}`);
						return callback(null, null);
					}
				}
				callback();
			});
		}
	};
}));
var require_ResultPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class ResultPlugin {
		constructor(source) {
			this.source = source;
		}
		apply(resolver) {
			this.source.tapAsync("ResultPlugin", (request, resolverContext, callback) => {
				const obj = { ...request };
				if (resolverContext.log) resolverContext.log(`reporting result ${obj.path}`);
				resolver.hooks.result.callAsync(obj, resolverContext, (err) => {
					if (err) return callback(err);
					if (typeof resolverContext.yield === "function") {
						resolverContext.yield(obj);
						callback(null, null);
					} else callback(null, obj);
				});
			});
		}
	};
}));
var require_RootsPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	var RootsPlugin = class {
		constructor(source, roots, target) {
			this.roots = [...roots];
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("RootsPlugin", (request, resolveContext, callback) => {
				const req = request.request;
				if (!req) return callback();
				if (!req.startsWith("/")) return callback();
				forEachBail(this.roots, (root, callback) => {
					const path = resolver.join(root, req.slice(1));
					const obj = {
						...request,
						path,
						relativePath: request.relativePath && path
					};
					resolver.doResolve(target, obj, `root path ${root}`, resolveContext, callback);
				}, callback);
			});
		}
	};
	module.exports = RootsPlugin;
}));
var require_SelfReferencePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DescriptionFileUtils = require_DescriptionFileUtils();
	const slashCode = "/".charCodeAt(0);
	module.exports = class SelfReferencePlugin {
		constructor(source, fieldNamePath, target) {
			this.source = source;
			this.target = target;
			this.fieldName = fieldNamePath;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("SelfReferencePlugin", (request, resolveContext, callback) => {
				if (!request.descriptionFilePath) return callback();
				const req = request.request;
				if (!req) return callback();
				if (!DescriptionFileUtils.getField(request.descriptionFileData, this.fieldName)) return callback();
				const name = DescriptionFileUtils.getField(request.descriptionFileData, "name");
				if (typeof name !== "string") return callback();
				if (req.startsWith(name) && (req.length === name.length || req.charCodeAt(name.length) === slashCode)) {
					const remainingRequest = `.${req.slice(name.length)}`;
					const obj = {
						...request,
						request: remainingRequest,
						path: request.descriptionFileRoot,
						relativePath: "."
					};
					resolver.doResolve(target, obj, "self reference", resolveContext, callback);
				} else return callback();
			});
		}
	};
}));
var require_SymlinkPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const forEachBail = require_forEachBail();
	const getPaths = require_getPaths();
	const { PathType, getType } = require_path();
	module.exports = class SymlinkPlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			const fs = resolver.fileSystem;
			resolver.getHook(this.source).tapAsync("SymlinkPlugin", (request, resolveContext, callback) => {
				if (request.ignoreSymlinks) return callback();
				const pathsResult = getPaths(request.path);
				const pathSegments = pathsResult.segments;
				const { paths } = pathsResult;
				let containsSymlink = false;
				let idx = -1;
				forEachBail(paths, (path, callback) => {
					idx++;
					if (resolveContext.fileDependencies) resolveContext.fileDependencies.add(path);
					fs.readlink(path, (err, result) => {
						if (!err && result) {
							pathSegments[idx] = result;
							containsSymlink = true;
							const resultType = getType(result.toString());
							if (resultType === PathType.AbsoluteWin || resultType === PathType.AbsolutePosix) return callback(null, idx);
						}
						callback();
					});
				}, (err, idx) => {
					if (!containsSymlink) return callback();
					const result = (typeof idx === "number" ? pathSegments.slice(0, idx + 1) : [...pathSegments]).reduceRight((a, b) => resolver.join(a, b));
					const obj = {
						...request,
						path: result
					};
					resolver.doResolve(target, obj, `resolved symlink to ${result}`, resolveContext, callback);
				});
			});
		}
	};
}));
var require_SyncAsyncFileSystemDecorator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function SyncAsyncFileSystemDecorator(fs) {
		this.fs = fs;
		this.lstat = void 0;
		this.lstatSync = void 0;
		const { lstatSync } = fs;
		if (lstatSync) {
			this.lstat = ((arg, options, callback) => {
				let result;
				try {
					result = callback ? lstatSync.call(fs, arg, options) : lstatSync.call(fs, arg);
				} catch (err) {
					return (callback || options)(err);
				}
				(callback || options)(null, result);
			});
			this.lstatSync = ((arg, options) => lstatSync.call(fs, arg, options));
		}
		this.stat = ((arg, options, callback) => {
			let result;
			try {
				result = callback ? fs.statSync(arg, options) : fs.statSync(arg);
			} catch (err) {
				return (callback || options)(err);
			}
			(callback || options)(null, result);
		});
		this.statSync = ((arg, options) => fs.statSync(arg, options));
		this.readdir = ((arg, options, callback) => {
			let result;
			try {
				result = callback ? fs.readdirSync(arg, options) : fs.readdirSync(arg);
			} catch (err) {
				return (callback || options)(err, []);
			}
			(callback || options)(null, result);
		});
		this.readdirSync = ((arg, options) => fs.readdirSync(arg, options));
		this.readFile = ((arg, options, callback) => {
			let result;
			try {
				result = callback ? fs.readFileSync(arg, options) : fs.readFileSync(arg);
			} catch (err) {
				return (callback || options)(err);
			}
			(callback || options)(null, result);
		});
		this.readFileSync = ((arg, options) => fs.readFileSync(arg, options));
		this.readlink = ((arg, options, callback) => {
			let result;
			try {
				result = callback ? fs.readlinkSync(arg, options) : fs.readlinkSync(arg);
			} catch (err) {
				return (callback || options)(err);
			}
			(callback || options)(null, result);
		});
		this.readlinkSync = ((arg, options) => fs.readlinkSync(arg, options));
		this.readJson = void 0;
		this.readJsonSync = void 0;
		const { readJsonSync } = fs;
		if (readJsonSync) {
			this.readJson = ((arg, callback) => {
				let result;
				try {
					result = readJsonSync.call(fs, arg);
				} catch (err) {
					return callback(err);
				}
				callback(null, result);
			});
			this.readJsonSync = ((arg) => readJsonSync.call(fs, arg));
		}
		this.realpath = void 0;
		this.realpathSync = void 0;
		const { realpathSync } = fs;
		if (realpathSync) {
			this.realpath = ((arg, options, callback) => {
				let result;
				try {
					result = callback ? realpathSync.call(fs, arg, options) : realpathSync.call(fs, arg);
				} catch (err) {
					return (callback || options)(err);
				}
				(callback || options)(null, result);
			});
			this.realpathSync = ((arg, options) => realpathSync.call(fs, arg, options));
		}
	}
	module.exports = SyncAsyncFileSystemDecorator;
}));
var require_TryNextPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class TryNextPlugin {
		constructor(source, message, target) {
			this.source = source;
			this.message = message;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("TryNextPlugin", (request, resolveContext, callback) => {
				resolver.doResolve(target, request, this.message, resolveContext, callback);
			});
		}
	};
}));
var require_UnsafeCachePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function getCacheId(type, request, withContext) {
		return JSON.stringify({
			type,
			context: withContext ? request.context : "",
			path: request.path,
			query: request.query,
			fragment: request.fragment,
			request: request.request
		});
	}
	module.exports = class UnsafeCachePlugin {
		constructor(source, filterPredicate, cache, withContext, target) {
			this.source = source;
			this.filterPredicate = filterPredicate;
			this.withContext = withContext;
			this.cache = cache;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("UnsafeCachePlugin", (request, resolveContext, callback) => {
				if (!this.filterPredicate(request)) return callback();
				const isYield = typeof resolveContext.yield === "function";
				const cacheId = getCacheId(isYield ? "yield" : "default", request, this.withContext);
				const cacheEntry = this.cache[cacheId];
				if (cacheEntry) {
					if (isYield) {
						const yield_ = resolveContext.yield;
						if (Array.isArray(cacheEntry)) for (const result of cacheEntry) yield_(result);
						else yield_(cacheEntry);
						return callback(null, null);
					}
					return callback(null, cacheEntry);
				}
				let yieldFn;
				let yield_;
				const yieldResult = [];
				if (isYield) {
					yieldFn = resolveContext.yield;
					yield_ = (result) => {
						yieldResult.push(result);
					};
				}
				resolver.doResolve(target, request, null, yield_ ? {
					...resolveContext,
					yield: yield_
				} : resolveContext, (err, result) => {
					if (err) return callback(err);
					if (isYield) {
						if (result) yieldResult.push(result);
						for (const result of yieldResult) yieldFn(result);
						this.cache[cacheId] = yieldResult;
						return callback(null, null);
					}
					if (result) return callback(null, this.cache[cacheId] = result);
					callback();
				});
			});
		}
	};
}));
var require_UseFilePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class UseFilePlugin {
		constructor(source, filename, target) {
			this.source = source;
			this.filename = filename;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("UseFilePlugin", (request, resolveContext, callback) => {
				const filePath = resolver.join(request.path, this.filename);
				const obj = {
					...request,
					path: filePath,
					relativePath: request.relativePath && resolver.join(request.relativePath, this.filename)
				};
				resolver.doResolve(target, obj, `using path: ${filePath}`, resolveContext, callback);
			});
		}
	};
}));
var require_ResolverFactory = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { versions } = __require("process");
	const AliasFieldPlugin = require_AliasFieldPlugin();
	const AliasPlugin = require_AliasPlugin();
	const AppendPlugin = require_AppendPlugin();
	const ConditionalPlugin = require_ConditionalPlugin();
	const DescriptionFilePlugin = require_DescriptionFilePlugin();
	const DirectoryExistsPlugin = require_DirectoryExistsPlugin();
	const ExportsFieldPlugin = require_ExportsFieldPlugin();
	const ExtensionAliasPlugin = require_ExtensionAliasPlugin();
	const FileExistsPlugin = require_FileExistsPlugin();
	const ImportsFieldPlugin = require_ImportsFieldPlugin();
	const JoinRequestPartPlugin = require_JoinRequestPartPlugin();
	const JoinRequestPlugin = require_JoinRequestPlugin();
	const MainFieldPlugin = require_MainFieldPlugin();
	const ModulesInHierarchicalDirectoriesPlugin = require_ModulesInHierarchicalDirectoriesPlugin();
	const ModulesInRootPlugin = require_ModulesInRootPlugin();
	const NextPlugin = require_NextPlugin();
	const ParsePlugin = require_ParsePlugin();
	const PnpPlugin = require_PnpPlugin();
	const Resolver = require_Resolver();
	const RestrictionsPlugin = require_RestrictionsPlugin();
	const ResultPlugin = require_ResultPlugin();
	const RootsPlugin = require_RootsPlugin();
	const SelfReferencePlugin = require_SelfReferencePlugin();
	const SymlinkPlugin = require_SymlinkPlugin();
	const SyncAsyncFileSystemDecorator = require_SyncAsyncFileSystemDecorator();
	const TryNextPlugin = require_TryNextPlugin();
	const UnsafeCachePlugin = require_UnsafeCachePlugin();
	const UseFilePlugin = require_UseFilePlugin();
	const { PathType, getType } = require_path();
	function processPnpApiOption(option) {
		if (option === void 0 && versions.pnp) {
			const _findPnpApi = __require("module").findPnpApi;
			if (_findPnpApi) return { resolveToUnqualified(request, issuer, opts) {
				const pnpapi = _findPnpApi(issuer);
				if (!pnpapi) return null;
				return pnpapi.resolveToUnqualified(request, issuer, opts);
			} };
		}
		return option || null;
	}
	function normalizeAlias(alias) {
		return typeof alias === "object" && !Array.isArray(alias) && alias !== null ? Object.keys(alias).map((key) => {
			const obj = {
				name: key,
				onlyModule: false,
				alias: alias[key]
			};
			if (/\$$/.test(key)) {
				obj.onlyModule = true;
				obj.name = key.slice(0, -1);
			}
			return obj;
		}) : alias || [];
	}
	function mergeFilteredToArray(array, filter) {
		const result = [];
		const set = new Set(array);
		for (const item of set) if (filter(item)) {
			const lastElement = result.length > 0 ? result[result.length - 1] : void 0;
			if (Array.isArray(lastElement)) lastElement.push(item);
			else result.push([item]);
		} else result.push(item);
		return result;
	}
	function createOptions(options) {
		const mainFieldsSet = new Set(options.mainFields || ["main"]);
		const mainFields = [];
		for (const item of mainFieldsSet) if (typeof item === "string") mainFields.push({
			name: [item],
			forceRelative: true
		});
		else if (Array.isArray(item)) mainFields.push({
			name: item,
			forceRelative: true
		});
		else mainFields.push({
			name: Array.isArray(item.name) ? item.name : [item.name],
			forceRelative: item.forceRelative
		});
		return {
			alias: normalizeAlias(options.alias),
			fallback: normalizeAlias(options.fallback),
			aliasFields: new Set(options.aliasFields),
			cachePredicate: options.cachePredicate || function trueFn() {
				return true;
			},
			cacheWithContext: typeof options.cacheWithContext !== "undefined" ? options.cacheWithContext : true,
			exportsFields: new Set(options.exportsFields || ["exports"]),
			importsFields: new Set(options.importsFields || ["imports"]),
			conditionNames: new Set(options.conditionNames),
			descriptionFiles: [...new Set(options.descriptionFiles || ["package.json"])],
			enforceExtension: options.enforceExtension === void 0 ? Boolean(options.extensions && options.extensions.includes("")) : options.enforceExtension,
			extensions: new Set(options.extensions || [
				".js",
				".json",
				".node"
			]),
			extensionAlias: options.extensionAlias ? Object.keys(options.extensionAlias).map((k) => ({
				extension: k,
				alias: options.extensionAlias[k]
			})) : [],
			fileSystem: options.useSyncFileSystemCalls ? new SyncAsyncFileSystemDecorator(options.fileSystem) : options.fileSystem,
			unsafeCache: options.unsafeCache && typeof options.unsafeCache !== "object" ? {} : options.unsafeCache || false,
			symlinks: typeof options.symlinks !== "undefined" ? options.symlinks : true,
			resolver: options.resolver,
			modules: mergeFilteredToArray(Array.isArray(options.modules) ? options.modules : options.modules ? [options.modules] : ["node_modules"], (item) => {
				const type = getType(item);
				return type === PathType.Normal || type === PathType.Relative;
			}),
			mainFields,
			mainFiles: new Set(options.mainFiles || ["index"]),
			plugins: options.plugins || [],
			pnpApi: processPnpApiOption(options.pnpApi),
			roots: new Set(options.roots || void 0),
			fullySpecified: options.fullySpecified || false,
			resolveToContext: options.resolveToContext || false,
			preferRelative: options.preferRelative || false,
			preferAbsolute: options.preferAbsolute || false,
			restrictions: new Set(options.restrictions)
		};
	}
	module.exports.createResolver = function createResolver(options) {
		const normalizedOptions = createOptions(options);
		const { alias, fallback, aliasFields, cachePredicate, cacheWithContext, conditionNames, descriptionFiles, enforceExtension, exportsFields, extensionAlias, importsFields, extensions, fileSystem, fullySpecified, mainFields, mainFiles, modules, plugins: userPlugins, pnpApi, resolveToContext, preferRelative, preferAbsolute, symlinks, unsafeCache, resolver: customResolver, restrictions, roots } = normalizedOptions;
		const plugins = [...userPlugins];
		const resolver = customResolver || new Resolver(fileSystem, normalizedOptions);
		resolver.ensureHook("resolve");
		resolver.ensureHook("internalResolve");
		resolver.ensureHook("newInternalResolve");
		resolver.ensureHook("parsedResolve");
		resolver.ensureHook("describedResolve");
		resolver.ensureHook("rawResolve");
		resolver.ensureHook("normalResolve");
		resolver.ensureHook("internal");
		resolver.ensureHook("rawModule");
		resolver.ensureHook("alternateRawModule");
		resolver.ensureHook("module");
		resolver.ensureHook("resolveAsModule");
		resolver.ensureHook("undescribedResolveInPackage");
		resolver.ensureHook("resolveInPackage");
		resolver.ensureHook("resolveInExistingDirectory");
		resolver.ensureHook("relative");
		resolver.ensureHook("describedRelative");
		resolver.ensureHook("directory");
		resolver.ensureHook("undescribedExistingDirectory");
		resolver.ensureHook("existingDirectory");
		resolver.ensureHook("undescribedRawFile");
		resolver.ensureHook("rawFile");
		resolver.ensureHook("file");
		resolver.ensureHook("finalFile");
		resolver.ensureHook("existingFile");
		resolver.ensureHook("resolved");
		resolver.hooks.newInteralResolve = resolver.hooks.newInternalResolve;
		for (const { source, resolveOptions } of [{
			source: "resolve",
			resolveOptions: { fullySpecified }
		}, {
			source: "internal-resolve",
			resolveOptions: { fullySpecified: false }
		}]) if (unsafeCache) {
			plugins.push(new UnsafeCachePlugin(source, cachePredicate, unsafeCache, cacheWithContext, `new-${source}`));
			plugins.push(new ParsePlugin(`new-${source}`, resolveOptions, "parsed-resolve"));
		} else plugins.push(new ParsePlugin(source, resolveOptions, "parsed-resolve"));
		plugins.push(new DescriptionFilePlugin("parsed-resolve", descriptionFiles, false, "described-resolve"));
		plugins.push(new NextPlugin("after-parsed-resolve", "described-resolve"));
		plugins.push(new NextPlugin("described-resolve", "raw-resolve"));
		if (fallback.length > 0) plugins.push(new AliasPlugin("described-resolve", fallback, "internal-resolve"));
		if (alias.length > 0) plugins.push(new AliasPlugin("raw-resolve", alias, "internal-resolve"));
		for (const item of aliasFields) plugins.push(new AliasFieldPlugin("raw-resolve", item, "internal-resolve"));
		for (const item of extensionAlias) plugins.push(new ExtensionAliasPlugin("raw-resolve", item, "normal-resolve"));
		plugins.push(new NextPlugin("raw-resolve", "normal-resolve"));
		if (preferRelative) plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
		plugins.push(new ConditionalPlugin("after-normal-resolve", { module: true }, "resolve as module", false, "raw-module"));
		plugins.push(new ConditionalPlugin("after-normal-resolve", { internal: true }, "resolve as internal import", false, "internal"));
		if (preferAbsolute) plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
		if (roots.size > 0) plugins.push(new RootsPlugin("after-normal-resolve", roots, "relative"));
		if (!preferRelative && !preferAbsolute) plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
		for (const importsField of importsFields) plugins.push(new ImportsFieldPlugin("internal", conditionNames, importsField, "relative", "internal-resolve"));
		for (const exportsField of exportsFields) plugins.push(new SelfReferencePlugin("raw-module", exportsField, "resolve-as-module"));
		for (const item of modules) if (Array.isArray(item)) if (item.includes("node_modules") && pnpApi) {
			plugins.push(new ModulesInHierarchicalDirectoriesPlugin("raw-module", item.filter((i) => i !== "node_modules"), "module"));
			plugins.push(new PnpPlugin("raw-module", pnpApi, "undescribed-resolve-in-package", "alternate-raw-module"));
			plugins.push(new ModulesInHierarchicalDirectoriesPlugin("alternate-raw-module", ["node_modules"], "module"));
		} else plugins.push(new ModulesInHierarchicalDirectoriesPlugin("raw-module", item, "module"));
		else plugins.push(new ModulesInRootPlugin("raw-module", item, "module"));
		plugins.push(new JoinRequestPartPlugin("module", "resolve-as-module"));
		if (!resolveToContext) plugins.push(new ConditionalPlugin("resolve-as-module", {
			directory: false,
			request: "."
		}, "single file module", true, "undescribed-raw-file"));
		plugins.push(new DirectoryExistsPlugin("resolve-as-module", "undescribed-resolve-in-package"));
		plugins.push(new DescriptionFilePlugin("undescribed-resolve-in-package", descriptionFiles, false, "resolve-in-package"));
		plugins.push(new NextPlugin("after-undescribed-resolve-in-package", "resolve-in-package"));
		for (const exportsField of exportsFields) plugins.push(new ExportsFieldPlugin("resolve-in-package", conditionNames, exportsField, "relative"));
		plugins.push(new NextPlugin("resolve-in-package", "resolve-in-existing-directory"));
		plugins.push(new JoinRequestPlugin("resolve-in-existing-directory", "relative"));
		plugins.push(new DescriptionFilePlugin("relative", descriptionFiles, true, "described-relative"));
		plugins.push(new NextPlugin("after-relative", "described-relative"));
		if (resolveToContext) plugins.push(new NextPlugin("described-relative", "directory"));
		else {
			plugins.push(new ConditionalPlugin("described-relative", { directory: false }, null, true, "raw-file"));
			plugins.push(new ConditionalPlugin("described-relative", { fullySpecified: false }, "as directory", true, "directory"));
		}
		plugins.push(new DirectoryExistsPlugin("directory", "undescribed-existing-directory"));
		if (resolveToContext) plugins.push(new NextPlugin("undescribed-existing-directory", "resolved"));
		else {
			plugins.push(new DescriptionFilePlugin("undescribed-existing-directory", descriptionFiles, false, "existing-directory"));
			for (const item of mainFiles) plugins.push(new UseFilePlugin("undescribed-existing-directory", item, "undescribed-raw-file"));
			for (const item of mainFields) plugins.push(new MainFieldPlugin("existing-directory", item, "resolve-in-existing-directory"));
			for (const item of mainFiles) plugins.push(new UseFilePlugin("existing-directory", item, "undescribed-raw-file"));
			plugins.push(new DescriptionFilePlugin("undescribed-raw-file", descriptionFiles, true, "raw-file"));
			plugins.push(new NextPlugin("after-undescribed-raw-file", "raw-file"));
			plugins.push(new ConditionalPlugin("raw-file", { fullySpecified: true }, null, false, "file"));
			if (!enforceExtension) plugins.push(new TryNextPlugin("raw-file", "no extension", "file"));
			for (const item of extensions) plugins.push(new AppendPlugin("raw-file", item, "file"));
			if (alias.length > 0) plugins.push(new AliasPlugin("file", alias, "internal-resolve"));
			for (const item of aliasFields) plugins.push(new AliasFieldPlugin("file", item, "internal-resolve"));
			plugins.push(new NextPlugin("file", "final-file"));
			plugins.push(new FileExistsPlugin("final-file", "existing-file"));
			if (symlinks) plugins.push(new SymlinkPlugin("existing-file", "existing-file"));
			plugins.push(new NextPlugin("existing-file", "resolved"));
		}
		const { resolved } = resolver.hooks;
		if (restrictions.size > 0) plugins.push(new RestrictionsPlugin(resolved, restrictions));
		plugins.push(new ResultPlugin(resolved));
		for (const plugin of plugins) if (typeof plugin === "function") plugin.call(resolver, resolver);
		else if (plugin) plugin.apply(resolver);
		return resolver;
	};
}));
var require_CloneBasenamePlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { basename } = require_getPaths();
	module.exports = class CloneBasenamePlugin {
		constructor(source, target) {
			this.source = source;
			this.target = target;
		}
		apply(resolver) {
			const target = resolver.ensureHook(this.target);
			resolver.getHook(this.source).tapAsync("CloneBasenamePlugin", (request, resolveContext, callback) => {
				const requestPath = request.path;
				const filename = basename(requestPath);
				const filePath = resolver.join(requestPath, filename);
				const obj = {
					...request,
					path: filePath,
					relativePath: request.relativePath && resolver.join(request.relativePath, filename)
				};
				resolver.doResolve(target, obj, `using path: ${filePath}`, resolveContext, callback);
			});
		}
	};
}));
var require_LogInfoPlugin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class LogInfoPlugin {
		constructor(source) {
			this.source = source;
		}
		apply(resolver) {
			const { source } = this;
			resolver.getHook(this.source).tapAsync("LogInfoPlugin", (request, resolveContext, callback) => {
				if (!resolveContext.log) return callback();
				const { log } = resolveContext;
				const prefix = `[${source}] `;
				if (request.path) log(`${prefix}Resolving in directory: ${request.path}`);
				if (request.request) log(`${prefix}Resolving request: ${request.request}`);
				if (request.module) log(`${prefix}Request is an module request.`);
				if (request.directory) log(`${prefix}Request is a directory request.`);
				if (request.query) log(`${prefix}Resolving request query: ${request.query}`);
				if (request.fragment) log(`${prefix}Resolving request fragment: ${request.fragment}`);
				if (request.descriptionFilePath) log(`${prefix}Has description data from ${request.descriptionFilePath}`);
				if (request.relativePath) log(`${prefix}Relative path from description file is: ${request.relativePath}`);
				callback();
			});
		}
	};
}));
var import_lib = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	const memoize = require_memoize();
	const getCachedFileSystem = memoize(() => require_CachedInputFileSystem());
	const getNodeFileSystem = memoize(() => {
		const fs = require_graceful_fs();
		return new (getCachedFileSystem())(fs, 4e3);
	});
	const getNodeContext = memoize(() => ({ environments: ["node+es3+es5+process+native"] }));
	const getResolverFactory = memoize(() => require_ResolverFactory());
	const getAsyncResolver = memoize(() => getResolverFactory().createResolver({
		conditionNames: ["node"],
		extensions: [
			".js",
			".json",
			".node"
		],
		fileSystem: getNodeFileSystem()
	}));
	const resolve = (context, path, request, resolveContext, callback) => {
		if (typeof context === "string") {
			callback = resolveContext;
			resolveContext = request;
			request = path;
			path = context;
			context = getNodeContext();
		}
		if (typeof callback !== "function") callback = resolveContext;
		getAsyncResolver().resolve(context, path, request, resolveContext, callback);
	};
	const getSyncResolver = memoize(() => getResolverFactory().createResolver({
		conditionNames: ["node"],
		extensions: [
			".js",
			".json",
			".node"
		],
		useSyncFileSystemCalls: true,
		fileSystem: getNodeFileSystem()
	}));
	const resolveSync = (context, path, request) => {
		if (typeof context === "string") {
			request = path;
			path = context;
			context = getNodeContext();
		}
		return getSyncResolver().resolveSync(context, path, request);
	};
	function create(options) {
		const resolver = getResolverFactory().createResolver({
			fileSystem: getNodeFileSystem(),
			...options
		});
		return function create(context, path, request, resolveContext, callback) {
			if (typeof context === "string") {
				callback = resolveContext;
				resolveContext = request;
				request = path;
				path = context;
				context = getNodeContext();
			}
			if (typeof callback !== "function") callback = resolveContext;
			resolver.resolve(context, path, request, resolveContext, callback);
		};
	}
	function createSync(options) {
		const resolver = getResolverFactory().createResolver({
			useSyncFileSystemCalls: true,
			fileSystem: getNodeFileSystem(),
			...options
		});
		return function createSync(context, path, request) {
			if (typeof context === "string") {
				request = path;
				path = context;
				context = getNodeContext();
			}
			return resolver.resolveSync(context, path, request);
		};
	}
	const mergeExports = (obj, exports$1) => {
		const descriptors = Object.getOwnPropertyDescriptors(exports$1);
		Object.defineProperties(obj, descriptors);
		return Object.freeze(obj);
	};
	module.exports = mergeExports(resolve, {
		get sync() {
			return resolveSync;
		},
		create: mergeExports(create, { get sync() {
			return createSync;
		} }),
		get ResolverFactory() {
			return getResolverFactory();
		},
		get CachedInputFileSystem() {
			return getCachedFileSystem();
		},
		get CloneBasenamePlugin() {
			return require_CloneBasenamePlugin();
		},
		get LogInfoPlugin() {
			return require_LogInfoPlugin();
		},
		get forEachBail() {
			return require_forEachBail();
		}
	});
})))();
const fileSystem = new import_lib.CachedInputFileSystem(fs, 3e4);
const esmResolver = import_lib.ResolverFactory.createResolver({
	fileSystem,
	useSyncFileSystemCalls: true,
	extensions: [".mjs", ".js"],
	mainFields: ["module"],
	conditionNames: ["node", "import"]
});
const cjsResolver = import_lib.ResolverFactory.createResolver({
	fileSystem,
	useSyncFileSystemCalls: true,
	extensions: [".js", ".cjs"],
	mainFields: ["main"],
	conditionNames: ["node", "require"]
});
const cssResolver = import_lib.ResolverFactory.createResolver({
	fileSystem,
	useSyncFileSystemCalls: true,
	extensions: [".css"],
	mainFields: ["style"],
	conditionNames: ["style"]
});
const resolveCache = expiringMap(3e4);
function maybeResolve(name) {
	let modpath = resolveCache.get(name);
	if (modpath === void 0) try {
		modpath = resolveJsFrom(fileURLToPath(import.meta.url), name);
		resolveCache.set(name, modpath);
	} catch {
		resolveCache.set(name, null);
		return null;
	}
	return modpath;
}
async function loadIfExists(name) {
	if (maybeResolve(name)) {
		let mod = await import(name);
		return mod.default ?? mod;
	}
	return null;
}
function resolveJsFrom(base, id) {
	try {
		return esmResolver.resolveSync({}, base, id) || id;
	} catch {
		return cjsResolver.resolveSync({}, base, id) || id;
	}
}
function resolveCssFrom(base, id) {
	return cssResolver.resolveSync({}, base, id) || id;
}
//#endregion
export { resolveJsFrom as a, resolveCssFrom as i, loadIfExists as n, maybeResolve as r, expiringMap as t };
