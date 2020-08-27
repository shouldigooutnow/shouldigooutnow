import { combinations } from 'mathjs'
import { PROB_COVID, PROB_TRANSMISSION } from './assumptions'

// The probability that x happens exacltly k times out of n
const binomialProbability = (trials, successes, prob_of_success) => {
  const p = Math.min(1, prob_of_success)
  return combinations(trials, successes) * Math.pow(p, successes) * Math.pow(1 - p, trials - successes)
}

// The probability that x happens upto k times out of n
const cumulativeBinomialProbability = (trials, successes, prob_of_success) => {
  let cumulative = 0

  for (let i = 0; i <= successes; ++i) {
    cumulative = cumulative + binomialProbability(trials, i, prob_of_success)

    if (cumulative >= 1) {
      cumulative = 1
      break
    }
  }

  return cumulative
}

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
  const expectedInfectionRate = cumulativeBinomialProbability(numberOfPeople, numberOfPeople, covidProbability)
  return expectedNumberOfPeopleWithCovid * Math.min(1, expectedInfectionRate)
}

const calculateCovidProb = activity => {
  const probSomeonePresentHasCovid = binomialProbability(activity.numberOfPeoplePresent, 1, PROB_COVID)
  const probContractingCovid = infectionProbability(
    activity.numberOfPeoplePresent,
    PROB_COVID,
    PROB_TRANSMISSION[activity.activity],
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
