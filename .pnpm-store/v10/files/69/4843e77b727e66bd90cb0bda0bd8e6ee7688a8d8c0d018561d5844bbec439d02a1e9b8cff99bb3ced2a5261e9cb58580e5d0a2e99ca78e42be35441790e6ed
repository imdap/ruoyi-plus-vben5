import { inject, provide, ref } from "vue";

//#region src/avatar/AvatarContext.ts
const AvatarContextKey = Symbol("AvatarContext");
function useAvatarContext() {
	return inject(AvatarContextKey, ref({}));
}
function useAvatarProvider(value) {
	provide(AvatarContextKey, value);
}

//#endregion
export { useAvatarContext, useAvatarProvider };