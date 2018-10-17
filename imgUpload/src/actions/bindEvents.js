import {on} from '../utils/event'

export default container => Promise
  .resolve()
  .then(() => {
    const {inputEl, options, act} = container
    on(inputEl, 'change', (e) => {
      const file = e.target.files[0]
      const data = new FormData()
      data.append(options.inputName, file)
      act('willUpload').then(() => act('upload', data))
    })
  })
