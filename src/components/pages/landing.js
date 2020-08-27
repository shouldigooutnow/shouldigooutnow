import React, { useState } from 'react'
import _ from 'lodash'
import { ActivityList } from '@/components/activites/list'
import { NewActivity } from '@/components/activites/new'
import { Probability } from '@/components/core/probability'

import * as Model from '../../model'

export const Landing = () => {
  const [activities, setActivities] = useState([])
  const activitesWithProbs = Model.calculateCovidProbs(activities)
  const highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
  return (
    <div className="container mx-auto py-6">
      <p className="text-3xl mb-4">Should I go out now?!!</p>
      <NewActivity onCreate={activity => setActivities([...activities, activity])} />
      {!_.isEmpty(activitesWithProbs) && (
        <div className="my-8">
          <p className="text-3xl mb-4">
            <Probability className="text-3xl" probability={highLevelProbs.probSomeonePresentHasCovid} />
            chance someone present has Covid
          </p>
          <p className="text-3xl mb-4">
            <Probability className="text-3xl bg-teal-500" probability={highLevelProbs.probContractingCovid} />
            chance contracting Covid
          </p>
          <ActivityList activities={activitesWithProbs} />
        </div>
      )}
    </div>
  )
}
