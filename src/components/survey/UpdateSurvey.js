import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateSurvey, showSurvey } from '../../api/survey'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateSurvey extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showSurvey(user, id)
      .then((response) => this.setState({ title: response.data.survey.title, text: response.data.survey.text }))
      .catch(console.error)
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onUpdateSurvey = (event) => {
    event.preventDefault()
    const id = this.props.match.params.id
    const { user, history } = this.props
    updateSurvey(this.state, user, id)
      .then(() => history.push('/surveys/' + this.props.match.params.id))
  }

  render () {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>Update Survey</h3>
            <Form onSubmit={this.onUpdateSurvey}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type='title'
                  name='title'
                  value={this.state.title}
                  placeholder='Enter title'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId='text'>
                <Form.Label>Text</Form.Label>
                <Form.Control
                  name='text'
                  value={this.state.text}
                  type='text'
                  placeholder='text'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>Submit</Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(UpdateSurvey)