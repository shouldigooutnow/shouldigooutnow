const assumptions = {
  probSomeoneHasCovid: 0.0013, // https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19
  probTransmissionPerHour: {
    indoors: 0.4,
    indoorsOthersFaceCovered: 0.3,
    outdoors: 0.15,
    outdoors2MeterDistancing: 0.05
  }
}

const probOfTransmissionPerMinForActivity = (assumptions, activity) => {
  return assumptions.probTransmissionPerHour[activity] / 60
}

const calcProbContractingCovid = (activity, probSomeonePresentHasCovid, assumptions) => {
  const probOfTransmissionPerMin = probOfTransmissionPerMinForActivity(assumptions, activity.activity)
  const probOfNoTransmission = Math.pow(1 - probOfTransmissionPerMin, activity.durationMins)
  const probOfTransmission = 1 - probOfNoTransmission
  return probSomeonePresentHasCovid * probOfTransmission
}

const calcProbNobodyHasCovid = (numberOfPeople, probSomeoneHasCovid) => {
  return Math.pow(1 - probSomeoneHasCovid, numberOfPeople)
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
