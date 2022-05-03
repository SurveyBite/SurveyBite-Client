import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createQuestion, deleteQuestion, updateQuestion } from '../../api/question'
import { showSurvey } from '../../api/survey'

class EditQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      text: '',
      sId: '',
      amt: 0,
      questions: []
    }
  }

  componentDidMount () {
    this.onShowSurvey()
  }

  onShowSurvey = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    showSurvey(user, id)
      .then((response) => this.setState({ sId: response.data.survey._id, title: response.data.survey.title, text: response.data.survey.text, questions: response.data.survey.questions }))
      .then(() => this.setState({ amt: this.state.questions.length }))
      .then(() => {
        for (let i = 1; i < this.state.amt + 1; i++) {
          let value = this.state.questions[i - 1].title
          let qId = this.state.questions[i - 1]._id
          if (qId === undefined) qId = ''
          if (value === undefined) value = ''
          this.setState({ ['question' + i]: value, ['question' + i + 'key']: qId })
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
    // console.log('on Submit running??')
    for (let i = 1; i < this.state.amt + 1; i++) {
      const { user } = this.props
      const title = this.state['question' + i]
      const qId = this.state['question' + i + 'key']
      // console.log(this.state.sId)
      if (qId === undefined) {
        createQuestion(title, 'short answer', this.state.sId, user)
          .then((res) => console.log(res))
          .then(() => this.onShowSurvey())
          .then(() => this.setJSX())
          .catch(() => console.log('fail'))
      } else {
        updateQuestion(title, 'short answer', this.state.sId, qId, user)
          .then((res) => console.log(res))
          .then(() => this.onShowSurvey())
          .then(() => this.setJSX())
          .catch(() => console.error)
      }
    }
  }

  deleteDynamic = (event) => {
    // console.log(event.target)
    const qId = event.target.getAttribute('data-id')
    const { sId } = this.state
    const { user } = this.props
    deleteQuestion(sId, qId, user)
      .then(() => this.onShowSurvey())
      .then(() => this.setJSX())
      .catch(() => console.error)
  }

  addQuestion = () => {
    this.setState({ amt: this.state.amt + 1 })
    this.setJSX()
  }

  setJSX = () => {
    const questionJSX = []
    for (let i = 1; i < this.state.amt + 1; i++) {
      questionJSX.push(
        <>
          <Form.Group controlId={this.state['question' + i + 'key']}>
            <Form.Label>Question</Form.Label>
            <Form.Control
              required
              maxLength='300'
              type='question'
              value={this.state['question' + i]}
              name={'question' + i}
              placeholder='Enter question'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId={'answer' + i}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled
              name='text'
              type='text'
              placeholder='Short Answer Question'
            />
          </Form.Group>
          <button type='button' onClick={this.deleteDynamic} data-id={this.state['question' + i + 'key']}>Delete</button>
        </>
      )
    }
    return questionJSX
  }

  render () {
    const questionJSX = this.setJSX()
    const { title } = this.state
    if (title === '') {
      return 'Loading ...'
    }
    return (
      <>
        <h4>{this.state.title}</h4>
        <p>Description: {this.state.text}</p>
        <Button variant='primary' onClick={this.addQuestion}>Add Question</Button>
        <Form onSubmit={this.onSubmit}>
          {questionJSX}
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(EditQuestions)
