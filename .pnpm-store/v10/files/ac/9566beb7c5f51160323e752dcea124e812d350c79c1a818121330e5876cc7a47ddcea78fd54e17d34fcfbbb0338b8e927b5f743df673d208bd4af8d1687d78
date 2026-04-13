/**
 * vue-codemirror6
 *
 * @description CodeMirror6 Component for vue2 and vue3.
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2022-2024 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.3.4
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import { indentWithTab as G } from "@codemirror/commands";
import { indentUnit as I } from "@codemirror/language";
import { forceLinting as b, linter as P, lintGutter as Z, diagnosticCount as k } from "@codemirror/lint";
import { EditorState as s, Compartment as C, StateEffect as y, EditorSelection as w } from "@codemirror/state";
import { EditorView as c, keymap as q, placeholder as H } from "@codemirror/view";
import { basicSetup as K, minimalSetup as Q } from "codemirror";
import { isVue2 as X, h as O, defineComponent as Y, ref as v, shallowRef as ee, computed as r, watch as $, onMounted as te, nextTick as ae, onUnmounted as ne } from "vue-demi";
const ie = {
  version: "1.3.4",
  date: "2024-07-11T09:11:00.140Z"
};
var he = ie;
const le = (e) => e ? Object.entries(e).reduce((l, [i, u]) => (i = i.charAt(0).toUpperCase() + i.slice(1), i = `on${i}`, { ...l, [i]: u }), {}) : {};
function B(e, l = {}, i) {
  if (X)
    return O(e, l, i);
  const { props: u, domProps: t, on: d, ...f } = l, m = d ? le(d) : {};
  return O(
    e,
    { ...f, ...u, ...t, ...m },
    i
  );
}
const oe = (e) => typeof e == "function" ? e() : e;
var se = Y({
  /** Component Name */
  name: "CodeMirror",
  /** Model Definition */
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  /** Props Definition */
  props: {
    /** Model value */
    modelValue: {
      type: String,
      default: ""
    },
    /**
     * Theme
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
     */
    theme: {
      type: Object,
      default: () => ({})
    },
    /** Dark Mode */
    dark: {
      type: Boolean,
      default: !1
    },
    /**
     * Use Basic Setup
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup}
     */
    basic: {
      type: Boolean,
      default: !1
    },
    /**
     * Use Minimal Setup (The basic setting has priority.)
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup}
     */
    minimal: {
      type: Boolean,
      default: !1
    },
    /**
     * Placeholder
     *
     * @see {@link https://codemirror.net/docs/ref/#view.placeholder}
     */
    placeholder: {
      type: String,
      default: void 0
    },
    /**
     * Line wrapping
     *
     * An extension that enables line wrapping in the editor (by setting CSS white-space to pre-wrap in the content).
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView%5ElineWrapping}
     */
    wrap: {
      type: Boolean,
      default: !1
    },
    /**
     * Allow tab key indent.
     *
     * @see {@link https://codemirror.net/examples/tab/}
     */
    tab: {
      type: Boolean,
      default: !1
    },
    /**
     * Tab character
     */
    indentUnit: {
      type: String,
      default: void 0
    },
    /**
     * Allow Multiple Selection.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections}
     */
    allowMultipleSelections: {
      type: Boolean,
      default: !1
    },
    /**
     * Tab size
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^tabSize}
     */
    tabSize: {
      type: Number,
      default: void 0
    },
    /**
     * Set line break (separetor) char.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^lineSeparator}
     */
    lineSeparator: {
      type: String,
      default: void 0
    },
    /**
     * Readonly
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^readOnly}
     */
    readonly: {
      type: Boolean,
      default: !1
    },
    /**
     * Disable input.
     *
     * This is the reversed value of the CodeMirror editable.
     * Similar to `readonly`, but setting this value to true disables dragging.
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^editable}
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Additional Extension
     *
     * @see {@link https://codemirror.net/docs/ref/#state.Extension}
     */
    extensions: {
      type: Array,
      default: () => []
    },
    /**
     * Language Phreses
     *
     * @see {@link https://codemirror.net/examples/translate/}
     */
    phrases: {
      type: Object,
      default: () => {
      }
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/docs/ref/#language}
     */
    lang: {
      type: Object,
      default: () => {
      }
    },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter}
     */
    linter: {
      type: Function,
      default: void 0
    },
    /**
     * Linter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter^config}
     */
    linterConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    forceLinting: {
      type: Boolean,
      default: !1
    },
    /**
     * Show Linter Gutter
     *
     * An area to 🔴 the lines with errors will be displayed.
     * This feature is not enabled if `linter` is not specified.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.lintGutter}
     */
    gutter: {
      type: Boolean,
      default: !1
    },
    /**
     * Gutter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.lintGutter^config}
     */
    gutterConfig: {
      type: Object,
      default: () => {
      }
    },
    /**
     * Using tag
     */
    tag: {
      type: String,
      default: "div"
    }
  },
  /** Emits */
  emits: {
    /** Model Update */
    "update:modelValue": (e = "") => !0,
    /** CodeMirror ViewUpdate */
    update: (e) => !0,
    /** CodeMirror onReady */
    ready: (e) => !0,
    /** CodeMirror onFocus */
    focus: (e) => !0,
    /** State Changed */
    change: (e) => !0,
    /** CodeMirror onDestroy */
    destroy: () => !0
  },
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(e, l) {
    const i = v(), u = v(e.modelValue), t = ee(new c()), d = r({
      get: () => t.value.hasFocus,
      set: (a) => {
        a && t.value.focus();
      }
    }), f = r({
      get: () => t.value.state.selection,
      set: (a) => t.value.dispatch({ selection: a })
    }), m = r({
      get: () => t.value.state.selection.main.head,
      set: (a) => t.value.dispatch({ selection: { anchor: a } })
    }), M = r(
      {
        get: () => t.value.state.toJSON(),
        set: (a) => t.value.setState(s.fromJSON(a))
      }
    ), S = v(0), h = v(0), g = r(() => {
      const a = new C(), n = new C();
      if (e.basic && e.minimal)
        throw "[Vue CodeMirror] Both basic and minimal cannot be specified.";
      return [
        // Toggle basic setup
        e.basic && !e.minimal ? K : void 0,
        // Toggle minimal setup
        e.minimal && !e.basic ? Q : void 0,
        // ViewUpdate event listener
        c.updateListener.of((o) => {
          l.emit("focus", t.value.hasFocus), S.value = t.value.state.doc?.length, !(o.changes.empty || !o.docChanged) && (e.linter && (e.forceLinting && b(t.value), h.value = e.linter(t.value).length), l.emit("update", o));
        }),
        // Toggle light/dark mode.
        c.theme(e.theme, { dark: e.dark }),
        // Toggle line wrapping
        e.wrap ? c.lineWrapping : void 0,
        // Indent with tab
        e.tab ? q.of([G]) : void 0,
        // Tab character
        e.indentUnit ? I.of(e.indentUnit) : void 0,
        // Allow Multiple Selections
        s.allowMultipleSelections.of(e.allowMultipleSelections),
        // Indent tab size
        e.tabSize ? n.of(s.tabSize.of(e.tabSize)) : void 0,
        // locale settings
        e.phrases ? s.phrases.of(e.phrases) : void 0,
        // Readonly option
        s.readOnly.of(e.readonly),
        // Editable option
        c.editable.of(!e.disabled),
        // Set Line break char
        e.lineSeparator ? s.lineSeparator.of(e.lineSeparator) : void 0,
        // Lang
        e.lang ? a.of(e.lang) : void 0,
        // Append Linter settings
        e.linter ? P(e.linter, e.linterConfig) : void 0,
        // Show 🔴 to error line when linter enabled.
        e.linter && e.gutter ? Z(e.gutterConfig) : void 0,
        // Placeholder
        e.placeholder ? H(e.placeholder) : void 0,
        // Append Extensions
        ...e.extensions
      ].filter((o) => !!o);
    });
    $(
      g,
      (a) => {
        t.value?.dispatch({
          effects: y.reconfigure.of(a)
        });
      },
      { immediate: !0 }
    ), $(
      () => e.modelValue,
      async (a) => {
        if (t.value.composing || // IME fix
        t.value.state.doc.toJSON().join(e.lineSeparator ?? `
`) === a)
          return;
        const n = !t.value.state.selection.ranges.every(
          (o) => o.anchor < a.length && o.head < a.length
        );
        t.value.dispatch({
          changes: { from: 0, to: t.value.state.doc.length, insert: a },
          selection: n ? { anchor: 0, head: 0 } : t.value.state.selection,
          scrollIntoView: !0
        });
      },
      { immediate: !0 }
    ), te(async () => {
      let a = u.value;
      i.value && (i.value.childNodes[0] && (u.value !== "" && console.warn(
        "[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."
      ), a = i.value.childNodes[0].innerText.trim()), t.value = new c({
        parent: i.value,
        state: s.create({ doc: a, extensions: g.value }),
        dispatch: (n) => {
          t.value.update([n]), !(n.changes.empty || !n.docChanged) && (l.emit("update:modelValue", n.state.doc.toString() ?? ""), l.emit("change", n.state));
        }
      }), await ae(), l.emit("ready", {
        view: t.value,
        state: t.value.state,
        container: i.value
      }));
    }), ne(() => {
      t.value.destroy(), l.emit("destroy");
    });
    const V = () => {
      !e.linter || !t.value || (e.forceLinting && b(t.value), h.value = k(t.value.state));
    }, j = () => {
      t.value?.dispatch({
        effects: y.reconfigure.of([])
      }), t.value?.dispatch({
        effects: y.appendConfig.of(g.value)
      });
    }, x = (a, n) => t.value.state.sliceDoc(a, n), _ = (a) => t.value.state.doc.line(a + 1).text, L = () => t.value.state.doc.lines, N = () => t.value.state.selection.main.head, U = () => {
      let a;
      return (a = t.value.state.selection.ranges) !== null && a !== void 0 ? a : [];
    }, z = () => {
      let a;
      return (a = t.value.state.sliceDoc(
        t.value.state.selection.main.from,
        t.value.state.selection.main.to
      )) !== null && a !== void 0 ? a : "";
    }, R = () => {
      const a = t.value.state;
      return a ? a.selection.ranges.map(
        (n) => a.sliceDoc(n.from, n.to)
      ) : [];
    }, T = () => t.value.state.selection.ranges.some(
      (a) => !a.empty
    ), D = (a, n, o) => t.value.dispatch({
      changes: { from: n, to: o, insert: a }
    }), E = (a) => t.value.dispatch(t.value.state.replaceSelection(a)), F = (a) => t.value.dispatch({ selection: { anchor: a } }), J = (a, n) => t.value.dispatch({ selection: { anchor: a, head: n } }), A = (a, n) => t.value.dispatch({
      selection: w.create(a, n)
    }), W = (a) => t.value.dispatch({
      selection: w.create(
        f.value.ranges.map((n) => n.extend(a(n)))
      )
    }), p = {
      editor: i,
      view: t,
      cursor: m,
      selection: f,
      focus: d,
      length: S,
      json: M,
      diagnosticCount: h,
      dom: t.value.contentDOM,
      lint: V,
      forceReconfigure: j,
      // Bellow is CodeMirror5's function
      getRange: x,
      getLine: _,
      lineCount: L,
      getCursor: N,
      listSelections: U,
      getSelection: z,
      getSelections: R,
      somethingSelected: T,
      replaceRange: D,
      replaceSelection: E,
      setCursor: F,
      setSelection: J,
      setSelections: A,
      extendSelectionsBy: W
    };
    return l.expose(p), p;
  },
  render() {
    return B(
      this.$props.tag,
      {
        ref: "editor",
        class: "vue-codemirror"
      },
      this.$slots.default ? (
        // Hide original content
        B(
          "aside",
          { style: "display: none;", "aria-hidden": "true" },
          oe(this.$slots.default)
        )
      ) : void 0
    );
  }
});
const ge = (e) => e.component("CodeMirror", se);
export {
  he as Meta,
  se as default,
  ge as install
};
