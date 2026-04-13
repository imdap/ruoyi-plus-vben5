//#region src/errors.ts
var RPCRequestError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "RPCRequestError";
	}
};
var AbortRPCRequestError = class extends RPCRequestError {
	constructor(message) {
		super(message);
		this.name = "AbortRPCRequestError";
	}
};
var TimeoutRPCRequestError = class extends RPCRequestError {
	constructor(message) {
		super(message);
		this.name = "TimeoutRPCRequestError";
	}
};
var UnknownMethodRPCRequestError = class extends RPCRequestError {
	method;
	constructor(method, message) {
		super(message || `Unknown method: ${method}`);
		this.name = "UnknownMethodRPCRequestError";
		this.method = method;
	}
};
var MalformedRPCRequestError = class extends RPCRequestError {
	request;
	constructor(message, request) {
		super(message);
		this.name = "MalformedRPCRequestError";
		this.request = request;
	}
};
var CanceledRPCRequestError = class extends RPCRequestError {
	constructor(message) {
		super(message ?? "The RPC request was canceled");
		this.name = "CanceledRPCRequestError";
	}
};
var AlreadyDisposedError = class extends Error {
	constructor() {
		super("NotifyEmitter has been disposed.");
		this.name = "AlreadyDisposedError";
	}
};
//#endregion
//#region src/Future.ts
var Future = class {
	#isResolved = false;
	#isRejected = false;
	#promise;
	#resolve;
	#reject;
	constructor() {
		this.#reject = noop;
		this.#resolve = noop;
		this.#promise = new Promise((resolve, reject) => {
			this.#resolve = resolve;
			this.#reject = reject;
		});
	}
	/**
	* Indicates if the promise has been resolved or rejected.
	*
	* Use isRejected to determine if it was rejected.
	*/
	get isResolved() {
		return this.#isResolved;
	}
	/**
	* Indicates if the promise has been rejected.
	*/
	get isRejected() {
		return this.#isRejected;
	}
	get promise() {
		return this.#promise;
	}
	resolve(value) {
		if (this.#isResolved) return;
		this.#isResolved = true;
		this.#resolve(value);
	}
	reject(reason) {
		if (this.#isResolved) return;
		this.#isResolved = true;
		this.#isRejected = true;
		this.#reject(reason);
	}
};
function noop() {}
//#endregion
//#region src/notify.ts
/**
* A Class used to emit notifications to registered handlers.
*/
var NotifyEmitter = class {
	#handlers = /* @__PURE__ */ new Map();
	#disposed = false;
	/**
	* Registers a handler for the event. Multiple handlers can be added. The same handler will
	* not be added more than once. To add the same handler multiple times, use a wrapper function.
	*
	* The handler will NOT be called during the registration. They will be called when {@link notify} is called.
	*
	* Note: This function can be used without needing to bind 'this'.
	* @param handler - the handler to add.
	* @returns a Disposable to remove the handler.
	*/
	onEvent = (handler) => this.#onEvent(handler);
	/**
	* Notify all handlers of the event.
	*
	* If a handler throws an error, the error is not caught and will propagate up the call stack.
	*
	* Note: This function can be used without needing to bind 'this'.
	* @param value - The event value.
	*/
	notify = (value) => this.#notify(value);
	/**
	* A NotifyEvent that only fires once for each handler added.
	*
	* Multiple handlers can be added. The same handler can be added multiple times
	* and will be called once for each time it is added.
	*
	* Note: This property can be used without needing to bind 'this'.
	*/
	once = notifyEventOnce(this.onEvent);
	/**
	* Get a Promise that resolves with the next event.
	* @param signal - A signal to abort the wait.
	* @returns a Promise that will resolve with the next value emitted.
	*/
	awaitNext = (signal) => notifyEventToPromise(this.onEvent, signal);
	/**
	* The number of registered handlers.
	*/
	get size() {
		return this.#handlers.size;
	}
	/**
	* Removes all registered handlers.
	*/
	clear() {
		this.#handlers.clear();
	}
	#onEvent(handler) {
		if (this.#disposed) throw new AlreadyDisposedError();
		const found = this.#handlers.get(handler);
		if (found) return found;
		let disposed = false;
		const disposable = { [Symbol.dispose]: () => {
			if (disposed) return;
			disposed = true;
			this.#handlers.delete(handler);
		} };
		this.#handlers.set(handler, disposable);
		return disposable;
	}
	/**
	* Notify all handlers of the event.
	* @param value - The event value.
	*/
	#notify(value) {
		for (const handler of [...this.#handlers.keys()]) handler(value);
	}
	[Symbol.dispose]() {
		if (this.#disposed) return;
		this.#disposed = true;
		this.#handlers.clear();
	}
};
/**
* Convert a NotifyEvent to a Promise.
* @param event - The event to convert.
* @param signal - Optional AbortSignal to cancel the subscription if the promise is abandoned.
* @returns A Promise that resolves with the first value emitted by the event.
*/
function notifyEventToPromise(event, signal) {
	const once = notifyEventOnce(event);
	return new Promise((resolve, reject) => {
		signal?.throwIfAborted();
		const disposable = once((value) => {
			signal?.removeEventListener("abort", onAbort);
			resolve(value);
		});
		function onAbort() {
			disposable[Symbol.dispose]();
			signal?.removeEventListener("abort", onAbort);
			reject(signal?.reason);
		}
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
/**
* Create a NotifyEvent that only fires once.
*
* The same handler can be added multiple times and will be called once for each time it is added.
* This is different from a normal NotifyEvent where the same handler is only added once.
*
* @param event - The event to wrap.
* @returns A NotifyOnceEvent that only fires once for the handlers added.
*/
function notifyEventOnce(event) {
	function notifyOnce(handler) {
		const disposable = event((e) => {
			disposable[Symbol.dispose]();
			handler(e);
		});
		return disposable;
	}
	return notifyOnce;
}
//#endregion
//#region src/MessagePortEvents.ts
/**
* Wraps a {@link MessagePortLike} and exposes its key events through a
* {@link NotifyEmitter}-based interface.
*
* This class listens to the underlying port's `message`,
* `messageerror`, and `close` events and re-emits them as
* {@link NotifyEvent} instances, making it easier to subscribe to and manage
* notifications from a message port.
*/
var MessagePortNotifyEvents = class {
	#notifyMessage = new NotifyEmitter();
	#notifyClose = new NotifyEmitter();
	#notifyMessageError = new NotifyEmitter();
	#port;
	#disposed = false;
	#closed;
	constructor(port) {
		this.#port = port;
		this.#port.addListener("message", this.#notifyMessage.notify);
		this.#port.addListener("messageerror", this.#notifyMessageError.notify);
		this.#port.addListener("close", this.#notifyClose.notify);
		this.#notifyClose.once((event) => this.#closed = event);
	}
	[Symbol.dispose]() {
		if (this.#disposed) return;
		this.#disposed = true;
		this.#port.removeListener("message", this.#notifyMessage.notify);
		this.#port.removeListener("messageerror", this.#notifyMessageError.notify);
		this.#port.removeListener("close", this.#notifyClose.notify);
		this.#notifyMessage[Symbol.dispose]();
		this.#notifyClose[Symbol.dispose]();
		this.#notifyMessageError[Symbol.dispose]();
	}
	/**
	* Register a handler to be called when a message is received.
	*/
	get onMessage() {
		return this.#notifyMessage.onEvent;
	}
	/**
	* Return a Promise that resolves on the next message.
	* @param signal - A signal to abort the wait.
	* @returns A Promise that resolves with the next message received.
	*/
	awaitNextMessage = (signal) => this.#notifyMessage.awaitNext(signal);
	/**
	* Return a Promise that resolves on the close event.
	* @param signal - A signal to abort the wait.
	* @returns A Promise that resolves when the port is closed.
	*/
	awaitClose = (signal) => {
		if (this.#closed) return Promise.resolve(this.#closed);
		return this.#notifyClose.awaitNext(signal);
	};
	/**
	* Post a message to the underlying port.
	* @param message - The message to post.
	*/
	postMessage = (message) => this.#port.postMessage(message);
	/**
	* Start the underlying port.
	*/
	start() {
		this.#port.start?.();
	}
	/**
	* Close the underlying port.
	*/
	close() {
		this.#port.close?.();
	}
	/**
	* Register a handler to be called when the port is closed.
	*/
	get onClose() {
		return this.#notifyClose.onEvent;
	}
	/**
	* Register a handler to be called when a message error is received.
	*/
	get onMessageError() {
		return this.#notifyMessageError.onEvent;
	}
	get isClosed() {
		return this.#closed !== void 0;
	}
	get port() {
		return this.#port;
	}
};
//#endregion
//#region src/modelsHelpers.ts
const RequestTypeNames = {
	ready: "ready",
	request: "request",
	cancel: "cancel",
	ok: "ok"
};
const ResponseTypeNames = {
	ready: "ready",
	response: "response",
	canceled: "canceled",
	ok: "ok"
};
const knownRPCMessageTypes = new Set([...Object.keys(RequestTypeNames), ...Object.keys(ResponseTypeNames)]);
const sig = "RPC0";
function isRPCBaseMessage(message) {
	if (!message || typeof message !== "object") return false;
	const m = message;
	return m.sig === sig && (typeof m.id === "string" || typeof m.id === "number") && knownRPCMessageTypes.has(m.type);
}
function isBaseResponse(message) {
	return isRPCBaseMessage(message) && message.type in ResponseTypeNames;
}
function isRPCErrorResponse(response) {
	return isBaseResponse(response) && response.type === ResponseTypeNames.response && response.error !== void 0;
}
function isRPCCancelRequest(request) {
	return request.type === RequestTypeNames.cancel;
}
function isRPCCanceledResponse(response) {
	return response.type === ResponseTypeNames.canceled;
}
function isRPCOkRequest(request) {
	return request.type === RequestTypeNames.ok;
}
function isRPCReadyRequest(request) {
	return request.type === RequestTypeNames.ready;
}
function isRPCReadyResponse(response) {
	return response.type === ResponseTypeNames.ready && typeof response.code === "number";
}
function isRPCResponse(response) {
	return response.type === ResponseTypeNames.response && "result" in response;
}
function isRPCRequest(message) {
	return message.type === RequestTypeNames.request && message.method !== void 0;
}
/**
* Creates a RPC Request Message.
* @param id - The unique request identifier.
* @param method - The method name.
* @param params - The parameters for the request.
* @returns A RPC Request Message.
*/
function createRPCMethodRequest(id, method, params) {
	return {
		sig,
		id,
		type: RequestTypeNames.request,
		method,
		params
	};
}
/**
* Creates a cancel request message.
* @param id - The request ID to be canceled.
* @returns A cancel request message.
*/
function createRPCCancelRequest(id) {
	return {
		sig,
		id,
		type: RequestTypeNames.cancel
	};
}
/**
* Creates a cancel request message.
* @param id - The request ID to be canceled.
* @param code - The response code
*   - 200 (ok) - if canceled successfully upon request.
*   - 408 (timeout) - if the cancellation was initiated by the server.
*   - 503 (unavailable) - if the server is shutting down.
* @returns A cancel request message.
*/
function createRPCCanceledResponse(id, code) {
	return {
		sig,
		id,
		type: ResponseTypeNames.canceled,
		code
	};
}
/**
* Creates a RPC Response Message.
* @param id - The matching request ID.
* @param result - the result of the request.
* @returns A RPC Response Message.
*/
function createRPCResponse(id, result, code) {
	return {
		sig,
		id,
		type: ResponseTypeNames.response,
		code,
		result
	};
}
/**
* Creates a RPC Error Message.
* @param id - The matching request ID for which the error occurred.
* @param error - The error information.
* @returns A RPC Error Message.
*/
function createRPCError(id, error, code) {
	return {
		sig,
		id,
		type: ResponseTypeNames.response,
		code,
		error
	};
}
function createRPCOkRequest(id) {
	return {
		sig,
		id,
		type: RequestTypeNames.ok
	};
}
function createRPCOkResponse(id, code) {
	return {
		sig,
		id,
		type: ResponseTypeNames.ok,
		code
	};
}
function createRPCReadyRequest(id) {
	return {
		sig,
		id,
		type: RequestTypeNames.ready
	};
}
function createRPCReadyResponse(id, code) {
	return {
		sig,
		id,
		type: ResponseTypeNames.ready,
		code
	};
}
//#endregion
//#region src/client.ts
const DefaultOkOptions = { timeoutMs: 200 };
/**
* The RPC Client.
*/
var RPCClientImpl = class {
	#port;
	#count = 0;
	#options;
	#pendingRequests = /* @__PURE__ */ new Map();
	#pendingRequestsByPromise = /* @__PURE__ */ new WeakMap();
	#defaultTimeoutMs;
	#isReady;
	#ready;
	/**
	* Create an RPC Client.
	* @param config - The client configuration.
	*/
	constructor(config) {
		this.#port = new MessagePortNotifyEvents(config.port);
		this.#options = config;
		this.#defaultTimeoutMs = config.timeoutMs;
		this.#isReady = false;
		this.#ready = new Future();
		this.#port.onMessage((msg) => this.#processMessageFromServer(msg));
		this.#port.start();
	}
	/**
	* Make a request to the RPC server.
	*
	* It is unlikely you need to use this method directly. Consider using `call` or `getApi` instead.
	*
	* @param method - The method name.
	* @param params - The method parameters.
	* @param options - Request options including abort signal and timeout.
	* @returns The pending client request.
	*/
	request(method, params, options) {
		const id = this.#calcId(method);
		const request = createRPCMethodRequest(id, method, params);
		const pendingRequest = this.#sendRequest(request, options);
		const response = pendingRequest.response.then(handleResponse);
		this.#pendingRequestsByPromise.set(response, id);
		return {
			id,
			method,
			response,
			abort: pendingRequest.abort,
			cancel: pendingRequest.cancel,
			get isResolved() {
				return pendingRequest.isResolved;
			},
			get isCanceled() {
				return pendingRequest.isCanceled;
			}
		};
		function handleResponse(res) {
			if (isRPCErrorResponse(res)) throw res.error;
			if (isRPCCanceledResponse(res)) throw new CanceledRPCRequestError(`Request ${id} was canceled`);
			if (isRPCResponse(res)) return res.result;
			throw new Error(`Malformed response for request ${id}`);
		}
	}
	#sendRequest(request, options = {}) {
		const id = request.id;
		const requestType = request.type;
		let isResolved = false;
		let isCanceled = false;
		const timeoutMs = options.timeoutMs ?? this.#defaultTimeoutMs;
		const timeoutSignal = timeoutMs ? AbortSignal.timeout(timeoutMs) : void 0;
		const future = new Future();
		options.signal?.addEventListener("abort", abort);
		timeoutSignal?.addEventListener("abort", timeoutHandler);
		const response = future.promise;
		const cancelRequest = () => this.#port.postMessage(createRPCCancelRequest(id));
		const cancel = async () => {
			if (isResolved || isCanceled) return isCanceled;
			cancelRequest();
			await response.catch(() => {});
			return isCanceled;
		};
		const pendingRequest = {
			id,
			request,
			response,
			handleResponse,
			abort,
			cancel,
			get isResolved() {
				return isResolved;
			},
			get isCanceled() {
				return isCanceled;
			}
		};
		this.#pendingRequests.set(id, pendingRequest);
		this.#pendingRequestsByPromise.set(response, id);
		const cleanup = () => {
			options.signal?.removeEventListener("abort", abort);
			timeoutSignal?.removeEventListener("abort", timeoutHandler);
			this.#cleanupPendingRequest(pendingRequest);
		};
		this.#port.postMessage(request);
		return pendingRequest;
		function timeoutHandler() {
			abort(new TimeoutRPCRequestError(`Request ${requestType} ${id} timed out after ${timeoutMs} ms`));
		}
		function abort(reason) {
			if (isResolved || isCanceled) return;
			isCanceled = true;
			cancelRequest();
			reason = reason instanceof Event ? void 0 : reason;
			reason ??= `Request ${id} aborted`;
			reason = typeof reason === "string" ? new AbortRPCRequestError(reason) : reason;
			cleanup();
			future.reject(reason);
		}
		function handleResponse(res) {
			if (isResolved || isCanceled) return;
			isResolved = true;
			if (isRPCCanceledResponse(res)) isCanceled = true;
			cleanup();
			future.resolve(res);
		}
	}
	/**
	* Check the health of the RPC server.
	* @param options - used to set timeout and abort signal.
	* @returns resolves to true if the server is OK, false on timeout.
	*/
	async isOK(options = DefaultOkOptions) {
		try {
			const res = await this.#sendRequest(createRPCOkRequest(this.#calcId("isOK")), options).response;
			return isBaseResponse(res) && res.type === "ok" && res.code === 200;
		} catch {
			return false;
		}
	}
	/**
	* The current known ready state of the RPC server.
	* - `true` - The server is ready.
	* - `false` - The server is not ready.
	*/
	get isReady() {
		return this.#isReady;
	}
	/**
	* Check if the RPC server is ready. If already ready, returns true immediately.
	* If not ready, sends a 'ready' request to the server.
	* @param options - used to set timeout and abort signal.
	* @returns resolves to true when the server is ready, rejects if the request times out or fails.
	*/
	async ready(options) {
		if (this.#isReady) return true;
		await this.#sendRequest(createRPCReadyRequest(this.#calcId("ready")), options).response;
		return this.#isReady;
	}
	/**
	* Call a method on the RPC server.
	* @param method - The method name.
	* @param params - The method parameters.
	* @param options - Call options including abort signal.
	* @returns A Promise with the method result.
	*/
	call(method, params, options) {
		return this.request(method, params, options).response;
	}
	/**
	* Get the API for the given method names.
	*
	* This is useful passing the API to other parts of the code that do not need to know about the RPCClient.
	*
	* @param methods - The method names to include in the API.
	* @returns A partial API with the requested methods.
	*/
	getApi(methods) {
		const apiEntries = methods.map((method) => [method, ((...params) => this.call(method, params))]);
		return Object.fromEntries(apiEntries);
	}
	/**
	* Get info about a pending request by its RequestID.
	* @param id - The RequestID of the pending request.
	* @returns The found pending request or undefined if not found.
	*/
	getPendingRequestById(id) {
		return this.#pendingRequests.get(id);
	}
	/**
	* Get info about a pending request by the promise returned using `call` or an api method.
	* @param id - The RequestID of the pending request.
	* @returns The found pending request or undefined if not found.
	*/
	getPendingRequestByPromise(promise) {
		const requestId = this.#pendingRequestsByPromise.get(promise);
		if (!requestId) return void 0;
		return this.getPendingRequestById(requestId);
	}
	/**
	* Get the number of pending requests.
	*/
	get length() {
		return this.#pendingRequests.size;
	}
	#calcId(method) {
		const suffix = this.#options.randomUUID ? this.#options.randomUUID() : `${performance.now()}`;
		return `${method}-${++this.#count}-${suffix}`;
	}
	#cleanupPendingRequest(request) {
		this.#pendingRequests.delete(request.id);
		this.#pendingRequestsByPromise.delete(request.response);
	}
	#processMessageFromServer(msg) {
		if (!isBaseResponse(msg)) return;
		this.#handleReadyResponse(msg);
		const pendingRequest = this.#pendingRequests.get(msg.id);
		if (!pendingRequest) return;
		pendingRequest.handleResponse(msg);
	}
	/**
	* Handle possible ready response messages.
	* @param msg - The message to handle.
	*/
	#handleReadyResponse(msg) {
		if (!isRPCReadyResponse(msg)) return;
		if (this.#ready.isResolved) return;
		this.#isReady = msg.code === 200;
		this.#ready.resolve(this.#isReady);
	}
	/**
	* Abort a pending request by its promise.
	*
	* Note: the request promise will be rejected with an AbortRequestError.
	* @param promise - The promise returned by the request.
	* @param reason - The reason for aborting the request.
	* @returns True if the request was found and aborted, false otherwise.
	*/
	abortPromise(promise, reason) {
		const pendingRequest = this.getPendingRequestByPromise(promise);
		if (!pendingRequest) return false;
		return this.abortRequest(pendingRequest.id, reason);
	}
	/**
	* Abort a pending request by its RequestId.
	*
	* Note: the request promise will be rejected with an AbortRequestError.
	* @param requestId - The RequestID of the request to abort.
	* @param reason - The reason for aborting the request.
	* @returns True if the request was found and aborted, false otherwise.
	*/
	abortRequest(requestId, reason) {
		const pendingRequest = this.getPendingRequestById(requestId);
		if (!pendingRequest) return false;
		pendingRequest.abort(reason);
		return true;
	}
	/**
	* Abort all pending requests.
	*
	* Note: each request promise will be rejected with an AbortRequestError.
	*
	* @param reason - The reason for aborting the request.
	*/
	abortAllRequests(reason) {
		for (const pendingRequest of this.#pendingRequests.values()) try {
			pendingRequest.abort(reason);
		} catch {}
	}
	/**
	* Cancel a pending request by its RequestID.
	*
	* Tries to cancel the request by sending a cancel request to the server and waiting for the response.
	* @param id - The RequestID of the request to cancel.
	* @returns resolves to true if the request was found and canceled, false otherwise.
	*/
	async cancelRequest(id) {
		const pendingRequest = this.getPendingRequestById(id);
		if (!pendingRequest) return false;
		return await pendingRequest.cancel();
	}
	/**
	* Cancel a pending request by its Promise.
	*
	* Tries to cancel the request by sending a cancel request to the server and waiting for the response.
	* @param id - The RequestID of the request to cancel.
	* @returns resolves to true if the request was found and canceled, false otherwise.
	*/
	async cancelPromise(promise) {
		const request = this.getPendingRequestByPromise(promise);
		if (!request) return false;
		return this.cancelRequest(request.id);
	}
	/**
	* Set the default timeout for requests. Requests can override this value.
	* @param timeoutMs - the timeout in milliseconds
	*/
	setTimeout(timeoutMs) {
		this.#defaultTimeoutMs = timeoutMs;
	}
	/**
	* Dispose of the RPC client, aborting all pending requests and closing the port if specified in options.
	*/
	[Symbol.dispose]() {
		this.abortAllRequests(/* @__PURE__ */ new Error("RPC Client disposed"));
		this.#pendingRequests.clear();
		if (this.#options.closePortOnDispose) this.#port.close();
		this.#port[Symbol.dispose]();
	}
};
/**
* The RPC Client.
*/
var RPCClient = class extends RPCClientImpl {
	/**
	* Create an RPC Client.
	* @param config - The client configuration.
	*/
	constructor(config) {
		super(config);
	}
};
//#endregion
//#region src/protocol.ts
/**
* Cast the API methods to RPCProtocol.
* @param methods - The API methods.
* @returns the API methods as RPCProtocol.
*/
function protocolDefinition(methods) {
	return methods;
}
/**
* Cast the API methods to RPCProtocolMethods.
* @param apiMethods - The API methods.
* @returns the API methods as RPCProtocolMethods.
*/
function protocolMethods(apiMethods) {
	return apiMethods;
}
//#endregion
//#region src/assert.ts
/**
* Note: This code is here to avoid a dependency on Node's 'assert' module.
*/
/**
* Asserts that a condition is true.
* @param condition - The condition to assert.
* @param msg - optional message for the assertion error.
* @throws {AssertionError} If the condition is false.
*/
function assert(condition, msg) {
	if (!condition) throw new AssertionError(msg);
}
var AssertionError = class extends Error {
	constructor(message) {
		super(message || "Assertion failed");
		this.name = "AssertionError";
	}
};
//#endregion
//#region src/server.ts
const RESPONSE_CODES = {
	OK: 200,
	BadRequest: 400,
	RequestTimeout: 408,
	InternalServerError: 500,
	ServiceUnavailable: 503
};
var RPCServerImpl = class {
	#portWrapper;
	#options;
	#allowedMethods;
	#methods;
	#pendingRequests;
	constructor(config, methods) {
		this.#portWrapper = new MessagePortNotifyEvents(config.port);
		this.#options = config;
		this.#methods = methods;
		this.#allowedMethods = new Set(Object.keys(this.#methods).filter((k) => typeof this.#methods[k] === "function"));
		this.#pendingRequests = /* @__PURE__ */ new Map();
		this.#portWrapper.onMessage((msg) => this.#handleMessage(msg));
		this.#portWrapper.start();
		this.#sendReadyResponse();
	}
	get #isClosed() {
		return this.#portWrapper.isClosed;
	}
	#sendResponse(response) {
		if (this.#isClosed) return;
		this.#portWrapper.postMessage(response);
	}
	#handleMessage(msg) {
		let id = 0;
		try {
			if (!isRPCBaseMessage(msg)) {
				if (this.#options.returnMalformedRPCRequestError) throw new MalformedRPCRequestError("Malformed RPC request", msg);
				return;
			}
			id = msg.id;
			if (isRPCCancelRequest(msg)) {
				this.#pendingRequests.delete(msg.id);
				this.#sendCancelResponse(msg.id, RESPONSE_CODES.OK);
				return;
			}
			if (isRPCReadyRequest(msg)) {
				this.#sendReadyResponse(msg.id);
				return;
			}
			if (isRPCOkRequest(msg)) {
				this.#sendResponse(createRPCOkResponse(msg.id, RESPONSE_CODES.OK));
				return;
			}
			if (!isRPCRequest(msg)) {
				if (this.#options.returnMalformedRPCRequestError) throw new MalformedRPCRequestError("Malformed RPC request", msg);
				return;
			}
			this.#handleRequest(msg);
		} catch (err) {
			this.#sendErrorResponse(id, err);
		}
	}
	#sendReadyResponse(id) {
		this.#sendResponse(createRPCReadyResponse(id || 0, RESPONSE_CODES.OK));
	}
	#isMethod(method) {
		return this.#allowedMethods.has(method);
	}
	#handleRequest(msg) {
		const handleAsync = async () => {
			if (!this.#isMethod(msg.method)) {
				this.#sendErrorResponse(msg.id, new UnknownMethodRPCRequestError(msg.method));
				return;
			}
			const method = msg.method;
			const params = msg.params;
			assert(Array.isArray(params), "RPC method parameters must be an array");
			assert(typeof this.#methods[method] === "function", `RPC method ${method} is not a function`);
			const result = await this.#methods[method](...params);
			if (this.#pendingRequests.has(msg.id)) {
				const response = createRPCResponse(msg.id, result, RESPONSE_CODES.OK);
				this.#sendResponse(response);
			}
		};
		this.#pendingRequests.set(msg.id, {
			requestMessage: msg,
			promise: handleAsync().catch((err) => this.#sendErrorResponse(msg.id, err, RESPONSE_CODES.InternalServerError))
		});
	}
	#sendCancelResponse(id, code = RESPONSE_CODES.ServiceUnavailable) {
		this.#sendResponse(createRPCCanceledResponse(id, code));
	}
	#sendErrorResponse(id, error, code = RESPONSE_CODES.BadRequest) {
		try {
			const err = error instanceof Error ? error : new Error(String(error));
			this.#sendResponse(createRPCError(id, err, code));
		} catch {}
	}
	#cancelAllRequests(reason) {
		if (!this.#pendingRequests.size) return;
		reason ??= /* @__PURE__ */ new Error("RPC Server is shutting down");
		for (const id of this.#pendingRequests.keys()) this.#sendErrorResponse(id, reason);
		this.#pendingRequests.clear();
	}
	[Symbol.dispose]() {
		this.#cancelAllRequests();
		if (this.#options.closePortOnDispose) this.#portWrapper.close();
		this.#portWrapper[Symbol.dispose]();
	}
};
/**
* RPC Server implementation.
* @param ServerApi - The API methods of the server.
*/
var RPCServer = class extends RPCServerImpl {
	/**
	*
	* @param config - The server configuration, including the message port and options.
	* @param methods - The methods to implement the API.
	*/
	constructor(config, methods) {
		super(config, methods);
	}
};
//#endregion
export { AbortRPCRequestError, CanceledRPCRequestError, NotifyEmitter, RPCClient, RPCRequestError, RPCServer, TimeoutRPCRequestError, UnknownMethodRPCRequestError, notifyEventOnce, notifyEventToPromise, protocolDefinition, protocolMethods };

//# sourceMappingURL=index.js.map