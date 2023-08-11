// 获取知识库列表
import axios from 'axios'

function list_knowledge_base() {
  return axios({
    method: 'GET',
    url: 'http://localhost:4000/local_doc_qa/list_knowledge_base',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export default list_knowledge_base