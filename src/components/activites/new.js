import React, { useState } from 'react'
import _ from 'lodash'

import { classNames } from '@/common/classnames'
import { Label } from '@/components/core/label'
import { Form } from '@/components/core/form'
import { IntegerNumberInput } from '@/components/core/input'
import { InputButton } from '@/components/core/button'
import { Select } from '@/components/core/select'
import { ToolTip } from '@/components/core/tooltip'

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
        <div className="mb-4">
          <p className="text-lg inline">Add activites</p>
          <ToolTip
            id="add-activities"
            message={
              <div className="py-3">
                <p className="mb-4">Add activities that you might undertake here. </p>
                <p className="font-bold"> Note that each activity is with a new group of random people and not the same people. </p>
                <ul class="list-disc space-y-4 ml-3 mt-4">
                  <li>
                    If an activity is longer than 2 weeks (the length of a Covid-19 infection), you need to split it into multiple 2 week
                    activities.
                  </li>
                  <li>
                    If multiple activities are with the same people, e.g. going to an office, that should be one activity with a longer
                    duration.
                  </li>
                  <li>
                    If an activity is with different people each time, e.g. riding a bus, that should be one activity for each time you do
                    the activity.
                  </li>
                </ul>
              </div>
            }
          />
        </div>
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
            <ToolTip
              id="number-of-people"
              message={
                <div className="py-3 space-y-3">
                  <p>'Number of other people nearby' is the number of people you'd be exposed to.</p>
                  <p>e.g. in a large conference hall of 1000 people, you might expect to be exposed to 100 people.</p>
                  <p>You should include people you share poor ventalation with. e.g. in the same room, or the same part of a large room.</p>
                  <p>Generally you shouldn't include people you share a household with.</p>
                </div>
              }
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
