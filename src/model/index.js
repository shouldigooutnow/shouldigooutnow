import { binomialProbability } from '@/common/math'

const calcProbSomeonePresentHasCovid = (numberOfPeoplePresent, covidProbability) =>
  1 - binomialProbability(numberOfPeoplePresent, 0, covidProbability)

// Exponential decay method: https://math.stackexchange.com/questions/153607/what-is-the-chance-to-get-a-parking-ticket-in-half-an-hour-if-the-chance-to-get/153612#153612
const hourlyProbToMinutely = hourlyProb => {
  return 1 - Math.pow(1 - hourlyProb, 1 / 60)
}

const infectionProbability = (numberOfPeople, covidProbability, hourlyTransmissionProbability, eventDurationMins) => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(numberOfPeople, covidProbability)
  const minutelyTranmissionProbability = hourlyProbToMinutely(hourlyTransmissionProbability)
  const probDoNotContract = binomialProbability(eventDurationMins, 0, minutelyTranmissionProbability)
  const probDoContract = 1 - probDoNotContract
  return probSomeonePresentHasCovid * probDoContract
}

const calculateCovidProb = (activity, covidProbability, transmissionProbabilities) => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(activity.numberOfPeoplePresent, covidProbability)
  const probContractingCovid = infectionProbability(
    activity.numberOfPeoplePresent,
    covidProbability,
    transmissionProbabilities[activity.activity],
    activity.durationMins
  )
  return {
    ...activity,
    probSomeonePresentHasCovid,
    probNobodyPresentHasCovid: 1 - probSomeonePresentHasCovid,
    probContractingCovid,
    probNotContractingCovid: 1 - probContractingCovid
  }
}

export const calculateCovidProbs = (activities, covidProbability, transmissionProbabilities) => {
  return activities.map(a => calculateCovidProb(a, covidProbability, transmissionProbabilities))
}

export const calculateHighLevelProbs = activitiesWithProbs => {
  return {
    probSomeonePresentHasCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNobodyPresentHasCovid, 1),
    probContractingCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNotContractingCovid, 1)
  }
}
