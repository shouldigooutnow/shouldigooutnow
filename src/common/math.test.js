import { binomialProbability } from './math'

/**
Using this scipy function to check it's right:

from scipy import stats
print(stats.binom.pmf(5,10,0.1))
*/

const testCases = [
  { args: [10, 5, 0.1], expectedResult: 0.0014880348 },
  { args: [20, 5, 0.1], expectedResult: 0.03192136111995428 },
  { args: [300, 150, 0.5], expectedResult: 0.04602751441901616 }
]

for (const testCase of testCases) {
  it(`binomialProbability(${testCase.args}) returns ${testCase.expectedResult}`, () => {
    expect(binomialProbability(...testCase.args)).toBeCloseTo(testCase.expectedResult)
  })
}
