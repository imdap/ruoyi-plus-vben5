async function traverseFileTree(files, isAccepted) {
	const flattenFileList = [];
	const progressFileList = [];
	files.forEach((file) => progressFileList.push(file.webkitGetAsEntry()));
	async function readDirectory(directory) {
		const dirReader = directory.createReader();
		const entries = [];
		while (true) {
			const results = await new Promise((resolve) => {
				dirReader.readEntries(resolve, () => resolve([]));
			});
			const n = results.length;
			if (!n) break;
			for (let i = 0; i < n; i++) entries.push(results[i]);
		}
		return entries;
	}
	async function readFile(item) {
		return new Promise((resolve) => {
			item.file((file) => {
				if (isAccepted(file)) {
					if (item.fullPath && !file.webkitRelativePath) {
						Object.defineProperties(file, { webkitRelativePath: { writable: true } });
						file.webkitRelativePath = item.fullPath.replace(/^\//, "");
						Object.defineProperties(file, { webkitRelativePath: { writable: false } });
					}
					resolve(file);
				} else resolve(null);
			});
		});
	}
	const _traverseFileTree = async (item, path) => {
		if (!item) return;
		item.path = path || "";
		if (item.isFile) {
			const file = await readFile(item);
			if (file) flattenFileList.push(file);
		} else if (item.isDirectory) {
			const entries = await readDirectory(item);
			progressFileList.push(...entries);
		}
	};
	let wipIndex = 0;
	while (wipIndex < progressFileList.length) {
		await _traverseFileTree(progressFileList[wipIndex]);
		wipIndex++;
	}
	return flattenFileList;
}
var traverseFileTree_default = traverseFileTree;
export { traverseFileTree_default as default };
