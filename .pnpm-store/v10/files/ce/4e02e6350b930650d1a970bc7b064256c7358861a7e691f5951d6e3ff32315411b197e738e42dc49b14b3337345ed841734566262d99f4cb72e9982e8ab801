# Sver

[![Build Status](https://travis-ci.org/guybedford/sver.svg?branch=master)](https://travis-ci.org/guybedford/sver)

Another Semver utility library. Supports NodeJS 6+ only. No maintenance guarantees.

This is the semver library used by jspm.

```
npm install sver
```

```js
const { Semver, SemverRange } = require('sver');

// Static usage:
SemverRange.match('^1.2.3', '1.2.4'); // true

// Class usage:
let range = new SemverRange('^1.2.3');
let version = new Semver('1.2.4');
version.matches(range);               // true
range.has(version);                   // true
```

### Range support

Supports the following range types:

#### Simple ranges

* `*`: Wildcard range
* `MAJOR`: Match exact major
* `MAJOR.MINOR` Match exact major and minor
* `MAJOR.MINOR.PATCH[-PRE]` Match exact semver
* `~MAJOR.MINOR.PATCH[-PRE]`: Match patch bumps
* `^MAJOR.MINOR.PATCH[-PRE]`: Match minor and patch bumps

#### Comparator ranges

* `>=MAJOR.MINOR.PATCH[-PRE]`: Lower bound (inclusive)
* `>MAJOR.MINOR.PATCH[-PRE]`: Lower bound (exclusive)
* `<=MAJOR.MINOR.PATCH[-PRE]`: Upper bound (inclusive)
* `<MAJOR.MINOR.PATCH[-PRE]`: Upper bound (exclusive)

Partial versions are supported with comparators (e.g., `>=1.2`, `<2`).

#### Intersection ranges

Space-separated comparators are intersected (AND):

```js
let range = new SemverRange('>=1.2.3 <2.0.0');
range.has('1.5.0');  // true
range.has('2.0.0');  // false
```

#### Union ranges

`||`-separated ranges are unioned (OR):

```js
let range = new SemverRange('^1.0.0 || ^2.0.0');
range.has('1.5.0');  // true
range.has('2.5.0');  // true
range.has('3.0.0');  // false
```

#### Hyphen ranges

```js
let range = new SemverRange('1.2.3 - 2.3.4');
range.has('1.5.0');  // true
range.has('2.3.5');  // false
```

#### X-Ranges

`x`, `X`, and `*` are treated as wildcards in version positions:

```js
new SemverRange('1.2.x');  // equivalent to 1.2
new SemverRange('1.x');    // equivalent to 1
```

Invalid ranges will fallback to being detected as exact string matches.

### Prerelease Matching

By default, as per convention, ranges like `^1.2.3-alpha` only match prerelease ranges on the same patch (`1.2.3-alpha.4`), but
not prerelease ranges from further patches (`1.3.4-alpha`).

For intersection ranges, the prerelease rule is applied at the set level: a prerelease version matches if at least one member of the intersection has a prerelease on the same `[major, minor, patch]` tuple.

To alter this matching, a third boolean argument can be provided to the match function to support these unstable matches:

```js
SemverRange.match('^1.2.3', '1.5.6-beta');       // false
SemverRange.match('^1.2.3', '1.5.6-beta', true); // true
```

### Best Version Match

```js
let versions = ['1.2.3', '1.3.4-alpha', '1.3.4-alpha.1', '1.3.4-beta'];
let range = new SemverRange('*');

let bestStableMatch = range.bestMatch(versions);
bestStableMatch.toString();                     // 1.2.3

let bestUnstableMatch = range.bestMatch(versions, true);
bestUnstableMatch.toString();                   // 1.3.4-beta
```

### Version and Range Sorting

```js
let versions = ['2.4.5', '2.3.4-alpha', '1.2.3', '2.3.4-alpha.2'];
let ranges = ['^1.2.3', '1.2', '2.3.4'];

versions.sort(Semver.compare);   // [1.2.3, 2.3.4-alpha, 2.3.4-alpha.2, 2.4.5]
ranges.sort(SemverRange.compare) // [1.2, ^1.2.3, 2.3.4]
```

### Semver and Semver Range Validation

When a version string fails semver validation it falls back to being treated as a tag, still as a `Semver` instance.

For example:

```js
let version = new Semver('x.y.z');
version.tag === 'x.y.z';             // true

version = new Semver('^1.2.3');
version.major === undefined;         // true
version.tag === '^1.2.3';            // true
```

For validation, rather use `Semver.isValid` and `SemverRange.isValid`:

```js
Semver.isValid('x.y.z');             // false
Semver.isValid('^1.2.3');            // false
SemverRange.isValid('^1.2.3');       // true
SemverRange.isValid('>=1.0.0 <2.0.0'); // true
SemverRange.isValid('^1.0.0 || ^2.0.0'); // true
```

## API

### Semver

Static methods:

* `Semver.isValid(version: string): boolean`: Whether the given string is a valid semver.
* `Semver.compare(v1: Semver|string, v2: Semver|string): number`: 1 if v1 > v2, -1 if v1 < v2, 0 if equal.

For a given Semver instance `version = new Semver('X.Y.Z')`,

* `version.major`: The major version number.
* `version.minor`: The minor version number.
* `version.patch`: The patch version number.
* `version.pre`: The prerelease identifer, as an array of strings (`.`-separated).
* `version.build`: The build identifier, as a string.
* `version.tag`: If not a valid semver, the full tag string.
* `version.gt(otherVersion: Semver|string): bool`: Whether this version is greater than the other version.
* `version.lt(otherVersion: Semver|string): bool`: Whether this version is less than the other version.
* `version.eq(otherVerion: Semver|string): bool`: Whether this version equals the other version.
* `version.matches(range: SemverRange|string, unstable?: bool): bool`: Whether this version matches the given version range.
* `version.toString(): string`: Convert the version back to a string.

### SemverRange

Static methods:

* `SemverRange.match(range: SemverRange|string, version: Semver|string, unstable = false): bool`: Whether the version matches the range.
* `SemverRange.isValid(range: string): bool`: Whether the given range string is a valid semver range.
* `SemverRange.compare(r1: SemverRange|string, r2: SemverRange|string): number`: 1 if r1 > r2, -1 if r1 < r2, 0 if equal.

For a given SemverRange instance `range = new SemverRange('^X.Y.Z')`,

* `range.type: string`: Returns `'wildcard'`, `'major'`, `'stable'`, `'exact'`, `'lower_bound'`, `'upper_bound'`, `'intersection'`, or `'union'`.
* `range.version: Semver`: The `Semver` instance for simple/bound ranges. `undefined` for intersection/union.
* `range.rangeSet: SemverRange[]`: The child ranges for intersection/union types. `undefined` for simple/bound types.
* `range.boundInclusive: boolean`: Whether the bound is inclusive (`>=`/`<=`) or exclusive (`>`/`<`). Only for bound types.
* `range.isExact: bool`: True if the range is an exact version only.
* `range.isStable: bool`: True if the range is a stable version range.
* `range.isMajor: bool`: True if the range is a major version range.
* `range.isWildcard: bool`: True if the range is the wildcard version range.
* `range.isLowerBound: bool`: True if the range is a lower bound (`>=` or `>`).
* `range.isUpperBound: bool`: True if the range is an upper bound (`<=` or `<`).
* `range.isIntersection: bool`: True if the range is an intersection of ranges.
* `range.isUnion: bool`: True if the range is a union of ranges.
* `range.gt(otherRange: SemverRange|string): bool`: Whether the range is greater than the other range.
* `range.lt(otherRange: SemverRange|string): bool`: Whether the range is less than the other range.
* `range.eq(otherRange: SemverRange|string): bool`: Whether the range is exactly the same as the other range.
* `range.has(version: Semver|string, unstable = false): bool`: Whether the range includes the given version.
* `range.contains(otherRange: SemverRange|string): bool`: Whether the range fully contains the other range.
* `range.intersect(otherRange: SemverRange|string): SemverRange|undefined`: The intersection range, if any.
* `range.bestMatch(versions: (Semver|string)[], unstable = false): Semver|undefined`: The best matching version from the list.
* `range.toString()`: Convert the range back to a string.

## License

MIT
