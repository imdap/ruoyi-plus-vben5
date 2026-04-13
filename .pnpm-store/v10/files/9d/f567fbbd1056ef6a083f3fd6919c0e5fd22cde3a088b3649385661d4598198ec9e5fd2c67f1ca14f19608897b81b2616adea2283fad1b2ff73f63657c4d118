function contains(root, n) {
	if (!root) return false;
	if (root.contains) return root.contains(n);
	let node = n;
	while (node) {
		if (node === root) return true;
		node = node.parentNode;
	}
	return false;
}
export { contains as default };
