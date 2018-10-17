const isType = (type) => {
  const toString = Object.prototype.toString
  return function (val) {
    return val != null && toString.call(val) === '[object ' + type + ']'
  }
}

export const isPromise = isType('Promise')
export const isObject = isType('Object')
export const isString = isType('String')
export const isArray = isType('Array')
export const isFunction = isType('Function')