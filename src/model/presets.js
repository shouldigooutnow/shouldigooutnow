export const probSomeonePresentHasCovidPresets = [
  {
    shortName: '2020-08-14 England (ONS) Careful',
    description: '2020-08-14 England (Office National Statistics) Most Conservative',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0013
  },
  {
    shortName: '2020-08-14 England (ONS) Optimistic',
    description: '2020-08-14 England (Office National Statistics) Optimistic',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0006
  }
]

export const probTransmissionPresets = [
  {
    shortName: 'Careful',
    description: 'Careful',
    source: null,
    probabilities: {
      indoors: 0.4,
      indoorsOthersFaceCovered: 0.3,
      outdoors: 0.15,
      outdoors2MeterDistancing: 0.05
    }
  },
  {
    shortName: 'Medium',
    description: 'Medium',
    source: null,
    probabilities: {
      indoors: 0.25,
      indoorsOthersFaceCovered: 0.2,
      outdoors: 0.08,
      outdoors2MeterDistancing: 0.03
    }
  },
  {
    shortName: 'Optimistic',
    description: 'Optimistic',
    source: null,
    probabilities: {
      indoors: 0.1,
      indoorsOthersFaceCovered: 0.05,
      outdoors: 0.02,
      outdoors2MeterDistancing: 0.01
    }
  }
]
