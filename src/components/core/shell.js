import React from 'react'
import { Github, FaceMask } from '@/components/icons'
import { Link } from '@/components/core/link'

export const Shell = props => (
  <div className="min-h-full flex flex-col">
    <div className="container mx-auto pt-6 pb-12 flex-1">{props.children}</div>
    <div className="w-full bg-teal-500">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4 flex-1">
        <p className="mr-2 text-white">
          Made with <FaceMask className="inline mb-1" stringColor="white" maskColor="white" maskTopColor="grey" /> by{' '}
          <Link className="text-white underline" href="mailto:hello@shouldigotoutnow.com">
            Richard
          </Link>{' '}
          and{' '}
          <Link className="text-white underline" href="mailto:hello@shouldigotoutnow.com">
            Irfan
          </Link>
        </p>
        <a href="https://github.com/shouldigooutnow/shouldigooutnow/">
          <div className="flex flex-row items-center">
            <p className="mr-2 text-white underline">Contribute</p>
            <Github className="inline text-white" />
          </div>
        </a>
      </div>
    </div>
  </div>
)
