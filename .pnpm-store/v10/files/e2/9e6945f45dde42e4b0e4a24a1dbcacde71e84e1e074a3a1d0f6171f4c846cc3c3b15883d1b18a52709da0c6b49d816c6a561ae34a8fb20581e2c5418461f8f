import XEUtils from 'xe-utils';
export function handleNumber(val) {
    return XEUtils.isString(val) ? val.replace(/[^0-9e.-]/g, '') : val;
}
export function toFloatValueFixed(inputValue, digitsValue) {
    if (/^-/.test('' + inputValue)) {
        return XEUtils.toFixed(XEUtils.ceil(inputValue, digitsValue), digitsValue);
    }
    return XEUtils.toFixed(XEUtils.floor(inputValue, digitsValue), digitsValue);
}
