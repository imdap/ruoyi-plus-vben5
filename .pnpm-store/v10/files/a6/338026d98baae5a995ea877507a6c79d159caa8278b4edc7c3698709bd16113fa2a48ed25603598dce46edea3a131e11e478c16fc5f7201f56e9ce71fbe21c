import { computeDependencies } from '../compute-dependencies.js'
function computeStaticBlockDetails({
  ignoreCallbackDependenciesPatterns,
  useExperimentalDependencyDetection,
  staticBlock,
  className,
}) {
  return {
    dependencies: computeDependencies({
      ignoreCallbackDependenciesPatterns,
      useExperimentalDependencyDetection,
      expression: staticBlock,
      isMemberStatic: true,
      className,
    }),
    selectors: ['static-block'],
    modifiers: [],
  }
}
export { computeStaticBlockDetails }
