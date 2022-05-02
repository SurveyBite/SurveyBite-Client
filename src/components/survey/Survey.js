import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showSurvey } from '../../api/survey'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Survey extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      survey: {}
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

    axios({
      method: 'DELETE',
      url: apiUrl + '/books/' + id
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    // if (this.state.deleted) {
    //   return <Redirect to='/books' />
    // }
    return (
      <>
        <h4>Survey</h4>
        <h5>{this.state.survey.title}</h5>
        <p>Description: {this.state.survey.text}</p>
        {/* <button onClick={this.deleteClick}>Delete Book</button> */}
      </>
    )
  }
}

export default withRouter(Survey)
