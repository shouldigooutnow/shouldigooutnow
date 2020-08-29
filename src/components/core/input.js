import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

const defaultClassNames =
  'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
export const Input = props => <input {...props} className={classNames(defaultClassNames, props.className)} />

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

export const PercentageNumberInput = props => (
  <div className={`border-b border-teal-500 py-2 min-w-10 ${defaultClassNames} flex`}>
    <input
      className="inline-block flex-grow appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 focus:outline-none text-center"
      {...props}
      type="number"
      step="0.01"
      max="100"
      value={props.value * 100 || ''}
      onBlur={event => {
        if (event.target.value === '') {
          props.onChange(0)
        }
      }}
      onChange={event => {
        console.log(event.target)
        if (event.target.value === '') {
          props.onChange(0)
          return
        }
        const number = event.target.value
        if (_.isNaN(number)) {
          props.onChange(0)
        } else {
          props.onChange(number / 100)
        }
      }}
    />
    <p className="inline-block bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
      %
    </p>
  </div>
)
