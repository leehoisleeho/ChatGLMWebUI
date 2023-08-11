import axios from 'axios'

function chat(data) {
  return axios({
    method: 'post',
    url: 'http://localhost:4000/chat',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export default chat