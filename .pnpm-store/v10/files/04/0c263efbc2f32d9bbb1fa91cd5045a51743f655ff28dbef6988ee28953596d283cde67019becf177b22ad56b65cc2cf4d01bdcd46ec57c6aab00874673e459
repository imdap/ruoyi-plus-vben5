//#region src/upload/utils.ts
function file2Obj(file) {
	return {
		...file,
		lastModified: file.lastModified,
		lastModifiedDate: file.lastModifiedDate,
		name: file.name,
		size: file.size,
		type: file.type,
		uid: file.uid,
		percent: 0,
		originFileObj: file
	};
}
/** Upload fileList. Replace file if exist or just push into it. */
function updateFileList(file, fileList) {
	const nextFileList = [...fileList];
	const fileIndex = nextFileList.findIndex(({ uid }) => uid === file.uid);
	if (fileIndex === -1) nextFileList.push(file);
	else nextFileList[fileIndex] = file;
	return nextFileList;
}
function getFileItem(file, fileList) {
	const matchKey = file.uid !== void 0 ? "uid" : "name";
	return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}
function removeFileItem(file, fileList) {
	const matchKey = file.uid !== void 0 ? "uid" : "name";
	const removed = fileList.filter((item) => item[matchKey] !== file[matchKey]);
	if (removed.length === fileList.length) return null;
	return removed;
}
function extname(url = "") {
	const temp = url.split("/");
	const filenameWithoutSuffix = temp[temp.length - 1].split(/#|\?/)[0];
	return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
}
const isImageFileType = (type) => type.indexOf("image/") === 0;
function isImageUrl(file) {
	if (file.type && !file.thumbUrl) return isImageFileType(file.type);
	const url = file.thumbUrl || file.url || "";
	const extension = extname(url);
	if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)) return true;
	if (url.startsWith("data:")) return false;
	if (extension) return false;
	return true;
}
const MEASURE_SIZE = 200;
function previewImage(file) {
	return new Promise((resolve) => {
		if (!file.type || !isImageFileType(file.type)) {
			resolve("");
			return;
		}
		const canvas = document.createElement("canvas");
		canvas.width = MEASURE_SIZE;
		canvas.height = MEASURE_SIZE;
		canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
		document.body.appendChild(canvas);
		const ctx = canvas.getContext("2d");
		const img = new Image();
		img.onload = () => {
			const { width, height } = img;
			let drawWidth = MEASURE_SIZE;
			let drawHeight = MEASURE_SIZE;
			let offsetX = 0;
			let offsetY = 0;
			if (width > height) {
				drawHeight = height * (MEASURE_SIZE / width);
				offsetY = -(drawHeight - drawWidth) / 2;
			} else {
				drawWidth = width * (MEASURE_SIZE / height);
				offsetX = -(drawWidth - drawHeight) / 2;
			}
			ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
			const dataURL = canvas.toDataURL();
			document.body.removeChild(canvas);
			window.URL.revokeObjectURL(img.src);
			resolve(dataURL);
		};
		img.crossOrigin = "anonymous";
		if (file.type.startsWith("image/svg+xml")) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result && typeof reader.result === "string") img.src = reader.result;
			};
			reader.readAsDataURL(file);
		} else if (file.type.startsWith("image/gif")) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) resolve(reader.result);
			};
			reader.readAsDataURL(file);
		} else img.src = window.URL.createObjectURL(file);
	});
}

//#endregion
export { file2Obj, getFileItem, isImageUrl, previewImage, removeFileItem, updateFileList };