import Tree_default from "./Tree.js";
import DirectoryTree_default from "./DirectoryTree.js";
import { TreeNode } from "@v-c/tree";

//#region src/tree/index.tsx
const Tree = Tree_default;
Tree.DirectoryTree = DirectoryTree_default;
Tree.TreeNode = TreeNode;
Tree.install = (app) => {
	app.component(Tree.name, Tree);
	app.component(DirectoryTree_default.name, DirectoryTree_default);
	app.component("ATreeOption", TreeNode);
};
var tree_default = Tree;

//#endregion
export { DirectoryTree_default as DirectoryTree, tree_default as default };