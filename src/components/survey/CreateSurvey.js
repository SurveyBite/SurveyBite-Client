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
      text: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateSurvey = (event) => {
    event.preventDefault()

    const { msgAlert, user } = this.props

    createSurvey(this.state, user)
      // .then(() => signIn(this.state))
      // .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: 'Create Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      // .then(() => history.push('/'))
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
              <Form.Label>Text</Form.Label>
              <Form.Control
                required
                name='text'
                value={text}
                type='text'
                placeholder='text'
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
