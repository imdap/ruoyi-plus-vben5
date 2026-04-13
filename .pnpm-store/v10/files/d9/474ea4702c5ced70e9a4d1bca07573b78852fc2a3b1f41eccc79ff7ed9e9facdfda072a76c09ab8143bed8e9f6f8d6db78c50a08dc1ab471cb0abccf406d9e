import { inject, provide, ref } from "vue";
const NotificationContext = Symbol("NotificationContext");
function useNotificationProvider(props) {
	provide(NotificationContext, props);
	return props;
}
function useNotificationContext() {
	return inject(NotificationContext, ref({}));
}
export { NotificationContext, useNotificationContext, useNotificationProvider };
