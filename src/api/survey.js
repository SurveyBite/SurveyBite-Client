import apiUrl from '../apiConfig'
import axios from 'axios'

export const createSurvey = (survey, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/surveys/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      survey: {
        title: survey.title,
        text: survey.text
      }
    }
  })
}

