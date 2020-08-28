import React, { useState } from 'react'
import _ from 'lodash'
import { Label } from '@/components/core/label'
import { Form } from '@/components/core/form'
import { NumberInput } from '@/components/core/input'
import { InputButton } from '@/components/core/button'
import { Select } from '@/components/core/select'
import { activities } from '@/model/activities'

const defaultActivity = {
  activity: 'indoors',
  durationMins: 30,
  numberOfPeoplePresent: 5
}

export const NewActivity = props => {
  const [activity, setActivity] = useState(defaultActivity.activity)
  const [durationUnits, setDurationUnits] = useState('minutes')
  const [duration, setDuration] = useState(defaultActivity.durationMins)
  const [numberOfPeoplePresent, setNumberOfPeoplePresent] = useState(defaultActivity.numberOfPeoplePresent)

  return (
    <div className="border-b border-gray-400 lg:border-gray-400 bg-white py-8 leading-normal">
      <Form
        className="w-full max-w-3xl"
        onSubmit={() => {
          const durationMins = durationUnits === 'hours' ? duration * 60 : duration
          props.onCreate({ activity, activityName: _.find(activities, { key: activity }).name, durationMins, numberOfPeoplePresent })
          setActivity(defaultActivity.activity)
          setDuration(defaultActivity.durationMins)
          setDurationUnits('minutes')
          setNumberOfPeoplePresent(defaultActivity.numberOfPeoplePresent)
        }}
      >
        <div className="flex flex-wrap -mx-3">
          <div className="md:w-1/2 px-3">
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
          <div className="md:w-1/2 px-3">
            <Label htmlFor="number-of-people-present">Number of people</Label>
            <NumberInput
              id="number-of-people-present"
              type="number"
              onChange={newNumberOfPeoplePresent => setNumberOfPeoplePresent(newNumberOfPeoplePresent)}
              value={numberOfPeoplePresent}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/6 px-3">
            <Label htmlFor="duration-mins">Duration</Label>
            <NumberInput id="duration-mins" type="number" onChange={newDuration => setDuration(newDuration)} value={duration} />
          </div>
          <div className="md:w-1/5 px-">
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
