import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexSurveys } from '../../api/survey'

class IndexSurveys extends Component {
  constructor (props) {
    super(props)
    this.state = {
      surveys: null,
      show: false,
      owned: false
    }
  }

  viewAllSurveys = () => {
    const { msgAlert, user } = this.props
    indexSurveys(user)
      .then((res) => res.data.surveys.filter((survey) => survey.owner !== this.props.user._id))
      .then((res) => this.setState({ surveys: res, show: true, owned: false }))
      .then(() =>
        msgAlert({
          heading: 'Index Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  viewYourSurveys = () => {
    const { msgAlert, user } = this.props
    indexSurveys(user)
      .then((res) => res.data.surveys.filter((survey) => survey.owner === this.props.user._id))
      .then((res) => this.setState({ surveys: res, show: true, owned: true }))
      .then(() =>
        msgAlert({
          heading: 'Index Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  goBack = () => {
    this.setState({ show: false })
  }

  render () {
    const { surveys, show, owned } = this.state
    let titleJSX
    if (owned) {
      titleJSX = <h3>Your Surveys</h3>
    } else {
      titleJSX = <h3>All Surveys</h3>
    }
    if (show) {
      if (surveys === null) {
        return 'Loading...'
      } else {
        return (
          <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              {titleJSX}
              {surveys.map(survey => {
                // add filter to show only surveys by owner
                return <li id={survey._id} key={survey._id}><Link to={'/surveys/' + survey._id}>{survey.title}</Link></li>
              })}
              <button onClick={this.goBack}>Back</button>
            </div>
          </div>
        )
      }
    }

    return (
      <>
        <button onClick={this.viewAllSurveys}>View All Surveys</button> <br/>
        <button onClick={this.viewYourSurveys}>View Your Surveys</button>
      </>
    )
  }
}

export default withRouter(IndexSurveys)
