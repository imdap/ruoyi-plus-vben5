/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ScriptLoader } from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { isTextarea, mergePlugins, uuid, isNullOrUndefined, initEditor, isDisabledOptionSupported } from '../Utils';
import { editorProps } from './EditorPropTypes';
import { h, defineComponent, onMounted, ref, toRefs, nextTick, watch, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
var renderInline = function (ce, id, elementRef, tagName) {
    return ce(tagName ? tagName : 'div', {
        id: id,
        ref: elementRef
    });
};
var renderIframe = function (ce, id, elementRef) {
    return ce('textarea', {
        id: id,
        visibility: 'hidden',
        ref: elementRef
    });
};
var defaultInitValues = { selector: undefined, target: undefined };
var setMode = function (editor, mode) {
    var _a;
    if (typeof ((_a = editor.mode) === null || _a === void 0 ? void 0 : _a.set) === 'function') {
        editor.mode.set(mode);
    }
    else {
        // TinyMCE v4
        editor.setMode(mode);
    }
};
export var Editor = defineComponent({
    props: editorProps,
    setup: function (props, ctx) {
        var conf = props.init ? __assign(__assign({}, props.init), defaultInitValues) : __assign({}, defaultInitValues);
        var _a = toRefs(props), disabled = _a.disabled, readonly = _a.readonly, modelValue = _a.modelValue, tagName = _a.tagName;
        var element = ref(null);
        var vueEditor = null;
        var elementId = props.id || uuid('tiny-vue');
        var inlineEditor = (props.init && props.init.inline) || props.inline;
        var modelBind = !!ctx.attrs['onUpdate:modelValue'];
        var mounting = true;
        var initialValue = props.initialValue ? props.initialValue : '';
        var cache = '';
        var getContent = function (isMounting) { return modelBind ?
            function () { return ((modelValue === null || modelValue === void 0 ? void 0 : modelValue.value) ? modelValue.value : ''); } :
            function () { return isMounting ? initialValue : cache; }; };
        var initWrapper = function () {
            var content = getContent(mounting);
            var finalInit = __assign(__assign({}, conf), { disabled: props.disabled, readonly: props.readonly, target: element.value, plugins: mergePlugins(conf.plugins, props.plugins), toolbar: props.toolbar || (conf.toolbar), inline: inlineEditor, license_key: props.licenseKey, setup: function (editor) {
                    vueEditor = editor;
                    if (!isDisabledOptionSupported(vueEditor) && props.disabled === true) {
                        setMode(vueEditor, 'readonly');
                    }
                    editor.on('init', function (e) { return initEditor(e, props, ctx, editor, modelValue, content); });
                    if (typeof conf.setup === 'function') {
                        conf.setup(editor);
                    }
                } });
            if (isTextarea(element.value)) {
                element.value.style.visibility = '';
            }
            getTinymce().init(finalInit);
            mounting = false;
        };
        watch(readonly, function (isReadonly) {
            if (vueEditor !== null) {
                setMode(vueEditor, isReadonly ? 'readonly' : 'design');
            }
        });
        watch(disabled, function (isDisabled) {
            if (vueEditor !== null) {
                if (isDisabledOptionSupported(vueEditor)) {
                    vueEditor.options.set('disabled', isDisabled);
                }
                else {
                    setMode(vueEditor, isDisabled ? 'readonly' : 'design');
                }
            }
        });
        watch(tagName, function (_) {
            var _a;
            if (vueEditor) {
                if (!modelBind) {
                    cache = vueEditor.getContent();
                }
                (_a = getTinymce()) === null || _a === void 0 ? void 0 : _a.remove(vueEditor);
                nextTick(function () { return initWrapper(); });
            }
        });
        onMounted(function () {
            if (getTinymce() !== null) {
                initWrapper();
            }
            else if (element.value && element.value.ownerDocument) {
                var channel = props.cloudChannel ? props.cloudChannel : '8';
                var apiKey = props.apiKey ? props.apiKey : 'no-api-key';
                var scriptSrc = isNullOrUndefined(props.tinymceScriptSrc) ?
                    "https://cdn.tiny.cloud/1/".concat(apiKey, "/tinymce/").concat(channel, "/tinymce.min.js") :
                    props.tinymceScriptSrc;
                ScriptLoader.load(element.value.ownerDocument, scriptSrc, initWrapper);
            }
        });
        onBeforeUnmount(function () {
            if (getTinymce() !== null) {
                getTinymce().remove(vueEditor);
            }
        });
        if (!inlineEditor) {
            onActivated(function () {
                if (!mounting) {
                    initWrapper();
                }
            });
            onDeactivated(function () {
                var _a;
                if (vueEditor) {
                    if (!modelBind) {
                        cache = vueEditor.getContent();
                    }
                    (_a = getTinymce()) === null || _a === void 0 ? void 0 : _a.remove(vueEditor);
                }
            });
        }
        var rerender = function (init) {
            var _a;
            if (vueEditor) {
                cache = vueEditor.getContent();
                (_a = getTinymce()) === null || _a === void 0 ? void 0 : _a.remove(vueEditor);
                conf = __assign(__assign(__assign({}, conf), init), defaultInitValues);
                nextTick(function () { return initWrapper(); });
            }
        };
        ctx.expose({
            rerender: rerender,
            getEditor: function () { return vueEditor; }
        });
        return function () { return inlineEditor ?
            renderInline(h, elementId, element, props.tagName) :
            renderIframe(h, elementId, element); };
    }
});
