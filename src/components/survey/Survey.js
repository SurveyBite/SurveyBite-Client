import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSurvey, deleteSurvey } from '../../api/survey'

class Survey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      survey: null,
      takeSurvey: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showSurvey(user, id)

      .then((response) => this.setState({ survey: response.data.survey }))
      .then(() => {
        console.log(this.state.survey.owner)
        console.log(user._id)
      })
      .catch(console.error)
  }

  deleteClick = () => {
    const id = this.props.match.params.id
    const { user, history } = this.props
    deleteSurvey(user, id)
      .then(() => history.push('/surveys'))
      .catch(console.error)
  }

  updateClick = () => {
    const { history } = this.props
    history.push('/surveys/' + this.props.match.params.id + '/update')
  }

  takeSurvey = () => {
    this.setState({ takeSurvey: true })
  }

  render () {
    const { survey, takeSurvey } = this.state
    const { user } = this.props
    console.log(takeSurvey)
    if (survey === null) {
      return 'Loading...'
    }
    let questionJSX
    if (survey.questions.length === 0) {
      questionJSX = 'Need some questions'
    } else {
      questionJSX = survey.questions.map(question => (
        <li key={question._id}>{question.title}</li>
      ))
    }
    let buttonJSX
    if (survey.owner === user._id) {
      buttonJSX =
      <>
        <button onClick={this.deleteClick}>Delete Survey</button>
        <button onClick={this.updateClick}>Update Survey</button>
      </>
    } else {
      buttonJSX = <button onClick={this.takeSurvey}>Take Survey</button>
    }
    if (takeSurvey) {
      return <Redirect to={'/surveys/' + survey._id + '/take-survey'} />
    }
    if (survey.text === '') {
      return (
        <>
          <h4>Survey</h4>
          <h5>{this.state.survey.title}</h5>
          <h5>All the questions</h5>
          <ul>{questionJSX}</ul>
          {buttonJSX}
        </>
      )
    }
    return (
      <>
        <h4>Survey</h4>
        <h5>{this.state.survey.title}</h5>
        <p>Description: {this.state.survey.text}</p>
        <h5>All the questions</h5>
        <ul>{questionJSX}</ul>
        {buttonJSX}
      </>
    )
  }
}

export default withRouter(Survey)
