import React from 'react'
import _ from 'lodash'
import { Card } from '@/components/core/card'
import { formatMins, formatProbability } from '@/common/format'

const Activity = props => (
  <Card className="m-2">
    <p className="text-lg font-semibold mb-8">
      {props.activityName} for {formatMins(props.durationMins)} with {props.numberOfPeoplePresent} people
    </p>
    <p className="text-md mt-4 mb-2">
      <span class="inline-block bg-teal-400 rounded-full px-3 py-1 text-lg font-semibold text-white mr-2 mb-2">
        {formatProbability(props.probSomeonePresentHasCovid)}
      </span>
      chance someone present has Covid
    </p>
    <p className="text-md">
      <span class="inline-block bg-teal-500 rounded-full px-3 py-1 text-lg font-semibold text-white mr-2 mb-2">
        {formatProbability(props.probContractingCovid)}
      </span>
      chance contract Covid
    </p>
  </Card>
)

export const ActivityList = props => {
  console.log(props.activities)
  return (
    <div className="flex flex-wrap">
      {_.map(props.activities, (activity, i) => (
        <Activity key={`activity-${i}`} {...activity} />
      ))}
    </div>
  )
}
