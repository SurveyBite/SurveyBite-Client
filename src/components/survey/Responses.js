import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showSurvey } from '../../api/survey'

class Responses extends Component {
  constructor (props) {
    super(props)

    this.state = {
      survey: null,
      responses: []
    }
  }

  componentDidMount = () => {
    // const id = this.props.match.params.id
    const id = '62701ac832095a25707f3156'
    // const id = '62701acc32095a25707f3158'
    const { user } = this.props
    showSurvey(user, id)
      .then((res) => this.setState({ survey: res.data.survey, responses: res.data.survey.responses }))
      .then(() => {
        // console.log(this.state.survey.owner)
        // console.log(user._id)
        // const { responses } = this.state
        // for (let t = 1; responses.length !== 0; t++) {
        //   // console.log(responses[0])
        //   const o = responses[0].owner
        //     this.setState({ ['response' + t]: [] })
        //     this.state['response' + t].push(responses[0])
        //     responses.shift()
        //   for (let i = 0; i < responses.length; i++) {
        //     if (o === responses[i].owner) {
        //       this.state['response' + t].push(responses[i])
        //     }
        //   }
        // }

        const { responses } = this.state
        for (let i = 0; i < responses.length; i++) {
          const o = responses[i].owner
          let t = 1
          const r = []
          console.log(i)
          console.log(r.includes(o))
          console.log(r)
          console.log(o)
          if (!r.includes(o)) {
            this.setState({ ['response' + t]: [] })
            this.setState({ ['response' + t]: responses.filter(response => response.owner === o) })
            t++
            r.push(o)
          }
        }
      })
      .catch(console.error)
  }

  /* while responses is not empty
  for loop to get i
    take first response owner and push to new arry state (response i)
      iterate through everything to find matching and push into new array
    repeat
  */
  render () {
    console.log(this.state)
    return (
      <>
      </>
    )
  }
}

export default withRouter(Responses)
