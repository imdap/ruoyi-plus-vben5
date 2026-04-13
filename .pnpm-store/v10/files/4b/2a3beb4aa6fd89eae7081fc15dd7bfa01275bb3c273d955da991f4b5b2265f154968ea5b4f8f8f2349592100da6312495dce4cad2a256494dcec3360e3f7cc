import { reduceAsyncForAsyncIterator } from './operators/index.js';
export class ImplAsyncSequence {
    i;
    constructor(i) {
        this.i = i;
    }
    get iter() {
        return typeof this.i === 'function' ? this.i() : this.i;
    }
    [Symbol.asyncIterator]() {
        return this.iter[Symbol.asyncIterator]();
    }
    reduceAsync(fnReduceAsync, initialValue) {
        return reduceAsyncForAsyncIterator(fnReduceAsync, initialValue)(this.iter);
    }
}
//# sourceMappingURL=ImplAsyncSequence.js.map