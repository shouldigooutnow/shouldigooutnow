import React, { useState } from 'react'
import _ from 'lodash'
import { ActivityList } from '@/components/activites/list'
import { NewActivity } from '@/components/activites/new'
import { Summary } from '@/components/activites/summary'
import { Assumptions } from '@/components/assumptions'
import { Shell } from '@/components/core/shell'
import { Link } from '@/components/core/link'
import { Warning } from '@/components/icons'
import * as Model from '@/model'
import * as ModelPresets from '@/model/presets'

export const areTranmissionProbsValid = transmissionProbs => {
  return (
    transmissionProbs &&
    transmissionProbs.probabilities &&
    _.isNumber(transmissionProbs.probabilities.indoors) &&
    _.isNumber(transmissionProbs.probabilities.indoorsOthersFaceCovered) &&
    _.isNumber(transmissionProbs.probabilities.outdoors) &&
    _.isNumber(transmissionProbs.probabilities.outdoors2MeterDistancing)
  )
}

export const Landing = () => {
  const [activities, setActivities] = useState([])
  const [modelCovidPresets] = useState(ModelPresets.probSomeoneHasCovidPresets)
  const [selectedCovidProb, onSelectedCovidProbUpdate] = useState(null)
  const [modelTransmissionPresets] = useState(ModelPresets.probTransmissionPresets)
  const [selectedTransmissionProbs, onSelectedTransmissionProbsUpdate] = useState(null)
  let activitesWithProbs
  let highLevelProbs
  if (selectedCovidProb && areTranmissionProbsValid(selectedTransmissionProbs)) {
    activitesWithProbs = Model.calculateCovidProbs(activities, selectedCovidProb.probability, selectedTransmissionProbs.probabilities)
    highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
  }
  return (
    <Shell>
      <p className="text-3xl mb-4 text-teal-600 font-bold">Should I go out now?</p>
      <p className="text-lg mb-4">A model to help think about how to behave during the Covid-19 Pandemic</p>
      <p className="text-md mb-12">
        <Warning className="inline" /> We are not Epidemiologists / Scientists. Please read our{' '}
        <Link href="/methodology">methodology and assumptions</Link>
      </p>

      <Assumptions
        covidPresets={modelCovidPresets}
        selectedCovidProb={selectedCovidProb}
        transmissionPresets={modelTransmissionPresets}
        selectedTransmissionProbs={selectedTransmissionProbs}
        onSelectedCovidProbUpdate={onSelectedCovidProbUpdate}
        onSelectedTransmissionProbsUpdate={onSelectedTransmissionProbsUpdate}
      />

      {selectedCovidProb && areTranmissionProbsValid(selectedTransmissionProbs) && (
        <>
          <div className="border-t border-gray-400 mt-4 mb-5" />
          <NewActivity
            onCreate={activity => setActivities([...activities, activity])}
            transmissionProbabilties={selectedTransmissionProbs.probabilities}
          />
        </>
      )}
      {!_.isEmpty(activitesWithProbs) && (
        <>
          <div className="border-t border-gray-400 mt-8 mb-6" />
          <p className="text-md mb-4">
            <Warning className="inline" /> We are not Epidemiologists / Scientists. Please{' '}
            <Link href="/methodology">read how this works</Link>
          </p>
          <div className="">
            <ActivityList
              activities={activitesWithProbs}
              onDelete={activityIndex => {
                setActivities(_.reject(activities, (a, i) => i === activityIndex))
              }}
            />
            <div className="border-t border-gray-400 mt-6"></div>
            <Summary highLevelProbs={highLevelProbs} />
          </div>
        </>
      )}
    </Shell>
  )
}
