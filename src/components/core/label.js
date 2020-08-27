import React from 'react'
import classNames from 'classnames'

export const Label = props => <label {...props} className={classNames('block text-gray-700 text-sm font-bold mb-2', props.className)} />
