"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCode = exports.isFsError = void 0;
const isRecord = (o) => !!o && typeof o === 'object';
const hasString = (o, key) => key in o && typeof o[key] === 'string';
const isFsError = (o) => isRecord(o) && hasString(o, 'code') && hasString(o, 'path');
exports.isFsError = isFsError;
const errorCode = (er) => isRecord(er) && hasString(er, 'code') ? er.code : null;
exports.errorCode = errorCode;
//# sourceMappingURL=error.js.map