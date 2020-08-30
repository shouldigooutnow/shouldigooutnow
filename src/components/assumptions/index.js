import React from 'react'
import _ from 'lodash'
import { Label } from '@/components/core/label'
import { PercentageNumberInput } from '@/components/core/input'
import { Select } from '@/components/core/select'
import { Exclaimation } from '@/components/icons'

import { activities } from '../../model/activities'
import { ExternalLink } from '../icons'

const CovidProb = ({ covidPresets, selectedCovidProb, onSelectedCovidProbUpdate }) => {
  const allCovidPresets = [
    ...covidPresets,
    {
      shortName: 'Custom',
      probability: null
    }
  ]
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-lg mb-1">Estimated probability someone has Covid-19</p>
        <Select
          className="md:w-1/2 mt-2"
          value={(selectedCovidProb && selectedCovidProb.shortName) || ''}
          onChange={event => onSelectedCovidProbUpdate(allCovidPresets.find(c => c.shortName === event.target.value))}
        >
          <option value="" disabled>
            Select a source
          </option>
          {allCovidPresets.map(covidPreset => {
            return (
              <option key={covidPreset.shortName} value={covidPreset.shortName}>
                {covidPreset.shortName}
              </option>
            )
          })}
        </Select>
      </div>
      {selectedCovidProb && (
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-3">
            {selectedCovidProb.description && <p className="text-xs mr-2 ">{selectedCovidProb.description}</p>}
            {selectedCovidProb.source && (
              <a href={selectedCovidProb.source} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="text-teal-600" />
              </a>
            )}
          </div>
          <div className="flex flex-col">
            <PercentageNumberInput
              id="covid-probability"
              step="0.01"
              onChange={newCovidProbability => onSelectedCovidProbUpdate({ ...selectedCovidProb, probability: newCovidProbability })}
              value={selectedCovidProb.probability}
            />
          </div>
        </div>
      )}
    </div>
  )
}
const TranmissionProbs = ({ transmissionPresets, selectedTransmissionProbs, onSelectedTransmissionProbsUpdate }) => {
  const allTransmissionPresets = [
    ...transmissionPresets,
    {
      shortName: 'Custom',
      probabilities: {
        indoors: null,
        probabilities: null,
        outdoors: null,
        outdoors2MeterDistancing: null
      }
    }
  ]
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-lg mb-1">Estimated probability of transmitting Covid-19 in an hour</p>
        <p className="text-sm">
          <Exclaimation className="inline text-yellow-600 my-4" /> These presets are not from scientific data
        </p>
        <Select
          value={(selectedTransmissionProbs && selectedTransmissionProbs.shortName) || ''}
          id="selectedTransmissionProbs"
          className="sm:w-40 mt-2"
          onChange={event => onSelectedTransmissionProbsUpdate(allTransmissionPresets.find(t => t.shortName === event.target.value))}
        >
          <option value="" disabled>
            Select a preset
          </option>
          {allTransmissionPresets.map(transmissionPreset => {
            return (
              <option key={transmissionPreset.shortName} value={transmissionPreset.shortName}>
                {transmissionPreset.shortName}
              </option>
            )
          })}
        </Select>
      </div>
      {selectedTransmissionProbs && (
        <div className="flex flex-row flex-wrap">
          {activities.map(a => (
            <div key={`activity-${a.key}`} className="py-4 w-full sm:w-1/2">
              <Label htmlFor="transmission-probability">{a.name}</Label>
              <PercentageNumberInput
                id="transmission-probability"
                className="w-20"
                onChange={newTransmissionProb => {
                  let newProbs = { ...selectedTransmissionProbs.probabilities }
                  newProbs[a.key] = newTransmissionProb
                  onSelectedTransmissionProbsUpdate({ ...selectedTransmissionProbs, probabilities: newProbs })
                }}
                value={_.get(selectedTransmissionProbs, ['probabilities', a.key])}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Assumptions = ({
  covidPresets,
  selectedCovidProb,
  transmissionPresets,
  selectedTransmissionProbs,
  onSelectedCovidProbUpdate,
  onSelectedTransmissionProbsUpdate
}) => {
  return (
    <div className={'leading-normal'}>
      <CovidProb covidPresets={covidPresets} selectedCovidProb={selectedCovidProb} onSelectedCovidProbUpdate={onSelectedCovidProbUpdate} />
      {selectedCovidProb && (
        <>
          <div className="border-t border-gray-400 mt-8 mb-6"></div>
          <TranmissionProbs
            transmissionPresets={transmissionPresets}
            selectedTransmissionProbs={selectedTransmissionProbs}
            onSelectedTransmissionProbsUpdate={onSelectedTransmissionProbsUpdate}
          />
        </>
      )}
    </div>
  )
}
