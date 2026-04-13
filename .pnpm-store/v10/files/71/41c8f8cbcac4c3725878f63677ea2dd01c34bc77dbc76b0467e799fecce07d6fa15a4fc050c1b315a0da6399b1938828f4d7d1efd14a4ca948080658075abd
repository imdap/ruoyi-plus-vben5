const PREFIX_BEFORE = 'before'
const PREFIX_AFTER_PROP = 'after-prop'
const PREFIX_AFTER_COLON = 'after-colon'
const PREFIX_AFTER_VALUE = 'after-value'
const PREFIX_AFTER = 'after'

const PREFIX_BEFORE_ALL = 'before-all'
const PREFIX_AFTER_ALL = 'after-all'

const BRACKET_OPEN = '['
const BRACKET_CLOSE = ']'
const CURLY_BRACKET_OPEN = '{'
const CURLY_BRACKET_CLOSE = '}'
const COMMA = ','
const EMPTY = ''
const MINUS = '-'

const PROP_SYMBOL_PREFIXES = [
  PREFIX_BEFORE,
  PREFIX_AFTER_PROP,
  PREFIX_AFTER_COLON,
  PREFIX_AFTER_VALUE,
  PREFIX_AFTER
]

const NON_PROP_SYMBOL_PREFIXES = [
  PREFIX_BEFORE,
  PREFIX_AFTER,
  PREFIX_BEFORE_ALL,
  PREFIX_AFTER_ALL
]

const NON_PROP_SYMBOL_KEYS = NON_PROP_SYMBOL_PREFIXES.map(Symbol.for)

const COLON = ':'
const UNDEFINED = undefined

const LINE_BREAKS_BEFORE = new WeakMap()
const LINE_BREAKS_AFTER = new WeakMap()
const RAW_STRING_LITERALS = new WeakMap()

const is_string = subject => typeof subject === 'string'
const is_number = subject => typeof subject === 'number'
/**
 * @param {unknown} v
 * @returns {v is NonNullable<object>}
 */
const is_object = v => typeof v === 'object' && v !== null

const normalize_key = key => is_string(key) || is_number(key)
  ? String(key)
  : null

const set_raw_string_literal = (host, key, raw) => {
  if (!is_object(host) || !is_string(raw)) {
    return
  }

  const normalized = normalize_key(key)
  if (normalized === null) {
    return
  }

  let map = RAW_STRING_LITERALS.get(host)
  if (!map) {
    map = new Map()
    RAW_STRING_LITERALS.set(host, map)
  }

  map.set(normalized, raw)
}

const get_raw_string_literal = (host, key) => {
  if (!is_object(host)) {
    return
  }

  const normalized = normalize_key(key)
  if (normalized === null) {
    return
  }

  const map = RAW_STRING_LITERALS.get(host)
  return map
    ? map.get(normalized)
    : undefined
}

const symbol = (prefix, key) => Symbol.for(prefix + COLON + key)
const symbol_checked = (prefix, key) => {
  if (key) {
    if (PROP_SYMBOL_PREFIXES.includes(prefix)) {
      return symbol(prefix, key)
    }

    throw new RangeError(
      `Unsupported comment position ${prefix} with key ${key}`
    )
  }

  if (NON_PROP_SYMBOL_PREFIXES.includes(prefix)) {
    return Symbol.for(prefix)
  }

  throw new RangeError(`Unsupported comment position ${prefix}`)
}

const define = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
})

const copy_comments_by_kind = (
  target, source, target_key, source_key, prefix, remove_source
) => {
  const source_prop = symbol(prefix, source_key)
  if (!Object.hasOwn(source, source_prop)) {
    return
  }

  const target_prop = target_key === source_key
    ? source_prop
    : symbol(prefix, target_key)

  define(target, target_prop, source[source_prop])

  if (remove_source) {
    delete source[source_prop]
  }
}

