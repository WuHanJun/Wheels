const states = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
}

const actions = {
  resolve: 'resolve',
  reject: 'reject'
}
action = ''

// let finished = false

const noop = function () {}

const Promise = function (cb) {
  this.status = states.pending
  this.value = undefined
  // 存储下一个then的onResolve，onReject函数及连接下下个then的promise对象
  this.defferd = {}
  // 放到事件队列最后执行的原因是等then执行完，第一个Promise对象拥有defferd。可以往下一个then执行。
  setTimeout(cb.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0)
}

Promise.prototype.resolve = function (result) {
  this.status = states.resolved
  this.value = result
  this.start()
}

Promise.prototype.reject = function (result) {
  this.status = states.rejected
  this.value = result
  this.start()
}

Promise.prototype.catch = function (cb) {
  return this.then(null, cb)
}

Promise.prototype.start = function () {
  this.handleNext(this.defferd)
}

Promise.prototype.then = function (onResolve, onReject) {
  if (onResolve && !type.isFunc(onResolve)) throw new Error('onResolve should be a function')
  if (onReject && !type.isFunc(onReject)) throw new Error('onReject should be a function')

  let o = {
    onResolve,
    onReject,
    promise: new Promise(noop)
  }
  this.defferd = o
  return o.promise
}

Promise.prototype.handleNext = function (defferd) {
  let p
  console.log(this.status)
  const status = this.status
  if (defferd.onResolve && status === states.resolved) {
    p = defferd.onResolve(this.value)
  }

  if (defferd.onReject && status === states.rejected) {
    p = defferd.onReject(this.value)
  }
  // 如果还有下一个promise[等价于还有下一个then]
  const next = defferd.promise
  if (next) {
    if (p instanceof Promise) {
      p.defferd = next.defferd
    } else {
      p = this
      p.defferd = next.defferd
      this.start()
    }
  }
}
