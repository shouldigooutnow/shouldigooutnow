import { PROB_COVID } from './assumptions'
import { activities } from './activities'
import { binomialProbability } from '@/common/math'

const calcExpectedNumberOfPeopleWithCovid = (numberOfPeople, covidProbability) => {
  return numberOfPeople * covidProbability
}

const calcProbSomeonePresentHasCovid = (numberOfPeoplePresent, covidProbability) =>
  1 - binomialProbability(numberOfPeoplePresent, 0, covidProbability)

const hourlyProbToMinutely = hourlyProb => {
  return 1 - Math.pow(1 - hourlyProb, 1 / 60)
}

const infectionProbability = (numberOfPeople, covidProbability, hourlyTransmissionProbability, eventDurationMins) => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(numberOfPeople, covidProbability)
  // Exponential decay method: https://math.stackexchange.com/questions/153607/what-is-the-chance-to-get-a-parking-ticket-in-half-an-hour-if-the-chance-to-get/153612#153612
  const minutelyTranmissionProbability = hourlyProbToMinutely(hourlyTransmissionProbability)
  const probDoNotContract = binomialProbability(eventDurationMins, 0, minutelyTranmissionProbability)
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
