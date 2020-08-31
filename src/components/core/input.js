import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { formatProbabilityAs1InX } from '@/common/format'
import { useWindowDimensions } from '@/common/windowDimensions'

const defaultClassNames =
  'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

export const Input = props => {
  const { isMobile } = useWindowDimensions()

  return (
    <input
      {...props}
      onKeyPress={e => {
        if (isMobile && e.key === 'Enter') {
          e.target.blur()
        }
        props.onKeyPress && props.onKeyPress(e)
      }}
      className={classNames(defaultClassNames, props.className)}
    />
  )
}

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

export const PercentageNumberInput = props => {
  const oneInX = formatProbabilityAs1InX(props.value)
  return (
    <div className="">
      <Input
        className="w-32"
        {...props}
        type="number"
        step={props.step || '1'}
        max="100"
        value={_.isNumber(props.value) ? _.round(props.value * 100, 9) : ''}
        onBlur={event => {
          if (event.target.value === '') {
            props.onChange(0)
          }
        }}
        onChange={event => {
          if (event.target.value === '' && `${props.value * 100}`.length === 1) {
            props.onChange(null)
            return
          }
          if (event.target.value === '') {
            props.onChange(props.value)
            return
          }
          const number = event.target.value
          if (_.isNaN(number)) {
            props.onChange(0)
          } else if (number > 100) {
            props.onChange(1)
          } else {
            props.onChange(number / 100)
          }
        }}
      />
      <p className="inline-block text-sm py-1 px-2">
        %{props.showOneInX && <p className="ml-4 text-xs inline">{props.showOneInX && oneInX !== '' ? `(${oneInX})` : ''}</p>}
      </p>
    </div>
  )
}
