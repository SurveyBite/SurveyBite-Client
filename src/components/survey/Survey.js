import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSurvey, deleteSurvey } from '../../api/survey'

class Survey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      survey: {},
      deleted: false,
      update: false
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
    const { user } = this.props
    deleteSurvey(user, id)
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  updateClick = () => {
    this.setState({ update: true })
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to='/surveys' />
    }
    if (this.state.update) {
      return <Redirect to={'/surveys/' + this.props.match.params.id + '/update'} />
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
