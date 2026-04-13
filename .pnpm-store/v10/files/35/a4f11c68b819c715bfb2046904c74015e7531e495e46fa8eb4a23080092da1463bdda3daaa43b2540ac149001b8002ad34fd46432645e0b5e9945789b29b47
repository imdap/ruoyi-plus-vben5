'use strict';

const shortSemverRegEx = /^([~\^])?(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/;
const semverRegEx = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(\+[\da-z-]+)?$/i;
exports.semverRegEx = semverRegEx;
exports.shortSemverRegEx = shortSemverRegEx;

const MAJOR = Symbol('major');
const MINOR = Symbol('minor');
const PATCH = Symbol('patch');
const PRE = Symbol('pre');
const BUILD = Symbol('build');
const TAG = Symbol('tag');

let numRegEx = /^\d+$/;
class Semver {
  constructor (version) {
    let semver = version.match(semverRegEx);
    if (!semver) {
      this[TAG] = version;
      return;
    }
    this[MAJOR] = parseInt(semver[1], 10);
    this[MINOR] = parseInt(semver[2], 10);
    this[PATCH] = parseInt(semver[3], 10);
    this[PRE] = semver[4] && semver[4].split('.');
    this[BUILD] = semver[5];
  }
  get major () {
    return this[MAJOR];
  }
  get minor () {
    return this[MINOR];
  }
  get patch () {
    return this[PATCH];
  }
  get pre () {
    return this[PRE];
  }
  get build () {
    return this[BUILD];
  }
  get tag () {
    return this[TAG];
  }
  gt (version) {
    return Semver.compare(this, version) === 1;
  }
  lt (version) {
    return Semver.compare(this, version) === -1;
  }
  eq (version) {
    if (!(version instanceof Semver))
      version = new Semver(version);

    if (this[TAG] && version[TAG])
      return this[TAG] === version[TAG];
    if (this[TAG] || version[TAG])
      return false;
    if (this[MAJOR] !== version[MAJOR])
      return false;
    if (this[MINOR] !== version[MINOR])
      return false;
    if (this[PATCH] !== version[PATCH])
      return false;
    if (this[PRE] === undefined && version[PRE] === undefined)
      return true;
    if (this[PRE] === undefined || version[PRE] === undefined)
      return false;
    if (this[PRE].length !== version[PRE].length)
      return false;
    for (let i = 0; i < this[PRE].length; i++) {
      if (this[PRE][i] !== version[PRE][i])
        return false;
    }
    return this[BUILD] === version[BUILD];
  }
  matches (range, unstable = false) {
    if (!(range instanceof SemverRange))
      range = new SemverRange(range);
    return range.has(this, unstable);
  }
  toString () {
    if (this[TAG])
      return this[TAG];
    return this[MAJOR] + '.' + this[MINOR] + '.' + this[PATCH] + (this[PRE] ? '-' + this[PRE].join('.') : '') + (this[BUILD] ? this[BUILD] : '');
  }
  toJSON() {
    return this.toString();
  }
  static isValid (version) {
    let semver = version.match(semverRegEx);
    return semver && semver[2] !== undefined && semver[3] !== undefined;
  }
  static compare (v1, v2) {
    if (!(v1 instanceof Semver))
      v1 = new Semver(v1);
    if (!(v2 instanceof Semver))
      v2 = new Semver(v2);

    // not semvers - tags have equal precedence
    if (v1[TAG] && v2[TAG])
      return 0;
    // semver beats tag version
    if (v1[TAG])
      return -1;
    if (v2[TAG])
      return 1;
    // compare version numbers
    if (v1[MAJOR] !== v2[MAJOR])
      return v1[MAJOR] > v2[MAJOR] ? 1 : -1;
    if (v1[MINOR] !== v2[MINOR])
      return v1[MINOR] > v2[MINOR] ? 1 : -1;
    if (v1[PATCH] !== v2[PATCH])
      return v1[PATCH] > v2[PATCH] ? 1 : -1;
    if (!v1[PRE] && !v2[PRE])
      return 0;
    if (!v1[PRE])
      return 1;
    if (!v2[PRE])
      return -1;
    // prerelease comparison
    return prereleaseCompare(v1[PRE], v2[PRE]);
  }
}
exports.Semver = Semver;

function prereleaseCompare (v1Pre, v2Pre) {
  for (let i = 0, l = Math.min(v1Pre.length, v2Pre.length); i < l; i++) {
    if (v1Pre[i] !== v2Pre[i]) {
      let isNum1 = v1Pre[i].match(numRegEx);
      let isNum2 = v2Pre[i].match(numRegEx);
      // numeric has lower precedence
      if (isNum1 && !isNum2)
        return -1;
      if (isNum2 && !isNum1)
        return 1;
      // compare parts
      if (isNum1 && isNum2)
        return parseInt(v1Pre[i], 10) > parseInt(v2Pre[i], 10) ? 1 : -1;
      else
        return v1Pre[i] > v2Pre[i] ? 1 : -1;
    }
  }
  if (v1Pre.length === v2Pre.length)
    return 0;
  // more pre-release fields win if equal
  return v1Pre.length > v2Pre.length ? 1 : -1;

}

const WILDCARD_RANGE = 0;
const MAJOR_RANGE = 1;
const STABLE_RANGE = 2;
const EXACT_RANGE = 3;
const LOWER_BOUND = 4;
const UPPER_BOUND = 5;
const INTERSECTION_RANGE = 6;
const UNION_RANGE = 7;

const TYPE = Symbol('type');
const VERSION = Symbol('version');
const RANGE_SET = Symbol('rangeSet');
const BOUND_INCLUSIVE = Symbol('boundInclusive');

const comparatorRegEx = /^(>=|<=|>|<|=)\s*(.+)$/;
const partialRegEx = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(\+[\da-z-]+)?)?)?$/i;

