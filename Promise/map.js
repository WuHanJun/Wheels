const map = (arr, cb) => {
  const result = []
  for (let i = 0, length = arr.length; i < length; ++i) {
    result.push( cb(arr[i], i) )
  }
}