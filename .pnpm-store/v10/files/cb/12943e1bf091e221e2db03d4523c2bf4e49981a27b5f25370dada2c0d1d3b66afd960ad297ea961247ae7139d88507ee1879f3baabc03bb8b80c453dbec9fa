import { __exports as objectDefineProperties } from '../../../_virtual/object-define-properties.js';
import { __require as requireDescriptors } from './descriptors.js';
import { __require as requireV8PrototypeDefineBug } from './v8-prototype-define-bug.js';
import { __require as requireObjectDefineProperty } from './object-define-property.js';
import { __require as requireAnObject } from './an-object.js';
import { __require as requireToIndexedObject } from './to-indexed-object.js';
import { __require as requireObjectKeys } from './object-keys.js';

var hasRequiredObjectDefineProperties;

function requireObjectDefineProperties () {
	if (hasRequiredObjectDefineProperties) return objectDefineProperties;
	hasRequiredObjectDefineProperties = 1;
	var DESCRIPTORS = requireDescriptors();
	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
	var definePropertyModule = requireObjectDefineProperty();
	var anObject = requireAnObject();
	var toIndexedObject = requireToIndexedObject();
	var objectKeys = requireObjectKeys();

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};
	return objectDefineProperties;
}

export { requireObjectDefineProperties as __require };
