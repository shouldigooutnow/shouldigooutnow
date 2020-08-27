import React from 'react'

import { Activity } from '../activity'

import * as Model from '../../model'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [
        {
          durationMins: 10,
          activity: 'indoors',
          numberOfPeoplePresent: 5
        }
      ],
      probs: [],
      highLevelProbs: {}
    }
  }

  componentDidMount = () => {
    this.calcProbs()
  }

  calcProbs = () => {
    const activitesWithProbs = Model.calculateCovidProbs(this.state.activities)
    const highLevelProbs = Model.calculateHighLevelProbs(activitesWithProbs)
    this.setState({ probs: activitesWithProbs, highLevelProbs: highLevelProbs })
  }

  render() {
    return (
      <div>
        <h1>Should I go out now?!!</h1>
        <div>You have {this.state.activities.length} activities</div>
        <div>Your total chance of meeting your maker today is {this.state.highLevelProbs.probContractingCovid}</div>
        <div>
          {this.state.activities.map(activity => (
            <Activity {...activity} />
          ))}
        </div>
      </div>
    )
  }
}
