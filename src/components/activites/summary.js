import React from 'react'
import { Probability } from '@/components/core/probability'

export const Summary = props => {
  return (
    <>
      <p className="md:text-1xl text-xl mt-6 mb-4">Total Risk:</p>
      <div className="flex flex-wrap items-center mt-8 mb-4 md:mt-0">
        <Probability className="md:text-1xl text-xl" probability={props.highLevelProbs.probSomeonePresentHasCovid} />
        <p className="md:text-1xl text-xl">chance someone present has Covid</p>
      </div>
      <div className="flex flex-wrap items-center mt-8 mb-4 md:mt-0">
        <Probability className="md:text-1xl text-xl bg-teal-500" probability={props.highLevelProbs.probContractingCovid} />
        <p className="md:text-1xl text-xl">chance contracting Covid</p>
      </div>
    </>
  )
}