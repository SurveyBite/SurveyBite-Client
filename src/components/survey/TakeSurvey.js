import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { showSurvey } from '../../api/survey'
import { createResponse } from '../../api/response'

class TakeSurvey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      text: '',
      sId: '',
      amt: 0,
      questions: [],
      responses: [],
      taken: false,
      completed: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    // const id = '62701ac832095a25707f3156'
    const { user } = this.props
    showSurvey(user, id)
      .then((res) => this.setState({ sId: res.data.survey._id, title: res.data.survey.title, text: res.data.survey.text, questions: res.data.survey.questions, responses: res.data.survey.responses }))
      .then(() => this.setState({ amt: this.state.questions.length }))
      .then(() => {
        const { responses } = this.state
        for (let i = 0; i < responses.length; i++) {
          if (responses[i].owner === user._id) {
            this.setState({ taken: true })
            return
          }
        }
        for (let i = 1; i < this.state.amt + 1; i++) {
          let value = this.state.questions[i - 1].title
          let qId = this.state.questions[i - 1]._id
          if (qId === undefined) qId = ''
          if (value === undefined) value = ''
          this.setState({ ['question' + i]: value, ['question' + i + 'key']: qId, ['answer' + i]: '' })
        }
      })
      .catch(console.error)
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onSubmit = (event) => {
    event.preventDefault()
    const { user } = this.props
    for (let i = 1; i < this.state.amt + 1; i++) {
      const content = this.state['answer' + i]
      const question = this.state['question' + i]
      createResponse(content, question, this.state.sId, user)
        .then((res) => console.log(res))
        .then(() => this.setState({ completed: true }))
        .catch(() => console.log('fail'))
    }
  }

  allSurveys = () => {
    const { history } = this.props
    history.push('/surveys/')
  }

  setJSX = () => {
    const questionJSX = []
    for (let i = 1; i < this.state.amt + 1; i++) {
      questionJSX.push(
        <>
          <Form.Group controlId={this.state['question' + i + 'key']}>
            <Form.Label>{this.state['question' + i]}</Form.Label>
            <Form.Control
              required
              maxLength='300'
              type='question'
              value={this.state['answer' + i]}
              name={'answer' + i}
              placeholder='Short Answer'
              onChange={this.handleChange}
            />
          </Form.Group>
        </>
      )
    }
    return questionJSX
  }

  render () {
    console.log(this.state)
    const questionJSX = this.setJSX()
    const { title, questions, completed, taken } = this.state
    if (title === '') {
      return 'Loading ...'
    }
    if (questions.length === 0) {
      return (
        <>
          <p>This survey has no questions. Please return to all surveys</p>
          <button onClick={this.allSurveys}>Return to Surveys</button>
        </>
      )
    }
    if (taken) {
      return (
        <>
          <p>
            It seems you&apos;ve already taken this survey.
            <br/>
            Please return to all surveys.
          </p>
          <button onClick={this.allSurveys}>Return to Surveys</button>
        </>
      )
    }
    if (completed) {
      return (
        <>
          <p>Thank you for taking this survey!</p>
          <button onClick={this.allSurveys}>Return to Surveys</button>
        </>
      )
    }
    return (
      <>
        <h4>{this.state.title}</h4>
        <p>Description: {this.state.text}</p>
        <Form onSubmit={this.onSubmit}>
          {questionJSX}
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(TakeSurvey)
