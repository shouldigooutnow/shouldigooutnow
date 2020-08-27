const assumptions = {
  probSomeoneHasCovid: 0.0013, // https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19
  probTransmissionPerHour: {
    indoors: 0.4,
    indoorsOthersFaceCovered: 0.3,
    outdoors: 0.15,
    outdoors2MeterDistancing: 0.05
  }
}

// TODO: Find a math function for this?
const factorial = n => {
  return n > 1 ? n * factorial(n - 1) : 1
}

// 𝑃(𝑋=0) = (𝜆^0 . 𝑒^−𝜆) / 0! = 𝑒^−𝜆      <---- Probability no occurance in 1 hour
// 𝑒^−𝜆 = p      ...    𝜆 = -ln(p)
// and therefor probability by time:
// 1−[ ( 𝑡 . -ln(p) / 60 )^0 . 𝑒^[−𝑡.-ln(p)/60] / (0!)] = 1 − [ 𝑒^−𝑡.-ln(p)/60 ]
const calcProbOfTransmissionFromActivity = (probTransmissionPerHour, activityDurationMins) => {
  const probNoTransmissionPerHour = 1 - probTransmissionPerHour
  const lambda = Math.log(probNoTransmissionPerHour) * -1
  const activityProbNoTransmission = Math.exp((-1 * activityDurationMins * lambda) / 60)
  const activityProbTransmission = 1 - activityProbNoTransmission

  return activityProbTransmission
}

const calcProbContractingCovid = (activity, probSomeonePresentHasCovid, assumptions) => {
  return (
    probSomeonePresentHasCovid *
    calcProbOfTransmissionFromActivity(assumptions.probTransmissionPerHour[activity.activity], activity.durationMins)
  )
}

// binomial probability:
const calcProbNobodyHasCovid = (numberOfPeople, probSomeoneHasCovid) => {
  const n = numberOfPeople // set n = size of set = number of people
  const p = 1 - probSomeoneHasCovid // set p = probability person does not have covid
  const k = n // set k = size of successes = total number of people
  return ((factorial(n) / factorial(n - k)) * (p ^ k) * (1 - p)) ^ (n - k)
}

const calcProbSomeonePresentHasCovid = (numberOfPeople, probSomeoneHasCovid) => {
  return 1 - calcProbNobodyHasCovid(numberOfPeople, probSomeoneHasCovid)
}

const calcAverageNumberOfPeopleThatHaveCovid = (numberOfPeople, probSomeoneHasCovid) => {
  return numberOfPeople * probSomeoneHasCovid
}

const activitiesList = [
  {
    durationMins: 10,
    activity: 'indoors',
    numberOfPeoplePresent: 5
  },
  {
    durationMins: 60,
    activity: 'indoorsOthersFaceCovered',
    numberOfPeoplePresent: 1000
  },
  {
    durationMins: 60,
    activity: 'outdoors',
    numberOfPeoplePresent: 1000
  },
  {
    durationMins: 60,
    activity: 'outdoors',
    numberOfPeoplePresent: 1000
  }
]

const calculateCovidProb = activity => {
  const probSomeonePresentHasCovid = calcProbSomeonePresentHasCovid(activity.numberOfPeoplePresent, assumptions.probSomeoneHasCovid)
  const probContractingCovid = calcProbContractingCovid(activity, probSomeonePresentHasCovid, assumptions)
  return {
    ...activity,
    probSomeonePresentHasCovid,
    probNobodyPresentHasCovid: 1 - probSomeonePresentHasCovid,
    averageNumberPeopleWithCovid: calcAverageNumberOfPeopleThatHaveCovid(activity.numberOfPeoplePresent, assumptions.probSomeoneHasCovid),
    probContractingCovid,
    probNotContractingCovid: 1 - probContractingCovid
  }
}

const calculateCovidProbs = activities => {
  return activities.map(calculateCovidProb)
}

const activitesWithProbs = calculateCovidProbs(activitiesList)
const highLevelProbs = {
  probSomeonePresentHasCovid: 1 - activitesWithProbs.reduce((result, activity) => result * activity.probNobodyPresentHasCovid, 1),
  probContractingCovid: 1 - activitesWithProbs.reduce((result, activity) => result * activity.probNotContractingCovid, 1)
}
console.log(activitesWithProbs)
console.log('Summary of all activities:', highLevelProbs)
