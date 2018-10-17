import EventEmitter from './utils/EventEmitter'
import './imgUpload.less'
import actionRegister from './actions/index'

const prefix = 'img-upload'

class ImgUpload {
  constructor (options) {
    let defaultOptions = {
      url: 'http://10.0.1.21:3000/upload',
      method: 'PUT',
      inputName: 'file',
      parseResponse: (res) => {
        res = JSON.parse(res)
        const path = `http://10.0.1.21:3000/upload/${res.path}`
        const name = res.name
        return {path, name}
      }
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.init()
  }
  init () {
    this.el = this.options.el
    // 这个container用于挂载私有方法，同时不会暴露到实例对象中
    let container = {
      event: new EventEmitter(),
      el: this.options.el,
      options: this.options,
      prefix
    }
    this.on = (...args) => {
      container.event.on(...args)
    }
    actionRegister(container)

    container.series('render', 'bindEvents')
  }
}

window.ImgUpload = ImgUpload
