const isRecord = (o) => !!o && typeof o === 'object';
const hasString = (o, key) => key in o && typeof o[key] === 'string';
export const isFsError = (o) => isRecord(o) && hasString(o, 'code') && hasString(o, 'path');
export const errorCode = (er) => isRecord(er) && hasString(er, 'code') ? er.code : null;
//# sourceMappingURL=error.js.map