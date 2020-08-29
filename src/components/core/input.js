import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export const Input = props => (
  <input
    {...props}
    className={classNames(
      'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
      props.className
    )}
  />
)

export const NumberInput = props => (
  <Input
    {...props}
    value={props.value || ''}
    onBlur={event => {
      if (event.target.value === '') {
        props.onChange(1)
      }
    }}
    onChange={event => {
      if (event.target.value === '') {
        props.onChange(null)
        return
      }
      const number = parseInt(event.target.value)
      if (_.isNaN(number)) {
        props.onChange(null)
      } else {
        props.onChange(number)
      }
    }}
  />
)
