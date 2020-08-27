import React from 'react'
import classNames from 'classnames'

const buttonClassNames =
  'shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'

export const Button = props => <button {...props} className={classNames(buttonClassNames, props.className)} />

export const InputButton = props => (
  <input {...props} type="submit" className={classNames(buttonClassNames, 'cursor-pointer', props.className)} />
)
