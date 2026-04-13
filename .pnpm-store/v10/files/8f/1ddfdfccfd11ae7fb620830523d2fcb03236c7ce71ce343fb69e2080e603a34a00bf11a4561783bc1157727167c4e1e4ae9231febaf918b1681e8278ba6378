// Helpers

// CodeMirror
import { indentWithTab } from '@codemirror/commands';
import { indentUnit, type LanguageSupport } from '@codemirror/language';
import {
  diagnosticCount as linterDagnosticCount,
  forceLinting,
  linter,
  lintGutter,
  type Diagnostic,
  type LintSource,
} from '@codemirror/lint';
import {
  Compartment,
  EditorSelection,
  EditorState,
  StateEffect,
  type Transaction,
  type Extension,
  type SelectionRange,
  type StateField,
  type Text,
} from '@codemirror/state';
import {
  EditorView,
  keymap,
  placeholder,
  type ViewUpdate,
} from '@codemirror/view';
import { basicSetup, minimalSetup } from 'codemirror';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type ShallowRef,
  type WritableComputedRef,
} from 'vue-demi';

import type { StyleSpec } from 'style-mod';

import h, { slot } from '@/helpers/h-demi';

/** CodeMirror Component */
export default defineComponent({
  /** Component Name */
  name: 'CodeMirror',
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /** Props Definition */
  props: {
    /** Model value */
    modelValue: {
      type: String as PropType<string | Text>,
      default: '',
    },
    /**
     * Theme
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
     */
    theme: {
      type: Object as PropType<Record<string, StyleSpec>>,
      default: () => {
        return {};
      },
    },
    /** Dark Mode */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Basic Setup
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup}
     */
    basic: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Minimal Setup (The basic setting has priority.)
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup}
     */
    minimal: {
      type: Boolean,
      default: false,
    },
    /**
     * Placeholder
     *
     * @see {@link https://codemirror.net/docs/ref/#view.placeholder}
     */
    placeholder: {
      type: String as PropType<string | HTMLElement>,
      default: undefined,
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
      default: false,
    },
    /**
     * Allow tab key indent.
     *
     * @see {@link https://codemirror.net/examples/tab/}
     */
    tab: {
      type: Boolean,
      default: false,
    },
    /**
     * Tab character
     */
    indentUnit: {
      type: String,
      default: undefined,
    },
    /**
     * Allow Multiple Selection.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections}
     */
    allowMultipleSelections: {
      type: Boolean,
      default: false,
    },
    /**
     * Tab size
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^tabSize}
     */
    tabSize: {
      type: Number,
      default: undefined,
    },
    /**
     * Set line break (separetor) char.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^lineSeparator}
     */
    lineSeparator: {
      type: String,
      default: undefined,
    },
    /**
     * Readonly
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^readOnly}
     */
    readonly: {
      type: Boolean,
      default: false,
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
      default: false,
    },
    /**
     * Additional Extension
     *
     * @see {@link https://codemirror.net/docs/ref/#state.Extension}
     */
    extensions: {
      type: Array as PropType<Extension[]>,
      default: () => {
        return [];
      },
    },
    /**
     * Language Phreses
     *
     * @see {@link https://codemirror.net/examples/translate/}
     */
    phrases: {
      type: Object as PropType<Record<string, string>>,
      default: () => undefined,
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/docs/ref/#language}
     */
    lang: {
      type: Object as PropType<LanguageSupport>,
      default: () => undefined,
    },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter}
     */
    linter: {
      type: Function as PropType<LintSource | any>,
      default: undefined,
    },
    /**
     * Linter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter^config}
     */
    linterConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    forceLinting: {
      type: Boolean,
      default: false,
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
      default: false,
    },
    /**
     * Gutter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.lintGutter^config}
     */
    gutterConfig: {
      type: Object,
      default: () => undefined,
    },
    /**
     * Using tag
     */
    tag: {
      type: String,
      default: 'div',
    },
  },
  /** Emits */
  emits: {
    /** Model Update */
    'update:modelValue': (_value: string | Text = '') => true,
    /** CodeMirror ViewUpdate */
    update: (_value: ViewUpdate) => true,
    /** CodeMirror onReady */
    ready: (_value: {
      view: EditorView;
      state: EditorState;
      container: HTMLElement;
    }) => true,
    /** CodeMirror onFocus */
    focus: (_value: boolean) => true,
    /** State Changed */
    change: (_value: EditorState) => true,
    /** CodeMirror onDestroy */
    destroy: () => true,
  },
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context) {
    /** Editor DOM */
    const editor: Ref<HTMLElement | undefined> = ref();

    /** Internal value */
    const doc: Ref<string | Text> = ref(props.modelValue);

    /**
     * CodeMirror Editor View
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView}
     */
    const view: ShallowRef<EditorView> = shallowRef(new EditorView());

    /**
     * Focus
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView.hasFocus}
     */
    const focus: WritableComputedRef<boolean> = computed({
      get: () => view.value.hasFocus,
      set: f => {
        if (f) {
          view.value.focus();
        }
      },
    });

    /**
     * Editor Selection
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorSelection}
     */
    const selection: WritableComputedRef<EditorSelection> = computed({
      get: () => view.value.state.selection,
      set: s => view.value.dispatch({ selection: s }),
    });

    /** Cursor Position */
    const cursor: WritableComputedRef<number> = computed({
      get: () => view.value.state.selection.main.head,
      set: a => view.value.dispatch({ selection: { anchor: a } }),
    });

    /** JSON */
    const json: WritableComputedRef<Record<string, StateField<any>>> = computed(
      {
        get: () => view.value.state.toJSON(),
        set: j => view.value.setState(EditorState.fromJSON(j)),
      }
    );

    /** Text length */
    const length: Ref<number> = ref(0);

    /**
     * Returns the number of active lint diagnostics in the given state.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.diagnosticCount}
     */
    const diagnosticCount: Ref<number> = ref(0);

    /** Get CodeMirror Extension */
    const extensions: ComputedRef<Extension[]> = computed(() => {
      // Synamic Reconfiguration
      // @see https://codemirror.net/examples/config/
      const language = new Compartment();
      const tabSize = new Compartment();
      if (props.basic && props.minimal) {
        throw '[Vue CodeMirror] Both basic and minimal cannot be specified.';
      }
      // TODO: Ignore previous prop was not changed.
      return [
        // Toggle basic setup
        props.basic && !props.minimal ? basicSetup : undefined,
        // Toggle minimal setup
        props.minimal && !props.basic ? minimalSetup : undefined,
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate): void => {
          // Emit focus status
          context.emit('focus', view.value.hasFocus);

          // Update count
          length.value = view.value.state.doc?.length;

          if (update.changes.empty || !update.docChanged) {
            // Suppress event firing if no change
            return;
          }
          if (props.linter) {
            // Linter process
            if (props.forceLinting) {
              // If forceLinting enabled, first liting.
              forceLinting(view.value);
            }
            // Count diagnostics.
            diagnosticCount.value = (
              props.linter(view.value) as readonly Diagnostic[]
            ).length;
          }
          context.emit('update', update);
        }),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: props.dark }),
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
        // Indent with tab
        props.tab ? keymap.of([indentWithTab]) : undefined,
        // Tab character
        props.indentUnit ? indentUnit.of(props.indentUnit) : undefined,
        // Allow Multiple Selections
        EditorState.allowMultipleSelections.of(props.allowMultipleSelections),
        // Indent tab size
        props.tabSize
          ? tabSize.of(EditorState.tabSize.of(props.tabSize))
          : undefined,
        // locale settings
        props.phrases ? EditorState.phrases.of(props.phrases) : undefined,
        // Readonly option
        EditorState.readOnly.of(props.readonly),
        // Editable option
        EditorView.editable.of(!props.disabled),
        // Set Line break char
        props.lineSeparator
          ? EditorState.lineSeparator.of(props.lineSeparator)
          : undefined,
        // Lang
        props.lang ? language.of(props.lang) : undefined,
        // Append Linter settings
        props.linter ? linter(props.linter, props.linterConfig) : undefined,
        // Show 🔴 to error line when linter enabled.
        props.linter && props.gutter
          ? lintGutter(props.gutterConfig)
          : undefined,
        // Placeholder
        props.placeholder ? placeholder(props.placeholder) : undefined,
        // Append Extensions
        ...props.extensions,
      ].filter((extension): extension is Extension => !!extension);
    });

    // Extension (mostly props) Changed
    watch(
      extensions,
      exts => {
        view.value?.dispatch({
          effects: StateEffect.reconfigure.of(exts),
        });
      },
      { immediate: true }
    );

    // for parent-to-child binding.
    watch(
      () => props.modelValue,
      async value => {
        if (
          view.value.composing || // IME fix
          view.value.state.doc.toJSON().join(props.lineSeparator ?? '\n') ===
            value // don't need to update
        ) {
          // Do not commit CodeMirror's store.
          return;
        }

        // Range Fix ?
        // https://github.com/logue/vue-codemirror6/issues/27
        const isSelectionOutOfRange =  !view.value.state.selection.ranges.every(
          range => range.anchor < value.length && range.head < value.length
        )
    
        // Update
        view.value.dispatch({
          changes: { from: 0, to: view.value.state.doc.length, insert: value },
          selection: isSelectionOutOfRange ? { anchor: 0, head: 0 } : view.value.state.selection,
          scrollIntoView: true,
        });
      },
      { immediate: true }
    );

    /** When loaded */
    onMounted(async () => {
      /** Initial value */
      let value: string | Text = doc.value;
      if (!editor.value) {
        return;
      }
      if (editor.value.childNodes[0]) {
        // when slot mode, overwrite initial value
        if (doc.value !== '') {
          console.warn(
            '[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.'
          );
        }
        value = (editor.value.childNodes[0] as HTMLElement).innerText.trim();
      }

      // Register Codemirror
      view.value = new EditorView({
        parent: editor.value,
        state: EditorState.create({ doc: value, extensions: extensions.value }),
        dispatch: (tr: Transaction) => {
          view.value.update([tr]);
          if (tr.changes.empty || !tr.docChanged) {
            // if not change value, no fire emit event
            return;
          }

          // console.log(view.state.doc.toString(), tr);
          // state.toString() is not defined, so use toJSON and toText function to convert string.
          context.emit('update:modelValue', tr.state.doc.toString() ?? '');
          // Emit EditorState
          context.emit('change', tr.state);
        },
      });

      await nextTick();

      context.emit('ready', {
        view: view.value,
        state: view.value.state,
        container: editor.value,
      });
    });

    /** Destroy */
    onUnmounted(() => {
      view.value.destroy();
      context.emit('destroy');
    });

    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    const lint = (): void => {
      if (!props.linter || !view.value) {
        return;
      }
      if (props.forceLinting) {
        forceLinting(view.value);
      }
      diagnosticCount.value = linterDagnosticCount(view.value.state);
    };

    /**
     * Force Reconfigure Extension
     *
     * @see {@link https://codemirror.net/examples/config/#top-level-reconfiguration}
     */
    const forceReconfigure = (): void => {
      // Deconfigure all Extensions
      view.value?.dispatch({
        effects: StateEffect.reconfigure.of([]),
      });
      // Register extensions
      view.value?.dispatch({
        effects: StateEffect.appendConfig.of(extensions.value),
      });
    };

    /* ----- Bellow is experimental. ------ */

    /**
     * Get the text between the given points in the editor.
     *
     * @param from - start line number
     * @param to - end line number
     */
    const getRange = (from?: number, to?: number): string | undefined =>
      view.value.state.sliceDoc(from, to);
    /**
     * Get the content of line.
     *
     * @param number - line number
     */
    const getLine = (number: number): string =>
      view.value.state.doc.line(number + 1).text;
    /** Get the number of lines in the editor. */
    const lineCount = (): number => view.value.state.doc.lines;
    /** Retrieve one end of the primary selection. */
    const getCursor = (): number => view.value.state.selection.main.head;
    /** Retrieves a list of all current selections. */
    const listSelections = (): readonly SelectionRange[] => {
      let _view$value$state$sel;
      return (_view$value$state$sel = view.value.state.selection.ranges) !==
        null && _view$value$state$sel !== undefined
        ? _view$value$state$sel
        : [];
    };
    /** Get the currently selected code. */
    const getSelection = (): string => {
      let _view$value$state$sli;
      return (_view$value$state$sli = view.value.state.sliceDoc(
        view.value.state.selection.main.from,
        view.value.state.selection.main.to
      )) !== null && _view$value$state$sli !== undefined
        ? _view$value$state$sli
        : '';
    };
    /**
     * The length of the given array should be the same as the number of active selections.
     * Replaces the content of the selections with the strings in the array.
     */
    const getSelections = (): string[] => {
      const s = view.value.state;
      if (!s) {
        return [];
      }

      return s.selection.ranges.map((r: { from: number; to: number }) =>
        s.sliceDoc(r.from, r.to)
      );
    };
    /** Return true if any text is selected. */
    const somethingSelected = (): boolean =>
      view.value.state.selection.ranges.some(
        (r: { empty: boolean }) => !r.empty
      );

    /**
     * Replace the part of the document between from and to with the given string.
     *
     * @param replacement - replacement text
     * @param from - start string at position
     * @param to -  insert the string at position
     */
    const replaceRange = (
      replacement: string | Text,
      from: number,
      to: number
    ): void =>
      view.value.dispatch({
        changes: { from, to, insert: replacement },
      });
    /**
     * Replace the selection(s) with the given string.
     * By default, the new selection ends up after the inserted text.
     *
     * @param replacement - replacement text
     */
    const replaceSelection = (replacement: string | Text): void =>
      view.value.dispatch(view.value.state.replaceSelection(replacement));
    /**
     * Set the cursor position.
     *
     * @param position - position.
     */
    const setCursor = (position: number): void =>
      view.value.dispatch({ selection: { anchor: position } });
    /**
     * Set a single selection range.
     *
     * @param anchor - anchor position
     * @param head -
     */
    const setSelection = (anchor: number, head?: number): void =>
      view.value.dispatch({ selection: { anchor, head } });
    /**
     * Sets a new set of selections. There must be at least one selection in the given array.
     *
     * @param ranges - Selection range
     * @param primary -
     */
    const setSelections = (
      ranges: readonly SelectionRange[],
      primary?: number
    ): void =>
      view.value.dispatch({
        selection: EditorSelection.create(ranges, primary),
      });
    /**
     * Applies the given function to all existing selections, and calls extendSelections on the result.
     *
     * @param f - function
     */
    const extendSelectionsBy = (f: any): void =>
      view.value.dispatch({
        selection: EditorSelection.create(
          selection.value.ranges.map((r: SelectionRange) => r.extend(f(r)))
        ),
      });

    const exposed = {
      editor,
      view,
      cursor,
      selection,
      focus,
      length,
      json,
      diagnosticCount,
      dom: view.value.contentDOM,
      lint,
      forceReconfigure,
      // Bellow is CodeMirror5's function
      getRange,
      getLine,
      lineCount,
      getCursor,
      listSelections,
      getSelection,
      getSelections,
      somethingSelected,
      replaceRange,
      replaceSelection,
      setCursor,
      setSelection,
      setSelections,
      extendSelectionsBy,
    };

    /** Export properties and functions */
    context.expose(exposed);
    return exposed;
  },
  render() {
    // <template>
    //   <div ref="editor" class="vue-codemirror">
    //     <aside v-show="!context.slots.default" aria-hidden><slot /></aside>
    //   </div>
    // </template>
    return h(
      this.$props.tag,
      {
        ref: 'editor',
        class: 'vue-codemirror',
      },
      this.$slots.default
        ? // Hide original content
          h(
            'aside',
            { style: 'display: none;', 'aria-hidden': 'true' },
            slot(this.$slots.default)
          )
        : undefined
    );
  },
});
