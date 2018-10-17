(function (root) {
  const states = {
    pending: 'pending',
    toHandle: 'toHandle',
    resolving: 'resolving',
    rejecting: 'rejecting',
    // resolved: 'resolved',
    // rejected: 'rejected',
    finished: 'finished'
  }
  const actions = {
    resolve: 'resolve',
    reject: 'reject'
  }
  const Promise2 = function (func) {
    this.status = states.pending
    this.action = ''
    this.val = func.call(this, this.resolve.bind(this), this.reject.bind(this))
    this.reason = null
    this.onResolves = []
    this.onRejects = []
    this.onCatch = null
  }
  Promise2.prototype.resolve = function (d) {
    this.val = d
    this.action = actions.resolve
    this.status = this.status === states.pending ? states.toHandle : this.status
    this.then()
  }
  Promise2.prototype.reject = function (d) {
    this.val = d
    this.action = actions.reject
    this.status = this.status === states.pending ? states.toHandle : this.status
    this.then()
  }
  Promise2.prototype.then = function (onResolve, onReject) {
    const onResolves = this.onResolves 
    const onRejects = this.onRejects 

    if (this.status === states.pending) {
      if (onResolve && !type.isFunc(onResolve)) throw new Error('onResolve should be a function')
      if (onReject && !type.isFunc(onReject)) throw new Error('onReject should be a function')
      onResolve && onResolves.push(onResolve)
      onReject && onRejects.push(onReject)
      return this
    }
    
    if (this.status === states.rejecting || this.status === states.resolving || this.status === states.finished) return
    
    if (this.action === actions.resolve && onResolves.length) {
      this.status = states.resolving
      let param = this.val
      map(onResolves, (item, idx) => {
        if (param.constructor === Promise2) {
          param.then()
        } else {
          param = item(param)
        }
      })
    }

    if (this.action === actions.reject && this.onRejects.length) {
      this.status = states.rejecting
      let param = this.val
      param = onRejects[0](param)

      map(onResolves, (item, idx) => {
        idx > 0  && (param = item(param))
      })
    }

    if (this.action === actions.reject && !this.onRejects.length) {
      this.catch()
    }
  }
  Promise2.prototype.catch = function (onCatch) {
    if (this.status === states.pending) {
      if (onCatch && !type.isFunc(onCatch)) throw new Error('onCatch should be a function')
      onCatch && (this.onCatch = onCatch)
      return this
    }
   
    if (this.action === actions.reject && this.status !== states.rejecting && this.status !== states.finished) {
      this.status = states.finished
      this.onCatch(this.val)
    }
  }
  root.Promise2 = Promise2
})(this)