import { compareByDepth } from "./compare-by-depth.mjs";
import { addUniqueItem, removeItem } from "../../../../../../../motion-utils@12.24.10/external/motion-utils/dist/es/array.mjs";
class FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
}
export {
  FlatTree
};
