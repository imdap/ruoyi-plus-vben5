/**
  * @alova/server 1.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var alova = require('alova');
var rateLimiterFlexible = require('rate-limiter-flexible');

class HookedMethod extends alova.Method {
    constructor(entity, requestHandler) {
        super(entity.type, entity.context, entity.url, { ...entity.config });
        this.handler = requestHandler;
        shared.objAssign(this, {
            config: { ...entity.config },
            uhs: entity.uhs,
            dhs: entity.dhs
        });
    }
    send(forceRequest) {
        return this.handler(forceRequest);
    }
}

const createServerHook = (hookHandler) => hookHandler;

const assert$2 = shared.createAssert('atomize');
const atomize = createServerHook((method, options = {}) => {
    var _a;
    const { channel = 'default', timeout = 5000, interval = 100 } = options;
    const locker = (_a = method.context.l2Cache) === null || _a === void 0 ? void 0 : _a.locker;
    assert$2(locker, 'expect set `@alova/storage-redis` or `@alova/storage-file` as l2Cache of alova instance.');
    return new HookedMethod(method, async (forceRequest) => {
        const startTime = Date.now();
        let locked = false;
        while (Date.now() - startTime < timeout) {
            try {
                await locker.lock(channel);
                locked = true;
                if (locked)
                    break;
            }
            catch (_a) {
                // Ignore lock errors during retry
            }
            await new Promise(resolve => {
                setTimeout(resolve, interval);
            });
        }
        assert$2(locked, `Failed to acquire lock within ${timeout}ms`);
        try {
            const response = await method.send(forceRequest);
            return response;
        }
        finally {
            await locker.unlock(channel);
        }
    });
});

const assert$1 = shared.createAssert('Captcha');
const defaultCodeChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const defaultCodeLength = 4;
/**
 * Generate captcha code
 */
const generateCode = (codeSet = defaultCodeChars) => {
    if (shared.isFn(codeSet)) {
        return codeSet();
    }
    const { chars = defaultCodeChars, length = defaultCodeLength } = shared.isArray(codeSet) ? { chars: codeSet } : codeSet;
    let code = '';
    for (let i = 0; i < length; i += 1) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
};
/**
 * Create captcha provider
 */
