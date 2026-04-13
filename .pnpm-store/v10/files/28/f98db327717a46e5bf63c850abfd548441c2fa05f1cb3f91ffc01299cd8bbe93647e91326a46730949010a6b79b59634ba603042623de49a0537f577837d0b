Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let _v_c_util = require("@v-c/util");
var attrAccept_default = (file, acceptedFiles) => {
	if (file && acceptedFiles) {
		const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
		const fileName = file.name || "";
		const mimeType = file.type || "";
		const baseMimeType = mimeType.replace(/\/.*$/, "");
		return acceptedFilesArray.some((type) => {
			const validType = type.trim();
			if (/^\*(\/\*)?$/.test(type)) return true;
			if (validType.charAt(0) === ".") {
				const lowerFileName = fileName.toLowerCase();
				const lowerType = validType.toLowerCase();
				let affixList = [lowerType];
				if (lowerType === ".jpg" || lowerType === ".jpeg") affixList = [".jpg", ".jpeg"];
				return affixList.some((affix) => lowerFileName.endsWith(affix));
			}
			if (/\/\*$/.test(validType)) return baseMimeType === validType.replace(/\/.*$/, "");
			if (mimeType === validType) return true;
			if (/^\w+$/.test(validType)) {
				(0, _v_c_util.warning)(false, `Upload takes an invalidate 'accept' type '${validType}'.Skip for check.`);
				return true;
			}
			return false;
		});
	}
	return true;
};
exports.default = attrAccept_default;
