import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amt: 0
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onSubmit = (event) => {
    event.preventDefault()
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
          <Form.Group controlId={'question' + i}>
            <Form.Label>Question</Form.Label>
            <Form.Control
              required
              type='question'
              name={'question' + i}
              placeholder='Enter question'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId={'answer' + i}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='text'
              type='text'
              value=''
              placeholder='Short Answer Question'
            />
          </Form.Group>
        </>
      )
    }
    console.log(questionJSX)
    console.log(this.state)
    return questionJSX
  }

  render () {
    const questionJSX = this.setJSX()
    return (
      <>
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
