import axios from 'axios'
import { isObject, isEmpty } from 'lodash'
import { snakecase, camelcase } from '../utils/camelcase'
import Toast from 'src/components/common/Toast/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 30000

axios.interceptors.request.use(function (config) {
  if (config.data instanceof FormData) { // 对图片上传做时间限制
    config.timeout = 2 * 60 * 1000
  }
  if (config.data && !(config.data instanceof FormData)) {
    try {
      config.data = snakecase(config.data, !isObject(config.data))
    } catch (err) {
      console.log(err)
      console.error(err)
    }
  }
  return config
})

axios.interceptors.response.use(
  /**
   * 此处需注意，后端已经统一处理返回值，请求成功均为200，4XX-5XX的错误放在error中catch
   * @param response
   * @returns {*}
   */
  function (response) {
    let data = response.data || {}
    data = camelcase(data)
    if (data.data) {
      data = data.data
    }
    if (data.errors) {
    }
    return data
  },
  function (err) {
    if (err.code === 'ECONNABORTED') { // 处理请求超时
      console.log(JSON.stringify(err))
      Toast({
        message: '请求超时，请刷新后检查网络链接'
      })
      return Promise.reject(new Error('timeout'))
    }
    let { response } = err
    let errorCode = ''
    let status = ''
    if (!isEmpty(response) && isObject(response)) { // 存在错误内容
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'Error',
        eventAction: JSON.stringify(response),
        eventLabel: 'Network-Error'
      })
      status = response.status
      if (response.data.errors) {
        errorCode = response.data.errors.code // TODO： 此处待添加错误处理
      }

      errorHandle(status)
    }
    return Promise.resolve({
      errors: true,
      code: errorCode
    })
  }
)

function errorHandle (status) {
  switch (status) {
    case 400:
      console.log('錯誤請求')
      Toast({
        message: '请求错误<br/>错误码：400'
      })
      break
    case 401:
      Toast({
        message: '授权失效、失败<br/>错误码：401'
      })
      break
    case 403:
      console.log('該用戶無權訪問該資源')
      Toast({
        message: '无权访问该资源<br/>错误码：403'
      })
      break
    case 404:
      console.log('訪問資源不存在')
      Toast({
        message: '访问资源不存在<br/>错误码：404'
      })
      break
    case 500:
      console.log('服务器挂掉')
      Toast({
        message: '服务器错误 - 500'
      })
      break
    case status > 503:
      console.log('七牛服务出问题')
      break
    default:
      Toast({
        message: '發生錯誤 - ' + status
      })
      console.log('請求錯誤')
  }
}

export default axios
