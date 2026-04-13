import { Pair, isAlias, parseDocument, visit } from "yaml";

//#region src/index.ts
/**
* Parse pnpm workspace yaml content, and return an object to modify the content
* while preserving the comments, anchor, and alias.
*/
function parsePnpmWorkspaceYaml(content) {
	let document = parseDocument(content);
	let hasChanged = false;
	function setContent(newContent) {
		content = newContent;
		document = parseDocument(content);
		hasChanged = false;
	}
	function setPath(path, value) {
		let map = path.length === 1 ? document.contents : document.getIn(path.slice(0, -1));
		if (!map) {
			map = document.createNode({});
			document.setIn(path.slice(0, -1), map);
		}
		const key = path[path.length - 1];
		let pair = map.items.find((i) => typeof i.key === "string" ? i.key === key : i.key.value === key);
		const keys = map.items.map((i) => typeof i.key === "string" ? i.key : String(i.key.value));
		if (!pair) {
			let index = 0;
			for (; index < keys.length; index++) if (keys[index].localeCompare(key) > 0) break;
			pair = new Pair(key, value);
			map.items.splice(index, 0, pair);
			hasChanged = true;
		} else if (isAlias(pair.value)) {
			const alias = findAnchor(document, pair.value);
			if (alias) {
				if (alias.value !== value) {
					alias.value = value;
					hasChanged = true;
				}
			}
		} else if (!pair.value || typeof pair.value === "string") {
			if (pair.value !== value) {
				pair.value = value;
				hasChanged = true;
			}
		} else if (pair.value.value !== value) {
			pair.value.value = value;
			hasChanged = true;
		}
	}
	function hasSpecifierConflicts(catalogName, packageName, specifier) {
		const data = document.toJSON() || {};
		const existingSpecifier = catalogName === "default" ? data.catalog?.[packageName] : data.catalogs?.[catalogName]?.[packageName];
		if (existingSpecifier === specifier) return {
			conflicts: false,
			newCatalogName: catalogName,
			existingSpecifier
		};
		if (existingSpecifier) {
			const versionSuffix = normalizeCatalogName(specifier);
			return {
				conflicts: true,
				existingSpecifier,
				newCatalogName: catalogName === "default" ? `conflicts_${packageName}_${versionSuffix}` : `conflicts_${catalogName}_${versionSuffix}`
			};
		}
		return {
			conflicts: false,
			newCatalogName: catalogName
		};
	}
	function setPackageNoConflicts(catalogName, packageName, specifier) {
		const { newCatalogName } = hasSpecifierConflicts(catalogName, packageName, specifier);
		setPackage(newCatalogName, packageName, specifier);
	}
	function setPackage(catalogName, packageName, specifier) {
		const useCatalogsDefault = document.toJSON()?.catalogs?.default !== void 0;
		if (catalogName === "default" && !useCatalogsDefault) setPath(["catalog", packageName], specifier);
		else setPath([
			"catalogs",
			catalogName,
			packageName
		], specifier);
	}
	function getPackageCatalogs(packageName) {
		const catalogs = [];
		const data = document.toJSON() || {};
		if (data.catalogs) {
			for (const catalog of Object.keys(data.catalogs)) if (data.catalogs[catalog]?.[packageName]) catalogs.push(catalog);
		}
		if (data.catalog) {
			if (data.catalog[packageName]) catalogs.push("default");
		}
		return catalogs;
	}
	return {
		getDocument() {
			return document;
		},
		setContent,
		hasChanged: () => hasChanged,
		toJSON: () => document.toJSON(),
		toString: (options) => {
			const singleQuote = content.split("'").length >= content.split("\"").length;
			return document.toString({
				singleQuote,
				...options
			});
		},
		setPath,
		setPackage,
		setPackageNoConflicts,
		getPackageCatalogs,
		hasSpecifierConflicts
	};
}
function findAnchor(doc, alias) {
	let anchor;
	visit(doc, { Scalar: (_key, scalar, _path) => {
		if (scalar.anchor === alias.source && typeof scalar.value === "string") anchor = scalar;
	} });
	return anchor;
}
function normalizeCatalogName(name) {
	return name.replace(/\^/g, "h").replace(/~/g, "t").replace(/\./g, "_").replace(/</g, "l").replace(/>/g, "g").replace(/=/g, "e").replace(/\*/g, "s").replace(/@/g, "a").replace(/\|/g, "p").replace(/&/g, "n").replace(/-/g, "m").replace(/\+/g, "u").replace(/\s/g, "_");
}

//#endregion
export { parsePnpmWorkspaceYaml };