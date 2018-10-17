import {getElByID} from '../utils/dom'

export default (container, path) => Promise
  .resolve()
  .then(() => {
    const {prefix} = container
    getElByID(`${prefix}-show`).src = path
  })