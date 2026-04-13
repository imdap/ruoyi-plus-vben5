# GenSequence

[![Coverage Status](https://coveralls.io/repos/github/streetsidesoftware/GenSequence/badge.svg?branch=main)](https://coveralls.io/github/streetsidesoftware/GenSequence?branch=main)

Small library to simplify working with Generators and Iterators in Javascript / Typescript

Javascript [Iterators and Generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators)
are very exciting and provide some powerful new ways to solve programming problems.

The purpose of this library is to make using the results of a generator function easier.
It is not intended as a replacement for arrays and the convenient `[...genFn()]` notation.
GenSequence is useful for cases where you might not want an array of all possible values.
GenSequence deals efficiently with large sequences because only one element at a time is evaluated.
Intermediate arrays are not created, saving memory and cpu cycles.

## Installation

```sh
npm install -S gensequence
```

## Usage

```ts
import { genSequence } from 'gensequence';
```

## Examples

### Fibonacci

The Fibonacci sequence can be very simply expressed using a generator. Yet using the result of a generator can be a bit convoluted.
GenSequence provides a wrapper to add familiar functionality similar to arrays.

<!--- @@inject: ./src/samples/fibonacci.ts --->

```ts
import { genSequence, Sequence } from '../index.js';

export function fibonacci(): Sequence<number> {
  function* fib() {
    let [a, b] = [0, 1];
    while (true) {
      yield b;
      [a, b] = [b, a + b];
    }
  }
  return genSequence(fib());
}

export function fib(n: number) {
  return fibonacci()
    .take(n) // Take n from the fibonacci sequence
    .toArray(); // Convert it into an array
}

export const fib5 = fib(5); // [1, 1, 2, 3, 5]
```

<!--- @@inject-end: ./src/samples/fibonacci.ts --->

### RegEx Match

Regular expressions are wonderfully powerful. Yet, working with the results can sometimes be a bit of a pain.

<!--- @@inject: ./src/samples/match.ts --->

```ts
import { genSequence } from '../GenSequence.js';

function matchWords(text: string) {
  return genSequence(text.matchAll(/\w+/g)).map((a) => a[0]);
}

export function toSetOfWords(text: string) {
  return new Set(matchWords(text));
}

export const text = 'Some long bit of text with many words, duplicate words...';
export const setOfWords = toSetOfWords(text);
// Walk through the set of words and pull out the 4 letter one.
export const setOf4LetterWords = new Set(genSequence(setOfWords).filter((a) => a.length === 4));
```

<!--- @@inject-end: ./src/samples/match.ts --->

## Reference

- `genSequence(Iterable|Array|()=>Iterable)` -- generate a new Iterable from an Iterable, Array or function with the following functions.

### Filters

- `.filter(fn)` -- just like array.filter, filters the sequence
- `.skip(n)` -- skip _n_ entries in the sequence
- `.take(n)` -- take the next _n_ entries in the sequence.

### Extenders

- `.concat(iterable)` -- this will extend the current sequence with the values from _iterable_
- `.concatMap(fnMap)` -- this is used to flatten the result of a map function.

### Mappers

- `.combine(fnCombiner, iterable)` -- is used to combine values from two different lists.
- `.map(fn)` -- just like array.map, allows you to convert the values in a sequence.
- `.pipe(...operatorFns)` -- pipe any amount of operators in sequence.
- `.scan(fn, init?)` -- similar to reduce, but returns a sequence of all the results of fn.

### Reducers

- `.all(fn)` -- true if all values in the sequence return true for _fn(value)_ or the sequence is empty.
- `.any(fn)` -- true if any value in the sequence exists where _fn(value)_ returns true.
- `.count()` -- return the number of values in the sequence.
- `.first()` -- return the next value in the sequence.
- `.first(fn)` -- return the next value in the sequence where _fn(value)_ return true.
- `.forEach(fn)` -- apply _fn(value, index)_ to all values.
- `.max()` -- return the largest value in the sequence.
- `.max(fn)` -- return the largest value of _fn(value)_ in the sequence.
- `.min()` -- return the smallest value in the sequence.
- `.min(fn)` -- return the smallest value of _fn(value)_ in the sequence.
- `.reduce(fn, init?)` -- just like array.reduce, reduces the sequence into a single result.
- `.reduceAsync(fn, init?)` -- just like array.reduce, reduces promises into the sequence into a single result chaining the promises, fn/init can be async or not, it will work, the previousValue, and currentValue will never be a promise.
- `.reduceToSequence(fn, init)` -- return a sequence of values that _fn_ creates from looking at all the values and the initial sequence.

### Cast

- `.toArray()` -- convert the sequence into an array. This is the same as `[...iterable]`.
- `.toIterable()` -- Casts a Sequence into an IterableIterator - used in cases where type checking is too strict.
