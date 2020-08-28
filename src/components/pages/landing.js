import React, { useState } from 'react'
import _ from 'lodash'
import { ActivityList } from '@/components/activites/list'
import { NewActivity } from '@/components/activites/new'
import { Probability } from '@/components/core/probability'
import { Shell } from '@/components/core/shell'

import * as Model from '../../model'

export const Landing = () => {
  const [activities, setActivities] = useState([])
  const activitesWithProbs = Model.calculateCovidProbs(activities)
  const highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
  return (
    <Shell>
      <p className="text-3xl mb-4">Should I go out now?</p>
      <p className="text-lg mb-4">A model to help think about how to behave during the Covid-19 Pandemic</p>
      <p className="text-md mb-4">
        Read about our{' '}
        <a className="text-teal-600" href="/methodology">
          methodology and assumptions
        </a>
      </p>
      <NewActivity onCreate={activity => setActivities([...activities, activity])} />
      {!_.isEmpty(activitesWithProbs) && (
        <div className="border-t border-gray-400 py-8">
          <p className="text-3xl mb-4">
            <Probability className="text-3xl" probability={highLevelProbs.probSomeonePresentHasCovid} />
            chance someone present has Covid
          </p>
          <p className="text-3xl mb-4">
            <Probability className="text-3xl bg-teal-500" probability={highLevelProbs.probContractingCovid} />
            chance contracting Covid
          </p>
          <ActivityList
            activities={activitesWithProbs}
            onDelete={activityIndex => {
              setActivities(_.reject(activities, (a, i) => i === activityIndex))
            }}
          />
        </div>
      )}
    </Shell>
  )
}
