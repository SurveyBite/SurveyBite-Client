import apiUrl from '../apiConfig'
import axios from 'axios'

export const createQuestion = (title, option, surveyId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/questions/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      question: {
        title: title,
        content: option,
        surveyId: surveyId,
        owner: user._id
      }
    }
  })
}

export const updateQuestion = (title, option, surveyId, qId, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/questions/' + qId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      question: {
        title: title,
        content: option,
        surveyId: surveyId,
        owner: user._id
      }
    }
  })
}
