Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
const NotificationContext = Symbol("NotificationContext");
function useNotificationProvider(props) {
	(0, vue.provide)(NotificationContext, props);
	return props;
}
function useNotificationContext() {
	return (0, vue.inject)(NotificationContext, (0, vue.ref)({}));
}
exports.NotificationContext = NotificationContext;
exports.useNotificationContext = useNotificationContext;
exports.useNotificationProvider = useNotificationProvider;
