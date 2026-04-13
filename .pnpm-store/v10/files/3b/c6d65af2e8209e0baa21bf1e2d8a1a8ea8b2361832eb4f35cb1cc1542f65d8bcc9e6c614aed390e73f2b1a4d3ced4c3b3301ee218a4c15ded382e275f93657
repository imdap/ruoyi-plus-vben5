export default {
    parse: {
        prelude() {
            return this.createSingleNodeList(
                this.LayerList()
            );
        },
        block(nested = false, { allowNestedRules = false } = {}) {
            return this.Block(nested, { allowNestedRules });
        }
    }
};