const createCaptchaProvider = (options) => {
    const { resetTime = 60 * 1000, expireTime = 60 * 1000 * 5, keyPrefix = 'alova-captcha', store, resendFormStore = false, codeSet } = options;
    assert$1(!!store, 'store is required');
    /**
     * Get storage key
     */
    const getStoreKey = (key) => `${keyPrefix}:${key}`;
    /**
     * Send captcha
     * @param methodHandler Request function for sending captcha
     * @param key Captcha key
     */
    const sendCaptcha = async (methodHandler, { key }) => {
        const storeKey = getStoreKey(key);
        let now = shared.getTime();
        const [storedData, expireTs = 0] = (await store.get(storeKey)) || [];
        // Check if can resend
        assert$1(!storedData || now >= storedData.resetTs, 'Cannot send captcha yet, please wait');
        // If resendFormStore is enabled and there's an unexpired captcha in storage,
        // use the stored captcha
        let code;
        if (resendFormStore && storedData && now < expireTs) {
            code = storedData.code;
        }
        else {
            code = generateCode(codeSet);
        }
        // Send captcha
        const response = await methodHandler(code, key);
        // Store captcha information
        now = shared.getTime();
        await store.set(storeKey, [
            {
                code,
                resetTs: now + resetTime
            },
            now + expireTime
        ]);
        return response;
    };
    /**
     * Verify captcha
     * @param code User submitted captcha code
     * @param key Captcha key
     */
    const verifyCaptcha = async (code, key) => {
        const storeKey = getStoreKey(key);
        const [storedData, expireTs = 0] = (await store.get(storeKey)) || [];
        if (!storedData || shared.getTime() > expireTs) {
            await store.remove(storeKey);
            return false;
        }
        const isValid = storedData.code === code;
        if (isValid) {
            await store.remove(storeKey);
        }
        return isValid;
    };
    return {
        sendCaptcha,
        verifyCaptcha
    };
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var RateLimiterAbstract_1 = class RateLimiterAbstract {
  /**
   *
   * @param opts Object Defaults {
   *   points: 4, // Number of points
   *   duration: 1, // Per seconds
   *   blockDuration: 0, // Block if consumed more than points in current duration for blockDuration seconds
   *   execEvenly: false, // Execute allowed actions evenly over duration
   *   execEvenlyMinDelayMs: duration * 1000 / points, // ms, works with execEvenly=true option
   *   keyPrefix: 'rlflx',
   * }
   */
  constructor(opts = {}) {
    this.points = opts.points;
    this.duration = opts.duration;
    this.blockDuration = opts.blockDuration;
    this.execEvenly = opts.execEvenly;
    this.execEvenlyMinDelayMs = opts.execEvenlyMinDelayMs;
    this.keyPrefix = opts.keyPrefix;
  }

  get points() {
    return this._points;
  }

  set points(value) {
    this._points = value >= 0 ? value : 4;
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = typeof value === 'undefined' ? 1 : value;
  }

  get msDuration() {
    return this.duration * 1000;
  }

  get blockDuration() {
    return this._blockDuration;
  }

  set blockDuration(value) {
    this._blockDuration = typeof value === 'undefined' ? 0 : value;
  }

  get msBlockDuration() {
    return this.blockDuration * 1000;
  }

  get execEvenly() {
    return this._execEvenly;
  }

  set execEvenly(value) {
    this._execEvenly = typeof value === 'undefined' ? false : Boolean(value);
  }

  get execEvenlyMinDelayMs() {
    return this._execEvenlyMinDelayMs;
  }

  set execEvenlyMinDelayMs(value) {
    this._execEvenlyMinDelayMs = typeof value === 'undefined' ? Math.ceil(this.msDuration / this.points) : value;
  }

  get keyPrefix() {
    return this._keyPrefix;
  }

  set keyPrefix(value) {
    if (typeof value === 'undefined') {
      value = 'rlflx';
    }
    if (typeof value !== 'string') {
      throw new Error('keyPrefix must be string');
    }
    this._keyPrefix = value;
  }

  _getKeySecDuration(options = {}) {
    return options && options.customDuration >= 0
      ? options.customDuration
      : this.duration;
  }

  getKey(key) {
    return this.keyPrefix.length > 0 ? `${this.keyPrefix}:${key}` : key;
  }

  parseKey(rlKey) {
    return rlKey.substring(this.keyPrefix.length);
  }

  consume() {
    throw new Error("You have to implement the method 'consume'!");
  }

  penalty() {
    throw new Error("You have to implement the method 'penalty'!");
  }

  reward() {
    throw new Error("You have to implement the method 'reward'!");
  }

  get() {
    throw new Error("You have to implement the method 'get'!");
  }

  set() {
    throw new Error("You have to implement the method 'set'!");
  }

  block() {
    throw new Error("You have to implement the method 'block'!");
  }

  delete() {
    throw new Error("You have to implement the method 'delete'!");
  }
};

var BlockedKeys_1$1 = class BlockedKeys {
  constructor() {
    this._keys = {}; // {'key': 1526279430331}
    this._addedKeysAmount = 0;
  }

  collectExpired() {
    const now = Date.now();

    Object.keys(this._keys).forEach((key) => {
      if (this._keys[key] <= now) {
        delete this._keys[key];
      }
    });

    this._addedKeysAmount = Object.keys(this._keys).length;
  }

  /**
   * Add new blocked key
   *
   * @param key String
   * @param sec Number
   */
  add(key, sec) {
    this.addMs(key, sec * 1000);
  }

  /**
   * Add new blocked key for ms
   *
   * @param key String
   * @param ms Number
   */
  addMs(key, ms) {
    this._keys[key] = Date.now() + ms;
    this._addedKeysAmount++;
    if (this._addedKeysAmount > 999) {
      this.collectExpired();
    }
  }

  /**
   * 0 means not blocked
   *
   * @param key
   * @returns {number}
   */
  msBeforeExpire(key) {
    const expire = this._keys[key];

    if (expire && expire >= Date.now()) {
      this.collectExpired();
      const now = Date.now();
      return expire >= now ? expire - now : 0;
    }

    return 0;
  }

  /**
   * If key is not given, delete all data in memory
   * 
   * @param {string|undefined} key
   */
  delete(key) {
    if (key) {
      delete this._keys[key];
    } else {
      Object.keys(this._keys).forEach((key) => {
        delete this._keys[key];
      });
    }
  }
};

const BlockedKeys$1 = BlockedKeys_1$1;

var BlockedKeys_1 = BlockedKeys$1;

var RateLimiterRes_1 = class RateLimiterRes {
  constructor(remainingPoints, msBeforeNext, consumedPoints, isFirstInDuration) {
    this.remainingPoints = typeof remainingPoints === 'undefined' ? 0 : remainingPoints; // Remaining points in current duration
    this.msBeforeNext = typeof msBeforeNext === 'undefined' ? 0 : msBeforeNext; // Milliseconds before next action
    this.consumedPoints = typeof consumedPoints === 'undefined' ? 0 : consumedPoints; // Consumed points in current duration
    this.isFirstInDuration = typeof isFirstInDuration === 'undefined' ? false : isFirstInDuration;
  }

  get msBeforeNext() {
    return this._msBeforeNext;
  }

  set msBeforeNext(ms) {
    this._msBeforeNext = ms;
    return this;
  }

  get remainingPoints() {
    return this._remainingPoints;
  }

  set remainingPoints(p) {
    this._remainingPoints = p;
    return this;
  }

  get consumedPoints() {
    return this._consumedPoints;
  }

  set consumedPoints(p) {
    this._consumedPoints = p;
    return this;
  }

  get isFirstInDuration() {
    return this._isFirstInDuration;
  }

  set isFirstInDuration(value) {
    this._isFirstInDuration = Boolean(value);
  }

  _getDecoratedProperties() {
    return {
      remainingPoints: this.remainingPoints,
      msBeforeNext: this.msBeforeNext,
      consumedPoints: this.consumedPoints,
      isFirstInDuration: this.isFirstInDuration,
    };
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this._getDecoratedProperties();
  }

  toString() {
    return JSON.stringify(this._getDecoratedProperties());
  }

  toJSON() {
    return this._getDecoratedProperties();
  }
};

const RateLimiterAbstract = RateLimiterAbstract_1;
const BlockedKeys = BlockedKeys_1;
const RateLimiterRes = RateLimiterRes_1;

var RateLimiterStoreAbstract_1 = class RateLimiterStoreAbstract extends RateLimiterAbstract {
  /**
   *
   * @param opts Object Defaults {
   *   ... see other in RateLimiterAbstract
   *
   *   inMemoryBlockOnConsumed: 40, // Number of points when key is blocked
   *   inMemoryBlockDuration: 10, // Block duration in seconds
   *   insuranceLimiter: RateLimiterAbstract
   * }
   */
  constructor(opts = {}) {
    super(opts);

    this.inMemoryBlockOnConsumed = opts.inMemoryBlockOnConsumed;
    this.inMemoryBlockDuration = opts.inMemoryBlockDuration;
    this.insuranceLimiter = opts.insuranceLimiter;
    this._inMemoryBlockedKeys = new BlockedKeys();
  }

  get client() {
    return this._client;
  }

  set client(value) {
    if (typeof value === 'undefined') {
      throw new Error('storeClient is not set');
    }
    this._client = value;
  }

  /**
   * Have to be launched after consume
   * It blocks key and execute evenly depending on result from store
   *
   * It uses _getRateLimiterRes function to prepare RateLimiterRes from store result
   *
   * @param resolve
   * @param reject
   * @param rlKey
   * @param changedPoints
   * @param storeResult
   * @param {Object} options
   * @private
   */
  _afterConsume(resolve, reject, rlKey, changedPoints, storeResult, options = {}) {
    const res = this._getRateLimiterRes(rlKey, changedPoints, storeResult);

    if (this.inMemoryBlockOnConsumed > 0 && !(this.inMemoryBlockDuration > 0)
      && res.consumedPoints >= this.inMemoryBlockOnConsumed
    ) {
      this._inMemoryBlockedKeys.addMs(rlKey, res.msBeforeNext);
      if (res.consumedPoints > this.points) {
        return reject(res);
      } else {
        return resolve(res)
      }
    } else if (res.consumedPoints > this.points) {
      let blockPromise = Promise.resolve();
      // Block only first time when consumed more than points
      if (this.blockDuration > 0 && res.consumedPoints <= (this.points + changedPoints)) {
        res.msBeforeNext = this.msBlockDuration;
        blockPromise = this._block(rlKey, res.consumedPoints, this.msBlockDuration, options);
      }

      if (this.inMemoryBlockOnConsumed > 0 && res.consumedPoints >= this.inMemoryBlockOnConsumed) {
        // Block key for this.inMemoryBlockDuration seconds
        this._inMemoryBlockedKeys.add(rlKey, this.inMemoryBlockDuration);
        res.msBeforeNext = this.msInMemoryBlockDuration;
      }

      blockPromise
        .then(() => {
          reject(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (this.execEvenly && res.msBeforeNext > 0 && !res.isFirstInDuration) {
      let delay = Math.ceil(res.msBeforeNext / (res.remainingPoints + 2));
      if (delay < this.execEvenlyMinDelayMs) {
        delay = res.consumedPoints * this.execEvenlyMinDelayMs;
      }

      setTimeout(resolve, delay, res);
    } else {
      resolve(res);
    }
  }

  _handleError(err, funcName, resolve, reject, key, data = false, options = {}) {
    if (!(this.insuranceLimiter instanceof RateLimiterAbstract)) {
      reject(err);
    } else {
      this.insuranceLimiter[funcName](key, data, options)
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    }
  }

  getInMemoryBlockMsBeforeExpire(rlKey) {
    if (this.inMemoryBlockOnConsumed > 0) {
      return this._inMemoryBlockedKeys.msBeforeExpire(rlKey);
    }

    return 0;
  }

  get inMemoryBlockOnConsumed() {
    return this._inMemoryBlockOnConsumed;
  }

  set inMemoryBlockOnConsumed(value) {
    this._inMemoryBlockOnConsumed = value ? parseInt(value) : 0;
    if (this.inMemoryBlockOnConsumed > 0 && this.points > this.inMemoryBlockOnConsumed) {
      throw new Error('inMemoryBlockOnConsumed option must be greater or equal "points" option');
    }
  }

  get inMemoryBlockDuration() {
    return this._inMemoryBlockDuration;
  }

  set inMemoryBlockDuration(value) {
    this._inMemoryBlockDuration = value ? parseInt(value) : 0;
    if (this.inMemoryBlockDuration > 0 && this.inMemoryBlockOnConsumed === 0) {
      throw new Error('inMemoryBlockOnConsumed option must be set up');
    }
  }

  get msInMemoryBlockDuration() {
    return this._inMemoryBlockDuration * 1000;
  }

  get insuranceLimiter() {
    return this._insuranceLimiter;
  }

  set insuranceLimiter(value) {
    if (typeof value !== 'undefined' && !(value instanceof RateLimiterAbstract)) {
      throw new Error('insuranceLimiter must be instance of RateLimiterAbstract');
    }
    this._insuranceLimiter = value;
    if (this._insuranceLimiter) {
      this._insuranceLimiter.blockDuration = this.blockDuration;
      this._insuranceLimiter.execEvenly = this.execEvenly;
    }
  }

  /**
   * Block any key for secDuration seconds
   *
   * @param key
   * @param secDuration
   * @param {Object} options
   *
   * @return Promise<RateLimiterRes>
   */
  block(key, secDuration, options = {}) {
    const msDuration = secDuration * 1000;
    return this._block(this.getKey(key), this.points + 1, msDuration, options);
  }

  /**
   * Set points by key for any duration
   *
   * @param key
   * @param points
   * @param secDuration
   * @param {Object} options
   *
   * @return Promise<RateLimiterRes>
   */
  set(key, points, secDuration, options = {}) {
    const msDuration = (secDuration >= 0 ? secDuration : this.duration) * 1000;
    return this._block(this.getKey(key), points, msDuration, options);
  }

  /**
   *
   * @param key
   * @param pointsToConsume
   * @param {Object} options
   * @returns Promise<RateLimiterRes>
   */
  consume(key, pointsToConsume = 1, options = {}) {
    return new Promise((resolve, reject) => {
      const rlKey = this.getKey(key);

      const inMemoryBlockMsBeforeExpire = this.getInMemoryBlockMsBeforeExpire(rlKey);
      if (inMemoryBlockMsBeforeExpire > 0) {
        return reject(new RateLimiterRes(0, inMemoryBlockMsBeforeExpire));
      }

      this._upsert(rlKey, pointsToConsume, this._getKeySecDuration(options) * 1000, false, options)
        .then((res) => {
          this._afterConsume(resolve, reject, rlKey, pointsToConsume, res);
        })
        .catch((err) => {
          this._handleError(err, 'consume', resolve, reject, key, pointsToConsume, options);
        });
    });
  }

  /**
   *
   * @param key
   * @param points
   * @param {Object} options
   * @returns Promise<RateLimiterRes>
   */
  penalty(key, points = 1, options = {}) {
    const rlKey = this.getKey(key);
    return new Promise((resolve, reject) => {
      this._upsert(rlKey, points, this._getKeySecDuration(options) * 1000, false, options)
        .then((res) => {
          resolve(this._getRateLimiterRes(rlKey, points, res));
        })
        .catch((err) => {
          this._handleError(err, 'penalty', resolve, reject, key, points, options);
        });
    });
  }

  /**
   *
   * @param key
   * @param points
   * @param {Object} options
   * @returns Promise<RateLimiterRes>
   */
  reward(key, points = 1, options = {}) {
    const rlKey = this.getKey(key);
    return new Promise((resolve, reject) => {
      this._upsert(rlKey, -points, this._getKeySecDuration(options) * 1000, false, options)
        .then((res) => {
          resolve(this._getRateLimiterRes(rlKey, -points, res));
        })
        .catch((err) => {
          this._handleError(err, 'reward', resolve, reject, key, points, options);
        });
    });
  }

  /**
   *
   * @param key
   * @param {Object} options
   * @returns Promise<RateLimiterRes>|null
   */
  get(key, options = {}) {
    const rlKey = this.getKey(key);
    return new Promise((resolve, reject) => {
      this._get(rlKey, options)
        .then((res) => {
          if (res === null || typeof res === 'undefined') {
            resolve(null);
          } else {
            resolve(this._getRateLimiterRes(rlKey, 0, res));
          }
        })
        .catch((err) => {
          this._handleError(err, 'get', resolve, reject, key, options);
        });
    });
  }

  /**
   *
   * @param key
   * @param {Object} options
   * @returns Promise<boolean>
   */
  delete(key, options = {}) {
    const rlKey = this.getKey(key);
    return new Promise((resolve, reject) => {
      this._delete(rlKey, options)
        .then((res) => {
          this._inMemoryBlockedKeys.delete(rlKey);
          resolve(res);
        })
        .catch((err) => {
          this._handleError(err, 'delete', resolve, reject, key, options);
        });
    });
  }

  /**
   * Cleanup keys no-matter expired or not.
   */
  deleteInMemoryBlockedAll() {
    this._inMemoryBlockedKeys.delete();
  }

  /**
   * Get RateLimiterRes object filled depending on storeResult, which specific for exact store
   *
   * @param rlKey
   * @param changedPoints
   * @param storeResult
   * @private
   */
  _getRateLimiterRes(rlKey, changedPoints, storeResult) { // eslint-disable-line no-unused-vars
    throw new Error("You have to implement the method '_getRateLimiterRes'!");
  }

  /**
   * Block key for this.msBlockDuration milliseconds
   * Usually, it just prolongs lifetime of key
   *
   * @param rlKey
   * @param initPoints
   * @param msDuration
   * @param {Object} options
   *
   * @return Promise<any>
   */
  _block(rlKey, initPoints, msDuration, options = {}) {
    return new Promise((resolve, reject) => {
      this._upsert(rlKey, initPoints, msDuration, true, options)
        .then(() => {
          resolve(new RateLimiterRes(0, msDuration > 0 ? msDuration : -1, initPoints));
        })
        .catch((err) => {
          this._handleError(err, 'block', resolve, reject, this.parseKey(rlKey), msDuration / 1000, options);
        });
    });
  }

  /**
   * Have to be implemented in every limiter
   * Resolve with raw result from Store OR null if rlKey is not set
   * or Reject with error
   *
   * @param rlKey
   * @param {Object} options
   * @private
   *
   * @return Promise<any>
   */
  _get(rlKey, options = {}) { // eslint-disable-line no-unused-vars
    throw new Error("You have to implement the method '_get'!");
  }

  /**
   * Have to be implemented
   * Resolve with true OR false if rlKey doesn't exist
   * or Reject with error
   *
   * @param rlKey
   * @param {Object} options
   * @private
   *
   * @return Promise<any>
   */
  _delete(rlKey, options = {}) { // eslint-disable-line no-unused-vars
    throw new Error("You have to implement the method '_delete'!");
  }

  /**
   * Have to be implemented
   * Resolve with object used for {@link _getRateLimiterRes} to generate {@link RateLimiterRes}
   *
   * @param {string} rlKey
   * @param {number} points
   * @param {number} msDuration
   * @param {boolean} forceExpire
   * @param {Object} options
   * @abstract
   *
   * @return Promise<Object>
   */
  _upsert(rlKey, points, msDuration, forceExpire = false, options = {}) {
    throw new Error("You have to implement the method '_upsert'!");
  }
};

var RateLimiterStoreAbstract = /*@__PURE__*/getDefaultExportFromCjs(RateLimiterStoreAbstract_1);

const assert = shared.createAssert('RateLimit');
class RateLimiterStore extends RateLimiterStoreAbstract {
    constructor(storage, options) {
        super(options);
        this.storage = storage;
    }
    /**
     * parses raw data from store to RateLimiterRes object.
     */
    _getRateLimiterRes(key, changedPoints, result) {
        const [consumed = 0, expireTime = 0] = result !== null && result !== void 0 ? result : [];
        const msBeforeNext = expireTime > 0 ? Math.max(expireTime - Date.now(), 0) : -1;
        const isFirstInDuration = !consumed || changedPoints === consumed;
        const currentConsumedPoints = isFirstInDuration ? changedPoints : consumed;
        const res = new rateLimiterFlexible.RateLimiterRes(Math.max(0, this.points - currentConsumedPoints), msBeforeNext, isFirstInDuration ? changedPoints : consumed, isFirstInDuration);
        return res;
    }
    async _upsert(key, points, msDuration, forceExpire = false) {
        var _a;
        key = key.toString();
        const isNeverExpired = msDuration <= 0;
        const expireTime = isNeverExpired ? -1 : Date.now() + msDuration;
        const newRecord = [points, expireTime];
        if (!forceExpire) {
            const [oldPoints = 0, oldExpireTime = 0] = ((_a = (await this.storage.get(key))) !== null && _a !== void 0 ? _a : []);
            // if haven't expired yet
            if (isNeverExpired || (!isNeverExpired && oldExpireTime > Date.now())) {
                newRecord[0] += oldPoints;
            }
            if (!isNeverExpired && oldExpireTime > Date.now()) {
                newRecord[1] = oldExpireTime;
            }
        }
        await this.storage.set(key.toString(), newRecord);
        // need to return the record after upsert
        return newRecord;
    }
    /**
     * returns raw data by key or null if there is no key or expired.
     */
    async _get(key) {
        return Promise.resolve(this.storage.get(key.toString())).then(res => {
            if (!res) {
                return null;
            }
            const [, expireTime] = res;
            // if have expire time and it has expired
            if (expireTime > 0 && expireTime <= Date.now()) {
                return null;
            }
            return res;
        });
    }
    /**
     * returns true on deleted, false if key is not found.
     */
    async _delete(key) {
        try {
            await this.storage.remove(key.toString());
        }
        catch (_a) {
            return false;
        }
        return true;
    }
}
/**
 * The method instance modified by rateLimit, its extension method corresponds to the method of creating an instance in rate-limit-flexible, and the key is the key specified by calling rateLimit.
 * AlovaServerHook can currently only return unextended method types. It has not been changed to customizable returned extended method types.
 */
class LimitedMethod extends HookedMethod {
    constructor(method, limiterKey, limiter) {
        super(method, force => this.consume().then(() => method.send(force)));
        this.limiter = limiter;
        this.keyGetter = shared.isFn(limiterKey) ? () => limiterKey(method) : () => limiterKey;
    }
    getLimiterKey() {
        return this.keyGetter();
    }
    /**
     * Get RateLimiterRes or null.
     */
    get(options) {
        return this.limiter.get(this.getLimiterKey(), options);
    }
    /**
     * Set points by key.
     */
    set(points, msDuration) {
        return this.limiter.set(this.getLimiterKey(), points, msDuration / 1000);
    }
    /**
     * @param points default is 1
     */
    consume(points) {
        return this.limiter.consume(this.getLimiterKey(), points);
    }
    /**
     * Increase number of consumed points in current duration.
     * @param points penalty points
     */
    penalty(points) {
        return this.limiter.penalty(this.getLimiterKey(), points);
    }
    /**
     * Decrease number of consumed points in current duration.
     * @param points reward points
     */
    reward(points) {
        return this.limiter.reward(this.getLimiterKey(), points);
    }
    /**
     * Block key for ms.
     */
    block(msDuration) {
        return this.limiter.block(this.getLimiterKey(), msDuration / 1000);
    }
    /**
     * Reset consumed points.
     */
    delete() {
        return this.limiter.delete(this.getLimiterKey());
    }
}
function createRateLimiter(options = {}) {
    const { points = 4, duration = 4 * 1000, keyPrefix, execEvenly, execEvenlyMinDelayMs, blockDuration } = options;
    const limitedMethodWrapper = createServerHook((method, handlerOptions = {}) => {
        var _a;
        const { key = shared.uuid() } = handlerOptions;
        const storage = (_a = options.storage) !== null && _a !== void 0 ? _a : shared.getOptions(method).l2Cache;
        assert(!!storage, 'storage is not define');
        const limiter = new RateLimiterStore(storage, {
            points,
            duration: Math.floor(duration / 1000),
            keyPrefix,
            execEvenly,
            execEvenlyMinDelayMs,
            blockDuration: blockDuration ? Math.floor(blockDuration / 1000) : blockDuration,
            storeClient: {}
        });
        return new LimitedMethod(method, key, limiter);
    });
    return limitedMethodWrapper;
}

const retry = createServerHook((method, options = {}) => {
    const { retry = 3, backoff = { delay: 1000 } } = options;
    let retryTimes = 0;
    return new HookedMethod(method, forceRequest => new Promise((resolve, reject) => {
        const sendRequest = () => {
            method
                .send(forceRequest)
                .then(resolve)
                .catch(error => {
                // when not reach retry times or return true from retry function, it will retry again.
                if (shared.isNumber(retry) ? retryTimes < retry : retry(error)) {
                    retryTimes += 1;
                    // calculate retry delay time with pram `backoff` and current retry times.
                    const retryDelay = shared.delayWithBackoff(backoff, retryTimes);
                    setTimeout(sendRequest, retryDelay);
                }
                else {
                    reject(error);
                }
            });
        };
        sendRequest();
    }));
});

exports.HookedMethod = HookedMethod;
exports.atomize = atomize;
exports.createCaptchaProvider = createCaptchaProvider;
exports.createRateLimiter = createRateLimiter;
exports.retry = retry;
