import axios from 'axios'

function upload_file(data) {
  return axios({
    method: 'POST',
    url: 'http://localhost:4000/local_doc_qa/upload_file',
    headers: {
      'Content-Type': 'multipart/form-data',
      'accept': 'application/json'
    },
    data: data
  })
}
export default upload_file