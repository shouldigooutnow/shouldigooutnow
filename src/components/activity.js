import React from 'react'

export const Activity = props => {
  return (
    <div>
      <p>Type: {props.activity}</p>
      <p>Duration: {props.durationMins}</p>
      <p>People: {props.numberOfPeoplePresent}</p>
    </div>
  )
}
