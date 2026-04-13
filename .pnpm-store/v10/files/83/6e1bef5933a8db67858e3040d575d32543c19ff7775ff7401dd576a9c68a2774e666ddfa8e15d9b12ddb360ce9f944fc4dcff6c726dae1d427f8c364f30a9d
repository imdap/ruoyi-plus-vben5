# Locko

Locko is a small package for implementing exclusive locking on critical sections of code.

## When to use

Use locko when you need to ensure that only one "thread" can be inside of a section of code at once. Consider the following code.

```js
const util = require('util');
const sleep = util.promisify(setTimeout);

async function print() {
  console.log('First');
  await sleep(100);
  console.log('Second');
  await sleep(100);
  console.log('Third');
}

print();
print();
print();
```

Without locko, this will print:

```
First
First
First
Second
Second
Second
Third
Third
Third
```

Now add locko:

```js
const util = require('util');
const sleep = util.promisify(setTimeout);

async function print() {
  await locko.lock('print');

  console.log('First');
  await sleep(100);
  console.log('Second');
  await sleep(100);
  console.log('Third');

  locko.unlock('print');
}

print();
print();
print();
```

This will now print:

```
First
Second
Third
First
Second
Third
First
Second
Third
```

## A real world example

It's often the case that you need to both read and write to a file, but without any kind of synchronization strategy, it's possible to read from a file while it's being written, or write to a file while it's being read, or have more than one writer writing at once. This is very likely to cause failures in an application.

Using locko you can ensure that no more than one operation is being executed on a file at any given time.

```js
async function readFile(filePath) {
  await locko.lock(filePath);

  return new Promise((fulfill, reject) => {
    fs.readFile(filePath, (err, content) => {
      locko.unlock(filePath);

      if (err) {
        reject(err);
      } else {
        fulfill(content);
      }
    }); 
  }); 
}

async function writeFile(filePath, content) {
  await locko.lock(filePath);

  return new Promise((fulfill, reject) => {
    fs.writeFile(filePath, content, (err) => {
      locko.unlock(filePath);

      if (err) {
        reject(err);
      } else {
        fulfill();
      }
    });
  });
}
```

## Best practices

If you never unlock the lock, it will remain locked forever. Therefore you should usually use a try-finally to ensure that the lock gets released. For example:

```js
async function print() {
  try {
    await locko.lock('print');

    console.log('First');
    await wait(100);
    console.log('Second');
    await wait(100);
    console.log('Third');
  } finally {
    locko.unlock('print');
  }
}
```

Alternatively, you can use the `doWithLock()` wrapper function that handles unlocking safely for you:

```js
async function print() {
  await locko.doWithLock('print', async () => {
    console.log('First');
    await wait(100);
    console.log('Second');
    await wait(100);
    console.log('Third');
  });
}
```
