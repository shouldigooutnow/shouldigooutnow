import React from 'react'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import { QuestionMark } from '@/components/icons'

export const ToolTip = ({ id, message, className }) => (
  <>
    <QuestionMark className={classNames('inline ml-2', className)} data-tip data-for={`tooltip-${id}`} />
    <ReactTooltip
      id={`tooltip-${id}`}
      place="right"
      effect="solid"
      className="xs:max-w-xs sm:max-w-sm max-w-lg text-white text-sm "
      backgroundColor="#38b2ac"
      clickable
    >
      {message}
    </ReactTooltip>
  </>
)
