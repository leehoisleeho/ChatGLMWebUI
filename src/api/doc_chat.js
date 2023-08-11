import axios from 'axios'

function doc_chat(data) {
  return axios({
    method: 'POST',
    url: 'http://localhost:4000/local_doc_qa/local_doc_chat',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export default doc_chat