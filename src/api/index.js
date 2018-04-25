import axios from './axios'

const api = {
  fetchArticle (url) {
    return axios.get(`/article?dataType=html&url=${url}`)
  }
}

export default api
