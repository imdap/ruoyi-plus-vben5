import {
  computeStaticModifier,
  computeReadonlyModifier,
} from './common-modifiers.js'
function computeIndexSignatureDetails({ indexSignature, sourceCode }) {
  return {
    name: sourceCode.text.slice(
      indexSignature.range.at(0),
      indexSignature.typeAnnotation?.range.at(0) ?? indexSignature.range.at(1),
    ),
    modifiers: computeModifiers(indexSignature),
    selectors: ['index-signature'],
  }
}
function computeModifiers(indexSignature) {
  return [
    ...computeStaticModifier(indexSignature),
    ...computeReadonlyModifier(indexSignature),
  ]
}
export { computeIndexSignatureDetails }