const copy_comments = (
  target, source, target_key, source_key, remove_source
) => {
  PROP_SYMBOL_PREFIXES.forEach(prefix => {
    copy_comments_by_kind(
      target, source, target_key, source_key, prefix, remove_source
    )
  })
}

const swap_comments = (array, from, to) => {
  if (from === to) {
    return
  }

  PROP_SYMBOL_PREFIXES.forEach(prefix => {
    const target_prop = symbol(prefix, to)
    if (!Object.hasOwn(array, target_prop)) {
      copy_comments_by_kind(array, array, to, from, prefix, true)
      return
    }

    const comments = array[target_prop]
    delete array[target_prop]

    copy_comments_by_kind(array, array, to, from, prefix, true)
    define(array, symbol(prefix, from), comments)
  })
}

const assign_non_prop_comments = (target, source) => {
  NON_PROP_SYMBOL_KEYS.forEach(key => {
    const comments = source[key]

    if (comments) {
      define(target, key, comments)
    }
  })
}

// Assign keys and comments
const assign = (target, source, keys) => {
  keys.forEach(key => {
    if (typeof key !== 'string' && typeof key !== 'number') {
      return
    }

    if (!Object.hasOwn(source, key)) {
      return
    }

    target[key] = source[key]
    copy_comments(target, source, key, key)
  })

  return target
}

const is_raw_json = typeof JSON.isRawJSON === 'function'
  // For backward compatibility,
  // since JSON.isRawJSON is not supported in node < 21
  ? JSON.isRawJSON
  // istanbul ignore next
  : () => false

const set_comment_line_breaks = (comment, before, after) => {
  if (is_number(before) && before >= 0) {
    LINE_BREAKS_BEFORE.set(comment, before)
  }

  if (is_number(after) && after >= 0) {
    LINE_BREAKS_AFTER.set(comment, after)
  }
}

const get_comment_line_breaks_before = comment => LINE_BREAKS_BEFORE.get(comment)
const get_comment_line_breaks_after = comment => LINE_BREAKS_AFTER.get(comment)

