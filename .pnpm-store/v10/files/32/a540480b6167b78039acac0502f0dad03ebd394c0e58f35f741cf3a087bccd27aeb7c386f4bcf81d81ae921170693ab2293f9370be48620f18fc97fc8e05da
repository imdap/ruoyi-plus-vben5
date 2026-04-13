import { inject, provide } from "vue";

//#region src/form/validateMessagesContext.tsx
const ValidateMessagesContextKey = Symbol("ValidateMessagesContext");
function useValidateMessagesProvider(validateMessages) {
	provide(ValidateMessagesContextKey, validateMessages);
}
function useValidateMessagesContext() {
	return inject(ValidateMessagesContextKey, void 0);
}

//#endregion
export { useValidateMessagesContext, useValidateMessagesProvider };