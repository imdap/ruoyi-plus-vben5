import { __require as requireSymbolConstructorDetection } from './symbol-constructor-detection.js';

var useSymbolAsUid;
var hasRequiredUseSymbolAsUid;

function requireUseSymbolAsUid () {
	if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
	hasRequiredUseSymbolAsUid = 1;
	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL = requireSymbolConstructorDetection();

	useSymbolAsUid = NATIVE_SYMBOL &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';
	return useSymbolAsUid;
}

export { requireUseSymbolAsUid as __require };
