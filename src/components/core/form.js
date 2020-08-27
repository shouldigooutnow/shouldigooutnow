import React from 'react'

export const Form = props => (
  <form
    {...props}
    onSubmit={e => {
      e.preventDefault()
      if (props.onSubmit) {
        props.onSubmit(e)
      }
    }}
  />
)