function effectiveVersion (range) {
  if (range[VERSION]) return range[VERSION];
  if (range[RANGE_SET] && range[RANGE_SET].length > 0)
    return effectiveVersion(range[RANGE_SET][0]);
  return null;
}

function effectiveUpperBound (range) {
  let type = range[TYPE];
  if (type === WILDCARD_RANGE || type === LOWER_BOUND)
    return null; // unbounded
  if (type === MAJOR_RANGE)
    return new Semver((range[VERSION][MAJOR] + 1) + '.0.0');
  if (type === STABLE_RANGE)
    return new Semver(range[VERSION][MAJOR] + '.' + (range[VERSION][MINOR] + 1) + '.0');
  if (type === EXACT_RANGE || type === UPPER_BOUND)
    return range[VERSION];
  if (type === INTERSECTION_RANGE) {
    let min = null;
    for (let r of range[RANGE_SET]) {
      let ub = effectiveUpperBound(r);
      if (ub !== null && (min === null || Semver.compare(ub, min) < 0))
        min = ub;
    }
    return min;
  }
  if (type === UNION_RANGE) {
    let max = null;
    for (let r of range[RANGE_SET]) {
      let ub = effectiveUpperBound(r);
      if (ub === null) return null; // one member is unbounded
      if (max === null || Semver.compare(ub, max) > 0)
        max = ub;
    }
    return max;
  }
  return range[VERSION] || null;
}

function createUpperBoundFromHyphen (verStr) {
  let fullVer = verStr.match(semverRegEx);
  if (fullVer) {
    // Full version: <=B
    return new SemverRange('<=' + verStr);
  }
  let partialMatch = verStr.match(partialRegEx);
  if (partialMatch) {
    let major = parseInt(partialMatch[1], 10);
    let hasMinor = partialMatch[2] !== undefined;
    let minor = hasMinor ? parseInt(partialMatch[2], 10) : undefined;
    if (hasMinor) {
      return new SemverRange('<' + major + '.' + (minor + 1) + '.0');
    } else {
      return new SemverRange('<' + (major + 1) + '.0.0');
    }
  }
  return new SemverRange('<=' + verStr);
}

