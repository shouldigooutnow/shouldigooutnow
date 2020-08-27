import React from 'react'
import _ from 'lodash'
import { Card } from '@/components/core/card'
import { formatMins } from '@/common/format'
import { Probability } from '@/components/core/probability'

const Activity = props => (
  <Card className="m-2">
    <p className="text-lg font-semibold mb-8">
      {props.activityName} for {formatMins(props.durationMins)} with {props.numberOfPeoplePresent} people
    </p>
    <p className="text-md mt-4 mb-2">
      <Probability probability={props.probSomeonePresentHasCovid} />
      chance someone present has Covid
    </p>
    <p className="text-md">
      <Probability className="bg-teal-500" probability={props.probContractingCovid} />
      chance contract Covid
    </p>
  </Card>
)

export const ActivityList = props => {
  return (
    <div className="flex flex-wrap">
      {_.map(props.activities, (activity, i) => (
        <Activity key={`activity-${i}`} {...activity} />
      ))}
    </div>
  )
}
