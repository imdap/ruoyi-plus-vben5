function hasClass(node, className) {
	if (node.classList) return node.classList.contains(className);
	return ` ${node.className} `.includes(` ${className} `);
}
function addClass(node, className) {
	if (node.classList) node.classList.add(className);
	else if (!hasClass(node, className)) node.className = `${node.className} ${className}`;
}
function removeClass(node, className) {
	if (node.classList) node.classList.remove(className);
	else if (hasClass(node, className)) node.className = ` ${node.className} `.replace(` ${className} `, " ");
}
export { addClass, hasClass, removeClass };