class SemverRange {
  constructor (versionRange) {
    versionRange = versionRange.trim();

    // Normalize: collapse spaces between comparison operators and version numbers
    // so ">= 1.2.3" is treated the same as ">=1.2.3"
    versionRange = versionRange.replace(/(>=|<=|>|<|=)\s+/g, '$1');

    // Union: split by ||
    if (versionRange.includes('||')) {
      let parts = versionRange.split('||').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        this[TYPE] = UNION_RANGE;
        this[RANGE_SET] = parts.map(p => new SemverRange(p));
        return;
      }
      if (parts.length === 1)
        versionRange = parts[0];
      else {
        this[TYPE] = WILDCARD_RANGE;
        return;
      }
    }

    // Hyphen range: A - B (spaces around -)
    let hyphenMatch = versionRange.match(/^(\S+)\s+-\s+(\S+)$/);
    if (hyphenMatch) {
      this[TYPE] = INTERSECTION_RANGE;
      this[RANGE_SET] = [
        new SemverRange('>=' + hyphenMatch[1]),
        createUpperBoundFromHyphen(hyphenMatch[2])
      ];
      return;
    }

    // Space-separated comparators: intersection
    let tokens = versionRange.split(/\s+/);
    if (tokens.length > 1) {
      this[TYPE] = INTERSECTION_RANGE;
      this[RANGE_SET] = tokens.map(t => new SemverRange(t));
      return;
    }

    // Normalize x-ranges: 1.2.x → 1.2, 1.x → 1, x → *
    versionRange = versionRange.replace(/\.[xX*]/g, '');
    if (/^[xX*]$/.test(versionRange) || versionRange === '') {
      versionRange = '*';
    }

    // === Existing simple range parsing ===

