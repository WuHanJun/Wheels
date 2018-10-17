import Promise from '../utils/promise'
import {addClass, getElByID} from '../utils/dom'

export default container => Promise
  .resolve()
  .then(() => {
    const {el, prefix} = container
    addClass(el, 'img-upload')
    const domList = [
      `<img src='./src/imgs/default.jpg' id='${prefix}-show' crossOrigin='Anonymous' name='default'></img>`,
      `<canvas id='${prefix}-canvas'></canvas>`,
      `<input type='file' name='file' id='${prefix}-file-ipt'></input>`
    ]
    el.innerHTML = domList.join('')
    el.insertAdjacentHTML('afterend', `<a href='' id='${prefix}-download'>下载</a>`)
    el.insertAdjacentHTML('afterend', `<p>点击图片编辑</p>`)
    container.inputEl = getElByID(`${prefix}-file-ipt`)
    container.downloadEl = getElByID(`${prefix}-download`)
    container.showEl = getElByID(`${prefix}-show`)
    container.canvasEl = getElByID(`${prefix}-canvas`)
  })
