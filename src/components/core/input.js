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

export const IntegerNumberInput = props => (
  <Input
    {...props}
    type="tel" // number was not firing event properly if a string was entered...
    value={props.value || ''}
    onBlur={event => {
      if (event.target.value === '') {
        props.onChange(1)
      }
    }}
    onChange={event => {
      console.log(event.target)
      if (event.target.value === '') {
        props.onChange(null)
        return
      }
      const rawValue = event.target.value.replace('.', '')
      const number = parseInt(rawValue)
      if (_.isNaN(number)) {
        props.onChange(null)
      } else {
        props.onChange(number)
      }
    }}
  />
)
