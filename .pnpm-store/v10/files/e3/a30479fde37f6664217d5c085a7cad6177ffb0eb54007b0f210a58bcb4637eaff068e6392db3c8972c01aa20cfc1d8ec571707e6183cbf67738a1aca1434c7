export const semverRegEx: RegExp;
export const shortSemverRegEx: RegExp;

export class Semver {
  constructor(version: string);

  readonly major: number | undefined;
  readonly minor: number | undefined;
  readonly patch: number | undefined;
  readonly pre: string[] | undefined;
  readonly build: string | undefined;
  readonly tag: string | undefined;

  gt(version: Semver | string): boolean;
  lt(version: Semver | string): boolean;
  eq(version: Semver | string): boolean;
  matches(range: SemverRange | string, unstable?: boolean): boolean;
  toString(): string;
  toJSON(): string;

  static isValid(version: string): boolean;
  static compare(v1: Semver | string, v2: Semver | string): -1 | 0 | 1;
}

export type SemverRangeType =
  | 'wildcard'
  | 'major'
  | 'stable'
  | 'exact'
  | 'lower_bound'
  | 'upper_bound'
  | 'intersection'
  | 'union';

export class SemverRange {
  constructor(versionRange: string);

  readonly isExact: boolean;
  readonly isExactSemver: boolean;
  readonly isExactTag: boolean;
  readonly isStable: boolean;
  readonly isMajor: boolean;
  readonly isWildcard: boolean;
  readonly isLowerBound: boolean;
  readonly isUpperBound: boolean;
  readonly isIntersection: boolean;
  readonly isUnion: boolean;
  readonly type: SemverRangeType;
  readonly version: Semver | undefined;
  readonly rangeSet: SemverRange[] | undefined;
  readonly boundInclusive: boolean | undefined;

  gt(range: SemverRange | string): boolean;
  lt(range: SemverRange | string): boolean;
  eq(range: SemverRange | string): boolean;
  has(version: Semver | string, unstable?: boolean): boolean;
  contains(range: SemverRange | string): boolean;
  intersect(range: SemverRange | string): SemverRange | undefined;
  bestMatch(versions: (Semver | string)[], unstable?: boolean): Semver | undefined;
  toString(): string;
  toJSON(): string;

  static match(range: SemverRange | string, version: Semver | string, unstable?: boolean): boolean;
  static isValid(range: string): boolean;
  static compare(r1: SemverRange | string, r2: SemverRange | string): -1 | 0 | 1;
}
