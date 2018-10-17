import {removeClass} from '../utils/dom'

export default container => Promise
  .resolve()
  .then(() => {
    const {prefix, el, inputEl} = container

    removeClass(el, `${prefix}-ongoing`)
    inputEl.value = ''
    inputEl.disabled = false
  })