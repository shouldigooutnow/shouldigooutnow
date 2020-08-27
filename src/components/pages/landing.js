import React from 'react'

import { Activity } from '../activity'

import * as Model from '../../model'

export class Landing extends React.Component {
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
      <div className="container mx-auto">
        <p className="text-3xl">Should I go out now?!!</p>
        <p>You have {this.state.activities.length} activities</p>
        <p>Your total chance of meeting your maker today is {this.state.highLevelProbs.probContractingCovid}</p>
        <div>
          {this.state.activities.map(activity => (
            <Activity {...activity} />
          ))}
        </div>
      </div>
    )
  }
}
