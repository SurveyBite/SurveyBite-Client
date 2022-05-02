import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSurvey, deleteSurvey } from '../../api/survey'

class Survey extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      survey: {},
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    console.log(id)
    showSurvey(user, id)

      .then((response) => this.setState({ survey: response.data.survey }))
      .catch(console.error)
  }

  deleteClick = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    deleteSurvey(user, id)
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to='/surveys' />
    }
    return (
      <>
        <h4>Survey</h4>
        <h5>{this.state.survey.title}</h5>
        <p>Description: {this.state.survey.text}</p>
        <button onClick={this.deleteClick}>Delete Survey</button>
      </>
    )
  }
}

export default withRouter(Survey)
