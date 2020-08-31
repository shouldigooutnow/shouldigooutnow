import _ from 'lodash'
import humanizeDuration from 'humanize-duration'

const minsToMilliseconds = mins => mins * 60 * 1000

export const formatMins = mins => humanizeDuration(minsToMilliseconds(mins))

export const formatProbability = probability => `${_.round(probability * 100, 2)}%`

export const formatProbabilityAs1InX = probability => {
  if (!_.isNumber(probability) || probability === 0) {
    return ''
  }
  return `1 in ${Math.round(1 / probability)}`
}
