import React from 'react'
import classNames from 'classnames'

export const Select = props => (
  <select
    {...props}
    className={classNames(
      'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 mb-4 px-3 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline',
      props.className
    )}
  />
)
