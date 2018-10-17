import render from './render'
import bindEvents from './bindEvents'
import didUpload from './didUpload'
import updateImg from './updateImg'
import upload from './upload'
import willUpload from './willUpload'

import Promise from '../utils/promise'
import loop from '../utils/loop'
import { isArray } from '../utils/isType'

const actions = {
  render,
  bindEvents,
  didUpload,
  updateImg,
  upload,
  willUpload
}

export default function actionRegister (container) {
  container.act = (action, ...args) => {
    if (!actions[action]) {
      return Promise.reject(`Error: unsupported action [${action}].`)
    }
    return Promise
      .resolve()
      .then(() => {
        container.event.emit(`before_${action}`)
      })
      .then(() => {
        console.log(`act: ${action}`)
        return actions[action].apply(null, [container, ...args])
      })
      .then((...d) => {
        container.event.emit(action, ...d)
        container.event.emit(`after_${action}`)
      })
  }
  container.series = (...actions) => {
    if (!isArray(actions)) actions = [actions]
    let p = Promise.resolve()

    loop(actions, (item) => {
      p = p.then(() => container.act(item))
    })
    return p
  }
}
