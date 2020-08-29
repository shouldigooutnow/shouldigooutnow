import { factorial } from 'mathjs'
import { PROB_COVID } from './assumptions'
import { activities } from './activities'

// The probability that x happens exacltly k times out of n
const binomialProbability = (trials, successes, prob_of_success) => {
  const p = Math.min(1, prob_of_success)
  const part1 = successes === 0 ? 1 : factorial(trials) / (factorial(successes) * factorial(trials - successes))
  const part2 = Math.pow(p, successes) * Math.pow(1 - p, trials - successes)
  return part1 * part2
}

// // The probability that x happens upto k times out of n
// const cumulativeBinomialProbability = (trials, successes, prob_of_success) => {
//   let cumulative = 0
//   for (let i = 1; i <= successes; ++i) {
//     cumulative = cumulative + binomialProbability(trials, i, prob_of_success)

//     if (cumulative >= 1) {
//       cumulative = 1
//       break
//     }
//   }

//   return cumulative
// }

const calcExpectedNumberOfPeopleWithCovid = (numberOfPeople, covidProbability) => {
  return numberOfPeople * covidProbability
}

// Things to calculate:
//  - Probability of transmission by event
//    This is: ExpectedNumberOfPeopleWithCovid * TransmissionRatePerHour * NumberOfHours
//  We assume
//    - linear transmission probability, 2 mins is twice as bad as 1 min.
//    - if more people have covid, the chances you will get it increase
const infectionProbability = (numberOfPeople, covidProbability, hourlyTransmissionProbability, eventDurationMins) => {
  const expectedNumberOfPeopleWithCovid = calcExpectedNumberOfPeopleWithCovid(numberOfPeople, covidProbability)
  // dodgy maths here...
  const expectedInfectionRate =
    1 - binomialProbability(expectedNumberOfPeopleWithCovid, 0, (eventDurationMins * hourlyTransmissionProbability) / 60)

  return Math.min(1, expectedInfectionRate)
}

const calculateCovidProb = activity => {
  const probSomeonePresentHasCovid = 1 - binomialProbability(activity.numberOfPeoplePresent, 0, PROB_COVID)
  const probContractingCovid = infectionProbability(
    activity.numberOfPeoplePresent,
    PROB_COVID,
    activities.find(a => a.key === activity.activity).probability,
    activity.durationMins
  )
  return {
    ...activity,
    probSomeonePresentHasCovid,
    probNobodyPresentHasCovid: 1 - probSomeonePresentHasCovid,
    expectedNumberPeopleWithCovid: calcExpectedNumberOfPeopleWithCovid(activity.numberOfPeoplePresent, PROB_COVID),
    probContractingCovid,
    probNotContractingCovid: 1 - probContractingCovid
  }
}

export const calculateCovidProbs = activities => {
  return activities.map(a => calculateCovidProb(a))
}

export const calculateHighLevelProbs = activitiesWithProbs => {
  return {
    probSomeonePresentHasCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNobodyPresentHasCovid, 1),
    probContractingCovid: Math.min(1, 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNotContractingCovid, 1))
  }
}
