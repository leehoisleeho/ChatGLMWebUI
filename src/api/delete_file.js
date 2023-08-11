import axios from 'axios'

function delete_file(knowledge_base_id,file_name) {
  return axios({
    method: 'DELETE',
    url: 'http://localhost:4000/local_doc_qa/delete_file?knowledge_base_id='+ knowledge_base_id +'&doc_name='+ file_name,
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export default delete_file