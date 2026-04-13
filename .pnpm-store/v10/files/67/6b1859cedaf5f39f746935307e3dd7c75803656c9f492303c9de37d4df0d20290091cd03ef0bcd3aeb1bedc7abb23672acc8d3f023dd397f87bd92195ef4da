import { cloneInto, copy0, copy1 } from '../util/clone.js';
export function cleanValidationIssue(issue) {
    const cleanIssue = {};
    cloneInto(issue, cleanIssue, ValidationIssueHandlers);
    return cleanIssue;
}
const ValidationIssueHandlers = {
    text: copy0,
    offset: copy0,
    message: copy0,
    line: copy1,
    length: copy0,
    issueType: copy0,
    hasPreferredSuggestions: copy0,
    hasSimpleSuggestions: copy0,
    isFlagged: copy0,
    isFound: copy0,
    suggestions: copy1,
    suggestionsEx: copy1,
};
//# sourceMappingURL=cleanValidationIssue.js.map