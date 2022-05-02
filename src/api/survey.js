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

export const indexSurveys = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/surveys/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showSurvey = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/surveys/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteSurvey = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/surveys/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
