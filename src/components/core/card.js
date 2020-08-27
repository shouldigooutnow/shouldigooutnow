import React from 'react'
import classNames from 'classnames'

export const Card = props => <div {...props} className={classNames('max-w-md rounded overflow-hidden p-6 shadow-lg', props.className)} />
