import { __require as requireDescriptors } from './descriptors.js';
import { __require as requireObjectDefineProperty } from './object-define-property.js';
import { __require as requireCreatePropertyDescriptor } from './create-property-descriptor.js';

var createProperty;
var hasRequiredCreateProperty;

function requireCreateProperty () {
	if (hasRequiredCreateProperty) return createProperty;
	hasRequiredCreateProperty = 1;
	var DESCRIPTORS = requireDescriptors();
	var definePropertyModule = requireObjectDefineProperty();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();

	createProperty = function (object, key, value) {
	  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};
	return createProperty;
}

export { requireCreateProperty as __require };
