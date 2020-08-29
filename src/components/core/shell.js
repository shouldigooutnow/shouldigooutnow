import React from 'react'
import { Github, Heart } from '@/components/icons'

export const Shell = props => (
  <div className="min-h-full flex flex-col">
    <div className="container mx-auto py-6 flex-1">{props.children}</div>
    <div className="w-full bg-teal-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4 flex-1">
        <p>
          Made with <Heart className="inline mb-1 text-red-500" /> by Richard and Irfan{' '}
        </p>
        <a href="https://github.com/shouldigooutnow/shouldigooutnow/">
          <div className="flex flex-row items-center">
            <p className="mr-2">See the code</p>
            <Github className="inline" />
          </div>
        </a>
      </div>
    </div>
  </div>
)
