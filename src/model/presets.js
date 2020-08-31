export const probSomeoneHasCovidPresets = [
  {
    shortName: '2020-08-14 England (ONS) Careful',
    description: '2020-08-14 England (Office National Statistics) "Upper" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0007
  },
  {
    shortName: '2020-08-14 England (ONS) Medium',
    description: '2020-08-14 England (Office National Statistics) Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0005
  },
  {
    shortName: '2020-08-14 England (ONS) Optimistic',
    description: '2020-08-14 England (Office National Statistics) "Lower" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0004
  },
  {
    shortName: '2020-04-26 England Peak (ONS) Careful',
    description: '2020-04-26 England Peak Covid-19 (Office National Statistics) "Upper" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0131
  },
  {
    shortName: '2020-04-26 England Peak (ONS) Medium',
    description: '2020-04-26 England Peak Covid-19 (Office National Statistics) Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0064
  },
  {
    shortName: '2020-04-26 England Peak (ONS) Optimistic',
    description: '2020-08-14 England Peak Covid-19 (Office National Statistics) "Lower" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0026
  },
  {
    shortName: '2020-08-17 London (ONS) Careful',
    description: '2020-08-17 London (Office National Statistics) "Upper" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0013
  },
  {
    shortName: '2020-08-17 London (ONS) Medium',
    description: '2020-08-17 London (Office National Statistics) Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0007
  },
  {
    shortName: '2020-08-17 London (ONS) Optimistic',
    description: '2020-08-17 London (Office National Statistics) "Lower" Value',
    source:
      'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/coronaviruscovid19infectionsurveypilot/englandandwales21august2020#number-of-people-in-england-who-had-covid-19',
    probability: 0.0002
  }
]

export const probTransmissionPresets = [
  {
    shortName: 'Very Careful',
    description: 'Very Careful',
    source: null,
    probabilities: {
      indoors: 0.8,
      indoorsOthersFaceCovered: 0.45,
      outdoors: 0.2,
      outdoors2MeterDistancing: 0.1
    }
  },
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
