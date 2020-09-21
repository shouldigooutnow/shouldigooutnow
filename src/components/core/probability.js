import React from 'react'
import { classNames } from '@/common/classnames'
import { formatProbability } from '@/common/format'

export const Probability = props => (
  <span
    className={classNames('inline-block bg-teal-400 rounded-full px-3 py-1 text-lg font-semibold text-white mr-2 my-2', props.className)}
  >
    {formatProbability(props.probability)}
  </span>
)
