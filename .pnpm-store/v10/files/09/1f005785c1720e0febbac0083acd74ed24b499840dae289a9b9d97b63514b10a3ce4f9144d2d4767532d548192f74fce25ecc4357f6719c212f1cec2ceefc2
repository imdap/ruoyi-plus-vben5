import { __require as requireAnObject } from './an-object.js';
import { __require as requireAConstructor } from './a-constructor.js';
import { __require as requireIsNullOrUndefined } from './is-null-or-undefined.js';
import { __require as requireWellKnownSymbol } from './well-known-symbol.js';

var speciesConstructor;
var hasRequiredSpeciesConstructor;

function requireSpeciesConstructor () {
	if (hasRequiredSpeciesConstructor) return speciesConstructor;
	hasRequiredSpeciesConstructor = 1;
	var anObject = requireAnObject();
	var aConstructor = requireAConstructor();
	var isNullOrUndefined = requireIsNullOrUndefined();
	var wellKnownSymbol = requireWellKnownSymbol();

	var SPECIES = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
	};
	return speciesConstructor;
}

export { requireSpeciesConstructor as __require };
