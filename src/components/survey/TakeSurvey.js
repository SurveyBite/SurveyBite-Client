import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
    // const id = this.props.match.params.id
    const id = '62701ac832095a25707f3156'
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
    const questionJSX = this.setJSX()
    const { title } = this.state
    if (title === '') {
      return 'Loading ...'
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

export default withRouter(EditQuestions)
