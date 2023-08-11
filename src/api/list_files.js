import axios from 'axios'

function list_files(data) {
  return axios({
    method: 'GET',
    url: 'http://localhost:4000/local_doc_qa/list_files?knowledge_base_id='+ data,
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export default list_files