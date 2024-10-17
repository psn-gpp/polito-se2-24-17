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

  $ \frac{\sum*i \text{spent}*{task*i}}{\sum_i \text{estimation}*{task_i}} - 1 = \frac{98}{98.5} - 1 = -0.00508 $

- **Absolute Relative Task Estimation Error**: average of absolute relative errors across all tasks

  $ \frac{1}{n}\sum*i^n \left| \frac{\text{spent}*{task*i}}{\text{estimation}*{task_i}} - 1 \right| = 0.038 $

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
  - Errors in estimation often came from underestimating how much time consuming tasks can be. In this sprint, some tasks took longer than expectation due to unforeseen challenges in integrating some functionalities and debugging. Additionally, certain dependencies between tasks created some challenges that maybe need modifying in all parts again.
- What lessons did you learn (both positive and negative) in this sprint?

  - Positive: Effective and frequent communication were essential for identifying probable problems early. The team also made good progress in understanding the project and it needs better, which should help with future estimations and implementations.

  - Negative: Dependencies between tasks were underestimated, and there was a lack of clarity on some requirements in stories , which led to delays. More attention needs to be given to specifying requirements in detail before beginning coding which leads too less effort and time spendings.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - Achieved: Improved communication with regular updates in daily scrums helped us to identify the challenges in early steps.

  - Partially Achieved: The goal of reducing number of bugs was almost met, although some minor tasks required more improvements.

- Which ones you were not able to achieve? Why?

  - There were some overlappings due to dependency of the tasks which we had challenges in timing and working in parallel on each part

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > 1. Enhance Task Breakdown: More detailed task breakdowns to improve estimation accuracy. Team members will discuss each task’s requirements in detail before committing.
  > 2. Optimize Code Review Process: Implement a more simple review process, perhaps by assigning designated reviewers and setting time blocks for reviews. This should make quicker feedback.

- One thing you are proud of as a Team!!
  - We’re proud of having motivated and hardworking teammates which attend to help each other and improve abilities during the project.
