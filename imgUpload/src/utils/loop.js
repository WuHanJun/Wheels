import {isArray, isObject} from './isType'
import map from './map'
export default function loop (d, fn) {
  let result = []
  if (isArray(d)) {
    result = map(d, fn)
  }
  if (isObject(d)) {
    for (let key in d) {
      if (d.hasOwnProperty(key)) {
        result.push(fn(d[key]))
      }
    }
  }
  return result
}