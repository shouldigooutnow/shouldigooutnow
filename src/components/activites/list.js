import React from 'react'
import _ from 'lodash'
import { Card } from '@/components/core/card'
import { formatMins } from '@/common/format'
import { Probability } from '@/components/core/probability'
import { Trash } from '@/components/icons'

const Activity = props => (
  <Card className="m-2">
    <div className="flex flex-row justify-between items-center mb-8">
      <div>
        <p className="text-lg font-semibold">{props.activityName}</p>
        <p className="text-md font-semibold">
          {formatMins(props.durationMins)} with {props.numberOfPeoplePresent} people
        </p>
      </div>
      <Trash className="cursor-pointer text-gray-600" onClick={() => props.onDelete()} />
    </div>
    <div className="flex flex-wrap items-center mt-8 md:mt-4 mb-2">
      <Probability probability={props.probSomeonePresentHasCovid} />
      <p className="text-md ">chance someone present has Covid</p>
    </div>
    <div className="flex flex-wrap items-center mt-8 md:mt-0">
      <Probability className="bg-teal-500" probability={props.probContractingCovid} />
      <p className="text-md">chance contract Covid</p>
    </div>
  </Card>
)

export const ActivityList = props => {
  return (
    <div className="flex flex-wrap -mx-2">
      {_.map(props.activities, (activity, i) => (
        <Activity key={`activity-${i}`} onDelete={() => props.onDelete(i)} {...activity} />
      ))}
    </div>
  )
}
