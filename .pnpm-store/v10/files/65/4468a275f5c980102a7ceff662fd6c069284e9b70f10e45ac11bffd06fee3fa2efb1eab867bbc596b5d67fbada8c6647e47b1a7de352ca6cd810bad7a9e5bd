/*!
  * version-polling v1.3.3
  * (c) 2023-present Joe Shu
  * @license MIT
  */
(function(root, factory) {
    if ('object' == typeof exports && 'object' == typeof module) module.exports = factory();
    else if ('function' == typeof define && define.amd) define([], factory);
    else if ('object' == typeof exports) exports["VersionPolling"] = factory();
    else root["VersionPolling"] = factory();
})(globalThis, ()=>(()=>{
        "use strict";
        var __webpack_require__ = {};
        (()=>{
            __webpack_require__.d = function(exports1, definition) {
                for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key)) Object.defineProperty(exports1, key, {
                    enumerable: true,
                    get: definition[key]
                });
            };
        })();
        (()=>{
            __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            };
        })();
        (()=>{
            __webpack_require__.r = function(exports1) {
                if ('undefined' != typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports1, Symbol.toStringTag, {
                    value: 'Module'
                });
                Object.defineProperty(exports1, '__esModule', {
                    value: true
                });
            };
        })();
        var __webpack_exports__ = {};
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            VersionPolling: ()=>VersionPolling,
            createVersionPolling: ()=>createVersionPolling
        });
        const noop = ()=>{};
        function compareSemanticVersion(v1, v2) {
            const v1Parts = v1.split('.').map(Number);
            const v2Parts = v2.split('.').map(Number);
            const len = Math.max(v1Parts.length, v2Parts.length);
            for(let i = 0; i < len; i++){
                const v1 = v1Parts[i] || 0;
                const v2 = v2Parts[i] || 0;
                if (v1 > v2) return 1;
                if (v1 < v2) return -1;
            }
            return 0;
        }
        function createWorker(fn) {
            const blob = new Blob([
                `(${fn.toString()})()`
            ], {
                type: "text/javascript"
            });
            const url = window.URL.createObjectURL(blob);
            const worker = new Worker(url);
            window.URL.revokeObjectURL(url);
            return worker;
        }
        function closeWorker(worker) {
            worker.terminate();
        }
        function _define_property(obj, key, value) {
            if (key in obj) Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
            else obj[key] = value;
            return obj;
        }
        const DEFAULT_OPTIONS = {
            vcType: 'etag',
            htmlFileUrl: `${location.origin}${location.pathname}`,
            chunkName: 'index',
            versionFileUrl: `${location.origin}${location.pathname}version.json`,
            eventTriggerList: [],
            pollingInterval: 300000,
            silent: false,
            silentPollingInterval: false,
            silentPageVisibility: false,
            onUpdate: noop
        };
        class VersionPolling {
            start() {
                const { eventTriggerList, silent, silentPageVisibility } = this.options;
                if (silent) return;
                this.worker = createWorker(()=>{
                    let timerId = null;
                    let globalData;
                    let versionControl;
                    const versionControlMap = new Map();
                    versionControlMap.set('etag', {
                        start: ()=>{
                            versionControl.fetchEtag().then((res)=>{
                                versionControl.versionFlag = res.versionFlag;
                            });
                        },
                        check: ()=>{
                            versionControl.fetchEtag().then((res)=>{
                                if (res.versionFlag !== versionControl.versionFlag) self.postMessage({
                                    code: 'update',
                                    data: {
                                        versionFlag: res.versionFlag,
                                        localVersionFlag: versionControl.versionFlag
                                    }
                                });
                            });
                        },
                        fetchEtag: ()=>{
                            if (!globalData.htmlFileUrl) throw new Error('[version-polling]: htmlFileUrl is required');
                            return fetch(globalData.htmlFileUrl, {
                                method: 'HEAD',
                                cache: 'no-cache'
                            }).then((response)=>{
                                const etag = response.headers.get('etag');
                                if (!etag) throw new Error('[version-polling]: etag is null');
                                return {
                                    versionFlag: etag
                                };
                            });
                        }
                    });
                    versionControlMap.set('chunkHash', {
                        start: ()=>{
                            versionControl.fetchChunkHash().then((res)=>{
                                versionControl.versionFlag = res.versionFlag;
                            });
                        },
                        check: ()=>{
                            versionControl.fetchChunkHash().then((res)=>{
                                if (res.versionFlag !== versionControl.versionFlag) self.postMessage({
                                    code: 'update',
                                    data: {
                                        versionFlag: res.versionFlag,
                                        localVersionFlag: versionControl.versionFlag
                                    }
                                });
                            });
                        },
                        fetchChunkHash: ()=>{
                            if (!globalData.htmlFileUrl) throw new Error('[version-polling]: htmlFileUrl is required');
                            return fetch(`${globalData.htmlFileUrl}?t=${+new Date()}`).then((response)=>response.text()).then((response)=>{
                                const getChunkByHtml = function(htmlText) {
                                    let name = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'index';
                                    const chunkRegExp = new RegExp(`<script(?:.*)src=(?:["']?)(.*?${name}.*?)(?:["']?)>`, 's');
                                    const [, src] = htmlText.match(chunkRegExp) || [];
                                    return src;
                                };
                                const chunkHash = getChunkByHtml(response, globalData.chunkName);
                                if (!chunkHash) throw new Error('[version-polling]: chunkHash is null');
                                return {
                                    versionFlag: chunkHash
                                };
                            });
                        }
                    });
                    versionControlMap.set('versionJson', {
                        start: ()=>{
                            versionControl.fetchVersionFile().then((res)=>{
                                versionControl.versionFlag = res.versionFlag;
                            });
                        },
                        check: ()=>{
                            versionControl.fetchVersionFile().then((res)=>{
                                if (res.versionFlag !== versionControl.versionFlag) self.postMessage({
                                    code: 'update',
                                    data: {
                                        versionFlag: res.versionFlag,
                                        versionInfo: res.versionInfo,
                                        localVersionFlag: versionControl.versionFlag
                                    }
                                });
                            });
                        },
                        fetchVersionFile: ()=>{
                            if (!globalData.versionFileUrl) throw new Error('[version-polling]: versionFileUrl is required');
                            return fetch(`${globalData.versionFileUrl}?t=${+new Date()}`).then((response)=>response.json()).then((response)=>{
                                const { version } = response;
                                if (!version) throw new Error('[version-polling]: version is null');
                                return {
                                    versionFlag: version,
                                    versionInfo: response
                                };
                            });
                        }
                    });
                    self.onmessage = (event)=>{
                        const { code, data } = event.data;
                        if ('start' === code) {
                            globalData = data;
                            const current = versionControlMap.get(globalData.vcType);
                            if (!current) throw new Error(`[version-polling]: invalid vcType: ${globalData.vcType}`);
                            versionControl = Object.assign(current, {
                                startPolling: ()=>{
                                    timerId = setInterval(versionControl.check, globalData.pollingInterval);
                                },
                                pausePolling: ()=>{
                                    if (timerId) {
                                        clearInterval(timerId);
                                        timerId = null;
                                    }
                                }
                            });
                            versionControl.start();
                            if (!globalData.silentPollingInterval) versionControl.startPolling();
                        } else if ('pause' === code) versionControl.pausePolling();
                        else if ('resume' === code) {
                            versionControl.check();
                            if (!globalData.silentPollingInterval) versionControl.startPolling();
                        } else versionControl.check();
                    };
                });
                this.worker.onmessage = (event)=>{
                    const { code, data } = event.data;
                    if ('update' === code) {
                        let promptUpdate = true;
                        const { vcType } = this.options;
                        if ('versionJson' === vcType) promptUpdate = 1 === compareSemanticVersion(data.versionFlag, data.localVersionFlag);
                        if (promptUpdate) {
                            var _this_options_onUpdate, _this_options;
                            this.stop();
                            null === (_this_options_onUpdate = (_this_options = this.options).onUpdate) || void 0 === _this_options_onUpdate || _this_options_onUpdate.call(_this_options, this, data.versionInfo);
                        }
                    }
                };
                this.worker.postMessage({
                    code: 'start',
                    data: {
                        vcType: this.options.vcType,
                        htmlFileUrl: this.options.htmlFileUrl,
                        chunkName: this.options.chunkName,
                        versionFileUrl: this.options.versionFileUrl,
                        pollingInterval: this.options.pollingInterval,
                        silentPollingInterval: this.options.silentPollingInterval
                    }
                });
                if (!silentPageVisibility) document.addEventListener('visibilitychange', this.visibilityHandler);
                if (null == eventTriggerList ? void 0 : eventTriggerList.length) for (const type of eventTriggerList)window.addEventListener(type, this.eventHandler);
            }
            stop() {
                const { eventTriggerList, silentPageVisibility } = this.options;
                if (this.worker) {
                    closeWorker(this.worker);
                    if (!silentPageVisibility) document.removeEventListener('visibilitychange', this.visibilityHandler);
                    if (null == eventTriggerList ? void 0 : eventTriggerList.length) for (const type of eventTriggerList)window.removeEventListener(type, this.eventHandler);
                }
            }
            onRefresh() {
                window.location.reload();
            }
            onCancel() {
                setTimeout(()=>{
                    this.start();
                }, 30);
            }
            constructor(options){
                _define_property(this, "options", void 0);
                _define_property(this, "worker", void 0);
                _define_property(this, "visibilityHandler", ()=>{
                    if ('visible' === document.visibilityState) {
                        var _this_worker;
                        null === (_this_worker = this.worker) || void 0 === _this_worker || _this_worker.postMessage({
                            code: 'resume'
                        });
                    } else {
                        var _this_worker1;
                        null === (_this_worker1 = this.worker) || void 0 === _this_worker1 || _this_worker1.postMessage({
                            code: 'pause'
                        });
                    }
                });
                _define_property(this, "eventHandler", ()=>{
                    var _this_worker;
                    null === (_this_worker = this.worker) || void 0 === _this_worker || _this_worker.postMessage({
                        code: 'check'
                    });
                });
                this.options = {
                    ...DEFAULT_OPTIONS,
                    ...options
                };
                this.start();
            }
        }
        function createVersionPolling(options) {
            const versionPolling = new VersionPolling(options);
            return versionPolling;
        }
        return __webpack_exports__;
    })());
