import { TransformContext, DirectiveTransform } from '@vue/compiler-dom';
import { I18n, I18nMode } from 'vue-i18n';

/**
 * Translation signature resolver
 *
 * @remarks
 * This resolver is used at {@link TransformVTDirectiveOptions | 'translationSignatures' option}
 *
 * @public
 *
 * @example
 * ```js
 * import { compile } from '@vue/compiler-dom'
 * import { transformVTDirective } from '@intlify/vue-i18n-extensions'
 *
 * // the below is just an example, you can use your own signature resolver
 * const signatureMap = new Map()
 *
 * const transformVT = transformVTDirective({
 *   translationSignatures: (context) => {
 *     const { prefixIdentifiers, bindingMetadata, inline, filename } = context
 *     let signature = ''
 *
 *     // something logic to resolve signature like using `signatureMap`
 *     // signature = signatureMap.get(filename)
 *     // ...
 *
 *     return signature
 *   }
 * })
 *
 * const { code } = compile(`<p v-t="'hello'"></p>`, {
 *   // ...
 *   directiveTransforms: { t: transformVT }
 * })
 * ```
 */
type TranslationSignatureResolver = (context: TransformContext, baseResolver: (context: TransformContext, signature: string) => string | undefined) => string | undefined;
/**
 * Transform options for `v-t` custom directive
 *
 * @public
 */
interface TransformVTDirectiveOptions<Messages extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
DateTimeFormats extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
NumberFormats extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
Legacy extends boolean = true> {
    /**
     * I18n instance
     *
     * @remarks
     * If this option is specified, `v-t` custom directive transform uses an I18n instance to pre-translate.
     * The translation will use the global resources registered in the I18n instance,
     * that is, `v-t` directive transform is also a limitation that the resources of each component cannot be used.
     */
    i18n?: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>;
    /**
     * I18n Mode
     *
     * @remarks
     * Specify the API style of vue-i18n. If you use legacy API style (e.g. `$t`) at vue-i18n, you need to specify `legacy`.
     *
     * @default 'composition'
     */
    mode?: I18nMode;
    /**
     * Translation function signatures
     *
     * @remarks
     * You can specify the signature of the translation function attached to the binding context when it is codegen in the Vue Compiler.
     * If you have changed the signature to a non `t` signature in the `setup` hook or `<script setup>`, you can safely SSR it.
     * If each Vue component has a different signature for the translation function, you can specify several in an array for safe SSR.
     * This option value is `undefined` and the signature attached to the binding context is `t`.
     */
    translationSignatures?: string | TranslationSignatureResolver | string[] | TranslationSignatureResolver[] | (string | TranslationSignatureResolver)[];
}
/**
 * Transform `v-t` custom directive
 *
 * @remarks
 * Transform that  `v-t` custom directive is optimized vue-i18n code by Vue compiler.
 * This transform can improve the performance by pre-translating, and it does support SSR.
 *
 * @param options - `v-t` custom directive transform options, see {@link TransformVTDirectiveOptions}
 * @returns Directive transform
 *
 * @example
 * ```js
 * import { compile } from '@vue/compiler-dom'
 * import { createI18n } from 'vue-i18n'
 * import { transformVTDirective } from '@intlify/vue-i18n-extensions'
 *
 * // create i18n instance
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: {
 *       hello: 'hello'
 *     },
 *     ja: {
 *       hello: 'こんにちは'
 *     }
 *   }
 * })
 *
 * // get transform from  `transformVTDirective` function, with `i18n` option
 * const transformVT = transformVTDirective({ i18n })
 *
 * const { code } = compile(`<p v-t="'hello'"></p>`, {
 *   mode: 'function',
 *   hoistStatic: true,
 *   prefixIdentifiers: true,
 *   directiveTransforms: { t: transformVT } // <- you need to specify to `directiveTransforms` option!
 * })
 *
 * console.log(code)
 * // output ->
 * //   const { createVNode: _createVNode, openBlock: _openBlock, createBlock: _createBlock } = Vue
 * //   return function render(_ctx, _cache) {
 * //     return (_openBlock(), _createBlock(\\"div\\", null, \\"こんにちは！\\"))
 * //   }
 * ```
 * @public
 */
declare function transformVTDirective<Messages extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
DateTimeFormats extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
NumberFormats extends Record<string, unknown> = {}, // eslint-disable-line @typescript-eslint/no-empty-object-type -- TODO: fix this
Legacy extends boolean = true>(options?: TransformVTDirectiveOptions<Messages, DateTimeFormats, NumberFormats, Legacy>): DirectiveTransform;

export { type TransformVTDirectiveOptions, type TranslationSignatureResolver, transformVTDirective };
