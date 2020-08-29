export const probSomeonePresentHasCovidPresets = [
  {
    shortName: '2020-08-31 England (ONS)',
    description: '2020-08-31 England (Office National Statistics)',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0013
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
      indoors: 0.4,
      indoorsOthersFaceCovered: 0.3,
      outdoors: 0.15,
      outdoors2MeterDistancing: 0.05
    }
  },
  {
    shortName: 'Optimistic',
    description: 'Optimistic',
    source: null,
    probabilities: {
      indoors: 0.4,
      indoorsOthersFaceCovered: 0.3,
      outdoors: 0.15,
      outdoors2MeterDistancing: 0.05
    }
  }
]