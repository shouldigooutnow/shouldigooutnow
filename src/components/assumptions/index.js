import React from 'react'
import _ from 'lodash'

import { Label } from '@/components/core/label'
import { PercentageNumberInput } from '@/components/core/input'
import { Select } from '@/components/core/select'
import { ToolTip } from '@/components/core/tooltip'
import { Warning } from '@/components/icons'

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
        <div className="flex items-center">
          <Select
            className="md:w-1/2 mt-2 inline min-w-0"
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
          <ToolTip
            id="covid-probability-preset"
            className="mb-2"
            message="Datasets which monitor the prevalence of COVID in a community. These numbers are typical based on random population sampling."
          />
        </div>
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
          <div className="flex flex-row items-center">
            <PercentageNumberInput
              id="covid-probability"
              className="inline w-32"
              step="0.01"
              showOneInX
              onChange={newCovidProbability => onSelectedCovidProbUpdate({ ...selectedCovidProb, probability: newCovidProbability })}
              value={selectedCovidProb.probability}
            />
            <ToolTip id="covid-probability" message={`The probability that a random person in the population has Covid-19`} />
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
        <p className="text-sm my-4">
          <Warning className="inline" /> These presets are not from scientific data
        </p>
        <div className="flex items-center">
          <Select
            value={(selectedTransmissionProbs && selectedTransmissionProbs.shortName) || ''}
            id="selectedTransmissionProbs"
            className="sm:w-40 mt-2 inline"
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
          <ToolTip
            id="preset-transmission-probs"
            className="mb-2"
            message="Preset estimated transmission rates that let you pick how likely you think it is you will catch Covid-19 if you are close to someone with it for 1 hour."
          />
        </div>
      </div>
      {selectedTransmissionProbs && (
        <div className="flex flex-row flex-wrap">
          {activities.map(a => (
            <div key={`activity-${a.key}`} className="py-4 w-full sm:w-1/2">
              <Label htmlFor="transmission-probability">{a.name}</Label>
              <div className="flex items-center">
                <PercentageNumberInput
                  id="transmission-probability"
                  className="w-20 inline"
                  onChange={newTransmissionProb => {
                    let newProbs = { ...selectedTransmissionProbs.probabilities }
                    newProbs[a.key] = newTransmissionProb
                    onSelectedTransmissionProbsUpdate({ ...selectedTransmissionProbs, probabilities: newProbs })
                  }}
                  value={_.get(selectedTransmissionProbs, ['probabilities', a.key])}
                />
                <ToolTip
                  id={`transmission-probability-${a.key}`}
                  message={`The likelihood that if you're ${_.lowerFirst(
                    a.name
                  )} near someone who has Covid-19 for an hour, you will catch it.`}
                />
              </div>
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
