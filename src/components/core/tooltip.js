import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Question } from '@/components/icons'

export const ToolTip = ({ id, text }) => (
  <>
    <Question className="inline ml-2" data-tip data-for={`tooltip-${id}`} />
    <ReactTooltip id={`tooltip-${id}`} place="right" effect="solid" backgroundColor="#38b2ac">
      {text}
    </ReactTooltip>
  </>
)

export const HtmlToolTip = ({ id, html }) => (
  <>
    <Question className="inline ml-2" data-tip={html} data-for={`tooltip-${id}`} />
    <ReactTooltip id={`tooltip-${id}`} place="right" effect="solid" backgroundColor="#38b2ac" html />
  </>
)
