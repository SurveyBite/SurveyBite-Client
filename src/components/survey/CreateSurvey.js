import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createSurvey } from '../../api/survey'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateSurvey extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      id: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateSurvey = (event) => {
    event.preventDefault()

    const { msgAlert, user, history } = this.props

    createSurvey(this.state, user)
      .then((res) => this.setState({ id: res.data.survey._id }))
      .then(() =>
        msgAlert({
          heading: 'Create Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      .then(() => history.push('/surveys/' + this.state.id))
      .catch((error) => {
        // this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, text } = this.state

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create Survey</h3>
          <Form onSubmit={this.onCreateSurvey}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type='title'
                name='title'
                value={title}
                placeholder='Enter title'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='text'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name='text'
                value={text}
                type='text'
                placeholder='Enter description'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateSurvey)
