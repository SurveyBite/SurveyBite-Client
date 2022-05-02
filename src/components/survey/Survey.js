import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showSurvey, deleteSurvey } from '../../api/survey'

class Survey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      survey: {}
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showSurvey(user, id)

      .then((response) => this.setState({ survey: response.data.survey }))
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

  render () {
    if (this.state.survey.text === '') {
      return (
        <>
          <h4>Survey</h4>
          <h5>{this.state.survey.title}</h5>
          <button onClick={this.deleteClick}>Delete Survey</button>
          <button onClick={this.updateClick}>Update Survey</button>
        </>
      )
    }
    return (
      <>
        <h4>Survey</h4>
        <h5>{this.state.survey.title}</h5>
        <p>Description: {this.state.survey.text}</p>
        <button onClick={this.deleteClick}>Delete Survey</button>
        <button onClick={this.updateClick}>Update Survey</button>
      </>
    )
  }
}

export default withRouter(Survey)