module.exports = {
  PROP_SYMBOL_PREFIXES,

  PREFIX_BEFORE,
  PREFIX_AFTER_PROP,
  PREFIX_AFTER_COLON,
  PREFIX_AFTER_VALUE,
  PREFIX_AFTER,

  PREFIX_BEFORE_ALL,
  PREFIX_AFTER_ALL,

  BRACKET_OPEN,
  BRACKET_CLOSE,
  CURLY_BRACKET_OPEN,
  CURLY_BRACKET_CLOSE,

  COLON,
  COMMA,
  MINUS,
  EMPTY,

  UNDEFINED,

  symbol,
  define,
  copy_comments,
  swap_comments,
  assign_non_prop_comments,

  is_string,
  is_number,
  is_object,

  is_raw_json,
  set_raw_string_literal,
  get_raw_string_literal,
  set_comment_line_breaks,
  get_comment_line_breaks_before,
  get_comment_line_breaks_after,

  /**
   * Assign properties and comments from source to target object.
   *
   * @param {Object} target The target object to assign properties and comments
   *   to.
   * @param {Object} source The source object to copy properties and comments
   *   from.
   * @param {Array<string|number>} [keys] Optional array of keys to assign. If
   *   not provided, all keys and non-property comments are assigned. If empty
   *   array, only non-property comments are assigned.
   * @returns {Object} The target object with assigned properties and comments.
   *
   * @throws {TypeError} If target cannot be converted to object or keys is not
   *   array or undefined.
   *
   * @example
   * const source = parse('{"a": 1 // comment a, "b": 2 // comment b}')
   * const target = {}
   *
   * // Copy all properties and comments
   * assign(target, source)
   *
   * // Copy only specific properties and their comments
   * assign(target, source, ['a'])
   *
   * // Copy only non-property comments
   * assign(target, source, [])
   */
  assign (target, source, keys) {
    if (!is_object(target)) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    if (!is_object(source)) {
      return target
    }

    if (keys === UNDEFINED) {
      // Copy all comments from source to target, including:
      // - non-property comments
      // - property comments

      keys = Object.keys(source)
      // We assign non-property comments
      // if argument `keys` is not specified
      assign_non_prop_comments(target, source)
    } else if (!Array.isArray(keys)) {
      throw new TypeError('keys must be array or undefined')
    } else if (keys.length === 0) {
      // Copy all non-property comments from source to target

      // Or argument `keys` is an empty array
      assign_non_prop_comments(target, source)
    }

    // Copy specified property comments from source to target
    return assign(target, source, keys)
  },

  /**
   * Move comments from one location to another within objects.
   *
   * @param {Object} source The source object containing comments to move.
   * @param {Object} [target] The target object to move comments to. If not
   *   provided, defaults to source (move within same object).
   * @param {Object} from The source comment location.
   * @param {string} from.where The comment position (e.g., 'before',
   *   'after', 'before-all', etc.).
   * @param {string} [from.key] The property key for property-specific comments.
   *   Omit for non-property comments.
   * @param {Object} to The target comment location.
   * @param {string} to.where The comment position (e.g., 'before',
   *   'after', 'before-all', etc.).
   * @param {string} [to.key] The property key for property-specific comments.
   *   Omit for non-property comments.
   * @param {boolean} [override=false] Whether to override existing comments at
   *   the target location. If false, comments will be appended.
   *
   * @throws {TypeError} If source is not an object.
   * @throws {RangeError} If where parameter is invalid or incompatible with key.
   *
   * @example
   * const obj = parse('{"a": 1 // comment on a}')
   *
   * // Move comment from after 'a' to before 'a'
   * moveComments(obj, obj,
   *   { where: 'after', key: 'a' },
   *   { where: 'before', key: 'a' }
   * )
   *
   * @example
   * // Move non-property comment
   * moveComments(obj, obj,
   *   { where: 'before-all' },
   *   { where: 'after-all' }
   * )
   */
  moveComments (source, target, {
    where: from_where,
    key: from_key
  }, {
    where: to_where,
    key: to_key
  }, override = false) {
    if (!is_object(source)) {
      throw new TypeError('source must be an object')
    }

    if (!target) {
      target = source
    }

    if (!is_object(target)) {
      // No target to move to
      return
    }

    const from_prop = symbol_checked(from_where, from_key)
    const to_prop = symbol_checked(to_where, to_key)

    if (!Object.hasOwn(source, from_prop)) {
      return
    }

    const source_comments = source[from_prop]
    delete source[from_prop]

    if (override || !Object.hasOwn(target, to_prop)) {
      // Override
      // or the target has no existing comments
      define(target, to_prop, source_comments)
      return
    }

    const target_comments = target[to_prop]
    if (target_comments) {
      target_comments.push(...source_comments)
    }
  },

  /**
   * Remove comments from a specific location within an object.
   *
   * @param {Object} target The target object to remove comments from.
   * @param {Object} location The comment location to remove.
   * @param {string} location.where The comment position (e.g., 'before',
   *   'after', 'before-all', etc.).
   * @param {string} [location.key] The property key for property-specific
   *   comments. Omit for non-property comments.
   *
   * @throws {TypeError} If target is not an object.
   * @throws {RangeError} If where parameter is invalid or incompatible with key.
   *
   * @example
   * const obj = parse('{"a": 1 // comment on a}')
   *
   * // Remove comment after 'a'
   * removeComments(obj, { where: 'after', key: 'a' })
   *
   * @example
   * // Remove non-property comment
   * removeComments(obj, { where: 'before-all' })
   */
  removeComments (target, {
    where,
    key
  }) {
    if (!is_object(target)) {
      throw new TypeError('target must be an object')
    }

    const prop = symbol_checked(where, key)
    if (!Object.hasOwn(target, prop)) {
      return
    }

    delete target[prop]
  }
}
