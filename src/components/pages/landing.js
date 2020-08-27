import React, { useState } from 'react'
import _ from 'lodash'
import { ActivityList } from '@/components/activites/list'
import { NewActivity } from '@/components/activites/new'
import { formatProbability } from '@/common/format'

import * as Model from '../../model'

export const Landing = () => {
  const [activities, setActivities] = useState([])
  console.log(activities)
  const activitesWithProbs = Model.calculateCovidProbs(activities)
  const highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
  return (
    <div className="container mx-auto py-6">
      <p className="text-3xl mb-4">Should I go out now?!!</p>
      <NewActivity onCreate={activity => setActivities([...activities, activity])} />
      {!_.isEmpty(activitesWithProbs) && (
        <div className="my-8">
          <p className="text-3xl mb-4">
            <span class="inline-block bg-teal-400 rounded-full px-3 py-1 text-3xl font-semibold text-white mr-2 mb-2 ml-1">
              {formatProbability(highLevelProbs.probSomeonePresentHasCovid)}
            </span>
            chance someone present has Covid
          </p>
          <p className="text-3xl mb-4">
            <span class="inline-block bg-teal-500 rounded-full px-3 py-1 text-3xl font-semibold text-white mr-2 mb-2 ml-1">
              {formatProbability(highLevelProbs.probContractingCovid)}
            </span>
            chance contracting Covid
          </p>
          <ActivityList activities={activitesWithProbs} />
        </div>
      )}
    </div>
  )
}
