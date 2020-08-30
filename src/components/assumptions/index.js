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
    <div className="mb-8 leading-normal">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-md mb-1 font-semibold">Probability someone has Covid-19</p>
          <Label>Preset Source</Label>
          <Select
            className="md:w-1/2"
            value={selectedCovidProbs ? selectedCovidProbs.shortName : ''}
            onChange={event => onSelectedCovidProbsUpdate(covidPresets.find(c => c.shortName === event.target.value))}
          >
            <option disabled value="" key="">
              -- select an option --
            </option>
            {covidPresets.map(covidPreset => {
              return (
                <option key={covidPreset.shortName} value={covidPreset.shortName}>
                  {covidPreset.shortName}
                </option>
              )
            })}
          </Select>
        </div>
        {selectedCovidProbs ? (
          <div className="flex flex-col">
            <div className="flex flex-row items-center mb-3">
              <p className="text-xs mr-2 ">{selectedCovidProbs.description}</p>
              <a href={selectedCovidProbs.source} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="text-teal-600" />
              </a>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="covid-probability">Probability</Label>
              <PercentageNumberInput
                id="covid-probability"
                step="0.01"
                onChange={newCovidProbability => onSelectedCovidProbsUpdate({ ...selectedCovidProbs, probability: newCovidProbability })}
                value={selectedCovidProbs.probability}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-gray-200 p-4">
            <p className="text-sm">Select an option to see values</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-400 mt-8 mb-6"></div>

      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-md mb-1 font-semibold">Probability of transmitting Covid-19 in an hour</p>
          <Label htmlFor="covid-probability-model">Preset</Label>
          <Select
            value={selectedTransmissionProbs ? selectedTransmissionProbs.shortName : ''}
            id="selectedTransmissionProbs"
            className="sm:w-40"
            onChange={event => onSelectedTransmissionProbsUpdate(transmissionPresets.find(t => t.shortName === event.target.value))}
          >
            <option disabled value="" key="">
              -- select an option --
            </option>
            {transmissionPresets.map(transmissionPreset => {
              return (
                <option key={transmissionPreset.shortName} value={transmissionPreset.shortName}>
                  {transmissionPreset.shortName}
                </option>
              )
            })}
          </Select>
        </div>
        {selectedTransmissionProbs ? (
          <div className="flex flex-row flex-wrap">
            {activities.map(a => (
              <div key={a.name} className="py-4 w-full sm:w-1/2">
                <Label htmlFor="transmission-probability">{a.name}</Label>
                <PercentageNumberInput
                  id="transmission-probability"
                  className="w-20"
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
        ) : (
          <div className="flex flex-col bg-gray-200 p-4">
            <p className="text-sm">Select an option to see values</p>
          </div>
        )}
      </div>
    </div>
  )
}
