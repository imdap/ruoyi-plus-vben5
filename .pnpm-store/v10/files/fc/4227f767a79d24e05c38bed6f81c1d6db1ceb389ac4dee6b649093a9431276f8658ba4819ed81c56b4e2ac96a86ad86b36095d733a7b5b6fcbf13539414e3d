import { warning } from "@v-c/util";
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
				warning(false, `Upload takes an invalidate 'accept' type '${validType}'.Skip for check.`);
				return true;
			}
			return false;
		});
	}
	return true;
};
export { attrAccept_default as default };
