import React from 'react'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import { QuestionMark } from '@/components/icons'

import { useWindowDimensions } from '@/common/windowDimensions'

export const ToolTip = ({ id, message, className }) => {
  const { width } = useWindowDimensions()
  return (
    <>
      <QuestionMark className={classNames('inline ml-2', className)} data-tip data-for={`tooltip-${id}`} />
      <ReactTooltip
        id={`tooltip-${id}`}
        place={width < 480 ? 'top' : 'right'}
        effect="solid"
        className="text-white text-sm mx-4 sm:max-w-sm lg:max-w-lg"
        backgroundColor="#38b2ac"
        overridePosition={({ left, top }) => ({
          left: width < 480 ? 20 : left,
          top: top
        })}
        clickable
      >
        {message}
      </ReactTooltip>
    </>
  )
}
