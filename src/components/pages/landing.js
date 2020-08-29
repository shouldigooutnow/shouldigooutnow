import React, { useState } from 'react'
import _ from 'lodash'
import { ActivityList } from '@/components/activites/list'
import { NewActivity } from '@/components/activites/new'
import { Assumptions } from '@/components/assumptions'
import { Probability } from '@/components/core/probability'
import { Shell } from '@/components/core/shell'

import * as Model from '@/model'
import * as ModelPresets from '@/model/presets'

export const Landing = () => {
  const [activities, setActivities] = useState([])
  const [showModelParams, setShowModelParams] = useState(false)

  const [modelCovidPresets] = useState(ModelPresets.probSomeonePresentHasCovidPresets)
  const [selectedCovidProbs, onSelectedCovidProbsUpdate] = useState(modelCovidPresets[0])
  const [modelTransmissionPresets] = useState(ModelPresets.probTransmissionPresets)
  const [selectedTransmissionProbs, onSelectedTransmissionProbsUpdate] = useState(modelTransmissionPresets[0])

  const activitesWithProbs = Model.calculateCovidProbs(activities, selectedCovidProbs.probability, selectedTransmissionProbs.probabilities)
  const highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
  return (
    <Shell>
      <p className="text-3xl mb-4 text-teal-600 font-bold">Should I go out now?</p>
      <p className="text-lg mb-4">A model to help think about how to behave during the Covid-19 Pandemic</p>
      <p className="text-md mb-4">
        Read about our{' '}
        <a className="text-teal-600" href="/methodology">
          methodology and assumptions
        </a>
      </p>
      <p className="text-lg mb-4 mt-8 text-teal-600 cursor-pointer" onClick={() => setShowModelParams(!showModelParams)}>
        Model Assumptions and Presets
        <p className="text-teal-600 inline-block ml-2">{showModelParams ? '-' : '+'}</p>
      </p>
      {showModelParams ? (
        <Assumptions
          covidPresets={modelCovidPresets}
          selectedCovidProbs={selectedCovidProbs}
          transmissionPresets={modelTransmissionPresets}
          selectedTransmissionProbs={selectedTransmissionProbs}
          onSelectedCovidProbsUpdate={onSelectedCovidProbsUpdate}
          onSelectedTransmissionProbsUpdate={onSelectedTransmissionProbsUpdate}
        />
      ) : null}
      <div className="border-t border-gray-400 py-2" />
      <NewActivity
        onCreate={activity => setActivities([...activities, activity])}
        transmissionProbabilties={selectedTransmissionProbs.probabilities}
      />
      {!_.isEmpty(activitesWithProbs) && (
        <div className="border-t border-gray-400 py-8">
          <ActivityList
            activities={activitesWithProbs}
            onDelete={activityIndex => {
              setActivities(_.reject(activities, (a, i) => i === activityIndex))
            }}
          />
          <div className="border-t border-gray-400 mt-8"></div>
          <p className="md:text-1xl text-xl my-4 mb-4">Total Risk:</p>
          <div className="flex flex-wrap items-center mt-8 mb-4 md:mt-0">
            <Probability className="md:text-1xl text-xl" probability={highLevelProbs.probSomeonePresentHasCovid} />
            <p className="md:text-1xl text-xl">chance someone present has Covid</p>
          </div>
          <div className="flex flex-wrap items-center mt-8 mb-4 md:mt-0">
            <Probability className="md:text-1xl text-xl bg-teal-500" probability={highLevelProbs.probContractingCovid} />
            <p className="md:text-1xl text-xl">chance contracting Covid</p>
          </div>
        </div>
      )}
    </Shell>
  )
}
