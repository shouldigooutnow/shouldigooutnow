import React, { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import { Label } from '@/components/core/label'
import { Form } from '@/components/core/form'
import { IntegerNumberInput } from '@/components/core/input'
import { InputButton } from '@/components/core/button'
import { Select } from '@/components/core/select'

import { activities } from '@/model/activities'

const defaultActivity = {
  activity: activities[0].key,
  duration: 2,
  numberOfPeople: 5,
  units: 'hours'
}

export const NewActivity = props => {
  const [activity, setActivity] = useState(defaultActivity.activity)
  const [durationUnits, setDurationUnits] = useState(defaultActivity.units)
  const [duration, setDuration] = useState(defaultActivity.duration)
  const [numberOfPeople, setNumberOfPeople] = useState(defaultActivity.numberOfPeople)

  return (
    <div className={classNames('bg-white leading-normal', props.className)}>
      <Form
        className="w-full max-w-3xl"
        onSubmit={() => {
          const durationMins = durationUnits === 'hours' ? duration * 60 : duration
          props.onCreate({
            activity,
            activityName: _.find(activities, { key: activity }).name,
            durationMins,
            numberOfPeople
          })
        }}
      >
        <p className="text-lg mb-4">Add activites</p>
        <div className="flex flex-wrap -mx-3">
          <div className="px-3">
            <Label htmlFor="activity">Activity</Label>
            <Select value={activity} id="activity" onChange={event => setActivity(event.target.value)}>
              {activities.map(activityOption => {
                return (
                  <option key={activityOption.key} value={activityOption.key}>
                    {activityOption.name}
                  </option>
                )
              })}
            </Select>
          </div>
          <div className="px-3">
            <Label htmlFor="number-of-people">Number of other people nearby</Label>
            <IntegerNumberInput
              id="number-of-people"
              className="w-20"
              onChange={newNumberOfPeople => setNumberOfPeople(newNumberOfPeople)}
              value={numberOfPeople}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="px-3">
            <Label htmlFor="duration-mins">Duration</Label>
            <IntegerNumberInput id="duration-mins" className="w-20" onChange={newDuration => setDuration(newDuration)} value={duration} />
          </div>
          <div className="">
            <Label htmlFor="duration-mins">&nbsp;</Label>
            <Select value={durationUnits} id="duration-units" onChange={event => setDurationUnits(event.target.value)}>
              <option value={'minutes'}>Minutes</option>
              <option value={'hours'}>Hours</option>
            </Select>
          </div>
        </div>
        <InputButton value="Add Activity" />
      </Form>
    </div>
  )
}
