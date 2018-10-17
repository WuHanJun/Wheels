/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

// const Promise = require('./promise')

const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))