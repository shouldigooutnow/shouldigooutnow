import React from 'react'
import ReactTooltip from 'react-tooltip'
import { QuestionMark } from '@/components/icons'

export const ToolTip = ({ id, message }) => (
  <>
    <QuestionMark className="inline ml-2" data-tip data-for={`tooltip-${id}`} />
    <ReactTooltip
      id={`tooltip-${id}`}
      place="right"
      effect="solid"
      className="max-w-lg text-white text-sm "
      backgroundColor="#38b2ac"
      clickable
    >
      {message}
    </ReactTooltip>
  </>
)
