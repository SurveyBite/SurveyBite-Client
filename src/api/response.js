import apiUrl from '../apiConfig'
import axios from 'axios'

export const createResponse = (content, sId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/responses',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      response: {
        content: content,
        surveyId: sId,
        owner: user._id
      }
    }
  })
}
