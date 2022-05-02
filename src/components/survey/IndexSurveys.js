import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexSurveys } from '../../api/survey'

class IndexSurveys extends Component {
  constructor (props) {
    super(props)
    // console.log(props)

    this.state = {
      surveys: []
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexSurveys(user)
      .then((res) => this.setState({ surveys: res.data.surveys }))
      .then(() =>
        msgAlert({
          heading: 'Index Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      // .then(() => history.push('/'))
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Surveys</h3>
          {this.state.surveys.map(survey => {
            // add filter to show only surveys by owner
            return <li id={survey._id} key={survey._id}><Link to={'/surveys/' + survey._id}>{survey.title}</Link></li>
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(IndexSurveys)
