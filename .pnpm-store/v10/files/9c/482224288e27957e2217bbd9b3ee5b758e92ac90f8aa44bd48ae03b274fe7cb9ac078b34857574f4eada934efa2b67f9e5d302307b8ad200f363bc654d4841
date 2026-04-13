import { n as ArrayIsArray } from "./globals.js";
import { createRequire } from "node:module";
//#region src-js/bindings.js
const require = createRequire(import.meta.url);
new URL(".", import.meta.url).pathname;
const { readFileSync } = require("node:fs");
let nativeBinding = null;
const loadErrors = [], isMusl = () => {
	let musl = !1;
	return process.platform === "linux" && (musl = isMuslFromFilesystem(), musl === null && (musl = isMuslFromReport()), musl === null && (musl = isMuslFromChildProcess())), musl;
}, isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-"), isMuslFromFilesystem = () => {
	try {
		return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
	} catch {
		return null;
	}
}, isMuslFromReport = () => {
	let report = null;
	return typeof process.report?.getReport == "function" && (process.report.excludeNetwork = !0, report = process.report.getReport()), report ? report.header && report.header.glibcVersionRuntime ? !1 : !!(ArrayIsArray(report.sharedObjects) && report.sharedObjects.some(isFileMusl)) : null;
}, isMuslFromChildProcess = () => {
	try {
		return require("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
	} catch {
		return !1;
	}
};
function requireNative() {
	if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) try {
		return require(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
	} catch (err) {
		loadErrors.push(err);
	}
	else if (process.platform === "android") if (process.arch === "arm64") {
		try {
			return require("./oxlint.android-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-android-arm64"), bindingPackageVersion = require("@oxlint/binding-android-arm64/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm") {
		try {
			return require("./oxlint.android-arm-eabi.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-android-arm-eabi"), bindingPackageVersion = require("@oxlint/binding-android-arm-eabi/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on Android ${process.arch}`));
	else if (process.platform === "win32") if (process.arch === "x64") if (process.config?.variables?.shlib_suffix === "dll.a" || process.config?.variables?.node_target_type === "shared_library") {
		try {
			return require("./oxlint.win32-x64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-win32-x64-gnu"), bindingPackageVersion = require("@oxlint/binding-win32-x64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.win32-x64-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-win32-x64-msvc"), bindingPackageVersion = require("@oxlint/binding-win32-x64-msvc/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "ia32") {
		try {
			return require("./oxlint.win32-ia32-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-win32-ia32-msvc"), bindingPackageVersion = require("@oxlint/binding-win32-ia32-msvc/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm64") {
		try {
			return require("./oxlint.win32-arm64-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-win32-arm64-msvc"), bindingPackageVersion = require("@oxlint/binding-win32-arm64-msvc/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on Windows: ${process.arch}`));
	else if (process.platform === "darwin") {
		try {
			return require("./oxlint.darwin-universal.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-darwin-universal"), bindingPackageVersion = require("@oxlint/binding-darwin-universal/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
		if (process.arch === "x64") {
			try {
				return require("./oxlint.darwin-x64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				let binding = require("@oxlint/binding-darwin-x64"), bindingPackageVersion = require("@oxlint/binding-darwin-x64/package.json").version;
				if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm64") {
			try {
				return require("./oxlint.darwin-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				let binding = require("@oxlint/binding-darwin-arm64"), bindingPackageVersion = require("@oxlint/binding-darwin-arm64/package.json").version;
				if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on macOS: ${process.arch}`));
	} else if (process.platform === "freebsd") if (process.arch === "x64") {
		try {
			return require("./oxlint.freebsd-x64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-freebsd-x64"), bindingPackageVersion = require("@oxlint/binding-freebsd-x64/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm64") {
		try {
			return require("./oxlint.freebsd-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-freebsd-arm64"), bindingPackageVersion = require("@oxlint/binding-freebsd-arm64/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
	else if (process.platform === "linux") if (process.arch === "x64") if (isMusl()) {
		try {
			return require("./oxlint.linux-x64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-x64-musl"), bindingPackageVersion = require("@oxlint/binding-linux-x64-musl/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.linux-x64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-x64-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-x64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "arm64") if (isMusl()) {
		try {
			return require("./oxlint.linux-arm64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-arm64-musl"), bindingPackageVersion = require("@oxlint/binding-linux-arm64-musl/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.linux-arm64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-arm64-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-arm64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "arm") if (isMusl()) {
		try {
			return require("./oxlint.linux-arm-musleabihf.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-arm-musleabihf"), bindingPackageVersion = require("@oxlint/binding-linux-arm-musleabihf/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.linux-arm-gnueabihf.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-arm-gnueabihf"), bindingPackageVersion = require("@oxlint/binding-linux-arm-gnueabihf/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "loong64") if (isMusl()) {
		try {
			return require("./oxlint.linux-loong64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-loong64-musl"), bindingPackageVersion = require("@oxlint/binding-linux-loong64-musl/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.linux-loong64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-loong64-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-loong64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "riscv64") if (isMusl()) {
		try {
			return require("./oxlint.linux-riscv64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-riscv64-musl"), bindingPackageVersion = require("@oxlint/binding-linux-riscv64-musl/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("./oxlint.linux-riscv64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-riscv64-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-riscv64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "ppc64") {
		try {
			return require("./oxlint.linux-ppc64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-ppc64-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-ppc64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "s390x") {
		try {
			return require("./oxlint.linux-s390x-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-linux-s390x-gnu"), bindingPackageVersion = require("@oxlint/binding-linux-s390x-gnu/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on Linux: ${process.arch}`));
	else if (process.platform === "openharmony") if (process.arch === "arm64") {
		try {
			return require("./oxlint.openharmony-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-openharmony-arm64"), bindingPackageVersion = require("@oxlint/binding-openharmony-arm64/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "x64") {
		try {
			return require("./oxlint.openharmony-x64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-openharmony-x64"), bindingPackageVersion = require("@oxlint/binding-openharmony-x64/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm") {
		try {
			return require("./oxlint.openharmony-arm.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			let binding = require("@oxlint/binding-openharmony-arm"), bindingPackageVersion = require("@oxlint/binding-openharmony-arm/package.json").version;
			if (bindingPackageVersion !== "1.59.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw Error(`Native binding package version mismatch, expected 1.59.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
	else loadErrors.push(/* @__PURE__ */ Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
}
if (nativeBinding = requireNative(), !nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
	let wasiBinding = null, wasiBindingError = null;
	try {
		wasiBinding = require("./oxlint.wasi.cjs"), nativeBinding = wasiBinding;
	} catch (err) {
		process.env.NAPI_RS_FORCE_WASI && (wasiBindingError = err);
	}
	if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) try {
		wasiBinding = require("@oxlint/binding-wasm32-wasi"), nativeBinding = wasiBinding;
	} catch (err) {
		process.env.NAPI_RS_FORCE_WASI && (wasiBindingError ? wasiBindingError.cause = err : wasiBindingError = err, loadErrors.push(err));
	}
	if (process.env.NAPI_RS_FORCE_WASI === "error" && !wasiBinding) {
		let error = /* @__PURE__ */ Error("WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
		throw error.cause = wasiBindingError, error;
	}
}
if (!nativeBinding) throw loadErrors.length > 0 ? Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.", { cause: loadErrors.reduce((err, cur) => (cur.cause = err, cur)) }) : Error("Failed to load native binding");
const { Severity, applyFixes, getBufferOffset, lint, parseRawSync, rawTransferSupported } = nativeBinding;
//#endregion
export { rawTransferSupported as a, parseRawSync as i, getBufferOffset as n, lint as r, applyFixes as t };
