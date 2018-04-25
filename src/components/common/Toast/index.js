import Vue from 'vue'
import ToastDOM from './Toast.vue'

const IldToast = Vue.extend(ToastDOM)
let toastPool = []

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool.shift()
    return instance
  }
  return new IldToast({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

IldToast.prototype.close = function () {
  this.value = false
  this.$el.addEventListener('transitionend', (evt) => {
    this.thenFunc(evt, this)
    removeDom(evt)
  })
  returnAnInstance(this)
}

/*
* options:
*   duration: 持续时间，默认3000，0为不消失
*   message: toast提示信息
*   position: 显示位置（middle(默认), top(Message), bottom）
*   className: class名
*   icon:
*     type: icon种类（暂时有material，ionicon两种）
*     content: icon内容
*   closeable: 是否可以点击mask关闭
*   clickable: 是否可以点击到，false为穿透
* options为string类型时则视为message
* */

/**
 * @param options
 * @example
 *
 * import Toast from 'src/components/common/Toast/Toast'
 * Toast({
 *    duration: 3000,
 *    position: 'top',
 *    className: 'my-toast',
 *    icon: {
 *        type: 'material',
 *        content: 'edit'
 *    },
 *    closable: false,
 *    clickable: false
 * }).then(() => {
 *    console.log('完成")
 * })
 *
 * @example
 *
 * Toast('此处为提示内容')
 */

let Toast = (options = {}) => {
  let duration = options.duration || 3000

  let instance = getAnInstance()
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  instance.icon = options.icon || {}
  instance.closeable = options.closeable || false
  instance.clickable = options.clickable || false
  instance.thenFunc = function () {}
  // 消失时调用
  instance.then = (func) => {
    instance.thenFunc = func
  }
  // 是否为方法调用来的组件
  instance.isComponent = false

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.value = true
    instance.$el.removeEventListener('transitionend', removeDom)
    // duration===0时不设置timer
    if (duration !== 0 && duration !== '0') {
      instance.timer = setTimeout(function () {
        if (!instance.value) return
        instance.close()
      }, duration)
    }
  })
  return instance
}

export default Toast
