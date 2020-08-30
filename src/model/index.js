import { binomialProbability } from '@/common/math'

// See src/components/methodology/content.md for a full explanation

const calcProbSomeoneHasCovid = (numberOfPeople, covidProbability) => {
  const probabilityNobodyHasCovid = binomialProbability(numberOfPeople, 0, covidProbability)
  return 1 - probabilityNobodyHasCovid
}

// Exponential decay method: https://math.stackexchange.com/questions/153607/what-is-the-chance-to-get-a-parking-ticket-in-half-an-hour-if-the-chance-to-get/153612#153612
const hourlyProbToMinutely = hourlyProb => {
  return 1 - Math.pow(1 - hourlyProb, 1 / 60)
}

const infectionProbability = (numberOfPeople, covidProbability, hourlyTransmissionProbability, eventDurationMins) => {
  const probSomeoneHasCovid = calcProbSomeoneHasCovid(numberOfPeople, covidProbability)
  const minutelyTranmissionProbability = hourlyProbToMinutely(hourlyTransmissionProbability)
  const probDoNotContract = binomialProbability(eventDurationMins, 0, minutelyTranmissionProbability)
  const probDoContract = 1 - probDoNotContract
  return probSomeoneHasCovid * probDoContract
}

const calculateCovidProb = (activity, covidProbability, transmissionProbabilities) => {
  const probSomeoneHasCovid = calcProbSomeoneHasCovid(activity.numberOfPeople, covidProbability)
  const probContractingCovid = infectionProbability(
    activity.numberOfPeople,
    covidProbability,
    transmissionProbabilities[activity.activity],
    activity.durationMins
  )
  return {
    ...activity,
    probSomeoneHasCovid,
    probNobodyHasCovid: 1 - probSomeoneHasCovid,
    probContractingCovid,
    probNotContractingCovid: 1 - probContractingCovid
  }
}

export const calculateCovidProbs = (activities, covidProbability, transmissionProbabilities) => {
  return activities.map(a => calculateCovidProb(a, covidProbability, transmissionProbabilities))
}

export const calculateHighLevelProbs = activitiesWithProbs => {
  return {
    probSomeoneHasCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNobodyHasCovid, 1),
    probContractingCovid: 1 - activitiesWithProbs.reduce((result, activity) => result * activity.probNotContractingCovid, 1)
  }
}
