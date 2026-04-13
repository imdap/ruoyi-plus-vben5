import { __exports as objectGetOwnPropertyDescriptor } from '../../../_virtual/object-get-own-property-descriptor.js';
import { __require as requireDescriptors } from './descriptors.js';
import { __require as requireFunctionCall } from './function-call.js';
import { __require as requireObjectPropertyIsEnumerable } from './object-property-is-enumerable.js';
import { __require as requireCreatePropertyDescriptor } from './create-property-descriptor.js';
import { __require as requireToIndexedObject } from './to-indexed-object.js';
import { __require as requireToPropertyKey } from './to-property-key.js';
import { __require as requireHasOwnProperty } from './has-own-property.js';
import { __require as requireIe8DomDefine } from './ie8-dom-define.js';

var hasRequiredObjectGetOwnPropertyDescriptor;

function requireObjectGetOwnPropertyDescriptor () {
	if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
	hasRequiredObjectGetOwnPropertyDescriptor = 1;
	var DESCRIPTORS = requireDescriptors();
	var call = requireFunctionCall();
	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();
	var toIndexedObject = requireToIndexedObject();
	var toPropertyKey = requireToPropertyKey();
	var hasOwn = requireHasOwnProperty();
	var IE8_DOM_DEFINE = requireIe8DomDefine();

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};
	return objectGetOwnPropertyDescriptor;
}

export { requireObjectGetOwnPropertyDescriptor as __require };
