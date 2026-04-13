Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util_dist_Dom_canUseDom = require("@v-c/util/dist/Dom/canUseDom");
_v_c_util_dist_Dom_canUseDom = require_rolldown_runtime.__toESM(_v_c_util_dist_Dom_canUseDom);
var uuid = 0;
const isBrowserClient = process.env.NODE_ENV !== "test" && (0, _v_c_util_dist_Dom_canUseDom.default)();
function getUUID() {
	let retId;
	if (isBrowserClient) {
		retId = uuid;
		uuid += 1;
	} else retId = "TEST_OR_SSR";
	return retId;
}
var useId_default = (id) => {
	const innerId = (0, vue.ref)();
	innerId.value = `vc_progress_${getUUID()}`;
	return id || innerId.value;
};
exports.default = useId_default;
exports.isBrowserClient = isBrowserClient;
