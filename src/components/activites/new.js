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
  durationMins: 60,
  numberOfPeoplePresent: 5
}

export const NewActivity = props => {
  const [activity, setActivity] = useState(defaultActivity.activity)
  const [durationMins, setDurationMins] = useState(defaultActivity.durationMins)
  const [numberOfPeoplePresent, setNumberOfPeoplePresent] = useState(defaultActivity.numberOfPeoplePresent)

  return (
    <Form
      className="w-full max-w-3xl"
      onSubmit={() => {
        props.onCreate({ activity, activityName: _.find(activities, { key: activity }).name, durationMins, numberOfPeoplePresent })
        setActivity(defaultActivity.activity)
        setDurationMins(defaultActivity.durationMins)
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
      <div className="mb-4 max-w-xs">
        <Label htmlFor="duration-mins">Duration (mins)</Label>
        <NumberInput id="duration-mins" type="number" onChange={newDurationMins => setDurationMins(newDurationMins)} value={durationMins} />
      </div>
      <InputButton value="Add Activity" />
    </Form>
  )
}
