import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showSurvey } from '../../api/survey'
import Button from 'react-bootstrap/Button'

class Responses extends Component {
  constructor (props) {
    super(props)

    this.state = {
      survey: null,
      responses: [],
      tracker: 0
    }
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    // const id = '62701ac832095a25707f3156'
    // const id = '62701acc32095a25707f3158'
    const { user } = this.props
    showSurvey(user, id)
      .then((res) => this.setState({ survey: res.data.survey, responses: res.data.survey.responses }))
      .then(() => {
        const { responses } = this.state
        const responseOwnerArray = []
        let tracker = 1
        for (let i = 0; i < responses.length; i++) {
          const responseOwner = responses[i].owner
          if (!responseOwnerArray.includes(responseOwner)) {
            this.setState({ ['response' + tracker]: [] })
            this.setState({ ['response' + tracker]: responses.filter(response => response.owner === responseOwner) })
            tracker++
            responseOwnerArray.push(responseOwner)
            this.setState({ tracker: tracker })
          }
        }
      })
      .catch(console.error)
  }

  setJSX = () => {
    const responsesJSX = []
    const { tracker } = this.state
    for (let i = 1; i < tracker; i++) {
      responsesJSX.push(
        <>
          <h4>Response {i}</h4>
          <ul>
            {this.state['response' + i].map(response => {
              return <li key={response._id}>{response.question}: {response.content}</li>
            })}
          </ul>
        </>
      )
    }
    return responsesJSX
  }

  goBack = () => {
    const { history } = this.props
    history.push('/surveys/' + this.props.match.params.id)
  }

  render () {
    const { survey } = this.state
    if (survey === null) {
      return 'loading...'
    }
    if (this.state['response' + 1] === undefined) {
      return (
        <>
          <p>No responses</p>
          <Button variant="primary" onClick={this.goBack}>Back</Button>
        </>
      )
    }
    const responsesJSX = this.setJSX()
    return (
      <>
        {responsesJSX}
        <Button variant="primary" onClick={this.goBack}>Back</Button>
      </>
    )
  }
}

export default withRouter(Responses)
