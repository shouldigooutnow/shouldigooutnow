import React from 'react'
import ReactMarkdown from 'react-markdown'
import raw from 'raw.macro'
import { Shell } from '@/components/core/shell'

const markdown = raw('./content.md')

export const Methodology = () => (
  <Shell>
    <ReactMarkdown className="markdown" source={markdown} />
  </Shell>
)
