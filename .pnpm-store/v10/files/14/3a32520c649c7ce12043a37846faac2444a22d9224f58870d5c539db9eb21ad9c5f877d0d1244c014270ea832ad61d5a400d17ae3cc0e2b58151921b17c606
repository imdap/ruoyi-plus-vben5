var perform;
var hasRequiredPerform;

function requirePerform () {
	if (hasRequiredPerform) return perform;
	hasRequiredPerform = 1;
	perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};
	return perform;
}

export { requirePerform as __require };
