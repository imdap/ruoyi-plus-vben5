import { __require as requireGetBuiltIn } from './get-built-in.js';
import { __require as requireDefineBuiltInAccessor } from './define-built-in-accessor.js';
import { __require as requireWellKnownSymbol } from './well-known-symbol.js';
import { __require as requireDescriptors } from './descriptors.js';

var setSpecies;
var hasRequiredSetSpecies;

function requireSetSpecies () {
	if (hasRequiredSetSpecies) return setSpecies;
	hasRequiredSetSpecies = 1;
	var getBuiltIn = requireGetBuiltIn();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var wellKnownSymbol = requireWellKnownSymbol();
	var DESCRIPTORS = requireDescriptors();

	var SPECIES = wellKnownSymbol('species');

	setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
	    defineBuiltInAccessor(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};
	return setSpecies;
}

export { requireSetSpecies as __require };
