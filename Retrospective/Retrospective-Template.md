# TEMPLATE FOR RETROSPECTIVE (Team ##)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - Committed: 3
  - Done: 3
- Total points committed vs. done
  - Committed: 16
  - Done: 16
- Nr of hours planned vs. spent (as a team)
  - Planned: 96h
  - Spent: 98h35m

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story         | # Tasks | Points | Hours est. | Hours actual |
| ------------- | ------- | ------ | ---------- | ------------ |
| _#0_          | 8       |        | 28h        | 27 35m       |
| Get a ticket  | 11      | 5      | 27h 55m    | 27h 35m      |
| Next Customer | 10      | 3      | 26h 25m    | 28h          |
| Call Customer | 1       | 8      | 3h         | 3h           |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  Estimated hours per task average: 2.84h  
  Standard deviation: 2.82h

  Actual hours per task average: 2.87h  
  Standard deviation: 2.84h

- **Hours per Task**: Average, Standard Deviation (Estimate and Actual)

- **Total Estimation Error Ratio**: sum of total hours spent / sum of total hours estimated - 1

  $$ \frac{\sum*i \text{spent}*{task*i}}{\sum_i \text{estimation}*{task_i}} - 1 = \frac{98}{98.5} - 1 = -0.00508 $$

- **Absolute Relative Task Estimation Error**: average of absolute relative errors across all tasks

  $$ \frac{1}{n}\sum*i^n \left| \frac{\text{spent}*{task*i}}{\text{estimation}*{task_i}} - 1 \right| = 0.038 $$

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 4h
  - Total hours spent: 4h
  - Nr of automated unit test cases: 17
  - Coverage (if available) 100%
- E2E testing:
  - Total hours estimated: 3h
  - Total hours spent: 3h
- Code review
  - Total hours estimated: 3h
  - Total hours spent: 3h

## ASSESSMENT

- What caused your errors in estimation (if any)?

- What lessons did you learn (both positive and negative) in this sprint?

- Which improvement goals set in the previous retrospective were you able to achieve?
- Which ones you were not able to achieve? Why?

- There was some overlapping due to dependency of tasks which we had challenges in timing and work in parallel on each parts.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Propose one or two

- One thing you are proud of as a Team!!
