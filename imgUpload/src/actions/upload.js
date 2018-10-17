import http from '../utils/http'

export default (container, data) => Promise
  .resolve()
  .then(() => {
    const {options, act} = container
    const {url, method, parseResponse} = options

    http({url, method, data})
      .then((res) => {
        const path = parseResponse(res)
        act('didUpload').then(() => act('updateImg', path))
      })
      .catch((e) => {
        console.log(e)
      })
  })
