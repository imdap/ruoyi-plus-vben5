import { AsyncLazyIterable, AsyncSequence, ThenArg } from './types.js';
export declare class ImplAsyncSequence<T> implements AsyncSequence<T> {
    private i;
    constructor(i: AsyncLazyIterable<T>);
    private get iter();
    [Symbol.asyncIterator](): AsyncIterableIterator<T> | AsyncIterator<T, any, any>;
    reduceAsync<U>(fnReduceAsync: (previousValue: ThenArg<U>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<U> | Promise<ThenArg<U>>, initialValue?: ThenArg<U>): Promise<ThenArg<U>>;
}