    if (versionRange === '*' || versionRange === '') {
      this[TYPE] = WILDCARD_RANGE;
      return;
    }
    let shortSemver = versionRange.match(shortSemverRegEx);
    if (shortSemver) {
      if (shortSemver[1])
        versionRange = versionRange.substr(1);
      if (shortSemver[3] === undefined) {
        // ^, ~ mean the same thing for a single major
        this[VERSION] = new Semver(versionRange + '.0.0');
        this[TYPE] = MAJOR_RANGE;
      }
      else {
        this[VERSION] = new Semver(versionRange + '.0');
        // ^ only becomes major range for major > 0
        if (shortSemver[1] === '^' && shortSemver[2] !== '0')
          this[TYPE] = MAJOR_RANGE;
        else
          this[TYPE] = STABLE_RANGE;
      }
      // empty pre array === support prerelease ranges
      this[VERSION][PRE] = this[VERSION][PRE] || [];
      return;
    }
    // forces hat on 0.x versions
    if (versionRange.startsWith('^^')) {
      this[VERSION] = new Semver(versionRange.substr(2));
      this[TYPE] = MAJOR_RANGE;
    }
    else if (versionRange[0] === '^') {
      this[VERSION] = new Semver(versionRange.substr(1));
      if (this[VERSION][MAJOR] === 0) {
        if (this[VERSION][MINOR] === 0)
          this[TYPE] = EXACT_RANGE;
        else
          this[TYPE] = STABLE_RANGE;
      }
      else {
        this[TYPE] = MAJOR_RANGE;
      }
    }
    else if (versionRange[0] === '~') {
      this[VERSION] = new Semver(versionRange.substr(1));
      this[TYPE] = STABLE_RANGE;
    }
    // === New: Comparator operators (>=, >, <=, <, =) ===
    else if (comparatorRegEx.test(versionRange)) {
      let match = versionRange.match(comparatorRegEx);
      this._parseComparator(match[1], match[2].trim());
      return;
    }
    else {
      this[VERSION] = new Semver(versionRange);
      this[TYPE] = EXACT_RANGE;
    }
    if (this[VERSION] && this[VERSION][TAG] && this[TYPE] !== EXACT_RANGE)
      this[TYPE] = EXACT_RANGE;
  }

  _parseComparator (op, verStr) {
    if (op === '=') {
      let fullVer = verStr.match(semverRegEx);
      if (fullVer) {
        this[VERSION] = new Semver(verStr);
        this[TYPE] = EXACT_RANGE;
      } else {
        // Partial: =1.2 acts like 1.2 range
        let temp = new SemverRange(verStr);
        this[TYPE] = temp[TYPE];
        this[VERSION] = temp[VERSION];
        if (temp[RANGE_SET]) this[RANGE_SET] = temp[RANGE_SET];
        if (temp[BOUND_INCLUSIVE] !== undefined) this[BOUND_INCLUSIVE] = temp[BOUND_INCLUSIVE];
      }
      return;
    }

    let isLower = op === '>=' || op === '>';
    let isInclusive = op === '>=' || op === '<=';

    let partialMatch = verStr.match(partialRegEx);
    if (!partialMatch) {
      // Not a valid version — treat entire thing as exact tag
      this[VERSION] = new Semver(op + verStr);
      this[TYPE] = EXACT_RANGE;
      return;
    }

    let major = parseInt(partialMatch[1], 10);
    let hasMinor = partialMatch[2] !== undefined;
    let minor = hasMinor ? parseInt(partialMatch[2], 10) : undefined;
    let hasPatch = partialMatch[3] !== undefined;

    if (hasPatch) {
      // Full version: >=1.2.3 or <1.2.3 etc.
      this[VERSION] = new Semver(verStr);
      this[TYPE] = isLower ? LOWER_BOUND : UPPER_BOUND;
      this[BOUND_INCLUSIVE] = isInclusive;
    }
    else if (hasMinor) {
      if (isLower) {
        if (isInclusive) {
          // >=1.2 → >=1.2.0
          this[VERSION] = new Semver(major + '.' + minor + '.0');
        } else {
          // >1.2 → >=1.3.0
          this[VERSION] = new Semver(major + '.' + (minor + 1) + '.0');
        }
        this[TYPE] = LOWER_BOUND;
        this[BOUND_INCLUSIVE] = true;
      } else {
        if (isInclusive) {
          // <=1.2 → <1.3.0
          this[VERSION] = new Semver(major + '.' + (minor + 1) + '.0');
        } else {
          // <1.2 → <1.2.0
          this[VERSION] = new Semver(major + '.' + minor + '.0');
        }
        this[TYPE] = UPPER_BOUND;
        this[BOUND_INCLUSIVE] = false;
      }
    }
    else {
      if (isLower) {
        if (isInclusive) {
          // >=1 → >=1.0.0
          this[VERSION] = new Semver(major + '.0.0');
        } else {
          // >1 → >=2.0.0
          this[VERSION] = new Semver((major + 1) + '.0.0');
        }
        this[TYPE] = LOWER_BOUND;
        this[BOUND_INCLUSIVE] = true;
      } else {
        if (isInclusive) {
          // <=1 → <2.0.0
          this[VERSION] = new Semver((major + 1) + '.0.0');
        } else {
          // <1 → <1.0.0
          this[VERSION] = new Semver(major + '.0.0');
        }
        this[TYPE] = UPPER_BOUND;
        this[BOUND_INCLUSIVE] = false;
      }
    }
  }

  _testBound (version) {
    if (version[TAG]) return false;
    let cmp = Semver.compare(version, this[VERSION]);
    if (this[TYPE] === LOWER_BOUND)
      return this[BOUND_INCLUSIVE] ? cmp >= 0 : cmp > 0;
    if (this[TYPE] === UPPER_BOUND)
      return this[BOUND_INCLUSIVE] ? cmp <= 0 : cmp < 0;
    return false;
  }

  get isExact () {
    return this[TYPE] === EXACT_RANGE;
  }
  get isExactSemver () {
    return this[TYPE] === EXACT_RANGE && this.version[TAG] === undefined;
  }
  get isExactTag () {
    return this[TYPE] === EXACT_RANGE && this.version[TAG] !== undefined;
  }
  get isStable () {
    return this[TYPE] === STABLE_RANGE;
  }
  get isMajor () {
    return this[TYPE] === MAJOR_RANGE;
  }
  get isWildcard () {
    return this[TYPE] === WILDCARD_RANGE;
  }
  get isLowerBound () {
    return this[TYPE] === LOWER_BOUND;
  }
  get isUpperBound () {
    return this[TYPE] === UPPER_BOUND;
  }
  get isIntersection () {
    return this[TYPE] === INTERSECTION_RANGE;
  }
  get isUnion () {
    return this[TYPE] === UNION_RANGE;
  }
  get type () {
    switch (this[TYPE]) {
      case WILDCARD_RANGE:
        return 'wildcard';
      case MAJOR_RANGE:
        return 'major';
      case STABLE_RANGE:
        return 'stable';
      case EXACT_RANGE:
        return 'exact';
      case LOWER_BOUND:
        return 'lower_bound';
      case UPPER_BOUND:
        return 'upper_bound';
      case INTERSECTION_RANGE:
        return 'intersection';
      case UNION_RANGE:
        return 'union';
    }
  }
  get version () {
    return this[VERSION];
  }
  get rangeSet () {
    return this[RANGE_SET];
  }
  get boundInclusive () {
    return this[BOUND_INCLUSIVE];
  }
  gt (range) {
    return SemverRange.compare(this, range) === 1;
  }
  lt (range) {
    return SemverRange.compare(this, range) === -1;
  }
  eq (range) {
    return SemverRange.compare(this, range) === 0;
  }
  has (version, unstable = false) {
    if (!(version instanceof Semver))
      version = new Semver(version);

    // --- Existing simple types ---
    if (this[TYPE] === WILDCARD_RANGE)
      return unstable || (!version[PRE] && !version[TAG]);
    if (this[TYPE] === EXACT_RANGE)
      return this[VERSION].eq(version);
    if (this[TYPE] === MAJOR_RANGE || this[TYPE] === STABLE_RANGE) {
      if (version[TAG])
        return false;
      if (this[VERSION][MAJOR] !== version[MAJOR])
        return false;
      if (this[TYPE] === MAJOR_RANGE ? this[VERSION][MINOR] > version[MINOR] : this[VERSION][MINOR] !== version[MINOR])
        return false;
      if ((this[TYPE] === MAJOR_RANGE ? this[VERSION][MINOR] === version[MINOR] : true) && this[VERSION][PATCH] > version[PATCH])
        return false;
      if (version[PRE] === undefined || version[PRE].length === 0)
        return true;
      if (this[VERSION][PRE] === undefined || this[VERSION][PRE].length === 0)
        return unstable;
      if (unstable === false && (this[VERSION][MINOR] !== version[MINOR] || this[VERSION][PATCH] !== version[PATCH]))
        return false;
      return prereleaseCompare(this[VERSION][PRE], version[PRE]) !== 1;
    }

    // --- New: Bounds ---
    if (this[TYPE] === LOWER_BOUND || this[TYPE] === UPPER_BOUND) {
      if (version[TAG]) return false;
      // Prerelease rule for standalone bounds: version with pre only matches
      // if the bound's version has pre on the same [major, minor, patch]
      if (!unstable && version[PRE] && version[PRE].length) {
        if (!this[VERSION][PRE] || !this[VERSION][PRE].length ||
            this[VERSION][MAJOR] !== version[MAJOR] ||
            this[VERSION][MINOR] !== version[MINOR] ||
            this[VERSION][PATCH] !== version[PATCH])
          return false;
      }
      return this._testBound(version);
    }

    // --- New: Intersection ---
    if (this[TYPE] === INTERSECTION_RANGE) {
      if (version[TAG]) {
        // Tags can only match exact ranges within the intersection
        return this[RANGE_SET].every(r => r.has(version, unstable));
      }
      // Prerelease rule at set level: if version has pre and !unstable,
      // at least one member must have pre on the same [major, minor, patch]
      if (!unstable && version[PRE] && version[PRE].length) {
        let hasTupleMatch = this[RANGE_SET].some(r => {
          let v = r[VERSION];
          return v && v[PRE] && v[PRE].length &&
            v[MAJOR] === version[MAJOR] &&
            v[MINOR] === version[MINOR] &&
            v[PATCH] === version[PATCH];
        });
        if (!hasTupleMatch) return false;
      }
      // All members must match — bounds use _testBound (pure comparison),
      // other types use has() with unstable=true (pre rule already checked)
      return this[RANGE_SET].every(r => {
        if (r[TYPE] === LOWER_BOUND || r[TYPE] === UPPER_BOUND)
          return r._testBound(version);
        return r.has(version, !unstable ? true : unstable);
      });
    }

    // --- New: Union ---
    if (this[TYPE] === UNION_RANGE) {
      return this[RANGE_SET].some(r => r.has(version, unstable));
    }

    return false;
  }
  contains (range) {
    if (!(range instanceof SemverRange))
      range = new SemverRange(range);

    // Wildcard contains everything
    if (this[TYPE] === WILDCARD_RANGE)
      return true;
    if (range[TYPE] === WILDCARD_RANGE)
      return false;

    // Union this: contains if any member contains
    if (this[TYPE] === UNION_RANGE)
      return this[RANGE_SET].some(r => r.contains(range));

    // Range is union: must contain all members
    if (range[TYPE] === UNION_RANGE)
      return range[RANGE_SET].every(r => this.contains(r));

    // Range is intersection: B ⊆ each Bi, so if we contain any Bi, we contain B
    if (range[TYPE] === INTERSECTION_RANGE)
      return range[RANGE_SET].some(r => this.contains(r));

    // This is intersection: must satisfy all members
    if (this[TYPE] === INTERSECTION_RANGE)
      return this[RANGE_SET].every(r => r.contains(range));

    // Both are simple types (original 4): use original logic
    if (this[TYPE] <= EXACT_RANGE && range[TYPE] <= EXACT_RANGE)
      return range[TYPE] >= this[TYPE] && this.has(range[VERSION], true);

    // Bound containing exact: check if we have the version
    if ((this[TYPE] === LOWER_BOUND || this[TYPE] === UPPER_BOUND) && range[TYPE] === EXACT_RANGE)
      return this.has(range[VERSION], true);

    // Conservative fallback
    return false;
  }
  intersect (range) {
    if (!(range instanceof SemverRange))
      range = new SemverRange(range);

    // Wildcard cases
    if (this[TYPE] === WILDCARD_RANGE && range[TYPE] === WILDCARD_RANGE)
      return this;
    if (this[TYPE] === WILDCARD_RANGE)
      return range;
    if (range[TYPE] === WILDCARD_RANGE)
      return this;

    // Exact cases
    if (this[TYPE] === EXACT_RANGE)
      return range.has(this[VERSION], true) ? this : undefined;
    if (range[TYPE] === EXACT_RANGE)
      return this.has(range[VERSION], true) ? range : undefined;

    // Union: distribute
    if (this[TYPE] === UNION_RANGE) {
      let results = this[RANGE_SET].map(r => r.intersect(range)).filter(Boolean);
      if (results.length === 0) return undefined;
      if (results.length === 1) return results[0];
      let union = Object.create(SemverRange.prototype);
      union[TYPE] = UNION_RANGE;
      union[RANGE_SET] = results;
      return union;
    }
    if (range[TYPE] === UNION_RANGE)
      return range.intersect(this);

    // Intersection: merge members
    if (this[TYPE] === INTERSECTION_RANGE && range[TYPE] === INTERSECTION_RANGE) {
      let result = Object.create(SemverRange.prototype);
      result[TYPE] = INTERSECTION_RANGE;
      result[RANGE_SET] = [...this[RANGE_SET], ...range[RANGE_SET]];
      return result;
    }
    if (this[TYPE] === INTERSECTION_RANGE) {
      let result = Object.create(SemverRange.prototype);
      result[TYPE] = INTERSECTION_RANGE;
      result[RANGE_SET] = [...this[RANGE_SET], range];
      return result;
    }
    if (range[TYPE] === INTERSECTION_RANGE)
      return range.intersect(this);

    // Both are simple types (original 4): use original logic
    if (this[TYPE] <= EXACT_RANGE && range[TYPE] <= EXACT_RANGE) {
      let higherRange, lowerRange, polarity;
      if (range[VERSION].gt(this[VERSION])) {
        higherRange = range;
        lowerRange = this;
        polarity = true;
      }
      else {
        higherRange = this;
        lowerRange = range;
        polarity = false;
      }

      if (!lowerRange.has(higherRange[VERSION], true))
        return;

      if (lowerRange[TYPE] === MAJOR_RANGE)
        return polarity ? range : this;

      let intersection = new SemverRange(higherRange[VERSION].toString());
      intersection[TYPE] = STABLE_RANGE;
      return intersection;
    }

    // Mixed: create intersection
    let result = Object.create(SemverRange.prototype);
    result[TYPE] = INTERSECTION_RANGE;
    result[RANGE_SET] = [this, range];
    return result;
  }
  bestMatch (versions, unstable = false) {
    let maxSemver;
    versions.forEach(version => {
      if (!(version instanceof Semver))
        version = new Semver(version);
      if (!this.has(version, unstable))
        return;
      if (!maxSemver)
        maxSemver = version;
      else if (Semver.compare(version, maxSemver) === 1)
        maxSemver = version;
    });
    return maxSemver;
  }
  toString () {
    let version = this[VERSION];
    switch (this[TYPE]) {
      case WILDCARD_RANGE:
        return '*';
      case MAJOR_RANGE:
        if (version[MAJOR] === 0 && version[MINOR] === 0 && version[PATCH] === 0)
           return '0';
        if (version[PRE] && version[PRE].length === 0 && version[PATCH] === 0)
           return '^' + version[MAJOR] + '.' + version[MINOR];
        return '^' + version.toString();
      case STABLE_RANGE:
        if (version[PRE] && version[PRE].length === 0 && version[PATCH] === 0 || version[MAJOR] === 0 && version[MINOR] === 0)
          return version[MAJOR] + '.' + version[MINOR];
        return '~' + version.toString();
      case EXACT_RANGE:
        return version.toString();
      case LOWER_BOUND:
        return (this[BOUND_INCLUSIVE] ? '>=' : '>') + version.toString();
      case UPPER_BOUND:
        return (this[BOUND_INCLUSIVE] ? '<=' : '<') + version.toString();
      case INTERSECTION_RANGE:
        return this[RANGE_SET].map(r => r.toString()).join(' ');
      case UNION_RANGE:
        return this[RANGE_SET].map(r => r.toString()).join(' || ');
    }
  }
  toJSON() {
    return this.toString();
  }
  static match (range, version, unstable = false) {
    if (!(version instanceof Semver))
      version = new Semver(version);
    return version.matches(range, unstable);
  }
  static isValid (range) {
    let semverRange = new SemverRange(range);
    // Original simple types: exact with a tag is invalid
    if (semverRange[TYPE] === EXACT_RANGE)
      return semverRange[VERSION][TAG] === undefined;
    // New composite/bound types are always valid if they parsed
    return true;
  }
  static compare (r1, r2) {
    if (!(r1 instanceof SemverRange))
      r1 = new SemverRange(r1);
    if (!(r2 instanceof SemverRange))
      r2 = new SemverRange(r2);
    if (r1[TYPE] === WILDCARD_RANGE && r2[TYPE] === WILDCARD_RANGE)
      return 0;
    if (r1[TYPE] === WILDCARD_RANGE)
      return 1;
    if (r2[TYPE] === WILDCARD_RANGE)
      return -1;
    let u1 = effectiveUpperBound(r1);
    let u2 = effectiveUpperBound(r2);
    // both unbounded — fall back to lower bound
    if (u1 === null && u2 === null) {
      let v1 = effectiveVersion(r1);
      let v2 = effectiveVersion(r2);
      if (v1 && v2) return Semver.compare(v1, v2);
      return 0;
    }
    // one unbounded — unbounded is greater
    if (u1 === null) return 1;
    if (u2 === null) return -1;
    let cmp = Semver.compare(u1, u2);
    if (cmp !== 0)
      return cmp;
    // same upper bound — fall back to lower bound
    let v1 = effectiveVersion(r1);
    let v2 = effectiveVersion(r2);
    if (v1 && v2) {
      cmp = Semver.compare(v1, v2);
      if (cmp !== 0)
        return cmp;
    }
    if (r1[TYPE] === r2[TYPE])
      return 0;
    return r1[TYPE] > r2[TYPE] ? 1 : -1;
  }
}
exports.SemverRange = SemverRange;
