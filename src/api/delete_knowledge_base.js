import axios from 'axios'

function delete_knowledge_base(data) {
  return axios({
    method: 'DELETE',
    url: 'http://localhost:4000/local_doc_qa/delete_knowledge_base?knowledge_base_id=' + data,
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export default delete_knowledge_base