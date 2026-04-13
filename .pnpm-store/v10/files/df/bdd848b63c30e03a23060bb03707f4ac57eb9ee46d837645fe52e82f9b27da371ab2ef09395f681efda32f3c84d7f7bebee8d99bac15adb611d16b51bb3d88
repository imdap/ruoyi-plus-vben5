import raf from "@v-c/util/dist/raf";
function channelUpdate(callback) {
	if (typeof MessageChannel === "undefined") raf(callback);
	else {
		const channel = new MessageChannel();
		channel.port1.onmessage = () => callback();
		channel.port2.postMessage(void 0);
	}
}
export { channelUpdate as default };
