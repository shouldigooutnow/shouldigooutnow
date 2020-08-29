import React from 'react'

import { Label } from '@/components/core/label'
import { PercentageNumberInput } from '@/components/core/input'
import { Select } from '@/components/core/select'

import { activities } from '../../model/activities'
import { ExternalLink } from '../icons'

export const Assumptions = ({
  covidPresets,
  selectedCovidProbs,
  transmissionPresets,
  selectedTransmissionProbs,
  onSelectedCovidProbsUpdate,
  onSelectedTransmissionProbsUpdate
}) => {
  return (
    <div className="bg-white mb-8 leading-normal border-2 p-2">
      <div htmlfor="covid-probability-model-container" className="flex flex-col">
        <div className="flex flex-col">
          <Label htmlFor="covid-probability-model">Covid Probability Model</Label>
          <Select
            value={selectedCovidProbs.shortName}
            id="selectedCovidProbs"
            onChange={event => onSelectedCovidProbsUpdate(covidPresets.find(c => c.shortName === event.target.value))}
          >
            {covidPresets.map(covidPreset => {
              return (
                <option key={covidPreset.shortName} value={covidPreset.shortName}>
                  {covidPreset.shortName}
                </option>
              )
            })}
          </Select>
        </div>
        <div className="mx-3 flex flex-row flex-grow justify-center">
          <div className="flex flex-col flex-grow">
            <Label htmlFor="description">Description</Label>
            <div className="flex flex-row">
              <p className="text-xs ml-4 mr-4">{selectedCovidProbs.description}</p>
              <ExternalLink onClick={event => (window.location.href = selectedCovidProbs.source)} />
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <Label htmlFor="covid-probability">Covid Probability</Label>
            <PercentageNumberInput
              id="covid-probability"
              onChange={newCovidProbability => onSelectedCovidProbsUpdate({ ...selectedCovidProbs, probability: newCovidProbability })}
              value={selectedCovidProbs.probability}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 my-8"></div>

      <div htmlfor="covid-tranmission-model-container" className="flex flex-col">
        <div className="flex flex-col">
          <Label htmlFor="covid-probability-model">Transmission Probability Model</Label>
          <Select
            value={selectedTransmissionProbs.shortName}
            id="selectedTransmissionProbs"
            onChange={event => onSelectedTransmissionProbsUpdate(transmissionPresets.find(t => t.shortName === event.target.value))}
          >
            {transmissionPresets.map(transmissionPreset => {
              return (
                <option key={transmissionPreset.shortName} value={transmissionPreset.shortName}>
                  {transmissionPreset.shortName}
                </option>
              )
            })}
          </Select>
        </div>
        <div className="mx-3 flex flex-row flex-grow flex-wrap justify-center">
          {activities.map(a => (
            <div className="px-3 p-4 w-1/2 ">
              <Label htmlFor="transmission-probability">{a.name}</Label>
              <PercentageNumberInput
                id="transmission-probability"
                onChange={newTransmissionProb => {
                  let newProbs = { ...selectedTransmissionProbs.probabilities }
                  newProbs[a.key] = newTransmissionProb
                  onSelectedTransmissionProbsUpdate({ ...selectedTransmissionProbs, probabilities: newProbs })
                }}
                value={selectedTransmissionProbs.probabilities[a.key]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
