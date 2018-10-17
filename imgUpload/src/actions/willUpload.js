import {addClass, getElByID} from '../utils/dom'

export default container => Promise
  .resolve()
  .then(() => {
    const {prefix, el} = container

    addClass(el, `${prefix}-ongoing`)
    getElByID(`${prefix}-file-ipt`).disabled = true
  })
