import React from 'react'
import classNames from 'classnames'

/* eslint-disable-next-line jsx-a11y/anchor-has-content */
export const Link = props => <a {...props} className={classNames('text-teal-600', props.className)} />
