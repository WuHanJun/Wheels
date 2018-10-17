import {getElByID} from '../utils/dom'

export default (container, path, name) => Promise
  .resolve()
  .then(() => {
    const {showEl} = container
    showEl.src = path
    showEl.name = name
    return path
  })