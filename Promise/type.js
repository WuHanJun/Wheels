const type = {
  toString: Object.prototype.toString,
  isFunc: d => typeof d === 'function',
  isStr: d => typeof d === 'string',
  isBum: d => typeof d === 'number',
  isObj: d => this.toString.call(d) === '[object Object]',
  isArr: d => this.toString.call(d) === '[object Array]'
}