import _ from 'lodash'
import React, { useState } from 'react'
import { Shell } from '@/components/core/shell'
import { ToolTip } from '@/components/core/tooltip'
import { Probability } from '@/components/core/probability'
import { calculateCovidProbs, calculateHighLevelProbs } from '@/model'
import * as ModelPresets from '@/model/presets'
import { Assumptions } from '@/components/assumptions'
import { areTranmissionProbsValid } from './landing'

const repeat = (n, x) => _.times(n, _.constant(x))

const ExampleTable = props => (
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2">Activity</th>
        <th class="px-4 py-2">Chance someone has Covid</th>
        <th class="px-4 py-2">Chance contracting Covid</th>
      </tr>
    </thead>
    <tbody>
      {props.examples.map(example => {
        return (
          <tr>
            <td class="border px-4 py-2">
              {example.name} {example.toolTip && <ToolTip id={example.name} message={example.toolTip} />}
            </td>
            <td class="border px-4 py-2">
              <Probability probability={example.highLevelProbs.probSomeoneHasCovid} />
            </td>
            <td class="border px-4 py-2">
              <Probability probability={example.highLevelProbs.probContractingCovid} />
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

const trainJourney = { activity: 'indoorsOthersFaceCovered', activityName: 'Indoors', durationMins: 30, numberOfPeople: 10 }
const schoolClass = { activity: 'indoors', activityName: 'Indoors', durationMins: 30, numberOfPeople: 10 }

const examples = [
  {
    name: 'Hangout indoors for 1 hour with 1 person',
    activities: [
      {
        activity: 'indoors',
        activityName: 'Indoors',
        durationMins: 60,
        numberOfPeople: 1
      }
    ]
  },
  {
    name: 'Hangout indoors for 1 hour with 2 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60, numberOfPeople: 2 }]
  },
  {
    name: 'Hangout indoors for 1 hour with 4 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60, numberOfPeople: 4 }]
  },
  {
    name: 'Hangout indoors for 1 hour with 6 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60, numberOfPeople: 6 }]
  },
  {
    name: 'Hangout indoors for 3 hours with 1 person',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 3, numberOfPeople: 1 }]
  },
  {
    name: 'Hangout indoors for 3 hours with 2 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 3, numberOfPeople: 2 }]
  },
  {
    name: 'Hangout indoors for 3 hours with 4 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 3, numberOfPeople: 4 }]
  },
  {
    name: 'Hangout indoors for 3 hours with 6 people',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 3, numberOfPeople: 6 }]
  },
  {
    name: 'Being at work in office with 5 people Mon-Fri for 1 week',
    toolTip: 'Indoors for 40 hours with same 5 people no masks',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 8 * 5, numberOfPeople: 5 }]
  },
  {
    name: 'Being at work in office with 5 people Mon-Wed for 1 week',
    toolTip: 'Indoors for 24 hours with same 5 people no masks',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 8 * 3, numberOfPeople: 5 }]
  },
  {
    name: 'Being at work in office with 10 people Mon-Fri for 1 week',
    toolTip: 'Indoors for 40 hours with same 10 people no masks',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 8 * 5, numberOfPeople: 10 }]
  },
  {
    name: 'Being at work in office with 10 people Mon-Wed for 1 week',
    toolTip: 'Indoors for 24 hours with same 10 people no masks',
    activities: [{ activity: 'indoors', activityName: 'Indoors', durationMins: 60 * 8 * 3, numberOfPeople: 10 }]
  },
  {
    name: 'Train to work Mon-Fri for 1 week',
    toolTip: '(Indoors with masks for 30 minutes with 10 random people) x 10',
    activities: repeat(10, trainJourney)
  },
  {
    name: 'Train to work Mon-Wed for 1 week',
    toolTip: '(Indoors with masks for 30 minutes with 10 random people) x 6',
    activities: repeat(6, trainJourney)
  },
  {
    name: 'Working in a School Mon-Fri for 1 week',
    toolTip: '(3 hours with 12 people indoors no masks) x 4',
    activities: repeat(4, schoolClass)
  }
]

export const Examples = () => {
  const [modelCovidPresets] = useState(ModelPresets.probSomeoneHasCovidPresets)
  const [selectedCovidProb, onSelectedCovidProbUpdate] = useState(null)
  const [modelTransmissionPresets] = useState(ModelPresets.probTransmissionPresets)
  const [selectedTransmissionProbs, onSelectedTransmissionProbsUpdate] = useState(null)
  let examplesWithProbs
  if (selectedCovidProb && areTranmissionProbsValid(selectedTransmissionProbs)) {
    examplesWithProbs = examples.map(example => {
      const activitesWithProbs = calculateCovidProbs(
        example.activities,
        selectedCovidProb.probability,
        selectedTransmissionProbs.probabilities
      )
      return {
        ...example,
        activities: activitesWithProbs,
        highLevelProbs: calculateHighLevelProbs(activitesWithProbs)
      }
    })
  }
  return (
    <Shell>
      <p className="text-3xl mb-4 text-teal-600 font-bold">Should I go out now?</p>
      <p className="text-lg mb-4">A model to help think about how to behave during the Covid-19 Pandemic</p>
      <Assumptions
        covidPresets={modelCovidPresets}
        selectedCovidProb={selectedCovidProb}
        transmissionPresets={modelTransmissionPresets}
        selectedTransmissionProbs={selectedTransmissionProbs}
        onSelectedCovidProbUpdate={onSelectedCovidProbUpdate}
        onSelectedTransmissionProbsUpdate={onSelectedTransmissionProbsUpdate}
      />
      <div className="border-t border-gray-400 mt-8 mb-6" />
      {examplesWithProbs && <ExampleTable examples={examplesWithProbs} />}
    </Shell>
  )
}
