// 以Fetch的方式封装HTTP请求
import axios from "axios"

const baseUrl = 'http://localhost:4000'
function http(url,options) {
  return axios({
    method: 'options.method',
    url: baseUrl + url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: options.data
  })
}
export default http