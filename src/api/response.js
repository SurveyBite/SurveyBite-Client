import apiUrl from '../apiConfig'
import axios from 'axios'

export const createResponse = (content, question, sId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/responses',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      response: {
        content: content,
        question: question,
        surveyId: sId,
        owner: user._id
      }
    }
  })
}
