# Ella Entity — Evaluation Rubric

## Scoring Dimensions

### 1. Domain Classification Accuracy
- **Correct**: All expected domains present, no false positives
- **Partial**: Primary domain correct but secondary domains missing or extra
- **Incorrect**: Primary domain wrong

Scoring: Correct = 2, Partial = 1, Incorrect = 0

### 2. Reasoning Mode Appropriateness
- **Correct**: Exact match with expected mode
- **Acceptable**: Reasonable alternative mode that would produce adequate results
- **Incorrect**: Mode that would produce wrong framing or tone

Scoring: Correct = 2, Acceptable = 1, Incorrect = 0

### 3. Task Type Correctness
- **Correct**: Matches expected task type
- **Close**: Related task type that would still route correctly
- **Incorrect**: Wrong task type that would misroute execution

Scoring: Correct = 2, Close = 1, Incorrect = 0

### 4. Clarification Trigger Accuracy (adversarial cases only)
- **Correct**: Low-confidence/ambiguous cases trigger clarification; clear cases do not
- **False positive**: Clear case incorrectly triggers clarification
- **False negative**: Ambiguous case fails to trigger clarification

Scoring: Correct = 2, False positive = 1, False negative = 0

### 5. Response Quality (manual, draft=true cases only)
- **Strong**: Accurate, well-framed, uses correct doctrine/lens, no unsupported claims
- **Adequate**: Generally correct but minor framing issues or missed context
- **Weak**: Significant framing errors, wrong voice, or unsupported claims

Scoring: Strong = 2, Adequate = 1, Weak = 0

### 6. Hallucination / Unsupported Reference Check
- **Clean**: All references correspond to assets in the context bundle
- **Minor**: References something plausible but not in the bundle
- **Hallucination**: References a dataset, protocol, or doctrine that doesn't exist

Scoring: Clean = 2, Minor = 1, Hallucination = 0

## Aggregate Scoring

Per case: max 12 points (dimensions 1-3 + 4 or 5 + 6)
Suite pass threshold: 80% aggregate across all 30 cases

## Notes

- Adversarial cases (tc_26–tc_30) are scored on dimensions 1, 2, 3, and 4
- Draft cases are scored on dimensions 1, 2, 3, 5, and 6
- Classify-only cases are scored on dimensions 1, 2, and 3 only
