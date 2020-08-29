import { PROB_COVID } from './assumptions'
import { activities } from './activities'
import { binomialProbability } from '@/common/math'

const calcExpectedNumberOfPeopleWithCovid = (numberOfPeople, covidProbability) => {
  return numberOfPeople * covidProbability
}

const calcProbSomeonePresentHasCovid = (numberOfPeoplePresent, covidProbability) =>
  1 - binomialProbability(numberOfPeoplePresent, 0, covidProbability)

const infectionProbability = (numberOfPeople, covidProbability, hourlyTransmissionProbability, eventDurationMins) => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(numberOfPeople, covidProbability)
  const probDoNotContract = binomialProbability(1 * eventDurationMins, 0, hourlyTransmissionProbability / 60)
  const probDoContract = 1 - probDoNotContract
  return probSomeonePresentHasCovid * probDoContract
}

const calculateCovidProb = activity => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(activity.numberOfPeoplePresent, PROB_COVID)
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
    probContractingCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNotContractingCovid, 1)
  }
}
