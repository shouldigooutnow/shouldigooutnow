import React from 'react'
import { classNames } from '@/common/classnames'

export const Card = props => (
  <div {...props} className={classNames('max-w-md rounded p-4 md:p-6 border border-gray-400', props.className)} />
)
