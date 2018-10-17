import Promise from '../utils/promise'
import {addClass, getElByID} from '../utils/dom'

export default container => Promise
  .resolve()
  .then(() => {
    const {el, prefix} = container
    addClass(el, 'img-upload')
    const domList = [
      `<img src='./src/imgs/bg.jpg' id='${prefix}-show'></img>`,
      `<input type='file' name='file' id='${prefix}-file-ipt'></input>`
    ]
    el.innerHTML = domList.join('')
    el.insertAdjacentHTML('afterend', `<p>点击图片编辑</p>`)
    container.inputEl = getElByID(`${prefix}-file-ipt`)
  })